// =====================================
// G THE GENIUS EXAM PORTAL
// FIREBASE CONFIG
// =====================================


import { initializeApp } from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";


import { 
getAuth 
} from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


import { 
getFirestore 
} from 
"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



// PASTE YOUR FIREBASE DETAILS HERE

const firebaseConfig = {


apiKey: "YOUR_API_KEY",


authDomain: "YOUR_PROJECT.firebaseapp.com",


projectId: "YOUR_PROJECT_ID",


storageBucket: "YOUR_PROJECT.appspot.com",


messagingSenderId: "YOUR_SENDER_ID",


appId: "YOUR_APP_ID"


};




// Initialize Firebase

const app = initializeApp(firebaseConfig);



// Authentication

const auth = getAuth(app);



// Firestore Database

const db = getFirestore(app);




// Export

export {

app,

auth,

db

};
