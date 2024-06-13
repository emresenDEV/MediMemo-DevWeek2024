from random import randrange
import csv
from faker import Faker

fake = Faker()

# Assign each patient to a random staff member

# save staff_ids in a list
staff = []
with open("staff_ids.csv") as file:
    reader_obj = csv.reader(file)
    for row in reader_obj:
        staff.append(row[0])
staff.pop(0)  # remove the header
print("staff 1:", staff[0])  # test
num_staff = len(staff)

# pair each patient with a random staff member
patients_staff_join = []
with open("patient_ids.csv") as file_obj:
    reader_obj = csv.reader(file_obj)
    for row in reader_obj:
        join = {"patient_id": row[0], "staff_id": staff[randrange(0, num_staff)]}
        patients_staff_join.append(join)
patients_staff_join.pop(0)  # remove the header
print("join 1:", patients_staff_join[0])  # test

# write patients_staff_join to a new csv file
with open("patients_staff_join.csv", "w", newline="") as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(["patient_id", "staff_id"])
    for join in patients_staff_join:
        writer.writerow([join["patient_id"], join["staff_id"]])
