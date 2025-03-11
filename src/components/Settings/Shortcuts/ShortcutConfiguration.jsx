import React, {useEffect, useState} from 'react';
import {IoMdArrowDropdown} from "react-icons/io";
import FetchData from "../../../reuse/FetchData";
import { API_URL } from "../../../config";

const ShortcutConfiguration = ({ newRoute }) => {
    const [dropdown, setDropdown] = useState(false);
    const [value, setValue] = useState('Profile');
    const [friendDropdown, setFriendDropdown] = useState(false);
    const [friendValue, setFriendValue] = useState('');
    const [friends, setFriends] = useState([]);

    const fetch = async () => {
        try{
            const response = await FetchData(`${API_URL}/api/authenticated/user`);
            console.log(response)
            setFriends([...response.user.friends_as_friend, ...response.user.friends_as_user])
        }catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        fetch();
    }, [])

    return (
        <div className = "flex flex-row w-full gap-4 py-2 mb-4">
            <div
                className="bg-neutral-950 relative rounded-md flex flex-row p-2 justify-between items-center cursor-pointer border-[1px] border-neutral-700 w-1/2"
                onClick={() => setDropdown(!dropdown)}
            >
                <h1 className="text-neutral-600">{value}</h1>
                <IoMdArrowDropdown
                    className={`text-neutral-600 ${dropdown ? "rotate-180" : ""} transition-transform duration-300`}
                />
                <div
                    className={`left-0 absolute z-10 bg-neutral-950 p-1 top-12 flex flex-col w-full border-[1px] border-neutral-700 rounded-md 
                    transform transition-all duration-300 ease-out ${
                        dropdown ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                >
                    <ul className="text-neutral-600">
                        <li
                            className="hover:bg-neutral-900 rounded-md transition duration-200 p-1"
                            onClick={() => {setValue('Profile'); newRoute('Profile')}}
                        >Profile</li>
                        {friends.length > 0 && (
                            <li
                                className="hover:bg-neutral-900 rounded-md transition duration-200 p-1"
                                onClick={() => setValue('Friends')}
                            >Friends</li>
                        )}
                        <li
                            className="hover:bg-neutral-900 rounded-md transition duration-200 p-1"
                            onClick={() => {setValue('Settings'); newRoute('Settings')}}
                        >Settings</li>
                        <li
                            className="hover:bg-neutral-900 rounded-md transition duration-200 p-1"
                            onClick={() => {setValue('Posts'); newRoute('Posts')}}
                        >Posts</li>
                    </ul>
                </div>
            </div>
            <div
                className= {`bg-neutral-950 relative rounded-md flex flex-row p-2 justify-between items-center cursor-pointer border-[1px]
                             ${value === "Friends" ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 pointer-events-none"} border-neutral-700 w-1/2 transform transition-all duration-300 ease-out`}
                onClick={() => setFriendDropdown(!friendDropdown)}
            >
                {friendValue === "" ? (
                    <h1 className = "text-neutral-600">Friends</h1>
                ) : (
                    <h1 className="text-neutral-600">{friendValue}</h1>
                )}
                <IoMdArrowDropdown
                    className={`text-neutral-600 ${dropdown ? "rotate-180" : ""} transition-transform duration-300`}
                />
                <div
                    className={`left-0 absolute z-20 bg-neutral-950 p-1 top-12 flex flex-col w-full border-[1px] border-neutral-700 rounded-md 
                    transform transition-all duration-300 ease-out ${
                        friendDropdown ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                >
                    <ul className="text-neutral-600">
                        {friends.map((friend, index) => (
                            <li
                                className="hover:bg-neutral-900 rounded-md transition duration-200 p-1"
                                onClick = {() => {newRoute(friend.id.toString()); setFriendValue(friend.name)}}
                            >{friend.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ShortcutConfiguration;