import csv
from random import randrange

from faker import Faker

fake = Faker()

# Assign each staff member to a random office. Give them a 5% chance of being an admin.

# save office_ids in a list
offices = []
with open("office_ids.csv") as file:
    reader_obj = csv.reader(file)
    for row in reader_obj:
        offices.append(row[0])
offices.pop(0)  # remove the header
print("office 1:", offices[0])  # test

# pair each staff member with a random office
offices_staff_join = []
with open("staff_ids.csv") as file_obj:
    reader_obj = csv.reader(file_obj)
    for row in reader_obj:
        join = {
            "staff_id": row[0],
            "office_id": offices[randrange(1000)],
            "is_admin": fake.boolean(chance_of_getting_true=5),
        }
        offices_staff_join.append(join)
offices_staff_join.pop(0)  # remove the header
print("join 1:", offices_staff_join[0])  # test

# write offices_staff_join to a new csv file
with open("offices_staff_join.csv", "w", newline="") as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(["office_id", "staff_id", "is_admin"])
    for join in offices_staff_join:
        writer.writerow([join["office_id"], join["staff_id"], join["is_admin"]])
