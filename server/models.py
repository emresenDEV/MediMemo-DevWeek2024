from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from config import db, bcrypt

class User(db.Model, SerializerMixin):
  __tablename__ = 'users'
  serialize_rules = ('','')

  id = db.Column(db.Integer, primary_key=True)
  email = db.Column(db.String, unique=True)
  _password_hash = db.Column(db.String)
  type = db.Column(db.String)

  #add relationships

  # add password_hash property and authenticate instance methods here
  @property
  def password_hash(self):
    # ensures user does not have access to password
    raise AttributeError("You don't have permission to view the password!")
  
  @password_hash.setter
  def password_hash(self, password):
    # generates hashed version of password
    new_hashed_password = bcrypt.generate_password_hash(password, rounds=12)
    self._password_hash = new_hashed_password

  def authenticate(self, password):
    # check if inputted password matches user's password
    return bcrypt.check_password_hash(self._password_hash, bcrypt.generate_password_hash(password, rounds=12))

  @validates('email')
  def validates_email(self, key, value):
    if value:
      return value
    else:
      raise ValueError('User must be given a email.')
    
  @validates('_password_hash')
  def validates_password(self, key, _password_hash):
    if _password_hash:
      return _password_hash
    else:
      raise ValueError('User must be given a _password_hash.')
    
  @validates('type')
  def validates_password(self, key, type):
    if type:
      return type
    else:
      raise ValueError('User must be given a type.')
    
  def __repr__(self):
    return f'<User {self.id}: {self.email} ({self.type})>'

class UserCodeJoin(db.Model, SerializerMixin):
  __tablename__ = 'users_codes'
  serialize_rules = ('','')

  id = db.Column(db.Integer, primary_key=True)
  userFK = db.Column(db.String, unique=True)
  codeFK = db.Column(db.String)

  #add relationships

  @validates('userFK')
  def validates_userFK(self, key, userFK):
    if userFK:
      return userFK
    else:
      raise ValueError('UserCodeJoin must be given a userFK.')
    
  @validates('codeFK')
  def validates_codeFK(self, key, codeFK):
    if codeFK:
      return codeFK
    else:
      raise ValueError('UserCodeJoin must be given a codeFK.')
    
  def __repr__(self):
    return f'<UserCodeJoin {self.id}: user {self.userFK} code {self.codeFK}>'
  
class ProviderCode(db.Model, SerializerMixin):
  __tablename__ = 'codes'
  serialize_rules = ('','')

  id = db.Column(db.Integer, primary_key=True)
  code = db.Column(db.String)

  #add relationships

  @validates('code')
  def validates_code(self, key, code):
    if code:
      return code
    else:
      raise ValueError('ProviderCode must be given a code value.')