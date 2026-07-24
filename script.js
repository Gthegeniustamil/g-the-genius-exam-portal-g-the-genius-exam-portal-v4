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

// ===============================
// QUESTION PALETTE
// ===============================


function createPalette(){


palette.innerHTML="";


for(let i=0;i<questions.length;i++){


let btn=document.createElement("button");


btn.innerHTML=i+1;


btn.className="btn";


btn.onclick=()=>{


currentQuestion=i;

showQuestion();


};


palette.appendChild(btn);


}


}





// ===============================
// SHOW QUESTION
// ===============================


function showQuestion(){


let q=questions[currentQuestion];


questionBox.innerHTML=

`${currentQuestion+1}. ${q.question}`;


optionsBox.innerHTML="";



q.options.forEach(option=>{


let button=document.createElement("button");


button.className="btn";


button.innerHTML=option;


button.style.display="block";

button.style.margin="10px auto";



button.onclick=()=>{


userAnswers[currentQuestion]=option;


showQuestion();


};



optionsBox.appendChild(button);



});


updateProgress();


}







// ===============================
// NEXT BUTTON
// ===============================


document.getElementById("next")
?.addEventListener("click",()=>{


if(currentQuestion < questions.length-1){


currentQuestion++;


showQuestion();


}


});







// ===============================
// PREVIOUS BUTTON
// ===============================


document.getElementById("previous")
?.addEventListener("click",()=>{


if(currentQuestion>0){


currentQuestion--;


showQuestion();


}


});







// ===============================
// PROGRESS BAR
// ===============================


function updateProgress(){


let percent =

((currentQuestion+1)/questions.length)*100;



const progress =
document.getElementById("progress");



if(progress){


progress.style.width =
percent+"%";


progress.innerHTML =
Math.round(percent)+"%";


}


}

// ===============================
// TIMER
// ===============================


function startTimer(){


const timerBox =
document.getElementById("timer");


timer=setInterval(()=>{


totalTime--;


let minutes =
Math.floor(totalTime/60);


let seconds =
totalTime%60;



if(timerBox){


timerBox.innerHTML =

`${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;


}



if(totalTime <= 0){


clearInterval(timer);


submitExam();


}



},1000);


}






// ===============================
// SUBMIT EXAM
// ===============================


document.getElementById("submit")
?.addEventListener("click",()=>{


submitExam();


});





function submitExam(){


clearInterval(timer);



localStorage.setItem(

"userAnswers",

JSON.stringify(userAnswers)

);



window.location.href="result.html";


}
