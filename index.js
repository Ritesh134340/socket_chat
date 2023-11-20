const express = require('express');
const app = express();
const http = require('http');
const cors=require('cors')
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{cors:{origin:'*'}});


app.use(cors())


app.get('/server', (req, res) => {
  res.status(200).send('Server is working!');
});


io.on('connection', (socket) => {
  socket.emit('socketId',socket.id)
  console.log('a user connected with id',socket.id);
  
  socket.on('chatMesg',(msg)=>{
    socket.broadcast.emit('chatMesg',msg)
    console.log('Message is ',msg)
  })
});



server.listen(4000,'0.0.0.0',() => {
  console.log('listening on *:4000');
});


