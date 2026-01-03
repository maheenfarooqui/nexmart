import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKz0PRAEp8D_rpS6ZBDJ87iKDeY6TrvEM",
  authDomain: "nexmart-a442f.firebaseapp.com",
  projectId: "nexmart-a442f",
  storageBucket: "nexmart-a442f.firebasestorage.app",
  messagingSenderId: "1025501357666",
  appId: "1:1025501357666:web:1375888ebcb41b8309933b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);