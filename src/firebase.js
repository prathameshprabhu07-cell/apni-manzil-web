import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBbHtE4-Q14Bwq-dG7A7Eeky9E7OtIepWA",
  authDomain: "apni-manzil-logistics.firebaseapp.com",
  databaseURL: "https://apni-manzil-logistics-default-rtdb.firebaseio.com",
  projectId: "apni-manzil-logistics",
  storageBucket: "apni-manzil-logistics.appspot.com",
  messagingSenderId: "569502660146",
  appId: "1:569502660146:web:15f53093282298a0c64483"
};

// Firebase Initialize करा
const app = initializeApp(firebaseConfig);

// Database एक्सपोर्ट करा (इतर फाईल्समध्ये वापरण्यासाठी)
export const db = getDatabase(app);