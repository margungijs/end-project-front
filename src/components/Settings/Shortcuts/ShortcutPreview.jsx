import React from 'react';
import {FaHome} from "react-icons/fa";
import {GoStarFill} from "react-icons/go";
import {FaMessage} from "react-icons/fa6";
import {BsStars} from "react-icons/bs";
import {icons} from "../../../assets/IconChoices.js";

const ShortcutPreview = ({shortcuts, preview}) => {
    return (
        <div className = "rounded-md h-screen flex flex-col bg-[#111111] border-[1px] border-neutral-700 py-8 px-6 w-1/3">
            <div className = "flex flex-row justify-between items-center mb-8">
                <h1 className = "text-neutral-600 text-2xl">Shortcut preview</h1>
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
            <div className = "flex flex-row items-center cursor-pointer text-neutral-300 hover:text-blue-500 transform duration-300 mb-8">
                {preview.icon !== 0 && (
                    <div className="text-neutral-300 mr-4">
                        {React.cloneElement(icons.find((item) => item.value === preview.icon).logo, { className: "w-8 h-8" })}
                    </div>
                )}
                <h1 className = {`text-xl transition duration-200 text-${preview.color.toLowerCase()}-500 hover:text-${preview.hover_color.toLowerCase()}-700`}>{preview.name}</h1>
            </div>
        </div>
    );
};

export default ShortcutPreview;