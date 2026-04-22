from sqlalchemy import create_engine, text
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)

with engine.connect() as connection:
    print("Destinations in database:")
    try:
        result = connection.execute(text("SELECT id, name, image_url FROM destinations"))
        for row in result:
            print(row)
    except Exception as e:
        print(f"Error: {e}")
