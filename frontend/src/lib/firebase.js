// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD26NQtXhUWpxVaJQm50fk8TuDsSjFysJg",
  authDomain: "tomtep123-96fb3.firebaseapp.com",
  projectId: "tomtep123-96fb3",
  storageBucket: "tomtep123-96fb3.firebasestorage.app",
  messagingSenderId: "85435892597",
  appId: "1:85435892597:web:03a7c3408bf5b704d7c93c",
  measurementId: "G-TBQ06XJ5VD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);