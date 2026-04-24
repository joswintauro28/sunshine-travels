from fastapi import APIRouter, Depends, HTTPException, Body
from sqlalchemy.orm import Session
import models
from database import get_db
from app.api import deps
from app.core import security

router = APIRouter()

def get_current_active_superuser(
    current_user: models.User = Depends(deps.get_current_user),
) -> models.User:
    if not current_user.is_superuser:
        raise HTTPException(status_code=400, detail="The user doesn't have enough privileges")
    return current_user

@router.get("/stats")
def get_stats(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_active_superuser)):
    users = db.query(models.User).count()
    destinations = db.query(models.Destination).count()
    bookings = db.query(models.Booking).count()
    inquiries = db.query(models.ContactMessage).count()
    return {
        "users": users,
        "destinations": destinations,
        "bookings": bookings,
        "inquiries": inquiries
    }

@router.get("/users")
def get_users(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_active_superuser)):
    return db.query(models.User).order_by(models.User.created_at.desc()).all()

@router.get("/activity_logs")
def get_activity_logs(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_active_superuser)):
    return db.query(models.ActivityLog).order_by(models.ActivityLog.timestamp.desc()).all()

@router.get("/inquiries")
def get_inquiries(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_active_superuser)):
    return db.query(models.ContactMessage).order_by(models.ContactMessage.created_at.desc()).all()

@router.get("/testimonials")
def get_testimonials(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_active_superuser)):
    return db.query(models.Testimonial).order_by(models.Testimonial.id.desc()).all()

@router.get("/destinations")
def get_destinations(db: Session = Depends(get_db), current_user: models.User = Depends(get_current_active_superuser)):
    return db.query(models.Destination).order_by(models.Destination.id.desc()).all()

@router.post("/destinations")
def create_destination(destination: dict = Body(...), db: Session = Depends(get_db), current_user: models.User = Depends(get_current_active_superuser)):
    new_dest = models.Destination(
        name=destination.get("name"),
        description=destination.get("description"),
        image_url=destination.get("image_url"),
        price=destination.get("price"),
        rating=destination.get("rating"),
        location=destination.get("location")
    )
    db.add(new_dest)
    db.commit()
    db.refresh(new_dest)
    
    # Log the action
    new_log = models.ActivityLog(user_email=current_user.email, action=f"Added new destination: {new_dest.name}")
    db.add(new_log)
    db.commit()
    
    return {
        "id": new_dest.id,
        "name": new_dest.name,
        "description": new_dest.description,
        "image_url": new_dest.image_url,
        "price": new_dest.price,
        "rating": new_dest.rating,
        "location": new_dest.location
    }

@router.delete("/users/{id}")
def delete_user(id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_active_superuser)):
    # Debug: log the ID
    with open("debug_logs.txt", "a") as f:
        f.write(f"Attempting to delete user ID: {id}\n")
    
    user = db.query(models.User).filter(models.User.id == id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user.id == current_user.id:
        raise HTTPException(status_code=400, detail="Cannot delete your own account")
        
    new_log = models.ActivityLog(user_email=current_user.email, action=f"Deleted user: {user.email}")
    db.add(new_log)
    db.delete(user)
    db.commit()
    
    return {"message": "User deleted successfully"}

@router.delete("/testimonials/{id}")
def delete_testimonial(id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_active_superuser)):
    testimonial = db.query(models.Testimonial).filter(models.Testimonial.id == id).first()
    if not testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")
        
    try:
        new_log = models.ActivityLog(user_email=current_user.email, action=f"Deleted testimonial from: {testimonial.name}")
        db.add(new_log)
        db.delete(testimonial)
        db.commit()
        return {"message": "Testimonial deleted successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@router.put("/testimonials/{id}/approve")
def approve_testimonial(id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_active_superuser)):
    testimonial = db.query(models.Testimonial).filter(models.Testimonial.id == id).first()
    if not testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")
        
    testimonial.is_approved = True
    db.commit()
    db.refresh(testimonial)
    
    new_log = models.ActivityLog(user_email=current_user.email, action=f"Approved testimonial from: {testimonial.name}")
    db.add(new_log)
    db.commit()
    
    return testimonial

@router.delete("/destinations/{id}")
def delete_destination(id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_active_superuser)):
    dest = db.query(models.Destination).filter(models.Destination.id == id).first()
    if not dest:
        raise HTTPException(status_code=404, detail="Destination not found")
        
    try:
        # Log the action
        new_log = models.ActivityLog(user_email=current_user.email, action=f"Deleted destination: {dest.name}")
        db.add(new_log)
        db.delete(dest)
        db.commit()
        return {"message": "Destination deleted successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@router.delete("/inquiries/{id}")
def delete_inquiry(id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_active_superuser)):
    inquiry = db.query(models.ContactMessage).filter(models.ContactMessage.id == id).first()
    if not inquiry:
        raise HTTPException(status_code=404, detail="Inquiry not found")
        
    try:
        # Log the action
        new_log = models.ActivityLog(user_email=current_user.email, action=f"Deleted inquiry from: {inquiry.email}")
        db.add(new_log)
        db.delete(inquiry)
        db.commit()
        return {"message": "Inquiry deleted successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

@router.put("/destinations/{id}")
def update_destination(id: int, destination: dict = Body(...), db: Session = Depends(get_db), current_user: models.User = Depends(get_current_active_superuser)):
    dest = db.query(models.Destination).filter(models.Destination.id == id).first()
    if not dest:
        raise HTTPException(status_code=404, detail="Destination not found")
    
    dest.name = destination.get("name", dest.name)
    dest.description = destination.get("description", dest.description)
    dest.image_url = destination.get("image_url", dest.image_url)
    dest.price = destination.get("price", dest.price)
    dest.rating = destination.get("rating", dest.rating)
    dest.location = destination.get("location", dest.location)
    
    db.commit()
    db.refresh(dest)
    
    # Log the action
    new_log = models.ActivityLog(user_email=current_user.email, action=f"Updated destination: {dest.name}")
    db.add(new_log)
    db.commit()
    
    return dest

@router.put("/users/{id}")
def update_user(id: int, user_data: dict = Body(...), db: Session = Depends(get_db), current_user: models.User = Depends(get_current_active_superuser)):
    # Debug: log the ID
    with open("debug_logs.txt", "a") as f:
        f.write(f"Attempting to update user ID: {id}\n")
    
    user = db.query(models.User).filter(models.User.id == id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    user.name = user_data.get("name", user.name)
    user.email = user_data.get("email", user.email)
    if user_data.get("is_superuser") is not None:
        user.is_superuser = user_data.get("is_superuser")
    
    db.commit()
    db.refresh(user)
    
    # Log the action
    new_log = models.ActivityLog(user_email=current_user.email, action=f"Updated user: {user.email}")
    db.add(new_log)
    db.commit()
    
    return user
