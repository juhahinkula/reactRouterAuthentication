import firebase from 'firebase';

// Change you firebase settings here 
const firebaseConfig = {
  apiKey: "AIzaSyBeds8KY-Jw6gbcxgzhw9rRkmEc3Bm2ISc",
  authDomain: "reactauthentication-8ba67.firebaseapp.com",
  databaseURL: "https://reactauthentication-8ba67.firebaseio.com",
  projectId: "reactauthentication-8ba67",
  storageBucket: "reactauthentication-8ba67.appspot.com",
  messagingSenderId: "315993440137"
};

firebase.initializeApp(firebaseConfig);

export const firebaseAuth = firebase.auth;
