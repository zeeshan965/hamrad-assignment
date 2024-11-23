import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAcIcR_C1qH9JLuOSM0-Qy4clbrjDqnWgw",
    authDomain: "digital-world-logbook-dev.firebaseapp.com",
    projectId: "digital-world-logbook-dev",
    storageBucket: "digital-world-logbook-dev.appspot.com",
    messagingSenderId: "610788060881",
    appId: "1:610788060881:web:6844111889a7f286889ff0",
    measurementId: "G-8GMMVX8DKK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
