import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  ROOM_JOINED,
  TAKE_SEAT,
  SEND_MESSAGE
} from '../actions/types'

const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false,
  socket: null,
  sit: 'sit',
  message:[]
}
var messages = []
export default (state = INITIAL_STATE, action) => {
  // console.log(action)

  switch (action.type) {
    case EMAIL_CHANGED:
      return { ...state, email: action.payload }
    case PASSWORD_CHANGED:
      return { ...state, password: action.payload }
    case LOGIN_USER:
      return { ...state, loading: true, error: '' }
    case LOGIN_USER_SUCCESS:
      return { ...state, ...INITIAL_STATE, user: action.payload }
    case LOGIN_USER_FAIL:
      return { ...state, error: 'Authentication Failed.', password: '', loading: false }
    case ROOM_JOINED:
      return {...state, socket: action.payload}
    case TAKE_SEAT:
      console.log(action.payload)
      return{...state, sit: action.payload}
    case SEND_MESSAGE:
      console.log(action.payload);
    messages.push(action.payload)
    return {...state, message: messages}
    default:
      return state
  }
}
