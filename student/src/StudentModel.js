import firebase from "firebase";

export default class StudentModel {

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
        this.database.ref('rooms/' + classCode).once('value').then(callback);

        this.addStateAndFealings(classCode);
    }

    addStateAndFealings(classCode) {
        let studentAnswer = {
            state: 'afslappet',
            fealings: ['sommerfugle i maven', 'glad']
        };
        this.database.ref('rooms/' + classCode).push(studentAnswer);
    }

}
