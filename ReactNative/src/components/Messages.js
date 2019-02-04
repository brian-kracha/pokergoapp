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
        animationType="slide" transparent={false} visible={this.state.modalVisible} supportedOrientations={['landscape', 'portrait']} presentationStyle= 'formSheet'>
        <View>
          {
            this.props.message.map((ele, i) => {
              return (<Text style={{fontSize:20, fontWeight:'500', color:'green', fontStyle:'oblique'}} key={i}>{ele}</Text>)
            })
          }

          <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible);
            }}  style={{alignSelf:'center',marginTop:'50%', position:'absolute'}}>
            <Text style={{fontSize:20, fontWeight:'900', color:'red', textAlign:'center'}}>CLOSE</Text>
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
