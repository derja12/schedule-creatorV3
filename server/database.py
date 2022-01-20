import sqlite3

def dict_factory(cursor, row):
    d = {}
    for i, col in enumerate(cursor.description):
        d[col[0]] = row[i]
    return d

class ColorRacerDB:

    def __init__(self):
        self.connection = sqlite3.connect("color_racer.db")
        self.connection.row_factory = dict_factory
        self.cursor = self.connection.cursor()


    def getAllMessages(self):
        self.cursor.execute("SELECT * FROM messages")
        messages = self.cursor.fetchall()
        return messages

    def getSpecificMessage(self, message_id):
        data = [message_id]
        self.cursor.execute("SELECT * FROM messages WHERE id = ?", data)
        message = self.cursor.fetchone()
        return message

    def createMessage(self, date, name, text):
        data = [date, name, text]
        self.cursor.execute("INSERT INTO messages (date, name, text) VALUES (?,?,?)", data)
        self.connection.commit()

