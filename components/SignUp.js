import React, { Component } from 'react';
import { Alert, AppRegistry, Button, Text, TextInput, View } from 'react-native';

class SignUp extends Component {
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
    this.props.firebase.auth().createUserWithEmailAndPassword(email, pass)
    .then(function() {
      Alert.alert("succes")
    })
    .catch(function(error) {
      let errorCode = error.code
      let errorMessage = error.message;
      if(Object.is(errorCode, 'auth/weak-password')) {
        Alert.alert('The password is too weak')
      } else {
        Alert.alert(errorMessage)
      }
      console.log(error)
    }
   )
  }

  goToSignUp = () => {
    this.props.verifyAuthState(false)
  }

  render() {
    return (
      <View style={{ height: 300, width: 200, flexDirection: 'column', paddingTop: 5 }}>
        <TextInput autoCapitalize='none' style={{height: 25, borderColor: '#E0E0E0', borderWidth: 1, borderRadius: 2, marginBottom: 20, textAlign: 'center' }} value={ this.state.username } placeholder="Email" onChangeText={ (username) => this.setState({username}) } />
        <TextInput style={{height: 25, borderColor: '#E0E0E0', borderWidth: 1, borderRadius: 2, textAlign: 'center' }} value={ this.state.password }  placeholder="Password" onChangeText={ (password) => this.setState({password}) } secureTextEntry={ true }/>
        <Button onPress={ this.attemptLogin } title="Sign Up" color="#FDD835" accessibilityLabel="Log in to destination delicious" />
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ marginTop: 20, width: 215, height: 20 }}>Have an account?
            <Text onPress={ this.goToSignUp } style={{ color: '#81D4FA', fontWeight: 'bold' }}> Sign in! </Text>
          </Text>
        </View>
      </View>
    )
  }
}

module.exports = SignUp
