function outer() {
    let x = 10;
    function inner() {
        console.log(x);
    }
    console.log('outer-->', x);
    return inner;
}

const closure = outer();
console.log('outer is done');
closure();