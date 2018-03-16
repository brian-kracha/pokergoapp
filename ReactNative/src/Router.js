import React,{ Component } from 'react'
import {Scene, Router, Actions} from 'react-native-router-flux'
import LoginForm from './components/LoginForm'
import Dashboard from './components/Dashboard'
import Header from './components/Header'
import Table from './components/Table'
import SignUp from './components/SignUp'
import SocketIOClient from 'socket.io-client';
import {joinRoom} from './actions'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'


class RouterComponent extends React.Component {
  render() {
    return(
      <Router style={{paddingTop: 10}}>
        <Scene key='root' hideNavBar>
          <Scene key='auth'>
            <Scene key='login' component={LoginForm} title='please login' initial/>
            <Scene key='signUp' component={SignUp} title='please signUp'/>
          </Scene>

          <Scene key='main'>
            <Scene
              onRight={this.props.joinRoom}
              rightTitle='room'
              key='dashboard' component={Dashboard} title='Dashboard' initial/>


            <Scene key='table' component={Table} hideNavBar />

          </Scene>
        </Scene>
      </Router>
    )
  }

}
const mapDispatchToProps = dispatch => bindActionCreators({
  joinRoom,
  // header
}, dispatch)

export default connect(null, mapDispatchToProps)(RouterComponent)

// export default RouterComponent
