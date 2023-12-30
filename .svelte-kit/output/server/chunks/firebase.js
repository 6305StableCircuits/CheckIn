import { initializeApp } from "firebase/app";
import "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { w as writable } from "./index2.js";
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
const auth = getAuth(app);
const db = getFirestore(app);
const userState = writable(void 0);
onAuthStateChanged(auth, (user) => {
  if (user) {
    userState.set(user);
  } else {
    userState.set(false);
  }
});
export {
  db as d,
  userState as u
};
