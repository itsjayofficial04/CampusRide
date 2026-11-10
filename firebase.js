import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

import { getDatabase } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-database.js";

import {
  getAuth,
  signInAnonymously
} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";


const firebaseConfig = {
  apiKey: "AIzaSyCnh1H3BNotL5inHEBcy_xbCZDaGHb6j18",
  authDomain: "campus-ride-a4b8c12d16.firebaseapp.com",

  databaseURL: "https://campus-ride-a4b8c12d16-default-rtdb.asia-southeast1.firebasedatabase.app",

  projectId: "campus-ride-a4b8c12d16",
  storageBucket: "campus-ride-a4b8c12d16.firebasestorage.app",
  messagingSenderId: "1096018552228",
  appId: "1:1096018552228:web:d9784529ee5779bb628d31",
  measurementId: "G-TE7VFC942E"
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

const auth = getAuth(app);

// Anonymous sign-in
signInAnonymously(auth)
  .then(() => {
    console.log("CampusRide Anonymous Authentication Successful!");
  })
  .catch((error) => {
    console.error("Authentication Error:", error);
  });

export { app, database, auth };
