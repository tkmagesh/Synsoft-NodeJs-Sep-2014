var nodeJsWebSocket = require("nodejs-websocket");
var server = nodeJsWebSocket.createServer(function(conn){
    console.log("A new connection is established");
    conn.on("text",function(msg){
        server.connections.forEach(function(con){
            con.sendText(msg);
        });
    });
});
server.listen(9090);
console.log("chat server running on port 9090!");