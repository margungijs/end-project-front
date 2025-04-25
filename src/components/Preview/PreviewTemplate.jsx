import React from 'react';
import Image from "../../assets/images/placeholder.png";
import {API_URL} from "../../config";
import { IoIosClose } from "react-icons/io";
import templateImage from "../../assets/images/placeholder.png";

const PreviewTemplate = ({template, setUserSelected}) => {
    return (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10 md:p-10 p-4">
            <div className="bg-[#111111] lg:w-1/4 md:w-2/4 sm:w-2/3 w-full p-6 rounded-md relative">
                <div
                    className = "absolute top-1 left-1 cursor-pointer"
                    onClick = {() => setUserSelected({})}
                >
                    <IoIosClose className = "text-white"/>
                </div>
                <div
                    className="h-40 rounded-lg mb-4"
                    style={{ backgroundImage: `url(${templateImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                ></div>
                {template.questions.map((question, index) => (
                    <div className = "flex flex-col">
                        <h1 className = "text-neutral-200 text-xl mb-1">{question}</h1>
                        <div className = "h-2 rounded-md w-full bg-neutral-800 mb-1"></div>
                        <div className = "h-2 rounded-md w-1/2 bg-neutral-800 mb-1"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PreviewTemplate;