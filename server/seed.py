import datetime
from app import app
from models import db, Client, Provider, ClientProvider

def create_clients():
  c1 = Client(
    email = "tom@gmail.com"
    )
  c1.password_hash = "Abcdefgh1@"
  c2 = Client(
    email = "jerry@gmail.com"
    )
  c2.password_hash = "1234567A&"
  clients = [c1, c2]
  return clients

def create_providers():
  p1 = Provider(
    email = "velma@gmail.com",
    provider_code = "1000"
    )
  p1.password_hash = "Scooby1&"
  p2 = Provider(
    email = "daphne@gmail.com",
    provider_code = "1001"
    )
  p2.password_hash = "Mystery8?"
  providers = [p1, p2]
  return providers

def create_clients_providers():
  j1 = ClientProvider(
    clientFK = 1,
    providerFK = 1
    )
  j2 = ClientProvider(
    clientFK = 2,
    providerFK = 1
    )
  j3 = ClientProvider(
    clientFK = 2,
    providerFK = 2
  )
  clients_providers = [j1, j2, j3]
  return clients_providers


if __name__ == '__main__':

  with app.app_context():
    print("Clearing db...")
    Client.query.delete()
    Provider.query.delete()
    ClientProvider.query.delete()

    print("Seeding clients...")
    clients = create_clients()
    db.session.add_all(clients)
    db.session.commit()

    print("Seeding providers...")
    providers = create_providers()
    db.session.add_all(providers)
    db.session.commit()

    print("Seeding clients_providers...")
    clients_providers = create_clients_providers()
    db.session.add_all(clients_providers)
    db.session.commit()

    print("Done seeding!")