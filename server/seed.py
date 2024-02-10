import datetime

from app import app
from models import db, User #and all classes

def create_users():
  u1 = User(
    username = "tom")
  u1.password_hash = "1234"
  u2 = User(
    username = "jerry")
  u2.password_hash = "1234"
  users = [u1, u2]
  return users

if __name__ == '__main__':

  with app.app_context():
    print("Clearing db...")
    User.query.delete()

    print("Seeding users...")
    users = create_users()
    db.session.add_all(users)
    db.session.commit()

    print("Done seeding!")