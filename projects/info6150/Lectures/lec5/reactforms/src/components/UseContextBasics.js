const {useContext} = require("react");

const MyContext = React.createContext();

function ChildComponent() {
    const value = useContext(MyContext);
    return <h1>{value}</h1>
}

function MyApp() {
    return <MyContext.Provider value={'hello'}>
        <ChildComponent/>
    </MyContext.Provider>
}