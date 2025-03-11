import React from 'react';
import { FaRegUserCircle } from "react-icons/fa";
import {API_URL} from "../../../config";

const AdditionalInfo = () => {
    const image = localStorage.getItem('image');
    const name = localStorage.getItem('name');

    return (
        <div className = "flex flex-col lg:w-1/2 w-full bg-[#111111] rounded-lg p-4">
            <h1 className = "text-neutral-200 mb-2">Additional info</h1>
            <h1 className = "text-neutral-600 mb-2">Introduce yourself with some basic additional info like a bio, your age and location</h1>
            <div className = "flex flex-col rounded-md">
                <div className = "bg-neutral-950 flex rounded-t-md flex-row p-2 border-b-[1px] border-neutral-800">
                    {image && image !== "null" && image !== "" ? (
                        <img src={`${API_URL}/storage/${image}`} alt="" className="w-6 h-6 rounded-full mr-2" />
                    ) : (
                        <FaRegUserCircle className="w-6 h-6 text-neutral-700 mr-2" />
                    )}
                    <h1 className = "text-neutral-200">{name}->Profile</h1>
                </div>
                <div className = "bg-neutral-950 flex flex-col rounded-b-md p-2 gap-1">
                    <h1 className = "text-neutral-600">Bio: ...</h1>
                    <h1 className = "text-neutral-600">Location: ...</h1>
                    <h1 className = "text-neutral-600">Age: ...</h1>
                </div>
            </div>
            <div className = "mt-auto rounded-md cursor-pointer transition duration-200 hover:bg-blue-700 bg-blue-600 w-fit p-1">
                <h1 className = "text-neutral-200">Profile</h1>
            </div>
        </div>
    );
};

export default AdditionalInfo;