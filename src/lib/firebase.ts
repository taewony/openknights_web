// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABcwTOUG-42pNsY67jL0bKLH32XAqxJZk",
  authDomain: "openknights.firebaseapp.com",
  projectId: "openknights",
  storageBucket: "openknights.firebasestorage.app",
  messagingSenderId: "248845874248",
  appId: "1:248845874248:web:953c0735052d509d1b547d",
  measurementId: "G-Q386X35S50"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

let analytics: ReturnType<typeof getAnalytics> | undefined = undefined;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

export { app, analytics };
export const auth = getAuth(app);