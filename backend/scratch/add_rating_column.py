from sqlalchemy import create_engine, text
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)

def add_rating_column():
    with engine.connect() as conn:
        try:
            conn.execute(text("ALTER TABLE testimonials ADD COLUMN rating INTEGER DEFAULT 5;"))
            conn.commit()
            print("Successfully added 'rating' column to 'testimonials' table.")
        except Exception as e:
            print(f"Error adding column: {e}")

if __name__ == "__main__":
    add_rating_column()
