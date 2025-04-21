import React from 'react';
import { API_URL } from "../../config";
import placeholder from "../../assets/images/placeholder.png";

const Post = ({ image, title, selected }) => {
    return (
        <div
            className="border-neutral-700 border-[1px] hover:border-neutral-200 transform duration-200 cursor-pointer w-full p-2 flex justify-center items-center rounded-md md:h-50 h-40 group relative"
            onClick = {selected}
            style={{
                backgroundImage: `url(${image ? `${API_URL}/storage/${image}` : placeholder})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-200 rounded-md group-hover:filter group-hover:blur-sm"
                style={{
                    backgroundImage: `url(${image ? `${API_URL}/storage/${image}` : placeholder})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            />
            <h1 className="text-neutral-600 transition transform duration-200 group-hover:scale-110 text-xl font-bold group-hover:text-neutral-200 absolute z-10 text-center">
                {title}
            </h1>
        </div>
    );
};

export default Post;
