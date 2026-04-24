from sqlalchemy import create_engine, text
import os
from dotenv import load_dotenv

load_dotenv()
engine = create_engine(os.getenv('DATABASE_URL'))
with engine.connect() as conn:
    try:
        conn.execute(text('UPDATE testimonials SET is_approved = TRUE;'))
        conn.commit()
        print("Success update")
    except Exception as e:
        print("Error:", e)
