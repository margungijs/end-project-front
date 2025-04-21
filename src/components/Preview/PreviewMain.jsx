import React from 'react';
import Image from "../../assets/images/placeholder.png";
import {API_URL} from "../../config";
import { IoIosClose } from "react-icons/io";

const PreviewMain = ({post, setUserSelected}) => {
    return (
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-10 p-10">
            <div className="bg-[#111111] lg:w-1/4 md:w-2/4 sm:w-2/3 w-full p-6 rounded-md relative">
                <div
                    className = "absolute top-1 left-1 cursor-pointer"
                    onClick = {() => setUserSelected({})}
                >
                    <IoIosClose className = "text-white"/>
                </div>
                {post.image === null ? (
                    <div
                        className="h-40 rounded-lg mb-4"
                        style={{ backgroundImage: `url(${Image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                    ></div>
                ) : (
                    <div
                        className="h-40 rounded-lg mb-4"
                        style={{ backgroundImage: `url(${API_URL}/storage/${post.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                    ></div>
                )}
                {post.template_used.questions.map((question, index) => (
                    <div key={index}>
                        <h1 className="text-neutral-200 text-xl">{question}</h1>
                        {post.answers[index] === "" ? (
                            <div className="h-3 rounded-md bg-neutral-400 mb-4 w-2/3 grow"></div>
                        ) : (
                            <h1 className="text-neutral-400 mb-4 break-all">{post.answers[index]}</h1>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PreviewMain;