<<<<<<< HEAD
import React from 'react'
import {Scene, Router} from 'react-native-router-flux'
import LoginForm from './components/LoginForm'
const RouterComponent = ()=> {
  return(
    <Router>
      <Scene key ='root'>
        <Scene key='login' component={LoginForm} title='please login' />
=======
import React,{ Component } from 'react'
import {Scene, Router, Actions} from 'react-native-router-flux'
import LoginForm from './components/LoginForm'
import Dashboard from './components/Dashboard'
import Table from './components/Table'
const RouterComponent = () => {
  return(
    <Router style={{paddingTop: 10}}>
      <Scene key='root' hideNavBar>
        <Scene key='auth'>
          <Scene key='login' component={LoginForm} title='please login' initial/>
        </Scene>
        <Scene key='main'>
          <Scene
            onRight={()=> Actions.table()}
            rightTitle='room'
            key='dashboard' component={Dashboard} title='Dashboard' initial/>
          <Scene key='table' component={Table} title='Table' />
        </Scene>
>>>>>>> bac6ccdd7d7fb4d6b8e2f5c964c355d86d5c9ae6
      </Scene>
    </Router>
  )
}
export default RouterComponent
