import React, { Component } from 'react'
import {View, Text} from 'react-native'
import { connect } from 'react-redux'
import { NativeRouter, Route, Link, Redirect } from 'react-router-native'
const Dashboard = ({auth})=> {
  console.log('hello from dashboard');
  console.log("auth",auth);
  error = true
  return(
      <View>
        <Text>Hello</Text>
      </View>
  )
}
function mapStateToProps(state) {
  return {
    auth:state.auth

  }

}

export default connect(mapStateToProps)(Dashboard)
