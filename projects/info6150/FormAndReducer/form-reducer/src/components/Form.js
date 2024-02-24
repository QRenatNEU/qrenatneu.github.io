import React, {useContext, useEffect, useState} from 'react';
import {userSchema} from "../util/userSchema";
import {FormContext} from "../hook/useFormContext";

const Form = () => {

    const {state, dispatch} = useContext(FormContext);

    const [field, setField] = useState('fname');
    const [search, setSearch] = useState('');

    const de = {
        "fname": "",
        "lname": "",
        "email": "",
        "phone": "",
        "addr": "",
        "city": "",
        "state": "",
        "zip": "",
        "occupation": "",
        "country": ""
    }

    const [tempData, setTempData] = useState(de)
    const [error, setError] = useState(de)

    const data = state.selection;

    console.log('form aaaa', data)

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log(e);
    // };

    useEffect(() => {
        if (!data) {
            return;
        }
        console.log(data)
        userSchema.forEach((schema, idx) => {
            const abc = data;
            const value = abc[schema.key];
            if (schema.required && value && value.length > 0) {
                console.log('testingttt')
                const regex = new RegExp(schema.regex);
                if (!regex.test(value)) {
                    setError({
                        ...error,
                        [schema.key]: 'Invalid'
                    })
                    return;
                }
            }
            setError({
                ...error,
                [schema.key]: ''
            })
        })
    }, [data]);

    useEffect(() => {
        userSchema.forEach((schema, idx) => {
            const abc = tempData;
            const value = abc[schema.key];
            if (schema.required && value.length > 0) {
                console.log('testingttt')
                const regex = new RegExp(schema.regex);
                if (!regex.test(value)) {
                    console.log('noooo')
                    setError((error) => {
                        return {
                            ...error,
                            [schema.key]: 'Invalid'
                        }
                    })
                    return;
                }
                console.log('yessss')
            }
            setError((error) => {
                return {
                    ...error,
                    [schema.key]: ''
                }
            })
        })
    }, [tempData]);

    return (
        <div>
            <form style={{padding: 24}}>
                {
                    userSchema.map((schema, idx) => {
                        return (
                            <div style={{padding: 8}}
                                 key={`form index ${idx}`}>
                                <input name={schema.key}
                                       type={schema.type}
                                       onChange={(e) => {
                                           // console.log(e.target.value)
                                           if (data) {
                                               dispatch({
                                                   type: 'updateForm',
                                                   field: schema.key,
                                                   value: e.target.value
                                               })
                                           } else {
                                               setTempData(
                                                   {
                                                       ...tempData,
                                                       [schema.key]: e.target.value
                                                   }
                                               )
                                           }
                                       }}
                                       value={data ? data[schema.key] : tempData[schema.key]}
                                       placeholder={schema.name}
                                       required={schema.required}/>
                                <p style={{color: 'red'}}
                                   hidden={error[schema.key].length === 0}>{error[schema.key]}</p>
                            </div>
                        )
                    })
                }
                <button type="button" onClick={() => {
                    const abc = data ? data : tempData;
                    let iserr = false;
                    userSchema.forEach(schema => {
                        const value = abc[schema.key];
                        if (schema.required) {
                            console.log('testingttt')
                            const regex = new RegExp(schema.regex);
                            if (!regex.test(value)) {
                                iserr = true;
                                setError({
                                    ...error,
                                    [schema.key]: 'Invalid'
                                })
                            }
                        }
                    })
                    if (iserr) {
                        return
                    }
                    setError(() => {
                        return de
                    })
                    dispatch({
                        type: 'edit',
                        data: data
                    })
                }} disabled={!data}>Submit
                </button>
                <br/>
                <button onClick={() => {
                    console.log('onclickskkk')
                    const abc = data ? data : tempData;
                    let iserr = false;
                    userSchema.forEach(schema => {
                        const value = abc[schema.key];
                        if (schema.required) {
                            console.log('testingttt')
                            const regex = new RegExp(schema.regex);
                            if (!regex.test(value)) {
                                iserr = true;
                                setError({
                                    ...error,
                                    [schema.key]: 'Invalid'
                                })
                            }
                        }
                    })
                    if (iserr) {
                        return
                    }
                    setError(() => {
                        return de
                    })
                    console.log('dispatchcccc')
                    dispatch({
                        type: 'add',
                        data: {
                            ...abc,
                            id: new Date().getTime(),
                        }
                    })
                }} type="button">Add
                </button>
            </form>
            <div>
                <input value={search} onChange={(e) => {
                    setSearch(e.target.value)
                }}/>
                <div>
                    <select onChange={(e) => {
                        console.log(e.target.value);
                        setField(e.target.value)
                    }}>
                        {
                            userSchema.map((schema, idx) => {
                                return (
                                    <option
                                        value={schema.key}
                                        key={`optionnn ${idx}`}>
                                        {schema.name}</option>
                                )
                            })
                        }
                    </select>
                    <button onClick={() => {
                        dispatch({
                            type: 'search',
                            field: field,
                            value: search
                        })
                    }} type="button">Search
                    </button>
                </div>
            </div>
            <div>
                <button onClick={() => {
                    dispatch({
                        type: 'refresh',
                    })
                }}>Refresh
                </button>
            </div>
        </div>
    );
};

export default Form;
