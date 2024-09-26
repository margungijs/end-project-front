import React from 'react';
import Logo from "../assets/images/final_final.png";
import {HiMagnifyingGlass} from "react-icons/hi2";
import Image from "../assets/images/7195ce2c8612cffa80b20ebf756d99c7.jpg";
import { RiAddBoxLine } from "react-icons/ri";

const DashboardHeader = () => {
    return (
        <div className = "flex flex-row w-full bg-black py-4 px-6 text-neutral-200 justify-between items-center border-b-[1px] border-neutral-700">
            <div className = "flex flex-row items-center">
                <img src={Logo} className = "w-8 h-8 mr-4"/>
                <h1 className = "mr-20 text-2xl">Dashboard</h1>
            </div>
            <div className = "w-2/5 relative">
                <HiMagnifyingGlass className = "absolute text-neutral-700 z-10 text-xl left-2 top-1/2 transform -translate-y-1/2 pointer-events-none"/>
                <input
                    type="text"
                    placeholder = " Click to search"
                    className = "w-full pl-10 pr-4 placeholder-neutral-700 border-[1px] py-1 border-neutral-700 bg-neutral-950 rounded-md focus:outline-none focus:ring-[1px] focus:ring-blue-500 transform duration-300"
                />
                <div className="absolute left-9 top-1/2 transform -translate-y-1/2 h-5 border-r-[1px] border-neutral-700"></div>
            </div>
            <div className = "flex flex-row items-center">
                <div className="w-8 h-8 rounded-lg border-[1px] mr-4 border-neutral-700 relative flex items-center justify-center">
                    <h1 className = "text-neutral-600 font-normal text-2xl">+</h1>
                </div>
                <img src={Image} className = "rounded-full w-8 h-8"/>
            </div>
        </div>
    );
};

export default DashboardHeader;