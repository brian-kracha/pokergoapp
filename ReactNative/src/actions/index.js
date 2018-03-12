import firebase from 'firebase'
import {Actions} from 'react-native-router-flux'
import SocketIOClient from 'socket.io-client';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  ROOM_JOINED,
  TAKE_SEAT1,
  TAKE_SEAT2,
  TAKE_SEAT3,
  TAKE_SEAT4,
  TAKE_SEAT5,
  TAKE_SEAT6,
  SEND_MESSAGE,
  CARDS_RECEIVED,
  SEND_CARDS,
  GAME_READY_TO_PLAY,
  CARDS_FOR_EACH_PLAYER,
} from './types'
var socket = null
var count = 0
export const joinRoom = () => {
  console.log('in this room')
  return async (dispatch) => {
    socket = SocketIOClient('http://localhost:3000/', {jsonp: false, transports: ['websocket']})
    Actions.table()
    socket.emit('joinTable1', 'table1')
    dispatch({
        type: ROOM_JOINED,
        payload: socket,
    })
  }
}

export const sendMessage = (message) => {
  return async (dispatch) => {
    socket.emit('sendMessage', message)
    socket.on('server message response', function(data) {
      dispatch({
        type: SEND_MESSAGE,
        payload: data.messages
      })
    })
  }
}

export const takeSeat1 = () => {
  return async (dispatch) => {
    console.log('seat taken')
    // console.log(socket);
    socket.emit('from client side', {user:'user1',name:'brian'})
    socket.on('from server', function(data) {
      console.log(data.people)
      // console.log(typeof(data))
      dispatch({
        type: TAKE_SEAT1,
        payload: data.people,
        count: data.count
      })
    })
  }
}
export const takeSeat2 = () => {
  return async (dispatch) => {
    console.log('seat taken')
    // console.log(socket);
    socket.emit('from client side', {user:'user1',name:'bishal'})
    socket.on('from server', function(data) {
      console.log(data.people)
      // console.log(typeof(data))
      dispatch({
        type: TAKE_SEAT2,
        payload: data.people,
        count: data.count
      })
    })
  }
}
export const takeSeat3 = () => {
  return async (dispatch) => {
    console.log('seat taken')
    // console.log(socket);
    socket.emit('from client side', {user:'user1',name:'sean'})
    socket.on('from server', function(data) {
      console.log(data.people)
      // console.log(typeof(data))
      dispatch({
        type: TAKE_SEAT3,
        payload: data.people,
        count: data.count
      })
    })
  }
}
export const takeSeat4 = () => {
  return async (dispatch) => {
    console.log('seat taken')
    // console.log(socket);
    socket.emit('from client side', {user:'user1',name:'Patrick'})
    socket.on('from server', function(data) {
      console.log(data.people)
      // console.log(typeof(data))
      dispatch({
        type: TAKE_SEAT4,
        payload: data.people,
        count: data.count
      })
    })
  }
}
export const takeSeat5 = () => {
  return async (dispatch) => {
    console.log('seat taken')
    // console.log(socket);
    socket.emit('from client side', {user:'user1',name:'joe'})
    socket.on('from server', function(data) {
      console.log(data.people)
      // console.log(typeof(data))
      dispatch({
        type: TAKE_SEAT5,
        payload: data.people,
        count: data.count
      })
    })
  }
}
export const takeSeat6 = () => {
  return async (dispatch) => {
    console.log('seat taken')
    // console.log(socket);
    socket.emit('from client side', {user:'user1',name:'judah'})
    socket.on('from server', function(data) {
      console.log(data.people)
      // console.log(typeof(data))
      dispatch({
        type: TAKE_SEAT6,
        payload: data.people,
        count: data.count
      })
    })
  }
}
export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  }
}

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  }
}

// return (dispatch) is from thunk
export const loginUser = ({email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER })

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch((error) => {
        console.log('action/index error', error)

        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => loginUserSuccess(dispatch, user))
          .catch(() => loginUserFail(dispatch))
      })
  }
}

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL })
}

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  })
  Actions.main()
}

export function fetchCards() {
 return async (dispatch) => {
   const response = await fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=52`)
   const json = await response.json()
   dispatch({
     type: CARDS_RECEIVED,
     cards: json.cards
   })
 }
}

export function sendCard(cards) {
 return async (dispatch) => {
   let topFifteenCards = []
   for(let i = 0; i < 17; i++) {
     topFifteenCards.push(cards[i])
   }
   dispatch({
     type: SEND_CARDS,
     topFifteenCards: topFifteenCards,
   })
 }
}

export function gameReadyToPlay(cards,totalPeople) {
  return async (dispatch) => {
    var objectOfCardsAndPeople = {
      cards: cards,
      people: totalPeople
    }
    socket.emit('game is starting', objectOfCardsAndPeople)
    socket.on('game starting now', function(data) {
      console.log('from server hello' + data)
      dispatch({
        type: GAME_READY_TO_PLAY,
      })
    })
  }
}

export function sendCardToServer(card) {
  return async (dispatch) => {
    socket.emit('send-card-to-server', card)
    // socket.on('hey0', function(data) {
    //   console.log('from server side to get cards', data)
    // })
    socket.on('send-card-to-client', function(data) {
      console.log('from server side to get cards', data)
      dispatch({
        type: CARDS_FOR_EACH_PLAYER,
        playersCard: data.player,
      })
    })
  }
}
