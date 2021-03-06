import React from 'react'
import {Text, View, TouchableOpacity} from 'react-native'
import {raise, draw, fold} from '../actions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import EmptyBetting from './EmptyBetting'
class Betting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      totalCoins: props.totalCoins,
      coins: props.coins,
      isYourTurn: props.isYourTurn
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      totalCoins: nextProps.totalCoins,
      coins: nextProps.coins,
      isYourTurn: nextProps.isYourTurn,
      // bigBlind: nextProps.gameStatus.bigBlind,
      // smallBlind: nextProps.gameStatus.smallBlind,
      round: nextProps.gameStatus.round,
      coinsDeal: nextProps.gameStatus.coinsDeal,
      activeTableNumbers: nextProps.activeTableNumbers,
      activeUserTableNumber: nextProps.activeUserTableNumber,
      cardsLength: nextProps.cardsLength,
      turn: nextProps.turn,
      activePlayer: nextProps.activePlayer,
      gameStatus: nextProps.gameStatus
    })
  }

  render() {
    return (
      <View style={{marginLeft:'-6%'}}>
      {(this.state.gameStatus && this.state.activeUserTableNumber === this.state.gameStatus.turnTable) ?
      <View style={{flexDirection: 'row'}}>
        <Text style={{color: 'white', paddingRight: 10,
        fontSize:20,width: 65 }}>{this.state.coinsDeal}</Text>
        <TouchableOpacity
          onPress={() => {this.props.raise(this.state.coinsDeal, this.state.gameStatus)}}
          style={{
            backgroundColor: 'black',
            padding: 5,
            width: 65,
            height: 35
          }}
          underlayColor='blue'>
          <Text style={{
              color: 'white',
              textAlign: 'center'
            }}>Raise</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {this.props.draw(this.state.coinsDeal,this.state.gameStatus)}}
          style={{
            backgroundColor: 'black',
            padding: 5,
            width: 65,
            height: 35,
            marginLeft: 2
          }} underlayColor='blue'>
          <Text style={{
              color: 'white',
              textAlign: 'center'
            }}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
            backgroundColor: 'black',
            padding: 5,
            width: 65,
            height: 35,
            marginLeft: 2
          }}
          onPress = {() => {this.props.fold()}}
          underlayColor='blue'>
          <Text style={{
              color: 'white',
              textAlign: 'center'
            }}>Fold</Text>
        </TouchableOpacity>
        <Text style={{
            color: 'white',
            paddingLeft: 10,
            fontSize:20,
            width: 65
          }}>{this.state.coins}
        </Text>
      </View> : <EmptyBetting />}

    </View>)
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  raise, draw, fold
}, dispatch)

export default connect(null, mapDispatchToProps)(Betting)
