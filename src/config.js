import firebase from 'firebase';

// Change you firebase settings here 
const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: ""
};

firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebase.auth;
