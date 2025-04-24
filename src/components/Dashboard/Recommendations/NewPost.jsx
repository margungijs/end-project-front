import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

const NewPost = ({postLimit}) => {
    const [status, setStatus] = useState(false);
    const [title, setTitle] = useState('');
    const [canPost, setCanPost] = useState(true);
    const navigate = useNavigate();
    const [cooldownMessage, setCooldownMessage] = useState('');

    const marks = [
        { value: 0, label: '2 weeks', duration: 14 },
        { value: 1, label: '1 month', duration: 30 },
        { value: 2, label: '2 months', duration: 60 },
        { value: 3, label: '3 months', duration: 90 },
        { value: 4, label: '4 months', duration: 120 },
        { value: 5, label: '5 months', duration: 150 },
        { value: 6, label: '6 months', duration: 180 },
        { value: 7, label: '7 months', duration: 210 },
        { value: 8, label: '8 months', duration: 240 },
        { value: 9, label: '9 months', duration: 270 },
        { value: 10, label: '10 months', duration: 300 },
        { value: 11, label: '11 months', duration: 330 },
        { value: 12, label: '1 year', duration: 365 }
    ];

    useEffect(() => {
        if (postLimit) {
            // Check if posts array is empty
            if (Array.isArray(postLimit.posts) && postLimit.posts.length === 0) {
                setCanPost(true);
                setCooldownMessage(''); // Optional: clear any previous message
                return; // Exit early
            }

            if (postLimit.updated_at) {
                const lastPostDate = new Date(postLimit.updated_at);
                const now = new Date();

                const timePassedInDays = Math.floor((now - lastPostDate) / (1000 * 60 * 60 * 24));
                const requiredDays = marks.find(m => m.value === postLimit.limit)?.duration || 0;

                if (timePassedInDays < requiredDays) {
                    setCanPost(false);
                    const remainingDays = requiredDays - timePassedInDays;

                    setCooldownMessage(`You can't create a new post yet. Please wait ${remainingDays} more day${remainingDays !== 1 ? 's' : ''}. Last post was on ${lastPostDate.toLocaleDateString()}.`);
                } else {
                    setCanPost(true); // Allow post if cooldown is over
                    setCooldownMessage('');
                }
            }
        }
    }, [postLimit]);


    return (
        <div className = "bg-[#111111] flex flex-col rounded-lg p-4 w-full">
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
                {!canPost ? (
                    <div className="mb-4 p-2 bg-red-800/30 border border-red-500 text-red-400 rounded-md">
                        {cooldownMessage}
                    </div>
                ) : (
                    <div
                        className = "rounded-md cursor-pointer transition duration-200 hover:bg-blue-700 bg-blue-600 w-fit p-1"
                        onClick = {() => navigate('/Post', { state: { title, status } })}
                    >
                        <h1 className = "text-neutral-200">Continue</h1>
                    </div>
                )}
            </div>
        </div>
    );
};

export default NewPost;