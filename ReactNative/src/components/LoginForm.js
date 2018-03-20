import React, { Component } from 'react'
import { Actions } from 'react-native-router-flux'

import { connect } from 'react-redux'
import { View, TextInput, Text, TouchableOpacity, Image, secureTextEntry, autoCorrect, autoCapitalize, ImageBackground} from 'react-native'
import { emailChanged, passwordChanged, loginUser, signUp } from '../actions/'
import SignUp from './SignUp'
class Login extends Component {
  constructor(props) {
    super(props)
  }

  onEmailChange(text) {
    this.props.emailChanged(text)
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text)
  }

  onButtonPress() {
    const { email, password } = this.props

    this.props.loginUser({ email, password })
  }

  renderError() {
    if (this.props.error) {
      return (
        <View>
          <Text style={ styles.errorTextStyle }>
            { this.props.error }
          </Text>
        </View>
      )
    }
  }

  renderButton() {
    return (
      <TouchableOpacity style={styles.loginButtonStyle} onPress={ this.onButtonPress.bind(this)}>
        <Text style={styles.loginTextStyles}>Login</Text>
      </TouchableOpacity>
    )
  }


  render() {
    const { viewStyles, textInputStyles, emailTextStyles, passwordTextStyles, loginTextStyles,
            submitTextStyles, loginButtonStyle, submitButtonStyle } = styles
            const account= "Don't have an account?"

    return (
      <View style={viewStyles}>
      <ImageBackground source={require('../Images/stainless-steel.jpg')}
      style={{height:'100%',width:'100%',justifyContent: 'center',
      alignItems: 'center',}}>
         <Image style={{alignSelf:'center'}} source={require('../images/logo2.png')}/>
        <Text style={emailTextStyles}>Email</Text>
        <TextInput
          style={textInputStyles}
          placeholder='example@email.com'
          autoCapitalize="none"
          autoCorrect={ false }
          onChangeText={ this.onEmailChange.bind(this) }
          value={ this.props.email}/>
        <Text style={passwordTextStyles}>Password</Text>
        <TextInput style={textInputStyles}
          secureTextEntry
          placeholder='password'
          autoCorrect={ false }
          autoCapitalize="none"
          onChangeText={ this.onPasswordChange.bind(this) }
          value={ this.props.password }
        />
        { this.renderError() }
        { this.renderButton()}
        <Text style={styles.text}>{account}</Text>
        <Text style={styles.text}>Create one for FREE</Text>
        <TouchableOpacity
          onPress={this.props.signUp}
          underlayColor='#fff'>

          <Text style={{color:'#982D38',fontSize: 30,fontWeight:'700', borderColor:'#982D37',borderRadius:2,borderWidth:2,backgroundColor:'white'}}>SIGN UP</Text>
        </TouchableOpacity>
        </ImageBackground>
      </View>
    )
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text:{
    fontWeight:'bold',
    color:'white',
    paddingTop:10
  },
  textInputStyles: {
    height: 60,
    alignSelf: 'stretch',
    backgroundColor:'white',
    marginTop: 10,
    marginLeft: 40,
    marginRight: 40,
    paddingLeft: 10,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#982D37'
  },
  emailTextStyles: {
    alignSelf: 'flex-start',
    marginTop: 50,
    marginLeft: 40,
    color: '#982D37',
    fontSize: 16,
    fontWeight: '600'
  },
  passwordTextStyles: {
    alignSelf: 'flex-start',
    marginTop: 20,
    marginLeft: 40,
    color: '#982D37',
    fontSize: 16,
    fontWeight: '600',
  },
  errorTextStyle: {
    color:'white',
    fontSize:15,
    shadowColor:'red',
    fontWeight: '700',
  },
  loginTextStyles: {
    alignSelf: 'center',
    color: '#982D37',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 15,
    paddingBottom: 15
  },
  submitTextStyles: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 15,
    paddingBottom: 15
  },
  loginButtonStyle: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 7,
    borderWidth: 1.5,
    borderColor: '#982D37',
    marginLeft: 40,
    marginRight: 40,
    marginTop: 50
  },
  submitButtonStyle: {
    alignSelf: 'stretch',
    backgroundColor: '#982D37',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#982D37',
    marginLeft: 40,
    marginRight: 40,
    marginTop: 10
  }
}

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth
  return { email, password, error, loading }
}

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser, signUp
})(Login)
