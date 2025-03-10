import React from 'react';
import {useNavigate} from "react-router-dom";

const Template = () => {
    const navigate = useNavigate();

    return (
        <div className = "bg-[#111111] p-4 lg:w-1/2 w-full rounded-lg flex flex-col">
            <h1 className = "text-neutral-200 mb-2">Let's create a template</h1>
            <h1 className = "text-neutral-600 mb-2">Create personal post templates to match your needs and aesthetic</h1>
            <div className = "flex flex-col mb-4">
                <h1 className = "text-neutral-200">Let's start off with a title and description</h1>
                <input
                    type="text"
                    className = "bg-neutral-950 mb-2 text-neutral-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md placeholder-neutral-600 indent-2 py-1"
                    placeholder = "title your template"
                />
                <input
                    type="text"
                    className = "bg-neutral-950 text-neutral-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md placeholder-neutral-600 indent-2 py-1"
                    placeholder = "describe the meaning of it"
                />
            </div>
            <div
                className = "mt-auto rounded-md cursor-pointer transition duration-200 hover:bg-blue-700 bg-blue-600 w-fit p-1"
                onClick = {() => navigate('/Template')}
            >
                <h1 className = "text-neutral-200">Template</h1>
            </div>
        </div>
    );
};

export default Template;