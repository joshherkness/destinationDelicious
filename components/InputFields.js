import React, { Component } from 'react';
import { AppRegistry, TextInput, View } from 'react-native';

class InputFields extends Component {
  constructor() {
    super();
    this.state = {
      username: 'Enter username',
      password: 'Enter password'
    }
  }

  render() {
    return (
      <View style={{ height: 300, width: 200, flexDirection: 'column', paddingTop: 5 }}>
      <TextInput style={{height: 40, borderColor: 'yellow', borderWidth: 1, marginBottom: 20, textAlign: 'center' }} value={ this.state.username } onChangeText={ (username) => this.setState({username}) } />
      <TextInput style={{height: 40, borderColor: 'yellow', borderWidth: 1, textAlign: 'center' }} value={ this.state.password }  onChangeText={ (password) => this.setState({password}) } />
      </View>
    )
  }
}

module.exports = InputFields
