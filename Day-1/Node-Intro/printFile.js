var fs = require('fs');

/*var fileContents = fs.readFileSync('test.txt',{ encoding : 'utf-8'});
console.log(fileContents);*/

/*fs.readFile('test.txt',{encoding : 'utf-8'}, function(err, contents){
    if (!err){
        console.log(contents);
    } else {
        console.log('some error');
    }
});*/

var readStream = fs.createReadStream('test.txt',{encoding :'utf-8'});
var readCount = 0;
readStream.on('data',function(chunk){
    console.log(chunk);
    ++readCount;
});
readStream.on('end', function(){
    console.log("Thats all folks! read Count = ", readCount);
});
