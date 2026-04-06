import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// १. Firestore: ऑर्डर्स आणि वेंडर डेटा स्टोअर करण्यासाठी
export const db = getFirestore(app);

// २. Realtime DB: लाईव्ह ट्रॅकिंग (Live Map) साठी
export const rtdb = getDatabase(app);