import React from 'react';
import {API_URL} from "../../config";
import {FaRegUserCircle} from "react-icons/fa";

const UserMessage = ({message, image, name}) => {
    return (
        <div className="bg-[#111111] max-w-full rounded-lg p-2">
            <div className="flex flex-row items-start max-w-full">
                {/* Image container that doesn't shrink */}
                <div className="flex items-center justify-center w-fit shrink-0">
                    {image !== null && image !== 'null' ? (
                        <img
                            src={`${API_URL}/storage/` + image}
                            className="w-8 h-8 rounded-full mr-2"
                        />
                    ) : (
                        <FaRegUserCircle className="w-8 h-8 text-neutral-700 mr-2" />
                    )}
                </div>

                <div className="flex flex-col max-w-full ml-2 break-words whitespace-normal overflow-hidden">
                    <h1 className="text-neutral-400">{name}</h1>

                    <h1 className="text-neutral-400 break-words whitespace-normal overflow-hidden">
                        {message}
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default UserMessage;