import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Emoji from 'react-native-emoji';

const geofire = require('geofire');

class ReportRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      report: null,
      location: null
    }
  }

  componentWillReceiveProps() {
    if (this.props.report) {
      this.setReport(this.props.report);
    }
    if (this.props.location) {
      this.setLocation(this.props.location);
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

  getDistance() {
    let report = this.state.report;
    let location = this.state.location;
    let distance = geofire.distance([report.latitude, report.longitude],[location.latitude, location.longitude]);

    return distance * 1000;
  }

  renderDistance() {
    let distance = Number.parseInt(this.getDistance());
    if (this.state.location) {
      return <Text style={styles.distance}>{distance} m</Text>
    }
    return null;
  }

  renderEmoji() {
      let emoji = this.state.report.foodtype;
      if (!emoji) {
          emoji = 'truck';
      }
      return <Emoji name={emoji} />
  }

  render() {
    if (this.state.report) {
      return <View style={styles.container}>
        <Text style={styles.emoji}>
          <Emoji name={this.state.report.foodtype || 'truck'} />
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