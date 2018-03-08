import React from 'react';
import SocketIOClient from 'socket.io-client';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Text, View, ImageBackground, StyleSheet, TouchableHighlight } from 'react-native';
import {takeSeat} from '../actions'
const gameRoom = ({socket,sit,takeSeat})=> {
  console.log(sit)
  // onPress = ()=> {
  //   console.log('seat taken')
  //   console.log(socket);brian@badass.com
  //   socket.emit('from client side', 'taken')
    // socket.on('from server', function() {
    //
    // })
  // }
    return (
        <ImageBackground
          source={require('../Images/images.jpeg')}
          style= { styles.background }>
          <View>
            <TouchableHighlight
               style={styles.button1}
               onPress={takeSeat}
              >
             <Text> {sit} </Text>
            </TouchableHighlight>
            <TouchableHighlight
               style={styles.button2}
               onPress={takeSeat}
              >
             <Text> {sit} </Text>
            </TouchableHighlight>
            <TouchableHighlight
               style={styles.button3}
               onPress={takeSeat}
              >
             <Text> {sit} </Text>
            </TouchableHighlight>
            <TouchableHighlight
               style={styles.button4}
               onPress={takeSeat}
              >
             <Text> {sit} </Text>
            </TouchableHighlight>
            <TouchableHighlight
               style={styles.button5}
               onPress={takeSeat}
              >
             <Text> {sit} </Text>
            </TouchableHighlight>
            <TouchableHighlight
               style={styles.button6}
               onPress={takeSeat}
              >
             <Text> {sit} </Text>
            </TouchableHighlight>
          </View>
        </ImageBackground>
    );
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
function mapStateToProps(state) {
  return {
    socket: state.auth.socket,
    sit: state.auth.sit,
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  takeSeat
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(gameRoom)
