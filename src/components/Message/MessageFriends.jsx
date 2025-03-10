import React, { useEffect } from 'react';
import Friend from "./Friend";
import FetchData from "../../reuse/FetchData";

const MessageFriends = ({setFriendID, setFriends, friends, setFriendsDistinct}) => {

    const fetch = async () => {
        try {
            const response = await FetchData('http://localhost/api/authenticated/user');
            console.log(response)
            setFriends([...response.user.friends_as_friend, ...response.user.friends_as_user]);
            setFriendsDistinct([
                {friends: response.user.friends_as_friend },
                {users: response.user.friends_as_user }
            ]);
        } catch (error) {
            console.error('Error fetching the data', error);
        }
    }

    useEffect(() => {
        fetch();
    }, []);

    return (
        <div className = "flex flex-col w-1/4 rounded-md py-4 px-2 h-full">
            <h1 className = "text-neutral-200 text-2xl mb-4">Messages</h1>
            {friends && friends.map((friend, index) => (
                <Friend key={index} name={friend.name} image={friend.image} id = {() => setFriendID(friend.id)}/>
            ))}
        </div>
    );
};

export default MessageFriends;