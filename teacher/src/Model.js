import firebase from "firebase";

export default class Model {

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

    createClassRoom(classCode, callback) {
        this.database.ref('rooms/' + classCode).set({
            timestamp: Date.now()
        });

        var commentsRef = firebase.database().ref('rooms/' + classCode);
        commentsRef.on('child_added', callback);
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    getClassCode() {
        let words = ['hest', 'ko', 'ged', 'giraf', 'løve', 'kat', 'gris', 'hund', 'får', 'tiger'];
        let coulors = ['grøn', 'rød', 'gul', 'hvid', 'orange', 'lilla', 'sort', 'blå', 'brun', 'rosa'];
        return words[this.getRandomInt(words.length)] + this.getRandomInt(100) + coulors[this.getRandomInt(coulors.length)];
    }
}