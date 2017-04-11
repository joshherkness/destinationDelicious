import Location from '../models/Location';

/*
 * Wrapper for navigator.geolocation
 */
class LocationService {

    /*
     * Promise to retrieve the current position of the device.
     */
    static getCurrentPosition(options) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((position)=> {
                let location = new Location(
                    position.coords.longitude,
                    position.coords.latitude,
                    position.timestamp
                );
                resolve(location);
            }, reject, options);
        });
    }

    /*
     * Promise to watch the current position of the device.
     */
    static watchPosition(options) {
        return new Promise((resolve, reject) => {
            var watchId = navigator.geolocation.getCurrentPosition((position)=> {
                let location = new Location(
                    position.coords.longitude,
                    position.coords.latitude,
                    position.timestamp
                );
                resolve(location, watchId);
            }, reject, options);
        });
    }

    /*
     * Clear a watch given a watch id.
     */
    static clearWatch(watchId) {
        return navigator.geolocation.clearWatch(watchId);
    }
}

module.exports = LocationService; 