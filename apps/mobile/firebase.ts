import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';

// Importa las funciones necesarias de Firebase

// Configuración de Firebase para tu aplicación
const firebaseConfig = {
    apiKey: "AIzaSyBgQKvSYRhimVRomnacnP5qWFPNRM9EyeI",
    authDomain: "hermandapp-bed16.firebaseapp.com",
    projectId: "hermandapp-bed16",
    storageBucket: "hermandapp-bed16.firebasestorage.app",
    messagingSenderId: "326574651601",
    appId: "1:326574651601:android:3d0dff72c9084b17322df0"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

// Inicializa Analytics si es necesario
const analytics = getAnalytics(app);

export { app, analytics };