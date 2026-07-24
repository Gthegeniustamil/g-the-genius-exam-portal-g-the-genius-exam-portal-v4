// =====================================================
// G THE GENIUS TNUSRB EXAM PORTAL v4
// script.js - PART 1
// =====================================================

"use strict";

// ===============================
// IMPORT FIREBASE
// ===============================

import { db, auth } from "./firebase-config.js";

import {
  collection,
  getDocs,
  addDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// ===============================
// VARIABLES
// ===============================

const TOTAL_QUESTIONS = 20;
const TEST_TIME = 20 * 60;

let allQuestions = [];
let selectedQuestions = [];
let userAnswers = [];

let currentQuestion = 0;
let timeLeft = TEST_TIME;
let timerInterval = null;

// ===============================
// STUDENT OBJECT
// ===============================

const student = {
  name: "",
  mobile: "",
  email: "",
  district: "",
  exam: "",
  score: 0,
  percentage: 0
};

// ===============================
// DOM ELEMENTS
// ===============================

const studentBox = document.getElementById("studentBox");
const testArea = document.getElementById("testArea");
const resultArea = document.getElementById("resultArea");

const questionsDiv = document.getElementById("questions");
const timer = document.getElementById("timer");

const studentName = document.getElementById("studentName");
const mobile = document.getElementById("mobile");
const email = document.getElementById("email");
const district = document.getElementById("district");
const examType = document.getElementById("examType");

// ===============================
// LOAD QUESTIONS FROM FIRESTORE
// ===============================

async function loadQuestions() {

  try {

    const snapshot = await getDocs(
      collection(db, "questions")
    );

    allQuestions = [];

    snapshot.forEach((doc) => {
      allQuestions.push(doc.data());
    });

    console.log("Questions Loaded:", allQuestions.length);

  } catch (error) {

    console.error(error);

    alert("Questions Load Error");

  }

}

// ===============================
// PAGE LOAD
// ===============================

document.addEventListener("DOMContentLoaded", async () => {

  await loadQuestions();

  console.log("Page Ready");

  const startBtn = document.getElementById("startBtn");

  if (startBtn) {

    startBtn.addEventListener("click", startTest);

    console.log("Start Button Connected");

  }

});

// =====================================================
// PART 2
// STUDENT VALIDATION + START TEST
// =====================================================

// ===============================
// VALIDATE STUDENT
// ===============================

function validateStudent() {

  if (studentName.value.trim() === "") {
    alert("Please enter your name");
    studentName.focus();
    return false;
  }

  if (!/^[6-9][0-9]{9}$/.test(mobile.value.trim())) {
    alert("Enter a valid mobile number");
    mobile.focus();
    return false;
  }

  if (district.value === "") {
    alert("Please select your district");
    district.focus();
    return false;
  }

  return true;
}

// ===============================
// SAVE STUDENT DETAILS
// ===============================

function saveStudentDetails() {

  student.name = studentName.value.trim();
  student.mobile = mobile.value.trim();
  student.email = email.value.trim();
  student.district = district.value;
  student.exam = examType.value;

}

// ===============================
// RANDOM QUESTIONS
// ===============================

function prepareQuestions() {

  selectedQuestions = [...allQuestions];

  selectedQuestions.sort(() => Math.random() - 0.5);

  selectedQuestions = selectedQuestions.slice(0, TOTAL_QUESTIONS);

}

// ===============================
// START TEST
// ===============================

function startTest() {

  if (!validateStudent()) return;

  if (allQuestions.length < TOTAL_QUESTIONS) {
    alert("Questions are not available.");
    return;
  }

  saveStudentDetails();

  prepareQuestions();

  userAnswers = [];

  currentQuestion = 0;

  student.score = 0;

  student.percentage = 0;

  studentBox.style.display = "none";

  testArea.style.display = "block";

  timeLeft = TEST_TIME;

  startTimer();

  showQuestion();

}

// =====================================================
// PART 3
// SHOW QUESTIONS
// =====================================================

// ===============================
// SHOW QUESTION
// ===============================

function showQuestion() {

    const q = selectedQuestions[currentQuestion];

    let html = `
    <div class="card">

        <h3>
        Question ${currentQuestion + 1} / ${TOTAL_QUESTIONS}
        </h3>

        <h2 style="margin-bottom:20px;">
        ${q.question}
        </h2>
    `;

    q.options.forEach((option, index) => {

        const checked =
            userAnswers[currentQuestion] === option
            ? "checked"
            : "";

        html += `
        <label class="option">

            <input
                type="radio"
                name="answer"
                value="${option}"
                ${checked}
            >

            ${index + 1}. ${option}

        </label>
        <br>
        `;

    });

    html += `

    <br>

    <div style="display:flex;gap:15px;justify-content:center;flex-wrap:wrap;">

        <button
            class="btn"
            onclick="previousQuestion()"
            ${currentQuestion === 0 ? "disabled" : ""}
        >
            ⬅ Previous
        </button>

        <button
            class="btn"
            onclick="nextQuestion()"
        >
            ${
                currentQuestion === TOTAL_QUESTIONS - 1
                ? "✅ Submit Test"
                : "Next ➜"
            }
        </button>

    </div>

    </div>
    `;

    questionsDiv.innerHTML = html;

}

// ===============================
// SAVE CURRENT ANSWER
// ===============================

function saveCurrentAnswer() {

    const selected =
        document.querySelector(
            'input[name="answer"]:checked'
        );

    if (selected) {

        userAnswers[currentQuestion] =
            selected.value;

    }

        }

// =====================================================
// PART 4
// TIMER + NEXT + PREVIOUS
// =====================================================

// ===============================
// START TIMER
// ===============================

function startTimer() {

    clearInterval(timerInterval);

    timerInterval = setInterval(() => {

        let minutes = Math.floor(timeLeft / 60);

        let seconds = timeLeft % 60;

        if (timer) {

            timer.innerHTML =
                "⏳ Time Left : " +
                String(minutes).padStart(2, "0") +
                ":" +
                String(seconds).padStart(2, "0");

        }

        timeLeft--;

        if (timeLeft < 0) {

            clearInterval(timerInterval);

            alert("⏰ Time Over!");

            submitTest();

        }

    }, 1000);

}

// ===============================
// STOP TIMER
// ===============================

function stopTimer() {

    clearInterval(timerInterval);

}

// ===============================
// NEXT QUESTION
// ===============================

function nextQuestion() {

    saveCurrentAnswer();

    if (currentQuestion < TOTAL_QUESTIONS - 1) {

        currentQuestion++;

        showQuestion();

    } else {

        submitTest();

    }

}

// ===============================
// PREVIOUS QUESTION
// ===============================

function previousQuestion() {

    saveCurrentAnswer();

    if (currentQuestion > 0) {

        currentQuestion--;

        showQuestion();

    }

}

// ===============================
// HTML BUTTON CONNECTION
// ===============================

window.nextQuestion = nextQuestion;
window.previousQuestion = previousQuestion;

// =====================================================
// PART 5
// SUBMIT TEST + RESULT
// =====================================================

// ===============================
// SUBMIT TEST
// ===============================

async function submitTest() {

    saveCurrentAnswer();

    stopTimer();

    let score = 0;

    selectedQuestions.forEach((q, index) => {

        if (userAnswers[index] === q.answer) {

            score++;

        }

    });

    student.score = score;

    student.percentage =
        ((score / TOTAL_QUESTIONS) * 100).toFixed(2);

    await saveResultToFirebase();

    showResult();

}

// ===============================
// SHOW RESULT
// ===============================

function showResult() {

    testArea.style.display = "none";

    resultArea.style.display = "block";

    document.getElementById("studentResultName").innerHTML =
        "👤 Name : " + student.name;

    document.getElementById("studentResultDistrict").innerHTML =
        "📍 District : " + student.district;

    document.getElementById("studentResultExam").innerHTML =
        "🎯 Exam : " + student.exam;

    document.getElementById("finalScore").innerHTML =
        "🏆 Score : " +
        student.score +
        " / " +
        TOTAL_QUESTIONS;

    document.getElementById("percentage").innerHTML =
        "📊 Percentage : " +
        student.percentage +
        "%";

    showExplanation();

}

// ===============================
// CONNECT HTML
// ===============================

window.submitTest = submitTest;

// =====================================================
// PART 6
// FIREBASE SAVE + ANSWER REVIEW
// =====================================================

// ===============================
// SAVE RESULT TO FIREBASE
// ===============================

async function saveResultToFirebase() {

    try {

        const resultData = {

            name: student.name,
            mobile: student.mobile,
            email: student.email,
            district: student.district,
            exam: student.exam,

            score: student.score,
            totalQuestions: TOTAL_QUESTIONS,
            percentage: Number(student.percentage),

            submittedAt: new Date()

        };

        await addDoc(
            collection(db, "results"),
            resultData
        );

        console.log("Result Saved Successfully");

    }
    catch (error) {

        console.error(error);

        alert("Result Save Error");

    }

}

// ===============================
// ANSWER REVIEW
// ===============================

function showExplanation() {

    let html = "<h2>📚 Answer Review</h2>";

    selectedQuestions.forEach((q, index) => {

        const yourAnswer =
            userAnswers[index]
            ? userAnswers[index]
            : "Not Answered";

        html += `

        <div class="card">

            <h3>
            ${index + 1}. ${q.question}
            </h3>

            <p>
            <b>Your Answer:</b>
            ${yourAnswer}
            </p>

            <p>
            <b>Correct Answer:</b>
            ${q.answer}
            </p>

            <p>
            💡 ${q.explanation || ""}
            </p>

        </div>

        `;

    });

    document.getElementById("answerReview").innerHTML = html;

}



// ===============================
// UPDATE SHOW RESULT
// ===============================

const oldShowResult = showResult;

showResult = function () {

    oldShowResult();

    loadRanks();

};

// =====================================================
// PART 7
// LEADERBOARD + RANK
// =====================================================

// ===============================
// LOAD RANKS
// ===============================

async function loadRanks() {

    try {

        const snapshot = await getDocs(
            query(
                collection(db, "results"),
                orderBy("score", "desc")
            )
        );

        let overallRank = 1;
        let districtRank = 1;

        snapshot.forEach((doc) => {

            const data = doc.data();

            if (
                data.name === student.name &&
                data.mobile === student.mobile
            ) {

                const overall = document.getElementById("overallRank");

                if (overall) {
                    overall.innerHTML =
                        "🏆 Overall Rank : " + overallRank;
                }

            }

            if (data.district === student.district) {

                if (
                    data.name === student.name &&
                    data.mobile === student.mobile
                ) {

                    const district = document.getElementById("districtRank");

                    if (district) {
                        district.innerHTML =
                            "📍 District Rank : " + districtRank;
                    }

                }

                districtRank++;

            }

            overallRank++;

        });

    }

    catch (error) {

        console.error("Rank Error :", error);

    }

}

// =====================================================
// PART 8
// FINAL CONNECTIONS
// =====================================================

// Make functions available to HTML

window.startTest = startTest;
window.nextQuestion = nextQuestion;
window.previousQuestion = previousQuestion;
window.submitTest = submitTest;

// Final check

console.log("✅ G THE GENIUS Exam Portal Loaded Successfully");
