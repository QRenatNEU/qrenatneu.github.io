import React, {useContext} from 'react';
import {userSchema} from "../util/userSchema";
import {FormContext} from "../hook/useFormContext";

const Table = () => {

    const {state, dispatch} = useContext(FormContext);

    const data = state.data;

    function onEdit(index) {
        console.log(data, data[index], index)
        dispatch({
            type: 'select',
            data: data[index]
        })
    }

    function onDelete(index) {
        dispatch({
            type: 'delete',
            id: data[index].id
        })
    }

    console.log('table aaaa', data)

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            paddingTop: 24
        }}>
            <div>Click on table header to sort</div>
            {
                data && data.length > 0 ? (
                    <table border={1} style={{marginTop: 24}}>
                        <thead>
                        <tr>
                            {
                                userSchema.map((schema, indx) => {
                                    return <th key={`oh my th ${indx}`}>
                                        <button onClick={() => {
                                            dispatch({
                                                type: 'sort',
                                                field: schema.key
                                            })
                                        }}>{schema.name}</button>
                                    </th>
                                })
                            }
                        </tr>
                        </thead>
                        <tbody>
                        {/*<tr>*/}
                        {/*    <td>sfds</td>*/}
                        {/*</tr>*/}
                        {data.map((item, index) => (
                            <tr key={index}>
                                {
                                    userSchema.map((schema, indx) => {
                                        // console.log(item, schema, item[schema.key])
                                        return <td key={`ohhhh my td ${indx}`}>{item[schema.key]}</td>
                                    })
                                }
                                <td>
                                    <button onClick={() => onEdit(index)}>Edit</button>
                                    <button onClick={() => onDelete(index)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                ) : (
                    <div>Your current list is empty.</div>
                )
            }
        </div>
    );
};

export default Table;
