import React from 'react';
import {FaHome} from "react-icons/fa";
import {GoStarFill} from "react-icons/go";
import {FaMessage} from "react-icons/fa6";
import {BsStars} from "react-icons/bs";
import {useNavigate} from "react-router-dom";
import {icons} from "../../../assets/IconChoices";

const Shortcuts = ({ shortcuts, show }) => {
    const navigate = useNavigate();
    const id = localStorage.getItem('id');

    const navigateProfile = (name, id) => {
        navigate('/Profiles/' + name, { state: { id } });
    };

    const navigateFriends = () => {
        navigate('/settings?section=friends')
    }

    const navigateShortcuts = (route, friend = null) => {
        if(route === "Profile"){
            navigate('/Profiles/You', {state: {id: id}})
        }else if(route === "Settings"){
            navigate('/settings')
        }else if(/^\d+$/.test(route)){
            navigate(`/Profiles/${friend}`, {state: {id: route}})
        }else if (/^\d+msg$/.test(route)) {
            const id = route.match(/^(\d+)msg$/)[1];
            navigate('/Message', { state: { id: Number(id) } });
        }else if(route === 'Posts'){
            navigate('/Posts')
        }
    }

    return (
        <div
            className={`h-full z-20 p-2 lg:w-1/4 w-full absolute left-0 top-0 bg-[#111111] py-8 px-6 transform transition-all duration-500 ease-in-out 
        ${show === "shortcuts" ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"} 
        lg:translate-x-0 lg:opacity-100`}
        >
            <div className="flex flex-row justify-between items-center mb-8">
                <h1 className="text-neutral-200 text-2xl">Shortcuts</h1>
                <div
                    className="bg-blue-600 rounded-lg flex flex-col items-center justify-center px-4 py-1 cursor-pointer hover:bg-blue-700 transition duration-300"
                    onClick = {() => navigate('/Settings?section=shortcuts')}
                >
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
            <div
                className="flex flex-row items-center cursor-pointer text-neutral-300 hover:text-blue-500 transition duration-300 mb-8"
                onClick = {() => navigateFriends()}
            >
                <BsStars className="text-neutral-300 mr-4 w-8 h-8" />
                <h1 className="text-xl">Friends</h1>
            </div>
            {shortcuts.map((shortcut, index) => (
                <div
                    className={`flex flex-row items-center cursor-pointer text-neutral-200 transition duration-300 mb-8`}
                    key={index}
                    onClick = {() => navigateShortcuts(shortcut.route, shortcut.name)}
                >
                    {icons.find(icon => icon.value === shortcut.customisation.icon)?.logo}
                    <h1 className={`text-xl text-${shortcut.customisation.color}-700 hover:text-${shortcut.customisation.hover_color}-700`}>{shortcut.name}</h1>
                </div>
            ))}
        </div>
    );
};

export default Shortcuts;
