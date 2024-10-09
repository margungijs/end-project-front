import React, {useState} from 'react';
import { IoMdArrowDropdown } from "react-icons/io";

const Shortcut = () => {
    const [dropdown, setDropdown] = useState(false);

    return (
        <div className = "bg-[#111111] p-4 flex flex-col w-1/2 rounded-lg border-[1px] border-neutral-700">
            <h1 className = "text-neutral-200 mb-2">Create shortcut</h1>
            <h1 className = "text-neutral-600 mb-2">Create personalised shortcuts throughout Chronicle</h1>
            <div
                className = "bg-neutral-950 relative rounded-md flex flex-row p-2 justify-between items-center cursor-pointer border-[1px] border-neutral-700"
                onClick = {() => setDropdown(true)}
            >
                <h1 className = "text-neutral-600">Profile</h1>
                <IoMdArrowDropdown className = "text-neutral-600 " />
            </div>
        </div>
    );
};

export default Shortcut;