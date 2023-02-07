// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import 'firebase/auth';
// import Constants from "expo-constants";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCK72VQp2c7MCS7Z9pLjYCmWzUZUvvq8Xg",
  authDomain: "swingcapital-9e531.firebaseapp.com",
  projectId: "swingcapital-9e531",
  storageBucket: "swingcapital-9e531.appspot.com",
  messagingSenderId: "1095569946706",
  appId: "1:1095569946706:web:83f2962ce95b8f41e6478b",
  measurementId: "G-H5S50G07W5"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;

