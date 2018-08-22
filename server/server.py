import sqlite3
import time
from flask import Flask, jsonify, request, abort
from argparse import ArgumentParser


DB = 'db.sqlite'

    
app = Flask(__name__)

@app.route('/', methods=['GET'])
def home():
    return """<p>It works!</p>"""

@app.route('/api/signup', methods=['POST'])
def signup():
    if not request.json:
        abort(404)

    result = fetchData(parseUser, 
    """
    SELECT * FROM user
    WHERE email = ?
    """, (request.json["email"],))

    if result:
        return jsonify({"error": "Email already exist"}), 200
    else:
        changeData("""
            INSERT INTO user(email, password)
            VALUES (?,?)
        """, (request.json["email"], request.json["password"]))

        return jsonify("OK"), 200

@app.route('/api/get_session_id', methods=['GET'])
def get_session_id():
    # Session id is current epoch time in milliseconds
    # Refer: https://stackoverflow.com/questions/5998245/get-current-time-in-milliseconds-in-python
    return jsonify(str(int(round(time.time() * 1000)))), 200

@app.route('/api/login', methods=['POST'])
def login():
    if not request.json:
        abort(404)
    
    user_id = fetch_user_id(request.json["email"], request.json["password"])

    if not user_id:
        return jsonify({"error": "Invalid email or password."}), 200

    session_id = request.json["session_id"]

    changeData("""
        INSERT INTO session (id, user_id)
        VALUES(?,?)
    """, (session_id, user_id))

    return jsonify("OK"), 200

@app.route('/api/logout', methods=['POST'])
def logout():
    if not request.json:
        abort(404)

    return jsonify(changeData("""
        DELETE FROM session
        WHERE id = ?
        """, (request.json["session_id"],)
    )) , 200


@app.route('/api/admin/see_table/<string:table>', methods=['GET'])
def admin_get_table(table):
    parser = {
        'user':     parseUser,
        'task':     parseTask,
        'reminder': parseReminder,
        'session':  parseSession
    }
    data = fetchData(parser[table], f'SELECT * FROM {table}')
    return jsonify(data), 200

@app.route('/api/task/<string:session_id>', methods=['GET'])
def retrieve_task(session_id):
    user_id = fetch_user_id_using_session(session_id)
    tasks = fetch_task(user_id)
    return jsonify(tasks), 200

@app.route('/api/task', methods=['POST'])
def upload_task():
    if not request.json:
        abort(404)
        
    user_id = fetch_user_id_using_session(request.json["session_id"])

    changeData("""
        DELETE FROM task WHERE user_id = ?
    """, (user_id,))

    try:
        for task in request.json["tasks"]:
            new_task = (
                user_id,
                task['title'],
                task['content'],
                task['pinned'],
                task['completed'],
                task['reminder']
            )
        
            changeData("""
                INSERT INTO task (user_id,title,content,pinned,completed,reminder)
                VALUES(?,?,?,?,?,?)
            """, new_task)
        return jsonify("OK"), 200    
    except:
        print("Backup failed")
        return jsonify({"error": "Backup failed, make sure you login already."}), 200

@app.route('/api/download', methods=['POST'])
def download_task():
    if not request.json:
        abort(404)
      
    user_id = fetch_user_id_using_session(request.json["session_id"])
    task = fetch_task(user_id)
    return jsonify(task), 200

def fetch_task(user_id):
    return fetchData(parseTask, 
    """
    SELECT * FROM task
    WHERE user_id = ?
    """, (user_id,))

def fetch_user_id_using_session(session_id):
    result = fetchData(parseSession,
    """
    SELECT * FROM session
    WHERE id = ?
    """, (session_id,))

    if len(result) > 0:
        return result[0]["user_id"]
    else:
        return None

def fetch_user_id(email, password):
    result = fetchData(parseUser, 
    """
    SELECT * FROM user
    WHERE email = ?
    AND password = ?
    """, (email,password))
    
    if len(result) > 0:
        return result[0]["id"]
    else:
        return None


def parseSession(row):
    return {
        'id':         row[0],
        'user_id':    row[1],
    }

def parseUser(row):
    return {
        'id':         row[0],
        'email':      row[1],
        'password':   row[2],
    }
    
def parseTask(row):
    return {
        'user_id':    row[0],
        'id':         row[1],
        'title':      row[2],
        'content':    row[3],
        'pinned':     row[4],
        'completed':  row[5],
        'reminder':   row[6]
    }

def parseReminder(row):
    return {
        'id':         row[0],
        'task_id':     row[1],
        'date':     row[2],
    }
    
def fetchData(parser, query, queryParam=None):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    if queryParam:
        cursor.execute(query, queryParam)
    else:
        cursor.execute(query)
    rows = cursor.fetchall()
    db.close()
    result = []
    for row in rows:
        result.append(parser(row))
    return result

# Change means : INSERT, UPDATE or DELETE
def changeData(query, queryParam):
    db = sqlite3.connect(DB)
    cursor = db.cursor()
    cursor.execute(query, queryParam)
    id = cursor.lastrowid
    db.commit()
    response = {
        'id': id,
        'affected': db.total_changes,
    }
    db.close()
    return response
    

if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('-p', '--port', default=5000, type=int, help='port to listen on')
    args = parser.parse_args()
    port = args.port

    app.run(host='0.0.0.0', port=port)
