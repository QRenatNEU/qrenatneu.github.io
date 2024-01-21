function createTimer() {
    let timer;

    function startTimer() {
        console.log("Timer started.");
        timer = setTimeout(function () {
            console.log("Timer stopped after 2 minutes.");
            clearTimeout(timer);
        }, (1000 * 5));
    }

    function stopTimer() {
        console.log("Timer stopped manually.");
        clearTimeout(timer);
    }

    return {start: startTimer, stop: stopTimer,};
}

const timer = createTimer();
timer.start();
for (i = 0; i < 10000000; i++) {
    console.log(i);
}
setTimeout(function () {
    timer.stop();
}, (1000 * 2));