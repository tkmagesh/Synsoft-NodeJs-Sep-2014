var http = require('http'),
    fs = require('fs'),
    url = require('url'),
    path = require('path'),
    qs = require("querystring"),
    calculator = require('./calculator.js');

var staticResourceExtns = ['.html','.js','.css','.jpg','.png'];

String.prototype.endsWith = function(extn){
    return this.substr(this.length - extn.length) === extn;
}

function isStatic(resourceName){
    return staticResourceExtns.some(function(extn){
        return resourceName.endsWith(extn);
    });
}

function serveStatic(pathname, req, res){
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
    }
}

function parseData(req){
    var urlObj = url.parse(req.url,true);
    req.pathname = urlObj.pathname;
    if (req.pathname === "/")
        req.pathname = "/index.html";
    if (req.method === "GET"){
        req.data = qs.query;
    } else {
        //handle the "POST"
    }
}

function onConnectionHandle(req,res){

    parseData(req);

    if (isStatic(req.pathname)){
        serveStatic(pathname, req, res);
    }else if (req.pathname === "/calculator") {
        var input = req.data
        var number1 = parseInt(input.number1,10),
            number2 = parseInt(input.number2,10);
        var result = calculator[input.operation](number1,number2);
        res.write("<h1>" + result + "</h1>");
        res.end();

    } else {
        res.statusCode = 404;
        res.end();
    }
}
var server = http.createServer(onConnectionHandle);
server.listen("8080");
console.log("server running on port 8080");


//handling post request
/*else {
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
        }*/
