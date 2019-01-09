import React from 'react'
import {View, Image} from 'react-native'
import {connect} from 'react-redux'
const WinnerCardsOnTable = ({winningCards}) => {
  console.log(Array.isArray(winningCards));
  console.log(winningCards);
  return (<View flexDirection='row'>
    {winningCards.map((ele,i)=> {
      if(i > 1){
        return(
          <Image style={{
            width: 50,
            height: 70,
            padding: 5,
            alignContent: 'center'
          }} source={{
            uri: `${ele.image}`
          }}/>
        )
      }
    })}
    {/* <Image style={{
        width: 50,
        height: 70,
        padding: 5,
        alignContent: 'center'
      }} source={{
        uri: `${winningCards[2].image}`
      }}/>
    <Image style={{
        width: 50,
        height: 70,
        padding: 5,
        alignContent: 'center'
      }} source={{
        uri: `${winningCards[3].image}`
      }}/>
    <Image style={{
        width: 50,
        height: 70,
        padding: 5,
        alignContent: 'center'
      }} source={{
        uri: `${winningCards[4].image}`
      }}/><Image style={{
      width: 50,
      height: 70,
      padding: 5,
      alignContent: 'center'
    }} source={{
      uri: `${winningCards[5].image}`
    }}/><Image style={{
      width: 50,
      height: 70,
      padding: 5,
      alignContent: 'center'
    }} source={{
      uri: `${winningCards[6].image}`
    }}/> */}
  </View>)
}
function mapStateToProps(state) {
  return {winningCards: state.auth.winningCards}
}

export default connect(mapStateToProps)(WinnerCardsOnTable)
