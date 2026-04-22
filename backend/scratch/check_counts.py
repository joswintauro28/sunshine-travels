from sqlalchemy import create_engine, text
import os
from dotenv import load_dotenv

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)

unnecessary_tables = [
    "user", "course", "test", "content", "activity_logs",
    "destination", "service", "testimonial", "booking", "contactmessage"
]

with engine.connect() as connection:
    print("Row counts for potentially unnecessary tables:")
    for table in unnecessary_tables:
        try:
            result = connection.execute(text(f"SELECT count(*) FROM \"{table}\""))
            count = result.scalar()
            print(f"- {table}: {count} rows")
        except Exception as e:
            print(f"- {table}: Error (might not exist or other issue)")

    print("\nRow counts for kept tables:")
    kept_tables = ["destinations", "services", "testimonials", "bookings", "contact_messages", "users"]
    for table in kept_tables:
        try:
            result = connection.execute(text(f"SELECT count(*) FROM \"{table}\""))
            count = result.scalar()
            print(f"- {table}: {count} rows")
        except Exception as e:
            print(f"- {table}: Error")
