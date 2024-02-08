from flask import Flask, make_response, request
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt

app = Flask(__name__)

# make the connection to the DB through SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///medimemo.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

convention = {"fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s"}
metadata = MetaData(naming_convention=convention)
db = SQLAlchemy(metadata=metadata)

# create our migration using our db
migrate = Migrate(app, db)

# initialize the flask app
db.init_app(app)

bcrypt = Bcrypt(app)