import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image, ImageBackground, secureTextEntry,autoCorrect, autoCapitalize} from 'react-native'
import { connect } from 'react-redux'
// import RNCloudinary from 'react-native-cloudinary'
import { firstNameChanged, lastNameChanged, addressChanged, emailChanged, passwordChanged, loginUser, signUpUser } from '../actions'


class SignUp extends Component {
  constructor(props) {
    super(props)
  }
  onFirstNameChanged(text) {
    console.log('text', text);
    this.props.firstNameChanged(text)
  }

  onLastNameChanged(text) {
    this.props.lastNameChanged(text)
  }

  onEmailChange(text) {
    this.props.emailChanged(text)
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text)
  }

  onButtonPress() {
    // const {first_name, last_name, email, password} = this.props
    // console.log('firstName',this.props.first_name);
    console.log('this.props.first_name', this.props.first_name);
    this.props.signUpUser(this.props.first_name, this.props.last_name, this.props.email, this.props.password)
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
      <TouchableOpacity style={styles.signUpButtonStyle} onPress={ this.onButtonPress.bind(this)}>
        <Text style={styles.signUpTextStyles}>Sign Up</Text>
      </TouchableOpacity>
    )
  }

  render() {
    const { viewStyles, textInputStyles, emailTextStyles, passwordTextStyles,
            signUpTextStyles, signUpButtonStyle } = styles;

    return (
      <View style={viewStyles}>
      <ImageBackground source={require('../Images/stainless-steel.jpg')}
      style={{height:'100%',width:'100%',justifyContent: 'center',
      alignItems: 'center',}}>
        <Text style={emailTextStyles}>First Name</Text>
        <TextInput
          style={textInputStyles}
          placeholder='John'
          autoCapitalize="none"
          autoCorrect={ false }
          onChangeText={ this.onFirstNameChanged.bind(this) }
          value={ this.props.first_name }/>

        <Text style={emailTextStyles}>Last Name</Text>
        <TextInput
          style={textInputStyles}
          placeholder='Doe'
          autoCapitalize="none"
          autoCorrect={ false }
          onChangeText={ this.onLastNameChanged.bind(this) }
          value={ this.props.last_name }/>

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
        {/* <Image source={this.state.uri}/> */}
        {/* <Button> Upload Avatar</Button> */}
        { this.renderError() }
        { this.renderButton()}
        </ImageBackground>
      </View>
    )
  }
}

const styles = {
  viewStyles: {
    flex: 1,
    backgroundColor:'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  textInputStyles: {
    height: 60,
    alignSelf: 'stretch',
    backgroundColor: 'white',
    marginTop: 1,
    marginLeft: 40,
    marginRight: 40,
    paddingLeft: 10,
    borderRadius: 5,
    borderWidth: 1.5,
    borderColor: '#982D37'
  },
  emailTextStyles: {
    alignSelf: 'flex-start',
    marginTop: 30,
    marginLeft: 40,
    color: '#982D37',
    fontSize: 16,
    fontWeight: '600'
  },
  passwordTextStyles: {
    alignSelf: 'flex-start',
    marginTop: 30,
    marginLeft: 40,
    color: '#982D37',
    fontSize: 16,
    fontWeight: '600',
  },
  signUpTextStyles: {
    alignSelf: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 15,
    paddingBottom: 15
  },
  signUpButtonStyle: {
    alignSelf: 'stretch',
    backgroundColor: '#982D37',
    borderRadius: 7,
    borderWidth: 1,
    borderColor: '#982D37',
    marginLeft: 40,
    marginRight: 40,
    marginTop: 30
  }
}

function mapStateToProps(state) {
  return {
    first_name : state.auth.first_name,
    last_name : state.auth.last_name,
    email : state.auth.email,
    password: state.auth.password
  }
}

export default connect(mapStateToProps, {
  firstNameChanged, lastNameChanged, emailChanged, passwordChanged, loginUser, signUpUser
})(SignUp)
