import React from 'react';

const CollectionFilter = ({selected, setSelected, open}) => {
    return (
        <div className = {`bg-[#111111] lg:w-1/4 md:w-2/6 z-10 rounded-md py-4 px-2 p-2 h-full absolute left-0 top-0 transform transition-all duration-500 ease-in-out
            ${open ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"} md:translate-x-0 md:opacity-100
        `}>
            <h1 className = "text-neutral-200 text-2xl mb-2">Your collection</h1>
            <h1 className = "text-neutral-600 text-xl mb-4">This is where you can see all your stared posts and templates - maybe some inspiration can grow here</h1>
            <ul className="flex flex-col w-full h-fit gap-2">
                <li
                    className={`rounded-md text-xl hover:text-neutral-400 ${selected == 0 ? "text-neutral-400" : "text-neutral-600"} hover:bg-neutral-900 cursor-pointer transition duration-200 p-1`}
                    onClick = {() => setSelected(0)}
                >
                    All
                </li>
                <li
                    className={`rounded-md text-xl hover:text-neutral-400 ${selected == 1 ? "text-neutral-400" : "text-neutral-600"} hover:bg-neutral-900 cursor-pointer transition duration-200 p-1`}
                    onClick = {() => setSelected(1)}
                >
                    Posts
                </li>
                <li
                    className={`rounded-md text-xl hover:text-neutral-400 ${selected == 2 ? "text-neutral-400" : "text-neutral-600"} hover:bg-neutral-900 cursor-pointer transition duration-200 p-1`}
                    onClick = {() => setSelected(2)}
                >
                    Templates
                </li>
            </ul>
        </div>
    );
};

export default CollectionFilter;