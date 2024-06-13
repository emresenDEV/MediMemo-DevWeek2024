from random import randrange
import csv
from faker import Faker
import psycopg2
from config import load_config

fake = Faker()

# Assign patient a random insurance.
"""
insurance_id uuid
patient_id uuid
primary_insured_name varchar
primary_insured_birthdate date
primary_insured_SSN integer
primary_insured_relationship varchar
member_number varchar
group_number varchar
"""

# save insurance_ids in a list


def list_insurances():
    insurances = []
    with open("insurance_ids.csv") as file:
        reader_obj = csv.reader(file)
        for row in reader_obj:
            insurances.append(row[0])
    insurances.pop(0)  # remove the header
    print("insurance 1:", insurances[0])  # test
    num_insurances = len(insurances)
    return insurances, num_insurances


# pair each patient with a random insurance


def loop_through_patients(insurances, num_insurances):
    insurances_patients_join = []
    with open("patient_ids.csv") as file_obj:
        reader_obj = csv.reader(file_obj)
        for row in reader_obj:
            join = {
                "patient_id": row[0],
                "insurance_id": insurances[randrange(0, num_insurances)],
                # "primary_insured_name": fake.name(),
                # "primary_insured_birthdate": fake.date_of_birth(),
                # "primary_insured_SSN": fake.random_int(min=100000000, max=999999999),
                # "primary_insured_relationship": fake.word()
            }
            insurances_patients_join.append(join)
    insurances_patients_join.pop(0)  # remove the header
    print("join 1:", insurances_patients_join[0])  # test
    return insurances_patients_join


# write offices_patient_join to a new csv file


def write_to_join_csv(insurances_patients_join):
    with open("insurances_patients_join.csv", "w", newline="") as csvfile:
        writer = csv.writer(csvfile)
        writer.writerow(
            [
                "insurance_id",
                "patient_id",
                "primary_insured_name",
                "primary_insured_birthdate",
                "primary_insured_SSN",
                "primary_insured_relationship",
                "member_number",
                "group_number",
            ]
        )
        for join in insurances_patients_join:
            writer.writerow([join["insurance_id"], join["patient_id"]])


def query_patient_data():
    config = load_config()
    with psycopg2.connect(**config) as conn:
        with conn.cursor() as cur:
            cur.execute("SELECT * FROM patients")
            patients = cur.fetchall()
            print(type(patients))
            return patients


if __name__ == "__main__":
    # insurances, num_insurances = list_insurances()
    # insurances_patients_join = loop_through_patients(insurances, num_insurances)
    # write_to_join_csv(insurances_patients_join)
    query_patient_data()
