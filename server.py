"""
Gladiator Combat Local Web Server & API
Serves static frontend files and provides endpoints for Neo4j and Gladiator data
"""

import http.server
import socketserver
import json
import urllib.parse
import os
import sys

PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class GladiatorHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        
        # API: Get Graph Data
        if path == "/api/graph":
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            
            graph_file = os.path.join(DIRECTORY, "data", "graph_data.json")
            if os.path.exists(graph_file):
                with open(graph_file, "r", encoding="utf-8") as f:
                    self.wfile.write(f.read().encode("utf-8"))
            else:
                self.wfile.write(json.dumps({"nodes": [], "edges": []}).encode("utf-8"))
            return

        # API: Query Neo4j live
        if path == "/api/neo4j-query":
            params = urllib.parse.parse_qs(parsed.query)
            uri = params.get("uri", ["neo4j+s://6aa638c7.databases.neo4j.io"])[0]
            user = params.get("user", ["neo4j"])[0]
            password = params.get("password", ["9y0bZ4bLP4w-hAFPWE8-cATtHKImvRO25rv1IRT_fbY"])[0]
            cypher = params.get("cypher", ["MATCH (n)-[r]->(m) RETURN n, r, m LIMIT 500"])[0]
            
            from neo4j_connector import fetch_from_neo4j, generate_dataset_graph
            result = fetch_from_neo4j(uri=uri, user=user, password=password, cypher=cypher)
            if not result:
                result = generate_dataset_graph(limit=500)
                result["notice"] = "Could not authenticate to Neo4j instance with current credentials. Loaded local schema dataset."
            
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Access-Control-Allow-Origin", "*")
            self.end_headers()
            self.wfile.write(json.dumps(result, ensure_ascii=False).encode("utf-8"))
            return

        # Default static file handling
        return super().do_GET()

def run_server():
    socketserver.TCPServer.allow_reuse_address = True
    with socketserver.TCPServer(("", PORT), GladiatorHandler) as httpd:
        print(f"==================================================")
        print(f" Gladiator Combat Museum Web Server running at:")
        print(f" http://localhost:{PORT}")
        print(f"==================================================")
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nServer stopped.")

if __name__ == "__main__":
    run_server()
