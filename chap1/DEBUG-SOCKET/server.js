// export DEBUG="*" to print all the logs
// in UI use localStorage.debug="*"
var express = require("express"),
    http =  require("http"),
    socketIO = require("socket.io");

var app = express();
app.get("/",(req,res)=>{
res.sendFile(__dirname+"/index.html");
     
})

var server = http.Server(app);
server.listen(5000);


var io = socketIO(server);
io.on("connection",(socket)=>{
    console.log("connection")
    socket.emit("message",{
        greeting:"Hello client"
    });
     socket.on("message",(message)=>{
         console.log(message)
     });
})