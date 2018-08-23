# Database initiliazer for the web server
import sqlite3
db = sqlite3.connect('db.sqlite')

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

db.commit()
db.close()