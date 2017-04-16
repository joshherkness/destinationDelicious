import React, { Component } from 'react';
import { Alert, AppRegistry, StyleSheet, Button, Text, TextInput, View, Image } from 'react-native';
import * as firebase from "firebase";
import Report from '../models/Report'
import ReportService from '../services/ReportService';


class CreateReport extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Create Report',
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff'
      },
      headerStyle: {
        backgroundColor: '#55acee'
      }
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      name:null,
      longitude:null,
      latitude:null,
      description:null,
      foodtype:null,
      timestamp: null
    }
  }


  report = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setState({
          longitude: position.coords.longitude,
          latitude: position.coords.latitude
        }, () => {
          
          report = new Report(this.state.name, this.state.longitude,
           this.state.latitude, this.state.description, this.state.foodtype,
           Date.now());

          ReportService.createReport(report);

          Alert.alert("Cart Reported Successfully");
          this.props.navigation.goBack(null);
        });
      });
    }
  }

  render() {
    return (
      <View style={ styles.container }>
        <Text style={ styles.bigFont }>Report Cart</Text>
        <TextInput autoCapitalize='none' style={ styles.input } value={ this.state.name } placeholder="Cart Name" onChangeText={ (name) => this.setState({name}) } />
        <TextInput autoCapitalize='none' style={ styles.input } value={ this.state.food } placeholder="Food Type" onChangeText={ (food) => this.setState({food}) } />
        <TextInput autoCapitalize='none' style={ styles.input } value={ this.state.description } placeholder="Description" onChangeText={ (description) => this.setState({description}) } />
        <Button onPress={ this.report} title="Report Cart" color="#55acee"/>
      </View>
    )
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
    color: '#000000',
    fontSize: 30
  },

  input: {
    alignSelf: 'stretch',
    backgroundColor: '#FFF',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 3,
    height: 40,
    margin: 10,
    paddingLeft: 10
  },

});

module.exports = CreateReport
