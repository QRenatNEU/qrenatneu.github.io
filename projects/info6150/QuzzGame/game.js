const KEY_CURRENT_ROUND = 'currentRound';
const KEY_ALL_GAMES = 'allgames';

const interval = 30;

let questionNum = 0;
let gameRound = localStorage.getItem(KEY_CURRENT_ROUND) ?? 1;
let allGames = localStorage.getItem(KEY_ALL_GAMES) ?? [];
let currentTimer;
let timeLeft = interval;

const userAnswers = [];

const sampleQuestions = [
    {
        quz: "What is the capital of France?",
        choices: { 'A': 'Paris', 'B': 'Berlin', 'C': 'London', 'D': 'Madrid' },
        correctAnswer: 'A',
        quzType: 'single'
    },
    {
        quz: "Which languages are official in Canada?",
        choices: { 'A': 'English', 'B': 'French', 'C': 'Spanish', 'D': 'Portuguese' },
        correctAnswer: 'AB',
        quzType: 'multi'
    },
    {
        quz: "What is the largest planet in our Solar System?",
        choices: { 'A': 'Earth', 'B': 'Mars', 'C': 'Jupiter', 'D': 'Saturn' },
        correctAnswer: 'C',
        quzType: 'single'
    },
    {
        quz: "Which elements are needed to make water?",
        choices: { 'A': 'Hydrogen', 'B': 'Oxygen', 'C': 'Carbon', 'D': 'Nitrogen' },
        correctAnswer: 'AB',
        quzType: 'multi'
    }
];

function getCurrentGameInfo() {
    if (allGames.length >= gameRound) {
        return allGames[gameRound - 1];
    } else {
        // in-game info
        return sampleQuestions;
    }
}

function viewAllQuestions() {
    return getCurrentGameInfo().map((q) => {
        return {
            question: q.quz,
            type: q.quzType
        }
    })
}

function selectQuestion(index) {
    questionNum = index;
    resumeGame();
}

function startGame() {
    questionNum = 0; // Start from the first round
    const currentGame = getCurrentGameInfo();
    const prevButton = document.getElementById('prevButton');
    prevButton.onclick = () => {
        // set up prev button
        lastQuestion();
    }
    const nextButton = document.getElementById('nextButton');
    nextButton.onclick = () => {
        // set up next button
        nextQuestion(false);
    }
    const viewAllButton = document.getElementById('viewAll');
    viewAllButton.onclick = () => {
        // set up view all button
        const allQ = viewAllQuestions();
        const questionDisplay = document.getElementById('questionDisplay');
        const optionsList = document.getElementById('optionsList');

        // Clear previous question and options
        questionDisplay.innerHTML = '';
        optionsList.innerHTML = '';
        // stop
        stopTimer();
        // hide buttons
        prevButton.style.display = 'none';
        nextButton.style.display = 'none';

        allQ.forEach((question, index) => {
            const optionElement = document.createElement('li');
            optionElement.innerHTML = `<li style="cursor: pointer" onclick="selectQuestion(${index})">Question: ${question.question} <span style="color: red">[${userAnswers[index] === 'U' ? 'Not Answered' : 'Answered'}]</span></li>`;
            optionsList.appendChild(optionElement);
        })
    }
    currentGame.forEach(question => {
        // add empty answers
        userAnswers.push('U');
    })
    displayQuestion(currentGame[questionNum]);
    startTimer();
}

function resumeGame() {
    const currentGame = getCurrentGameInfo();
    displayQuestion(currentGame[questionNum]);
    startTimer();
}

function submitAnswer() {
    // store the submitted answer

}

function lastQuestion() {
    questionNum--;
    const userAnswered = userAnswers[questionNum] !== 'U';
    if (userAnswered) {
        stopTimer();
    } else {
        startTimer();
    }
}

function nextQuestion(skipConfirm = false) {
    // skipConfirm is for time up, skip it and go to next question force
    stopTimer();

    if (skipConfirm || confirm("Are you sure you want to submit your answer and go to the next question?")) {
        submitAnswer();
        questionNum++;
        const nextGame = getCurrentGameInfo()[questionNum];
        if (nextGame) {
            displayQuestion(nextGame);
            startTimer();
        } else {
            // Handle the end of the quiz
            showResults();
        }
    } else {
        startTimer(timeLeft);
    }
}

function updateTimerDisplay(time) {
    // show the timer count down
    const timerDisplay = document.getElementById('timerDisplay');
    timerDisplay.textContent = `Time left: ${time} seconds`;
    timerDisplay.style.display = 'block';
}

function stopTimer() {
    // stop counting
    clearInterval(currentTimer);
    document.getElementById('timerDisplay').style.display = 'none';
}

function startTimer(givenTime = 0) {
    // given time is to resume from stop
    timeLeft = givenTime ? givenTime : interval;
    updateTimerDisplay(timeLeft);
    currentTimer = setInterval(function() {
        timeLeft--;
        updateTimerDisplay(timeLeft);
        if (timeLeft <= 0) {
            clearInterval(currentTimer);
            window.alert('Time up! We have submitted your choice as answer.')
            nextQuestion(true);
        }
    }, 1000);
}

function displayQuestion(gameInfo) {
    const questionDisplay = document.getElementById('questionDisplay');
    const optionsList = document.getElementById('optionsList');

    // Clear previous question and options
    questionDisplay.innerHTML = '';
    optionsList.innerHTML = '';

    // Set current question
    questionDisplay.textContent = gameInfo.quz;

    // Add options
    for (const [key, value] of Object.entries(gameInfo.choices)) {
        const optionElement = document.createElement('li');
        const inputType = gameInfo.quzType === 'multi' ? 'checkbox' : 'radio';
        optionElement.innerHTML = `<input type="${inputType}" name="answer" value="${key}"> ${value}`;
        optionsList.appendChild(optionElement);
    }
}

// Call startGame() to begin the game
startGame();