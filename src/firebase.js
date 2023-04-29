import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "chat-app-1db76.firebaseapp.com",
  projectId: "chat-app-1db76",
  storageBucket: "chat-app-1db76.appspot.com",
  messagingSenderId: "501756577540",
  appId: "1:501756577540:web:95d0917c0a2b1e2f82f251",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore();
