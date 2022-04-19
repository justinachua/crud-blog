import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    // apiKey: "AIzaSyCP_Hpz1OJP4pwtL9FJBcgE5oC6EH1HNGo",
    // authDomain: "blog-15df6.firebaseapp.com",
    // projectId: "blog-15df6",
    // storageBucket: "blog-15df6.appspot.com",
    // messagingSenderId: "117256505007",
    // appId: "1:117256505007:web:92b12894a907dfb082f65a",
    // measurementId: "G-RSEVVW30WV"
    apiKey: "AIzaSyDySl7hfsCjKqJnxofVS26B8vschRXPPQg",
    authDomain: "blog-3-5303c.firebaseapp.com",
    projectId: "blog-3-5303c",
    storageBucket: "blog-3-5303c.appspot.com",
    messagingSenderId: "224999896160",
    appId: "1:224999896160:web:e9b41fdf777509589abf05",
    measurementId: "G-5QJ9T67BSW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
