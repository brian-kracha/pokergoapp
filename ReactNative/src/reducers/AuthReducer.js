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
  count: 0,
  cards: [],
  cardsFetched: false,
  round: true,
  cardsReady: false,
  topFifteenCards: [],
  isTopFifteenCardsReady: false,
  isGameStarting: false,
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
      return{...state, people: action.payload, count: action.count}
    case TAKE_SEAT2:
      return{...state, people: action.payload, count: action.count}

    case TAKE_SEAT3:
      return{...state, people: action.payload, count: action.count}

    case TAKE_SEAT4:
      return{...state, people: action.payload, count: action.count}

    case TAKE_SEAT5:
      return{...state, people: action.payload, count: action.count}

    case TAKE_SEAT6:
      return{...state, people: action.payload, count: action.count}
    case SEND_MESSAGE:
      return {
        ...state,
        message: action.payload
      }
    case CARDS_RECEIVED:
      return {
        ...state,
        cards: action.cards,
        cardsFetched: true,
        round: false,
        cardsReady: true,
      }
    case SEND_CARDS:
      return{
        ...state,cardsReady: false, topFifteenCards: action.topFifteenCards,
        isTopFifteenCardsReady: true,
      }
    case GAME_READY_TO_PLAY:
      return{
        ...state, isGameStarting: true
      }
    default:
      return state
  }
}
