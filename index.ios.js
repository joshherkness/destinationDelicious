import React, { Component } from 'react';
import { AppRegistry, StatusBar } from 'react-native';
import * as firebase from "firebase";
import Firebase from "./config/firebase";
import Authentication from './components/Authentication'
import { Root } from './config/router';
import AuthenticationService from './services/AuthenticationService'

export default class destinationDelicious extends Component {
  constructor() {
    super();
    this.state = {
      user: undefined
    }

    StatusBar.setBarStyle('light-content', true);

    AuthenticationService.onAuthStateChanged()
    .subscribe((user) => {
      this.setState({
        user: user
      })
    })
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
