import React, { Component } from 'react';
import { AppRegistry, StatusBar } from 'react-native';
import * as firebase from "firebase";
import Firebase from "./config/firebase";
import Authentication from './components/Authentication'
import { Root } from './config/router';

export default class destinationDelicious extends Component {
  constructor() {
    super();
    this.state = {
      user: undefined
    }
    StatusBar.setBarStyle('light-content', true);
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          user: user
        })
      } else {
        this.setState({
          user: null
        })
      }
    });
  }

  render() {
    if (this.state.user === undefined) {
      return(
        null
      )
    } else if (this.state.user) {
      return(
        <Root/>
      );
    } else {
      return(
        <Authentication/>
      );
    }
  }
}

AppRegistry.registerComponent('destinationDelicious', () => destinationDelicious);