
import os
from sqlalchemy.orm import Session
from database import SessionLocal
import models

def debug():
    db = SessionLocal()
    try:
        print("--- Testimonials ---")
        testimonials = db.query(models.Testimonial).all()
        for t in testimonials:
            print(f"ID: {t.id} (type: {type(t.id)}), Name: {t.name}, Approved: {t.is_approved}")
        
        print("\n--- Activity Logs ---")
        logs = db.query(models.ActivityLog).order_by(models.ActivityLog.timestamp.desc()).limit(10).all()
        for l in logs:
            print(f"ID: {l.id}, User: {l.user_email}, Action: {l.action}")
    finally:
        db.close()

if __name__ == "__main__":
    debug()
