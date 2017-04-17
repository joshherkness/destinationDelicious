import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Emoji from 'react-native-emoji';
import Location from '../models/Location';
import LocationService from '../services/LocationService';
import FoodTypeService from '../services/FoodTypeService';

class ReportRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      report: null,
      location: null
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.report) {
      this.setReport(nextProps.report);
    }
    if (nextProps.location) {
      this.setLocation(nextProps.location);
    }
  }

  setReport(report) {
    this.setState({
      report: report
    });
  }

  setLocation(location) {
    this.setState({
      location: location
    });
  }

  renderDistance() {
    let distance = LocationService.distanceBetween(new Location(this.state.report.longitude, this.state.report.latitude, this.state.report.timestamp), this.state.location);
    if (this.state.location) {
      return <Text style={styles.distance}>{Number.parseInt(distance)} m</Text>
    }
    return null;
  }

  renderEmoji() {
      var emoji = FoodTypeService.foodTypeFromType(this.state.report.foodtype).emoji;
      return <Emoji name={emoji} />
  }

  render() {
    if (this.state.report) {
      return <View style={styles.container}>
        <Text style={styles.emoji}>
          {this.renderEmoji()}
        </Text>
        <Text style={styles.name}>{this.state.report.name}</Text>
        {this.renderDistance()}
      </View>
    }
    return null;
  }
}

const ROW_HEIGHT = 44;
const ROW_PADDING = 10;
const styles = new StyleSheet.create({
  container: {
    overflow: 'hidden',
    paddingHorizontal: ROW_PADDING,
    height: ROW_HEIGHT,
    backgroundColor: 'white',
    borderColor: '#ededed',
    borderBottomWidth: 1,
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1
  },
  emoji: {
    marginRight: ROW_PADDING,
    fontSize: 20
  },
  name: {
    flex: 1,
    fontSize: 18
  },
  distance: {
    fontSize: 18,
    color: '#ddd'
  }
})

module.exports = ReportRow;