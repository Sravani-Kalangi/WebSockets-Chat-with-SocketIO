const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  io.emit('chat message',`hi, ${socket.id} connected!`);
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });
  socket.on('disconnect', () => {
    io.emit('chat message',`bye, ${socket.id} is leaving!`);
  });
});

server.listen(3000, () => {
  console.log('Socket.IO server running at http://localhost:3000');
});