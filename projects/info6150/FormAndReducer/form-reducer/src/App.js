import logo from './logo.svg';
import './App.css';
import Dashboard from "./components/Dashboard";
import {FormProvider} from "./hook/useFormContext";

function App() {
  return (
    <div className="App">
      <FormProvider>
          <Dashboard/>
      </FormProvider>
    </div>
  );
}

export default App;
