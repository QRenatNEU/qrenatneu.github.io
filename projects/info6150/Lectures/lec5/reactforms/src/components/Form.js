import React, { useState } from 'react';

const Form = ({ formData, setFormData, onSubmit }) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit();
    };
    return (
        <form onSubmit={handleSubmit}>
            <label>
                First Name:
                <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Last Name:
                <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
};

const Table = ({ data, onEdit, onDelete }) => {
    return (
        <table>
            <thead>
            <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {data.map((row, index) => (
                <tr key={index}>
                    <td>{row.firstName}</td>
                    <td>{row.lastName}</td>
                    <td>{row.email}</td>
                    <td>
                        <button onClick={() => onEdit(index)}>Edit</button>
                        <button onClick={() => onDelete(index)}>Delete</button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

const App = () => {
    const [tableData, setTableData] = useState([]);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });
    const [editIndex, setEditIndex] = useState(null);
    const handleFormSubmit = () => {
        if (editIndex !== null) {
            const newData = [...tableData];
            newData[editIndex] = formData;
            setTableData(newData);
            setEditIndex(null);
        } else {
            setTableData([...tableData, formData]);
        }
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
        });
    };
    const handleEdit = (index) => {
        setEditIndex(index);
        setFormData(tableData[index]);
    };
    const handleDelete = (index) => {
        const newData = [...tableData];
        newData.splice(index, 1);
        setTableData(newData);
    };
    return (
        <div>
            <Form
                formData={formData}
                setFormData={setFormData}
                onSubmit={handleFormSubmit}
            />
            <Table
                data={tableData}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
        </div>
    );
};

export default App;
