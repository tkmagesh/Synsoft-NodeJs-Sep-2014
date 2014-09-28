var fs = require("fs"),
	path = require("path");


String.prototype.endsWith = function(extn){
   return this.substr(this.length - extn.length) === extn;
}

var extns = [".html",".js",".css",".txt",".jpg",".ico"];

function isStatic(pathName){
   return extns.some(function(extn){
        return pathName.endsWith(extn);
   });
}

module.exports = function(req,res,next){

	var pathname =  req.url.pathname === "/" ? "index.html" : req.url.pathname;

	if (isStatic(pathname)){
		var fileName = pathname
			filePath = path.join(__dirname, fileName);

		if (!fs.existsSync(filePath)){
			res.statusCode = 404;
			res.end();
		} else  {
			var stream = fs.createReadStream(filePath);
			stream.pipe(res);

		}
	} else {
		next();
	}

};
