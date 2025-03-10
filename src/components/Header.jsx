import React from 'react';
import Logo from "../assets/images/final_final.png";
import {useNavigate} from "react-router-dom";
import { TbLogin } from "react-icons/tb";

const Header = () => {
    const navigate = useNavigate();

    const HandleLogin = () => {
        navigate('/auth')
    }

    const HandleRegister = () => {
        navigate('/register')
    }

    return (
        <div className = "flex flex-row justify-between items-center my-4 text-neutral-200 text-md md:px-8 px-2 duration-300 transition w-full">
            <div className = "flex flex-row md:ml-2">
                <img src={Logo} className = "w-9 h-9 self-center"/>
                <h1 className = "md:mr-6 mr-4 text-center md:ml-10 ml-4 items-center flex font-medium cursor-pointer hover:text-neutral-300 duration-300 transition">Home</h1>
                <h1 className = "md:mx-6 mr-4 text-center items-center flex font-medium cursor-pointer hover:text-neutral-300 duration-300 transition">How It Works</h1>
                <h1 className = "md:mx-6 mx-4 text-center items-center flex font-medium cursor-pointer hover:text-neutral-300 duration-300 transition">About Us</h1>
            </div>
            <div className = "flex flex-row mr-2">
                <h1
                    className = "ml-10  items-center md:flex hidden font-medium cursor-pointer hover:text-neutral-300 duration-300 transition"
                    onClick = {HandleLogin}
                >Sign In</h1>
                <h1
                    className = "md:ml-4 ml-2 items-center md:flex hidden font-medium cursor-pointer hover:text-neutral-300 duration-300 transition border-[1px] border-neutral-200 rounded px-3 py-1 hover:border-neutral-300"
                    onClick = {HandleRegister}
                >Sign Up</h1>
                <div
                    className = "md:hidden flex items-center text-3xl cursor-pointer"
                    onClick = {HandleLogin}
                >
                    <TbLogin/>
                </div>
            </div>
        </div>
    );
};

export default Header;