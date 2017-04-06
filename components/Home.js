import React, { Component } from 'react';
import { StyleSheet, Button} from 'react-native';
import { HomeTabs } from '../config/router';
import * as firebase from 'firebase';

class Home extends Component {

  static navigationOptions = {
      title: 'Home',
      header: ({ navigate, state }) => ({
        tintColor: '#55acee',
        titleStyle: {
          color: '#000'
        },
        right: (
          <Button color='#55acee' title='Report' onPress={() => navigate('CreateReport')}/>
        ),
        left: (
          <Button color='#55acee' title='Sign Out' onPress={() => state.params.signOut() }/>
        )
      }),
    };

  constructor(props) {
    super(props);
  }

  signOut() {
    firebase.auth().signOut()
  }

  componentDidMount() {
    this.props.navigation.setParams({ signOut: this.signOut });
  }

  create = () => {
    this.props.navigation.navigate('CreateReport')
  }

  create = () => {
    this.props.navigation.navigate('AccountView')
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
