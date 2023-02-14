from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
# from models import db
from flask_bcrypt import Bcrypt

app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:123456789@localhost/todos'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)


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


@app.route('/add', methods=['POST'])
def add():
    todo = request.json["todo"]
    completed = False

    db.session.add(Todo(todo, completed))
    db.session.commit()
    return "added"


@app.route('/get')
def get():
    todos = Todo.query.order_by(Todo.id.asc())
    todos_array = []
    for item in todos:
        todos_array.append({
            "id": item.id,
            "todo": item.todo,
            "completed": item.completed
        })
    return todos_array


@app.route("/get/<int:todo_id>")
def getTodo(todo_id):
    todo = Todo.query.get(todo_id)
    return jsonify({"id": todo.id, "todo": todo.todo, "completed": todo.completed})


@app.route("/delete/<int:todo_id>")
def delete(todo_id):
    todo = Todo.query.get(todo_id)
    db.session.delete(todo)
    db.session.commit()
    return "deleted"


@app.route("/complete/<int:todo_id>")
def complete(todo_id):
    todo = Todo.query.get(todo_id)
    todo.completed = not todo.completed
    db.session.commit()
    return "completed status changed"


@app.route("/update/<int:todo_id>", methods=['POST'])
def update(todo_id):
    item = Todo.query.get(todo_id)
    item.todo = request.json["todo"]
    item.completed = request.json["completed"]

    db.session.commit()
    return "updated"


@app.route("/register", methods=['POST'])
def register():
    email = request.json["email"]
    username = request.json["username"]
    password = request.json["password"]

    email_filtered = User.query.filter_by(email=email).first()
    user_filtered = User.query.filter_by(username=username).first()

    if (email_filtered):
        return jsonify({'message': "Email is already taken"})
    elif (user_filtered):
        return jsonify({'message': "Username is already taken"})
    else:
        password_hash = bcrypt.generate_password_hash(password).decode("utf-8")
        db.session.add(User(email, username, password, password_hash))
        db.session.commit()
        return jsonify({"status": 200, 'message': 'registered'})


@app.route("/login", methods=['POST'])
def login():
    username = request.json["username"]
    password = request.json["password"]

    user = User.query.filter_by(username=username).first()

    if (user):
        if (bcrypt.check_password_hash(user.password_hash, password)):
            return jsonify({"status": 200, "user": user.username})
        else:
            return jsonify({'message': 'Wrong password'})
    else:
        return jsonify({'message': 'Invalid username'})


if __name__ == '__main__':
    app.run(debug=True)
