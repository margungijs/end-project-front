import React, { useState } from 'react';
import {IoMdArrowDropdown} from "react-icons/io";
import {icons} from "../../../assets/IconChoices.js";

const ShortcutCustomisation = ({ setIcon, icon, color, setColor }) => {
    const [dropdown, setDropdown] = useState(false);
    const [cDropdown, setCDropdown] = useState(false);

    return (
        <div className="flex sm:flex-row flex-col w-full gap-2 py-2 mb-4">
            <div
                className="relative flex cursor-pointer flex-row sm:w-auto w-full sm:items-center justify-between sm:gap-2 mr-auto px-2 py-1 text-neutral-800 rounded-md"
                onClick={() => {setDropdown(!dropdown); setCDropdown(false)}}
            >
                {icon === 0 ? (
                    <h1 className = "p-1 text-neutral-600">Icon</h1>
                ) : (
                    <>
                        {React.cloneElement(icons.find((item) => item.value === icon).logo, { className: "w-8 h-8"})}
                    </>
                )}
                <IoMdArrowDropdown
                    className={`text-neutral-600 transition-transform ${dropdown ? "rotate-180" : ""} duration-300 text-xl`}
                />
                <div
                    className={`left-0 absolute bg-neutral-950 z-10 p-1 top-12 flex flex-col rounded-md 
            transform transition-opacity duration-300 ease-out ${
                        dropdown ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                    style={{ minWidth: "max-content" }}
                >
                    <div className={`grid ${icons.length >= 4 ? "grid-cols-4" : `grid-cols-${icons.length}`} text-2xl gap-2`}>
                        {icons.map((item) => (
                            <div key={item.value} className="logo-container" onClick = {() => setIcon(item.value)}>
                                {item.logo}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className = "flex sm:flex-row flex-col w-full gap-2">
                <div
                    className = "relative sm:w-1/2 w-full flex cursor-pointer flex-row items-center justify-between gap-2 px-2 py-1 text-neutral-600 rounded-md"
                    onClick={() => {setCDropdown(!cDropdown); setDropdown(false)}}
                >
                    {color === "" ? (
                        <h1>Color</h1>
                    ) : (
                        <h1 className = {`text-${color.toLowerCase()}-500 transition duration-200`}>{color}</h1>
                    )}
                    <IoMdArrowDropdown
                        className={`text-neutral-600 transition-transform ${cDropdown ? "rotate-180" : ""} duration-300 text-xl`}
                    />
                    <div
                        className={`left-0 absolute z-10 bg-neutral-950 p-1 sm:top-12 top-8 flex flex-col w-full rounded-md 
                    transform transition-all duration-300 ease-out ${
                            cDropdown ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
                        }`}
                    >
                        <ul className="text-neutral-600">
                            <li
                                className="hover:bg-neutral-900 rounded-md transition duration-200 p-1"
                                onClick = {(e) => setColor(e.target.innerText)}
                            >green</li>
                            <li
                                className="hover:bg-neutral-900 rounded-md transition duration-200 p-1"
                                onClick = {(e) => setColor(e.target.innerText)}
                            >blue</li>
                            <li
                                className="hover:bg-neutral-900 rounded-md transition duration-200 p-1"
                                onClick = {(e) => setColor(e.target.innerText)}
                            >red</li>
                            <li
                                className="hover:bg-neutral-900 rounded-md transition duration-200 p-1"
                                onClick = {(e) => setColor(e.target.innerText)}
                            >purple</li>
                            <li
                                className="hover:bg-neutral-900 rounded-md transition duration-200 p-1"
                                onClick = {(e) => setColor(e.target.innerText)}
                            >yellow</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShortcutCustomisation;