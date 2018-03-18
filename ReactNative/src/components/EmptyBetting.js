import React from 'react'
import {Text, View, TouchableOpacity} from 'react-native'
const EmptyBetting = () => {
  return(
    <View style={{flexDirection: 'row', paddingLeft: '38%', paddingTop:'-12%'}}>
      <Text style={{color:'white', paddingRight:10}}></Text>
      <Text style={{
          color: 'white',
          paddingRight: 10
        }}></Text>
      <TouchableOpacity style= {{
          padding: 5,
          width: 65,
          height: 35
        }}
        underlayColor='blue'>
        <Text style={{
            color: 'white',
            textAlign: 'center'
          }}></Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          padding: 5,
          width: 65,
          height: 35,
          marginLeft: 2
        }} underlayColor='blue'>
        <Text style={{
            color: 'white',
            textAlign: 'center'
          }}></Text>
      </TouchableOpacity>
      <TouchableOpacity style={{
          padding: 5,
          width: 65,
          height: 35,
          marginLeft: 2
        }}
        underlayColor='blue'>
        <Text style={{
            color: 'white',
            textAlign: 'center'
          }}></Text>
      </TouchableOpacity>
      <Text style={{
          color: 'white',
          paddingLeft: 10
        }}>
      </Text>
    </View>
  )
}

export default EmptyBetting
