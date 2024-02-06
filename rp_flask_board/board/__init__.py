import os
from dotenv import load_dotenv
from flask import Flask

from board import pages, posts, database

load_dotenv()

def create_app(): #Application factory function
    app = Flask(__name__)
    app.config.from_prefixed_env() #loading environment variables
    
    database.init__app(app) #initializing the database
    
    app.register_blueprint(pages.bp) #registering the PAGES blueprint
    app.register_blueprint(posts.bp) #registering the POSTS blueprint
    print(f"Current Environment: {os.getenv('ENVIRONMENT')}")
    print(f"Using Database: {app.config.get('DATABASE')}")
    return app