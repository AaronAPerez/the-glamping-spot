import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyC3rwnJh5xKU8UM6b5sJ4Nb-jhxDe1awHo",
  authDomain: "the-glamping-spot.firebaseapp.com",
  databaseURL: "https://the-glamping-spot-default-rtdb.firebaseio.com",
  projectId: "the-glamping-spot",
  storageBucket: "the-glamping-spot.firebasestorage.app",
  messagingSenderId: "485134608005",
  appId: "1:485134608005:web:b19acc8b793c264883abec",
  measurementId: "G-SHQTKNZFBM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, analytics, db, auth };