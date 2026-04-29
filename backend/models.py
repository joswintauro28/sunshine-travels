from sqlalchemy import Column, Integer, String, Text, Float, DateTime, Boolean
from datetime import datetime, timezone
from database import Base

class Destination(Base):
    __tablename__ = "destinations"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(Text)
    image_url = Column(String)
    price = Column(Float)
    rating = Column(Float)
    location = Column(String)

class Service(Base):
    __tablename__ = "services"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    description = Column(Text)
    icon = Column(String) # For Lucide icon names

class Testimonial(Base):
    __tablename__ = "testimonials"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    role = Column(String)
    content = Column(Text)
    avatar_url = Column(String)
    rating = Column(Integer, default=5)
    is_approved = Column(Boolean, default=False)

class Booking(Base):
    __tablename__ = "bookings"
    id = Column(Integer, primary_key=True, index=True)
    destination = Column(String)
    check_in = Column(String)
    check_out = Column(String)
    guests = Column(Integer)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class ContactMessage(Base):
    __tablename__ = "contact_messages"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    phone = Column(String)
    message = Column(Text)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

from sqlalchemy import Column, Integer, String, Text, Float, DateTime, Boolean

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    is_superuser = Column(Boolean, default=False)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

class ActivityLog(Base):
    __tablename__ = "activity_logs"
    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String)
    action = Column(String)
    timestamp = Column(DateTime, default=lambda: datetime.now(timezone.utc))
