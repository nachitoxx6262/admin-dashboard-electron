import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
import { getAnalytics } from "firebase/analytics";
const firebaseConfig = {
  apiKey: "AIzaSyDUSMZ99-hBo3wvdeRSXdXWGppMqm80L7c",
  authDomain: "hotel-516e3.firebaseapp.com",
  projectId: "hotel-516e3",
  storageBucket: "hotel-516e3.appspot.com",
  messagingSenderId: "775062752050",
  appId: "1:775062752050:web:b3e2627db903a68917252b",
  measurementId: "G-KQ1PS2KNTF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const analytics = getAnalytics(app);