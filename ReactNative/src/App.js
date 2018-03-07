import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import firebase from 'firebase'
import ReduxThunk from 'redux-thunk'
import reducers from './reducers'
import LoginForm from './components/LoginForm'
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
   }
    firebase.initializeApp(config);
<<<<<<< HEAD
    console.log('hello');
  // console.log(firebase.initializeApp(config));
=======
>>>>>>> bac6ccdd7d7fb4d6b8e2f5c964c355d86d5c9ae6
  }

  render() {
    console.disableYellowBox = true
    console.log('herer in app');
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk))
    return (
      <Provider store={ store }>
          <Router />
          {/* <Dashboard /> */}
      </Provider>
    )
  }
}

export default App
