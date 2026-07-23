/*
G THE GENIUS TNUSRB EXAM PORTAL V4
Firebase Configuration File
*/


// Firebase SDK imports
// Firebase Console-ல் உங்கள் Project உருவாக்கிய பிறகு
// கீழே உள்ள values-ஐ மாற்ற வேண்டும்


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



const auth = getAuth(app);


const db = getFirestore(app);





export { auth, db };
