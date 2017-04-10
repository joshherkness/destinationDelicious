import React, { Component } from 'react';
import { StyleSheet, Text, View} from 'react-native';

class AccountView extends Component {

  static navigationOptions = {
    title: 'Account View',
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
  }

  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.bigFont }>Account View Screen</Text>
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
  }
});

module.exports = AccountView