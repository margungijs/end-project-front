import React from 'react';
import {FaHome} from "react-icons/fa";
import {GoStarFill} from "react-icons/go";
import {FaMessage} from "react-icons/fa6";
import {BsStars} from "react-icons/bs";

const Shortcuts = ({shortcuts}) => {
    return (
        <div className = "h-full p-2 w-1/4">
            <div className = "rounded-md h-screen flex flex-col bg-[#111111] border-[1px] border-neutral-700 py-8 px-6">
                <div className = "flex flex-row justify-between items-center mb-8">
                    <h1 className = "text-neutral-200 text-2xl">Shortcuts</h1>
                    <div className = "bg-blue-600 rounded-lg flex flex-col items-center justify-center px-4 py-1 cursor-pointer hover:bg-blue-700 transform duration-300">
                        <h1 className = "text-white">New</h1>
                    </div>
                </div>
                <div className = "flex flex-row items-center cursor-pointer text-neutral-300  hover:text-blue-500 transform duration-300 mb-8">
                    <FaHome className = "text-neutral-300 mr-4 w-8 h-8"/>
                    <h1 className = "text-xl">Home</h1>
                </div>
                <div className = "flex flex-row items-center cursor-pointer text-neutral-300 hover:text-blue-500 transform duration-300 mb-8">
                    <GoStarFill className = "text-neutral-300 mr-4 w-8 h-8"/>
                    <h1 className = " text-xl">Your Posts</h1>
                </div>
                <div className = "flex flex-row items-center cursor-pointer text-neutral-300  hover:text-blue-500 transform duration-300 mb-8">
                    <FaMessage className = "text-neutral-300 mr-4 w-8 h-8"/>
                    <h1 className = "text-xl">Messages</h1>
                </div>
                <div className = "flex flex-row items-center cursor-pointer text-neutral-300 hover:text-blue-500 transform duration-300 mb-8">
                    <BsStars className = "text-neutral-300 mr-4 w-8 h-8"/>
                    <h1 className = "text-xl">Friends</h1>
                </div>
                {shortcuts.map((shortcut, index) => (
                    <div
                        className = {`flex flex-row items-center cursor-pointer text-${shortcut.customisation.color}-500 hover:text-${shortcut.customisation.color_hover}-700 transform duration-300 mb-8`}
                        key = {index}
                    >
                        <BsStars className = "text-neutral-300 mr-4 w-8 h-8"/>
                        <h1 className = "text-xl">{shortcut.name}</h1>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Shortcuts;