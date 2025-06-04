// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

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
// const analytics = getAnalytics(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// export { app, analytics, auth, provider };
export { app, auth, provider };


// const admin = require('firebase-admin');

// After user login and you have their UID:
// admin.auth().setCustomUserClaims(uid, { role: 'admin' })
//   .then(() => {
//     // Custom claim set successfully
//   })
//   .catch(error => {
//     // Handle error
//   });