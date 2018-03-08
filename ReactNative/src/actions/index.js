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
  TAKE_SEAT,
  SEND_MESSAGE,
} from './types'
var socket = null


export const joinRoom = () => {
  console.log('in this room')
  socket = SocketIOClient('https://bishalchatter.herokuapp.com/', {jsonp: false, transports: ['websocket']})

  socket.emit('joinTable1', 'table1')

  Actions.table()
  console.log(socket)
  return {
    type: ROOM_JOINED,
    payload: socket
  }
}
export const sendMessage = (message) => {
  return async (dispatch) => {
    socket.emit('sendMessage', message)
    console.log('message send', message)
    socket.on('server message response', function(data) {
      console.log(data)
      dispatch({
        type: SEND_MESSAGE,
        payload: data
      })
    })
  }
}

export const takeSeat = () => {
  return async (dispatch) => {
    console.log('seat taken')
    console.log(socket);
    var sit
    socket.emit('from client side', 'taken')
    socket.on('from server', function(data) {
      console.log(data)
      console.log(typeof(data))
      dispatch({
        type: TAKE_SEAT,
        payload: data
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
export const loginUser = ({ email, password }) => {
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
