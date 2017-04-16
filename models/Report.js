class Report {
  name;
  longitude;
  latitude;
  description;
  foodtype;
  timestamp;

  constructor(name, longitude, latitude, description, foodtype, timestamp) {
    this.name = name;
    this.longitude = longitude;
    this.latitude = latitude;
    this.description = description;
    this.foodtype = foodtype;
    this.timestamp = timestamp;
  }
}

module.exports = Report
