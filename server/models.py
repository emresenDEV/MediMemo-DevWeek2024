from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from config import db, bcrypt

class Client(db.Model, SerializerMixin):
  __tablename__ = 'clients'
  # serialize_rules = ('',)
  serialize_rules = ('-appointments.client', '-providers.client', '-providers.clientFK', '-providers.id', '-providers.providerFK')

  id = db.Column(db.Integer, primary_key=True)
  email = db.Column(db.String, unique=True)
  _password_hash = db.Column(db.String)

  #add relationships
  appointments = db.relationship('Appointment', backref="client")
  providers = db.relationship('ClientProvider', backref="client")
  #providers

  # add password_hash property and authenticate instance methods here
  @property
  def password_hash(self):
    # ensures user does not have access to password
    raise AttributeError("You don't have permission to view the password!")
  
  @password_hash.setter
  def password_hash(self, password):
    #checks password security
    if len(password) < 8:
      raise ValueError('Password must be at least 8 characters.')
    if any(char.isspace() for char in password):
      raise ValueError('Paswords cannot contain spaces.')
    if any(char.isupper() for char in password) == False:
      raise ValueError('Password must contain an uppercase letter')
    if any(char.isdigit() for char in password) == False:
      raise ValueError('Password must contain a number.')
    if all(char.isalnum() for char in password) == True:
      raise ValueError('Password must contain a symbol.')
    # generates hashed version of password
    new_hashed_password = bcrypt.generate_password_hash(password.encode('utf-8'))
    self._password_hash = new_hashed_password.decode('utf-8')


  def authenticate(self, password):
    # check if inputted password matches user's password
    check = bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    print(check)
    return check

  @validates('email')
  def validates_email(self, key, value):
    if "@" in value and "." in value:
      return value.lower()
    else:
      raise ValueError('User must be given a email.')
    
  def __repr__(self):
    return f'<Client {self.id}: {self.email}>'

class Provider(db.Model, SerializerMixin):
  __tablename__ = 'providers'
  serialize_rules = ('-appointments.provider', '-clients.provider', '-clients.clientFK', '-clients.id', '-clients.providerFK')

  #ROWS
  id = db.Column(db.Integer, primary_key=True)
  email = db.Column(db.String, unique=True)
  _password_hash = db.Column(db.String)
  provider_code = db.Column(db.String, unique=True)

  #RELATIONSHIPS
  appointments = db.relationship('Appointment', backref='provider', cascade="all, delete-orphan")
  clients = db.relationship('ClientProvider', backref='provider', cascade="all, delete-orphan")

  # add password_hash property and authenticate instance methods here
  @property
  def password_hash(self):
    # ensures user does not have access to password
    raise AttributeError("You don't have permission to view the password")
  
  @password_hash.setter
  def password_hash(self, password):
    #checks password security
    if len(password) < 8:
      raise ValueError('Password must be at least 8 characters.')
    if any(char.isspace() for char in password):
      raise ValueError('Paswords cannot contain spaces.')
    if any(char.isupper() for char in password) == False:
      raise ValueError('Password must contain an uppercase letter')
    if any(char.isdigit() for char in password) == False:
      raise ValueError('Password must contain a number.')
    if all(char.isalnum() for char in password) == True:
      raise ValueError('Password must contain a symbol.')
    # generates hashed version of password
    new_hashed_password = bcrypt.generate_password_hash(password.encode('utf-8'))
    self._password_hash = new_hashed_password.decode('utf-8')


  def authenticate(self, password):
    # check if inputted password matches user's password
    check = bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    print(check)
    return check

  @validates('email')
  def validates_email(self, key, value):
    if "@" in value and "." in value:
      return value.lower()
    else:
      raise ValueError('User must be given a email.')

  @validates('provider_code')
  def validates_provider_code(self, key, type):
    if type:
      return type
    else:
      raise ValueError('Provider must be given a provider code.')
    
  def __repr__(self):
    return f'<Provider {self.id}: {self.email}, provider_code {self.provider_code} >'

class ClientProvider(db.Model, SerializerMixin):
  __tablename__ = 'clients_providers'
  serialize_rules = ('-provider.clients', '-provider.appointments', '-provider._password_hash', '-client.appointments', '-client._password_hash', '-client.providers')

  id = db.Column(db.Integer, primary_key=True)
  clientFK = db.Column(db.Integer, db.ForeignKey('clients.id'))
  providerFK = db.Column(db.Integer, db.ForeignKey('providers.id'))

  @validates('clientFK')
  def validates_clientFK(self, key, clientFK):
    if clientFK:
      return clientFK
    else:
      raise ValueError('ClientsProviders must be given a clientFK.')
    
  @validates('providerFK')
  def validates_providerFK(self, key, providerFK):
    if providerFK:
      return providerFK
    else:
      raise ValueError('ClientsProviders must be given a providerFK.')
    
  def __repr__(self):
    return f'<ClientsProviders {self.id}: client {self.clientFK}, provider {self.providerFK}>'
  
class Appointment(db.Model, SerializerMixin):
  __tablename__ = 'appointments'
  serialize_rules = ('-client.appointments', '-client._password_hash', '-client.providers', '-provider.appointments', '-provider._password_hash', '-provider.clients', '-provider.provider_code')

  id = db.Column(db.Integer, primary_key=True)
  clientFK = db.Column(db.Integer, db.ForeignKey('clients.id'))
  providerFK = db.Column(db.Integer, db.ForeignKey('providers.id'))
  title = db.Column(db.String)
  startDate = db.Column(db.String)
  endDate = db.Column(db.String)
  rRule = db.Column(db.String)
  exDate = db.Column(db.String)
  location = db.Column(db.String)

  #add relationships
  

  @validates('clientFK')
  def validates_clientFK(self, key, clientFK):
    if clientFK:
      return clientFK
    else:
      raise ValueError('ClientsProviders must be given a clientFK.')
    
  @validates('providerFK')
  def validates_providerFK(self, key, providerFK):
    if providerFK:
      return providerFK
    else:
      raise ValueError('ClientsProviders must be given a providerFK.')
    
  @validates('title')
  def validates_title(self, key, title):
    if title:
      return title
    else:
      raise ValueError('ClientsProviders must be given a title.')
    
  @validates('startDate')
  def validates_startDate(self, key, startDate):
    if startDate:
      return startDate
    else:
      raise ValueError('ClientsProviders must be given a startDate.')
    
  @validates('endDate')
  def validates_endDate(self, key, endDate):
    if endDate:
      return endDate
    else:
      raise ValueError('ClientsProviders must be given a endDate.')
  
  def __repr__(self):
    return f'<Appointment {self.id}: {self.title}, client {self.clientFK}, provider {self.providerFK}, start {self.startDate}, end {self.endDate}>'