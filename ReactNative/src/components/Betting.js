import React from 'react'
import {Text, View, TouchableOpacity} from 'react-native'
import {raise} from '../actions'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
class Betting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      totalCoins: props.totalCoins,
      coins: props.coins
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      totalCoins: nextProps.totalCoins,
      coins: nextProps.coins
    })
  }

  render() {

    return (<View>
      <View style={{flexDirection: 'row', paddingLeft: '38%', paddingTop:5}}>
        <Text style={{
            color: 'white',
            paddingRight: 10
          }}>{this.state.totalCoins}</Text>
        <TouchableOpacity onPress={raise} style={{
            backgroundColor: 'black',
            padding: 5,
            width: 65,
            height: 35
          }} underlayColor='blue'>
          <Text style={{
              color: 'white',
              textAlign: 'center'
            }}>Raise</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{
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
          }} underlayColor='blue'>
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
      </View>
    </View>)
  }
}
function mapStateToProps(state) {
  return {gameStatus: state.auth.gameStatus}
}
const mapDispatchToProps = dispatch => bindActionCreators({
  raise
}, dispatch)

export default connect(null, mapDispatchToProps)(Betting)
