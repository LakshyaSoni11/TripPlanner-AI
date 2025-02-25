// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPSyW90el4MopS978IoGA6GTK95flsfNY",
  authDomain: "ai-trip-planner-22946.firebaseapp.com",
  projectId: "ai-trip-planner-22946",
  storageBucket: "ai-trip-planner-22946.firebasestorage.app",
  messagingSenderId: "632075046547",
  appId: "1:632075046547:web:c0789e758c6e8eac280766",
  measurementId: "G-JV3W5ZX05G"
};

// Initialize Firebase

export const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);
// const analytics = getAnalytics(app);