import React from 'react';
import {API_URL} from "../../../config";
import {FaRegUserCircle} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import { BsPersonBadge } from "react-icons/bs";

const SearchFriend = ({ image, name, user_id, friendship }) => {
    const navigate = useNavigate();

    const navigateToProfile = (id) => {
        navigate(`/Profiles/${name}`, {state: {id: id}});
    }

    return (
        <div className = "flex flex-col bg-[#111111] p-4 rounded-lg">
            <div className = "flex flex-row items-center mb-2">
                {image !== null ? (
                    <img src={`${API_URL}/storage/` + image} className = "w-8 h-8 rounded-full mr-2"/>
                ) : (
                    <FaRegUserCircle className = "w-8 h-8 text-neutral-700 mr-2"/>
                )}
                <h1
                    className = "text-neutral-200 cursor-pointer mr-1"
                    onClick = {() => navigateToProfile(user_id)}
                >{name}</h1>
                <BsPersonBadge className = "text-neutral-200 mr-1"/>
            </div>
            <div className = "flex flex-row bg-neutral-900 items-center rounded-md p-4 justify-between">
                <div
                    className = "flex flex-row items-center cursor-pointer"
                    onClick={() => navigateToProfile(user_id)}
                >
                    <h1 className = "text-neutral-200">View profile</h1>
                </div>
                {friendship === 1 ? (
                    <h1 className = "text-green-500">Friends</h1>
                ) : (
                    friendship === null ? (
                        <></>
                    ) : (
                        <h1 className = "text-orange-500">Pending friend request</h1>
                    )
                )}
            </div>
        </div>
    );
};

export default SearchFriend;