import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
  apiKey: "AIzaSyDUEf-57VafAy3GJarSZHJuuF88xwOSLh0",
  authDomain: "new-balance-63e89.firebaseapp.com",
  projectId: "new-balance-63e89",
  storageBucket: "new-balance-63e89.appspot.com",
  messagingSenderId: "37920168931",
  appId: "1:37920168931:web:84423e7f23cad8d18c9ed6",
  measurementId: "G-CS498P8N8L"
};

const app = initializeApp(firebaseConfig);

// Firebase services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); 

// Export all
export { auth, db, storage };
