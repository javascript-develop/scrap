// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCQTrYh98_7Cj5caRbU9_ALjHyoeV59BR8",
  authDomain: "course-commerse.firebaseapp.com",
  projectId: "course-commerse",
  storageBucket: "course-commerse.appspot.com",
  messagingSenderId: "544312624739",
  appId: "1:544312624739:web:2eaa39267dad5457851a56",
  measurementId: "G-CBDXNYMGHS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app)
// const analytics = getAnalytics(app);
export default auth