from todo import db,app

class Todo (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    todo = db.Column(db.String(100), nullable=False)
    completed = db.Column(db.Boolean)

    def __init__(self, todo, completed):
        self.todo = todo
        self.completed = completed


class User (db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), nullable=False)
    username = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    password_hash = db.Column(db.String(1000), nullable=False)

    def __init__(self, email, username, password, password_hash):
        self.email = email
        self.username = username
        self.password = password
        self.password_hash = password_hash


with app.app_context():
    db.create_all()