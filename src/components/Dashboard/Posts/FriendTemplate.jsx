import React, {useState} from 'react';
import { IoDocumentTextOutline } from "react-icons/io5";
import { GoTriangleDown } from "react-icons/go";
import {FaRegUserCircle} from "react-icons/fa";
import {PiStarFourFill} from "react-icons/pi";
import templateImage from "../../../assets/images/placeholder.png"

const FriendTemplate = ({name, image, title, date, questions, description, like, liked}) => {
    const [open, setOpen] = useState(false);
    const [likedTemplate, setLikedTemplate] = useState(liked);

    return (
        <div className = "flex flex-col bg-[#111111] p-4 rounded-lg">
            <div className = "flex flex-row items-center">
                {image !== null ? (
                    <img src={"http://localhost/storage/" + image} className = "w-8 h-8 rounded-full mr-2"/>
                ) : (
                    <FaRegUserCircle className = "w-8 h-8 text-neutral-700 mr-2"/>
                )}
                <h1 className = "text-neutral-200 mr-1">{name}</h1>
                <IoDocumentTextOutline className = "text-neutral-200 mr-1"/>
                <h1 className = "text-neutral-600">made a new template</h1>
            </div>
            <h1 className = "text-neutral-600 text-sm ml-10 mb-4">{date}</h1>
            <div className = "flex flex-row bg-neutral-900 items-center rounded-md p-4 justify-between">
                <div className = "flex flex-row items-center">
                    {image !== null ? (
                        <img src={"http://localhost/storage/" + image} className = "w-6 h-6 rounded-full mr-2"/>
                    ) : (
                        <FaRegUserCircle className = "w-6 h-6 text-neutral-700 mr-2"/>
                    )}                    <h1 className = "text-neutral-200">{name}: {title}</h1>
                </div>
                <div
                    className = "bg-neutral-900 hover:bg-neutral-800 transition duration-200 cursor-pointer rounded-md px-2 flex items-center flex-row py-1"
                    onClick = {() => setOpen(!open)}
                >
                    <GoTriangleDown className = {`text-neutral-600 mr-3 transition duration-200  ${open ? "rotate-180" : ""}`}/>
                    <h1 className = "text-neutral-200 text-sm">View</h1>
                </div>
            </div>
            <div className={`transition-all duration-300 overflow-hidden ${open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="mt-2 flex md:flex-row flex-col bg-neutral-900 gap-2 rounded-md p-2">
                    <div className="bg-[#111111] md:w-1/2 w-full p-2 rounded-md">
                        <div
                            className="h-40 rounded-lg mb-4"
                            style={{ backgroundImage: `url(${templateImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                        ></div>
                        {questions.map((question, index) => (
                            <div className = "flex flex-col">
                                <h1 className = "text-neutral-200 text-xl mb-1">{question}</h1>
                                <div className = "h-2 rounded-md w-full bg-neutral-800 mb-1"></div>
                                <div className = "h-2 rounded-md w-1/2 bg-neutral-800 mb-1"></div>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col p-2 md:w-1/2 w-full justify-between">
                        <div className="flex flex-col gap-2 mb-2">
                            <h1 className="text-neutral-200 text-2xl">{title}</h1>
                            <h1 className="text-neutral-600 text-md">{description}</h1>
                        </div>
                        <PiStarFourFill
                            onClick={() => {like(); setLikedTemplate(!liked);}}
                            className={`w-10 h-10 cursor-pointer ${likedTemplate ? "text-yellow-500" : "text-neutral-700"} hover:text-yellow-500 transition duration-200`}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FriendTemplate;