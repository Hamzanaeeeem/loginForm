import sqlite3

def get_user_by_username(user) :
    try:
        sqliteConnection = sqlite3.connect('testDB.db')
        cursor = sqliteConnection.cursor()

        t = (user,)
        cursor.execute("SELECT * FROM test WHERE username=?", t)
        data = cursor.fetchall()
        
        if len(data) : 
            hashedPassword = data[0][2]
            return hashedPassword
        else :
            print('None')

        cursor.close()

    except sqlite3.Error as error:  
    	print("Failed to read data from sqlite table", error)
    finally:
        if sqliteConnection:
            sqliteConnection.close()
            print("The SQLite connection is closed")   
            
            
get_user_by_username('hamza')

"""
def get_user_by_username(username):
    # TODO: go to the database and get the hashed password
    # if the username doesn t exists return None
    pass
"""
