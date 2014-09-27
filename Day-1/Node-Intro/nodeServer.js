var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    path = require('path');

var staticResourceExtns = ['.html','.js','.css','.jpg','.png']
String.prototype.endsWith = function(extn){
    return this.substr(this.length - extn.length) === extn;
}

function isStatic(resourceName){
    return staticResourceExtns.some(function(extn){
        return resourceName.endsWith(extn);
    });
}

function onConnectionHandle(req,res){
    var urlObj = url.parse(req.url,true);
    var pathname = urlObj.pathname;
    if (pathname === "/")
        pathname = "/index.html";
    if (isStatic(pathname)){
        var fileName = path.join(__dirname,pathname );
        var fileFound = fs.existsSync(fileName);
        if (fileFound){
            var rs = fs.createReadStream(fileName,{encoding : 'utf-8'});
            rs.pipe(res);
        } else {
            res.statusCode = 404;
            res.end();
        }
    } else if (pathname === "/calculator") {
        res.write("calculator is being processed for " + JSON.stringify(urlObj.query));
        res.end();
    } else {
        res.statusCode = 404;
        res.end();
    }
}
var server = http.createServer(onConnectionHandle);
server.listen("8080");
console.log("server running on port 8080");
