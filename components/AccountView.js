import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
<<<<<<< HEAD
import { HomeTabs } from '../config/router';
import * as firebase from 'firebase';
=======
>>>>>>> origin/DD-14

class AccountView extends Component{

static navigationOptions = {
<<<<<<< HEAD
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
=======
    tabBar: {
      label: 'Account Settings',
      left: (
                <Button color='#55acee' title='Sign Out' onPress={() => state.params.signOut() }/>
              )
    }
>>>>>>> origin/DD-14

     constructor(props) {
        super(props);
      }

       render() {
          return (
            <View style={ styles.container }>
<<<<<<< HEAD
              <Text style={ styles.bigFont }>Account View Screen</Text>
=======
              <Text style={ styles.bigFont }>AccountView Screen</Text>
>>>>>>> origin/DD-14
            </View>
          )
        }
  }
}
<<<<<<< HEAD

componentDidMount() {
    this.props.navigation.setParams({ signOut: this.signOut });


=======
>>>>>>> origin/DD-14
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