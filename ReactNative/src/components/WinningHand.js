import React from 'react'
import {View, Image} from 'react-native'
import { connect } from 'react-redux'
const WinningHand = ({winningCards}) => {
  console.log(Array.isArray(winningCards));
  console.log(winningCards);
  return(
    <View flexDirection= 'row'>
      <Image style={{
            width: 50,
            height: 70,
            padding: 5,
            alignContent: 'center'
          }} source={{
            uri: `${winningCards[0].image}`
          }}/>
      <Image style={{
                width: 50,
                height: 70,
                padding: 5,
                alignContent: 'center'
              }} source={{
                uri: `${winningCards[1].image}`
          }}/>
    </View>
  )
}
function mapStateToProps(state) {
  return {
    winningCards: state.auth.winningCards
  }
}

export default connect(mapStateToProps)(WinningHand)
