import React, {useState} from 'react';
import {FaHome} from "react-icons/fa";
import {GoStarFill} from "react-icons/go";
import {FaMessage} from "react-icons/fa6";
import {BsStars} from "react-icons/bs";
import {icons} from "../../../assets/IconChoices.js";
import { MdDelete } from "react-icons/md";
import SendDataGeneral from "../../../reuse/SendDataGeneral";
import {API_URL} from "../../../config";

const ShortcutPreview = ({shortcuts, preview, remove}) => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const removeShortcut = async (id) => {
        try{
            await SendDataGeneral({id: id}, `${API_URL}/api/authenticated/removeShortcut`);
            remove(id)
        } catch(error){
            console.log(error);
        }
    }

    return (
        <div className = "rounded-md h-screen md:flex hidden flex-col bg-[#111111] border-[1px] border-neutral-700 py-8 px-6 lg:w-1/4 w-1/3">
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
                    key={index}
                    className={`relative flex flex-row items-center cursor-pointer 
                        text-${shortcut.customisation.color.toLowerCase()}-500
                        transform transition-all duration-300 mb-8`}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <div className="relative w-8 h-8 mr-4">
                        <div
                            className={`absolute w-full h-full transition-all duration-200 delay-100
                            ${hoveredIndex === index ? "opacity-0 scale-90" : "opacity-100 scale-100"}`}
                        >
                            {React.cloneElement(
                                icons.find((item) => item.value === parseInt(shortcut.customisation.icon)).logo,
                                { className: "w-8 h-8 text-neutral-300" }
                            )}
                        </div>
                    </div>

                    <div className="relative w-40 h-8">
                        <h1
                            className={`absolute w-full text-xl transition-all duration-200 delay-100 
                            ${hoveredIndex === index ? "opacity-0 scale-90" : "opacity-100 scale-100"}`}
                        >
                            {shortcut.name}
                        </h1>

                        <h1
                            className={`absolute w-full text-xl transition-all duration-200 delay-100 
                            ${hoveredIndex === index ? "opacity-100 scale-100" : "opacity-0 scale-90"}`}
                            onClick={() => removeShortcut(shortcut.id)}
                        >
                            Delete Shortcut
                        </h1>
                    </div>
                </div>
            ))}
            <div className = "flex flex-row items-center cursor-pointer text-neutral-300 hover:text-blue-500 transform duration-300 mb-8">
                {preview.icon !== 0 && (
                    <div className="text-neutral-300 mr-4">
                        {React.cloneElement(icons.find((item) => item.value === preview.icon).logo, { className: "w-8 h-8" })}
                    </div>
                )}
                <h1 className = {`text-xl transition duration-200 text-${preview.color.toLowerCase()}-500`}>{preview.name}</h1>
            </div>
        </div>
    );
};

export default ShortcutPreview;