
import firebase from "firebase/compat/app";
import {getAuth} from 'firebase/auth';
import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCrfGWcZznDmnpW_sLwwgUbtEev4UZD_G0",
  authDomain: "proj-bc0df.firebaseapp.com",
  projectId: "proj-bc0df",
  storageBucket: "proj-bc0df.appspot.com",
  messagingSenderId: "1076453799472",
  appId: "1:1076453799472:web:8cc3df4c878c55dcf01ff5",
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = app.firestore() 