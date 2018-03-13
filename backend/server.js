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
let voteCount = 0
let startGame
let isGameStarted = false
let deckOfCards = [
  {
    code: "AD",
    image: "https://deckofcardsapi.com/static/img/aceDiamonds.png"
  }, {
    code: "AS",
    image: "https://deckofcardsapi.com/static/img/AS.png"
  }, {
    code: "7C",
    image: "https://deckofcardsapi.com/static/img/7C.png"
  }, {
    code: "2D",
    image: "https://deckofcardsapi.com/static/img/2D.png"
  }, {
    code: "QH",
    image: "https://deckofcardsapi.com/static/img/QH.png"
  }, {
    code: "KC",
    image: "https://deckofcardsapi.com/static/img/KC.png"
  }, {
    code: "6D",
    image: "https://deckofcardsapi.com/static/img/6D.png"
  }, {
    code: "8C",
    image: "https://deckofcardsapi.com/static/img/8C.png"
  }, {
    code: "QC",
    image: "https://deckofcardsapi.com/static/img/QC.png"
  }, {
    code: "6H",
    image: "https://deckofcardsapi.com/static/img/6H.png"
  }, {
    code: "4S",
    image: "https://deckofcardsapi.com/static/img/4S.png"
  }, {
    code: "9S",
    image: "https://deckofcardsapi.com/static/img/9S.png"
  }, {
    code: "3S",
    image: "https://deckofcardsapi.com/static/img/3S.png"
  }, {
    code: "7D",
    image: "https://deckofcardsapi.com/static/img/7D.png"
  }, {
    code: "9D",
    image: "https://deckofcardsapi.com/static/img/9D.png"
  }, {
    code: "7H",
    image: "https://deckofcardsapi.com/static/img/7H.png"
  }, {
    code: "0C",
    image: "https://deckofcardsapi.com/static/img/0C.png"
  }, {
    code: "AH",
    image: "https://deckofcardsapi.com/static/img/AH.png"
  }, {
    code: "KD",
    image: "https://deckofcardsapi.com/static/img/KD.png"
  }, {
    code: "7S",
    image: "https://deckofcardsapi.com/static/img/7S.png"
  }, {
    code: "5S",
    image: "https://deckofcardsapi.com/static/img/5S.png"
  }, {
    code: "2C",
    image: "https://deckofcardsapi.com/static/img/2C.png"
  }, {
    code: "3H",
    image: "https://deckofcardsapi.com/static/img/3H.png"
  }, {
    code: "4C",
    image: "https://deckofcardsapi.com/static/img/4C.png"
  }, {
    code: "4H",
    image: "https://deckofcardsapi.com/static/img/4H.png"
  }, {
    code: "KS",
    image: "https://deckofcardsapi.com/static/img/KS.png"
  }, {
    code: "JC",
    image: "https://deckofcardsapi.com/static/img/JC.png"
  }, {
    code: "JS",
    image: "https://deckofcardsapi.com/static/img/JS.png"
  }, {
    code: "9C",
    image: "https://deckofcardsapi.com/static/img/9C.png"
  }, {
    code: "0D",
    image: "https://deckofcardsapi.com/static/img/0D.png"
  }, {
    code: "0S",
    image: "https://deckofcardsapi.com/static/img/0S.png"
  }, {
    code: "8H",
    image: "https://deckofcardsapi.com/static/img/8H.png"
  }, {
    code: "8S",
    image: "https://deckofcardsapi.com/static/img/8S.png"
  }, {
    code: "KH",
    image: "https://deckofcardsapi.com/static/img/KH.png"
  }, {
    code: "8D",
    image: "https://deckofcardsapi.com/static/img/8D.png"
  }, {
    code: "2S",
    image: "https://deckofcardsapi.com/static/img/2S.png"
  }, {
    code: "6C",
    image: "https://deckofcardsapi.com/static/img/6C.png"
  }, {
    code: "QD",
    image: "https://deckofcardsapi.com/static/img/QD.png"
  }, {
    code: "5H",
    image: "https://deckofcardsapi.com/static/img/5H.png"
  }, {
    code: "QS",
    image: "https://deckofcardsapi.com/static/img/QS.png"
  }, {
    code: "2H",
    image: "https://deckofcardsapi.com/static/img/2H.png"
  }, {
    code: "3C",
    image: "https://deckofcardsapi.com/static/img/3C.png"
  }, {
    code: "JD",
    image: "https://deckofcardsapi.com/static/img/JD.png"
  }, {
    code: "5D",
    image: "https://deckofcardsapi.com/static/img/5D.png"
  }, {
    code: "3D",
    image: "https://deckofcardsapi.com/static/img/3D.png"
  }, {
    code: "AC",
    image: "https://deckofcardsapi.com/static/img/AC.png"
  }, {
    code: "5C",
    image: "https://deckofcardsapi.com/static/img/5C.png"
  }, {
    code: "4D",
    image: "https://deckofcardsapi.com/static/img/4D.png"
  }, {
    code: "0H",
    image: "https://deckofcardsapi.com/static/img/0H.png"
  }, {
    code: "6S",
    image: "https://deckofcardsapi.com/static/img/6S.png"
  }, {
    code: "9H",
    image: "https://deckofcardsapi.com/static/img/9H.png"
  }, {
    code: "JH",
    image: "https://deckofcardsapi.com/static/img/JH.png"
  }
]

let shuffleCards = []
server.listen(process.env.PORT || 3000)
console.log('server started')

io.sockets.on('connection', socket => {
  socket.on('joinTable1', function(mytable) {
    socket.join(mytable)
  })
  connection.push(socket)
  sockets.push(socket.id)
  console.log('socket connected', connection.length, socket.id)
  socket.on('TAKE_SEAT', function(data) {
    count++
    people.push({name: data.name + count, tableNumber: data.tableNumber})
    io.in(socket.rooms.table1).emit('FROM_SERVER', {
      people: people,
      count: count
    })
    socket.emit('SET_PLAYER', {name: data.name + count});
    voteCount++
    if (voteCount > 2 && !isGameStarted) {
      clearTimeout(startGame)
    }
    if (voteCount >= 2 && !isGameStarted) {
      startGame = setTimeout(function() {
        startGameFunc()
      }, 5000);
    }
  })
  socket.on('sendMessage', function(msg) {
    messages.push(msg)
    io.in(socket.rooms.table1).emit('server message response', {messages: messages})
  })
  startGameFunc = () => {
    isGameStarted = true
    shuffleCardsFunc(deckOfCards);
    io.in(socket.rooms.table1).emit('GAME_STATUS', {
      people: people.map(person => {
        let personObj = {}
        personObj.name = person.name
        personObj.cards = shuffleCards.splice(0, 2)
        return personObj
      }),
      deckOfCards: deckOfCards
    })
  }
});
function shuffleCardsFunc(deckOfCards) {
  let remainingCard = 51;
  let tempDeckOfCards = deckOfCards.slice(0);
  while (remainingCard != -1) {
    shuffleCards.push(tempDeckOfCards.splice((Math.random() * remainingCard).toFixed(0), 1)[0]);
    remainingCard--;
  }
}
