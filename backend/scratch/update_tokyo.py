from sqlalchemy import create_engine, text
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)

new_url = "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&q=80&w=800"

with engine.connect() as connection:
    print(f"Updating Tokyo, Japan image URL...")
    try:
        connection.execute(
            text("UPDATE destinations SET image_url = :url WHERE name = :name"),
            {"url": new_url, "name": "Tokyo, Japan"}
        )
        connection.commit()
        print("Update successful.")
    except Exception as e:
        print(f"Error: {e}")
