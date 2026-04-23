import models
from database import engine, SessionLocal

db = SessionLocal()

print("--- Users ---")
users = db.query(models.User).all()
for u in users:
    print(f"ID: {u.id}, Email: {u.email}, IsSuperuser: {u.is_superuser}")

print("\n--- Activity Logs ---")
logs = db.query(models.ActivityLog).order_by(models.ActivityLog.timestamp.desc()).limit(5).all()
for l in logs:
    print(f"User: {l.user_email}, Action: {l.action}, Time: {l.timestamp}")

db.close()
