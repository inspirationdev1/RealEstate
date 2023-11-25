// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "realestate-e8563.firebaseapp.com",
  projectId: "realestate-e8563",
  storageBucket: "realestate-e8563.appspot.com",
  messagingSenderId: "809769800451",
  appId: "1:809769800451:web:d348f53e46f81522bbcf36"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);