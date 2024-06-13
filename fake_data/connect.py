import psycopg2
from config import load_config
from tabulate import tabulate
import csv


def connect(config):
    """Connect to the PostgreSQL database server"""
    try:
        # connecting to the PostgreSQL server
        with psycopg2.connect(**config) as conn:
            print("Connected to the PostgreSQL server.")
            return conn
    except (psycopg2.DatabaseError, Exception) as error:
        print(error)


def query(operation):
    """Fetch data from the PostgreSQL database server"""
    try:
        config = load_config()
        with psycopg2.connect(**config) as conn:
            with conn.cursor() as cur:
                cur.execute(operation)
                headers = [desc[0] for desc in cur.description]
                results = cur.fetchall()
                with open("query.csv", "w", newline="") as file:
                    writer = csv.writer(file)
                    writer.writerow(headers)
                    for item in results:
                        writer.writerow(item)
                return headers, results
    except (psycopg2.DatabaseError, Exception) as error:
        print(error)


if __name__ == "__main__":
    # config = load_config()
    # connect(config)

    headers, staff = query("SELECT * FROM staff LIMIT 2;")
    # staff = query('SELECT * FROM staff;')
    # print(headers)
    # print(staff)
    # print(tabulate(staff, headers=headers))
