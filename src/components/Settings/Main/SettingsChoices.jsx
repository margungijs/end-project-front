import React, { useState } from 'react';

const SettingsChoices = () => {
    const [selected, setSelceted] = useState("shortcuts")

    return (
        <div className = "h-screen w-1/4 rounded-md flex flex-col bg-[#111111] border-[1px] border-neutral-700 p-4">
            <h1 className = "text-neutral-200 text-2xl mb-4">Settings</h1>
            <div className = "flex flex-col gap-2">
                <div
                    className = "flex flex-row text-neutral-400 rounded-lg p-1 items-center cursor-pointer hover:bg-neutral-800 transition duration-200"
                    onClick = {() => setSelceted("general")}
                >
                    <h1 className = {`text-xl transition duration-200 ${selected === "general" ? "text-neutral-200" : ""}`}>General</h1>
                </div>
                <div
                    className = "flex flex-row text-neutral-400 rounded-lg p-1 items-center cursor-pointer hover:bg-neutral-800 transition duration-200"
                    onClick = {() => setSelceted("shortcuts")}
                >
                    <h1 className = {`text-xl transition duration-200 ${selected === "shortcuts" ? "text-neutral-200" : ""}`}>Your shortcuts</h1>
                </div>
            </div>
        </div>
    );
};

export default SettingsChoices;