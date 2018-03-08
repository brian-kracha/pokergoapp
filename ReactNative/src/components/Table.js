import React, {Component} from 'react';
import SocketIOClient from 'socket.io-client';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Text, View, ImageBackground, StyleSheet, TouchableHighlight, Card, CardSection, Input, Button, TextInput } from 'react-native';
import {takeSeat, sendMessage,text} from '../actions'

class gameRoom extends React.Component{

  constructor(props){
    super(props)
      this.state={
        text:''


      }


  }


  // onPress = ()=> {
  //   console.log('seat taken')
  //   console.log(socket);brian@badass.com
  //   socket.emit('from client side', 'taken')
    // socket.on('from server', function() {
    //
    // })
  // }
  render(){
    // let message = ""
  // const sendText=(event)=>{
  //   console.log('text',text);
  //   this.setState({event.target.text})
  //
  //   console.log('message',message);
  // }
    return (
      <View>
        <ImageBackground
          source={require('../images/Table.png')}
          style= { styles.background }>
          <View>
            <TouchableHighlight
               style={styles.button1}
               onPress={this.props.takeSeat}
              >
             <Text> {this.props.sit} </Text>
            </TouchableHighlight>
            <TouchableHighlight
               style={styles.button2}
               onPress={this.props.takeSeat}
              >
             <Text> {this.props.sit} </Text>
            </TouchableHighlight>
            <TouchableHighlight
               style={styles.button3}
               onPress={this.props.takeSeat}
              >
             <Text> {this.props.sit} </Text>
            </TouchableHighlight>
            <TouchableHighlight
               style={styles.button4}
               onPress={this.props.takeSeat}
              >
             <Text> {this.props.sit} </Text>
            </TouchableHighlight>
            <TouchableHighlight
               style={styles.button5}
               onPress={this.props.takeSeat}
              >
             <Text> {this.props.sit} </Text>
            </TouchableHighlight>
            <TouchableHighlight
               style={styles.button6}
               onPress={this.props.takeSeat}
              >
             <Text> {this.props.sit} </Text>
            </TouchableHighlight>
          </View>
          <TextInput
          value ={this.state.text}
          onChangeText = {(text)=>this.setState({text})}
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          />
          <Button
            onPress ={()=>{this.props.sendMessage(this.state.text)}}
            title="send"
            color="red"
            accessibilityLabel="Learn more about this purple button"
          />
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
    text: state.auth.text
  }

}

const mapDispatchToProps = dispatch => bindActionCreators({
  takeSeat,sendMessage,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(gameRoom)
