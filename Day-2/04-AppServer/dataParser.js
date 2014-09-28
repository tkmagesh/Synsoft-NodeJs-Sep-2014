var url = require("url"),
	qs = require("querystring");

module.exports = function(req,res, next){
	req.url = url.parse(req.url);
	if (req.method === "GET"){
		req.data = qs.parse(req.url.query);
		next();
	} else if (req.method === "POST"){
		var reqDataString = "";
		req.on("data", function(data){
			reqDataString += data;
		});
		req.on("end", function(){
			req.data = qs.parse(reqDataString);
			next();
		});
	} else {
		next();
	}
};
