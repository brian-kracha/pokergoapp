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
} from '../actions/types'
let messages = []
const INITIAL_STATE = {
  email: '',
  password: '',
  user: null,
  error: '',
  loading: false,
  socket: null,
  sit: ['sit','sit','sit','sit','sit','sit'],
  message: [],
  people: [],
}
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
    case TAKE_SEAT1:
      console.log(action.payload)
      return{...state, people: action.payload}
    case TAKE_SEAT2:
      console.log(action.payload)
      return{...state, people: action.payload}

    case TAKE_SEAT3:
      console.log(action.payload)
      return{...state, people: action.payload}

    case TAKE_SEAT4:
      console.log(action.payload)
      return{...state, people: action.payload}

    case TAKE_SEAT5:
      console.log(action.payload)
      return{...state, people: action.payload}

    case TAKE_SEAT6:
      console.log(action.payload)
      return{...state, people: action.payload}
    case SEND_MESSAGE:
      return {
        ...state,
        message: action.payload
      }
    default:
      return state
  }
}
