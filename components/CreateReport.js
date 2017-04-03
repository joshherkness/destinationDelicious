import React, { Component } from 'react';
import { StyleSheet, Text, View} from 'react-native';

class CreateReport extends Component {

  static navigationOptions = {
    title: 'Create Report',
    header: {
      tintColor: '#000'
    }
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.bigFont }>Create Report Screen</Text>
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

module.exports = CreateReport
