from faker import Faker
import csv
fake = Faker()

'''
name VARCHAR UNIQUE
phone VARCHAR
'''

insurances_list = ['Aetna', 'Blue Cross Blue Shield', 'Cigna',  'UnitedHealth Group', 'Centene Corp.', 'Kaiser Permanente', 'Humana', 'Health Care Services Corporation']

header = ['name', 'phone']

with open('insurances.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(header)
    for item in insurances_list:
        writer.writerow([item, fake.random_int(min=1000000000, max=9999999999)])