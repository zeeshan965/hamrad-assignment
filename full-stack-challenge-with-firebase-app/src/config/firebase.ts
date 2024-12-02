import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY || "",
    authDomain: import.meta.env.VITE_AUTH_DOMAIN || "",
    projectId: import.meta.env.VITE_PROJECT_ID || "",
    storageBucket: import.meta.env.VITE_STORAGE_BUCKET || "",
    messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID || "",
    appId: import.meta.env.VITE_APP_ID || "",
    measurementId: import.meta.env.VITE_MEASUREMENT_ID || "", // Optional for Analytics
};

// Check for missing values
Object.entries(firebaseConfig).forEach(([key, value]) => {
    if (!value) {
        console.warn(`Missing Firebase config key: ${key}`);
    }
});

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
