from flask import Flask, jsonify, request, json
from flask_sqlalchemy import SQLAlchemy

# Initiate the app
app = Flask(__name__)

# Setting up the db URI
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tmp/test.db'

db = SQLAlchemy(app)

# Defining our Models (ta7te él db)
class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.Text, nullable=False)

    # Overriding the str method
    def __str__(self):
        return f'{self.id} {self.content}'

def todo_serializer(todo):
    return {
        'id': todo.id,
        'content': todo.content
    }

@app.route('/api/todos/', methods=['GET'])
def index():
    return jsonify([*map(todo_serializer, Todo.query.all())])

@app.route('/api/todos/create', methods=['POST'])
def create():
    # We took the request body and conver it to a python dict.
    request_data = json.loads(request.data)

    # Create an instance to be added to the db
    todo = Todo(content=request_data['content'])

    # Saving our data to the session
    db.session.add(todo)

    # Commit the changes
    db.session.commit()

    return {'201': 'todo created successfully'}

@app.route('/api/todo/<int:id>')
def show(id):
    return jsonify([*map(todo_serializer, Todo.query.filter_by(id=id))])

@app.route('/api/todo/delete/<int:id>', methods=['POST'])
def delete(id):
    request_data = json.loads(request.data)
    Todo.query.filter_by(id=request_data['id']).delete()
    db.session.commit()

    return { '204': 'Deleted Successfully' }


if __name__ == '__main__':
    app.run(debug=True)