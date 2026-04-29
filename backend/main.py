from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
import uvicorn

import models, database
from database import engine, get_db

# Create tables
models.Base.metadata.create_all(bind=engine)

from app.core import security

from app.api.api import api_router

app = FastAPI(title="Sunshine Travels API")

app.include_router(api_router, prefix="/api/v1")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # In production, specify the frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Seed data function
def seed_data(db: Session):
    if db.query(models.Destination).count() == 0:
        destinations = [
            models.Destination(name="Maldives", description="Crystal clear waters and private villas.", image_url="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&q=80&w=800", price=95000, rating=4.9, location="Indian Ocean"),
            models.Destination(name="Bali, Indonesia", description="Spiritual retreats and stunning beaches.", image_url="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800", price=65000, rating=4.8, location="Southeast Asia"),
            models.Destination(name="Paris, France", description="The city of lights and romance.", image_url="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80&w=800", price=125000, rating=4.9, location="Europe"),
            models.Destination(name="Santorini, Greece", description="Iconic blue domes and sunset views.", image_url="https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&q=80&w=800", price=85000, rating=4.9, location="Europe")
        ]
        db.add_all(destinations)
        
        services = [
            models.Service(title="Luxury Stays", description="Five-star resorts and boutique hotels handpicked for comfort.", icon="Hotel"),
            models.Service(title="Guided Tours", description="Expert locals to show you the hidden gems of every destination.", icon="Compass"),
            models.Service(title="Curated Experiences", description="Unique activities tailored specifically to your interests.", icon="Palmtree")
        ]
        db.add_all(services)
        
        testimonials = [
            models.Testimonial(name="Sarah Johnson", role="Solo Traveler", content="The most seamless travel experience I've ever had. Sunshine Travels truly knows premium.", avatar_url="https://i.pravatar.cc/150?u=sarah", rating=5, is_approved=True),
            models.Testimonial(name="Michael Chen", role="Family Trip", content="Our kids loved the Bali excursion. Everything was perfectly organized from start to finish.", avatar_url="https://i.pravatar.cc/150?u=michael", rating=5, is_approved=True)
        ]
        db.add_all(testimonials)

        # Seed admin user
        admin_user = models.User(
            name="Admin User",
            email="admin@sunshine.com",
            password=security.get_password_hash("admin123"),
            is_superuser=True
        )
        db.add(admin_user)
        db.commit()

@app.on_event("startup")
def startup_event():
    db = next(get_db())
    seed_data(db)

@app.get("/destinations")
def get_destinations(db: Session = Depends(get_db)):
    return db.query(models.Destination).all()

@app.get("/services")
def get_services(db: Session = Depends(get_db)):
    return db.query(models.Service).all()

@app.get("/testimonials")
def get_testimonials(db: Session = Depends(get_db)):
    return db.query(models.Testimonial).filter(models.Testimonial.is_approved == True).all()

@app.post("/testimonials")
def create_testimonial(testimonial: dict, db: Session = Depends(get_db)):
    new_testimonial = models.Testimonial(
        name=testimonial.get("name"),
        role=testimonial.get("role", "Verified Traveler"),
        content=testimonial.get("content"),
        avatar_url=testimonial.get("avatar_url"),
        rating=testimonial.get("rating", 5)
    )
    db.add(new_testimonial)
    
    # Log the action for admin notification
    new_log = models.ActivityLog(
        user_email=testimonial.get("name", "Guest"),
        action=f"New feedback submitted: '{testimonial.get('content')[:30]}...'"
    )
    db.add(new_log)
    
    db.commit()
    db.refresh(new_testimonial)
    return new_testimonial

@app.post("/bookings")
def create_booking(booking: dict, db: Session = Depends(get_db)):
    new_booking = models.Booking(
        destination=booking.get("destination"),
        check_in=booking.get("check_in"),
        check_out=booking.get("check_out"),
        guests=booking.get("guests")
    )
    db.add(new_booking)
    db.commit()
    db.refresh(new_booking)
    return new_booking

@app.post("/contact")
def create_contact_message(message: dict, db: Session = Depends(get_db)):
    new_message = models.ContactMessage(
        name=message.get("name"),
        email=message.get("email"),
        phone=message.get("phone"),
        message=message.get("message"),
        time=datetime.now().strftime("%I:%M %p")
    )
    db.add(new_message)
    db.commit()
    db.refresh(new_message)
    return {"status": "success", "message": "Inquiry submitted successfully", "data": new_message}

@app.post("/auth/signup")
def signup(user: dict, db: Session = Depends(get_db)):
    # Check if user exists
    db_user = db.query(models.User).filter(models.User.email == user.get("email")).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = models.User(
        name=user.get("name"),
        email=user.get("email"),
        password=security.get_password_hash(user.get("password"))
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"status": "success", "message": "User created successfully", "user": {"name": new_user.name, "email": new_user.email}}

@app.post("/auth/login")
def login(user: dict, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.get("email")).first()
    if not db_user or not security.verify_password(user.get("password"), db_user.password):
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    return {"status": "success", "message": "Login successful", "user": {"name": db_user.name, "email": db_user.email}}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
