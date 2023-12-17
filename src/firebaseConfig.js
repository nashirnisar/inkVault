import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTX8mVbqrZ6ksNdzsb9EevTQ7CojfEOgc",
  authDomain: "notekeeper-639bf.firebaseapp.com",
  projectId: "notekeeper-639bf",
  storageBucket: "notekeeper-639bf.appspot.com",
  messagingSenderId: "245666404716",
  appId: "1:245666404716:web:50f92682865779a9f8bb49",
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export { db };
