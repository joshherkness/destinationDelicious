import * as firebase from "firebase";

class Firebase {
  static initialise() {
    firebase.initializeApp({
      apiKey: "AIzaSyCdndiS6rlCzlORIn5oQ4m5oPL9jsV0AhE",
      authDomain: "destination-delicious.firebaseapp.com",
      databaseURL: "https://destination-delicious.firebaseio.com",
      projectId: "destination-delicious",
      storageBucket: "destination-delicious.appspot.com",
      messagingSenderId: "26242783843"
    });
  }
}

module.exports = Firebase;
