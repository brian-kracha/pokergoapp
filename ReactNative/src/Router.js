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
          <Scene key='table' component={Table} hideNavBar  />
        </Scene>
      </Scene>
    </Router>
  )
}
export default RouterComponent
