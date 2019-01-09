import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View} from 'react-native';
import {connect} from 'react-redux'
class Messages extends Component {
  state = {
    modalVisible: false
  };
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  render() {
    return (<View style={{
        marginTop: '15%'
      }}>
      <Modal
        animationType="slide" transparent={false} visible={this.state.modalVisible} supportedOrientations={['landscape', 'portrait']}>
        <View>
          {
            this.props.message.map((ele, i) => {
              return (<Text key={i}>{ele}</Text>)
            })
          }
          <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}>
            <Text>Hide Modal</Text>
          </TouchableHighlight>
        </View>
      </Modal>
      <TouchableHighlight onPress={() => {
          this.setModalVisible(true);
        }}>
        <Text style={{
            textAlign: 'center',
            fontWeight: '900'
          }}>Messages</Text>
      </TouchableHighlight>
    </View>)
  }
}
function mapStateToProps(state) {
  return {message: state.auth.message}
}
export default connect(mapStateToProps)(Messages)
