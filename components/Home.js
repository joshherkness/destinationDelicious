import React, { Component } from 'react';
import { StyleSheet, Platform, Button} from 'react-native';
import { HomeTabs } from '../config/router';
import * as firebase from 'firebase';

class Home extends Component {

  static navigationOptions = {
      title: 'Home',
      header: ({ navigate, state }) => ({
        tintColor: '#fff',
        titleStyle: {
          color: '#fff'
        },
        style: {
          backgroundColor: '#55acee'
        },
        right: (
          <Button title='Report' 
                  color={(Platform.OS === 'ios') ? '#fff' : '#000'}
                  onPress={() => navigate('CreateReport')}/>
        )
      }),
    };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <HomeTabs/>
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
