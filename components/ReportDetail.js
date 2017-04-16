import React, { Component } from 'react';
import { Alert, AppRegistry, StyleSheet, Text, View, ScrollView } from 'react-native';
import MapView from 'react-native-maps';
import ParallaxScrollView from 'react-native-parallax-scroll-view';
import Emoji from 'react-native-emoji';
import * as firebase from "firebase";
import ReportService from '../services/ReportService';
import LocationService from '../services/LocationService';


class ReportDetail extends Component {

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
      title: state.params.report.name,
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
      location: null
    }
  }

  componentDidMount() {

    let locationOptions = {
      enableHighAccuracy: false,
      timeout: 5000,
      maximumAge: 0
    };

    LocationService.getCurrentLocation(locationOptions)
      .subscribe((loc) => {
        this.setLocation(loc)
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

  setLocation(location) {

    // Check to ensure that the coords have infact changed
    if ( this.state.location && 
        location.longitude == this.state.location.longitude &&
        location.latitude == this.state.location.latitude) {
      return;
    }

    this.setState({
      location: location
    });
  }

  renderMapView({ params }) {
    let report = params.report;
    let region = params.region;
    if (region && report) {
      return <MapView
        ref = { (MapRef) => { if( MapRef !=null ) MapRef.fitToElements(false) }}
        style={styles.map}
        initialRegion={region}
        showsUserLocation={true}
        followsUserLocation={false}
        showsMyLocationButton={true}
        scrollEnabled={false}>
        <MapView.Marker
          key={report.id}
          title={report.name}
          coordinate={report}>
          <View style={styles.marker}>
            {this.renderEmoji({ emoji: report.foodtype })}
          </View>
        </MapView.Marker>
      </MapView>
    }
    return null;
  }

  renderEmoji({ emoji }) {
    if (!emoji) {
      emoji = 'truck';
    }
    return <Emoji name={emoji} />
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
    const { params } = this.props.navigation.state;

    let report = params.report;

    if (report && this.state.location) {
      let distance = LocationService.distanceBetween(report, this.state.location);
      return <View style={styles.container}>
        <ScrollView>
          {this.renderMapView({ params: params })}
          <View style={styles.detailItem}>
            <View style={styles.detailHeader}>
              <Text style={styles.detailTitle}>Name</Text>
              <Text style={styles.detailText}>{report.name}</Text>
            </View>
          </View>
          <View style={styles.detailItem}>
            <View style={styles.detailHeader}>
              <Text style={styles.detailTitle}>Food Type</Text>
              <Text style={styles.detailText}>{this.renderEmoji({ emoji: report.foodtype })}</Text>
            </View>
          </View>
          <View style={styles.detailItem}>
            <View style={styles.detailHeader}>
              <Text style={styles.detailTitle}>Distance</Text>
              <Text style={styles.detailText}>{Number.parseInt(distance)} meters</Text>
            </View>
          </View>
          <View style={styles.detailItem}>
            <View style={styles.detailHeader}>
              <Text style={styles.detailTitle}>Description</Text>
            </View>
            <Text style={styles.detailBody}>{report.description || 'None'}</Text>
          </View>
        </ScrollView>
      </View>
    }
    return null;
  }
}

const DETAIL_ITEM_PADDING = 10;
const PARALLAX_HEADER_HEIGHT = 300;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    backgroundColor: 'white'
  },
  map: {
    height: PARALLAX_HEADER_HEIGHT
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
  },
  detailItem: {
    overflow: 'hidden',
    backgroundColor: 'white',
    borderColor: '#ededed',
    borderBottomWidth: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    flex: 1
  },
  detailHeader: {
    overflow: 'hidden',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    padding: DETAIL_ITEM_PADDING
  },
  detailTitle: {
    paddingRight: DETAIL_ITEM_PADDING,
    fontSize: 18,
    fontWeight: 'bold'
  },
  detailText: {
    position: 'absolute',
    left: 130,
    fontSize: 18
  },
  detailBody: {
    fontSize: 18,
    padding: DETAIL_ITEM_PADDING,
    paddingTop: 0
  }
});

module.exports = ReportDetail
