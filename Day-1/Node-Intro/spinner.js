/*Create a spinner module in javascript*/

var counter = 0;
function incremet(){
    return ++counter;
}
function decrement(){
    return --counter;
}
module.exports = {
    up : incremet,
    down : decrement
};

/*

var spinner = require('./spinner.js');
spinner.up(); //=> 1
spinner.up(); //=> 2
spinner.up(); //=> 3
spinner.up(); //=> 4

spinner.down(); //=> 3
spinner.down(); //=> 2
spinner.down(); //=> 1
spinner.down(); //=> 0
spinner.down(); //=> -1

*/
