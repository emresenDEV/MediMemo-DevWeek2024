from config import app, db
from flask import make_response, request, session
from models import User
from sqlalchemy import UniqueConstraint

@app.route('/')
def index():
    return ''


# run python app.py
if __name__ == '__main__':
    app.run(port=5555, debug=True)