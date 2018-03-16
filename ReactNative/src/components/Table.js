import React from 'react';
import SocketIOClient from 'socket.io-client';
import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'

import {Text, View, ImageBackground, StyleSheet, TouchableHighlight, Card, CardSection, Input, Button, TextInput, Image, TouchableOpacity} from 'react-native'
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import ProgressCircle from 'react-native-progress-circle'

import {takeSeat,sendMessage, fetchCards,sendCard,gameReadyToPlay,sendCardToServer,evalWinner, shouldTimerUpdateFunc} from '../actions'
import Messages from './Messages'
import CardsOnTable from './CardsOnTable'

import Betting from './Betting'
import EmptyBetting from './EmptyBetting'
class gameRoom extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      text: '',
      coins: 0,
      totalCoins: 0,
      message: '',
      isYourTurn: false,
    }
  }
  componentDidMount() {
    this.props.sendMessage()
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.isGameStarted) {
      nextProps.gameStatus.people.forEach((ele) => {
        console.log('from will receive props', ele.tableNumber, ele.name);
        if(ele.name == nextProps.player) {
          this.setState({
            totalCoins: nextProps.gameStatus.totalCoins,
            coins: ele.coins
          })
          if(nextProps.gameStatus.turnTable === ele.tableNumber) {
            console.log('inside setting props for turn');
            this.setState({isYourTurn: true})
          }
        }

      })
    }
    if(this.props.shouldTimerUpdate)  {
      let timer = nextProps.timer
      let timeout = 1000
      this.setState({message: timer})
      for(let i = timer - 1; i >= 0; i--) {
        setTimeout(() => {

          i === 0 ? this.setState({message: ''}) :
          this.setState({message: i})
        }, ((timer - i) * 1000))

      }
  }
    this.props.shouldTimerUpdateFunc(false)
  }

  render() {
    console.log('active player from table.js', this.props.activePlayer);
    let activeTableNumbers = []
    let activeUserTableNumber = 0
    let cards = []
    let cardsToBeEvaluated = []
    this.props.assignCards.forEach(ele => {
      cardsToBeEvaluated.push(ele.cards.concat(this.props.cardsOntable))
      if(ele.name == this.props.player) {
        cards = ele.cards
      }
    })


    let players = ['sit','sit','sit','sit','sit','sit']
    this.props.people.forEach(ele => {
      players[ele.tableNumber - 1] = ele.name
      if(this.props.player === ele.name) {
        activeUserTableNumber = ele.tableNumber
      }
      else {
        activeTableNumbers.push(ele.tableNumber)
      }
      console.log('activeTableNumbers', activeTableNumbers, activeUserTableNumber);
    })

    return (
      <View>
        <ImageBackground

          source={require('../images/pokerTable2.png')}

          style= { styles.background }>
          <View>
          {/* <Text style={{color: 'white'}}>{this.state.message}</Text> */}
          <Betting coins={this.state.coins} totalCoins={this.state.totalCoins}  activeUserTableNumber = {activeUserTableNumber} cardsLength = {cards.length} turn ={this.props.gameStatus.turnTable} activeTableNumbers = {activeTableNumbers} activePlayer= {this.props.activePlayer}/>
            <View style={{flexDirection: 'row', marginTop: '-4%', marginLeft: '5%'}}>
              <TouchableHighlight
                 style={styles.button1}
                 onPress={()=> {this.props.takeSeat(1)}}
                >
               <Text> {players[0]} </Text>
              </TouchableHighlight>
                {activeUserTableNumber == 1 && cards.length > 0 ? <Image
                  style={{width: 50, height: 70, padding: 5, alignContent:  'center'}}
                  source={{uri: `${cards[0].image}`}}
                /> : activeTableNumbers.includes(1) ? <Image
                  style={{width: 50, height: 70, opacity: this.props.player1Display}}
                  source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                /> : <Image
                  style={{width: 50, height: 70, opacity: this.props.player1Display}}
                  source={{uri: ''}}
                /> }
                {activeUserTableNumber == 1 && cards.length > 0 ?
                <Image
                  style={{width: 50, height: 70, padding: 5, justifyContent: 'center'}}
                  source={{uri: `${cards[1].image}`}}
                /> : activeTableNumbers.includes(1) ? <Image
                  style={{width: 50, height: 70, opacity: this.props.player1Display}}
                  source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                /> : <Image
                  style={{width: 50, height: 70, opacity: this.props.player1Display}}
                  source={{uri: ''}}
                /> }
              </View>

              <View style={{flexDirection: 'row', marginTop: '3%', marginLeft: '1%'}}>
                <TouchableHighlight
                   style={styles.button2}
                   onPress={()=>{this.props.takeSeat(2)}}
                  >
                 <Text> {players[1]} </Text>
                </TouchableHighlight>
                {activeUserTableNumber == 2 && cards.length > 0 ? <Image
                  style={{width: 50, height: 70, opacity: this.props.player1Display}}
                  source={{uri: `${cards[0].image}`}}
                /> : activeTableNumbers.includes(2) ? <Image
                  style={{width: 50, height: 70, opacity: this.props.player1Display}}
                  source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                /> : <Image
                  style={{width: 50, height: 70, opacity: this.props.player1Display}}
                  source={{uri: ''}}
                /> }
                {activeUserTableNumber == 2 && cards.length > 0 ?
                <Image
                  style={{width: 50, height: 70, opacity: this.props.player1Display}}
                  source={{uri: `${cards[1].image}`}}
                /> : activeTableNumbers.includes(2) ? <Image
                  style={{width: 50, height: 70, opacity: this.props.player1Display}}
                  source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                /> : <Image
                  style={{width: 50, height: 70, opacity: this.props.player1Display}}
                  source={{uri: ''}}
                /> }
              </View>
              <View style={{marginLeft: '45%', marginTop:'-5%'}}>
                <ProgressCircle
                  percent={this.state.message * 20}
                  radius={30}
                  borderWidth={10}
                  color="#3399FF"
                  shadowColor="#999"
                  bgColor="#fff"
                  >
                  <Text style={{ fontSize: 18 }}>{this.state.message}</Text>
              </ProgressCircle>
            </View>
              {this.props.cardsOntable.length > 0 ? <View style={{flexDirection: 'row', marginTop: '-9.5%', marginLeft: '30%'}}>
                <CardsOnTable />
              </View> : null }

              <View style={{flexDirection: 'row', marginTop: '2%', marginLeft: '5%'}}>
                <TouchableHighlight
                   style={styles.button3}
                   onPress={()=> {this.props.takeSeat(3)}}
                  >
                 <Text> {players[2]} </Text>

                </TouchableHighlight>
                {activeUserTableNumber == 3 && cards.length > 0 ? <Image
                  style={{width: 50, height: 70, opacity: this.props.player1Display}}
                  source={{uri: `${cards[0].image}`}}
                /> : activeTableNumbers.includes(3) ? <Image
                  style={{width: 50, height: 70, opacity: this.props.player1Display}}
                  source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                /> : <Image
                  style={{width: 50, height: 70, opacity: this.props.player1Display}}
                  source={{uri: ''}}
                /> }
                {activeUserTableNumber == 3 && cards.length > 0 ?
                <Image
                  style={{width: 50, height: 70, opacity: this.props.player1Display}}
                  source={{uri: `${cards[1].image}`}}
                /> : activeTableNumbers.includes(3) ? <Image
                  style={{width: 50, height: 70, opacity: this.props.player1Display}}
                  source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                /> : <Image
                  style={{width: 50, height: 70, opacity: this.props.player1Display}}
                  source={{uri: ''}}
                /> }
              </View>




              <View style={{flexDirection: 'row', marginTop: '-10%', marginLeft: '70%'}}>
                {activeUserTableNumber == 4 && cards.length > 0 ?
                <Image
                  style={{width: 50, height: 70, opacity: this.props.player1Display}}
                  source={{uri: `${cards[0].image}`}}
                /> : activeTableNumbers.includes(4) ? <Image
                  style={{width: 50, height: 70, opacity: this.props.player1Display}}
                  source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                /> : <Image
                  style={{width: 50, height: 70, opacity: this.props.player1Display}}
                  source={{uri: ''}}
                /> }
                {activeUserTableNumber == 4 && cards.length > 0 ?
                <Image
                  style={{width: 50, height: 70, opacity: this.props.player1Display}}
                  source={{uri: `${cards[1].image}`}}
                /> : activeTableNumbers.includes(4) ? <Image
                  style={{width: 50, height: 70, opacity: this.props.player1Display}}
                  source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                /> : <Image
                  style={{width: 50, height: 70, opacity: this.props.player1Display}}
                  source={{uri: ''}}
                /> }
                <TouchableHighlight
                   style={styles.button4}
                   onPress={()=>{this.props.takeSeat(4)}}
                  >
                 <Text> {players[3]} </Text>
                </TouchableHighlight>
              </View>
              <View style={{flexDirection: 'row', marginTop: '-23%', marginLeft: '75%'}}>
                {activeUserTableNumber == 5 && cards.length > 0 ?
                  <Image
                  style={{width: 50, height: 70, opacity: this.props.player1Display}}
                  source={{uri: `${cards[0].image}`}}
                /> : activeTableNumbers.includes(5) ? <Image
                  style={{width: 50, height: 70, opacity: this.props.player1Display}}
                  source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                /> : <Image
                  style={{width: 50, height: 70, opacity: this.props.player1Display}}
                  source={{uri: ''}}
                /> }
                {activeUserTableNumber == 5 && cards.length > 0 ?
                <Image
                  style={{width: 50, height: 70, opacity: this.props.player1Display}}
                  source={{uri: `${cards[1].image}`}}
                /> : activeTableNumbers.includes(5) ? <Image
                  style={{width: 50, height: 70, opacity: this.props.player1Display}}
                  source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                /> : <Image
                  style={{width: 50, height: 70, opacity: this.props.player1Display}}
                  source={{uri: ''}}
                /> }
                <TouchableHighlight
                   style={styles.button5}
                   onPress={()=>{this.props.takeSeat(5)}}
                  >
                 <Text> {players[4]} </Text>
                </TouchableHighlight>
              </View>

            <View style={{flexDirection: 'row', marginTop: '-23%', marginLeft: '70%'}}>
              {activeUserTableNumber == 6 && cards.length > 0 ?
                <Image
                style={{width: 50, height: 70, opacity: this.props.player1Display}}
                source={{uri: `${cards[0].image}`}}
              /> : activeTableNumbers.includes(6) ? <Image
                style={{width: 50, height: 70, opacity: this.props.player1Display}}
                source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
              /> : <Image
                style={{width: 50, height: 70, opacity: this.props.player1Display}}
                source={{uri: ''}}
              /> }
              {activeUserTableNumber == 6 && cards.length > 0 ?
              <Image
                style={{width: 50, height: 70, opacity: this.props.player1Display}}
                source={{uri: `${cards[1].image}`}}
              /> : activeTableNumbers.includes(6) ? <Image
                style={{width: 50, height: 70, opacity: this.props.player1Display}}
                source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
              /> : <Image
                style={{width: 50, height: 70, opacity: this.props.player1Display}}
                source={{uri: ''}}
              /> }
              <TouchableHighlight
                 style={styles.button6}
                 onPress={()=> {this.props.takeSeat(6)}}
                >
               <Text> {players[5]} </Text>
              </TouchableHighlight>
            </View>

          </View>
          <View style={{marginTop: 130}}>
            <TextInput
            style={{height: 5, borderColor: 'blue', borderWidth: 1, backgroundColor:'grey', width:'50%', marginTop:'11%',color:'white', marginLeft: '2%'}}
            multiline={true}
            numberOfLines={4}
            onChangeText={(text) => this.setState({text}) }
            value={this.state.text}
            />
            <TouchableOpacity
              style={styles.messageButton}
              onPress={() => {this.props.sendMessage(this.props.player,this.state.text)}}
              underlayColor='#fff'>
              <Text style={styles.submitText}>SEND</Text>
            </TouchableOpacity>
            <View style={styles.Messages}>
              <Messages />
            </View>
            <TouchableOpacity
              style={styles.leaveButton}
              // onPress={() => {this.props.sendMessage(this.props.player, this.state.text)}}
              underlayColor='#fff'>
              <Text style={styles.submitText,{marginTop:10,marginLeft:20}}>LEAVE</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
var styles = StyleSheet.create({
  Messages: {
    marginLeft: '70%',
    marginTop:'-6%',
    backgroundColor:'red',
    width: 100,
    borderRadius: 20,
    borderColor: '#fff',
  },
  leaveButton: {
    marginLeft: '87%',
    marginTop: '-6%',
    backgroundColor: '#1E6738',
    width: 80,
    height: 40,
    borderRadius: 20,

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
  submitText:{
      color: '#3939cc',
      textAlign: 'center',
      // paddingLeft: 10,
      // paddingRight: 10
  },
  background: {

    height: '100%',
    width: '100%',
    marginTop: '-3%',
    marginBottom: '7%',

  },
  button1: {
   alignItems: 'center',
   backgroundColor: '#DDDDDD',
   padding: 15,
   width: 70,
  //  marginLeft: '12%',
  //  marginTop: '7%',
   borderRadius: 100,
 },
   button2: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 15,
    width: 70,
    // marginLeft: '5%',
    // marginTop: '5%',
    borderRadius: 100,
  },
  button3: {
   alignItems: 'center',
   backgroundColor: '#DDDDDD',
   padding: 15,
   width: 70,
  //  marginLeft: '12%',
  //  marginTop: '5%',
   borderRadius: 100,
  },
  button4: {
   alignItems: 'center',
   backgroundColor: '#DDDDDD',
   padding: 15,
   width: 70,
  //  marginLeft: '80%',
  //  marginTop: '-7%',
   borderRadius: 100,
  },
  button5: {
   alignItems: 'center',
   backgroundColor: '#DDDDDD',
   padding: 15,
   width: 70,
  //  marginLeft: '85%',
  //  marginTop: '-20%',
   borderRadius: 100,
  },
  button6: {
   alignItems: 'center',
   backgroundColor: '#DDDDDD',
   padding: 15,
   width: 70,
  //  marginLeft: '80%',
  //  marginTop: '-18%',
   borderRadius: 100
  },
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
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  takeSeat,
  sendMessage,fetchCards,sendCard,gameReadyToPlay,sendCardToServer,evalWinner,
  shouldTimerUpdateFunc
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(gameRoom)
