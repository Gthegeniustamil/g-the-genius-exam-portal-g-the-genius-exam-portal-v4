import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const firebaseConfig = {

  apiKey: "AIzaSyAapQ1fRLiFQ6zcd5gFUpvcXfQBVBSdeH8",

  authDomain: "g-the-genius-tnusrb-portal.firebaseapp.com",

  projectId: "g-the-genius-tnusrb-portal",

  storageBucket: "g-the-genius-tnusrb-portal.firebasestorage.app",

  messagingSenderId: "749969114917",

  appId: "1:749969114917:web:5c61bcb7c8da98fef2bccc"

};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { app, auth, db };
