from random import randrange, choice
import string
import csv
from faker import Faker
from connect import query

fake = Faker()

#Assign patient a random insurance.
'''
insurance_id uuid
patient_id uuid
primary_insured_name varchar
primary_insured_birthdate date
primmary_insured_ssn integer
primary_insured_relationship varchar
member_number varchar
group_number varchar
'''

def fetch_one_as_dictionary(columns, table, condition_key, condition_value):
  headers, results = query(f"SELECT {columns} FROM {table} WHERE {condition_key} = '{condition_value}';")
  # print(headers) #a list of strings
  # print(type(results[0])) #a list of length one of tuples 
  patient_data = {}
  for item in headers:
    index = headers.index(item)
    patient_data[item] = results[0][index]
  # print(patient_data) #a dictionary
  return patient_data

def generate_member_number():
  mem_num = choice(string.ascii_letters).upper() + choice(string.ascii_letters).upper() + choice(string.ascii_letters).upper() + choice(string.ascii_letters).upper() + str(fake.random_number(digits=8))
  return(mem_num)

#save insurance_ids in a list
def list_insurances():
  insurances = []
  with open('insurance_ids.csv') as file:
    reader_obj = csv.reader(file)
    for row in reader_obj:
      insurances.append(row[0])
  insurances.pop(0) #remove the header
  # print("insurance 1:", insurances[0]) #test
  num_insurances = len(insurances)
  return insurances, num_insurances

def fetch_as_dictionary(columns, table):
  headers, results = query(f"SELECT {columns} FROM {table};")
  # print(headers) #a list of strings
  # print(type(results[0])) #a list of length one of tuples 
  data = {}
  for i in range(len(results)):
    uuid = results[i][0]
    data[uuid] = {} #set id as key in data dictionary
    for j in range(len(headers)-1):
      index = j + 1
      header = headers[index]
      data[uuid][header] = results[i][index]
  # print(data.keys()) #dictionary
  return data



#pair each patient with a random insurance
def assign_insurance(insurances, num_insurances, patient_data):
  insurances_patients_join = []
  patient_uuids = patient_data.keys()
  for uuid in patient_uuids:
    join = { "patient_id": uuid,
            "insurance_id": insurances[randrange(0,num_insurances)],
            "member_number": generate_member_number(),
            "group_number": fake.random_number(digits=6)}
    self_insured = fake.boolean(chance_of_getting_true=50)
    if self_insured:
      join["primary_insured_name"] = patient_data[uuid]['first_name'] + " " + patient_data[uuid]['last_name']
      join["primary_insured_birthdate"] = patient_data[uuid]['date_of_birth']
      join["primmary_insured_ssn"] = patient_data[uuid]['SSN']
      join["primary_insured_relationship"] = "self"
    else:
      join["primary_insured_name"] = fake.name()
      join["primary_insured_birthdate"] = fake.date_of_birth()
      join["primmary_insured_ssn"] = fake.random_int(min=100000000, max=999999999)
      join["primary_insured_relationship"] = fake.random_element(elements=('spouse', 'parent', 'guardian'))
    insurances_patients_join.append(join)
  print(insurances_patients_join)
  return insurances_patients_join

# write insurances_patients_join to a new csv file
def write_to_join_csv(insurances_patients_join):
  with open('insurances_patients_join.csv', 'w', newline='') as csvfile:
    writer = csv.writer(csvfile)
    writer.writerow(["insurance_id", "patient_id", 'primary_insured_name', 'primary_insured_birthdate', 'primmary_insured_ssn', 'primary_insured_relationship', 'member_number', 'group_number'])
    for join in insurances_patients_join:
      writer.writerow([join["insurance_id"], join["patient_id"], join["primary_insured_name"], join["primary_insured_birthdate"], join["primmary_insured_ssn"], join["primary_insured_relationship"], join["member_number"], join["group_number"]])

# columns = 'patient_id, first_name, last_name, date_of_birth, "SSN"'
# table = 'patients'
# condition_key = 'patient_id'
# condition_value = 'f5d6f6f3-8dc9-4f68-bd7a-0055380e3012'

if __name__ == '__main__':
  insurances, num_insurances = list_insurances()
  patient_data = fetch_as_dictionary(columns='patient_id, first_name, last_name, date_of_birth, "SSN"', table='patients')
  insurances_patients_join = assign_insurance(insurances, num_insurances, patient_data)
  write_to_join_csv(insurances_patients_join)
  # fetch_as_dictionary(columns, table)