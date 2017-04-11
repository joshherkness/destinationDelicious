import React, { Component } from 'react';
import { AppRegistry, Alert, StyleSheet, Text, View } from 'react-native';
import SignIn from './SignIn'
import SignUp from './SignUp'

class Authentication extends Component {
  constructor() {
    super()
    this.state = {
      signUp: false,
      loggedIn: false
    }
  }

  verifyAuthState = (verify) => {
    this.setState({
      signUp: verify
    })
  }

  checkSignIn() {
    if(this.state.signUp) {
      return (
        <View style={styles.container}>
          <Text style={ styles.welcome }>
          Welcome to Destination Delicious!
          </Text>
          <SignUp verifyAuthState={ this.verifyAuthState } />
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to Destination Delicious!
          </Text>
          <SignIn verifyAuthState={ this.verifyAuthState } />
        </View>
      )
    }
  }

  render() {
    return (
      this.checkSignIn()
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },

  welcome: {
    fontSize: 25,
    textAlign: 'center',
    marginBottom: 20,
  }
});

module.exports = Authentication
