/*
G THE GENIUS TNUSRB EXAM PORTAL V4
Main JavaScript File
*/


document.addEventListener("DOMContentLoaded", () => {


    console.log("G THE GENIUS TNUSRB Portal Loaded Successfully");


    // Smooth Scroll

    const links = document.querySelectorAll("a");


    links.forEach(link => {

        link.addEventListener("click", () => {

            console.log("Opening:", link.href);

        });

    });



});



// ===============================
// TNUSRB MOCK TEST ENGINE
// ===============================

// ===============================
// FIREBASE QUESTION LOADER
// ===============================


import { db } from "./firebase-config.js";


import {

collection,
getDocs

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";



let questions = [];

let currentQuestion = 0;

let userAnswers = [];

let totalTime = 1200;

let timer;



const questionBox =
document.getElementById("question");


const optionsBox =
document.getElementById("options");


const palette =
document.getElementById("palette");



if(questionBox){


loadQuestions();


}



async function loadQuestions(){


const snapshot = await getDocs(

collection(db,"questions")

);



questions=[];


snapshot.forEach((doc)=>{


questions.push(doc.data());


});



questions = questions
.sort(()=>Math.random()-0.5)
.slice(0,20);



userAnswers =
new Array(questions.length).fill(null);



createPalette();

showQuestion();

startTimer();


}

// இங்கிருந்து நான் கொடுத்த
// questions
// timer
// palette
// answer save
// submit code
// paste செய்யவும்
