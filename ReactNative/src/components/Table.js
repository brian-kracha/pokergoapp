import React from 'react';
import SocketIOClient from 'socket.io-client';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Text, View, ImageBackground, StyleSheet, TouchableHighlight, Card, CardSection, Input, Button, TextInput } from 'react-native';
import {takeSeat,sendMessage} from '../actions'
class gameRoom extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      text: ''
    }
  }
  render() {
    console.log(this.props.sit)
    let message = ''
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
          <View style={{marginTop: 200}}>
            <TextInput
            style={{height: 40, borderColor: 'blue', borderWidth: 1,topPadding: 200}}
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
    text: state.auth.text,
    message: state.auth.message,
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  takeSeat,
  sendMessage
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(gameRoom)
