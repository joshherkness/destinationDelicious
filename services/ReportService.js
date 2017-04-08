import * as firebase from 'firebase';

const geofire = require('geofire');
const geofireRef = new geofire(firebase.database().ref("geofire"))

class ReportService {

  /**
   * Adds a route object to the firebase database.
   * @param {Dict} report
   */
  static createReport(report) {
    var user = firebase.auth().currentUser
    var newReportKey = firebase.database().ref().child('reports').push().key;
    firebase.database().ref('reports/' + newReportKey).set({
      user: user.uid,
      name: report.name,
      description: report.description,
      foodtype: report.foodtype,
      longitude: report.longitude,
      latitude: report.latitude
    });

    // Add the report key and location to geofire so we can do lookups quickly
    geofireRef.set({ [newReportKey] : [report.latitude, report.longitude] }).then(function() {
      console.log("Report has been added to GeoFire");
    }, function(error) {
      console.log("Error: " + error);
    });
  }

  /**
   * Asynchronous updates the caller on reports within a radius of the provided location
   * @param {Dict} center
   * @param {Number} radius
   * @param {Function} added
   * @param {Function} moved
   * @param {Function} removed
   */
  static getReports(params, entered, exited, moved) {
    var geoQuery = geofireRef.query({
      center: [params.latitude, params.longitude],
      radius: params.radius
    });

    var onKeyEnteredRegistration = geoQuery.on("key_entered", function(key, location, distance) {
      ReportService.getReport(key, function(report){
        entered(report)
      });
    });

    var onKeyEnteredRegistration = geoQuery.on("key_exited", function(key, location, distance) {
      ReportService.getReport(key, function(report){
        exited(report)
      });
    });

    var onKeyEnteredRegistration = geoQuery.on("key_moved", function(key, location, distance) {
      ReportService.getReport(key, function(report){
        moved(report)
      });
    });
  }

  /**
   * Asynchronous returns a route object given an id
   * @param {String} id
   * @param {Function} callback
   */
  static getReport(id, callback) {
    firebase.database().ref('/reports/' + id).once('value').then(function(snapshot) {
      callback(snapshot.val());
    });
  }
}

module.exports = ReportService
