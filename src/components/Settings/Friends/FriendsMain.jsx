import React, {useEffect, useState} from 'react';
import {API_URL} from "../../../config";
import axios from "axios";
import Friend from "./Friend";
import { PiMaskSadLight } from "react-icons/pi";

const FriendsMain = () => {
    const [friends, setFriends] = useState([]);
    const fetchData = async () => {
        try{
            const response = await axios.get(`${API_URL}/api/authenticated/friends`)
            console.log(response.data);
            setFriends(response.data);
        } catch(error){
            console.error('Error fetching the data', error);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const removeFriend = (id) => {
        setFriends((prevFriends) => prevFriends.filter(friend => friend.id !== id));
    }

    return (
        <div className = "flex flex-col p-2 lg:w-3/4 w-full justify-self-end lg:pl-10">
            <h1 className = "text-neutral-200 text-2xl mb-4">Your friends</h1>
            <div className = "flex flex-col">
                {friends.length > 0 ? (
                    friends.map((friend, index) => (
                        <Friend
                            friend = {friend}
                            key = {index}
                            remove = {removeFriend}
                        />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center h-screen">
                        <PiMaskSadLight className="w-40 h-40 text-neutral-600"/>
                        <h1 className="text-neutral-600 text-xl">No friends yet</h1>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FriendsMain;