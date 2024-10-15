import React from 'react';
import Logo from "../../../assets/images/final_final.png";
import {HiMagnifyingGlass} from "react-icons/hi2";
import { FaRegUserCircle, FaPlus } from "react-icons/fa";
import DropDown from "./DropDown";
import {useNavigate} from "react-router-dom";

const DashboardHeader = ({profile, open}) => {
    const name = localStorage.getItem('name');
    const image = localStorage.getItem('image');
    const navigate = useNavigate();

    return (
        <div className = "flex flex-row w-full bg-black py-4 px-6 text-neutral-200 justify-between items-center border-b-[1px] border-neutral-700">
            <div className = "flex flex-row items-center">
                <img src={Logo} onClick={() => navigate('/dashboard')}  className = "w-8 h-8 mr-4 cursor-pointer"/>
                <h1 className = "mr-20 text-2xl">{name}</h1>
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
                <div className="w-8 h-8 rounded-lg border-[1px] mr-4 border-neutral-700 flex items-center justify-center">
                    <FaPlus className = "text-neutral-700"/>
                </div>
                {image != "null" ? (
                    <img src={image} onClick={profile} className = "rounded-full w-8 h-8 cursor-pointer"/>
                ) : (
                    <FaRegUserCircle onClick={profile} className = "w-8 h-8 text-neutral-700 cursor-pointer"/>
                )}
            </div>
            <DropDown name = {name} image = {image} open = {profile} status = {open}/>
        </div>
    );
};

export default DashboardHeader;