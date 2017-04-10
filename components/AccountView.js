import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { HomeTabs } from '../config/router';
import * as firebase from 'firebase';

class AccountView extends Component{

static navigationOptions = {
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

     constructor(props) {
        super(props);
      }

       render() {
          return (
            <View style={ styles.container }>
              <Text style={ styles.bigFont }>Account View Screen</Text>
            </View>
          )
        }
  }
}

componentDidMount() {
    this.props.navigation.setParams({ signOut: this.signOut });


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