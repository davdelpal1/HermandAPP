import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBa48T8X9LC95zI5lKZpOAD5DalmGuCytI",
  authDomain: "hermandapp-bed16.firebaseapp.com",
  projectId: "hermandapp-bed16",
  storageBucket: "hermandapp-bed16.firebasestorage.app",
  messagingSenderId: "326574651601",
  appId: "1:326574651601:web:fc34c05902155f2b322df0"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
