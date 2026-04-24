from sqlalchemy import create_engine, text
import os
from dotenv import load_dotenv

load_dotenv()
engine = create_engine(os.getenv('DATABASE_URL'))
with engine.connect() as conn:
    try:
        conn.execute(text('ALTER TABLE testimonials ADD COLUMN is_approved BOOLEAN DEFAULT FALSE;'))
        conn.commit()
        print("Success")
    except Exception as e:
        print("Error:", e)
