import React, { Component } from 'react'
import { connect } from 'react-redux'
// import {View, Text} from 'react-native'
import { NativeRouter, Route, Link } from 'react-router-native'
// import {Header} from './Header'
import  { Container, Header, Left, Body, Right, Button, Icon, Title } from "native-base"

const Dashboard = ({auth})=> {
  console.log("auth",auth);

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





  )

}
function mapStateToProps(state) {
  return {
    auth:state.auth

  }

}

export default connect(mapStateToProps)(Dashboard)
