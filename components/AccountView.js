import React, { Component } from 'react';
import { StyleSheet, Platform, Text, View, Button} from 'react-native';
import * as firebase from 'firebase';
import AuthenticationService from '../services/AuthenticationService'

class AccountView extends Component {

  static navigationOptions = {
    tabBar: {
      label: 'Profile'
    }
  };

  constructor(props) {
    super(props);
  }

 signOut() {
   AuthenticationService.signOut()
 }

  render() {
    return (
      <View style={ styles.container }>
        <View style={styles.signOutButton}>
          <Button title='Sign Out'
                  color='white'
                  onPress={() => this.signOut()}/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'stretch',
    paddingTop: 5
  },
  signOutButton: {
    backgroundColor: '#db4437',
    margin: 10,
    borderRadius: 5,
    overflow: 'hidden'
  }
});

module.exports = AccountView
