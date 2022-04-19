import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
apiKey: "AIzaSyAdEt8PrcgHri99An3nf1eFMmPOsz9eHLk",
  authDomain: "blog-4-86422.firebaseapp.com",
  projectId: "blog-4-86422",
  storageBucket: "blog-4-86422.appspot.com",
  messagingSenderId: "557746144440",
  appId: "1:557746144440:web:7a0e5fd2a9880d8922204d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
