import {useState} from "react";
import Form from "./Form";

const users = [
    { id: 1, name: "John Doe", email: "johndoe@example.com", age: 28 },
    { id: 2, name: "Jane Smith", email: "janesmith@example.com", age: 32 },
    { id: 3, name: "Michael Brown", email: "michaelbrown@example.com", age: 45 },
    { id: 4, name: "Sarah Davis", email: "sarahdavis@example.com", age: 22 },
    { id: 5, name: "William Johnson", email: "williamjohnson@example.com", age: 35 },
    { id: 6, name: "Patricia Williams", email: "patriciawilliams@example.com", age: 40 },
    { id: 7, name: "Robert Jones", email: "robertjones@example.com", age: 50 },
    { id: 8, name: "Linda Brown", email: "lindabrown@example.com", age: 26 },
    { id: 9, name: "Thomas Garcia", email: "thomasgarcia@example.com", age: 31 },
    { id: 10, name: "Barbara Martinez", email: "barbaramartinez@example.com", age: 29 },
    { id: 11, name: "James Rodriguez", email: "jamesrodriguez@example.com", age: 24 },
    { id: 12, name: "Jennifer Lee", email: "jenniferlee@example.com", age: 27 },
    { id: 13, name: "Charles Perez", email: "charlesperez@example.com", age: 43 },
    { id: 14, name: "Angela White", email: "angelawhite@example.com", age: 38 },
    { id: 15, name: "Thomas Anderson", email: "thomasanderson@example.com", age: 33 }
];

export default function FormPage() {

    const [formItems, setFormItems] = useState(users);

    return <div>
        <h1>User Form</h1>
        <Form itemList={formItems} setItemList={setFormItems}/>
    </div>
}
