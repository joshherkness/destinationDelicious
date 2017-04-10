import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, ScrollView, Dimensions, Alert } from 'react-native';
import MapView from 'react-native-maps';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Emoji from 'react-native-emoji';
import ReportService from '../services/ReportService';
import ReportRow from './ReportRow';

/*
 * Id used to track the geolocation position watching.
 */
var watchId;

/*
 * List used to keep track of reports.
 */
var _reports;

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
      reportsDataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    }
  }

  componentWillMount() {

    this.setSearchRadius(1.60934);
    this.setReports([]);

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
          this.receiveReport(report);
        }, (report) => {
          this.removeReport(report);
        }, (report) => {
          this.updateReport(report);
        });
      })

      let options = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 0
      };
      if (!watchId) {
        watchId = navigator.geolocation.watchPosition(
          (position) => {
            this.setCurrentCoords(position.coords);
          }, (error) => {
            console.log(error);
          }, options
        );
      }
    } else {
      Alert.alert("Opps...  We can't find your location.  Please make sure your location services are enabled.");
    }
  }

  /*
   * Called before the component will unmount.
   */
  componentWillUnmount() {
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
      watchId = null;
    }
  }

  /*
   * Used to set the value of [this.state.reports].
   */
  setReports(reports) {
    _reports = reports;
    this.setState({
      reports: reports,
    }, this.setReportsDataSource(reports, this.state.currentCoords));
  }

 /*
  * Used to set the value of [this.state.reportsDataSource].
  */
  setReportsDataSource(reports, currentCoords) {
    if (reports && currentCoords) {
      var rows = reports.map((report) => { return {
        report: report,
        currentCoords: currentCoords
      }});
      this.setState({
        reportsDataSource: this.state.reportsDataSource.cloneWithRows(rows)
      });
    }
  }

  /*
   * Add a report to the locally stored reports.
   */
  receiveReport(report) {
    //this.removeReport(report);
    this.setReports(_reports.concat(report));
  }

  /*
   * Remove a locally stored report.
   */
  removeReport(report) {
    while (_reports.findIndex((r) => r.id == report.id) != -1) {
      let index = _reports.findIndex((r) => r.id == report.id);
      _reports.splice(index, 1);
      this.setReports(_reports);
    }
  }

  /*
   * Update a locally stored report by id.
   */
  updateReport(report) {
    this.setReports(_reports.forEach((r) => {
      r = r.id == report.id ? report : r;
    }));
  }

  handleRegionChange(region) {
    this.setCurrentRegion({
      longitude: region.longitude,
      latitude: region.latitude,
      longitudeDelta: region.longitudeDelta,
      latitudeDelta: region.latitudeDelta * ASPECT_RATIO
    });
  }

  /*
   * Set the current region of the [react-native-map].
   */
  setCurrentRegion(region) {
    this.setState({
      currentRegion: region 
    });
  }

  /*
   * Set the search radius used to fetch the reports.
   */
  setSearchRadius(radius) {
    this.setState({
      searchRadius: radius
    });

    // Update the current geofire query, if one exists.
    if (this.query) {
      this.query.updateCriteria({
        radius: radius
      });
    }
  }

  setCurrentCoords(coords) {

    // Check to ensure that the coords have infact changed
    if ( this.state.currentCoords && 
        coords.longitude == this.state.currentCoords.longitude &&
        coords.latitude == this.state.currentCoords.latitude) {
      return;
    }

    this.setState({
      currentCoords: {
        longitude: coords.longitude,
        latitude: coords.latitude
      }
    }, () => {
      this.setReportsDataSource(this.state.reports, coords)
    });
    

    if (this.query) {
      this.query.updateCriteria({
        center: [coords.latitude, coords.longitude]
      });
    }
  }

  renderMapView(props) {
    if (this.state.currentRegion && this.state.reports) {
      return <MapView
        style={styles.map}
        initialRegion={this.state.currentRegion}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={true}
        onRegionChangeComplete={(region) => {this.handleRegionChange(region)}}>
        {this.state.reports.map((report, i) => (
          <MapView.Marker
            key={i}
            title={report.name}
            coordinate={report}
            zIndex={0}>
            <View style={styles.marker}>
              {this.renderEmoji({emoji: report.foodtype})}
            </View>
          </MapView.Marker>
        ))}
        {this.renderSearchRadius()}
      </MapView>
    }
    return null;
  }

  renderSearchRadius(props) {
    let center = this.state.currentCoords;
    let radius = this.state.searchRadius;

    if (center && radius) {
      return <MapView.Circle
          key={(center.longitude + center.latitude).toString()}
          center={center}
          radius={radius * 1000}
          strokeColor="rgb(85, 172, 238)"
          fillColor="rgba(85, 172, 238, 0.08)"
        />
    }
    return null;
  }

  renderEmoji({emoji}) {
      if (!emoji) {
          emoji = 'truck';
      }
      return <Emoji name={emoji} />
  }

  renderListView({ renderScrollComponent }) {
    if (this.state.reportsDataSource) {
      return <ListView
        id="list"
        dataSource={this.state.reportsDataSource}
        enableEmptySections={true}
        renderRow={(rowData, sectionId, rowId) => 
          <ReportRow
            key={rowId}
            report={rowData.report}
            currentCoords={rowData.currentCoords} />
        }
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
  marker: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 3,
    shadowOpacity: 0.2
  }
});

module.exports = NearMe
