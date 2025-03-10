import React from 'react';
import { PiMaskSadLight } from "react-icons/pi";
import image from "../../../assets/images/7195ce2c8612cffa80b20ebf756d99c7.jpg";
import { FaRegMessage } from "react-icons/fa6";
import SendDataGeneral from "../../../reuse/SendDataGeneral.js";
import {useNavigate} from "react-router-dom";
import {FaRegUserCircle} from "react-icons/fa";

const Friends = ({ friends, requests, setRequests, fetch, show}) => {
    const allFriends = [...(friends.friends || []), ...(friends.friends1 || [])];
    const navigate = useNavigate();

    const acceptRequest = async (id) => {
        await SendDataGeneral({user_id: id}, 'http://localhost/api/authenticated/friendAccept');
        setRequests(requests.filter(request => request.user_id !== id));
        fetch();
    }

    const declineRequest = async (id) => {
        await SendDataGeneral({user_id: id}, 'http://localhost/api/authenticated/removeFriend');
        setRequests(requests.filter(request => request.user_id !== id));
    }

    const navigateProfile = (name, id) => {
        navigate('/Profiles/' + name, {state: {id}});
    }

    const navigateMessage = (id) => {
        navigate('/Message', {state: {id}})
    }

    return (
        <div
            className={`h-screen p-2 lg:w-1/4 w-full absolute right-0 rounded-bl-md top-0 bg-[#111111] py-8 px-6 transform transition-all duration-500 ease-in-out 
            ${show === "friends" ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"} 
            lg:translate-x-0 lg:opacity-100`}
        >
            <div className = "flex flex-col bg-[#111111] h-full py-8 px-6 rounded-md">
                <div className = "h-1/2">
                    <h1 className = "text-neutral-200 text-2xl mb-2">Friends</h1>
                    {allFriends.length > 0 ? (
                        allFriends.map((friend, index) => (
                            <div key={index} className="flex flex-row bg-[#111111] border-[1px] p-2 border-neutral-700 rounded-md items-center mb-2">
                                {friend.image !== null ? (
                                    <img src={"http://localhost/storage/" + friend.image} className = "w-10 h-10 rounded-full mr-2"/>
                                ) : (
                                    <FaRegUserCircle className = "w-10 h-10 text-neutral-700 mr-2"/>
                                )}
                                <div className="flex flex-col">
                                    <h1
                                        className="text-neutral-200 text-md cursor-pointer"
                                        onClick = {() => navigateProfile(friend.name, friend.id)}
                                    >{friend.name}</h1>
                                    <h1 className="text-neutral-600 text-sm">Active 5m ago</h1>
                                </div>
                                <FaRegMessage
                                    className="ml-auto w-7 h-7 cursor-pointer text-neutral-700"
                                    onClick = {() => navigateMessage(friend.id)}
                                />
                            </div>
                        ))
                    ) : (
                        <div className="h-full flex flex-col justify-center items-center">
                            <PiMaskSadLight className="w-40 h-40 text-neutral-600"/>
                            <h1 className="text-neutral-600 text-xl">You don't have any friends yet</h1>
                        </div>
                    )}
                </div>
                <div className = "h-1/2">
                    <h1 className = "text-neutral-200 text-2xl mb-2">Requests</h1>
                    {requests.length > 0 ? (
                        requests.map((request, index) => (
                            <div key={index} className="flex flex-row bg-[#111111] border-[1px] p-2 border-neutral-700 rounded-md items-center mb-2">
                                <img src={image} className="w-10 h-10 rounded-full mr-2" alt="request"/>
                                <div className="flex flex-col">
                                    <h1 className="text-neutral-200 text-md cursor-pointer">Annonymous user {request.user_id}</h1>
                                </div>
                                <div className="flex flex-col ml-auto gap-2">
                                    <h1
                                        className="text-green-600 text-sm cursor-pointer"
                                        onClick = {() => acceptRequest(request.user_id)}
                                    >Accept</h1>
                                    <h1
                                        className="text-red-600 text-sm cursor-pointer"
                                        onClick = {() => declineRequest(request.user_id)}
                                    >Decline</h1>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="h-full flex flex-col justify-center items-center">
                            <h1 className="text-neutral-600 text-xl">No friend requests</h1>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Friends;