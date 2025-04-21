import React, { useEffect, useState } from 'react';
import FetchData from "../../reuse/FetchData";

const PostsFilter = ({limits, marks, setLimit, show}) => {
    const [selectedLimit, setSelectedLimit] = useState(13);

    const handleClick = (limit) => {
        setSelectedLimit(limit);
        setLimit(limit);
    };

    return (
        <div className = {`h-screen lg:w-1/4 w-full absolute left-0 z-10 top-0 rounded-md flex flex-col bg-[#111111] p-4
            ${show ? "translate-x-0 opacity-100" : "-translate-x-full opacity-0"}
        transform transition-all duration-500 ease-in-out lg:translate-x-0 lg:opacity-100`}>
            <h1 className = "text-neutral-200 text-2xl mb-2">Your posts</h1>
            <h1 className = "text-neutral-600 text-xl mb-4">This is where you can see all of your posts and filter them based on the post limit you had set as you posted</h1>
            <ul className="flex flex-col w-full h-fit gap-2">
                <li
                    className={`rounded-md text-xl hover:bg-neutral-900 cursor-pointer transition duration-200 p-1 ${selectedLimit === 13 ? 'text-neutral-400' : 'text-neutral-600'}`}
                    onClick={() => handleClick(13)}
                >
                    All
                </li>
                {limits.map((limit, index) => (
                    <li
                        key={index}
                        className={`rounded-md text-xl hover:bg-neutral-900 cursor-pointer transition duration-200 p-1 ${selectedLimit === limit.limit ? 'text-neutral-400' : 'text-neutral-600'}`}
                        onClick={() => handleClick(limit.limit)}
                    >
                        {marks.find(mark => mark.value === limit.limit)?.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PostsFilter;