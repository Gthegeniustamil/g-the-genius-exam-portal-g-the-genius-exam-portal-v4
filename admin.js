/*
G THE GENIUS TNUSRB PORTAL V4
ADMIN PANEL
*/


import { db }
from "./firebase-config.js";



import {

collection,
addDoc,
getDocs,
deleteDoc,
doc

}

from

"https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";





const addButton =
document.getElementById("addQuestion");



const list =
document.getElementById("questionList");







// Add Question


addButton?.addEventListener("click",async()=>{



const question =
document.getElementById("question").value;


const options=[

document.getElementById("option1").value,

document.getElementById("option2").value,

document.getElementById("option3").value,

document.getElementById("option4").value

];


const answer =
document.getElementById("answer").value;


const explanation =
document.getElementById("explanation").value;





try{


await addDoc(

collection(db,"questions"),

{

question,

options,

answer,

explanation,

createdAt:new Date()

}

);



alert("Question Added Successfully");


loadQuestions();


}


catch(error){


alert(error.message);


}



});









// Load Questions


async function loadQuestions(){



if(!list) return;



const snapshot =

await getDocs(

collection(db,"questions")

);



list.innerHTML="";




snapshot.forEach(item=>{


const data=item.data();



list.innerHTML +=


`

<div class="glass-card">


<p>
${data.question}
</p>



<button

class="btn"

onclick="deleteQuestion('${item.id}')">

Delete

</button>


</div>


`;



});



}







// Delete Question


window.deleteQuestion = async(id)=>{


await deleteDoc(

doc(db,"questions",id)

);



alert("Deleted");


loadQuestions();


};





loadQuestions();
