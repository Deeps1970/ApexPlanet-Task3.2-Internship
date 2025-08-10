const questions = [
  {
    question: "What does HTML stand for?",
    answer: [
      { text: "Hyper Text Markup Language", correct: true },
      { text: "Home Tool Markup Language", correct: false },
      { text: "Hyperlinks and Text Markup Language", correct: false },
      { text: "Hyper Tool Making Language", correct: false },
    ],
  },
  {
    question: "What is the correct syntax for referring to an external script?",
    answer: [
      { text: "&lt;script src='script.js'&gt;", correct: true },
      { text: "&lt;script href='script.js'&gt;", correct: false },
      { text: "&lt;script ref='script.js'&gt;", correct: false },
      { text: "&lt;script name='script.js'&gt;", correct: false },
    ],
  },
  {
    question: "Which language is used for styling web pages?",
    answer: [
      { text: "HTML", correct: false },
      { text: "JQuery", correct: false },
      { text: "CSS", correct: true },
      { text: "XML", correct: false },
    ],
  },
  {
    question: "Which is not a JavaScript data type?",
    answer: [
      { text: "Undefined", correct: false },
      { text: "Number", correct: false },
      { text: "Float", correct: true },
      { text: "Boolean", correct: false },
    ],
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answer: [
      { text: "&lt;js&gt;", correct: false },
      { text: "&lt;javascript&gt;", correct: false },
      { text: "&lt;script&gt;", correct: true },
      { text: "&lt;code&gt;", correct: false },
    ],
  },
  {
    question: "How do you create a function in JavaScript?",
    answer: [
      { text: "function:myFunction()", correct: false },
      { text: "function myFunction()", correct: true },
      { text: "function = myFunction()", correct: false },
      { text: "create function myFunction()", correct: false },
    ],
  },
  {
    question: "How can you add a comment in JavaScript?",
    answer: [
      { text: "&lt;!-- This is a comment --&gt;", correct: false },
      { text: "// This is a comment", correct: true },
      { text: "' This is a comment", correct: false },
      { text: "** This is a comment **", correct: false },
    ],
  },
  {
    question: "Which operator is used to assign a value to a variable?",
    answer: [
      { text: "*", correct: false },
      { text: "-", correct: false },
      { text: "=", correct: true },
      { text: "+", correct: false },
    ],
  },
  {
    question: "How do you call a function named 'myFunction'?",
    answer: [
      { text: "call myFunction()", correct: false },
      { text: "myFunction()", correct: true },
      { text: "call function myFunction()", correct: false },
      { text: "Call.myFunction()", correct: false },
    ],
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    answer: [
      { text: "var", correct: false },
      { text: "let", correct: false },
      { text: "const", correct: false },
      { text: "All of the above", correct: true },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer");
const nextButton = document.getElementById("btn");

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next >";
  showQuestion();
}

function showQuestion() {
  answered = false;
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  // Clear previous answers
  answerButton.innerHTML = "";

  currentQuestion.answer.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("option");
    button.dataset.correct = answer.correct;
    button.addEventListener("click", selectAnswer);
    answerButton.appendChild(button);
  });

  nextButton.style.display = "none"; // Hide next button until answered
}

function selectAnswer(e) {
  if (answered) return; // Prevent multiple clicks
  answered = true;

  const selectedBtn = e.target;
  const correct = selectedBtn.dataset.correct === "true";

  if (correct) {
    selectedBtn.style.backgroundColor = "green";
    score++;
  } else {
    selectedBtn.style.backgroundColor = "red";
  }

  // Highlight correct answer
  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.style.backgroundColor = "green";
    }
    button.disabled = true; // Disable all buttons
  });

  nextButton.style.display = "inline-block";
}

function showScore() {
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
  answerButton.innerHTML = "";
  nextButton.innerHTML = "Restart";
  nextButton.style.display = "inline-block";
}

nextButton.addEventListener("click", () => {
  if (nextButton.innerHTML === "Restart") {
    startQuiz();
  } else {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showScore();
    }
  }
});

startQuiz();
