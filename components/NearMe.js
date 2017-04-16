import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, ScrollView, 
  Dimensions, Alert, TouchableOpacity, Button, Platform } from 'react-native';
import MapView from 'react-native-maps';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Emoji from 'react-native-emoji';
import ReportService from '../services/ReportService';
import ReportRow from './ReportRow';
import LocationService from '../services/LocationService';
import {Observable} from 'rxjs';

/*
 * List used to keep track of reports.
 */
var _reports;

/*
 * Subscription to watch the location of the device.
 */
var watchLocationSubscription;

/*
 * Query used to update the reports based on location.
 */
var geofireQuery;

class NearMe extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Home',
      tabBarLabel: 'Carts Near Me',
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#fff'
      },
      headerStyle: {
        backgroundColor: '#55acee'
      },
      headerRight: (
        <Button title='Report' 
                color={(Platform.OS === 'ios') ? '#fff' : '#000'}
                onPress={() => navigation.navigate('CreateReport')}/>
      )
    };
  };

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

    let locationOptions = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0
    };

    LocationService.getCurrentLocation(locationOptions)
      .subscribe((loc) => {
        this.setState({
          location: loc,
          region: {
            longitude: loc.longitude,
            latitude: loc.latitude,
            longitudeDelta: 0.1,
            latitudeDelta: 0.1 * ASPECT_RATIO
          }
        });
        geofireQuery = ReportService.getReports({ 
          longitude: loc.longitude, 
          latitude: loc.latitude, 
          radius: this.state.searchRadius }, 
        (report) => {
          this.receiveReport(report);
        }, (report) => {
          this.removeReport(report);
        }, (report) => {
          this.updateReport(report);
        });
      },
      (err) => {
        console.log(err)
      });

    watchLocationSubscription = LocationService.watchLocation(locationOptions)
      .subscribe((loc) => {
        this.setLocation(loc);
      }, 
      (err) => {
        console.log(err);
      });
  }

  /*
   * Called when the component will unmount.
   */
  componentWillUnmount() {
    
    // If a location subscription exists, unsubscribe from it.
    if (watchLocationSubscription) {
      watchLocationSubscription.unsubscribe();
    }

    // If a geofire query exitst, cancel it.
    if (geofireQuery) {
      geofireQuery.cancel();
    }
  }

  /*
   * Used to set the value of [this.state.reports].
   */
  setReports(reports) {
    _reports = reports;
    this.setState({
      reports: reports,
    }, this.setReportsDataSource(reports, this.state.location));
  }

 /*
  * Used to set the value of [this.state.reportsDataSource].
  */
  setReportsDataSource(reports, location) {
    if (reports && location) {
      var rows = reports.map((report) => { return {
        report: report,
        location: location
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

  /*
   * Set the current region of the [react-native-map].
   */
  setRegion(region) {
    this.setState({
      region: region 
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
    if (geofireQuery) {
      geofireQuery.updateCriteria({
        radius: radius
      });
    }
  }

  setLocation(location) {

    // Check to ensure that the coords have infact changed
    if ( this.state.location && 
        location.longitude == this.state.location.longitude &&
        location.latitude == this.state.location.latitude) {
      return;
    }

    this.setState({
      location: location
    }, () => {
      this.setReportsDataSource(this.state.reports, location)
    });
    

    if (geofireQuery) {
      geofireQuery.updateCriteria({
        center: [location.latitude, location.longitude]
      });
    }
  }

  renderMapView(props) {
    if (this.state.region && this.state.reports) {
      return <MapView
        style={styles.map}
        initialRegion={this.state.region}
        showsUserLocation={true}
        followsUserLocation={true}
        showsMyLocationButton={true}>
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
    let center = this.state.location;
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
        dataSource={this.state.reportsDataSource}
        enableEmptySections={true}
        renderRow={(rowData, sectionId, rowId) => 
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('ReportDetail', {
              report: rowData.report,
              region: {
               longitude: rowData.report.longitude,
               latitude: rowData.report.latitude,
               longitudeDelta: 0.1,
               latitudeDelta: 0.1 * ASPECT_RATIO
              }
            })}>
            <ReportRow
              key={rowId}
              report={rowData.report}
              location={rowData.location}/>
          </TouchableOpacity>
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

    if (!this.state.location) {
      return null;
    }

    return this.renderListView({ renderScrollComponent: this.renderParallaxScrollView({ renderForeground: this.renderMapView() }) });
  }
}

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
