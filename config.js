import firebase from 'firebase';
require('@firebase/firestore');
var firebaseConfig = {
    apiKey: "AIzaSyApRt0LrNkfB3q9tmtO9xlRjrtHouJANUE",
    authDomain: "passwordapp-67fca.firebaseapp.com",
    projectId: "passwordapp-67fca",
    storageBucket: "passwordapp-67fca.appspot.com",
    messagingSenderId: "349372997626",
    appId: "1:349372997626:web:4e91c73bf21194876f0e43"
  };
  // Initialize Firebase
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
  }
export default firebase.firestore();