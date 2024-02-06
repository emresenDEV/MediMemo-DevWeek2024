import sqlite3 # for database
import click # for command line interface
from flask import current_app, g # for application context (interact with app and its storage)

def init_app(app): #core login for initialization
    app.cli.add_command(init_db_command)

@click.command("init-db")
def init_db_command():
    db = get_db()

    with current_app.open_resource("schema.sql") as f: #pulls commands from schema.sql
        db.executescript(f.read().decode("utf-8"))

    click.echo("You successfully initialized the database!")

def get_db():
    if "db" not in g:
        g.db = sqlite3.connect(
            current_app.config["DATABASE"],
            detect_types=sqlite3.PARSE_DECLTYPES,
        )
        g.db.row_factory = sqlite3.Row

    return g.db