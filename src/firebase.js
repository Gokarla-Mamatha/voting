// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6smdUClVzkLiCgRrgX9YwFEC8UvJKOx0",
  authDomain: "school-election-7ecd0.firebaseapp.com",
  projectId: "school-election-7ecd0",
  storageBucket: "school-election-7ecd0.firebasestorage.app",
  messagingSenderId: "546581874756",
  appId: "1:546581874756:web:8cf908f8d8bda817911411",
  measurementId: "G-YZVEGLQDX2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };