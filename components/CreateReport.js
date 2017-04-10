import React, { Component } from 'react';
import { Alert, AppRegistry, StyleSheet, Button, Text, TextInput, View, Image } from 'react-native';
import * as firebase from "firebase";


class CreateReport extends Component {

  static navigationOptions = {
    title: 'Create Report',
    header: {
      tintColor: '#fff',
      titleStyle: {
        color: '#fff'
      },
      style: {
        backgroundColor: '#55acee'
      }
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      food: '',
      menu: '',
    }
  }

  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.bigFont }>Report Cart</Text>
        <TextInput autoCapitalize='none' style={ styles.input } value={ this.state.name } placeholder="Cart Name" onChangeText={ (name) => this.setState({name}) } />
        <TextInput autoCapitalize='none' style={ styles.input } value={ this.state.food } placeholder="Food Type" onChangeText={ (food) => this.setState({food}) } />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
     flexDirection: 'column',
     alignItems: 'center',
     paddingTop: 5
  },

  bigFont: {
    marginTop: 10,
    color: '#000000',
    fontSize: 30
  },

  input: {
    alignSelf: 'stretch',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 3,
    height: 40,
    marginBottom: 10,
    paddingLeft: 10
  },
});

module.exports = CreateReport
