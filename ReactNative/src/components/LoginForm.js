import React, { Component } from 'react'
import { Text, View,Image } from 'react-native'
// import { GoogleSignin } from 'react-native-google-signin'
import { connect } from 'react-redux'
import { emailChanged, passwordChanged, loginUser } from '../actions'
import { Card, CardSection, Input, Button, Spinner } from './common'

class LoginForm extends Component {
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
    if (this.props.loading) {
      return <Spinner size="large" />
    }
    return (
      <Button onPress={ this.onButtonPress.bind(this) }>
        Login
      </Button>
    )
  }


  render() {
    return (
      <View style={{paddingTop: 80,backgroundColor:'grey',paddingBottom:-85}}   >

      <Image source={require('./images/chip.GIF')}/>
      <Card>
      <CardSection>
      <Image style={{width:275,height:45,alignContent:'stretch'}} source={require('../images/Tittle.png')}/>
      </CardSection>
        <CardSection>
          <Input
            label="Email"
            placeholder="email@email.com"
            onChangeText={ this.onEmailChange.bind(this) }
            value={ this.props.email }
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            label="Password"
            placeholder="password"
            onChangeText={ this.onPasswordChange.bind(this) }
            value={ this.props.password }
          />
        </CardSection>

        { this.renderError() }

        <CardSection>
          { this.renderButton() }
        </CardSection>

      </Card>
    </View>
    )
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red'
  }
}

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth
  return { email, password, error, loading }
}

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser
})(LoginForm)
