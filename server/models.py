from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy_serializer import SerializerMixin
from config import db, bcrypt


class Client(db.Model, SerializerMixin):
    __tablename__ = "clients"
    # serialize_rules = ('','')

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String)

    # add relationships

    # add password_hash property and authenticate instance methods here
    @property
    def password_hash(self):
        # ensures user does not have access to password
        raise AttributeError("You don't have permission to view the password!")

    @password_hash.setter
    def password_hash(self, password):
        # checks password security
        if len(password) < 8:
            raise ValueError("Password must be at least 8 characters.")
        if any(char.isspace() for char in password):
            raise ValueError("Paswords cannot contain spaces.")
        if any(char.isupper() for char in password) == False:
            raise ValueError("Password must contain an uppercase letter")
        if any(char.isdigit() for char in password) == False:
            raise ValueError("Password must contain a number.")
        if all(char.isalnum() for char in password) == True:
            raise ValueError("Password must contain a symbol.")
        # generates hashed version of password
        new_hashed_password = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = new_hashed_password.decode("utf-8")

    def authenticate(self, password):
        # check if inputted password matches user's password
        check = bcrypt.check_password_hash(
            self._password_hash, password.encode("utf-8")
        )
        print(check)
        return check

    @validates("email")
    def validates_email(self, key, value):
        if "@" in value and "." in value:
            return value.lower()
        else:
            raise ValueError("User must be given a email.")

    def __repr__(self):
        return f"<Client {self.id}: {self.email}>"


class Provider(db.Model, SerializerMixin):
    __tablename__ = "providers"
    # serialize_rules = ('','')

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, unique=True)
    _password_hash = db.Column(db.String)
    provider_code = db.Column(db.String, unique=True)

    # add relationships

    # add password_hash property and authenticate instance methods here
    @property
    def password_hash(self):
        # ensures user does not have access to password
        raise AttributeError("You don't have permission to view the password")

    @password_hash.setter
    def password_hash(self, password):
        # checks password security
        if len(password) < 8:
            raise ValueError("Password must be at least 8 characters.")
        if any(char.isspace() for char in password):
            raise ValueError("Paswords cannot contain spaces.")
        if any(char.isupper() for char in password) == False:
            raise ValueError("Password must contain an uppercase letter")
        if any(char.isdigit() for char in password) == False:
            raise ValueError("Password must contain a number.")
        if all(char.isalnum() for char in password) == True:
            raise ValueError("Password must contain a symbol.")
        # generates hashed version of password
        new_hashed_password = bcrypt.generate_password_hash(password.encode("utf-8"))
        self._password_hash = new_hashed_password.decode("utf-8")

    def authenticate(self, password):
        # check if inputted password matches user's password
        check = bcrypt.check_password_hash(
            self._password_hash, password.encode("utf-8")
        )
        print(check)
        return check

    @validates("email")
    def validates_email(self, key, value):
        if "@" in value and "." in value:
            return value.lower()
        else:
            raise ValueError("User must be given a email.")

    @validates("provider_code")
    def validates_provider_code(self, key, type):
        if type:
            return type
        else:
            raise ValueError("Provider must be given a provider code.")

    def __repr__(self):
        return (
            f"<Provider {self.id}: {self.email}, provider_code {self.provider_code} >"
        )


class ClientProvider(db.Model, SerializerMixin):
    __tablename__ = "clients_providers"
    # serialize_rules = ('','')

    id = db.Column(db.Integer, primary_key=True)
    clientFK = db.Column(db.String)
    providerFK = db.Column(db.String)

    # add relationships

    @validates("clientFK")
    def validates_clientFK(self, key, clientFK):
        if clientFK:
            return clientFK
        else:
            raise ValueError("ClientsProviders must be given a clientFK.")

    @validates("providerFK")
    def validates_providerFK(self, key, providerFK):
        if providerFK:
            return providerFK
        else:
            raise ValueError("ClientsProviders must be given a providerFK.")

    def __repr__(self):
        return f"<ClientsProviders {self.id}: client {self.clientFK}, provider {self.providerFK}>"
