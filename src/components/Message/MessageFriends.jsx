import React, { useEffect } from 'react';
import Friend from "./Friend";
import FetchData from "../../reuse/FetchData";
import {API_URL} from "../../config";
import {PiMaskSadLight} from "react-icons/pi";

const MessageFriends = ({setFriendID, setFriends, friends, setFriendsDistinct, open, setOpen}) => {

    const fetch = async () => {
        try {
            const response = await FetchData(`${API_URL}/api/authenticated/user`);
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
        <div className = {`bg-neutral-950 lg:w-1/4 md:w-2/6 w-full z-20 rounded-md py-4 px-2 p-2 h-full absolute left-0 top-0 transform transition-all duration-500 ease-in-out
            ${open ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"} md:translate-x-0 md:opacity-100`}>
            <h1 className = "text-neutral-200 text-2xl mb-4">Messages</h1>
            {friends && friends.length > 0 ? (
                friends.map((friend, index) => (
                    <Friend
                        key={index}
                        name={friend.name}
                        image={friend.image}
                        id={() => setFriendID(friend.id)}
                        open={open}
                        setOpen={setOpen}
                    />
                ))
            ) : (
                <div className="h-full flex flex-col justify-center items-center">
                    <PiMaskSadLight className="w-40 h-40 text-neutral-600" />
                    <h1 className="text-neutral-600 text-xl text-center">You don't have any friends yet</h1>
                </div>
            )}
        </div>
    );
};

export default MessageFriends;