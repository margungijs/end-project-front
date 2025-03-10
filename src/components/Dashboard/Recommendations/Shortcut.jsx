import React, {useState} from 'react';
import { IoMdArrowDropdown } from "react-icons/io";
import {useNavigate} from "react-router-dom";

const Shortcut = () => {
    const navigate = useNavigate();
    const [dropdown, setDropdown] = useState(false);

    const [value, setValue] = useState('Profile');

    return (
        <div className="bg-[#111111] p-4 flex flex-col lg:w-1/2 w-full rounded-lg">
            <h1 className="text-neutral-200 mb-2">Create a shortcut</h1>
            <h1 className="text-neutral-600 mb-2">Create personalised shortcuts throughout Chronicle</h1>
            <div
                className="bg-neutral-950 relative rounded-md flex flex-row p-2 justify-between items-center cursor-pointer "
                onClick={() => setDropdown(!dropdown)}
            >
                <h1 className="text-neutral-600">{value}</h1>
                <IoMdArrowDropdown
                    className={`text-neutral-600 ${dropdown ? "rotate-180" : ""} transition-transform duration-300`}
                />
                <div
                    className={`left-0 absolute bg-neutral-950 p-1 top-12 flex flex-col w-full border-[1px] border-neutral-700 rounded-md 
                    transform transition-all duration-300 ease-out ${
                        dropdown ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                >
                    <ul className="text-neutral-600">
                        <li
                            className="hover:bg-neutral-900 rounded-md transition duration-200 p-1"
                            onClick={() => setValue('Profile')}
                        >Profile</li>
                        <li
                            className="hover:bg-neutral-900 rounded-md transition duration-200 p-1"
                            onClick={() => setValue('Friends')}
                        >Friends</li>
                        <li
                            className="hover:bg-neutral-900 rounded-md transition duration-200 p-1"
                            onClick={() => setValue('Settings')}
                        >Settings</li>
                        <li
                            className="hover:bg-neutral-900 rounded-md transition duration-200 p-1"
                            onClick={() => setValue('Posts')}
                        >Posts</li>
                    </ul>
                </div>
            </div>
            <div
                className = "mt-auto rounded-md cursor-pointer transition duration-200 hover:bg-blue-700 bg-blue-600 w-fit p-1"
                onClick = {() => navigate('/Settings?section=shortcuts', {state : value})}
            >
                <h1 className = "text-neutral-200">Customise</h1>
            </div>
        </div>
    );

};

export default Shortcut;