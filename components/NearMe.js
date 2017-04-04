import React, { Component } from 'react';
import { StyleSheet, Text, View} from 'react-native';

class NearMe extends Component {

  static navigationOptions = {
    tabBar: {
      label: 'Carts Near Me'
    }
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.bigFont }>Carts Near Me Screen</Text>
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
    color: '#000',
    fontSize: 30
  }
});

module.exports = NearMe