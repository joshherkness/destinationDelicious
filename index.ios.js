import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import * as firebase from "firebase";
import Firebase from "./config/firebase";
import Home from './components/Home'
import Authentication from './components/Authentication'

export default class destinationDelicious extends Component {
  constructor() {
    super();
    this.state = {
      userLoaded: false,
      loggedIn: false,
      user: null
    }
    Firebase.initialise();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({
          userLoaded: true,
          loggedIn: true,
          user: user
        })
      } else {
        this.setState({
          userLoaded: true,
          loggedIn: false,
          user: null
        })
      }
    });
  }

  render() {
    if (!this.state.userLoaded) {
      return(
        null
      )
    } else if (this.state.loggedIn) {
      return(
        <Home/>
      );
    } else {
      return(
        <Authentication/>
      );
    }
  }
}

AppRegistry.registerComponent('destinationDelicious', () => destinationDelicious);
