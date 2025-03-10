import React from 'react';

const Post = ({image, title}) => {

    return (
        <div
            className="border-neutral-700 border-[1px] hover:border-neutral-200 transform duration-200 cursor-pointer w-full p-2 flex justify-center items-center rounded-md h-60 group relative"
            style={{ backgroundImage: `url(http://localhost/storage/${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-200 rounded-md group-hover:filter group-hover:blur-sm"
                 style={{ backgroundImage: `url(http://localhost/storage/${image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            </div>

            <h1 className="text-neutral-600 transition transform duration-200 group-hover:scale-110 text-xl font-bold group-hover:text-neutral-200 absolute z-10 text-center">{title}</h1>
        </div>
    );
};

export default Post;