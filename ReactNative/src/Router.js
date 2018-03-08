import React,{ Component } from 'react'
import {Scene, Router, Actions} from 'react-native-router-flux'
import LoginForm from './components/LoginForm'
import Dashboard from './components/Dashboard'
import Table from './components/Table'
import SocketIOClient from 'socket.io-client';
import {joinRoom} from './actions'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'
const RouterComponent = ({joinRoom}) => {
  // let a  = true
  // function joinRoom() {
  //   console.log('in this room')
  //   var socket = SocketIOClient('http://localhost:3000', {jsonp: false, transports: ['websocket']});
  //   Actions.table()
  //   console.log(socket)
  // }
  return(
    <Router style={{paddingTop: 10}}>
      <Scene key='root' hideNavBar>
        <Scene key='auth'>
          <Scene key='login' component={LoginForm} title='please login' initial/>
        </Scene>
        <Scene key='main'>
          <Scene
            onRight={joinRoom}
            rightTitle='room'
            key='dashboard' component={Dashboard} title='Dashboard' initial/>

          <Scene key='table' component={Table} hideNavBar />

        </Scene>
      </Scene>
    </Router>
  )
}
const mapDispatchToProps = dispatch => bindActionCreators({
  joinRoom
}, dispatch)

export default connect(null, mapDispatchToProps)(RouterComponent)

// export default RouterComponent
