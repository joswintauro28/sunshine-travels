
import sqlite3

conn = sqlite3.connect('travel.db')
cursor = conn.cursor()

print("--- Testimonials ---")
cursor.execute("SELECT * FROM testimonials")
rows = cursor.fetchall()
for row in rows:
    print(row)

print("\n--- Users ---")
cursor.execute("SELECT * FROM users")
rows = cursor.fetchall()
for row in rows:
    print(row)

conn.close()
