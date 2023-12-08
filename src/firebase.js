// Import the functions you need from the SDKs you need
import configs from "../configs";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// Initialize Firebase
const app = initializeApp(configs.firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
