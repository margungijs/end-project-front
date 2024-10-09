import React, {useState} from 'react';

const NewPost = () => {
    const [status, setStatus] = useState(false);

    return (
        <div className = "bg-[#111111] border-[1px] border-neutral-700 flex flex-col rounded-lg p-4 w-1/2">
            <h1 className = "text-neutral-200 mb-2">Make a new post</h1>
            <h1 className = "text-neutral-600 mb-2">Create a new post expressing what you've been up to the past few days - Feel free to use a template or make your own</h1>
            <div className = "flex flex-col mb-4">
                <h1 className = "text-neutral-200">Let's start with the title</h1>
                <input
                    type="text"
                    className = "bg-[#111111] rounded-md border-[1px] border-neutral-700 placeholder-neutral-600 indent-2 py-1"
                    placeholder = "title your post"
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
                <div className = "rounded-md cursor-pointer transition duration-200 hover:bg-blue-700 bg-blue-600 w-fit p-1">
                    <h1 className = "text-neutral-200">Continue</h1>
                </div>
            </div>
        </div>
    );
};

export default NewPost;