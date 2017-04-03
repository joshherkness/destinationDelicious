import React, { Component } from 'react';
import { AppRegistry, StyleSheet, Text, View, Button } from 'react-native';

class NearMe extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.greyFont }>NearMe</Text>
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

module.exports = NearMe
