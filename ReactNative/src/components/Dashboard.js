import React, { Component } from 'react'
import {View, Text} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
// class gameRoom extends React.Component
import {takeSeat1,takeSeat2,takeSeat3,takeSeat4,takeSeat5,takeSeat6,sendMessage} from '../actions'
class Dashboard extends React.Component{
  render() {
    return(
      <View>
        <Text>Hello</Text>
      </View>
    )
  }
}
// const Dashboard = ({auth, message})=> {
//   console.log("auth",auth);
//   console.log(message);
//   return(
//     <View>
//       <Text>Hello</Text>
//     </View>
//   )
// }
function mapStateToProps(state) {
  return {
    auth: state.auth,
    message: state.auth.message
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  takeSeat1,takeSeat2,takeSeat3,takeSeat4,takeSeat5,takeSeat6,
  sendMessage,
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
