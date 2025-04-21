import React, { useState } from 'react';

const SettingsChoices = ({selected, setSelected, show}) => {
    return (
        <div className = {`h-screen lg:w-1/4 w-full absolute left-0 z-10 top-0 rounded-md flex flex-col bg-[#111111] p-4
            ${show ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}
        transform transition-all duration-500 ease-in-out lg:translate-x-0 lg:opacity-100`}>
            <h1 className = "text-neutral-200 text-2xl mb-4">Settings</h1>
            <div className = "flex flex-col gap-2">
                <div
                    className = "flex flex-row text-neutral-400 rounded-lg p-1 items-center cursor-pointer hover:bg-neutral-800 transition duration-200"
                    onClick = {() => setSelected("general")}
                >
                    <h1 className = {`text-xl transition duration-200 ${selected === "general" ? "text-neutral-200" : ""}`}>General</h1>
                </div>
                <div
                    className = "flex flex-row text-neutral-400 rounded-lg p-1 items-center cursor-pointer hover:bg-neutral-800 transition duration-200"
                    onClick = {() => setSelected("shortcuts")}
                >
                    <h1 className = {`text-xl transition duration-200 ${selected === "shortcuts" ? "text-neutral-200" : ""}`}>Your shortcuts</h1>
                </div>
                <div
                    className = "flex flex-row text-neutral-400 rounded-lg p-1 items-center cursor-pointer hover:bg-neutral-800 transition duration-200"
                    onClick = {() => setSelected("friends")}
                >
                    <h1 className = {`text-xl transition duration-200 ${selected === "friends" ? "text-neutral-200" : ""}`}>Your friends</h1>
                </div>
            </div>
        </div>
    );
};

export default SettingsChoices;