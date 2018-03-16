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
      bigBlind: nextProps.gameStatus.bigBlind,
      smallBlind: nextProps.gameStatus.smallBlind,
      round: nextProps.gameStatus.round,
      coinsDeal: nextProps.gameStatus.coinsDeal,
      activeTableNumbers: nextProps.activeTableNumbers,
      activeUserTableNumber: nextProps.activeUserTableNumber,
      cardsLength: nextProps.cardsLength,
      turn: nextProps.turn,
      activePlayer: nextProps.activePlayer,
    })
  }

  render() {
    console.log('turn', this.state.turn);
    console.log('activePlayer', this.state.activePlayer);
    console.log('activePlayer', this.state.activeUserTableNumber);
    return (
      <View>
      {this.state.turn == this.state.activeUserTableNumber && this.state.cardsLength > 0 ?
      <View style={{flexDirection: 'row', paddingLeft: '38%', paddingTop:5}}>
        <Text style={{color:'white', paddingRight:10}}>{this.state.coinsDeal}</Text>
        <Text style={{
            color: 'white',
            paddingRight: 10
          }}>{this.state.totalCoins}</Text>
        <TouchableOpacity
          onPress={() => {this.props.raise(this.state.coinsDeal, this.state.activeTableNumbers)}}
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
          onPress={() => {this.props.draw(this.state.coinsDeal)}}
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
            paddingLeft: 10
          }}>{this.state.coins}
        </Text>
      </View> : <EmptyBetting />}
    </View>)
  }
}
function mapStateToProps(state) {
  return {
    gameStatus: state.auth.gameStatus
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({
  raise, draw, fold
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Betting)
