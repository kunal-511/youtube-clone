// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyBvhFH2Jj7DxnOYMZNidbh-TAx5zwrOEvo",
  authDomain: "clone-7953f.firebaseapp.com",
  projectId: "clone-7953f",
  storageBucket: "clone-7953f.appspot.com",
  messagingSenderId: "226121041660",
  appId: "1:226121041660:web:9f231d8878b85ad6583979",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export default app;
