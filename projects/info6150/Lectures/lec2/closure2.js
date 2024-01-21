function createCountner() {
    let count = 0;

    function increment() {
        return ++count;
    }

    return increment;
}

const counter = createCountner();
console.log(counter());
console.log(counter());