import React from 'react'
import {Text, View, TouchableOpacity} from 'react-native'
import {raise} from '../actions'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
const Betting = ({raise}) => {
  return(
    <View>
      <View style ={{flexDirection:'row', paddingLeft:'38%', paddingTop:5}}>
        <TouchableOpacity
          onPress = {raise}
          style={{backgroundColor:'black',padding:5, width:65, height:35}}
          underlayColor='blue'>
          <Text style={{color:'white',textAlign:'center'}}>Raise</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{backgroundColor:'black',padding:5, width:65, height:35, marginLeft:2}}
          underlayColor='blue'>
          <Text style={{color:'white',textAlign:'center'}}>Call</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{backgroundColor:'black',padding:5, width:65, height:35, marginLeft:2}}
          underlayColor='blue'>
          <Text style={{color:'white',textAlign:'center'}}>Fold</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const mapDispatchToProps = dispatch => bindActionCreators({
  raise
}, dispatch)

export default connect(null, mapDispatchToProps)(Betting)
