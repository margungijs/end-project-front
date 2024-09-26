import './App.css';
import { Route, Routes } from 'react-router-dom';
import Landing from "./components/Landing";
import Register from "./components/Auth/Register.js";
import Auth from "./components/Auth/Auth.js";
import Dashboard from "./components/Dashboard";
import Verification from "./components/Auth/Verification";


function App() {
    return (
        <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/register' element={<Register />} />
            <Route path='/auth' element = {<Auth />} />
            <Route path='/dashboard' element = {<Dashboard />} />
            <Route path='/Verification' element = {<Verification />} />
        </Routes>
    )
}

export default App;
