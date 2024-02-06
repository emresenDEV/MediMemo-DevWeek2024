from flask import Blueprint, render_template

bp = Blueprint("posts", __name__)

@bp.route("/create", methods=("GET", "POST"))
def create():
    return render_template("posts/create.html")

@bp.route("/posts")
def posts():
    posts = []
    return render_template("posts/posts.html", posts=posts)