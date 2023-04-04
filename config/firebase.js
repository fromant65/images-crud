// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUPjQ4__lDVpEwRt9vQiDlc5-t_ID70Bk",
  authDomain: "imagescrud-de0a6.firebaseapp.com",
  projectId: "imagescrud-de0a6",
  storageBucket: "imagescrud-de0a6.appspot.com",
  messagingSenderId: "946981267607",
  appId: "1:946981267607:web:fad67294d69d78c225e1d2",
  measurementId: "G-9ZZWFD242J",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
const analytics = getAnalytics(app);
