import sqlite3
db = sqlite3.connect('db.sqlite')

db.execute('''CREATE TABLE students(
    id integer PRIMARY KEY,
    name text NOT NULL,
    email text NOT NULL,
    state text NOT NULL
)''')

cursor = db.cursor()

cursor.execute('''INSERT INTO students(name,email,state) VALUES("Chia Kim Hooi","chiakh@duckmail.com","07")''')
cursor.execute('''INSERT INTO students(name,email,state) VALUES("Foo Yoke Wai","fooyw@roostermail.com","08")''')
cursor.execute('''INSERT INTO students(name,email,state) VALUES("Ng Pei Li","ngpl@catmail.com","05")''')
cursor.execute('''INSERT INTO students(name,email,state) VALUES("Lim Li Li","limll@koalamail.com","01")''')
cursor.execute('''INSERT INTO students(name,email,state) VALUES("Mok Sook Chen","moksc@dogmail.com","07")''')

db.commit()
db.close()