import React from 'react'
import { connect } from 'react-redux'
import {Text, View, Button, Image } from 'react-native';
const CardsOnTable = ({cardsOntable}) => {
  return(
    <View style={{flexDirection: 'row'}}>
      <Image
        style={{width: 50, height: 70, padding: 5, justifyContent: 'center'}}
        source={{uri: `${cardsOntable[0].image}`}}
      />
      <Image
        style={{width: 50, height: 70, padding: 5, justifyContent: 'center'}}
        source={{uri: `${cardsOntable[1].image}`}}
      />
      <Image
        style={{width: 50, height: 70, padding: 5, justifyContent: 'center'}}
        source={{uri: `${cardsOntable[2].image}`}}
      />
      <Image
        style={{width: 50, height: 70, padding: 5, justifyContent: 'center'}}
        source={{uri: `${cardsOntable[3].image}`}}
      />
      <Image
        style={{width: 50, height: 70, padding: 5, justifyContent: 'center'}}
        source={{uri: `${cardsOntable[4].image}`}}
      />
    </View>
  )
}
function mapStateToProps(state) {
  return {
    cardsOntable: state.auth.cardsOntable
  }
}
export default connect(mapStateToProps)(CardsOnTable)
