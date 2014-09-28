var http = require("http");
var engine = require("./engine");

engine.add(require("./dataParser"));
engine.add(require("./calculatorServer"));
engine.add(require("./staticFileServer"));
engine.add(function(req,res,next){
	res.writeHead(404);
	res.end();
	next();
});
http.createServer(engine.run()).listen(9090);
console.log("application running on port 9090");
