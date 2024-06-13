import csv

from faker import Faker

fake = Faker()
"""
name VARCHAR

address_line_1 VARCHAR
address_line_2 VARCHAR
city VARCHAR
state CHAR(2)
zipcode INT //length 5

phone VARCHAR
email VARCHAR
website VARCHAR
hours VARCHAR //there's a syntax for making hours into a string
Mo - Fr <start>:00 - <end>:00
Sa - Su <start>:00 - <end>:00 or closed
"""
offices_types = [
    "Medical",
    "Health",
    "Group",
    "Clinic",
    "Memorial Hospital",
    "University Medical Group",
    "Medical Center",
    "Medical Clinic",
    "Health Center",
]


def generate_office_data():
    """ """
    nameA = fake.city()
    nameB = fake.random_element(offices_types)
    office_name = nameA + " " + nameB
    address_line_1 = fake.street_address()
    city = nameA
    state = fake.state_abbr()
    zipcode = fake.zipcode()

    phone = fake.random_int(min=1000000000, max=9999999999)
    email = fake.email()
    website = fake.url()
    start = str(fake.random_int(min=7, max=10))
    end = str(fake.random_int(min=16, max=19))
    coin_flip = fake.random_int(min=0, max=1)
    if coin_flip == 0:
        hours = "Mo - Fr " + start + ":00 - " + end + ":00, Sa - Su Closed"
    else:
        hours = "Mo - Su " + start + ":00 - " + end + ":00"
    return [
        office_name,
        address_line_1,
        city,
        state,
        zipcode,
        phone,
        email,
        website,
        hours,
    ]

    # print(office_name)
    # print(address_line_1)
    # print(city)
    # print(state)
    # print(zipcode)
    # print(phone)
    # print(email)
    # print(website)
    # print(hours)


header = [
    "name",
    "address_line_1",
    "city",
    "state",
    "zipcode",
    "phone",
    "email",
    "website",
    "hours",
]
with open("offices.csv", "w", newline="") as file:
    writer = csv.writer(file)
    writer.writerow(header)
    for i in range(1000):
        data = generate_office_data()
        writer.writerow(data)
