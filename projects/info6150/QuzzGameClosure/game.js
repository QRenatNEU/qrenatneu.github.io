const KEY_CURRENT_ROUND = 'currentRound';
const KEY_ALL_GAMES = 'allgames';
const KEY_USER_ANSWERS = 'userAnswers';

const interval = 30;

let questionNum = 0;
let gameRound = localStorage.getItem(KEY_CURRENT_ROUND) ?? 1;
let allGames = localStorage.getItem(KEY_ALL_GAMES) ?? [];

let userAnswers = [];

// ================= Timer Implementation Start ================== //

function createTimer(timeInSeconds) {
    let timeLeft = timeInSeconds;
    let timer = 0;

    function startTimer() {
        if (timer) {
            return;
        }
        timer = setInterval(() => {
            if (timeLeft > 0) {
                timeLeft--;
            } else {
                timeLeft = 0;
                console.log("time up");
                stopTimer();
            }
        }, 1000);
    }

    function stopTimer() {
        if (timer) {
            clearInterval(timer);
        }
        timer = 0;
        timeLeft = timeInSeconds;
    }

    function resetTimer() {
        stopTimer();
        startTimer();
    }

    function isRunning() {
        return timer && timeLeft;
    }

    function canPauseTimer() {
        return isRunning();
    }

    function canResumeTimer() {
        return !isRunning() && !!timeLeft && timeLeft < timeInSeconds;
    }

    function pauseTimer() {
        if (canPauseTimer()) {
            clearInterval(timer);
            timer = 0;
        }
    }

    function resumeTimer() {
        if (canResumeTimer()) {
            startTimer();
        }
    }

    function getCurrentTime() {
        return timeLeft;
    }

    return {
        startTimer,
        stopTimer,
        resetTimer,
        pauseTimer,
        resumeTimer,
        canPauseTimer,
        canResumeTimer,
        isRunning,
        getCurrentTime
    }
}

const {
    startTimer,
    stopTimer,
    resetTimer,
    resumeTimer,
    pauseTimer,
    canPauseTimer,
    canResumeTimer,
    isRunning,
    getCurrentTime
} = createTimer(interval);

// ================= Timer Implementation Ends ================== //

// ============ QuzzGame Starts ============== //

const sampleQuestions = [
    {
        quz: "What is the capital of France?",
        choices: {'A': 'Paris', 'B': 'Berlin', 'C': 'London', 'D': 'Madrid'},
        correctAnswer: 'A',
        quzType: 'single'
    },
    {
        quz: "Which languages are official in Canada?",
        choices: {'A': 'English', 'B': 'French', 'C': 'Spanish', 'D': 'Portuguese'},
        correctAnswer: 'AB',
        quzType: 'multi'
    },
    {
        quz: "What is the largest planet in our Solar System?",
        choices: {'A': 'Earth', 'B': 'Mars', 'C': 'Jupiter', 'D': 'Saturn'},
        correctAnswer: 'C',
        quzType: 'single'
    },
    {
        quz: "Which elements are needed to make water?",
        choices: {'A': 'Hydrogen', 'B': 'Oxygen', 'C': 'Carbon', 'D': 'Nitrogen'},
        correctAnswer: 'AB',
        quzType: 'multi'
    },
    {
        quz: "What is the answer of 1 + 1?",
        choices: {'A': '1', 'B': '2', 'C': '3', 'D': '4'},
        correctAnswer: 'B',
        quzType: 'single'
    },
];

function displayQuizHistory() {
    const questionDisplay = document.getElementById('questionDisplay');
    const optionsList = document.getElementById('optionsList');
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');

    // Clear previous question and options
    questionDisplay.innerHTML = '';
    optionsList.innerHTML = '';
    // stop
    stopTimer();
    // hide buttons
    prevButton.style.display = 'none';
    nextButton.style.display = 'none';

    for (let i = 1; i <= gameRound; i++) {
        const history = localStorage.getItem(`${KEY_USER_ANSWERS}++${i}`);
        const optionElement = document.createElement('li');
        if (!history) {
            // optionElement.innerHTML = `Game Round ${i}: Sorry your score is lost`;
            // optionsList.appendChild(optionElement);
            continue;
        }
        const thatAnswer = JSON.parse(history);
        const score = calculateScoreInRound(thatAnswer);
        optionElement.innerHTML = `Game Round ${i}: Your score is <span style="color: red">${(score / getCurrentGameInfo().length * 100).toFixed(0)}</span> out of 100, ${score >= 4 ? 'wow!!!' : (score <= 1 ? 'come on!' : 'keep going!')}`;
        optionsList.appendChild(optionElement);
    }
}

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

function calculateScoreInRound(userAnswers) {
    let score = 0;
    // Loop through each question
    for (let i = 0; i < getCurrentGameInfo().length; i++) {
        const userAnswer = userAnswers[i] ? userAnswers[i].split('') : [];
        console.log(getCurrentGameInfo()[i], getCurrentGameInfo()[i].correctAnswer)
        const correctAnswer = getCurrentGameInfo()[i].correctAnswer.split('');
        console.log(userAnswer, correctAnswer)

        // Compare user answer with correct answer
        if (userAnswer.length > 0 && arraysEqual(userAnswer, correctAnswer)) {
            score++;
        }
    }

    return score;
}

function calculateScore() {
    let score = 0;
    // Loop through each question
    for (let i = 0; i < getCurrentGameInfo().length; i++) {
        const userAnswer = userAnswers[i] ? userAnswers[i].split('') : [];
        console.log(getCurrentGameInfo()[i], getCurrentGameInfo()[i].correctAnswer)
        const correctAnswer = getCurrentGameInfo()[i].correctAnswer.split('');
        console.log(userAnswer, correctAnswer)

        // Compare user answer with correct answer
        if (userAnswer.length > 0 && arraysEqual(userAnswer, correctAnswer)) {
            score++;
        }
    }

    return score;
}

function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    return arr1.sort().every((value, index) => value === arr2.sort()[index]);
}

function showResults() {
    // show result and restart
    stopTimer();
    displayQuestion(getCurrentGameInfo()[questionNum])
    localStorage.setItem(`${KEY_USER_ANSWERS}++${gameRound}`, JSON.stringify(userAnswers));
    const restartPrompt = document.getElementById('restartPrompt');
    restartPrompt.style.display = 'inline';
    const restart = document.getElementById('restartButton');
    restart.style.display = 'inline';
    restart.onclick = () => {
        restart.style.display = 'none';
        restartPrompt.style.display = 'none';
        gameRound++;
        localStorage.setItem(KEY_CURRENT_ROUND, `${gameRound}`);
        startGame();
    }
    const score = calculateScore();
    const scoreDisplay = document.getElementById('scoreDisplay');
    scoreDisplay.textContent = `Your score: ${((score / getCurrentGameInfo().length * 100).toFixed(0))} out of 100! `;
    scoreDisplay.style.display = 'block';
}

function selectQuestion(index) {
    questionNum = index;
    resumeGame();
}

function startGame() {
    questionNum = 0; // Start from the first round
    userAnswers = [];
    const scoreDisplay = document.getElementById('scoreDisplay');
    scoreDisplay.style.display = 'none';
    const roundDisplay = document.getElementById('roundDisplay');
    roundDisplay.textContent = `Your current round is: ${gameRound}, click History to view your history`;
    roundDisplay.style.display = 'block';
    const currentGame = getCurrentGameInfo();
    const prevButton = document.getElementById('prevButton');
    prevButton.onclick = () => {
        // set up prev button
        lastQuestion();
    }
    const nextButton = document.getElementById('nextButton');
    nextButton.onclick = () => {
        // set up next button
        const answered = userAnswers[questionNum] !== 'U';
        if (answered) {
            nextQuestion(true);
        } else {
            const selectedAnswers = getSelectedAnswers();
            if (!selectedAnswers.length) {
                window.alert('You have not made a selection');
                return;
            }
            nextQuestion(false);
        }
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
    const historyButton = document.getElementById('viewHistory');
    historyButton.onclick = () => {
        if (gameRound <= 1) {
            alert('Please finish at least one game to view the history...');
            return;
        }
        displayQuizHistory();
    }
    displayQuestion(currentGame[questionNum]);
    startTimer();
    setInterval(() => {
        const timeLeft = getCurrentTime();
        updateTimerDisplay(isRunning() ? timeLeft : 0);
        if (timeLeft <= 0) {
            window.alert('Time up! We have submitted your choice as answer.')
            nextQuestion(true);
        }
    }, 1000)
}

function resumeGame() {
    const currentGame = getCurrentGameInfo();
    displayQuestion(currentGame[questionNum]);
    const prevButton = document.getElementById('prevButton');
    const nextButton = document.getElementById('nextButton');
    prevButton.style.display = 'inline';
    nextButton.style.display = 'inline';
    resetTimer();
}

function getSelectedAnswers() {
    const answerElements = document.querySelectorAll('input[name="answer"]:checked');
    // console.log(answerElements)
    return Array.from(answerElements).map(el => el.value);
}

function submitAnswer() {
    // store the submitted answer
    const selectedAnswers = getSelectedAnswers();
    // console.log(selectedAnswers);
    userAnswers[questionNum] = selectedAnswers.join('');
    console.log(userAnswers);
}

function lastQuestion() {
    if (questionNum === 0) {
        alert('This is the first question!');
        return;
    }
    questionNum--;
    const userAnswered = userAnswers[questionNum] !== 'U';
    if (userAnswered) {
        stopTimer();
    } else {
        startTimer();
    }
    const lastGame = getCurrentGameInfo()[questionNum];
    displayQuestion(lastGame);
}

function nextQuestion(skipConfirm = false) {
    // skipConfirm is for time up, skip it and go to next question force
    pauseTimer();

    if (skipConfirm || confirm("Are you sure you want to submit your answer and go to the next question?")) {
        submitAnswer();
        const notAnsweredList = userAnswers.filter(ans => ans === 'U');
        if (notAnsweredList.length === 0) {
            alert('Congratulations! You have finished the game');
            // Handle the end of the quiz
            showResults();
            return;
        }
        questionNum++;
        const nextGame = getCurrentGameInfo()[questionNum];
        if (nextGame) {
            displayQuestion(nextGame);
            resetTimer();
        } else {
            if (notAnsweredList.length > 0) {
                if (confirm('You have questions that have not answered, go to that question? You can also click [View All] to check.')) {
                    userAnswers.forEach((ans, idx) => {
                        if (ans === 'U') {
                            questionNum = idx;
                            resetTimer();
                            displayQuestion(getCurrentGameInfo()[questionNum]);
                        }
                    })
                }
            } else {
                alert('Congratulations! You have finished the game');
                // Handle the end of the quiz
                showResults();
            }
        }
    } else {
        resumeTimer();
    }
}

function updateTimerDisplay(time) {
    // show the timer count down
    const timerDisplay = document.getElementById('timerDisplay');
    if (time > 0) {
        timerDisplay.textContent = `Time left: ${time} seconds`;
        timerDisplay.style.display = 'block';
    } else {
        timerDisplay.style.display = 'none';
    }
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
        const isChecked = userAnswers[questionNum].includes(key);
        const isDisabled = userAnswers[questionNum] !== 'U';
        optionElement.innerHTML = `<input type="${inputType}" name="answer" value="${key}" ${isChecked ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}> ${value}`;
        optionsList.appendChild(optionElement);
    }
}

// ============ QuzzGame ends ============== //

// ============ Timer Starts =============== //

function startTimerGame() {

    const totalTime = 300;

    const {
        startTimer,
        stopTimer,
        resetTimer,
        resumeTimer,
        pauseTimer,
        canPauseTimer,
        canResumeTimer,
        isRunning,
        getCurrentTime
    } = createTimer(totalTime);

    const timeLeft = document.getElementById('timeLeft');
    const btnStart = document.getElementById('start');
    const btnStop = document.getElementById('stop');
    const btnReset = document.getElementById('reset');
    const btnPause = document.getElementById('pause');
    const btnResume = document.getElementById('resume');

    function convertSecondsToMinutesSeconds(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes} : ${remainingSeconds}`;
    }

    function updateDisplay() {
        const current = getCurrentTime();
        timeLeft.textContent = current === 0 ? 'Time up' : `Time Left: ${convertSecondsToMinutesSeconds(current)}`;
        btnStart.disabled = isRunning() || getCurrentTime() < totalTime;
        btnResume.disabled = !canResumeTimer();
        btnPause.disabled = !canPauseTimer();
        btnStop.disabled = !isRunning();
        btnReset.disabled = !isRunning();
    }

    btnStart.onclick = () => {
        startTimer()
    }

    btnStop.onclick = () => {
        stopTimer()
    }

    btnResume.onclick = () => {
        resumeTimer()
    }

    btnPause.onclick = () => {
        pauseTimer()
    }

    btnReset.onclick = () => {
        resetTimer()
    }


    setInterval(updateDisplay, 1000);
}

// ============ Timer Ends =============== //

function startChoice() {
    // Call startGame() to begin the game
    // startGame();
    document.getElementById('timerStarter').onclick = () => {
        document.getElementById('quizContainer').style.display = 'none';
        document.getElementById('timerContainer').style.display = 'flex';
        document.getElementById('mainContainer').style.display = 'none';
        startTimerGame();
    }
    document.getElementById('quzzStarter').onclick = () => {
        // Call startGame() to begin the game
        document.getElementById('quizContainer').style.display = 'flex';
        document.getElementById('timerContainer').style.display = 'none';
        document.getElementById('mainContainer').style.display = 'none';
        startGame();
    }
}

startChoice();