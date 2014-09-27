var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    path = require('path'),
    qs = require("querystring"),
    calculator = require('./calculator.js');

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
        if (req.method === "GET") {
            var number1 = parseInt(urlObj.query.number1,10),
                number2 = parseInt(urlObj.query.number2,10);
            var result = calculator[urlObj.query.operation](number1,number2);
            res.write("<h1>" + result + "</h1>");
            res.end();
        } else {
            var data = "";
            req.on("data",function(chunk){
                data += chunk;
            });
            req.on("end",function(){
                var dataObj = qs.parse(data);
                var number1 = parseInt(dataObj.number1,10),
                    number2 = parseInt(dataObj.number2,10);
                var result = calculator[dataObj.operation](number1,number2);
                res.write("<h1>" + result + "</h1>");
                res.end();
            });
        }
    } else {
        res.statusCode = 404;
        res.end();
    }
}
var server = http.createServer(onConnectionHandle);
server.listen("8080");
console.log("server running on port 8080");
