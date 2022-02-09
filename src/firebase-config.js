import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
 
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAIiCDsPf_znYeG9o3WHh3ZJgXvsUfUvUk",
  authDomain: "usnaktivcampus.firebaseapp.com",
  projectId: "usnaktivcampus",
  storageBucket: "usnaktivcampus.appspot.com",
  messagingSenderId: "312134547172",
  appId: "1:312134547172:web:c5e900139156d86cf0def1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
