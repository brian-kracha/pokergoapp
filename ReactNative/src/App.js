import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import firebase from 'firebase'
import ReduxThunk from 'redux-thunk'
<<<<<<< HEAD
// import history from "./history"
=======
>>>>>>> 4cc827776099191f43613b55f65c94adfa329b43
import reducers from './reducers'
import LoginForm from './components/LoginForm'
// import header from './components/Header'
import Dashboard from './components/Dashboard'
import Messages from './components/Messages'
import Table from './components/Table'
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
