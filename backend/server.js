const express = require("express")
const app = express()
const server = require("http").createServer(app)
const io = require('socket.io').listen(server)
let connection =[]
server.listen(process.env.PORT || 3000)
console.log('server started')

io.sockets.on('connection', socket => {
  socket.on('joinTable1',function(mytable){
    console.log(mytable);
    socket.join(mytable)
  })
  connection.push(socket)
  // socket.join('table1')
  console.log('socket connected', connection.length, socket.id)
  socket.on('from client side', function(data) {
    console.log(socket.rooms.table1);
    console.log(data);
    io.sockets.emit('from server', data)
    io.to(socket.rooms.table1).emit('from server', data)
  });
})
