import React from 'react';

const UserMessage = ({message}) => {
    return (
        <div className="bg-[#111111] w-fit max-w-screen-sm rounded-lg min-h-fit border-[1px] border-neutral-700 p-2 overflow-hidden">
            <h1 className="text-neutral-400">{message}</h1>
        </div>
    );
};

export default UserMessage;