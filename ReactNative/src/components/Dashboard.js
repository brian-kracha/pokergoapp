import React, { Component } from 'react'
import {View, Text} from 'react-native'
import { connect } from 'react-redux'

const Dashboard = ({auth})=> {
  console.log("auth",auth);
  return(
    <View>
      <Text>Hello</Text>
    </View>
  )
}
function mapStateToProps(state) {
  return {
    auth: state.auth

  }

}

export default connect(mapStateToProps)(Dashboard)
