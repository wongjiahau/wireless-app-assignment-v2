import sqlite3
db = sqlite3.connect('db.sqlite')

db.execute('''
	CREATE TABLE task(
		id 		 	integer PRIMARY KEY AUTOINCREMENT,
		title 	 	text 	 NOT NULL,
		content  	text 	 NOT NULL,
		pinned 	 	integer NOT NULL, 	-- 0 or 1
		completed   integer NOT NULL, 	-- 0 or 1
		reminder    integer 			-- epoch time in minutes
	);
''')

cursor = db.cursor()

# Insert two dummy tasks
cursor.execute('''
    INSERT INTO task(title, content, pinned, completed, reminder)
    VALUES('Buy fruits', '2 apples', 0, 1, 1534330746081)
''')

cursor.execute('''
    INSERT INTO task(title, content, pinned, completed, reminder)
    VALUES('Go shopping', 'at MV', 1, 0, 1334330746081)
''')

db.commit()
db.close()