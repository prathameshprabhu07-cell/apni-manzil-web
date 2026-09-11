import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBbHtE4-Q14Bwq-dO7A7Eeky9E7OtiEpWA",
  authDomain: "apni-manzil-logistics.firebaseapp.com",
  databaseURL: "https://apni-manzil-logistics-default-rtdb.firebaseio.com",
  projectId: "apni-manzil-logistics",
  storageBucket: "apni-manzil-logistics.firebasestorage.app",
  messagingSenderId: "717825908108",
  appId: "1:717825908108:web:2a4631e53d42c62e32caa9",
  measurementId: "G-R401B7GCPG"
};

const app = getApps().length > 0
  ? getApp()
  : initializeApp(firebaseConfig);

const db = getFirestore(app);
const rtdb = getDatabase(app);
const auth = getAuth(app);

export { db, rtdb, app, auth };