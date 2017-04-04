import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Favorites extends Component {

  static navigationOptions = {
    tabBar: {
      label: 'Favorite Carts'
    }
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.bigFont }>Favorite Carts Screen</Text>
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

module.exports = Favorites
