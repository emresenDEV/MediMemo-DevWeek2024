import datetime
from app import app
from models import db, User, UserCodeJoin, ProviderCode #and all classes

def create_users():
  u1 = User(
    email = "tom@gmail.com",
    type = "provider"
    )
  u1.password_hash = "1234"
  u2 = User(
    email = "jerry@gmail.com",
    type = "patient"
    )
  u2.password_hash = "1234"
  users = [u1, u2]
  return users

def create_codes():
  c1 = ProviderCode(
    code = "AB12")
  codes = [c1]
  return codes

def create_users_codes():
  j1 = UserCodeJoin(
    userFK = 1,
    codeFK = 1
    )
  j2 = UserCodeJoin(
    userFK = 2,
    codeFK = 1
    )
  users_codes = [j1, j2]
  return users_codes



if __name__ == '__main__':

  with app.app_context():
    print("Clearing db...")
    User.query.delete()
    UserCodeJoin.query.delete()
    ProviderCode.query.delete()

    print("Seeding users...")
    users = create_users()
    db.session.add_all(users)
    db.session.commit()

    print("Seeding codes...")
    codes = create_codes()
    db.session.add_all(codes)
    db.session.commit()

    print("Seeding users_codes...")
    users_codes = create_users_codes()
    db.session.add_all(users_codes)
    db.session.commit()

    print("Done seeding!")