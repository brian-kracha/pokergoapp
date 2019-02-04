import firebase from 'firebase'
import {Actions} from 'react-native-router-flux'
import SocketIOClient from 'socket.io-client';
import {
  // EMAIL_CHANGED,
  // PASSWORD_CHANGED,
  // LOGIN_USER_SUCCESS,
  // LOGIN_USER_FAIL,
  // LOGIN_USER,
  ROOM_JOINED,
  TAKE_SEAT,
  SEND_MESSAGE,
  CARDS_RECEIVED,
  SEND_CARDS,
  GAME_READY_TO_PLAY,
  CARDS_FOR_EACH_PLAYER,
  CARDS_FOR_PLAYER1,
  CARDS_FOR_PLAYER2,
  SET_PLAYER,
  ASSIGN_CARDS,
  GAME_STATUS,
  START_GAME,
  SHOULD_TIMER_UPDATE,
  RAISE_AMOUNT,
  RAISE_AMOUNT_RESPONSE,
  DRAW_AMOUNT_RESPONSE,
  TURN_VALUE_RESPONSE,
  WINNING_CARDS,
} from './types'
var socket = null
let countPlayer = 0
let turn = 0
let Round = 0
export const FIRSTNAME_CHANGED = 'firstName_changed'
export const LASTNAME_CHANGED = 'lastName_changed'
export const ADDRESS_CHANGED = 'address_changed'
export const EMAIL_CHANGED = 'email_changed'
export const PASSWORD_CHANGED = 'password_changed'
export const LOGIN_USER_SUCCESS = 'login_user_success'
export const LOGIN_USER_FAIL = 'login_user_fail'
export const LOGIN_USER = 'login_user'
export const SIGNUP = 'signup'


export const firstNameChanged = (text) => {
  return {
    type: FIRSTNAME_CHANGED,
    payload: text
  }
}

export const lastNameChanged = (text) => {
  return {
    type: LASTNAME_CHANGED,
    payload: text
  }
}

export const addressChanged = (text) => {
  return {
    type: ADDRESS_CHANGED,
    payload: text
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

export const loginUser = ({ email, password }) => {
  return async (dispatch) => {
    dispatch({ type: LOGIN_USER })

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(function(){
        loginUserFail(dispatch)
      })
  }
}

export const signUp = () => {
  return async (dispatch) => {
    Actions.signUp()
  }
}

export const signUpUser = (firstName, lastName, email, password) => {
  let body = {
    first_name: firstName,
    last_name: lastName,
    email: email,
    token: password,
    uri: ''
  }
  return async (dispatch) => {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(user => loginUserSuccess(dispatch, user))
          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              body.token = user.uid

              const response = fetch('http://localhost:3000/api', {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                }
              })
            }
          })
          dispatch({type: SIGNUP})
  }
}

const loginUserFail = (dispatch) => {
  dispatch({type: LOGIN_USER_FAIL})
}

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  })
  Actions.main()
}

export const joinRoom = () => {
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

export const sendMessage = (playerName,message) => {
  return async (dispatch) => {
    socket.emit('sendMessage', {playerName: playerName, message: message})
    socket.on('server message response', function(data) {
      dispatch({
        type: SEND_MESSAGE,
        payload: data.messages
      })
    })
  }
}

export const takeSeat = (tableNumber) => {
  return async (dispatch) => {
    socket.emit('TAKE_SEAT', {name: 'pl' , tableNumber: tableNumber})
    socket.on('FROM_SERVER', function(data) {
      dispatch({
        type: TAKE_SEAT,
        payload: data.people,
        count: data.count,
      })
    })
    socket.on('SET_PLAYER' , function(data) {
      dispatch({
        type: SET_PLAYER,
        payload: data.name,
      })
    })

    socket.on('START_GAME', function(data) {
      dispatch({
        type: START_GAME,
        payload: data,
        shouldTimerUpdate: true
      })
    })

    socket.on("ASSIGN_CARDS", function(data) {
      dispatch({
        type: ASSIGN_CARDS,
        payload: data.people,
        cardsOntable: data.cardsOntable
      })
    })

    socket.on('GAME_STATUS', function(data) {
      dispatch({
        type: GAME_STATUS,
        payload: data
      })
    })

    // Since every player call this method on starting, wa are doing this...
    socket.on('RAISE_AMOUNT_RESPONSE', function(data) {
      dispatch({
        type: RAISE_AMOUNT_RESPONSE,
        payload: data,
        Round: Round
      })
    })

    socket.on('DRAW_AMOUNT_RESPONSE', function(data) {
      dispatch({
        type: DRAW_AMOUNT_RESPONSE,
        payload: data,
      })
    })

    socket.on('TURN_VALUE_RESPONSE', function(data) {
      dispatch({
        type: TURN_VALUE_RESPONSE,
        payload: data
      })
    })
  }
}

export function shouldTimerUpdateFunc(data) {
  return async (dispatch) => {
    dispatch({
      type: SHOULD_TIMER_UPDATE,
      payload: data
    })
  }
}

export function evalWinner(cards) {
  return async (dispatch) => {
    let cardsSending = []
    cards.forEach(ele => {
      let evaluateCard = []
      for(let i = 0 ; i < 7; i++) {
        evaluateCard.push(ele[i].code)
      }
      cardsSending.push(evaluateCard)
    })
    socket.emit('CALCULATE_WINNER_HAND', cardsSending)
    socket.on('WINNING_CARDS', function(data) {
      dispatch({
        type: WINNING_CARDS,
        payload: data.result
      })
    })
  }
}

export const raise = (coinsDeal, gameStatus) => {
  return async (dispatch) => {
    let index = 0
    let turnTable = 0
    let sortedTables = gameStatus.people.map(people => people.tableNumber).sort()
    sortedTables.forEach((x,i) => {
      if(x == gameStatus.turnTable) {
        index = i
      }
    })
    if(sortedTables[sortedTables.length - 1] != gameStatus.turnTable) {
      turnTable = sortedTables[index + 1]
    }
    else {
      turnTable = sortedTables[0]
    }
    gameStatus.people[index].coins  = gameStatus.people[index].coins - coinsDeal * 2
    let gameStatus_ = {...gameStatus, coinsDeal: coinsDeal,
      turnTable: turnTable,
      totalCoins: gameStatus.totalCoins + coinsDeal * 2,
      coinsDeal: coinsDeal * 2
    }
    socket.emit('RAISE_AMOUNT', gameStatus_)
    socket.emit('TURN_VALUE', gameStatus)
  }
}


export const draw = (coinsDeal, gameStatus) => {
  return async (dispatch) => {
    let index = 0
    let turnTable = 0
    let sortedTables = gameStatus.people.map(people => people.tableNumber).sort()
    sortedTables.forEach((x,i) => {
      if(x == gameStatus.turnTable) {
        index = i
      }
    })
    if(sortedTables[sortedTables.length - 1] != gameStatus.turnTable) {
      turnTable = sortedTables[index + 1]
    }
    else {
      turnTable = sortedTables[0]
    }
    gameStatus.people[index].coins  = gameStatus.people[index].coins - coinsDeal
    let gameStatus_ = {...gameStatus, coinsDeal: coinsDeal,
      turnTable: turnTable,
      totalCoins: gameStatus.totalCoins + coinsDeal,
      coinsDeal: coinsDeal
    }

    socket.emit('DRAW_AMOUNT', gameStatus_)
    socket.emit('TURN_VALUE', gameStatus)
  }
}

export const fold = (coin) => {
  return async (dispatch) => {
      dispatch({
        type: DRAW_AMOUNT,
        payload: coin
      })
  }
}
