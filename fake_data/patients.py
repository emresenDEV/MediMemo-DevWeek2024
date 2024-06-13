import csv
import json
from datetime import date

from dateutil import tz
from faker import Faker

fake = Faker()

"""
email VARCHAR UNIQUE
password VARCHAR

name_title VARCHAR
first_name VARCHAR
middle_name VARCHAR
last_name VARCHAR
name_suffix VARCHAR

date_of_birth DATE
sex VARCHAR
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
vaccines JSON object (vaccine: date)

allergies JSON object (allergen: [reactions])
surgeries JSON object (surgery: date)
family_history JSON object (condition: [relatives])
last_reviewed_timestamp TIMESTAMP
emergency_contacts JSON object (name: [phones])

last_reviewer_staff_id UUID (temporarily blank)
preferred_name VARCHAR
blood_type VARCHAR
phone VARCHAR
medical_history JSON array [conditions]

pharmacy_name
pharmacy_address
pharmacy_phone
"""

emails = []
possible_allergens = [
    "Peanuts",
    "Penicillin",
    "NSAIDs",
    "Iodinated contrast",
    "Gadolinium contrast",
    "Ester local anesthetics",
    "Latex",
    "Soy",
    "Dairy",
    "Eggs",
    "Shellfish",
    "Gluten",
    "Fish",
    "Tree nuts",
    "Wheat",
    "Sesame",
    "Sulfites",
    "Corn",
    "Kiwi",
    "Mango",
    "Pineapple",
]
possible_reactions = [
    "Anaphylaxis",
    "Hives",
    "Rash",
    "Itching",
    "Swelling",
    "Coughing",
    "Wheezing",
    "Shortness of breath",
    "Nausea",
    "Vomiting",
    "Diarrhea",
    "Abdominal pain",
    "Dizziness",
    "Fainting",
    "Low blood pressure",
    "Fast heart rate",
    "Confusion",
    "Loss of consciousness",
]
possible_vaccines = [
    "COVID-19",
    "Influenza",
    "Hepatitis A",
    "Hepatitis B",
    "HPV",
    "Measles, Mumps, Rubella",
    "Pneumococcal",
    "Polio",
    "Tetanus, Diphtheria, Pertussis",
    "Varicella",
    "Zoster",
]
possible_surgeries = [
    "Appendectomy",
    "Cholecystectomy",
    "Hernia repair",
    "Mastectomy",
    "Tonsillectomy",
    "Adenoidectomy",
    "Cataract surgery",
    "Coronary artery bypass",
    "Heart valve repair",
    "Hip replacement",
    "Knee replacement",
    "Spinal fusion",
    "Laminectomy",
    "Lobectomy",
    "Lung transplant",
    "Wisdom Teeth Removal",
    "ACL repair",
    "Rotator cuff repair",
]
possible_conditions = [
    "Heart disease",
    "Stroke",
    "Diabetes",
    "Cancer",
    "High blood pressure",
    "High cholesterol",
    "Asthma",
    "Arthritis",
    "Osteoporosis",
    "Alzheimer's",
    "Dementia",
    "Depression",
    "Anxiety",
    "Bipolar disorder",
    "Schizophrenia",
    "ADHD",
    "Autism",
    "Epilepsy",
    "Migraines",
    "Thyroid disease",
    "Kidney disease",
    "Liver disease",
    "Lung disease",
    "COPD",
    "Crohn's disease",
    "Ulcerative colitis",
    "Celiac disease",
    "Multiple sclerosis",
    "Lupus",
    "Rheumatoid arthritis",
    "Psoriasis",
    "HIV/AIDS",
    "Hepatitis",
    "Tuberculosis",
]
medical_conditions = [
    "Asthma",
    "Diabetes",
    "High blood pressure",
    "High cholesterol",
    "Heart disease",
    "Stroke",
    "Cancer",
    "Arthritis",
    "Osteoporosis",
    "Alzheimer's",
    "Dementia",
    "Depression",
    "Anxiety",
    "Bipolar disorder",
    "Schizophrenia",
    "ADHD",
    "Autism",
    "Epilepsy",
    "Migraines",
    "Thyroid disease",
    "Kidney disease",
    "Liver disease",
    "Lung disease",
    "COPD",
    "Crohn's disease",
    "Ulcerative colitis",
    "Celiac disease",
    "Multiple sclerosis",
    "Lupus",
    "Rheumatoid arthritis",
    "Psoriasis",
    "HIV/AIDS",
    "Hepatitis",
    "Tuberculosis",
]


