import React from 'react';

const FriendMessage = ({message}) => {
    return (
        <div className = "bg-[#111111] w-fit max-w-screen-sm rounded-lg border-[1px] self-end border-neutral-700 p-2">
            <h1 className = "text-neutral-400">{message}</h1>
        </div>
    );
};

export default FriendMessage;