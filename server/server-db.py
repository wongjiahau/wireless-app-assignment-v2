# Database initiliazer for the web server
import sqlite3
db = sqlite3.connect('db.sqlite')

db.execute('''
	DROP TABLE IF EXISTS user
''')

db.execute('''
	DROP TABLE IF EXISTS session
''')

db.execute('''
	DROP TABLE IF EXISTS task
''')

db.execute('''
	CREATE TABLE user(
		id 			integer PRIMARY KEY AUTOINCREMENT,
		email 		text 	UNIQUE NOT NULL,
		password 	text 	NOT NULL
	)
''')

db.execute('''
	CREATE TABLE session(
		id	 		integer PRIMARY KEY,
		user_id		integer,
		FOREIGN KEY(user_id) REFERENCES user(id)
	)
''')

db.execute('''
	CREATE TABLE task(
		user_id	  integer NOT NULL,
		id 		    integer PRIMARY KEY AUTOINCREMENT,
		title 	  text 	  NOT NULL,
		content   text 	  NOT NULL,
		pinned 	  integer NOT NULL,
    completed integer NOT NULL,
    reminder  integer NOT NULL,
		FOREIGN KEY(user_id) REFERENCES user(id)
	)
''')

cursor = db.cursor()

# Insert one dummy user
cursor.execute('''
    INSERT INTO user(email,password)
    VALUES('john@gmail.com', '12345678')
''')

# Insert dummy tasks
cursor.execute('''
	INSERT INTO task(user_id, title, content, pinned, completed, reminder)
	VALUES(1, 'Go shopping', 'Buy bananas, apple', 1, 0, -1)
''')

cursor.execute('''
	INSERT INTO task(user_id, title, content, pinned, completed, reminder)
	VALUES(1, 'Go makan', 'Roti canai', 1, 0, 1634993608087)
''')

cursor.execute('''
	INSERT INTO task(user_id, title, content, pinned, completed, reminder)
	VALUES(1, 'Do homework', '', 0, 0, 1534993608087)
''')

cursor.execute('''
	INSERT INTO task(user_id, title, content, pinned, completed, reminder)
	VALUES(1, 'Train Dota', '-Huskar\n-Phoenix\n-Io', 0, 0, 1434993608087)
''')

db.commit()
db.close()