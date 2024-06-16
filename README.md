# MediMemo-DevWeek2024

 This application is currently in development. Our goal is to create a medical record system that prevents the loss of patient data during data entry due to network loss and seamlessly updates patient files once the connection is restored.

## Anticipated Features
- Scheduling Tool
- Data Entry Tool
- Patient History Viewer
- Provider Locator

## Running the Program

### First Time
- must have node.js installed
- terminal command:
    - cd client && npm install && npm start

### Future Times
- terminal command:
    - cd client && npm start

## Instructions for Using Pipenv

- pip install pipenv (installs pipenv to your machine)
- pipenv shell (creates a virtual environment for your project)
- pipenv install (installs packages from our pipfile to your machine)
- pipenv install <package-name> (to add more packages to the pipfile)

## Instructions for Querying the Database

- To query the database with SQL commands, you must be given the login credientials by an administrator.
- Then you can use the **query** function defined in **fake_data/connect.py**:
    - from fake_data.connect import query
    - query("SELECT * FROM patients LIMIT 5")
    - results will populate in query.csv

### Thank you!!

