import React from 'react';
import Logo from "../assets/images/final_final.png";

const Header = () => {
    return (
        <div className = "flex flex-row justify-between my-4 text-neutral-200 text-md px-8 duration-300 transition w-full">
            <div className = "flex flex-row ml-2">
                <img src={Logo} className = "w-9 h-9"/>
                <h1 className = "mr-6 ml-10 items-center flex font-medium cursor-pointer hover:text-neutral-300 duration-300 transition">Home</h1>
                <h1 className = "mx-6 items-center flex font-medium cursor-pointer hover:text-neutral-300 duration-300 transition">How It Works</h1>
                <h1 className = "mx-6 items-center flex font-medium cursor-pointer hover:text-neutral-300 duration-300 transition">About Us</h1>
            </div>
            <div className = "flex flex-row mr-2">
                <div className = "w-6 h-6 mx-4 items-center flex cursor-pointer hover:bg-blue-600 bouncing-button rounded-full bg-blue-500 duration-300 transition"></div>
                <div className = "w-6 h-6 mx-4 items-center flex cursor-pointer hover:bg-green-600 bouncing-button rounded-full bg-green-500 duration-300 transition"></div>
                <div className = "w-6 h-6 mx-4 items-center flex cursor-pointer hover:bg-purple-600 bouncing-button rounded-full bg-purple-500 duration-300 transition"></div>
                <h1 className = "ml-10 items-center flex font-medium cursor-pointer hover:text-neutral-300 duration-300 transition">Sign In</h1>
                <h1 className = "ml-4 items-center flex font-medium cursor-pointer hover:text-neutral-300 duration-300 transition border-[1px] border-neutral-200 rounded px-3 py-1 hover:border-neutral-300">Sign Up</h1>
            </div>
        </div>
    );
};

export default Header;