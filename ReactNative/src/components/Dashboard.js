import React, { Component } from 'react'
import { connect } from 'react-redux'
<<<<<<< HEAD
import { NativeRouter, Route, Link, Redirect } from 'react-router-native'
=======
// import {View, Text} from 'react-native'
import { NativeRouter, Route, Link } from 'react-router-native'
// import {Header} from './Header'
import  { Container, Header, Left, Body, Right, Button, Icon, Title } from "native-base"

>>>>>>> 10dbb4cb0d1181f8e3a7a7184fd9db8d071d45d0
const Dashboard = ({auth})=> {
  console.log('hello from dashboard');
  console.log("auth",auth);
<<<<<<< HEAD
  error = true
  return(
      <View>
        <Text>Hello</Text>
      </View>
=======

  return(
    <Container>
        <Header>
          <Left>
            <Button transparent>
            {  /*<Icon name='arrow-back' />*/}
            </Button>
          </Left>
          <Body>
            <Title>Fucking TiGhT</Title>
          </Body>
          <Right>
            <Button transparent>
            {  /*<Icon name='menu' />*/}
            </Button>
          </Right>
        </Header>
      </Container>





>>>>>>> 10dbb4cb0d1181f8e3a7a7184fd9db8d071d45d0
  )

}
function mapStateToProps(state) {
  return {
    auth: state.auth

  }

}

export default connect(mapStateToProps)(Dashboard)
