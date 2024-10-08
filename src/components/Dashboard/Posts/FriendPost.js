import React from 'react';
import Image from "../../../assets/images/7195ce2c8612cffa80b20ebf756d99c7.jpg"
import { BsStars } from "react-icons/bs";
import { GoTriangleDown } from "react-icons/go";

const FriendPost = () => {
    return (
        <div className = "flex flex-col bg-[#111111] p-4 rounded-lg border-[1px] border-neutral-700">
            <div className = "flex flex-row items-center">
                <img src={Image} className = "w-8 h-8 rounded-full mr-2"/>
                <h1 className = "text-neutral-200 mr-1">Margungijs</h1>
                <BsStars className = "text-neutral-200 mr-1"/>
                <h1 className = "text-neutral-600">added a new post</h1>
            </div>
            <h1 className = "text-neutral-600 text-sm ml-10 mb-4">08/10/2024</h1>
            <div className = "flex flex-row bg-neutral-900 border-[1px] items-center border-neutral-700 rounded-md p-4 justify-between">
                <div className = "flex flex-row">
                    <img src={Image} className = "w-6 h-6 rounded-full mr-2"/>
                    <h1 className = "text-neutral-200">Margungijs->What i've been doing</h1>
                </div>
                <div className = "bg-neutral-900 hover:bg-neutral-800 transition duration-200 cursor-pointer rounded-md px-2 flex items-center flex-row py-1 border-[1px] border-neutral-700">
                    <GoTriangleDown className = "text-neutral-600 mr-3"/>
                    <h1 className = "text-neutral-200 text-sm">Preview</h1>
                </div>
            </div>
        </div>
    );
};

export default FriendPost;