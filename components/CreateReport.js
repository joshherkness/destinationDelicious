import React, { Component } from 'react';
import { Alert, AppRegistry, StyleSheet, Button, Text, TextInput, 
  View, Image, TouchableOpacity, ScrollView } from 'react-native';
import * as firebase from "firebase";
import Report from '../models/Report'
import ReportService from '../services/ReportService';
import LocationService from '../services/LocationService';
import FoodTypeService from '../services/FoodTypeService.js';
import Emoji from 'react-native-emoji';


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
      description:null,
      foodtype: 'other',
      foodTypes: FoodTypeService.getFoodTypes()
    }
  }

  setFoodType(foodType) {
    this.setState({
      foodtype: foodType
    });
  }


  create() {

    let locationOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    LocationService.getCurrentLocation(locationOptions)
      .subscribe((loc) => {
        report = new Report(this.state.name, loc.longitude,
          loc.latitude, this.state.description, this.state.foodtype,
          loc.timestamp);
        ReportService.createReport(report);
        this.props.navigation.goBack(null);
      },
      (err) => {
        console.log(err)
      });
  }

  render() {
    return (
      <View style={ styles.container }>
        <TextInput autoCapitalize='none' style={ styles.input } value={ this.state.name } placeholder="Cart Name" onChangeText={ (name) => this.setState({name}) } />
        <Text>Food type</Text>
        <ScrollView
          contentContainerStyle={styles.scrollView}>
          {this.state.foodTypes.map((foodType, i) => (
            <TouchableOpacity
              key={foodType.type}
              onPress={() => this.setState({foodtype: foodType.type})}>
              <View style={this.state.foodtype == foodType.type ? styles.emojiCardHighlighted : styles.emojiCard}>
                <Text style={styles.emoji}><Emoji name={foodType.emoji} /></Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <TextInput autoCapitalize='none' style={ styles.input } value={ this.state.description } placeholder="Description" onChangeText={ (description) => this.setState({description}) } />
        <Button onPress={ this.create.bind(this) } title="Report Cart" color="#55acee"/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
     flexDirection: 'column',
     alignItems: 'stretch',
     padding: 10
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
  scrollView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  emojiCard: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    padding: 5
  },
  emojiCardHighlighted: {
    width: 40,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    padding: 5,
    backgroundColor: '#55acee'
  },
  emoji: {
    fontSize: 20
  }
});

module.exports = CreateReport
