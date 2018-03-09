import React from 'react';
import SocketIOClient from 'socket.io-client';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Text, View, ImageBackground, StyleSheet, TouchableHighlight, Card, CardSection, Input, Button, TextInput } from 'react-native';
import {takeSeat1,takeSeat2,takeSeat3,takeSeat4,takeSeat5,takeSeat6,sendMessage} from '../actions'
import Messages from './Messages'
class gameRoom extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      text: ''
    }
  }
  render() {
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
          source={require('../images/Table.png')}
          style= { styles.background }>
          <View>
            <TouchableHighlight
               style={styles.button1}
               onPress={this.props.takeSeat1}
              >
             <Text> {player1} </Text>
            </TouchableHighlight>
            <TouchableHighlight
               style={styles.button2}
               onPress={this.props.takeSeat2}
              >
             <Text> {player2} </Text>
            </TouchableHighlight>
            <TouchableHighlight
               style={styles.button3}
               onPress={this.props.takeSeat3}
              >
             <Text> {player3} </Text>
            </TouchableHighlight>
            <TouchableHighlight
               style={styles.button4}
               onPress={this.props.takeSeat4}
              >
             <Text> {player4} </Text>
            </TouchableHighlight>
            <TouchableHighlight
               style={styles.button5}
               onPress={this.props.takeSeat5}
              >
             <Text> {player5} </Text>
            </TouchableHighlight>
            <TouchableHighlight
               style={styles.button6}
               onPress={this.props.takeSeat6}
              >
             <Text> {player6} </Text>
            </TouchableHighlight>
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
          </View>
          <Messages />
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
   width: '15%',
   marginLeft: '12%',
   marginTop: '7%',
   borderRadius: 100,
 },
   button2: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 15,
    width: '15%',
    marginLeft: '5%',
    marginTop: '5%',
    borderRadius: 100
  },
  button3: {
   alignItems: 'center',
   backgroundColor: '#DDDDDD',
   padding: 15,
   width: '15%',
   marginLeft: '12%',
   marginTop: '5%',
   borderRadius: 100
  },
  button4: {
   alignItems: 'center',
   backgroundColor: '#DDDDDD',
   padding: 15,
   width: '15%',
   marginLeft: '80%',
   marginTop: '-7%',
   borderRadius: 100
  },
  button5: {
   alignItems: 'center',
   backgroundColor: '#DDDDDD',
   padding: 15,
   width: '15%',
   marginLeft: '85%',
   marginTop: '-20%',
   borderRadius: 100
  },
  button6: {
   alignItems: 'center',
   backgroundColor: '#DDDDDD',
   padding: 15,
   width: '15%',
   marginLeft: '80%',
   marginTop: '-18%',
   borderRadius: 100
  },
})
function mapStateToProps(state) {
  return {
    socket: state.auth.socket,
    people: state.auth.people,
    text: state.auth.text,
    message: state.auth.message,
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  takeSeat1,takeSeat2,takeSeat3,takeSeat4,takeSeat5,takeSeat6,
  sendMessage,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(gameRoom)
