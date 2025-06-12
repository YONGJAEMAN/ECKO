from app import app
import sqlalchemy.orm as so
from sqlalchemy import __version__ as sa_version
import sqlalchemy as sa
from app import db
from app.models import User, Post
from random import random


@app.context_processor
def inject_random():
    return dict(random=random)


@app.shell_context_processor
def make_shell_context():
    return {'sa': sa, 'so': so, 'db': db, 'User': User, 'Post': Post, 'sa_version': sa_version}



if __name__ == '__main__':
    app.run(debug=True)
