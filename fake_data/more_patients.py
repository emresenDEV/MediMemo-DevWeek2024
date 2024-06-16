from faker import Faker
import csv
from datetime import date
from dateutil import tz
import json
from random import choice
from connect import query
from offices_patients_join import fetch_join_as_dictionary
from insurances_patients_join import fetch_as_dictionary, list_insurances, assign_insurance
from patients import generate_patient_data
from patients import headers as patient_headers

fake = Faker()


headers, taken_emails = query(f"SELECT email FROM patients;")
for i in range(len(taken_emails)):
  taken_emails[i] = taken_emails[i][0]
# print(taken_emails)
staff_offices = fetch_join_as_dictionary('staff_id', 'office_id', 'offices_staff_join')
insurances, num_insurances = list_insurances()

new_patients = [] #list of lists
new_insurances_patients = [] #list of dictionary with keys patient_id, insurance_id
new_patients_staff = []
new_offices_patients = []

# for i in range(10):
#   patient_data = generate_patient_data(taken_emails)
#   new_patients.append(patient_data)
  
#   new_patients_staff.append(patient_data['patient_staff'])
#   new_offices_patients.append(patient_data['office_patient'])
