import React from 'react'
import {Text, View, TouchableOpacity} from 'react-native'
import {raise} from '../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
const Betting = ({raise}) => {
  return(
    <View>
      <View style ={{flexDirection:'column', paddingLeft:5}}>
        <TouchableOpacity
          onPress = {raise}
          style={{backgroundColor:'black',padding:5, width:45, height:25}}
          underlayColor='blue'>
          <Text style={{color:'white'}}>Raise</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{backgroundColor:'black',padding:5, marginTop: 1, width:45, height:25}}
          underlayColor='blue'>
          <Text style={{color:'white'}}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{backgroundColor:'black',padding:5,marginTop: 1, width:45, height:25}}
          underlayColor='blue'>
          <Text style={{color:'white'}}>Fold</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const mapDispatchToProps = dispatch => bindActionCreators({
  raise
}, dispatch)

export default connect(null, mapDispatchToProps)(Betting)
