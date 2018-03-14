const express = require("express")
const app = express()
const server = require("http").createServer(app)
const io = require('socket.io').listen(server)
const pokerEval = require("poker-evaluator")
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
    code: "Ad",
    image: "https://deckofcardsapi.com/static/img/aceDiamonds.png"
  }, {
    code: "As",
    image: "https://deckofcardsapi.com/static/img/AS.png"
  }, {
    code: "7c",
    image: "https://deckofcardsapi.com/static/img/7C.png"
  }, {
    code: "2d",
    image: "https://deckofcardsapi.com/static/img/2D.png"
  }, {
    code: "Qh",
    image: "https://deckofcardsapi.com/static/img/QH.png"
  }, {
    code: "Kc",
    image: "https://deckofcardsapi.com/static/img/KC.png"
  }, {
    code: "6d",
    image: "https://deckofcardsapi.com/static/img/6D.png"
  }, {
    code: "8c",
    image: "https://deckofcardsapi.com/static/img/8C.png"
  }, {
    code: "Qc",
    image: "https://deckofcardsapi.com/static/img/QC.png"
  }, {
    code: "6h",
    image: "https://deckofcardsapi.com/static/img/6H.png"
  }, {
    code: "4s",
    image: "https://deckofcardsapi.com/static/img/4S.png"
  }, {
    code: "9s",
    image: "https://deckofcardsapi.com/static/img/9S.png"
  }, {
    code: "3s",
    image: "https://deckofcardsapi.com/static/img/3S.png"
  }, {
    code: "7d",
    image: "https://deckofcardsapi.com/static/img/7D.png"
  }, {
    code: "9d",
    image: "https://deckofcardsapi.com/static/img/9D.png"
  }, {
    code: "7h",
    image: "https://deckofcardsapi.com/static/img/7H.png"
  }, {
    code: "Tc",
    image: "https://deckofcardsapi.com/static/img/0C.png"
  }, {
    code: "Ah",
    image: "https://deckofcardsapi.com/static/img/AH.png"
  }, {
    code: "Kd",
    image: "https://deckofcardsapi.com/static/img/KD.png"
  }, {
    code: "7s",
    image: "https://deckofcardsapi.com/static/img/7S.png"
  }, {
    code: "5s",
    image: "https://deckofcardsapi.com/static/img/5S.png"
  }, {
    code: "2c",
    image: "https://deckofcardsapi.com/static/img/2C.png"
  }, {
    code: "3h",
    image: "https://deckofcardsapi.com/static/img/3H.png"
  }, {
    code: "4c",
    image: "https://deckofcardsapi.com/static/img/4C.png"
  }, {
    code: "4h",
    image: "https://deckofcardsapi.com/static/img/4H.png"
  }, {
    code: "Ks",
    image: "https://deckofcardsapi.com/static/img/KS.png"
  }, {
    code: "Jc",
    image: "https://deckofcardsapi.com/static/img/JC.png"
  }, {
    code: "Js",
    image: "https://deckofcardsapi.com/static/img/JS.png"
  }, {
    code: "9c",
    image: "https://deckofcardsapi.com/static/img/9C.png"
  }, {
    code: "Td",
    image: "https://deckofcardsapi.com/static/img/0D.png"
  }, {
    code: "Ts",
    image: "https://deckofcardsapi.com/static/img/0S.png"
  }, {
    code: "8h",
    image: "https://deckofcardsapi.com/static/img/8H.png"
  }, {
    code: "8S",
    image: "https://deckofcardsapi.com/static/img/8S.png"
  }, {
    code: "Kh",
    image: "https://deckofcardsapi.com/static/img/KH.png"
  }, {
    code: "8d",
    image: "https://deckofcardsapi.com/static/img/8D.png"
  }, {
    code: "2s",
    image: "https://deckofcardsapi.com/static/img/2S.png"
  }, {
    code: "6c",
    image: "https://deckofcardsapi.com/static/img/6C.png"
  }, {
    code: "Qd",
    image: "https://deckofcardsapi.com/static/img/QD.png"
  }, {
    code: "5h",
    image: "https://deckofcardsapi.com/static/img/5H.png"
  }, {
    code: "Qs",
    image: "https://deckofcardsapi.com/static/img/QS.png"
  }, {
    code: "2h",
    image: "https://deckofcardsapi.com/static/img/2H.png"
  }, {
    code: "3c",
    image: "https://deckofcardsapi.com/static/img/3C.png"
  }, {
    code: "Jd",
    image: "https://deckofcardsapi.com/static/img/JD.png"
  }, {
    code: "5d",
    image: "https://deckofcardsapi.com/static/img/5D.png"
  }, {
    code: "3d",
    image: "https://deckofcardsapi.com/static/img/3D.png"
  }, {
    code: "Ac",
    image: "https://deckofcardsapi.com/static/img/AC.png"
  }, {
    code: "5c",
    image: "https://deckofcardsapi.com/static/img/5C.png"
  }, {
    code: "4d",
    image: "https://deckofcardsapi.com/static/img/4D.png"
  }, {
    code: "Th",
    image: "https://deckofcardsapi.com/static/img/0H.png"
  }, {
    code: "6s",
    image: "https://deckofcardsapi.com/static/img/6S.png"
  }, {
    code: "9h",
    image: "https://deckofcardsapi.com/static/img/9H.png"
  }, {
    code: "Jh",
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
      count: count,
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
    if(voteCount >= 2){
      messages.push(`${msg.playerName} : ${msg.message}`)
    }
    console.log(messages);
    io.in(socket.rooms.table1).emit('server message response', {messages: messages})
  })
  socket.on('CALCULATE_WINNER_HAND', function(data) {
    result = highestHand(data)
    io.in(socket.rooms.table1).emit('WINNING_CARDS', {result: result})
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
      cardsOntable: shuffleCards.splice(0, 5)
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
function highestHand(hands) {
  let array = []
  for(let i = 0; i < hands.length; i++) {
    const evalOutput = pokerEval.evalHand(hands[i])
    array.push([i, evalOutput])
  }

  var sortedArray  = array.sort(function(a,b) {
    return b[1].value - a[1].value
  })
  const result = []
  for(let i = 1; i < sortedArray.length; i++) {
    if(sortedArray[i - 1][1].value > sortedArray[i][1].value) {
      result.push(hands[sortedArray[i - 1][0]])
      break
    }
    if(sortedArray[ i - 1][1].value == sortedArray[i][1].value) {
      result.push(hands[sortedArray[ i - 1][0]])
      if(i === 5) {
        result.push(hands[sortedArray[5][0]])
        break
      }
    }
  }
  return result
}
