var calculator = require('./calculator.js');
var number1 = 10,
    number2 = 20;

module.exports = {
    run : function(){
        console.log("Adding number1 and number2 = ", calculator.add(number1,number2));
        console.log("Subtracting number1 from number2 = ", calculator.subtract(number1,number2));
        console.log("Multiplying number1 and number2 = ", calculator.multiply(number1,number2));
        console.log("Dividing number1 by number2 = ", calculator.divide(number1,number2));
    }
};
