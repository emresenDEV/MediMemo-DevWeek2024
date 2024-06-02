from faker import Faker
import csv
from datetime import date

fake = Faker()

'''
email VARCHAR UNIQUE
password VARCHAR

name_title VARCHAR
first_name VARCHAR
middle_name VARCHAR
last_name VARCHAR
name_suffix VARCHAR

date_of_birth DATE
sex_at_birth VARCHAR
gender VARCHAR
pronouns VARCHAR

religion VARCHAR
eyesight VARCHAR
hearing VARCHAR
mobility VARCHAR
is_pregnant BOOLEAN
last_menstrual DATE
SSN INTEGER
height NUMERIC
weight NUMERIC
vaccines JSON
allergies JSON
surgeries JSON
family_history JSON
last_reviewed_timestamp TIMESTAMP
emergency_contacts JSON
last_reviewer_staff_id UUID
preferred_name VARCHAR
blood_type VARCHAR
phone VARCHAR

'''

emails = []

def generate_patient_data():
  password = fake.password()

  #determine sex and gender (transgender, nonbinary, intersex, cisgender)

  is_transgender = fake.boolean(chance_of_getting_true=1)
  # print('is_transgender:', is_transgender)
  if is_transgender:
    sex = fake.random_element(elements=('FtM male', 'MtF female'))
    changed_name = fake.boolean(chance_of_getting_true=30)

    #if trans male
    if (sex == 'FtM male'):
      gender = 'male'
      pronouns = 'he/him'
      if changed_name:
        first_name = fake.first_name_male()
      else:
        first_name = fake.first_name_female()
        preferred_name = fake.first_name_male()

    #if trans female
    else:
      gender = 'female'
      pronouns = 'she/her'
      if changed_name:
        first_name = fake.first_name_female()
      else:
        first_name = fake.first_name_male()
        preferred_name = fake.first_name_female()
    if changed_name and sex == 'FtM Male':
      first_name = fake.first_name()
  #if cisgendered
  else:
    sex = fake.random_element(elements=('female', 'male'))
    if sex == 'female':
      first_name = fake.first_name_female()
      gender = 'female'
      pronouns = 'she/her'
    else:
      first_name = fake.first_name_male()
      gender = 'male'
      pronouns = 'he/him'

  is_nonbinary = fake.boolean(chance_of_getting_true=2)
  # print('is_nonbinary:', is_nonbinary)
  if is_nonbinary:
    gender = 'nonbinary'
    pronouns = fake.random_element(elements=('they/them', 'she/her', 'he/him', 'she/they', 'he/they', 'she/they/he', 'he/they/she', 'they/she/he', 'they/he/she', 'they/she', 'they/he', 'she/he'))

  is_intersex = fake.boolean(chance_of_getting_true=2)
  if is_intersex:
    sex = 'intersex' 
  # print('is_intersex:', is_intersex)

  # print('sex:',sex)
  # print('gender:',gender)
  # print('first_name:', first_name)
  # if 'preferred_name' in locals():
  #   print('preferred_name', preferred_name)
  # print('pronouns:', pronouns)

  last_name = fake.last_name()
  email = first_name[0].lower() + last_name.lower() + '@' + fake.domain_name()
  while email in emails:
      digits = 2
      email = first_name[slice(digits)].lower() + last_name.lower() + '@' + fake.domain_name()
      digits += 1
  emails.append(email)
  date_of_birth = fake.date_of_birth(minimum_age=18, maximum_age=90)
  days_in_year = 365.2425    
  age = int((date.today() - date_of_birth).days / days_in_year)
  # print("DOB:",date_of_birth)
  # print("age:", age)
  religion = fake.random_element(elements=('Christian', 'Muslim', 'Jewish', 'Buddhist', 'Hindu', 'Atheist', 'Agnostic', 'Other'))
  eyesight = fake.random_element(elements=('20/20', '20/40', '20/60', '20/80', '20/100', 'blind'))
  hearing = fake.random_element(elements=('hearing', 'hard of hearing', 'deaf'))
  mobility = fake.random_element(elements=('able', 'wheelchair', 'walker', 'cane', 'crutches'))
  #if female anatomy
  if sex == 'FtM male' or sex == 'female' or sex == 'intersex':
    is_pregnant = fake.boolean(chance_of_getting_true=5)
    # print("is_pregnant", is_pregnant)
    if is_pregnant:
      last_menstrual = fake.date_between(start_date='-280d', end_date='today')
    else:
      last_menstrual = fake.date_between(start_date='-28d', end_date='today')
  #if male anatomy
  else:
    is_pregnant = False
    # print("is_pregnant", is_pregnant)
  SSN = fake.random_int(min=100000000, max=999999999)
  height = fake.pyfloat(min_value=48, max_value=84, right_digits=2)
  # print("height:", height)
  weight = fake.pyfloat(min_value=110, max_value=270, right_digits=2)
  # print("weight:", weight)
  
  last_reviewed_timestamp = fake.date_time_this_year(before_now=True, after_now=False, tzinfo=None)


  phone = fake.random_int(min=1000000000, max=9999999999)
  blood_type = fake.random_element(elements=('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'))


'''
vaccines JSON
allergies JSON
surgeries JSON
family_history JSON
emergency_contacts JSON
last_reviewer_staff_id UUID
'''

generate_patient_data()


headers = ['email', 'password', 'first_name', 'last_name', 'date_of_birth', 'sex_at_birth', 'gender', 'pronouns', 'religion', 'eyesight', 'hearing', 'mobility', 'is_pregnant', 'last_menstrual', 'SSN', 'height', 'weight', 'vaccines', 'allergies', 'surgeries', 'family_history', 'last_reviewed_timestamp', 'emergency_contacts', 'last_reviewer_staff_id', 'preferred_name', 'blood_type']

# with open('patients.csv', 'w', newline='') as file:
#   writer = csv.writer(file)
#   writer.writerow(headers)
#   for i in range(10):
#     data = generate_patient_data()
#     writer.writerow(data)