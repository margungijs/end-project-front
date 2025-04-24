import React from 'react';
import {API_URL} from "../../../config";
import {FaRegUserCircle} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import SendDataGeneral from "../../../reuse/SendDataGeneral";

const Friend = ({friend, remove}) => {
    const navigate = useNavigate();

    const navigateToProfile = (id, name) => {
        navigate(`/Profiles/${name}`, {state: {id: id}});
    }

    const removeFriend = async (id) => {
        try{
            const response = await SendDataGeneral({friend_id: id}, `${API_URL}/api/authenticated/removeFriend`);
            console.log(response);
            remove(id);
        } catch (error){
            console.log(error)
        }
    }

    return (
        <div className = "bg-[#111111] flex flex-row p-2 rounded-md items-center mb-2 lg:w-2/3 w-full justify-between">
            <div className = "flex flex-row items-center">
                {friend.image !== null ? (
                    <img src={`${API_URL}/storage/` + friend.image} className = "w-14 h-14 rounded-full mr-2"/>
                ) : (
                    <FaRegUserCircle className = "w-14 h-14 text-neutral-700 mr-2"/>
                )}
                <div className="flex flex-col justify-center">
                    <h1
                        className="text-neutral-200 text-md"
                    >{friend.name}</h1>
                    <h1 className="text-neutral-600 text-sm w-2/3">Friends since {friend.became_friends_at}</h1>
                </div>
            </div>
            <div className = "flex md:flex-row flex-col gap-2">
                <h1
                    className = "text-neutral-200 cursor-pointer hover:text-white transition duration-200"
                    onClick = {() => navigateToProfile(friend.id, friend.name)}
                >View profile</h1>
                <h1
                    className = "text-red-700 cursor-pointer hover:text-red-500 transition duration-200"
                    onClick = {() => removeFriend(friend.id)}
                >Remove friend</h1>
            </div>
        </div>
    );
};

export default Friend;