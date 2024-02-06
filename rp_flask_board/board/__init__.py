from flask import Flask

from board import pages, posts #importing the pages blueprint (connects files)
def create_app(): #Application factory function
    app = Flask(__name__)
    app.register_blueprint(pages.bp) #registering the PAGES blueprint
    app.register_blueprint(posts.bp) #registering the POSTS blueprint
    return app