import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {HandleInputChange} from "../../reuse/HandleInputChange";
import {errorCheck, touched, passwords} from "../../assets/Validations.jsx";
import SendData from "../../reuse/SendData";
import {OrbitProgress} from "react-loading-indicators";
import {API_URL} from "../../config";

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false)

    const isLoading = () => {
        setLoading(true);
    }

    const stopLoading = () => {
        setLoading(false);
    }

    const HandleSignIn = () => {
        navigate('/auth');
    }

    const HandleRedirect = () => {
        navigate('/verification');
    }

    const [register, setRegister] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    });

    const [error, setError] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: ""
    });

    const [forceUpdate, setForceUpdate] = useState(false);

    const HandleSubmit = async () => {
        touched(register, error);
        setForceUpdate(prevState => !prevState);
        if(passwords(register.password, register.password_confirmation)) {
            if(register.password !== ""){
                setError((prevState) => ({
                    ...prevState,
                    "password": ""
                }));
            }
            if(!errorCheck(error)){
                SendData(
                    register, `${API_URL}/register`, isLoading
                ).then(response => {
                    console.log(response)
                    stopLoading()
                    setSuccess(true)

                    setRegister({
                        name: "",
                        email: "",
                        password: "",
                        password_confirmation: ""
                    })
                }).catch(error => {
                    console.log("Error", error.response['data']['errors'])
                    stopLoading()
                    const validationErrors = error.response['data']['errors'];

                    setError({
                        name: validationErrors.name ? validationErrors.name[0] : "",
                        email: validationErrors.email ? validationErrors.email[0] : "",
                        password: validationErrors.password ? validationErrors.password[0] : "",
                        password_confirmation: validationErrors.password_confirmation ? validationErrors.password_confirmation[0] : ""
                    });
                })
            }
        }else{
            setError((prevState) => ({
                ...prevState,
                "password": "Passwords don't match"
            }));
        }
    }

    return (
        <div className = "bg-neutral-950 h-screen w-screen flex flex-col items-center overflow-x-hidden">
            <div className = "bg-[#111111] rounded-lg lg:w-3/12 md:w-4/12 w-8/12 mt-20 py-8 px-6 border-[1px] border-neutral-700 mb-6">
                {!loading && (
                    <>
                    <h1 className = "text-4xl text-purple-500 mb-8 text-center">Sign up to Chronicle</h1>
                    <h1 className = "text-neutral-200 text-md mb-2">Username</h1>
                    <input
                        type="text"
                        value = {register.name}
                        name = "name"
                        onChange = {(e) => HandleInputChange(e, setRegister, setError, "register")}
                        className = "mb-2 placeholder-purple-500/50 bg-neutral-950 w-full rounded-lg indent-2 text-purple-500 h-8 border-[1px] transform duration-300 border-neutral-700 focus:outline-none focus:ring-[1px] focus:ring-purple-500"
                    />
                    <p className = "mb-4 text-red-500">{error.name}</p>
                    <h1 className = "text-neutral-200 text-md mb-2">Email</h1>
                    <input
                        type="text"
                        value = {register.email}
                        name = "email"
                        onChange = {(e) => HandleInputChange(e, setRegister, setError, "register")}
                        className = "mb-2 placeholder-purple-500/50 bg-neutral-950 w-full rounded-lg indent-2 text-purple-500 h-8 border-[1px] transform duration-300 border-neutral-700 focus:outline-none focus:ring-[1px] focus:ring-purple-500"
                    />
                    <p className = "mb-4 text-red-500">{error.email}</p>
                    <h1 className = "text-neutral-200 text-md mb-2">Password</h1>
                    <input
                        type="password"
                        value = {register.password}
                        name = "password"
                        onChange = {(e) => HandleInputChange(e, setRegister, setError, "register")}
                        className = "mb-2 placeholder-purple-500/50 bg-neutral-950 w-full rounded-lg indent-2 text-purple-500 h-8 border-[1px] transform duration-300 border-neutral-700 focus:outline-none focus:ring-[1px] focus:ring-purple-500"
                    />
                    <p className = "mb-4 text-red-500">{error.password}</p>
                    <h1 className = "text-neutral-200 text-md mb-2">Confirm password</h1>
                    <input
                        type="password"
                        value = {register.password_confirmation}
                        name = "password_confirmation"
                        onChange = {(e) => HandleInputChange(e, setRegister, setError, "register")}
                        className = "mb-2 placeholder-purple-500/50 bg-neutral-950 w-full rounded-lg indent-2 text-purple-500 h-8 border-[1px] transform duration-300 border-neutral-700 focus:outline-none focus:ring-[1px] focus:ring-purple-500"
                    />
                    <p className = "mb-4 text-red-500">{error.password_confirmation}</p>
                    <div
                        className = "bg-green-500 w-full h-8 rounded-lg flex items-center justify-center text-white hover:bg-green-600 transform duration-300 cursor-pointer"
                        onClick={HandleSubmit}
                    >Sign up</div>
                    </>
                )}
                {loading && (
                    <div className = "w-full flex flex-col justify-center items-center py-40">
                        <OrbitProgress variant="track-disc" dense color="green-500" size="medium" text="" textColor="" />
                        <h1 className = "text-green-500/30 text-2xl">Loading</h1>
                    </div>
                )}
            </div>
            {success && (
                <div className = "bg-[#111111] rounded-lg lg:w-3/12 md:w-4/12 w-8/12 py-6 border-[1px] border-green-700 flex flex-col text-center items-center justify-center mb-4">
                    <h1 className = "text-green-700">Sign up successful</h1>
                </div>
            )}
            <div className = "bg-[#111111] mb-10 rounded-lg lg:w-3/12 md:w-4/12 w-8/12 py-6 border-[1px] border-neutral-700 text-center flex flex-col items-center justify-center">
                <h1 className = "text-neutral-200">Already have an account? <span className = "text-green-500 cursor-pointer" onClick = {HandleSignIn}>Sign in</span></h1>
            </div>
        </div>
    );
};

export default Register;