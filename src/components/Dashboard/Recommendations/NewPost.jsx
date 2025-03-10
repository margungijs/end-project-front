import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const NewPost = () => {
    const [status, setStatus] = useState(false);
    const [title, setTitle] = useState('');
    const navigate = useNavigate();

    return (
        <div className = "bg-[#111111] flex flex-col rounded-lg p-4 lg:w-1/2 w-full">
            <h1 className = "text-neutral-200 mb-2">Make a new post</h1>
            <h1 className = "text-neutral-600 mb-2">Create a new post expressing what you've been up to the past few days - Feel free to use a template or make your own</h1>
            <div className = "flex flex-col mb-4">
                <h1 className = "text-neutral-200">Let's start with the title</h1>
                <input
                    type="text"
                    className = "bg-neutral-950 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-600 rounded-md placeholder-neutral-600 indent-2 py-1"
                    placeholder = "title your post"
                    value = {title}
                    onChange = {(e) => setTitle(e.target.value)}
                />
            </div>
            <div className = "flex flex-col">
                <div className = "flex flex-row mb-2">
                    <div
                        className = {`w-3 h-3 border-2 cursor-pointer transition duration-200 ${status ? 'border-neutral-700' : 'border-blue-500'} mr-2 mt-1`}
                        onClick = {() => setStatus(false)}
                    ></div>
                    <div className = "flex flex-col">
                        <h1 className = "text-neutral-200">Public</h1>
                        <h1 className = "text-neutral-600 text-sm">Your post will be available for everyone to see</h1>
                    </div>
                </div>
                <div className = "flex flex-row mb-4">
                    <div
                        className = {`w-3 h-3 border-2 cursor-pointer transition duration-200 ${status ? 'border-blue-500' : 'border-neutral-700'} mr-2 mt-1`}
                        onClick = {() => setStatus(true)}
                    ></div>
                    <div className = "flex flex-col">
                        <h1 className = "text-neutral-200">Private</h1>
                        <h1 className = "text-neutral-600 text-sm">Only your friends will be able to see your post</h1>
                    </div>
                </div>
                <div
                    className = "rounded-md cursor-pointer transition duration-200 hover:bg-blue-700 bg-blue-600 w-fit p-1"
                    onClick = {() => navigate('/Post', { state : title })}
                >
                    <h1 className = "text-neutral-200">Continue</h1>
                </div>
            </div>
        </div>
    );
};

export default NewPost;