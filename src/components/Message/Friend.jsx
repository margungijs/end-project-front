import React from 'react';
import { FaRegUserCircle } from "react-icons/fa";

const Friend = ({name, image, id}) => {
    return (
        <div
            className = "flex mb-2 flex-col cursor-pointer border-neutral-700 border-[1px] rounded-md p-2"
            onClick = {id}
        >
            <div className = "flex flex-row items-center">
                {image !== null ? (
                    <img src={'http://localhost/storage/' + image} className = "w-10 h-10 rounded-full mr-2"/>
                ) : (
                    <FaRegUserCircle className = "w-10 h-10 text-neutral-700 mr-2"/>
                )}
                <div className = "flex flex-col">
                    <h1 className = "text-neutral-200 text-xl">{name}</h1>
                    <h1 className = "text-neutral-600">Active 5m ago</h1>
                </div>
            </div>
        </div>
    );
};

export default Friend;