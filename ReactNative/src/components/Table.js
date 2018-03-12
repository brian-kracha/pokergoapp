import React from 'react';
import SocketIOClient from 'socket.io-client';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Text, View, ImageBackground, StyleSheet, TouchableHighlight, Card, CardSection, Input, Button, TextInput, Image } from 'react-native';
import {takeSeat1,takeSeat2,takeSeat3,takeSeat4,takeSeat5,takeSeat6,sendMessage, fetchCards,sendCard,gameReadyToPlay,sendCardToServer} from '../actions'
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
  startGame = () => {
    this.props.fetchCards()
  }
  render() {
    console.log('dispaly', this.props.display);
    if(this.props.count >= 2 && this.props.round == true) {
      this.startGame()
    }
    if(this.props.cardsReady == true) {
      this.props.sendCard(this.props.cards)
    }
    if(this.props.isTopFifteenCardsReady == true) {
      this.props.gameReadyToPlay(this.props.topFifteenCards, this.props.count)
    }
    if(this.props.isGameStarting == true) {
      console.log('we are ready to go')
      console.log(this.props.topFifteenCards)
      this.props.sendCardToServer(this.props.topFifteenCards)
    }
    let player1 = 'sit'
    let player2 = 'sit'
    let player3 = 'sit'
    let player4 = 'sit'
    let player5 = 'sit'
    let player6 = 'sit'

    // if(this.props.people[0]) {
    //   console.log('in here')
    // }

    this.props.people[0] ? player1 = this.props.people[0] : console.log('out here')
    this.props.people[1] ? player2 = this.props.people[1] : console.log('out here')
    this.props.people[2] ? player3 = this.props.people[2] : console.log('out here')
    this.props.people[3] ? player4 = this.props.people[3] : console.log('out here')
    this.props.people[4] ? player5 = this.props.people[4] : console.log('out here')
    this.props.people[5] ? player6 = this.props.people[5] : console.log('out here')
    return (
      <View>
        <ImageBackground
          source={require('../Images/Table.png')}
          style= { styles.background }>
          <View>
            <View style={{flexDirection: 'row', marginTop: '7%', marginLeft:'12%'}}>
              <TouchableHighlight
                 style={styles.button1}
                 onPress={this.props.takeSeat1}
                >
               <Text> {player1} </Text>
              </TouchableHighlight>
                <Image
                  style={{width: 30, height: 50, opacity: this.props.display}}
                  source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                />
                <Image
                  style={{width: 30, height: 50, opacity: this.props.display}}
                  source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                />
              </View>

              <View style={{flexDirection: 'row', marginTop: '5%', marginLeft:'5%'}}>
                <TouchableHighlight
                   style={styles.button2}
                   onPress={this.props.takeSeat2}
                  >
                 <Text> {player2} </Text>
                </TouchableHighlight>
                  <Image
                    style={{width: 30, height: 50, opacity: this.props.display}}
                     source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                   />
                   <Image
                     style={{width: 30, height: 50, opacity: this.props.display}}
                      source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                    />
              </View>

              <View style={{flexDirection: 'row', marginTop: '5%', marginLeft:'12%'}}>
                <TouchableHighlight
                   style={styles.button3}
                   onPress={this.props.takeSeat3}
                  >
                 <Text> {player3} </Text>

                </TouchableHighlight>
                  <Image
                    style={{width: 30, height: 50, opacity: this.props.display}}
                     source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                   />
                   <Image
                     style={{width: 30, height: 50, opacity: this.props.display}}
                      source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                    />
              </View>
              <View style={{flexDirection: 'row', marginTop: '-7%', marginLeft:'70%'}}>
                  <Image
                    style={{width: 30, height: 50, opacity: this.props.display}}
                     source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                   />
                   <Image
                     style={{width: 30, height: 50, opacity: this.props.display}}
                      source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                    />
                <TouchableHighlight
                   style={styles.button4}
                   onPress={this.props.takeSeat4}
                  >
                 <Text> {player4} </Text>
                </TouchableHighlight>
              </View>

              <View style={{flexDirection: 'row', marginTop: '-20%', marginLeft:'75%'}}>
                  <Image
                    style={{width: 30, height: 50, opacity: this.props.display}}
                     source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                   />
                   <Image
                     style={{width: 30, height: 50, opacity: this.props.display}}
                      source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                    />
                <TouchableHighlight
                   style={styles.button5}
                   onPress={this.props.takeSeat5}
                  >
                 <Text> {player5} </Text>
                </TouchableHighlight>
              </View>

            <View style={{flexDirection: 'row', marginTop: '-20%', marginLeft: '70%'}}>
                <Image
                  style={{width: 30, height: 50, opacity: this.props.display}}
                   source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                 />
                 <Image
                   style={{width: 30, height: 50, opacity: this.props.display}}
                    source={{uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'}}
                  />
              <TouchableHighlight
                 style={styles.button6}
                 onPress={this.props.takeSeat6}
                >
               <Text> {player6} </Text>
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
   width: 100,
  //  marginLeft: '12%',
  //  marginTop: '7%',
   borderRadius: 100,
 },
   button2: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 15,
    width: 100,
    // marginLeft: '5%',
    // marginTop: '5%',
    borderRadius: 100
  },
  button3: {
   alignItems: 'center',
   backgroundColor: '#DDDDDD',
   padding: 15,
   width: 100,
  //  marginLeft: '12%',
  //  marginTop: '5%',
   borderRadius: 100
  },
  button4: {
   alignItems: 'center',
   backgroundColor: '#DDDDDD',
   padding: 15,
   width: 100,
  //  marginLeft: '80%',
  //  marginTop: '-7%',
   borderRadius: 100
  },
  button5: {
   alignItems: 'center',
   backgroundColor: '#DDDDDD',
   padding: 15,
   width: 100,
  //  marginLeft: '85%',
  //  marginTop: '-20%',
   borderRadius: 100
  },
  button6: {
   alignItems: 'center',
   backgroundColor: '#DDDDDD',
   padding: 15,
   width: 100,
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
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  takeSeat1,takeSeat2,takeSeat3,takeSeat4,takeSeat5,takeSeat6,
  sendMessage,fetchCards,sendCard,gameReadyToPlay,sendCardToServer
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(gameRoom)
