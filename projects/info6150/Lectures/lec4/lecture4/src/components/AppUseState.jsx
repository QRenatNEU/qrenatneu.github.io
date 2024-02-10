import {useState} from "react";

function AppUseState() {
    const [count,setCount] = useState(0);

    console.log('is rendered');

    function click() {
        console.log('pre', count);
        setCount(count + 1);
        console.log('after', count);
        setCount(count + 1);
        console.log('after 2', count);
    }

    function click2() {
        console.log('pre', count);
        setCount((count) => {
            return count + 1
        });
        console.log('after', count);
        setCount((count) => {
            return count + 1
        });
        console.log('after 2', count);
    }

    return (
        <div>
            <div>
                {`the value is ${count}`}
            </div>
            <button onClick={click2}>Click ME</button>
        </div>
    )
}

export default AppUseState;