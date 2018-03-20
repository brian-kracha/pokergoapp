import React, {Component} from 'react'
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  TouchableOpacity
} from 'react-native';
// import {mapStateToProps,first_name,last_name} from '../Dashboard'
import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux'
import {state, signUpUser} from '../../reducers/AuthReducer'
const window = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';
const styles = StyleSheet.create({
  menu: {
    marginTop:20,
    flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: 'gray',
    padding: 20,
  },
  avatarContainer: {
    marginBottom: 20,
    marginTop: 20,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    flex: 1,
  },
  name: {
    position: 'absolute',
    left: 70,
    top: 20,
  },
  item: {
    fontSize: 14,
    fontWeight: '300',
    paddingTop: 5,
  },
});
 class Menu extends Component {
   render() {
   console.log('this.props >>>', this.props);
  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={{ uri }}
        />
        <Text style={styles.name}>{this.props.first_name} {this.props.last_name}</Text>
      </View>
      <Text
        style={styles.item}
      >
        About
      </Text>
      <Text
        style={styles.item}
      >
        Contacts
      </Text>

      <Text
        style={styles.item}
      >
        Tables
      </Text>
    </ScrollView>
  );
}
}
// function mapStateToProps(state) {
//   return {
//     auth: state.auth,
//     user: state.auth.user
//   }
// }
// const mapDispatchToProps = dispatch => bindActionCreators({
//
// }, dispatch)

const mapStateToProps = ({ body }) => {
  const { first_name, last_name } = body
  console.log('first, last', first_name, last_name);
  return { first_name, last_name }
}

export default connect(mapStateToProps,{
  state,
  signUpUser
})(Menu)
