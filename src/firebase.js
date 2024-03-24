import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


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



const uploadToFirebase = async (file, userEmail) => {
  try {
    // Create a reference to the Firebase storage bucket with a new folder path
    const folderName = 'products'; // Specify the name of the folder
    const folderRef = ref(storage, `${folderName}/${Date.now()}_/${file.name}`);
    
    // Upload the file to Firebase storage
    await uploadBytes(folderRef, file);
    
    // Get the download URL for the uploaded file
    const downloadUrl = await getDownloadURL(folderRef);
    
    // Return the download URL
    return downloadUrl;
  } catch (error) {
    console.error('Error uploading file to Firebase:', error);
    throw error;
  }
};

export { app, db, auth, storage, uploadToFirebase };
