var express = require("express"),
    app = express(),
    http = require("http"),
    socketIO = require("socket.io"),server,
    io;
var sockets = [];
app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html");
});



server = http.Server(app);
server.listen(5000);
io = socketIO(server);
io.on("connection",(socket)=>{
    console.log("connection established .....");
    sockets.push(socket);
    socket.on('message',(message)=>{
        console.log("message is "+message)
        for(var i=0;i<sockets.length;i++){
            console.log(sockets.length);
            sockets[i].send(message+" from server ");
        }
    });
    socket.on("disconnect",()=>{
        for(var i=0;i<sockets.length;i++){
            if(sockets[i].id === socket.id){
                sockets.splice(i,1);
            }
        }
        console.log(socket.id+" disconnected");
    });

})
