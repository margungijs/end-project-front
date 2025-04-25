import React from 'react';
import { BiSolidMessageDots } from "react-icons/bi";

const MessageStatic = () => {
    return (
        <div className = "bg-[#111111] flex flex-col justify-center items-center lg:w-3/4 md:w-4/6 w-full h-full">
            <BiSolidMessageDots className = "w-40 h-40 text-neutral-700"/>
            <h1 className = "text-neutral-200 text-xl mb-2">Send messages to your friends</h1>
            <h1 className = "text-neutral-600 text-md">Start by choosing a friend to message</h1>
        </div>
    );
};

export default MessageStatic;