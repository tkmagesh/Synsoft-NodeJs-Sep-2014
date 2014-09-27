var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    path = require('path');

function onConnectionHandle(req,res){
    console.log(url.parse(req.url,true));
    var pathname = url.parse(req.url).pathname;
    if (pathname === "/")
        pathname = "/index.html";
    var fileName = path.join(__dirname,pathname );
    fs.stat(fileName, function(error, stats){
        if (error){
            res.statusCode = 500;
            res.end();
        }
        if (stats.isFile()){
            var fileFound = fs.existsSync(fileName);
            if (fileFound){
                var rs = fs.createReadStream(fileName,{encoding : 'utf-8'});
                rs.pipe(res);
            } else {
                res.statusCode = 404;
                res.end();
            }
        } else {
            if (pathname === "/calculator"){

            }
        }
    });


}
var server = http.createServer(onConnectionHandle);
server.listen("8080");
console.log("server running on port 8080");
