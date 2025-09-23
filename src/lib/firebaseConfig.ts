// Firebase initialization for Sanaa Scope
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA0QF3CVy6r-WdQXws6tYRCog-zMoPMgFA",
  authDomain: "sanaa-254ke.firebaseapp.com",
  projectId: "sanaa-254ke",
  storageBucket: "sanaa-254ke.firebasestorage.app",
  messagingSenderId: "198802223480",
  appId: "1:198802223480:web:aef50044cda0152800d88d",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();