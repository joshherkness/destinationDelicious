import Location from '../models/Location';
import { Observable } from 'rxjs';

const geofire = require('geofire');

/**
 * Rxjs wrapper for navigator.geolocation
 * 
 * @class LocationService
 */
class LocationService {

  /**
   * Creates an RX observable which will observe the
   * location of the current device.  An error will be returned
   * if the location cannot be retrieved.
   * 
   * @static
   * @param {any} options 
   * @returns 
   * 
   * @memberOf LocationService
   */
  static getCurrentLocation(options) {
    return Observable.create((observer) => {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          // Create the location object from the position.
          let loc = new Location(
            pos.coords.longitude,
            pos.coords.latitude,
            pos.timestamp
          );
          observer.next(loc);
        },
        (err) => {
          observer.error(err);
        }, options);
    });
  }

  /**
   * Creates an RX observable which will watch the location of 
   * the current device.  An error will be returned if the loc-
   * ation cannot be retrieved.
   * 
   * @static
   * @param {any} options 
   * @returns 
   * 
   * @memberOf LocationService
   */
  static watchLocation(options) {
    return Observable.create((observer) => {
      var watchId = navigator.geolocation.watchPosition(
        (pos) => {
          // Create the location object from the position.
          let loc = new Location(
            pos.coords.longitude,
            pos.coords.latitude,
            pos.timestamp
          );
          observer.next(loc)
        },
        (err) => {
          observer.error(err);
        }, options);

      return () => {
        // Called upon unsubscribe.
        navigator.geolocation.clearWatch(watchId);
      };
    }).publish().refCount();
  }

  
  /**
   * Returns the distance between a start and end location in meters.
   * 
   * @static
   * @param {Location} start 
   * @param {Location} end 
   * @returns 
   * 
   * @memberOf LocationService
   */
  static distanceBetween(start, end) {
    // Distance in km
    let distance = geofire.distance([start.latitude, start.longitude], [end.latitude, end.longitude]);
    // Distance in m
    return distance * 1000;
  }
}

module.exports = LocationService; 