import React, { Component } from 'react';
import { StyleSheet, Text, View, ListView, ScrollView, Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import ParallaxScrollView from 'react-native-parallax-scroll-view'

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
      currentRegion: null,
      reports: [],
      reportsDataSource: null
    }
  }

  componentDidMount() {

    // Data source used for the [ListView]
    const dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    // Attempt to retrieve the reporters current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        position.coords.longitudeDelta = 0;
        position.coords.latitudeDelta = 0;
        this.setState({
          currentRegion: {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
            longitudeDelta: LONGITUDE_DELTA,
            latitudeDelta: LATITUDE_DELTA
          }
        });
      });
    } else {
      // User should be sent a message.
    }

    // Temp set of reports data
    let reports = [{
      name: 'Tony\'s Tacos',
      longitude: -83.3644252,
      latitude: 42.790749999999996,
      timestamp: 1491608569928
    }, {
      name: 'McBurgerking',
      longitude: -83.3644252,
      latitude: 42.790749999999996,
      timestamp: 1491608569980
    }]

    this.setState({
      reports: reports,
      reportsDataSource: dataSource.cloneWithRows(reports)
    })
  }

  renderMapView(props) {
    if (this.state.currentRegion) {
      return <MapView
        key="mapview"
        style={styles.map}
        initialRegion={this.state.currentRegion}>
        {this.state.reports.map((report, i) => (
          <MapView.Marker
            key={i}
            title={report.name}
            coordinate={report}>
          </MapView.Marker>
        ))}
      </MapView>
    }
    return null;
  }

  renderListView({ renderScrollComponent }) {
    {
      if (this.state.reportsDataSource) {
        return <ListView
          ref="ListView"
          dataSource={this.state.reportsDataSource}
          renderRow={(rowData) => (
            <View key={rowData} style={styles.row}>
              <Text style={styles.rowText}>
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

  noReportsView() {
    return <View>
      <Text>
        No Results
        </Text>
    </View>
  }

  render() {

    if (!this.state.currentRegion) {
      // Current location cannot be found.
      return null;
    }

    return this.renderListView({ renderScrollComponent: this.renderParallaxScrollView({ renderForeground: this.renderMapView() }) });
  }
}

const ROW_HEIGHT = 44;
const PARALLAX_HEADER_HEIGHT = 300;

var { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

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
  },
  marker: {
    width: 20,
    height: 20,
    backgroundColor: 'red'
  }
});

module.exports = NearMe
