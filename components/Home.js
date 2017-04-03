import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Button } from 'react-native';
import * as firebase from "firebase";
import NearMe from '../components/NearMe';
import Favorites from '../components/Favorites';
import { HomeTabs } from '../config/router';

class Home extends Component {
  constructor(props) {
    super(props);
  }

  signOut = () => {
    firebase.auth().signOut()
  }

  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.greyFont }>Home</Text>
        <Button onPress={ this.signOut } title="Sign Out" color="#FF0000"/>
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

  greyFont: {
    marginTop: 10,
    color: '#000000',
    fontSize: 40
  }
});

module.exports = Home
