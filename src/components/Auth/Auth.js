import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {HandleInputChange} from "../../reuse/HandleInputChange";
import {touched} from "../../assets/Validations";

const Auth = () => {
    const navigate = useNavigate();

    const HandleSignUp = () => {
        navigate('/register');
    }

    const [login, setLogin] = useState({
        name: "",
        password: "",
    });

    const [error, setError] = useState({
        name: "",
        password: "",
    });

    const HandleSubmit = () => {
        touched(login, error);
        console.log(login, error);
    }

    return (
        <div className = "bg-neutral-950 h-screen w-screen flex flex-col items-center overflow-x-hidden">
            <div className = "bg-[#111111] rounded-lg w-3/12 mt-40 py-8 px-6 border-[1px] border-neutral-700 mb-6">
                <h1 className = "text-4xl text-yellow-300 mb-8">Sign into Chronicle</h1>
                <h1 className = "text-neutral-200 text-md mb-2">Username</h1>
                <input
                    type="text"
                    value = {login.name}
                    name = "name"
                    onChange={(e) => HandleInputChange(e, setLogin, setError)}
                    className = "bg-neutral-950 w-full rounded-lg indent-2 text-blue-500 h-8 border-[1px] transform duration-300 border-neutral-700 focus:outline-none focus:ring-[1px] focus:ring-blue-500 mb-4"
                />
                <h1 className = "text-neutral-200 text-md mb-2">Password</h1>
                <input
                    type="text"
                    value = {login.password}
                    name = "password"
                    onChange={(e) => HandleInputChange(e, setLogin, setError)}
                    className = "bg-neutral-950 w-full rounded-lg indent-2 text-blue-500 h-8 border-[1px] transform duration-300 border-neutral-700 focus:outline-none focus:ring-[1px] focus:ring-blue-500 mb-4"
                />
                <div className = "bg-blue-500 w-full h-8 rounded-lg flex items-center justify-center text-white hover:bg-blue-600 transform duration-300 cursor-pointer" onClick={HandleSubmit}>Sign in</div>
            </div>
            <div className = "bg-[#111111] rounded-lg w-3/12 py-6 border-[1px] border-neutral-700 flex flex-col items-center justify-center">
                <h1 className = "text-neutral-200">Don't have an account? <span className = "text-blue-500 cursor-pointer" onClick = {HandleSignUp}>Sign up</span></h1>
            </div>
        </div>
    );
};

export default Auth;