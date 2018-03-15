import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  ROOM_JOINED,
  TAKE_SEAT,
  SEND_MESSAGE,
  CARDS_RECEIVED,
  SEND_CARDS,
  GAME_READY_TO_PLAY,
  CARDS_FOR_EACH_PLAYER,
  CARDS_FOR_PLAYER1,
  SET_PLAYER,
  ASSIGN_CARDS,
  GAME_STATUS,
  START_GAME,
  SHOULD_TIMER_UPDATE,
  RAISE_AMOUNT,
} from '../actions/types'
import {FIRSTNAME_CHANGED,
LASTNAME_CHANGED,
EMAIL_CHANGED,
PASSWORD_CHANGED,} from '../actions'
let messages = []
const INITIAL_STATE = {
  first_name: '',
  last_name: '',
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
  cardsReady: false,
  topFifteenCards: [],
  isTopFifteenCardsReady: false,
  isGameStarted: false,
  display: 0,
  playersCard: [],
  player: '',
  assignCards: [],
  tableNumber: 0,
  cardsOntable: [],
  playerStatus: 'active',
  gameStatus: {},
  timer: 0,
}

export default (state = INITIAL_STATE, action) => {
  // console.log(action)

  switch (action.type) {
    case FIRSTNAME_CHANGED:
      return{...state, first_name: action.payload}
    case LASTNAME_CHANGED:
      return{...state, last_name: action.payload}
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
        ...state
      }
    case CARDS_FOR_EACH_PLAYER:
      return{
        ...state, display: 1, playersCard: action.playersCard, player1Display: 1, player2Display: 1
      }
    case SET_PLAYER:
      return{
        ...state, player: action.payload
      }
    case ASSIGN_CARDS:
      return{
        ...state, assignCards: action.payload, cardsOntable: action.cardsOntable
      }
    case GAME_STATUS:
      return{
        ...state,gameStatus: action.payload, isGameStarted: true
      }
    case START_GAME:
      return{...state, timer: action.payload, shouldTimerUpdate: action.shouldTimerUpdate}
    case SHOULD_TIMER_UPDATE:
      return{
        ...state, shouldTimerUpdate: action.payload
      }
    case RAISE_AMOUNT:
     return {
       ...state, gameStatus: {...state.gameStatus, coinsDeal: action.payload}
     }
    default:
      return state
  }
}
