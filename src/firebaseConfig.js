import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth"; // 👈 ही नवीन लाईन ॲड केली

const firebaseConfig = {
  apiKey: "AIzaSy...", 
  authDomain: "apni-manzil.firebaseapp.com",
  projectId: "apni-manzil",
  storageBucket: "apni-manzil.appspot.com",
  messagingSenderId: "7378502356",
  appId: "1:7378502356:web:...",
  databaseURL: "https://apni-manzil-default-rtdb.firebaseio.com/"
};

// अ‍ॅप सुरू आहे की नाही तपासा
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);
const rtdb = getDatabase(app);
const auth = getAuth(app); // 👈 ही नवीन लाईन ॲड केली

export { db, rtdb, app, auth }; // 👈 इथे 'auth' बाहेर पाठवला (Export)