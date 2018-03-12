import React, { Component } from 'react'
import {View, FlatList, Text} from 'react-native'
import FlatListTable from './common/List'
import { connect } from 'react-redux'

const Dashboard = ({auth, message})=> {
  console.log("auth",auth);
  console.log(message);
  return(
    <View>
      <FlatListTable/>
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
