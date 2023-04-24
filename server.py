from http.server import HTTPServer, BaseHTTPRequestHandler
import json
import penman
import amrlib

stog = amrlib.load_stog_model('models/stog')
gtos = amrlib.load_gtos_model('models/gtos')

port = 41425

class NLPHandler(BaseHTTPRequestHandler):
    def do_POST(self):
        data_string = self.rfile.read(int(self.headers.get('content-length')))
        data = json.loads(data_string);
        res=None
        if "text" in data:
                res = penman.decode(stog.parse_sents([data["text"]])[0]).triples;
        elif "graph" in data:
                res, _ = gtos.generate([penman.encode(penman.Graph(data["graph"]), indent=None)])
                res = res[0]
        self.send_response(200)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.end_headers()
        self.wfile.write(json.dumps({"res":res}).encode('utf-8'))
        return
server_object = HTTPServer(server_address=('', port), RequestHandlerClass=NLPHandler)
print('starting NLP core at port: '+str(port))
server_object.serve_forever()
