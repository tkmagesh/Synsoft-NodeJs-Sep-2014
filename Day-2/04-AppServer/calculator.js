var tranCount = 0;
var calculator = {
	add : function(x,y){
		tranCount++;
		return x + y;
	},
	subtract : function(x,y){
		tranCount++;
		return x - y;
	},
	divide : function(x,y){
		tranCount++;
		return x / y;
	},
	multiply : function(x,y){
		tranCount++;
		return x * y;
	},
	totalTransactions : function(){
		return tranCount;
	}
};
module.exports = calculator;
