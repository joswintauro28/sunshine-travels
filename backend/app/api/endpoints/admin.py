from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import models
from database import get_db
from app.api import deps

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
def create_destination(destination: dict, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_active_superuser)):
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

@router.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_active_superuser)):
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user.id == current_user.id:
        raise HTTPException(status_code=400, detail="Cannot delete your own account")
        
    db.delete(user)
    
    new_log = models.ActivityLog(user_email=current_user.email, action=f"Deleted user: {user.email}")
    db.add(new_log)
    db.commit()
    
    return {"message": "User deleted successfully"}

@router.delete("/testimonials/{testimonial_id}")
def delete_testimonial(testimonial_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_active_superuser)):
    testimonial = db.query(models.Testimonial).filter(models.Testimonial.id == testimonial_id).first()
    if not testimonial:
        raise HTTPException(status_code=404, detail="Testimonial not found")
        
    db.delete(testimonial)
    
    new_log = models.ActivityLog(user_email=current_user.email, action=f"Deleted testimonial from: {testimonial.name}")
    db.add(new_log)
    db.commit()
    
    return {"message": "Testimonial deleted successfully"}
