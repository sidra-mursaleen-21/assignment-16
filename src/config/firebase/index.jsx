import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCVXVBVsb3O8ZlJelHvi432J3QgIevRNVU",
  authDomain: "assignment-no-16.firebaseapp.com",
  databaseURL: "https://assignment-no-16-default-rtdb.firebaseio.com",
  projectId: "assignment-no-16",
  storageBucket: "assignment-no-16.appspot.com",
  messagingSenderId: "867215696862",
  appId: "1:867215696862:web:0ce7f10e62ad90bcd2b34f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const database = getDatabase(app);

export { auth , database };
