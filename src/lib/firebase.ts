// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { onAuthStateChanged, getAuth, type User } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { writable, type Writable } from "svelte/store";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDX1sMQSCKuVToRtDtWTEhMmJQ1OdmliK4",
  authDomain: "shop-checkin.firebaseapp.com",
  projectId: "shop-checkin",
  storageBucket: "shop-checkin.appspot.com",
  messagingSenderId: "94161857717",
  appId: "1:94161857717:web:1078db0affe418772b62fc",
  measurementId: "G-LT9BFG8F7R"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

export const userState: Writable<User | false | undefined> = writable(undefined);
onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      userState.set(user);
      // ...
    } else {
      // User is signed out
      // ...
      userState.set(false);
    }
  });
