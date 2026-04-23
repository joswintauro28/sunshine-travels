from sqlalchemy import create_engine, text
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)

with engine.connect() as connection:
    print("Content of activity_logs:")
    try:
        result = connection.execute(text("SELECT * FROM activity_logs"))
        for row in result:
            print(row)
    except Exception as e:
        print(f"Error reading activity_logs: {e}")
