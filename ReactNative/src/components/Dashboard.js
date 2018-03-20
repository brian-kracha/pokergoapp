import React, { Component } from 'react'
import {View, FlatList, Text} from 'react-native'
import FlatListTable from './common/List'
import { connect } from 'react-redux'

import { bindActionCreators } from 'redux'

import SideMenu from 'react-native-side-menu'
import Menu from './common/Menu'
const menu = <Menu />
class Dashboard extends Component{
  constructor(props) {
    super(props)
    this.toggle = this.toggle.bind(this)

    this.state = {
      isOpen: false,
    }
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
}
  updateMenuState(isOpen) {
    this.setState({isOpen});
  }


render(){


  return(
    <SideMenu
    menu={menu}
    isOpen={this.state.isOpen}
    onChange={isOpen => this.updateMenuState(isOpen)}
    >
      <View>
        <FlatListTable/>
    </View>
    </SideMenu>
  )
}

}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    user: state.auth.user
  }
}
const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)
