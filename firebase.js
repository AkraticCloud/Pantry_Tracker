// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile, updateEmail, sendEmailVerification, updatePassword, sendPasswordResetEmail, deleteUser, reauthenticateWithCredential, signOut, sendSignInLinkToEmail, getASecureRandomPassword, promptForCredentials } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeH18NI-L9hrWz_3lBMTpsbyDSks5pmbM",
  authDomain: "pantry-tracker-af61d.firebaseapp.com",
  projectId: "pantry-tracker-af61d",
  storageBucket: "pantry-tracker-af61d.appspot.com",
  messagingSenderId: "1029655273374",
  appId: "1:1029655273374:web:1ad39173c8feae1ef0408f",
  measurementId: "G-Z1903ERCRM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const firestore = getFirestore(app)

export {firestore}