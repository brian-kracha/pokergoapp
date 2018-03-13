import React from 'react';
import SocketIOClient from 'socket.io-client';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Text, View, ImageBackground, StyleSheet, TouchableHighlight, Card, CardSection, Input, Button, TextInput, Image } from 'react-native';
import {takeSeat,sendMessage, fetchCards,sendCard,gameReadyToPlay,sendCardToServer} from '../actions'
import Messages from './Messages'
import $ from "jquery";
class gameRoom extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      text: '',
    }
  }
  componentDidMount() {
    this.props.sendMessage()
  }
  render() {
    let activeTableNumbers = []
    let activeUserTableNumber = 0
    let cards = []
    this.props.assignCards.forEach(ele => {
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
    })
    return (
      <View>
        <ImageBackground
          source={require('../Images/Table.png')}
          style= { styles.background }>
          <View>
            <View style={{flexDirection: 'row', marginTop: '7%', marginLeft:'12%'}}>
              <TouchableHighlight
                 style={styles.button1}
                 onPress={()=>{ this.props.takeSeat(1)}}
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

              <View style={{flexDirection: 'row', marginTop: '5%', marginLeft: '5%'}}>
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

              <View style={{flexDirection: 'row', marginTop: '5%', marginLeft:'12%'}}>
                <TouchableHighlight
                   style={styles.button3}
                   onPress={()=>{this.props.takeSeat(3)}}
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
              <View style={{flexDirection: 'row', marginTop: '-12%', marginLeft:'60%'}}>
                {activeUserTableNumber == 4 && cards.length > 0 ? <Image
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

              <View style={{flexDirection: 'row', marginTop: '-25%', marginLeft: '65%'}}>
                {activeUserTableNumber == 5 && cards.length > 0 ? <Image
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

            <View style={{flexDirection: 'row', marginTop: '-25%', marginLeft: '60%'}}>
              {activeUserTableNumber == 6 && cards.length > 0 ? <Image
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
          <View style={{marginTop: 150}}>
            <TextInput
            style={{height: 40, borderColor: 'blue', borderWidth: 1}}
            onChangeText={(text) => this.setState({text}) }
            value={this.state.text}
            />
            <Button
              onPress={()=> {this.props.sendMessage(this.state.text)}}
              title="send"
              color="red"
              accessibilityLabel="Learn more about this purple button"
            />
            <Messages/>
          </View>
        </ImageBackground>
      </View>
    );
  }
}
var styles = StyleSheet.create({
  background: {
    height: '95%',
    width: '100%'
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
    isTopFifteenCardsReady: state.auth.isTopFifteenCardsReady,
    topFifteenCards: state.auth.topFifteenCards,
    isGameStarting: state.auth.isGameStarting,
    display: state.auth.display,
    player1Display: state.auth.player1Display,
    player2Display: state.auth.player2Display,
    player1Card: state.auth.player1Card,
    assignCards: state.auth.assignCards,
    player: state.auth.player,
    tableNumber: state.auth.tableNumber,
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  takeSeat,
  sendMessage,fetchCards,sendCard,gameReadyToPlay,sendCardToServer
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(gameRoom)
