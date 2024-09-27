import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {HandleInputChange} from "../../reuse/HandleInputChange";
import {errorCheck, touched} from "../../assets/Validations";
import SendData from "../../reuse/SendData";
import Cookies from 'js-cookie';
import {OrbitProgress} from "react-loading-indicators";

const Auth = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const HandleSignUp = () => {
        navigate('/register');
    }

    const HandleRedirect = () => {
        navigate('/dashboard');
    }

    const isLoading = () => {
        setLoading(true);
    }

    const stopLoading = () => {
        setLoading(false);
    }

    const [login, setLogin] = useState({
        name: "",
        password: "",
    });

    const [error, setError] = useState({
        name: "",
        password: "",
    });

    const [forceUpdate, setForceUpdate] = useState(false);

    const HandleSubmit = () => {
        touched(login, error);
        console.log(login, error)
        setForceUpdate(prevState => !prevState);
        if(!errorCheck(error)){
            SendData(login, "http://localhost/api/auth/login", isLoading)
                .then(response => {
                    console.log("Data sent succesfully", response)
                    stopLoading();
                    if(response.access_token){
                        Cookies.set('access_token', response.access_token, {expires: 7, path: '/'})
                        HandleRedirect();
                    }else if (response.password){
                        setError((prevState) => ({
                            ...prevState,
                            "password": "Incorrect password"
                        }));
                    }else{
                        setError((prevState) => ({
                            ...prevState,
                            "name": "Username not found"
                        }));
                    }
                })
                .catch(error => {
                    console.error('Error sending data:', error.message);
                });
        }
    }

    return (
        <div className = "bg-neutral-950 h-screen w-screen flex flex-col items-center overflow-x-hidden">
            <div className = "bg-[#111111] rounded-lg w-3/12 mt-40 py-8 px-6 border-[1px] border-neutral-700 mb-6">
                {!loading && (
                    <>
                        <h1 className = "text-4xl text-yellow-300 mb-8">Sign into Chronicle</h1>
                        <h1 className = "text-neutral-200 text-md mb-2">Username</h1>
                        <input
                            type="text"
                            value = {login.name}
                            name = "name"
                            onChange={(e) => HandleInputChange(e, setLogin, setError)}
                            className = " mb-2 bg-neutral-950 w-full rounded-lg indent-2 text-blue-500 h-8 border-[1px] transform duration-300 border-neutral-700 focus:outline-none focus:ring-[1px] focus:ring-blue-500"
                        />
                        <p className = "mb-4 text-red-500">{error.name}</p>
                        <h1 className = "text-neutral-200 text-md mb-2">Password</h1>
                        <input
                            type="password"
                            value = {login.password}
                            name = "password"
                            onChange={(e) => HandleInputChange(e, setLogin, setError)}
                            className = "mb-2 bg-neutral-950 w-full rounded-lg indent-2 text-blue-500 h-8 border-[1px] transform duration-300 border-neutral-700 focus:outline-none focus:ring-[1px] focus:ring-blue-500"
                        />
                        <p className = "mb-4 text-red-500">{error.password}</p>
                        <div className = "bg-blue-500 w-full h-8 rounded-lg flex items-center justify-center text-white hover:bg-blue-600 transform duration-300 cursor-pointer" onClick={HandleSubmit}>Sign in</div>


                    </>
                )}
                {loading && (
                    <div className = "w-full flex flex-col justify-center items-center py-40">
                        <OrbitProgress variant="track-disc" dense color="#3163cc" size="medium" text="" textColor="" />
                        <h1 className = "text-blue-500/30 text-2xl">Loading</h1>
                    </div>
                )}
            </div>
            <div className = "bg-[#111111] rounded-lg w-3/12 py-6 border-[1px] border-neutral-700 flex flex-col items-center justify-center">
                <h1 className = "text-neutral-200">Don't have an account? <span className = "text-blue-500 cursor-pointer" onClick = {HandleSignUp}>Sign up</span></h1>
            </div>
        </div>
    );
};

export default Auth;