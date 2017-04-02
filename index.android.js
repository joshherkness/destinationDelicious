/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, Alert, StyleSheet, Text, View } from 'react-native';
import * as firebase from 'firebase';
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'

//Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCdndiS6rlCzlORIn5oQ4m5oPL9jsV0AhE",
  authDomain: "destination-delicious.firebaseapp.com",
  databaseURL: "https://destination-delicious.firebaseio.com",
  projectId: "destination-delicious",
  storageBucket: "destination-delicious.appspot.com",
 messagingSenderId: "26242783843"
}

const firebaseApp = firebase.initializeApp(firebaseConfig)

export default class destinationDelicious extends Component {
  constructor() {
    super()
    this.state = {
      signUp: false
    }
  }

  verifyAuthState = (verify) => {
    this.setState({
      signUp: verify
    })
  }

  checkSignIn() {
    if(this.state.signUp === true) {
      return (
        <View style={styles.container}>
          <Text style={ styles.welcome }>
          Welcome to Destination Delicious!
          </Text>
          <SignUp firebase={ firebaseApp } verifyAuthState={ this.verifyAuthState } />
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>
            Welcome to Destination Delicious!
          </Text>
          <SignIn firebase={ firebaseApp } verifyAuthState={ this.verifyAuthState } />
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
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});

AppRegistry.registerComponent('destinationDelicious', () => destinationDelicious);
