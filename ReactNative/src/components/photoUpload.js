import React from 'react'
import RNCloudinary from 'react-native-cloudinary-x'
import CryptoJS from 'crypto-js'
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native'
export default class RNCloud extends React.component{
  constructor(props){
    super(props)
    this.state={
      API_KEY:'',
      API_SECRET:'',
      uri:'',
      API_URL: 'https://api.cloudinary.com/v1_1/'
    }
  }
  // const API_URL = 'https://api.cloudinary.com/v1_1/'

  RNCloudinary.init(key, secret, cloud_name) {
    API_KEY = '124366633756443'
    API_SECRET = 'EMy4PHf5b4aovrYFZYvOOTQco0w'
    CLOUD_NAME = "quartertwo"
    UPLOAD_URL = this.state.API_URL + CLOUD_NAME +'/image/upload'
  }

  RNCloudinary.UploadImage (uri) {
    console.log(API_KEY, API_SECRET, CLOUD_NAME)
    let timestamp = (Date.now() / 1000 | 0).toString()
    let hash_string = 'timestamp=' + timestamp + API_SECRET
    let signature = CryptoJS.SHA1(hash_string).toString();

    let formdata = new FormData()
    formdata.append('file', {uri: uri, type: 'image/jpg', name: timestamp})
    formdata.append('timestamp', timestamp)
    formdata.append('api_key', API_KEY)
    formdata.append('signature', signature)

    const config = {
      method: 'POST',
      body: formdata
    }

    return fetch(UPLOAD_URL, config)
    .then(res => res.json())
    .then(res => {
      console.log(res)
      this.setState({uri:res.url})
      return res.url
    })
    .catch((err) => {
      console.log(err)
    })
  }
render(){

  return (
    <View>
      <TouchableOpacity onPress={()=> {this.UploadImage(uri)}} />
    </View>
  )
}
}
