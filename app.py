from flask import Flask, request, jsonify, g
import sqlite3
import os

app = Flask(__name__)
DATABASE = './db/todo.db'

# Database helper functions
def get_db():
    if not os.path.exists(DATABASE):
        init_db()
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = sqlite3.connect(DATABASE)
    return db

def init_db():
    os.makedirs(os.path.dirname(DATABASE), exist_ok=True)
    db = sqlite3.connect(DATABASE)
    db.execute('''CREATE TABLE IF NOT EXISTS todos
                  (id INTEGER PRIMARY KEY AUTOINCREMENT,
                   task TEXT NOT NULL)''')
    db.commit()
    db.close()

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

# Routes
@app.route('/todos', methods=['GET'])
def get_todos():
    cursor = get_db().execute('SELECT * FROM todos')
    todos = cursor.fetchall()
    cursor.close()
    return jsonify([{'id': row[0], 'task': row[1]} for row in todos])

@app.route('/todos', methods=['POST'])
def add_todo():
    data = request.get_json()
    task = data.get('task')
    if task:
        db = get_db()
        db.execute('INSERT INTO todos (task) VALUES (?)', (task,))
        db.commit()
        return jsonify({'message': 'Todo added!'}), 201
    return jsonify({'error': 'Task is required'}), 400

@app.route('/todos/<int:id>', methods=['DELETE'])
def delete_todo(id):
    db = get_db()
    db.execute('DELETE FROM todos WHERE id = ?', (id,))
    db.commit()
    return jsonify({'message': 'Todo deleted!'})

if __name__ == '__main__':
    init_db()  # Ensure the database and table are created on startup
    app.run(host='0.0.0.0', port=5000)