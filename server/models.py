from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from config import db, bcrypt

class User(db.Model, SerializerMixin):
  __tablename__ = 'users'
  serialize_rules = ('','')

  id = db.Column(db.Integer, primary_key=True)
  username = db.Column(db.String, unique=True)
  _password_hash = db.Column(db.String)

  #add foreign keys

  #add relationships

  @hybrid_property
  def password_hash(self):
    # ensures user does not have access to password
    raise AttributeError("You don't have permission to view the password!")
  
  @password_hash.setter
  def password_hash(self, password):
    # generates hashed version of password
    new_hashed_password = bcrypt.generate_password_hash(password.encode('utf-8'))

    self._password_hash = new_hashed_password.decode('utf-8')

  def authenticate(self, password):
    # check if inputted password matches user's password
    return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))

  @validates('username')
  def validates_username(self, key, value):
    if value:
      return value
    else:
      raise ValueError('User must be given a username.')
    
  @validates('password')
  def validates_password(self, key, password):
    if password:
      return password
    else:
      raise ValueError('User must be given a password.')
    
  def __repr__(self):
    return f'<User {self.id}: {self.username}>'
