import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
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
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };

