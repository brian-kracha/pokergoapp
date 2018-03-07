import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import firebase from 'firebase'
import ReduxThunk from 'redux-thunk'
import reducers from './reducers'
import LoginForm from './components/LoginForm'
import Dashboard from './components/Dashboard'
import { NativeRouter, Route, Link } from 'react-router-native'
import Router from './Router'
class App extends Component {
  componentWillMount() {
    // make new web proj in firebase
    var config = {
    apiKey: "AIzaSyC94Mn8F6yWZ9ghbhPQk_URaL9FtLrUFTg",
    authDomain: "fir-boilerplate-e7d5f.firebaseapp.com",
    databaseURL: "https://fir-boilerplate-e7d5f.firebaseio.com",
    projectId: "fir-boilerplate-e7d5f",
    storageBucket: "",
    messagingSenderId: "54632576453"
  };
  firebase.initializeApp(config)
  console.log('hello');
  // console.log(firebase.initializeApp(config));
  }

  render() {
    console.disableYellowBox = true
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))
    return (
      <Provider store={ store }>
        <Router />
      </Provider>
    )
  }
}

export default App
