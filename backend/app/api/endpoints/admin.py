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
