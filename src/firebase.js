import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyDEcWAwv41fLBLoNg42vUPIVi-BdbqgoK0",
    authDomain: "edau-farm.firebaseapp.com",
    projectId: "edau-farm",
    storageBucket: "edau-farm.appspot.com",
    messagingSenderId: "85910236432",
    appId: "1:85910236432:web:9cb144cd93eb7cc7cf8995",
    measurementId: "G-PSYJTFNTHW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);



export { app, db, auth, storage };
