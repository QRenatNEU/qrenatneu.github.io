const counter = function() {
    let count = 0;

    function increment() {count++}
    function decrement() {count--}
    function getCount() {return count}

    return {
        increment, decrement, display: getCount
    }
}

const myCounter = counter();
myCounter.increment();
myCounter.increment();
myCounter.increment();
myCounter.decrement();

console.log(myCounter.display());