import React, { Component } from 'react';
import { StyleSheet, Platform, Text, View, Button} from 'react-native';
import * as firebase from 'firebase';

class AccountView extends Component {

  static navigationOptions = {
    title: 'Account View',
    header: ({ navigate }) => ({
      tintColor: '#fff',
      titleStyle: {
        color: '#fff'
      },
      style: {
        backgroundColor: '#55acee'
      }
    })
  };

  constructor(props) {
    super(props);
  }

 signOut() {
   firebase.auth().signOut()
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
