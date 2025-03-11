import './App.css';
import { Route, Routes } from 'react-router-dom';
import Landing from "./components/Landing";
import Register from "./components/Auth/Register.jsx";
import Auth from "./components/Auth/Auth.jsx";
import Dashboard from "./components/Dashboard/Main/Dashboard";
import { useEffect} from "react";
import axios from "axios";
import Settings from "./components/Settings/Main/Settings";
import ProfileMain from "./components/Profile/ProfileMain";
import TemplateMain from "./components/Template/TemplateMain";
import PostMain from "./components/Post/PostMain";
import MessageMain from "./components/Message/MessageMain";
import PostsMain from "./components/Posts/PostsMain";
import CollectionMain from "./components/Collection/CollectionMain";

function App() {
    useEffect(() => {
        axios.defaults.withCredentials = true;
        axios.defaults.withXSRFToken = true;
    }, []);

    return (
        <Routes>
            <Route path='/' element={<Landing />} />
            <Route path='/register' element={<Register />} />
            <Route path='/auth' element = {<Auth />} />
            <Route path='/dashboard' element = {<Dashboard />} />
            <Route path='/Settings' element = {<Settings />} />
            <Route path='/Profiles/:username' element = {<ProfileMain />} />
            <Route path = "/Template" element = {<TemplateMain />} />
            <Route path = "/Post" element = {<PostMain />} />
            <Route path = "/Message" element = {<MessageMain />} />
            <Route path = "/Posts" element = {<PostsMain />} />
            <Route path = "/Collection" element = {<CollectionMain />} />
        </Routes>
    )
}

export default App;
