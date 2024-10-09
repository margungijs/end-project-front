import React from 'react';
import Image from "../../../assets/images/7195ce2c8612cffa80b20ebf756d99c7.jpg";

const AdditionalInfo = () => {
    return (
        <div className = "flex flex-col w-1/2 bg-[#111111] rounded-lg p-4 border-[1px] border-neutral-700">
            <h1 className = "text-neutral-200 mb-2">Additional info</h1>
            <h1 className = "text-neutral-600 mb-2">Introduce yourself with some basic additional info like a bio, your age and location</h1>
            <div className = "flex flex-col rounded-md border-[1px] border-neutral-700">
                <div className = "bg-neutral-900 flex rounded-t-md flex-row p-2 border-b-[1px] border-neutral-700">
                    <img src={Image} className = "w-6 h-6 rounded-full mr-2 "/>
                    <h1 className = "text-neutral-200">Margungijs->Profile</h1>
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