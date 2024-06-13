import csv

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

specialty VARCHAR
biography VARCHAR
languages VARCHAR
ages_accepted VARCHAR
accepting_new BOOLEAN
conditions VARCHAR
services VARCHAR
licenses VARCHAR

"""

specialties = [
    "Family Medicine",
    "Internal Medicine",
    "Pediatrics",
    "OB/GYN",
    "Surgery",
    "Neurology",
    "Psychiatry",
    "Plastic Surgery",
    "Otolaryngology",
    "Urology",
    "Anesthesiology",
    "Radiology",
    "Pathology",
    "Emergency Medicine",
    "Critical Care",
    "Preventive Medicine",
    "Physical Medicine and Rehabilitation",
    "Orthopedics",
    "Ophthalmology",
    "Dermatology",
    "Cardiology",
    "Gastroenterology",
    "Pulmonology",
    "Hematology",
    "Oncology",
    "Rheumatology",
    "Endocrinology",
    "Nephrology",
    "Infectious Diseases",
    "Allergy/Immunology",
    "Trauma Surgery",
    "Cardiothoracic Surgery",
    "Vascular Surgery",
    "Gender Surgery",
    "Interventional Cardiology",
    "Reproductive Endocrinology",
    "Neonatology",
    "Pediatric Intensivist",
    "Podiatry",
    "Sports Medicine Doctor",
]

passwords = []
emails = []


def generate_staff_data():
    password = fake.password()
    # name_title = fake.prefix()
    first_name = fake.first_name()
    last_name = fake.last_name()
    probability = fake.random_int(min=0, max=5)
    # if probability == 0:
    #     name_suffix = fake.suffix()
    # else:
    #     name_suffix = ''
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
    phone = fake.random_int(min=1000000000, max=9999999999)
    specialty = fake.random_element(specialties)
    biography = fake.paragraph()
    multilingual = fake.boolean(chance_of_getting_true=20)
    if multilingual:
        extra_languages = fake.random_int(min=1, max=2)
    else:
        extra_languages = 0
    languages = ["English"] + fake.random_elements(
        unique="true",
        length=extra_languages,
        elements=[
            "Spanish",
            "French",
            "German",
            "Italian",
            "Russian",
            "Chinese",
            "Japanese",
            "Korean",
            "Arabic",
            "Hindi",
            "Portuguese",
        ],
    )
    languages = ", ".join(languages)
    accepting_new = fake.boolean(chance_of_getting_true=70)
    return [
        email,
        password,
        first_name,
        last_name,
        specialty,
        biography,
        languages,
        accepting_new,
        phone,
    ]


header = [
    "email",
    "password",
    "first_name",
    "last_name",
    "specialty",
    "biography",
    "languages",
    "accepting_new",
    "phone",
]

with open("staff.csv", "w", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(header)
    for i in range(1000):
        data = generate_staff_data()
        writer.writerow(data)
        # print(passwords)
        # print(emails)
