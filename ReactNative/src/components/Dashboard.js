import React, { Component } from 'react'
import {View, Text} from 'react-native'
import { connect } from 'react-redux'

const Dashboard = ({auth, message})=> {
  console.log("auth",auth);
  console.log(message);
  return(
    <View>
      <Text>Hello</Text>
    </View>
  )
}
function mapStateToProps(state) {
  return {
    auth: state.auth,
    message: state.auth.message
  }

}

export default connect(mapStateToProps)(Dashboard)
