import React, {useEffect, useState} from 'react';
import image from "../../assets/images/7195ce2c8612cffa80b20ebf756d99c7.jpg"
import { PiMaskSadLight } from "react-icons/pi";
import { MdOutlineAddReaction } from "react-icons/md";
import {useLocation} from "react-router-dom";
import FetchData from "../../reuse/FetchData";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaRegUserCircle, FaRegClock } from "react-icons/fa";

const ProfileMain = () => {
    const location = useLocation();
    const { id } = location.state || {};
    const [user, setUser] = useState(null);

    const fetchData = async () => {
        FetchData('http://localhost/api/authenticated/getUser/1')
            .then(response => {
                console.log(response)
                setUser(response);
            });
    }

    useEffect(() => {
        fetchData();
    },[]);

    if (!user) {
        return <div className = "bg-[#111111] h-screen w-screen">

        </div>;
    }

    return (
        <div className = "bg-[#111111] h-screen w-screen flex flex-col items-center p-20">
            {user.user.image === null ? (
                <FaRegUserCircle className = "w-40 h-40 text-neutral-700 mb-2"/>
            ) : (
                <img src={image} className = "w-40 h-40 rounded-full mb-2"/>
            )}
            <div className = "flex flex-row gap-2 items-center mb-4">
                <h1 className = "text-3xl text-neutral-200">{user.user.name}</h1>
                {user.status === null ? (
                    <MdOutlineAddReaction className="text-3xl cursor-pointer hover:text-green-600 transition duration-200 text-neutral-600"/>
                ) : (
                    user.status === 1 ? (
                        <FaRegCircleCheck className="text-green-600 text-3xl"/>
                    ) : (
                        <FaRegClock className="text-orange-600 text-3xl"/>
                    )
                )}
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