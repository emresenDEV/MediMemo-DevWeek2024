# MediMemo-DevWeek2024

 This application is a team submission for the DeveloperWeek2024 Hackathon. Our goal is to create a health app that emphasizes the ability to securely cache patient data offline and seamlessly update patient files once the connection is restored.

## Running the Backend

### First Time

    - must install the following in this order: pyenv, python (using pyenv), pip, and pipenv (using pip)
    - terminal commands:
        - python3 -m venv .venv
        - pipenv install
        - pipenv shell
        - cd server && export FLASK_APP=app.py
        - flask db init && flask db migrate -m "initial migration" && flask db upgrade
        - python seed.py && python app.py

### Future Times

    - terminal commands:
        - pipenv shell
        - cd server
        - python app.py


## Running the Frontend

### First Time

    - must have node.js installed
    - terminal command:
        - cd client && npm install && npm start

### Future Times

    - terminal command:
        - cd client && npm start


### Thank you!!