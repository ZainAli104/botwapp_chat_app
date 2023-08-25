import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "botwapp1.firebaseapp.com",
  projectId: "botwapp1",
  storageBucket: "botwapp1.appspot.com",
  messagingSenderId: "371669546798",
  appId: "1:371669546798:web:dd2de06b601fdf1b692cbf",
  measurementId: "G-BQ2VYFXN0M"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
