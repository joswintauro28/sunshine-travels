import sqlite3

def check_tables():
    conn = sqlite3.connect('travel.db')
    cursor = conn.cursor()
    cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = cursor.fetchall()
    print("Tables in travel.db:", [t[0] for t in tables])
    
    for table in [t[0] for t in tables]:
        cursor.execute(f"PRAGMA table_info({table})")
        columns = cursor.fetchall()
        print(f"Columns in {table}:", [c[1] for c in columns])
    
    conn.close()

if __name__ == "__main__":
    check_tables()
