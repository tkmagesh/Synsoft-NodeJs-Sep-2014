var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    path = require('path');

function onConnectionHandle(req,res){
    var pathname = url.parse(req.url).pathname;
    if (pathname === "/")
        pathname = "/index.html";
    var fileName = path.join(__dirname,pathname );
    console.log(fileName);
    var fileFound = fs.existsSync(fileName);
    if (fileFound){
        var rs = fs.createReadStream(fileName,{encoding : 'utf-8'});
        rs.pipe(res);
    } else {
        res.statusCode = 404;
        res.end();
    }

}
var server = http.createServer(onConnectionHandle);
server.listen("8080");
console.log("server running on port 8080");
