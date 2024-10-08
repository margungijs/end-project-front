import './App.css';
import { Route, Routes } from 'react-router-dom';
import Landing from "./components/Landing";
import Register from "./components/Auth/Register.jsx";
import Auth from "./components/Auth/Auth.jsx";
import Dashboard from "./components/Dashboard/Dashboard";
import Verification from "./components/Auth/Verification";
import ProfileImage from "./components/Auth/ProfileImage";
import { useEffect} from "react";
import axios from "axios";


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
            <Route path='/profileImage' element = {<ProfileImage />} />
        </Routes>
    )
}

export default App;
