import React, { Component } from 'react'
import { Text, View, DeviceEventEmitter } from 'react-native'
// import RNCloudinary from 'react-native-cloudinary'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import firebase from 'firebase'
import ReduxThunk from 'redux-thunk'
// import history from "./history"
import reducers from './reducers'
import LoginForm from './components/LoginForm'

import Dashboard from './components/Dashboard'
import Messages from './components/Messages'
import Table from './components/Table'
import Router from './Router'
class App extends Component {
  componentWillMount() {
    // make new web proj in firebase
    var configs = {
     apiKey: "AIzaSyCKDkWCy04iN7MA2jXz-QIjtC8czvjkdJU",
     authDomain: "pokergoapp.firebaseapp.com",
     databaseURL: "https://pokergoapp.firebaseio.com",
     projectId: "pokergoapp",
     storageBucket: "",
     messagingSenderId: "756523341581"
   }

    firebase.initializeApp(configs);
  }


  render() {
    console.disableYellowBox = true
    console.log('herer in app');
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))
    return (
      <Provider store={ store }>
          <Router />
          {/* <Dashboard /> */}
          {/* {<Table />} */}
        {/* {<Messages />} */}
      </Provider>
    )
  }
}

export default App
