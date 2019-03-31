import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth' 
import 'firebase/storage'


// Initialize Firebase
var config = {
    apiKey: "AIzaSyBLea3SENzTDx8fHj3oo3vktAF-7B3jyXQ",
    authDomain: "blinq-43545.firebaseapp.com",
    databaseURL: "https://blinq-43545.firebaseio.com",
    projectId: "blinq-43545",
    storageBucket: "blinq-43545.appspot.com",
    messagingSenderId: "234958171789"
};

class Firebase {
    constructor() {
        if (!firebase.apps.length) {
            firebase.initializeApp(config);
        }

        this.db = firebase.database();
        this.auth = firebase.auth();
        this.storage = firebase.storage();
    }
}

export default Firebase;
