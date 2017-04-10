import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
<<<<<<< HEAD
import { HomeTabs } from '../config/router';
import * as firebase from 'firebase';
=======
<<<<<<< HEAD
import { HomeTabs } from '../config/router';
import * as firebase from 'firebase';
=======
>>>>>>> origin/DD-14
>>>>>>> a5251decc2e4ccb4ac15b13cc0a731ca9e3aafa7

class AccountView extends Component{

static navigationOptions = {
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> a5251decc2e4ccb4ac15b13cc0a731ca9e3aafa7
      title: 'AccountView',
      header: ({ navigate, state }) => ({
        tintColor: '#fff',
        titleStyle: {
          color: '#fff'
        },
        style: {
          backgroundColor: '#55acee'
        },

        left: (
          <Button color='#fff' title='Sign Out' onPress={() => state.params.signOut() }/>
        )
      }),
    };
<<<<<<< HEAD
=======
=======
    tabBar: {
      label: 'Account Settings',
      left: (
                <Button color='#55acee' title='Sign Out' onPress={() => state.params.signOut() }/>
              )
    }
>>>>>>> origin/DD-14
>>>>>>> a5251decc2e4ccb4ac15b13cc0a731ca9e3aafa7

     constructor(props) {
        super(props);
      }

       render() {
          return (
            <View style={ styles.container }>
<<<<<<< HEAD
              <Text style={ styles.bigFont }>Account View Screen</Text>
=======
<<<<<<< HEAD
              <Text style={ styles.bigFont }>Account View Screen</Text>
=======
              <Text style={ styles.bigFont }>AccountView Screen</Text>
>>>>>>> origin/DD-14
>>>>>>> a5251decc2e4ccb4ac15b13cc0a731ca9e3aafa7
            </View>
          )
        }
  }
}
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> a5251decc2e4ccb4ac15b13cc0a731ca9e3aafa7

componentDidMount() {
    this.props.navigation.setParams({ signOut: this.signOut });


<<<<<<< HEAD
=======
=======
>>>>>>> origin/DD-14
>>>>>>> a5251decc2e4ccb4ac15b13cc0a731ca9e3aafa7
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

        module.exports = AccountView