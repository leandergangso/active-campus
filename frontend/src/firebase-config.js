import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseApp = initializeApp({
  apiKey: "AIzaSyAfAc0QIGm5EMTHhlBlw23UNgBGsqFHdJs",
  authDomain: "active-campus.firebaseapp.com",
  projectId: "active-campus",
  storageBucket: "active-campus.appspot.com",
  messagingSenderId: "13792509240",
  appId: "1:13792509240:web:b853d30f05482dc19595cd"
})

// services
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth }