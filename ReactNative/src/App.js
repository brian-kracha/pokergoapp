import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import firebase from 'firebase'
import ReduxThunk from 'redux-thunk'
import { NativeRouter, Route, Router, Link } from 'react-router-native'
// import history from "./history"
import reducers from './reducers'
// import LoginForm from './components/LoginForm'
import header from './components/Header'
import Dashboard from './components/Dashboard'
import Router from './Router'
class App extends Component {
  componentWillMount() {
    // make new web proj in firebase
    var config = {
     apiKey: "AIzaSyCKDkWCy04iN7MA2jXz-QIjtC8czvjkdJU",
     authDomain: "pokergoapp.firebaseapp.com",
     databaseURL: "https://pokergoapp.firebaseio.com",
     projectId: "pokergoapp",
     storageBucket: "",
     messagingSenderId: "756523341581"
<<<<<<< HEAD
   }
    firebase.initializeApp(config);
=======
   };
   firebase.initializeApp(config);
  console.log('hello');
  // console.log(firebase.initializeApp(config));
>>>>>>> 10dbb4cb0d1181f8e3a7a7184fd9db8d071d45d0
  }

  render() {
    console.disableYellowBox = true
    console.log('herer in app');
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))
    return (
      <Provider store={ store }>
<<<<<<< HEAD
          <Router />
          {/* <Dashboard /> */}
=======

      <View>
            <Dashboard/>

      </View>

>>>>>>> 10dbb4cb0d1181f8e3a7a7184fd9db8d071d45d0
      </Provider>
    )
  }
}

export default App
