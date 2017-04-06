import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

class AccountView extends Component{

static navigationOptions = {
    tabBar: {
      label: 'Account Settings',
      left: (
                <Button color='#55acee' title='Sign Out' onPress={() => state.params.signOut() }/>
              )
    }

     constructor(props) {
        super(props);
      }

       render() {
          return (
            <View style={ styles.container }>
              <Text style={ styles.bigFont }>AccountView Screen</Text>
            </View>
          )
        }
  }
}
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