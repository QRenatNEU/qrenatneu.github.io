import React, {createContext, useReducer} from 'react';
import {formReducer} from './useFormReducer';
import {userSchema} from "../util/userSchema";

const userData = [
    {
        fname: "John",
        lname: "Doe",
        email: "johndoe@example.com",
        phone: "+1234567890",
        addr: "123 Maple Street",
        city: "Anytown",
        state: "CA",
        zip: "M1X1A2",
        occupation: "Software Engineer",
        country: "Canada"
    },
    {
        fname: "Jane",
        lname: "Smith",
        email: "janesmith@example.com",
        phone: "+1234567891",
        addr: "456 Oak Avenue",
        city: "Springfield",
        state: "CA",
        zip: "90310",
        occupation: "Graphic Designer",
        country: "USA"
    },
    {
        fname: "Alex",
        lname: "Johnson",
        email: "alexjohnson@example.com",
        phone: "+1234567892",
        addr: "789 Pine Road",
        city: "Metropolis",
        state: "CA",
        zip: "90410",
        occupation: "Project Manager",
        country: "USA"
    },
    {
        fname: "Samantha",
        lname: "Brown",
        email: "samanthabrown@example.com",
        phone: "+1234567893",
        addr: "1011 Willow Lane",
        city: "River City",
        state: "CA",
        zip: "90510",
        occupation: "Data Analyst",
        country: "USA"
    }
];


// Initial state for the form
// const initialState = [
//     // userSchema.reduce((acc, curr) => {
//     //     acc[curr.key] = '';
//     //     return acc;
//     // }, {})
//     ...userData
// ]

export const initialState = {
    data: userData.map((data, index) => {return {
        id: index,
        ...data,
        // selected: false
    }}),
    selection: null
}

export const FormContext = createContext();

export const FormProvider = ({ children }) => {

    console.log(initialState);

    const [state, dispatch] = useReducer(formReducer, initialState);

    return (
        <FormContext.Provider value={{ state, dispatch }}>
            {children}
        </FormContext.Provider>
    );
};
