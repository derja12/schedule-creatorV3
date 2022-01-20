from http.server import BaseHTTPRequestHandler, HTTPServer
from socketserver import ThreadingMixIn
from nba import nbaDB
import json

class MyRequestHandler(BaseHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        BaseHTTPRequestHandler.end_headers(self)

    def handleNotFound(self):
        self.send_response(404)
        self.send_header("Content-Type", "text/plain")
        self.end_headers()
        self.wfile.write(bytes("Not found.", "utf-8"))

    def handleGetTeams(self):
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()

        self.db = nbaDB()
        teams = self.db.getTeams()
        self.wfile.write(bytes(json.dumps(teams), "utf-8"))

    def handleGetStats(self):
        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()

        self.db = nbaDB()
        teams = self.db.getStats()
        self.wfile.write(bytes(json.dumps(teams), "utf-8"))

    def handleGetTeam(self, id):
        self.db = nbaDB()
        team = self.db.getTeam(id)
        if team is None:
            self.handleNotFound()

        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(bytes(json.dumps(team), "utf-8"))

    def handleGetStat(self, id):
        self.db = nbaDB()
        stat = self.db.getStat(id)
        if stat is None:
            self.handleNotFound()

        self.send_response(200)
        self.send_header("Content-Type", "application/json")
        self.end_headers()
        self.wfile.write(bytes(json.dumps(stat), "utf-8"))

    def do_GET(self):
        print("This code will handle all incoming GET requests.")
        print("The request path is:", self.path)

        paths = self.path.split("/")[1:]
        collection = paths[0]
        if len(paths) > 1:
            member = paths[1]
        else:
            member = None

        if collection == "teams":
            if member is not None:
                self.handleGetTeam(member)
            else:
                self.handleGetTeams()
        elif collection == "stats":
            if member is not None:
                self.handleGetStat(member)
            else:
                self.handleGetStats()
        else:
            self.handleNotFound()


class ThreadedHTTPServer(ThreadingMixIn, HTTPServer):
    pass

def run():
    listen = ("127.0.0.1", 8080)
    server = ThreadedHTTPServer(listen, MyRequestHandler)
    print("Online!")
    server.serve_forever()

run()