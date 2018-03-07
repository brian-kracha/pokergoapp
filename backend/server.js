const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io').listen(server)

let users =[]
let connections = []

server.listen(process.env.PORT || 3000)
console.log('server running')
io.sockets.on('connection', socket => {
  connections.push(socket)
  console.log('shut up bishal', connections.length,socket.id);


})
