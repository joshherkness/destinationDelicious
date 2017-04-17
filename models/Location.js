class Location {
    longitude;
    latitude;
    timestamp;

    constructor(longitude, latitude, timestamp) {
        this.longitude = longitude;
        this.latitude = latitude;
        this.timestamp = timestamp;
    }
}

module.exports = Location