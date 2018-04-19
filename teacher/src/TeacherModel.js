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

    checkForClassRoom(classCode, callback){
        this.database.ref('rooms/' + classCode).once('value').then((response)=>{
            var val = response.val();
            var exist = val.subject ? true : false;
            callback(exist);
        });  
    }

    createClassRoom(classCode, subject, callback) {
        this.database.ref('rooms/' + classCode).set({
            timestamp: Date.now(),
            subject: subject
        });

        firebase.database().ref('rooms/' + classCode).on('child_added', callback);
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    getClassCode() {
        let words = ['heste', 'køer', 'geder', 'girafer', 'løver', 'katte', 'grise', 'hunde', 'får', 'tigere'];
        let colors = ['grønne', 'røde', 'gule', 'hvide', 'orange', 'lilla', 'sorte', 'blå', 'brune', 'rosa'];
        return  (this.getRandomInt(99) + 1) + ' ' + colors[this.getRandomInt(colors.length)] + ' ' + words[this.getRandomInt(words.length)];
    }
}