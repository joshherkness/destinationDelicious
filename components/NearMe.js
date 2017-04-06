import React, { Component } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import MapView from 'react-native-maps';

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
          <MapView style={ styles.map } initialRegion={{ latitude: 37.78825, longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421, }}
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  bigFont: {
    marginTop: 10,
    color: '#000',
    fontSize: 30
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

module.exports = NearMe
