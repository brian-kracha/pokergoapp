import React, { Component } from 'react'
import {View, Text} from 'react-native'
import { connect } from 'react-redux'
import { NativeRouter, Route, Link } from 'react-router-native'
import  { Container, Header, Left, Body, Right, Button, Icon, Title } from "native-base"
const header = ()=>{
  return(

    <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Right>
        </Header>
      </Container>
      
  )
}

export default header
