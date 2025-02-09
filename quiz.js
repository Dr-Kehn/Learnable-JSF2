const questions = [{
    question: "Which country has won the most FIFA World Cups?",
    answers: ["Brazil", "Germany", "Argentina", "Italy"],
    correct: 0
},
{
    question: "Who won the 2022 FIFA World Cup?",
    answers: ["France", "Argentina", "Brazil", "Spain"],
    correct: 1
},
{
    question: "Which player has the most Ballon d'Or awards?",
    answers: ["Cristiano Ronaldo", "Lionel Messi", "Pelé", "Diego Maradona"],
    correct: 1
},
{
    question: "Which club has won the most UEFA Champions League titles?",
    answers: ["Barcelona", "Bayern Munich", "Real Madrid", "Manchester United"],
    correct: 2
},
{
    question: "Which Nigerian player won the 1999 African Footballer of the Year award?",
    answers: ["Jay-Jay Okocha", "Kanu Nwankwo", "Sunday Oliseh", "Rashidi Yekini"],
    correct: 1
},
{
    question: "What does Forex stand for?",
    answers: ["Foreign Expansion", "Foreign Exchange", "Foreign Export", "Fixed Exchange"],
    correct: 1
},
{
    question: "Which currency pair is the most traded in Forex?",
    answers: ["GBP/USD", "USD/JPY", "EUR/USD", "AUD/USD"],
    correct: 2
},
{
    question: "What does PIP stand for in Forex trading?",
    answers: ["Price Interest Point", "Percentage in Profit", "Point in Percentage", "Profit Investment Percentage"],
    correct: 2
},
{
    question: "Which market session is considered the most volatile?",
    answers: ["London Session", "New York Session", "Sydney Session", "Tokyo Session"],
    correct: 0
},
{
    question: "What is the name of the main protagonist in Naruto?",
    answers: ["Sasuke Uchiha", "Kakashi Hatake", "Itachi Uchiha", "Naruto Uzumaki"],
    correct: 3
},
{
    question: "Which anime features a notebook that can kill people?",
    answers: ["One Piece", "Death Note", "attack on Titan", "Bleach"],
    correct: 1
},
{
    question: "Who is the strongest Saiyan in Dragon Ball Super?",
    answers: ["Goku", "Vegeta", "Broly", "Gohan"],
    correct: 2
},
{
    question: "What is the name of Luffy's pirate crew in One Piece?",
    answers: ["Whiteboard Pirates", "Straw Hat Pirates", "Red Hair Pirates", "Blackbeard Pirates"],
    correct: 1
},
{
    question: "Which anime has the highest number of episodes?",
    answers: ["One Piece", "Naruto", "Detective Conan", "Dragon Ball Z"],
    correct: 2
},
{
    question: "What is Web3?",
    answers: ["A new web browser", "A decentralized internet powered by blockchain", "A programming language", "A social media network"],
    correct: 1
},
{
    question: "Which blockchain is known for smart contracts?",
    answers: ["Bitcoin", "Ethereum", "Solana", "Cardano"],
    correct: 1
},
{
    question: "What does NFT stand for?",
    answers: ["Non-Fungible Token", "New Financial Technology", "Networked Fund Transfer", "Non-Fixed Transaction"],
    correct: 0
},
{
    question: "Which company founded the Metamask wallet?",
    answers: ["Coinbase", "Binance", "ConsenSys", "OpenSea"],
    correct: 2
},
{
    question: "What is the main purpose of a DAO (Decentralized Autonomous Organization)?",
    answers: ["A social media group", "A community-driven decision-making system", "A financial audit company", "A new programming language"],
    correct: 1
},
{
    question: "Which Nigerian artist won the first Grammy Award?",
    answers: ["Wizkid", "Burna Boy", "Rema", "Davido"],
    correct: 1
},
{
    question: "Which Nigerian artist is known as the African Giant?",
    answers: ["Olamide", "Phyno", "Wizkid", "Burna Boy"],
    correct: 3
},
{
    question: "What is the title of Wizkid's 2020 album that became globally popular?",
    answers: ["Superstar", "Made in Lagos", "Essence", "Outside"],
    correct: 1
},
{
    question: "Which Nigerian artist is known for the hit song Fem?",
    answers: ["Burna Boy", "Wizkid", "Davido", "Rema"],
    correct: 2
},
{
    question: "Who is the founder of YBNL?",
    answers: ["Olamide", "Phyno", "Zlatan Ibile", "Don Jazzy"],
    correct: 0
},
{
    question: "What is the standard lot size in Forex trading?",
    answers: ["10,000 units", "1,000 units", "100,000 units", "500,000 units"],
    correct: 2
}]; // Placeholder 25 questions 

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const prevButton = document.getElementById("prev-btn");
const submitButton = document.getElementById("submit-btn");
const progressElement = document.getElementById("progress");
const questionNav = document.getElementById("question-nav");
const restartButton = document.getElementById("restart-btn");

