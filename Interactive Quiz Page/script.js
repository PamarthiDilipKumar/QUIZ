const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Mars", "Venus", "Jupiter", "Saturn"],
        correctAnswer: "Mars"
    },
    {
        question: "What is the largest mammal on Earth?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correctAnswer: "Blue Whale"
    },
    {
        question: "Which gas do plants absorb from the atmosphere?",
        options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
        correctAnswer: "Carbon Dioxide"
    },
    {
        question: "Which famous scientist is known for the theory of relativity?",
        options: ["Isaac Newton", "Galileo Galilei", "Marie Curie", "Albert Einstein"],
        correctAnswer: "Albert Einstein"
    }
];

let currentQuestion = 0;
let score = 0;
let timerInterval; // Variable to store the interval ID for the timer
let timeLeft = 30; // Timer duration in seconds

const questionText = document.getElementById("question-text");
const optionsList = document.getElementById("options-list");
const feedback = document.getElementById("feedback");
const scoreDisplay = document.getElementById("score");
const submitButton = document.getElementById("submit-button");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button"); // Restart button

function displayQuestion() {
    const questionContainer = document.getElementById("question-container");
    questionContainer.classList.remove("show");
    setTimeout(() => {
        questionContainer.classList.add("show");
    }, 100);

    const question = questions[currentQuestion];
    questionText.textContent = question.question;
    optionsList.innerHTML = "";

    question.options.forEach((option, index) => {
        const listItem = document.createElement("li");
        const radioInput = document.createElement("input");
        radioInput.type = "radio";
        radioInput.name = "answer";
        radioInput.id = `option${index}`;
        radioInput.value = option;
        const label = document.createElement("label");
        label.htmlFor = `option${index}`;
        label.textContent = option;

        listItem.appendChild(radioInput);
        listItem.appendChild(label);
        optionsList.appendChild(listItem);
    });

    startTimer();
    submitButton.style.display = "block";
    nextButton.style.display = "none";
    feedback.textContent = "";
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (!selectedOption) {
        feedback.textContent = "Please select an answer.";
        return;
    }

    clearInterval(timerInterval); // Stop the timer

    if (selectedOption.value === questions[currentQuestion].correctAnswer) {
        score++;
        feedback.textContent = "Correct!";
    } else {
        feedback.textContent = "Incorrect. The correct answer is: " + questions[currentQuestion].correctAnswer;
        selectedOption.parentNode.classList.add("incorrect-answer");
    }

    submitButton.style.display = "none";
    nextButton.style.display = "block";
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        displayQuestion();
    } else {
        showFinalScore();
    }
}

function showFinalScore() {
    questionText.textContent = "Quiz completed!";
    optionsList.innerHTML = "";
    feedback.textContent = `Your Score: ${score} out of ${questions.length}`;
    scoreDisplay.style.display = "none";
    submitButton.style.display = "none";
    nextButton.style.display = "none";
    restartButton.style.display = "block"; // Display the Restart button
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    displayQuestion();
    scoreDisplay.style.display = "block";
    restartButton.style.display = "none"; // Hide the Restart button
}

function startTimer() {
    timeLeft = 30; // Reset the timer duration
    updateTimerDisplay(timeLeft);

    timerInterval = setInterval(() => {
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timerInterval);
            checkAnswer(); // Automatically check the answer when time runs out
            // Automatically move to the next question after checking the answer
            setTimeout(nextQuestion, 2000); // Wait for 2 seconds before moving to the next question
        } else {
            updateTimerDisplay(timeLeft);
        }
    }, 1000);
}

function updateTimerDisplay(timeLeft) {
    const timerDisplay = document.getElementById("timer");
    if (timerDisplay) {
        timerDisplay.textContent = `Time Left: ${timeLeft} seconds`;
    }
}

submitButton.addEventListener("click", checkAnswer);
nextButton.addEventListener("click", nextQuestion);
restartButton.addEventListener("click", restartQuiz); // Event listener for Restart button

displayQuestion();