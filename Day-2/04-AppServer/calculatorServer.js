var calculator = require("./calculator");

module.exports = function(req,res, next){
	if (req.url.pathname === "/calculator"){
		var operation = req.data.operation,
				n1 = parseInt(req.data.n1,10),
				n2 = parseInt(req.data.n2,10);
			var result = calculator[operation](n1,n2);
			res.end("<h1>" + result + "</h1>");
	} else {
		next();
	}
}
