from faker import Faker
import csv
from datetime import date
from dateutil import tz
import json

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
  SSN = fake.random_int(min=100000000, max=999999999)
  phone = fake.random_int(min=1000000000, max=9999999999)
  religion = fake.random_element(elements=('Christian', 'Muslim', 'Jewish', 'Buddhist', 'Hindu', 'Atheist', 'Agnostic', 'Other'))
  eyesight = fake.random_element(elements=('20/20', '20/40', '20/60', '20/80', '20/100', 'blind'))
  hearing = fake.random_element(elements=('hearing', 'hard of hearing', 'deaf'))
  mobility = fake.random_element(elements=('able', 'wheelchair', 'walker', 'cane', 'crutches'))
  height = fake.pyfloat(min_value=48, max_value=84, right_digits=2)
  weight = fake.pyfloat(min_value=110, max_value=270, right_digits=2)
  blood_type = fake.random_element(elements=('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'))

  date_of_birth = fake.date_of_birth(minimum_age=18, maximum_age=90)
  days_in_year = 365.2425    
  age = int((date.today() - date_of_birth).days / days_in_year)

  last_reviewed_timestamp = fake.date_time_this_year(before_now=True, after_now=False, tzinfo=tz.gettz('America/Chicago'))
  # reviewer_staff_id = fake.uuid4()

  #determine sex and gender (transgender, nonbinary, intersex, cisgender)
  is_transgender = fake.boolean(chance_of_getting_true=1)
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
  if is_nonbinary:
    gender = 'nonbinary'
    pronouns = fake.random_element(elements=('they/them', 'she/her', 'he/him', 'she/they', 'he/they', 'she/they/he', 'he/they/she', 'they/she/he', 'they/he/she', 'they/she', 'they/he', 'she/he'))

  is_intersex = fake.boolean(chance_of_getting_true=2)
  if is_intersex:
    sex = 'intersex'

  #if female anatomy
  if sex == 'FtM male' or sex == 'female' or sex == 'intersex':
    is_pregnant = fake.boolean(chance_of_getting_true=5)
    if is_pregnant:
      last_menstrual = fake.date_between(start_date='-280d', end_date='today')
    else:
      last_menstrual = fake.date_between(start_date='-28d', end_date='today')
  #if male anatomy
  else:
    is_pregnant = False

  last_name = fake.last_name()
  email = first_name[0].lower() + last_name.lower() + '@' + fake.domain_name()
  while email in emails:
      digits = 2
      email = first_name[slice(digits)].lower() + last_name.lower() + '@' + fake.domain_name()
      digits += 1
  emails.append(email)

  #allergies JSON object (allergen: [reactions])
  possible_allergens = ['Peanuts', 'Penicillin', 'NSAIDs', 'Iodinated contrast', 'Gadolinium contrast', 'Ester local anesthetics', 'Latex', 'Soy', 'Dairy', 'Eggs', 'Shellfish', 'Gluten', 'Fish', 'Tree nuts', 'Wheat', 'Sesame', 'Sulfites', 'Corn', 'Kiwi', 'Mango', 'Pineapple']
  possible_reactions = ['Anaphylaxis', 'Hives', 'Rash', 'Itching', 'Swelling', 'Coughing', 'Wheezing', 'Shortness of breath', 'Nausea', 'Vomiting', 'Diarrhea', 'Abdominal pain', 'Dizziness', 'Fainting', 'Low blood pressure', 'Fast heart rate', 'Confusion', 'Loss of consciousness']
  allergies = {}
  num_allergies = fake.random_int(min=0, max=2)
  their_allergens = set()
  while len(their_allergens) < num_allergies:
    allergy = fake.random_element(elements=possible_allergens)
    their_allergens.add(allergy)
  for allergen in their_allergens:
    num_reactions = fake.random_int(min=2, max=4)
    their_reactions = set()
    while len(their_reactions) < num_reactions:
      reaction = fake.random_element(elements=possible_reactions)
      their_reactions.add(reaction)
    allergies.update({allergen: list(their_reactions)})
  allergies = json.dumps(allergies)
  # print(allergies)

  #vaccines JSON object (vaccine: date)
  possible_vaccines = ['COVID-19', 'Influenza', 'Hepatitis A', 'Hepatitis B', 'HPV', 'Measles, Mumps, Rubella', 'Pneumococcal', 'Polio', 'Tetanus, Diphtheria, Pertussis', 'Varicella', 'Zoster']
  vaccines = {}
  num_vaccines = fake.random_int(min=5, max=11)
  their_vaccines = set()
  while len(their_vaccines) < num_vaccines:
    vaccine = fake.random_element(elements=possible_vaccines)
    their_vaccines.add(vaccine)
  for vaccine in their_vaccines:
    vaccines.update({vaccine: str(fake.date_between(start_date='-'+str(age)+'y', end_date='today'))})
  vaccines = json.dumps(vaccines)
  # print(vaccines)

  #surgeries JSON object (surgery: date)
  surgeries = {}
  possible_surgeries = ['Appendectomy', 'Cholecystectomy', 'Hernia repair', 'Mastectomy', 'Tonsillectomy', 'Adenoidectomy', 'Cataract surgery', 'Coronary artery bypass', 'Heart valve repair', 'Hip replacement', 'Knee replacement', 'Spinal fusion', 'Laminectomy', 'Lobectomy', 'Lung transplant', 'Wisdom Teeth Removal', 'ACL repair', 'Rotator cuff repair']
  num_surgeries = fake.random_int(min=0, max=4)
  their_surgeries = set()
  while len(their_surgeries) < num_surgeries:
    surgery = fake.random_element(elements=possible_surgeries)
    their_surgeries.add(surgery)
  for surgery in their_surgeries:
    surgeries.update({surgery: str(fake.date_between(start_date='-'+str(age-15)+'y', end_date='today'))})
  surgeries = json.dumps(surgeries)
  # print(surgeries)

  #family_history JSON object (condition: [relatives])
  possible_conditions = ['Heart disease', 'Stroke', 'Diabetes', 'Cancer', 'High blood pressure', 'High cholesterol', 'Asthma', 'Arthritis', 'Osteoporosis', 'Alzheimer\'s', 'Dementia', 'Depression', 'Anxiety', 'Bipolar disorder', 'Schizophrenia', 'ADHD', 'Autism', 'Epilepsy', 'Migraines', 'Thyroid disease', 'Kidney disease', 'Liver disease', 'Lung disease', 'COPD', 'Crohn\'s disease', 'Ulcerative colitis', 'Celiac disease', 'Multiple sclerosis', 'Lupus', 'Rheumatoid arthritis', 'Psoriasis', 'HIV/AIDS', 'Hepatitis', 'Tuberculosis']

'''
medical_history JSON array [conditions]
family_history JSON object (condition: [relatives])
emergency_contacts JSON object (name: [phones])
medications JSON object (medication: {dosage, frequency, start_date, end_date, prescriber(?)})
pharmacy_name
pharmacy_address
pharmacy_phone
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