import React, { useState } from 'react';
import {IoMdArrowDropdown} from "react-icons/io";
import {icons} from "../../../assets/IconChoices.js";

const ShortcutCustomisation = ({ setIcon, icon, color, setColor, setHover, hover }) => {
    const [dropdown, setDropdown] = useState(false);
    const [cDropdown, setCDropdown] = useState(false);
    const [hDropdown, setHDropdown] = useState(false);

    return (
        <div className="flex flex-row w-full gap-2 py-2 mb-4">
            <div
                className="border-[1px] relative flex cursor-pointer flex-row items-center gap-2 border-neutral-700 px-2 py-1 text-neutral-800 rounded-md"
                onClick={() => {setDropdown(!dropdown); setCDropdown(false); setHDropdown(false)}}
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
                    className={`left-0 absolute bg-neutral-950 p-1 top-12 flex flex-col border-[1px] border-neutral-700 rounded-md 
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
            <div className = "flex flex-row w-full gap-2">
                <div
                    className = "border-[1px] relative w-1/2 flex cursor-pointer flex-row items-center justify-between gap-2 border-neutral-700 px-2 py-1 text-neutral-600 rounded-md"
                    onClick={() => {setCDropdown(!cDropdown); setHDropdown(false); setDropdown(false)}}
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
                        className={`left-0 absolute bg-neutral-950 p-1 top-12 flex flex-col w-full border-[1px] border-neutral-700 rounded-md 
                    transform transition-all duration-300 ease-out ${
                            cDropdown ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
                        }`}
                    >
                        <ul className="text-neutral-600">
                            <li
                                className="hover:bg-neutral-900 rounded-md transition duration-200 p-1"
                                onClick = {(e) => setColor(e.target.innerText)}
                            >Green</li>
                            <li
                                className="hover:bg-neutral-900 rounded-md transition duration-200 p-1"
                                onClick = {(e) => setColor(e.target.innerText)}
                            >Blue</li>
                            <li
                                className="hover:bg-neutral-900 rounded-md transition duration-200 p-1"
                                onClick = {(e) => setColor(e.target.innerText)}
                            >Red</li>
                            <li
                                className="hover:bg-neutral-900 rounded-md transition duration-200 p-1"
                                onClick = {(e) => setColor(e.target.innerText)}
                            >Purple</li>
                            <li
                                className="hover:bg-neutral-900 rounded-md transition duration-200 p-1"
                                onClick = {(e) => setColor(e.target.innerText)}
                            >Yellow</li>
                        </ul>
                    </div>
                </div>
                <div
                    className = "border-[1px] relative w-1/2 flex cursor-pointer flex-row items-center justify-between gap-2 border-neutral-700 px-2 py-1 text-neutral-600 rounded-md"
                    onClick={() => {setHDropdown(!hDropdown); setCDropdown(false); setDropdown(false)}}
                >
                    {hover === "" ? (
                        <h1>Hover color</h1>
                    ) : (
                        <h1 className = {`text-${hover.toLowerCase()}-500 transition duration-200`}>{hover}</h1>
                    )}
                    <IoMdArrowDropdown
                        className={`text-neutral-600 transition-transform ${hDropdown ? "rotate-180" : ""} duration-300 text-xl`}
                    />
                    <div
                        className={`left-0 absolute bg-neutral-950 p-1 top-12 flex flex-col w-full border-[1px] border-neutral-700 rounded-md 
                    transform transition-all duration-300 ease-out ${
                            hDropdown ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
                        }`}
                    >
                        <ul className="text-neutral-600">
                            <li
                                className="hover:bg-neutral-900 rounded-md transition duration-200 p-1"
                                onClick = {(e) => setHover(e.target.innerText)}
                            >Green</li>
                            <li
                                className="hover:bg-neutral-900 rounded-md transition duration-200 p-1"
                                onClick = {(e) => setHover(e.target.innerText)}
                            >Blue</li>
                            <li
                                className="hover:bg-neutral-900 rounded-md transition duration-200 p-1"
                                onClick = {(e) => setHover(e.target.innerText)}
                            >Red</li>
                            <li
                                className="hover:bg-neutral-900 rounded-md transition duration-200 p-1"
                                onClick = {(e) => setHover(e.target.innerText)}
                            >Purple</li>
                            <li
                                className="hover:bg-neutral-900 rounded-md transition duration-200 p-1"
                                onClick = {(e) => setHover(e.target.innerText)}
                            >Yellow</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShortcutCustomisation;