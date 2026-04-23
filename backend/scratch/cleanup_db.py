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
    print("Dropping unnecessary tables...")
    for table in unnecessary_tables:
        try:
            # Use DROP TABLE IF EXISTS to be safe
            connection.execute(text(f"DROP TABLE IF EXISTS \"{table}\" CASCADE"))
            connection.commit()
            print(f"- Dropped {table}")
        except Exception as e:
            print(f"- Error dropping {table}: {e}")

    print("\nFinal table list:")
    from sqlalchemy import inspect
    inspector = inspect(engine)
    for table_name in inspector.get_table_names():
        print(f"- {table_name}")
