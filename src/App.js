import './App.css';
import { Route, Routes } from 'react-router-dom';
import Landing from "./components/Landing";
import Register from "./components/Auth/Register.jsx";
import Auth from "./components/Auth/Auth.jsx";
import Dashboard from "./components/Dashboard/Main/Dashboard";
import Verification from "./components/Auth/Verification";
import { useEffect} from "react";
import axios from "axios";
import Settings from "./components/Settings/Main/Settings";
import ProfileMain from "./components/Profile/ProfileMain";


function App() {
    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.defaults.withXSRFToken = true;
    });

    return (
        <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/register' element={<Register />} />
            <Route path='/auth' element = {<Auth />} />
            <Route path='/dashboard' element = {<Dashboard />} />
            <Route path='/Verification' element = {<Verification />} />
            <Route path='/Settings' element = {<Settings />} />
            <Route path='/Profiles' element = {<ProfileMain />} />
        </Routes>
    )
}

export default App;
