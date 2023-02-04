from flask import request,jsonify
from models import db

@app.route('/add', methods=['POST'])
def add():
  todo = request.json["todo"]
  completed = False

  db.session.add(Todo(todo,completed))
  db.session.commit()
  return "added"


@app.route('/get')
def get():
    todos=Todo.query.order_by(Todo.id.asc())
    todos_array = []
    for item in todos:
        todos_array.append({
           "id":item.id,
           "todo": item.todo,
           "completed": item.completed
    })
    return todos_array


@app.route("/get/<int:todo_id>")
def getTodo(todo_id):
    todo = Todo.query.filter_by(id=todo_id).first()
    todo_array = []
    for item in todo:
        todo_array.append({
           "id":item.id,
           "todo": item.todo,
           "completed": item.completed
    })
    return todo_array 


@app.route("/delete/<int:todo_id>")
def delete(todo_id):
    todo = Todo.query.filter_by(id=todo_id).first()
    db.session.delete(todo)
    db.session.commit()
    return "deleted"
    

@app.route("/complete/<int:todo_id>")
def complete(todo_id):
    todo = Todo.query.filter_by(id=todo_id).first()
    todo.completed = not todo.completed
    db.session.commit()
    return "completed status changed"


@app.route("/update/<int:todo_id>", methods=['POST'])
def update(todo_id):
    item = Todo.query.filter_by(id=todo_id).first()
    item.todo = request.json["todo"]
    item.completed = request.json["completed"]

    db.session.commit()
    return "updated"