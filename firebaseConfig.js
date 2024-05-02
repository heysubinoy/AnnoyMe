// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqLIadhTAoz0EVhP5jCQwdVDBYvSjjsrU",
  authDomain: "annoyme-6fd45.firebaseapp.com",
  databaseURL: "https://annoyme-6fd45-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "annoyme-6fd45",
  storageBucket: "annoyme-6fd45.appspot.com",
  messagingSenderId: "685329768652",
  appId: "1:685329768652:web:836ec69c7565618c34a269",
  measurementId: "G-70FBJX1ZXK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export default database;