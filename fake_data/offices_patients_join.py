from random import choice
import csv
from faker import Faker
from connect import query

fake = Faker()

#TODO: Assign patients to one of the staff’s offices for each staff they’re connected with
# For each row of patients_staff_join, query that staff's offices, then assign the patient to one of those offices.

def fetch_join_as_dictionary(key, value, table):
  #make a dictionary of key: [value, value, ...]
  headers, results = query(f'SELECT {key}, {value} FROM {table}')
  join_dictionary = {}
  for i in range(len(results)):
    key = results[i][0]
    # print('key:', key)
    value = results[i][1]
    # print('value:', value)
    if key in join_dictionary.keys():
      join_dictionary[key].append(value)
    else:
      join_dictionary[key] = [value]
  # print(join_dictionary)
  return join_dictionary

def assign_patient_to_office():
  patients_staff_join = fetch_join_as_dictionary('patient_id', 'staff_id', 'patients_staff_join') #dictionary of patient_id: [staff_ids]
  offices_staff_join = fetch_join_as_dictionary('staff_id', 'office_id', 'offices_staff_join') #dictionary of staff_id: [office_ids]
  offices_patients_join = []
  for patient_id in patients_staff_join.keys():
    #for each staff member the patient has, assign the patient to one of their offices
    for staff_id in patients_staff_join[patient_id]:
      offices = offices_staff_join[staff_id] #list of office_ids
      office_id = choice(offices)
      offices_patients_join.append({'patient_id': patient_id, 'office_id': office_id})
  return offices_patients_join

def write_to_join_csv(offices_patients_join):
  with open('offices_patients_join.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(['office_id', 'patient_id'])
    for row in offices_patients_join:
      writer.writerow([row["office_id"], row["patient_id"]])

if __name__ == '__main__':
  offices_patients_join = assign_patient_to_office()
  write_to_join_csv(offices_patients_join)
  print("offices_patients_join.csv created")