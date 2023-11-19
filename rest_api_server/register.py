import os
from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

def init():
    global app
    # MySQLデータベース設定
    app.config['MYSQL_HOST'] = os.environ.get('HOST')
    app.config['MYSQL_USER'] = os.environ.get('USER')
    app.config['MYSQL_PASSWORD'] = os.environ.get('PASS')
    app.config['MYSQL_DB'] = 'Todo'

    return MySQL(app)

mysql = init()

@app.route('/api/todos/register', methods=['POST'])
def add_todo():
    global mysql
    data = request.get_json()
    cursor = mysql.connection.cursor()
    query = 'INSERT INTO todos (do) VALUES (%s)'
    cursor.execute(query, (data['do'],))
    mysql.connection.commit()
    cursor.close()

    return jsonify({'id': cursor.lastrowid, 'do': data['do']}), 201


@app.route('/api/todos/get', methods=['GET'])
def get_todos():
    global mysql
    finish = request.args.get('finish', type=str)
    deleted = request.args.get('deleted', default='0', type=str)
    cursor = mysql.connection.cursor()
    query = f"SELECT id, do, finish_flg FROM todos WHERE del_flg = {deleted}"
    if finish is not None:
        query += f" AND finish_flg = {finish}"
    
    cursor.execute(query)
    todos = cursor.fetchall()
    cursor.close()

    return jsonify([{'id': row[0], 'do': row[1], 'finish_flg': row[2]} for row in todos])


@app.route('/api/todos/finish/<int:todo_id>', methods=['PATCH'])
def update_finish_flag(todo_id):
    global mysql
    data = request.get_json()
    finish_flg = data['finish_flg']

    cur = mysql.connection.cursor()
    cur.execute("UPDATE todos SET finish_flg = %s WHERE id = %s", (finish_flg, todo_id))
    mysql.connection.commit()
    cur.close()

    return jsonify({'message': 'ToDoのfinish_flgが更新されました'}), 200


if __name__ == '__main__':
    from dotenv import load_dotenv
    load_dotenv()
    app.run(debug=True)
    """
    ### sample post method
    curl -X POST http://localhost:5000/api/todos -H "Content-Type: application/json" -d '{"name":"新しいTODO"}'
    curl.exe -X POST http://localhost:5000/api/todos -H "Content-Type: application/json" -d '{\"name\":\"新しいTODO\"}'
    ### sample patch method
    curl -X PATCH http://localhost:5000/api/finish/3 -H "Content-Type: application/json" -d '{\"finish_flg\": \"1\"}'

    """