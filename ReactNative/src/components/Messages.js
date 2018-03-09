import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View} from 'react-native';
import { connect } from 'react-redux'
class Messages extends Component {
  state = {
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={{marginTop: 22}}>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          supportedOrientations = {['landscape','portrait']}
          onRequestClose={() => {
            alert('Modal has been closed.');
          }}>
          <View
            style={{marginTop: 22}}>
            <View>
              {this.props.message.map((ele,i) => {
                return(
                  <Text key={i}>{ele}</Text>
                )
              })}
              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>
      </View>
    )
  }
}
function mapStateToProps(state) {
  return {
    message: state.auth.message,
  }
}
export default connect(mapStateToProps)(Messages)
