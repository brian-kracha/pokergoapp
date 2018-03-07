import React, { Component } from 'react'
import {View, Text} from 'react-native'
import { connect } from 'react-redux'
const Table = ({auth})=> {
  // console.log("auth",auth);
  return(
    <View>
      <Text>Hello from table</Text>
    </View>
  )
}
function mapStateToProps(state) {
  return {
    auth: state.auth

  }

}

export default connect(mapStateToProps)(Table)