let currentQuestionIndex = 0;
let selectedAnswers = new Array(questions.length).fill(null); // Stores user selections

function startQuiz() {
    currentQuestionIndex = 0;
    updateQuestionNav();
    showQuestion();
    restartButton.style.display = "inline-block"; // Show restart button
}

function showQuestion() {
    resetState();
    const questionData = questions[currentQuestionIndex];
    questionElement.innerText = questionData.question;
    progressElement.innerText = `Question ${currentQuestionIndex + 1} of ${questions.length}`;

    questionData.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.innerText = answer;
        button.classList.add("btn");

        if (selectedAnswers[currentQuestionIndex] === index) {
            button.classList.add("selected");
        }

        button.addEventListener("click", () => selectAnswer(index));
        answerButtons.appendChild(button);
    });

    prevButton.style.display = currentQuestionIndex > 0 ? "inline-block" : "none";
    nextButton.style.display = currentQuestionIndex < questions.length - 1 ? "inline-block" : "none";
    submitButton.style.display = "inline-block"; // Always visible
    updateNavButtons();
}

function resetState() {
    answerButtons.innerHTML = "";
}

function selectAnswer(selectedIndex) {
    selectedAnswers[currentQuestionIndex] = selectedIndex;

    document.querySelectorAll(".btn").forEach((btn, index) => {
        btn.classList.toggle("selected", index === selectedIndex);
    });

    updateNavButtons();
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    }
}

function updateQuestionNav() {
    questionNav.innerHTML = "";
    questions.forEach((_, index) => {
        const button = document.createElement("button");
        button.innerText = index + 1;
        button.classList.add("question-btn");

        if (selectedAnswers[index] !== null) {
            button.classList.add("answered"); // Mark answered questions
        }

        button.addEventListener("click", () => goToQuestion(index));
        questionNav.appendChild(button);
    });

    updateNavButtons();
}

function goToQuestion(index) {
    currentQuestionIndex = index;
    showQuestion();
}

function updateNavButtons() {
    document.querySelectorAll(".question-btn").forEach((btn, index) => {
        btn.classList.toggle("active", index === currentQuestionIndex);
        btn.classList.toggle("answered", selectedAnswers[index] !== null); // Highlight answered questions
    });
}

function submitQuiz() {
    let score = 0;
    questions.forEach((question, index) => {
        if (selectedAnswers[index] === question.correct) {
            score++;
        }
    });

    questionElement.innerText = `Quiz Completed! Your score is ${score} out of ${questions.length}.`;
    answerButtons.innerHTML = "";
    progressElement.innerText = "";
    prevButton.style.display = "none";
    nextButton.style.display = "none";
    submitButton.style.display = "none";
    restartButton.style.display = "inline-block"; // Show restart button after submitting
}

function restartQuiz() {
    selectedAnswers.fill(null);
    currentQuestionIndex = 0;
    startQuiz();
}

prevButton.addEventListener("click", prevQuestion);
nextButton.addEventListener("click", nextQuestion);
submitButton.addEventListener("click", submitQuiz);
restartButton.addEventListener("click", restartQuiz);

startQuiz();
