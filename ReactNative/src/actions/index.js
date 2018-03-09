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
} from './types'
var socket = null
export const joinRoom = () => {
  console.log('in this room')
  socket = SocketIOClient('http://localhost:3000/', {jsonp: false, transports: ['websocket']})

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
      console.log(data.messages)
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
        payload: data.people
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
        payload: data.people
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
        payload: data.people
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
        payload: data.people
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
        payload: data.people
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
        payload: data.people
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
