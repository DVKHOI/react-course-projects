import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCyyI3j3hd5ObfQe5I2YPwVSCN27sn4lJM",
  authDomain: "sneaker-bloging.firebaseapp.com",
  projectId: "sneaker-bloging",
  storageBucket: "sneaker-bloging.appspot.com",
  messagingSenderId: "999477756363",
  appId: "1:999477756363:web:b78f3e3fe67f6b5af5b64e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth = getAuth(app);
