import React from 'react';
import SocketIOClient from 'socket.io-client';
import {connect} from 'react-redux'
import Toast, {DURATION} from 'react-native-easy-toast'
import {bindActionCreators} from 'redux'

import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableHighlight,
  Card,
  CardSection,
  Input,
  Button,
  TextInput,
  Image,
  TouchableOpacity
} from 'react-native'
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import ProgressCircle from 'react-native-progress-circle'

import {
  takeSeat,
  sendMessage,
  fetchCards,
  sendCard,
  gameReadyToPlay,
  sendCardToServer,
  evalWinner,
  shouldTimerUpdateFunc
} from '../actions'
import Messages from './Messages'
import CardsOnTable from './CardsOnTable'

import Betting from './Betting'
import EmptyBetting from './EmptyBetting'
class gameRoom extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      coins: 0,
      totalCoins: 0,
      message: '',
      isYourTurn: false,
      activeTableNumbers: [],
      activeUserTableNumber: 0,
      players: [
        'sit',
        'sit',
        'sit',
        'sit',
        'sit',
        'sit'
      ]
    }
  }
  componentDidMount() {
    this.props.sendMessage()
  }
  componentWillReceiveProps(nextProps) {
    console.log('We are receiving values', nextProps.gameStatus);
    this.setState({gameStatus: nextProps.gameStatus})
    if (nextProps.isGameStarted) {
      nextProps.gameStatus.people.forEach((ele) => {
        console.log('from will receive props', ele.tableNumber, ele.name);
        if (ele.name == nextProps.player) {
          this.setState({totalCoins: nextProps.gameStatus.totalCoins, coins: ele.coins})
          if (nextProps.gameStatus.turnTable === ele.tableNumber) {
            console.log('inside setting props for turn');
            this.setState({isYourTurn: true})
          }
        }

      })
    }
    if (this.props.shouldTimerUpdate) {
      let timer = nextProps.timer
      let timeout = 1000
      this.setState({message: timer})
      for (let i = timer - 1; i >= 0; i--) {
        setTimeout(() => {

          i === 0
            ? this.setState({message: ''})
            : this.setState({message: i})
        }, ((timer - i) * 1000))

      }
    }
    this.props.shouldTimerUpdateFunc(false)
    let activeTableNumbers = []

    nextProps.people.forEach(ele => {
      console.log('from table.js ele', ele);
      this.state.players[ele.tableNumber - 1] = ele.name
      console.log('from table', nextProps.player, ele.name);
      if (nextProps.player === ele.name) {
        // this.state.activeUserTableNumber = ele.tableNumber
        this.setState({activeUserTableNumber: ele.tableNumber})
        console.log('this.state.activeUserTableNumber', this.state.activeUserTableNumber);
      } else {
        activeTableNumbers.push(ele.tableNumber)

      }
      // console.log('activeTableNumbers', activeTableNumbers, activeUserTableNumber);
    })
    this.setState({activeTableNumbers: activeTableNumbers})

  }

  render() {
    // console.log('active player from table.js', this.props.activePlayer)
    // let activeUserTableNumber = 0
    let cards = []
    let cardsToBeEvaluated = []
    this.props.assignCards.forEach(ele => {
      cardsToBeEvaluated.push(ele.cards.concat(this.props.cardsOntable))
      if (ele.name == this.props.player) {
        cards = ele.cards
      }
    })

    // let players = ['sit','sit','sit','sit','sit','sit']
    console.log('from table ', this.props.Round);
    if(this.props.Round == 3) {
      console.log('the Round is three');
      this.props.evalWinner(cardsToBeEvaluated)
    }
    console.log('We are rerednering', this.state.gameStatus)
    return (<View flexDirection= 'column' >
      <ImageBackground source={require('../Images/pokerTable2.png')} style={styles.background}>
        <View flexDirection='column'>
          {/* for the totla money */}


          <View style={{marginTop:'2%'}}>
          <View style={{
              flexDirection: 'row',
              marginLeft: '6%',

            }}>
            <TouchableHighlight style={styles.button1} onPress={() => {
                this.props.takeSeat(1)
              }}>
              <Text>
                {this.state.players[0]}
              </Text>
            </TouchableHighlight>
            {
              this.state.activeUserTableNumber == 1 && cards.length > 0
                ? <Image style={{
                      width: 50,
                      height: 70,
                      padding: 5,
                      alignContent: 'center'
                    }} source={{
                      uri: `${cards[0].image}`
                    }}/>
                : this.state.activeTableNumbers.includes(1)
                  ? <Image style={{
                        width: 50,
                        height: 70,
                        opacity: this.props.player1Display
                      }} source={{
                        uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'
                      }}/>
                  : <Image style={{
                        width: 50,
                        height: 70,
                        opacity: this.props.player1Display
                      }} source={{
                        uri: ''
                      }}/>
            }
            {
              this.state.activeUserTableNumber == 1 && cards.length > 0
                ? <Image style={{
                      width: 50,
                      height: 70,
                      padding: 5,
                      justifyContent: 'center'
                    }} source={{
                      uri: `${cards[1].image}`
                    }}/>
                : this.state.activeTableNumbers.includes(1)
                  ? <Image style={{
                        width: 50,
                        height: 70,
                        opacity: this.props.player1Display
                      }} source={{
                        uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'
                      }}/>
                  : <Image style={{
                        width: 50,
                        height: 70,
                        opacity: this.props.player1Display
                      }} source={{
                        uri: ''
                      }}/>
            }
          </View>

          <Betting coins={this.state.coins} totalCoins={this.state.totalCoins} activeUserTableNumber={this.state.activeUserTableNumber} cardsLength={cards.length} gameStatus={this.state.gameStatus}/>
          {
            cards.length > 0
              ? <Text style={{
                      color: 'white',
                      paddingRight: 10,
                      paddingLeft: '38%',
                      marginTop: '5%'
                    }}>$ {this.state.totalCoins}</Text>
              : <Text style={{
                      color: 'white',
                      paddingRight: 10,
                      paddingLeft: '38%',
                      marginTop: '5%'
                    }}></Text>
          }
          <View style={{
              flexDirection: 'row',
              marginTop: '-1%',
              marginLeft: '1%'
            }}>
            <TouchableHighlight style={styles.button2} onPress={() => {
                this.props.takeSeat(2)
              }}>
              <Text>
                {this.state.players[1]}
              </Text>
            </TouchableHighlight>
            {
              this.state.activeUserTableNumber == 2 && cards.length > 0
                ? <Image style={{
                      width: 50,
                      height: 70,
                      opacity: this.props.player1Display
                    }} source={{
                      uri: `${cards[0].image}`
                    }}/>
                : this.state.activeTableNumbers.includes(2)
                  ? <Image style={{
                        width: 50,
                        height: 70,
                        opacity: this.props.player1Display
                      }} source={{
                        uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'
                      }}/>
                  : <Image style={{
                        width: 50,
                        height: 70,
                        opacity: this.props.player1Display
                      }} source={{
                        uri: ''
                      }}/>
            }
            {
              this.state.activeUserTableNumber == 2 && cards.length > 0
                ? <Image style={{
                      width: 50,
                      height: 70,
                      opacity: this.props.player1Display
                    }} source={{
                      uri: `${cards[1].image}`
                    }}/>
                : this.state.activeTableNumbers.includes(2)
                  ? <Image style={{
                        width: 50,
                        height: 70,
                        opacity: this.props.player1Display
                      }} source={{
                        uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'
                      }}/>
                  : <Image style={{
                        width: 50,
                        height: 70,
                        opacity: this.props.player1Display
                      }} source={{
                        uri: ''
                      }}/>
            }
          </View>

          <View style={{
              marginLeft: '45%',
              marginTop: '-6%'
            }}>
            <ProgressCircle percent={this.state.message * 20} radius={30} borderWidth={10} color="#3399FF" shadowColor="#999" bgColor="#fff">
              <Text style={{
                  fontSize: 18
                }}>{this.state.message}</Text>
            </ProgressCircle>
          </View>
          {
            this.props.cardsOntable.length > 0
              ? <View style={{
                    flexDirection: 'row',
                    marginTop: '-9.5%',
                    marginLeft: '30%'
                  }}>
                  <CardsOnTable/>
                </View>
              : null
          }

          <View style={{
              flexDirection: 'row',
              marginTop: '2%',
              marginLeft: '5%'
            }}>
            <TouchableHighlight style={styles.button3} onPress={() => {
                this.props.takeSeat(3)
              }}>
              <Text>
                {this.state.players[2]}
              </Text>

            </TouchableHighlight>
            {
              this.state.activeUserTableNumber == 3 && cards.length > 0
                ? <Image style={{
                      width: 50,
                      height: 70,
                      opacity: this.props.player1Display
                    }} source={{
                      uri: `${cards[0].image}`
                    }}/>
                : this.state.activeTableNumbers.includes(3)
                  ? <Image style={{
                        width: 50,
                        height: 70,
                        opacity: this.props.player1Display
                      }} source={{
                        uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'
                      }}/>
                  : <Image style={{
                        width: 50,
                        height: 70,
                        opacity: this.props.player1Display
                      }} source={{
                        uri: ''
                      }}/>
            }
            {
              this.state.activeUserTableNumber == 3 && cards.length > 0
                ? <Image style={{
                      width: 50,
                      height: 70,
                      opacity: this.props.player1Display
                    }} source={{
                      uri: `${cards[1].image}`
                    }}/>
                : this.state.activeTableNumbers.includes(3)
                  ? <Image style={{
                        width: 50,
                        height: 70,
                        opacity: this.props.player1Display
                      }} source={{
                        uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'
                      }}/>
                  : <Image style={{
                        width: 50,
                        height: 70,
                        opacity: this.props.player1Display
                      }} source={{
                        uri: ''
                      }}/>
            }
          </View>

          <View style={{
              flexDirection: 'row',
              marginTop: '-8%',
              marginLeft: '70%'
            }}>
            {
              this.state.activeUserTableNumber == 4 && cards.length > 0
                ? <Image style={{
                      width: 50,
                      height: 70,
                      opacity: this.props.player1Display
                    }} source={{
                      uri: `${cards[0].image}`
                    }}/>
                : this.state.activeTableNumbers.includes(4)
                  ? <Image style={{
                        width: 50,
                        height: 70,
                        opacity: this.props.player1Display
                      }} source={{
                        uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'
                      }}/>
                  : <Image style={{
                        width: 50,
                        height: 70,
                        opacity: this.props.player1Display
                      }} source={{
                        uri: ''
                      }}/>
            }
            {
              this.state.activeUserTableNumber == 4 && cards.length > 0
                ? <Image style={{
                      width: 50,
                      height: 70,
                      opacity: this.props.player1Display
                    }} source={{
                      uri: `${cards[1].image}`
                    }}/>
                : this.state.activeTableNumbers.includes(4)
                  ? <Image style={{
                        width: 50,
                        height: 70,
                        opacity: this.props.player1Display
                      }} source={{
                        uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'
                      }}/>
                  : <Image style={{
                        width: 50,
                        height: 70,
                        opacity: this.props.player1Display
                      }} source={{
                        uri: ''
                      }}/>
            }
            <TouchableHighlight style={styles.button4} onPress={() => {
                this.props.takeSeat(4)
              }}>
              <Text>
                {this.state.players[3]}
              </Text>
            </TouchableHighlight>
          </View>
          <View style={{
              flexDirection: 'row',
              marginTop: '-27%',
              marginLeft: '75%'
            }}>
            {
              this.state.activeUserTableNumber == 5 && cards.length > 0
                ? <Image style={{
                      width: 50,
                      height: 70,
                      opacity: this.props.player1Display
                    }} source={{
                      uri: `${cards[0].image}`
                    }}/>
                : this.state.activeTableNumbers.includes(5)
                  ? <Image style={{
                        width: 50,
                        height: 70,
                        opacity: this.props.player1Display
                      }} source={{
                        uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'
                      }}/>
                  : <Image style={{
                        width: 50,
                        height: 70,
                        opacity: this.props.player1Display
                      }} source={{
                        uri: ''
                      }}/>
            }
            {
              this.state.activeUserTableNumber == 5 && cards.length > 0
                ? <Image style={{
                      width: 50,
                      height: 70,
                      opacity: this.props.player1Display
                    }} source={{
                      uri: `${cards[1].image}`
                    }}/>
                : this.state.activeTableNumbers.includes(5)
                  ? <Image style={{
                        width: 50,
                        height: 70,
                        opacity: this.props.player1Display
                      }} source={{
                        uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'
                      }}/>
                  : <Image style={{
                        width: 50,
                        height: 70,
                        opacity: this.props.player1Display
                      }} source={{
                        uri: ''
                      }}/>
            }
            <TouchableHighlight style={styles.button5} onPress={() => {
                this.props.takeSeat(5)
              }}>
              <Text>
                {this.state.players[4]}
              </Text>
            </TouchableHighlight>
          </View>

          <View style={{
              flexDirection: 'row',
              marginTop: '-28%',
              marginLeft: '70%'
            }}>
            {
              this.state.activeUserTableNumber == 6 && cards.length > 0
                ? <Image style={{
                      width: 50,
                      height: 70,
                      opacity: this.props.player1Display
                    }} source={{
                      uri: `${cards[0].image}`
                    }}/>
                : this.state.activeTableNumbers.includes(6)
                  ? <Image style={{
                        width: 50,
                        height: 70,
                        opacity: this.props.player1Display
                      }} source={{
                        uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'
                      }}/>
                  : <Image style={{
                        width: 50,
                        height: 70,
                        opacity: this.props.player1Display
                      }} source={{
                        uri: ''
                      }}/>
            }
            {
              this.state.activeUserTableNumber == 6 && cards.length > 0
                ? <Image style={{
                      width: 50,
                      height: 70,
                      opacity: this.props.player1Display
                    }} source={{
                      uri: `${cards[1].image}`
                    }}/>
                : this.state.activeTableNumbers.includes(6)
                  ? <Image style={{
                        width: 50,
                        height: 70,
                        opacity: this.props.player1Display
                      }} source={{
                        uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'
                      }}/>
                  : <Image style={{
                        width: 50,
                        height: 70,
                        opacity: this.props.player1Display
                      }} source={{
                        uri: ''
                      }}/>
            }
            <TouchableHighlight style={styles.button6} onPress={() => {
                this.props.takeSeat(6)
              }}>
              <Text>
                {this.state.players[5]}
              </Text>
            </TouchableHighlight>
          </View>
        </View>
        {this.props.Round == 3 ? this.refs.toast.show('Game Ended', DURATION.LENGTH_LONG) : null}
        <Toast
                    ref="toast"
                    style={{backgroundColor:'black'}}
                    position='top'
                    positionValue={200}
                    fadeInDuration={750}
                    fadeOutDuration={1000}
                    opacity={0.8}
                    textStyle={{color:'white'}}
        />
        </View>
        <View style={{
            marginTop: 130
          }}>
          <TextInput style={{
              height: 5,
              borderColor: 'blue',
              borderWidth: 1,
              backgroundColor: 'grey',
              width: '50%',
              marginTop: '15%',
              color: 'white',
              marginLeft: '2%'
            }} multiline={true} numberOfLines={4} onChangeText={(text) => this.setState({text})} value={this.state.text}/>
          <TouchableOpacity style={styles.messageButton} onPress={() => {
              this.props.sendMessage(this.props.player, this.state.text)
            }} underlayColor='#fff'>
            <Text style={styles.submitText}>SEND</Text>
          </TouchableOpacity>
          <View style={styles.Messages}>
            <Messages/>
          </View>
          <TouchableOpacity style={styles.leaveButton}
            // onPress={() => {this.props.sendMessage(this.props.player, this.state.text)}}
            underlayColor='#fff'>
            <Text style={styles.submitText, {
                marginTop: 10,
                marginLeft: 20,
                fontWeight: '900'
              }}>LEAVE</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>);
  }
}
var styles = StyleSheet.create({
  Messages: {
    marginLeft: '70%',
    marginTop: '-6%',
    backgroundColor: 'red',
    width: 100,
    borderRadius: 20,
    borderColor: '#fff'
  },
  leaveButton: {
    marginLeft: '87%',
    marginTop: '-6%',
    backgroundColor: '#1E6738',
    width: 80,
    height: 40,
    borderRadius: 20
  },
  messageButton: {
    // marginRight: 40,
    marginLeft: '55%',
    height: 40,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#1E6738',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#fff',
    width: 80,
    marginTop: '-6%'
  },
  submitText: {
    color: 'black',
    textAlign: 'center',
    fontWeight: '900'
    // paddingLeft: 10,
    // paddingRight: 10
  },
  background: {

    height: '100%',
    width: '100%',
    marginTop: '-3%',
    marginBottom: '7%'
  },
  button1: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 15,
    width: 70,
    //  marginLeft: '12%',
    //  marginTop: '7%',
    borderRadius: 100
  },
  button2: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 15,
    width: 70,
    // marginLeft: '5%',
    // marginTop: '5%',
    borderRadius: 100
  },
  button3: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 15,
    width: 70,
    borderRadius: 100
  },
  button4: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 15,
    width: 70,
    //  marginLeft: '80%',
    //  marginTop: '-7%',
    borderRadius: 100
  },
  button5: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 15,
    width: 70,
    //  marginLeft: '85%',
    //  marginTop: '-20%',
    borderRadius: 100
  },
  button6: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 15,
    width: 70,
    //  marginLeft: '80%',
    //  marginTop: '-18%',
    borderRadius: 100
  }
})
StyleSheet.flatten(styles)
function mapStateToProps(state) {
  return {
    socket: state.auth.socket,
    people: state.auth.people,
    text: state.auth.text,
    message: state.auth.message,
    count: state.auth.count,
    cardsFetched: state.auth.cardsFetched,
    cards: state.auth.cards,
    round: state.auth.round,
    cardsReady: state.auth.cardsReady,
    isGameStarting: state.auth.isGameStarting,
    display: state.auth.display,
    player1Display: state.auth.player1Display,
    player2Display: state.auth.player2Display,
    player1Card: state.auth.player1Card,
    assignCards: state.auth.assignCards,
    player: state.auth.player,
    tableNumber: state.auth.tableNumber,
    cardsOntable: state.auth.cardsOntable,
    gameStatus: state.auth.gameStatus,
    isGameStarted: state.auth.isGameStarted,
    timer: state.auth.timer,
    shouldTimerUpdate: state.auth.shouldTimerUpdate,
    activePlayer: state.auth.activePlayer,
    Round: state.auth.Round,
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  takeSeat,
  sendMessage,
  fetchCards,
  sendCard,
  gameReadyToPlay,
  sendCardToServer,
  evalWinner,
  shouldTimerUpdateFunc
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(gameRoom)
