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
      user: undefined
    }
    Firebase.initialise();
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
