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
  RAISE_AMOUNT
} from './types'
var socket = null
let countPlayer = 0
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
            console.log('inside oauth', body);
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
          dispatch({ type: SIGNUP })
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
    socket.emit('sendMessage', {playerName:playerName, message:message})
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
    // console.log('count', tableNumber);
    // console.log('seat taken')
    // console.log(socket);
    socket.emit('TAKE_SEAT', {name: 'pl' , tableNumber: tableNumber})
    socket.on('FROM_SERVER', function(data) {
      // console.log(data.people)
      // console.log(typeof(data))
      dispatch({
        type: TAKE_SEAT,
        payload: data.people,
        count: data.count,
      })
    })
    socket.on('SET_PLAYER' , function(data) {
      // console.log('SET_PLAYER', data);
      dispatch({
        type: SET_PLAYER,
        payload: data.name,
      })
    })

    socket.on('START_GAME', function(data) {
      console.log(data);
      dispatch({
        type: START_GAME,
        payload: data,
        shouldTimerUpdate: true
      })
    })

    socket.on("ASSIGN_CARDS", function(data) {
      console.log(data)
      dispatch({
        type: ASSIGN_CARDS,
        payload: data.people,
        cardsOntable: data.cardsOntable
      })
    })
    socket.on('GAME_STATUS', function(data){
      // console.log(data);
      dispatch({
        type: GAME_STATUS,
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
  console.log(cards);
  return async (dispatch) => {
    let cardsSending = []
    cards.forEach(ele => {
      let evaluateCard = []
      for(let i = 0 ; i < 7; i++) {
        evaluateCard.push(ele[i].code)
      }
      cardsSending.push(evaluateCard)
    })
    console.log(cardsSending);
    socket.emit('CALCULATE_WINNER_HAND', cardsSending)
    socket.on('WINNING_CARDS', function(data) {
      console.log('winning hand', data);
    })
  }
}

export const raise = (coin) => {
  console.log('coint from raise', coin);
  return async (dispatch) => {
      dispatch({
        type: RAISE_AMOUNT,
        payload: coin * 2
      })
  }
}

export const draw = (coin) => {
  console.log('coint from raise', coin);
  return async (dispatch) => {
      dispatch({
        type: DRAW_AMOUNT,
        payload: coin
      })
  }
}

export const fold = (coin) => {
  console.log('coint from raise', coin);
  return async (dispatch) => {
      dispatch({
        type: DRAW_AMOUNT,
        payload: coin
      })
  }
}






// export const emailChanged = (text) => {
//   return {
//     type: EMAIL_CHANGED,
//     payload: text
//   }
// }
//
// export const passwordChanged = (text) => {
//   return {
//     type: PASSWORD_CHANGED,
//     payload: text
//   }
// }
//
// // return (dispatch) is from thunk
// export const loginUser = ({email, password }) => {
//   return (dispatch) => {
//     dispatch({ type: LOGIN_USER })
//
//     firebase.auth().signInWithEmailAndPassword(email, password)
//       .then(user => loginUserSuccess(dispatch, user))
//       .catch((error) => {
//         console.log('action/index error', error)
//
//         firebase.auth().createUserWithEmailAndPassword(email, password)
//           .then(user => loginUserSuccess(dispatch, user))
//           .catch(() => loginUserFail(dispatch))
//       })
//   }
// }
//
// const loginUserFail = (dispatch) => {
//   dispatch({ type: LOGIN_USER_FAIL })
// }
//
// const loginUserSuccess = (dispatch, user) => {
//   dispatch({
//     type: LOGIN_USER_SUCCESS,
//     payload: user
//   })
//   Actions.main()
// }




// export function fetchCards() {
//  return async (dispatch) => {
//    const response = await fetch(`https://deckofcardsapi.com/api/deck/new/draw/?count=52`)
//    const json = await response.json()
//    dispatch({
//      type: CARDS_RECEIVED,
//      cards: json.cards
//    })
//  }
// }

// export function sendCard(cards) {
//  return async (dispatch) => {
//    let topFifteenCards = []
//    for(let i = 0; i < 17; i++) {
//      topFifteenCards.push(cards[i])
//    }
//    dispatch({
//      type: SEND_CARDS,
//      topFifteenCards: topFifteenCards,
//    })
//  }
// }

// export function gameReadyToPlay(cards,totalPeople) {
//   return async (dispatch) => {
//     var objectOfCardsAndPeople = {
//       cards: cards,
//       people: totalPeople
//     }
//     socket.emit('game is starting', objectOfCardsAndPeople)
//     socket.on('game starting now', function(data) {
//       console.log('from server hello' + data)
//       dispatch({
//         type: GAME_READY_TO_PLAY,
//       })
//     })
//   }
// }
