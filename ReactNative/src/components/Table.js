import React from 'react';
import SocketIOClient from 'socket.io-client';
import {Text, View, ImageBackground, StyleSheet, TouchableHighlight } from 'react-native';
let firstPlayer = true
let secondPlayer = true
let thirdPlayer = true
let fourthPlayer = true
let fifthPlayer = true
let sixthPlayer = true
export default class gameRoom extends React.Component {

  onPress() {
    console.log("here", this);
    if(this.style == 60 && firstPlayer == true) {
      this.socket = SocketIOClient('http://localhost:3000', {jsonp: false, transports: ['websocket']});
      firstPlayer = false
    }
    if(this.style == 61 && secondPlayer == true) {
      this.socket = SocketIOClient('http://localhost:3000', {jsonp: false, transports: ['websocket']});
      console.log(this)
      secondPlayer = false
    }
    if(this.style == 62 && thirdPlayer == true) {
      this.socket = SocketIOClient('http://localhost:3000', {jsonp: false, transports: ['websocket']});
      console.log(this)
      thirdPlayer = false
    }
    if(this.style == 63 && fourthPlayer == true) {
      this.socket = SocketIOClient('http://localhost:3000', {jsonp: false, transports: ['websocket']});
      console.log(this)
      fourthPlayer = false
    }
    if(this.style == 64 && fifthPlayer == true) {
      this.socket = SocketIOClient('http://localhost:3000', {jsonp: false, transports: ['websocket']});
      console.log(this)
      fifthPlayer = false
    }
    if(this.style == 65 && sixthPlayer == true) {
      this.socket = SocketIOClient('http://localhost:3000', {jsonp: false, transports: ['websocket']});
      console.log(this)
      sixthPlayer = false
    }
  }
  render() {
    return (
        <ImageBackground
          source={require('../images/Table.png')}
          style= { styles.background }>
          <View>
            <TouchableHighlight
               style={styles.button1}
               onPress={this.onPress}
              >
             <Text> Sit </Text>
            </TouchableHighlight>
            <TouchableHighlight
               style={styles.button2}
               onPress={this.onPress}
              >
             <Text> Sit </Text>
            </TouchableHighlight>
            <TouchableHighlight
               style={styles.button3}
               onPress={this.onPress}
              >
             <Text> Sit </Text>
            </TouchableHighlight>
            <TouchableHighlight
               style={styles.button4}
               onPress={this.onPress}
              >
             <Text> Sit </Text>
            </TouchableHighlight>
            <TouchableHighlight
               style={styles.button5}
               onPress={this.onPress}
              >
             <Text> Sit </Text>
            </TouchableHighlight>
            <TouchableHighlight
               style={styles.button6}
               onPress={this.onPress}
              >
             <Text> Sit </Text>
            </TouchableHighlight>
          </View>
        </ImageBackground>
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
   width: '10%',
   marginLeft: '12%',
   marginTop: '7%',
   borderRadius: 100,
 },
   button2: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 15,
    width: '10%',
    marginLeft: '5%',
    marginTop: '5%',
    borderRadius: 100
  },
  button3: {
   alignItems: 'center',
   backgroundColor: '#DDDDDD',
   padding: 15,
   width: '10%',
   marginLeft: '12%',
   marginTop: '5%',
   borderRadius: 100
  },
  button4: {
   alignItems: 'center',
   backgroundColor: '#DDDDDD',
   padding: 15,
   width: '10%',
   marginLeft: '80%',
   marginTop: '-7%',
   borderRadius: 100
  },
  button5: {
   alignItems: 'center',
   backgroundColor: '#DDDDDD',
   padding: 15,
   width: '10%',
   marginLeft: '85%',
   marginTop: '-20%',
   borderRadius: 100
  },
  button6: {
   alignItems: 'center',
   backgroundColor: '#DDDDDD',
   padding: 15,
   width: '10%',
   marginLeft: '80%',
   marginTop: '-18%',
   borderRadius: 100
  },
})
