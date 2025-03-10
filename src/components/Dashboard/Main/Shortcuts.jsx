import React from 'react';
import {FaHome} from "react-icons/fa";
import {GoStarFill} from "react-icons/go";
import {FaMessage} from "react-icons/fa6";
import {BsStars} from "react-icons/bs";
import {useNavigate} from "react-router-dom";

const Shortcuts = ({ shortcuts, show }) => {
    const navigate = useNavigate();

    const navigateProfile = (name, id) => {
        navigate('/Profiles/' + name, { state: { id } });
    };

    return (
        <div
            className={`h-full p-2 lg:w-1/4 w-full absolute left-0 top-0 bg-[#111111] py-8 px-6 transform transition-all duration-500 ease-in-out 
        ${show === "shortcuts" ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"} 
        lg:translate-x-0 lg:opacity-100`}
        >
            <div className="flex flex-row justify-between items-center mb-8">
                <h1 className="text-neutral-200 text-2xl">Shortcuts</h1>
                <div className="bg-blue-600 rounded-lg flex flex-col items-center justify-center px-4 py-1 cursor-pointer hover:bg-blue-700 transition duration-300">
                    <h1 className="text-white">New</h1>
                </div>
            </div>
            <div className="flex flex-row items-center cursor-pointer text-neutral-300 hover:text-blue-500 transition duration-300 mb-8">
                <FaHome className="text-neutral-300 mr-4 w-8 h-8" />
                <h1 className="text-xl">Home</h1>
            </div>
            <div
                className="flex flex-row items-center cursor-pointer text-neutral-300 hover:text-blue-500 transition duration-300 mb-8"
                onClick={() => navigate('/Posts')}
            >
                <GoStarFill className="text-neutral-300 mr-4 w-8 h-8" />
                <h1 className=" text-xl">Your Posts</h1>
            </div>
            <div
                className="flex flex-row items-center cursor-pointer text-neutral-300 hover:text-blue-500 transition duration-300 mb-8"
                onClick={() => navigate('/Message')}
            >
                <FaMessage className="text-neutral-300 mr-4 w-8 h-8" />
                <h1 className="text-xl">Messages</h1>
            </div>
            <div className="flex flex-row items-center cursor-pointer text-neutral-300 hover:text-blue-500 transition duration-300 mb-8">
                <BsStars className="text-neutral-300 mr-4 w-8 h-8" />
                <h1 className="text-xl">Friends</h1>
            </div>
            {shortcuts.map((shortcut, index) => (
                <div
                    className={`flex flex-row items-center cursor-pointer text-neutral-200 hover:text-${shortcut.customisation.color_hover}-700 transition duration-300 mb-8`}
                    key={index}
                    onClick={() => {
                        /^\d+$/.test(shortcut.route)
                            ? navigateProfile(shortcut.name, parseInt(shortcut.route))
                            : navigate('/' + shortcut.route);
                    }}
                >
                    <BsStars className="text-neutral-300 mr-4 w-8 h-8" />
                    <h1 className="text-xl">{shortcut.name}</h1>
                </div>
            ))}
        </div>
    );
};

export default Shortcuts;
