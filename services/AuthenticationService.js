import { Observable } from 'rxjs';
import * as firebase from 'firebase';

class AuthenticationService {

    /**
     * Returns a promise to authenticate a user with the given email
     * and password.
     * 
     * @static
     * @param {any} email 
     * @param {any} password 
     * @returns Promise
     * 
     * @memberOf AuthenticationService
     */
    static signInWithEmailAndPassword(email, password) {
        return firebase.auth().signInWithEmailAndPassword(email, password)
    }

    /**
     * Returns a promise to create a user with the given email and
     * password.
     * 
     * @static
     * @param {any} email 
     * @param {any} password 
     * @returns Promise
     * 
     * @memberOf AuthenticationService
     */
    static createUserWithEmailAndPassword(email, password) {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(function(user) {
            firebase.database().ref('users/' + user.uid).set({
                email: email
            });
        })
    }

    /**
     * Returns a promise to sign out the current user.
     * 
     * @static
     * @param {any} email 
     * @param {any} password 
     * @returns Promise
     * 
     * @memberOf AuthenticationService
     */
    static signOut() {
        return firebase.auth().signOut()
    }

    /**
     * Creates an RX observable which will watch for changes in
     * auth state and notify the observer.
     * 
     * @static
     * @returns Observable
     * 
     * @memberOf AuthenticationService
     */
    static onAuthStateChanged() {
        return Observable.create(obs => {
            return firebase.auth().onAuthStateChanged(
                user => obs.next(user),
                err => obs.error(err),
                () => obs.complete());
        })
    }

}

module.exports = AuthenticationService; 