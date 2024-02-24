import Table from "./Table";
import Form from "./Form";
import {useContext} from "react";
import {FormContext} from "../hook/useFormContext";

const Dashboard = () => {

    // const {state, dispatch} = useContext(FormContext);

    return <div style={{display: 'flex', flexDirection: 'row'}}>
        <Form/>
        <Table/>
    </div>
}

export default Dashboard;