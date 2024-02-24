import {useReducer} from "react";

function myReducer(state, action) {
    if (action.type === 'add') {
        return {
            age: state.age + 1
        };
    }
    throw Error('Unknown action.');
}

export const Main = () => {

    const formData = {
        items: [
            {
                email: 'abc',
                name: 'abc'
            }
        ]
    }

    const [state, dispatch] = useReducer(myReducer, formData);
}