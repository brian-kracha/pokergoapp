const express = require("express")
const app = express()
const server = require("http").createServer(app)
const io = require('socket.io').listen(server)
let connection = []
let people = []
let messages = ['Welcome to chat Room']
var count = 0
var player1Card = []
var player2Card = []
var sockets = []
var cards = []
server.listen(process.env.PORT || 3000)
console.log('server started')

io.sockets.on('connection', socket => {
  socket.on('joinTable1', function(mytable) {
    console.log(mytable);
    socket.join(mytable)
    // io.in(socket.rooms.table1).emit('count', {count: count})
  })
  // socket.broadcast.emit('count', {count: count})
  connection.push(socket)
  sockets.push(socket.id)
  console.log('socket connected', connection.length, socket.id)
  socket.on('from client side', function(data) {
    // console.log(socket.rooms.table1);
    console.log(data);
    people.push(data.name)
    // io.sockets.emit('from server', data)
    count++
    io.in(socket.rooms.table1).emit('from server', {people: people, count: count})
  });
  socket.on('sendMessage', function(msg) {
    console.log(msg)
    messages.push(msg)
    io.in(socket.rooms.table1).emit('server message response', {messages: messages})
  })

  //when game starts
  socket.on('game is starting', function(data) {
    // console.log(data.cards[0])
    cards = data.cards
    // console.log(data.people)
    io.in(socket.rooms.table1).emit('game starting now', 'game starting now')
  })

  socket.on('send-card-to-server', function(data){
    console.log(data.length)
    console.log(sockets)
    let player = {}
    player.player1Card = [cards[0],cards[1]]
    player.player2Card = [cards[2],cards[3]]
    player.player3Card = [cards[4],cards[5]]
    player.player4Card = [cards[6],cards[7]]
    player.player5Card = [cards[8],cards[9]]
    player.player6Card = [cards[10],cards[11]]
    player.tableCard = [cards[12],cards[13],cards[14],cards[15],cards[16]]
    io.in(socket.rooms.table1).emit('send-card-to-client', player)
  })
})