def generate_patient_data():
    """ """
    password = fake.password()
    SSN = fake.random_int(min=100000000, max=999999999)
    phone = fake.random_int(min=1000000000, max=9999999999)
    religion = fake.random_element(
        elements=(
            "Christian",
            "Muslim",
            "Jewish",
            "Buddhist",
            "Hindu",
            "Atheist",
            "Agnostic",
            "Other",
        )
    )
    eyesight = fake.random_element(
        elements=("20/20", "20/40", "20/60", "20/80", "20/100", "blind")
    )
    hearing = fake.random_element(elements=("hearing", "hard of hearing", "deaf"))
    mobility = fake.random_element(
        elements=("able", "wheelchair", "walker", "cane", "crutches")
    )
    height = fake.pyfloat(min_value=48, max_value=84, right_digits=2)
    weight = fake.pyfloat(min_value=110, max_value=270, right_digits=2)
    blood_type = fake.random_element(
        elements=("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    )

    date_of_birth = fake.date_of_birth(minimum_age=18, maximum_age=90)
    days_in_year = 365.2425
    age = int((date.today() - date_of_birth).days / days_in_year)

    last_reviewed_timestamp = fake.date_time_this_year(
        before_now=True, after_now=False, tzinfo=tz.gettz("America/Chicago")
    )
    # reviewer_staff_id = fake.uuid4()

    # determine sex and gender (transgender, nonbinary, intersex, cisgender)
    preferred_name = "NULL"  # reset later if needed
    is_transgender = fake.boolean(chance_of_getting_true=1)
    if is_transgender:
        sex = fake.random_element(elements=("FtM male", "MtF female"))
        changed_name = fake.boolean(chance_of_getting_true=30)
        # if trans male
        if sex == "FtM male":
            gender = "male"
            pronouns = "he/him"
            if changed_name:
                first_name = fake.first_name_male()
            else:
                first_name = fake.first_name_female()
                preferred_name = fake.first_name_male()
        # if trans female
        else:
            gender = "female"
            pronouns = "she/her"
            if changed_name:
                first_name = fake.first_name_female()
            else:
                first_name = fake.first_name_male()
                preferred_name = fake.first_name_female()
        if changed_name and sex == "FtM Male":
            first_name = fake.first_name()
    # if cisgendered
    else:
        sex = fake.random_element(elements=("female", "male"))
        if sex == "female":
            first_name = fake.first_name_female()
            gender = "female"
            pronouns = "she/her"
        else:
            first_name = fake.first_name_male()
            gender = "male"
            pronouns = "he/him"

    is_nonbinary = fake.boolean(chance_of_getting_true=2)
    if is_nonbinary:
        gender = "nonbinary"
        pronouns = fake.random_element(
            elements=(
                "they/them",
                "she/her",
                "he/him",
                "she/they",
                "he/they",
                "she/they/he",
                "he/they/she",
                "they/she/he",
                "they/he/she",
                "they/she",
                "they/he",
                "she/he",
            )
        )

    is_intersex = fake.boolean(chance_of_getting_true=2)
    if is_intersex:
        sex = "intersex"

    # if female anatomy
    if sex == "FtM male" or sex == "female" or sex == "intersex":
        is_pregnant = fake.boolean(chance_of_getting_true=5)
        if is_pregnant:
            last_menstrual = fake.date_between(start_date="-280d", end_date="today")
        else:
            last_menstrual = fake.date_between(start_date="-28d", end_date="today")
    # if male anatomy
    else:
        is_pregnant = False
        last_menstrual = "NULL"

    last_name = fake.last_name()
    email = first_name[0].lower() + last_name.lower() + "@" + fake.domain_name()
    while email in emails:
        digits = 2
        email = (
            first_name[slice(digits)].lower()
            + last_name.lower()
            + "@"
            + fake.domain_name()
        )
        digits += 1
    emails.append(email)

    # allergies JSON object (allergen: [reactions])
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

    # vaccines JSON object (vaccine: date)
    vaccines = {}
    num_vaccines = fake.random_int(min=5, max=11)
    their_vaccines = set()
    while len(their_vaccines) < num_vaccines:
        vaccine = fake.random_element(elements=possible_vaccines)
        their_vaccines.add(vaccine)
    for vaccine in their_vaccines:
        vaccines.update(
            {
                vaccine: str(
                    fake.date_between(start_date="-" + str(age) + "y", end_date="today")
                )
            }
        )
    vaccines = json.dumps(vaccines)
    # print(vaccines)

    # surgeries JSON object (surgery: date)
    surgeries = {}
    num_surgeries = fake.random_int(min=0, max=4)
    their_surgeries = set()
    while len(their_surgeries) < num_surgeries:
        surgery = fake.random_element(elements=possible_surgeries)
        their_surgeries.add(surgery)
    for surgery in their_surgeries:
        surgeries.update(
            {
                surgery: str(
                    fake.date_between(
                        start_date="-" + str(age - 15) + "y", end_date="today"
                    )
                )
            }
        )
    surgeries = json.dumps(surgeries)
    # print(surgeries)

    # family_history JSON object (condition: [relatives])
    family_history = {}
    num_conditions = fake.random_int(min=0, max=5)
    their_conditions = set()
    while len(their_conditions) < num_conditions:
        condition = fake.random_element(elements=possible_conditions)
        their_conditions.add(condition)
    for condition in their_conditions:
        num_relatives = fake.random_int(min=1, max=3)
        their_relatives = set()
        while len(their_relatives) < num_relatives:
            relative = fake.random_element(
                elements=(
                    "mother",
                    "father",
                    "sister",
                    "brother",
                    "grandmother",
                    "grandfather",
                    "aunt",
                    "uncle",
                    "cousin",
                )
            )
            their_relatives.add(relative)
        family_history.update({condition: list(their_relatives)})
    family_history = json.dumps(family_history)
    # print(family_history)

    # emergency_contacts JSON object (name: [phones])
    emergency_contacts = {}
    num_contacts = fake.random_int(min=1, max=2)
    their_contacts = set()
    while len(their_contacts) < num_contacts:
        contact = fake.name()
        their_contacts.add(contact)
    for contact in their_contacts:
        num_phones = fake.random_int(min=1, max=2)
        their_phones = set()
        while len(their_phones) < num_phones:
            phone = fake.random_int(min=1000000000, max=9999999999)
            their_phones.add(phone)
        emergency_contacts.update({contact: list(their_phones)})
    emergency_contacts = json.dumps(emergency_contacts)
    # print(emergency_contacts)

    # medical_history JSON array [conditions]
    num_conditions = fake.random_int(min=0, max=5)
    their_conditions = set()
    while len(their_conditions) < num_conditions:
        condition = fake.random_element(elements=medical_conditions)
        their_conditions.add(condition)
    medical_history = json.dumps(list(their_conditions))
    # print(medical_history)

    # legal_guardians JSON array [{name, relationship to patient, phones: [], emails: []}]
    legal_guardians = []
    num_guardians = fake.random_int(min=1, max=2)
    while len(legal_guardians) < num_guardians:
        guardian_gender = fake.random_element(elements=("Male", "Female"))
        if guardian_gender == "Male":
            first_name = fake.first_name_male()
            relationship = fake.random_element(
                elements=("father", "grandfather", "uncle", "cousin", "brother")
            )
        else:
            first_name = fake.first_name_female()
            relationship = fake.random_element(
                elements=("mother", "grandmother", "aunt", "cousin", "sister")
            )
        last_name = fake.last_name()
        email = first_name[0].lower() + last_name.lower() + "@" + fake.domain_name()
        phone = fake.random_int(min=1000000000, max=9999999999)
        legal_guardians.append(
            {
                "first_name": first_name,
                "last_name": last_name,
                "relationship": relationship,
                "phones": [phone],
                "emails": [email],
            }
        )
    legal_guardians = json.dumps(list(legal_guardians))

    pharmacy_name = fake.company()
    pharmacy_address = fake.address()
    pharmacy_phone = fake.random_int(min=1000000000, max=9999999999)

    # fake_patient = {'email':email, 'password':password, 'name_title':'NULL', 'first_name':first_name, 'middle_name':'NULL', 'last_name':last_name, 'name_suffix':'NULL', 'date_of_birth':date_of_birth, 'sex':sex, 'gender':gender, 'pronouns':pronouns, 'religion':religion, 'eyesight':eyesight, 'hearing':hearing, 'mobility':mobility, 'is_pregnant':str(is_pregnant).lower(), 'last_menstrual':last_menstrual, 'SSN':SSN, 'height':height, 'weight':weight, 'vaccines':vaccines, 'allergies':allergies, 'surgeries':surgeries, 'family_history':family_history, 'last_reviewed_timestamp':last_reviewed_timestamp, 'emergency_contacts':emergency_contacts, 'last_reviewer_staff_id':'NULL', 'preferred_name':preferred_name, 'blood_type':blood_type, 'phone':phone, 'medical_history':medical_history, 'pharmacy_name':pharmacy_name, 'pharmacy_address':pharmacy_address, 'pharmacy_phone':pharmacy_phone}
    return [
        email,
        password,
        "NULL",
        first_name,
        "NULL",
        last_name,
        "NULL",
        date_of_birth,
        sex,
        gender,
        pronouns,
        religion,
        eyesight,
        hearing,
        mobility,
        str(is_pregnant).lower(),
        last_menstrual,
        preferred_name,
        SSN,
        height,
        weight,
        vaccines,
        allergies,
        surgeries,
        family_history,
        last_reviewed_timestamp,
        emergency_contacts,
        "NULL",
        blood_type,
        phone,
        medical_history,
        pharmacy_name,
        pharmacy_address,
        pharmacy_phone,
    ]


headers = [
    "email",
    "password",
    "name_title",
    "first_name",
    "middle_name",
    "last_name",
    "name_suffix",
    "date_of_birth",
    "sex",
    "gender",
    "pronouns",
    "religion",
    "eyesight",
    "hearing",
    "mobility",
    "is_pregnant",
    "last_menstrual",
    "preferred_name",
    "SSN",
    "height",
    "weight",
    "vaccines",
    "allergies",
    "surgeries",
    "family_history",
    "last_reviewed_timestamp",
    "emergency_contacts",
    "last_reviewer_staff_id",
    "blood_type",
    "phone",
    "medical_history",
    "pharmacy_name",
    "pharmacy_address",
    "pharmacy_phone",
]

with open("patients.csv", "w", newline="") as file:
    writer = csv.writer(file)
    # writer.writerow(headers)
    for i in range(1000):
        data = generate_patient_data()
        writer.writerow(data)
