import React,{Component} from 'react';
// import SocketIOClient from 'socket.io-client';
import { connect } from 'react-redux'
import Card from './Card'
import CardSection from './CardSection'
import { bindActionCreators } from 'redux'
import {Text, View, ImageBackground, StyleSheet, hairlineWidth, TouchableHighlight, Input, Button, TextInput } from 'react-native';
 class Player extends Component{
   constructor(props){
     super(props)
     this.state={
       name:this.name,
       level:1,
       xp:0,
       limit:this.limit,
       games_won:false,
       image:'',
       ammount: 0,
       hand: [],
       chat: ''
     }
   }
   getLimit(limit){
     limit =this.limit
     limit = this.level * 150
     return limit
   }
   gainXP(games_won){
     for(var i =20; i<limit;i++){
       if(games_won === true){
         this.xp + 25
       }
       if(this.xp === this.limit){
         level+1
         this.xp ===0
       }
     }
     return this
   }
   render(){
     return(
       <View>
         <Card>
          <CardSection style={{bottomBorderWidth:StyleSheet.hairlineWidth}}>
            <Image style={{width:50, height:50}} source={require('../../Images/3 copy.png')}/>
            {this.name.value}
          </CardSection>
          <CardSection>
            {this.level.value}
            {this.hand.value}
          </CardSection>

         </Card>
       </View>
     )
   }

 }
