import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, ScrollView, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Emoji from 'react-native-emoji';
import ReportService from '../services/ReportService';

class NearMe extends Component {

  static navigationOptions = {
    tabBar: {
      label: 'Carts Near Me'
    }
  }

  constructor(props) {
    super(props);

    // Create the initial state for component.
    this.state = {
      searchRadius: 1,
      currentCoords: null,
      currentRegion: null,
      reports: [],
      reportsDataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
      isListeningForReports: false
    }
  }

  componentWillMount() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let longitude = position.coords.longitude;
        let latitude = position.coords.latitude;
        this.setState({
          currentCoords: position.coords,
          currentRegion: {
            longitude: longitude,
            latitude: latitude,
            longitudeDelta: 0.1,
            latitudeDelta: 0.1 * ASPECT_RATIO
          }
        });
        this.query = ReportService.getReports({ longitude: this.state.currentCoords.longitude, latitude: this.state.currentCoords.latitude, radius: this.state.searchRadius }, (report) => {
          this.addReport(report);
        }, (report) => {
          this.removeReport(report);
        }, (report) => {
          console.log("Report Moved");
        });
      })
      navigator.geolocation.watchPosition((position) => {
        this.handleCoordsChange(position.coords);
      });
    } else {
      // User should be sent a message.
    }
  }

  addReport(report) {
    this.setState({
      reports: this.state.reports.concat(report),
    });
    this.refreshDataSource();
  }

  removeReport(report) {
    var filteredReports = this.reports.filter((r) => r.id != report.id);
    this.setState({
      reports: filteredReports
    });
    this.refreshDataSource();
  }

  updateReport(report) {
    var filteredReports = this.reports.filter((r) => r.id == report.id)
      .map((r) => report);
    this.setState({
      reports: filteredReports
    });
    this.refreshDataSource();
  }

  clearReports() {
    this.setState({
      reports: []
    });
    this.refreshDataSource();
  }

  refreshDataSource() {
    let reports = this.state.reports;
    this.setState({
      reportsDataSource: this.state.reportsDataSource.cloneWithRows(reports)
    });
  }

  handleRegionChange(region) {
    this.setState({
      longitude: region.longitude,
      latitude: region.latitude,
      longitudeDelta: region.longitudeDelta,
      latitudeDelta: region.latitudeDelta * ASPECT_RATIO
    });
  }

  handleCoordsChange(coords) {
    this.setState({
      currentCoords: coords
    });

    if (this.query) {
      this.query.updateCriteria({
        radius: this.state.searchRadius,
        center: [coords.latitude, coords.longitude]
      });
    }
  }

  renderMapView(props) {
    if (this.state.currentRegion) {
      return <MapView
        key={(this.state.currentRegion).toString() + (this.state.reports).toString()}
        style={styles.map}
        initialRegion={this.state.currentRegion}
        showsUserLocation={true}
        followsUserLocation={false}
        showsMyLocationButton={true}
        onRegionChangeComplete={(region) => {this.handleRegionChange(region)}}>
        {this.state.reports.map((report, i) => (
          <MapView.Marker
            key={i}
            title={report.name}
            coordinate={report}>
            <Emoji name="sushi" />
          </MapView.Marker>
        ))}
        {this.renderSearchRadius()}
      </MapView>
    }
    return null;
  }

  renderSearchRadius(props) {
    let center = this.state.currentCoords;
    return <MapView.Circle
          key={(center.longitude + center.latitude).toString()}
          center={center}
          radius={this.state.searchRadius * 1609.34}
          strokeColor="rgb(85, 172, 238)"
          fillColor="rgba(85, 172, 238, 0.2)"
        />
  }

  renderListView({ renderScrollComponent }) {
    if (this.state.reportsDataSource) {
      return <ListView
        dataSource={this.state.reportsDataSource}
        enableEmptySections={true}
        renderRow={(rowData) => (
          <View key={rowData} style={styles.row}>
            <Text style={styles.rowText}>
              <Emoji name="sushi" />
              {rowData.name}
            </Text>
          </View>
        )}
        renderScrollComponent={() =>
          renderScrollComponent
        }
      />
    }
    return null;
  }

  /*
   * Render a parallax scroll view with an optional 
   * [renderForground].
   */
  renderParallaxScrollView({ renderForeground }) {
    return <ParallaxScrollView
      parallaxHeaderHeight={PARALLAX_HEADER_HEIGHT}
      backgroundSpeed={10}
      fadeOutForeground={false}
      renderForeground={() =>
        renderForeground
      } />
  }

  render() {  

    if (!this.state.currentCoords) {
      return null;
    }

    return this.renderListView({ renderScrollComponent: this.renderParallaxScrollView({ renderForeground: this.renderMapView() }) });
  }
}

var currentRequest = null;

const ROW_HEIGHT = 44;
const PARALLAX_HEADER_HEIGHT = 300;

var { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  row: {
    overflow: 'hidden',
    paddingHorizontal: 10,
    height: ROW_HEIGHT,
    backgroundColor: 'white',
    borderColor: '#ededed',
    borderBottomWidth: 1,
    justifyContent: 'center'
  },
  rowText: {
    fontSize: 18
  }
});

module.exports = NearMe
