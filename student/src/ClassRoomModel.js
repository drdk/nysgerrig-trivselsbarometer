import firebase from "firebase";
import Store from './Store';

export default class ClassRoomModel {

    constructor() {
        if (firebase.apps.length) {
            this.fire = firebase.app;
        } else {
            this.fire = firebase.initializeApp({
                apiKey: "AIzaSyB7vEPyIcavfuOIzdL7hB3wKlJzRM9wZPE",
                authDomain: "trivselsbarometer.firebaseapp.com",
                databaseURL: "https://trivselsbarometer.firebaseio.com",
                projectId: "trivselsbarometer",
                storageBucket: "trivselsbarometer.appspot.com",
                messagingSenderId: "767392045294"
            });
        }

        this.database = firebase.database();
    }

    login(classCode, callback) {
        var innerCallback = (loginData) => {
            Store.classCode = classCode;
            callback(loginData);
        };

        this.database.ref('rooms/' + classCode).once('value').then(innerCallback);        
    }

    submitAnswer() {
        let answer = {
            state: Store.condition,
            feelings: Store.feelings
        };
        
        this.database.ref('rooms/' + Store.classCode).push(answer);
    }
}