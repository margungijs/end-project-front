import React from 'react';
import image from "../../assets/images/7195ce2c8612cffa80b20ebf756d99c7.jpg"
import { PiMaskSadLight } from "react-icons/pi";
import { MdOutlineAddReaction } from "react-icons/md";

const ProfileMain = () => {
    const name = localStorage.getItem('name');

    return (
        <div className = "bg-[#111111] h-screen w-screen flex flex-col items-center p-20">
            <img src={image} className = "w-40 h-40 rounded-full mb-2"/>
            <div className = "flex flex-row gap-2 items-center mb-4">
                <h1 className = "text-3xl text-neutral-200">{name}</h1>
                <MdOutlineAddReaction className = "text-3xl cursor-pointer hover:text-green-600 transition duration-200 text-neutral-600"/>
            </div>
            <div className = "flex flex-row gap-20 mb-4">
                <div className = "flex flex-col items-center">
                    <h1 className = "text-neutral-600 text-xl">Posts</h1>
                    <h1 className = "text-neutral-200 text-2xl">0</h1>
                </div>
                <div className = "flex flex-col items-center">
                    <h1 className = "text-neutral-600 text-xl">Templates</h1>
                    <h1 className = "text-neutral-200 text-2xl">0</h1>
                </div>
            </div>
            <div className = "w-1/2 flex flex-row border-b-[1px] border-neutral-700 pb-4 mb-20">
                <div className = "w-1/2 text-center">
                    <h1 className = "text-2xl cursor-pointer text-neutral-200">Posts</h1>
                </div>
                <div className = "w-1/2 text-center">
                    <h1 className = "text-2xl cursor-pointer text-neutral-600">Templates</h1>
                </div>
            </div>
            <div className = "flex flex-col justify-center items-center">
                <PiMaskSadLight className = "w-40 h-40 text-neutral-600"/>
                <h1 className = "text-neutral-600 text-xl">This user doesn't have any posts yet</h1>
            </div>
        </div>
    );
};

export default ProfileMain;