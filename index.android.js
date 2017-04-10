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

  componentDidMount() {
    this.timer = setInterval(() => {
      let query = firebase.database().ref("reports").orderByKey();
      query.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          // childData will be the actual contents of the child
          let key = childSnapshot.key;
          let childData = childSnapshot.val();

          //Get the current time
          let now = Date.now()

          //Go back 5 minutes
          checkTime = now - 10 * 60 * 1000

          if(checkTime > childData.timestamp ) {
            ref = firebase.database().ref("reports/" + key).remove()
            .then(function() {
              console.log("Remove succeeded.")
            })
            .catch(function(error) {
              console.log("Remove failed: " + error.message)
            });
          }
        });
      })
      .catch(function(error) {
        console.log(error)
      });
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
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
