// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIHcz2-kc5e1i4aeNSBOTvJwyTR7HvJ-E",
  authDomain: "busy-buy-f2da4.firebaseapp.com",
  projectId: "busy-buy-f2da4",
  storageBucket: "busy-buy-f2da4.appspot.com",
  messagingSenderId: "167124679204",
  appId: "1:167124679204:web:01bd0906d7dbc4497ef6b1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app)

export default db;