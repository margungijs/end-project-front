import React from 'react';

const Template = ({title, description}) => {
    return (
        <div
            className="border-neutral-700 border-[1px] hover:border-neutral-200 transform duration-200 cursor-pointer w-full p-4 flex justify-center items-center rounded-md h-60 group relative"
        >
            <div className="flex flex-col items-center justify-center w-full h-full">
                <h1 className="text-neutral-600 transition-opacity duration-300 opacity-100 group-hover:opacity-0 text-xl font-bold group-hover:text-neutral-200 text-center">{title}</h1>
                <p className="text-neutral-600 transition-opacity duration-300 opacity-0 group-hover:opacity-100 text-xl font-bold group-hover:text-neutral-200 whitespace-normal break-words text-center">{description}</p>
            </div>
        </div>
    );
};

export default Template;