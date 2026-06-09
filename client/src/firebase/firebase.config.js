// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
const firebaseApiKey = import.meta.env.VITE_FIREBASE_API_KEY; 


const firebaseConfig = {
  apiKey:firebaseApiKey,
  authDomain:"mern-restaurant-app.firebaseapp.com",
  projectId: "mern-restaurant-app",
  storageBucket: "mern-restaurant-app.firebasestorage.app",
  messagingSenderId: "515307767984",
  appId: "1:515307767984:web:bc180afe4fde4f99709375",
  measurementId: "G-12KJXYEHNJ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); 

export {app, analytics, auth} ;
