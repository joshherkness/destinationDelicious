import React, { Component } from 'react';
import { Alert, AppRegistry, Navigator, StyleSheet, Button, Text, TextInput, View } from 'react-native';
import * as firebase from 'firebase';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
  }

  attemptLogin = () => {
    console.log(this.props)
    let email = this.state.username
    let pass = this.state.password
    email.toLowerCase()
    pass.toLowerCase()
    firebase.auth().signInWithEmailAndPassword(email, pass)
    .then(function() {
      Alert.alert("success")
    })
    .catch(function(error) {
      let errorCode = error.code
      let errorMessage = error.message;
      if(errorCode === 'auth/weak-password') {
        Alert.alert('The password is too weak')
      } else {
        Alert.alert(errorMessage)
      }
      console.log(error)
    }
   )
  }

  goToSignIn = () => {
    this.props.verifyAuthState(true)
  }

  render() {
    return (
      <View style={ styles.container }>
        <TextInput keyboardType='email-address' underlineColorAndroid='transparent' autoCapitalize='none' style={ styles.email } value={ this.state.username } placeholder="Email" onChangeText={ (username) => this.setState({username}) } />
        <TextInput style={ styles.password } value={ this.state.password }  placeholder="Password" onChangeText={ (password) => this.setState({password}) } secureTextEntry={ true }/>
        <Button onPress={ this.attemptLogin } title="Sign In" color="#55acee"/>
        <View style={{ flexDirection: 'row' }}>
          <Text style={ styles.greyFont }>Don&#39;t have an account?
            <Text onPress={ this.goToSignIn } style={ styles.yellowFont }> Sign Up</Text>
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
     height: 300,
     width: 280,
     flexDirection: 'column',
     alignItems: 'center',
     paddingTop: 5
  },

  email: {
    alignSelf: 'stretch',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 3,
    height: 40,
    marginBottom: 10,
    paddingLeft: 10
  },

  password: {
    alignSelf: 'stretch',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 3,
    height: 40,
    marginBottom: 10,
    paddingLeft: 10
  },

  yellowFont: {
    color: "#55acee",
    fontWeight: 'bold'
  },

  greyFont: {
    marginTop: 10,
    height: 20,
    color: '#D8D8D8'
  }
});

module.exports = SignIn
