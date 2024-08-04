// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDL51YWY__YB-kk5YV7ehvOshwdfANqHUM",
  authDomain: "inventory-40a06.firebaseapp.com",
  projectId: "inventory-40a06",
  storageBucket: "inventory-40a06.appspot.com",
  messagingSenderId: "888255408819",
  appId: "1:888255408819:web:a3eca2423dc961f211dec6",
  measurementId: "G-BE060HV2WL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app)

export {firestore}