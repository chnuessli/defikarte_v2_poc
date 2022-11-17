// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

/**
 * enthält vorgenerierten Code von Google Firebase um auf die API zuzugreifen
 */
const firebaseConfig = {
  apiKey: "AIzaSyDCoQJNT25n5iYu7F8R-edPOP8X4zscKlw",
  authDomain: "uploadingfile-8fce7.firebaseapp.com",
  projectId: "uploadingfile-8fce7",
  storageBucket: "uploadingfile-8fce7.appspot.com",
  messagingSenderId: "374284908923",
  appId: "1:374284908923:web:d9af24ccf790f2c44d65de"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);