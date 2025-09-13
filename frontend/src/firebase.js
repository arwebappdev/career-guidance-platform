// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // 👈 Import firestore

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAu1Tcfy0nLnltpZluJo6St96xU0MMpd8",
  authDomain: "paramarsh-af0be.firebaseapp.com",
  projectId: "paramarsh-af0be",
  storageBucket: "paramarsh-af0be.firebasestorage.app",
  messagingSenderId: "712852917524",
  appId: "1:712852917524:web:62eb2eac2b3ce6ef6b8601",
  measurementId: "G-TLN1M2RTT2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app); // 👈 Initialize and export firestore