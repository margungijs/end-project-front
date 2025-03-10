import React from 'react';
import Image from "../../assets/images/placeholder.png";

const PostOutput = ({posts, limits, marks, chosenLimit}) => {


    return (
        <div className = "flex flex-col p-4 gap-4">
            {limits.map((limit, index) => (
                chosenLimit === 13 ? (
                    <div
                        key={index}
                        className="flex flex-col"
                    >
                        <h1 className = "text-xl text-neutral-200">{marks.find(mark => mark.value === limit.limit)?.label}</h1>
                        <div className = "flex flex-row py-2 gap-4 overflow-x-hidden">
                            {posts.map((post, index) => (
                                post.limit == limit.limit && (
                                    <div className = "bg-[#111111] flex flex-col w-72 border-neutral-700 border-[1px] p-1 rounded-md">
                                        <div className="relative">
                                            {post.image === null ? (
                                                <div
                                                    className="border-neutral-700 border-[1px] h-40 rounded-lg mb-4"
                                                    style={{ backgroundImage: `url(${Image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                                                ></div>
                                            ) : (
                                                <div
                                                    className="border-neutral-700 border-[1px] h-40 rounded-lg mb-4"
                                                    style={{ backgroundImage: `url(http://localhost/storage/${post.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                                                ></div>
                                            )}
                                            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-lg">
                                                <h1 className="text-white text-xl">{post.title}</h1>
                                                <h1 className = "text-white text-md">{new Date(post.created_at).toLocaleDateString()}</h1>
                                            </div>
                                        </div>
                                        {post.template_used.questions.map((question, index) => (
                                            <div key={index}>
                                                <h1 className="text-neutral-200 text-xl">{question}</h1>
                                                {post.answers[index] === "" ? (
                                                    <div className="h-3 rounded-md bg-neutral-400 mb-4 w-2/3 grow"></div>
                                                ) : (
                                                    <h1 className="text-neutral-400 mb-4">{post.answers[index]}</h1>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                ) : (
                    limit.limit == chosenLimit && (
                        <div
                            key={index}
                            className="flex flex-col"
                        >
                            <h1 className = "text-xl text-neutral-200">{marks.find(mark => mark.value === limit.limit)?.label}</h1>
                            <div className = "flex flex-row py-2 gap-4 overflow-x-auto">
                                {posts.map((post, index) => (
                                    post.limit == limit.limit && (
                                        <div className = "bg-[#111111] flex flex-col w-72 border-neutral-700 border-[1px] p-1 rounded-md">
                                            <div className="relative">
                                                {post.image === null ? (
                                                    <div
                                                        className="border-neutral-700 border-[1px] h-40 rounded-md mb-4"
                                                        style={{ backgroundImage: `url(${Image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                                                    ></div>
                                                ) : (
                                                    <div
                                                        className="border-neutral-700 border-[1px] h-40 rounded-md mb-4"
                                                        style={{ backgroundImage: `url(http://localhost/storage/${post.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                                                    ></div>
                                                )}
                                                <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-lg">
                                                    <h1 className="text-white text-xl">{post.title}</h1>
                                                    <h1 className = "text-white text-md">{new Date(post.created_at).toLocaleDateString()}</h1>
                                                </div>
                                            </div>
                                            {post.template_used.questions.map((question, index) => (
                                                <div key={index}>
                                                    <h1 className="text-neutral-200 text-xl">{question}</h1>
                                                    {post.answers[index] === "" ? (
                                                        <div className="h-3 rounded-md bg-neutral-400 mb-4 w-2/3 grow"></div>
                                                    ) : (
                                                        <h1 className="text-neutral-400 mb-4">{post.answers[index]}</h1>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    )
                )
            ))}
        </div>
    );
};

export default PostOutput;