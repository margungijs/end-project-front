import React from 'react';
import Image from "../../assets/images/placeholder.png";

const CollectionOutput = ({selected, collection}) => {

    console.log(collection.items)

    return (
        <div className = "flex flex-col p-4 gap-4">
            {selected === 0 ? (
                <div className = "flex flex-col">
                    <div className = "flex flex-col">
                        <h1 className = "text-neutral-200 text-xl">Posts</h1>
                        <div className = "py-2 gap-4 overflow-x-hidden flex flex-row">
                            {collection && collection.map((item, index) => (
                                item.answers && (
                                    <div
                                        className = "bg-[#111111] flex flex-col w-72 p-1 rounded-md"
                                        key = {index}
                                    >
                                        <div className="relative">
                                            {item.image === null ? (
                                                <div
                                                    className="h-40 rounded-lg mb-4"
                                                    style={{ backgroundImage: `url(${Image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                                                ></div>
                                            ) : (
                                                <div
                                                    className="h-40 rounded-lg mb-4"
                                                    style={{ backgroundImage: `url(http://localhost/storage/${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                                                ></div>
                                            )}
                                            <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-200 rounded-lg">
                                                <h1 className="text-white text-xl">{item.title}</h1>
                                                <h1 className = "text-white text-md">{new Date(item.created_at).toLocaleDateString()}</h1>
                                            </div>
                                        </div>
                                    </div>
                                )
                            ))}
                        </div>
                    </div>
                    <div className = "flex flex-col">
                        <h1 className = "text-neutral-200 text-xl">Templates</h1>
                        <div className = "py-2 gap-4 overflow-x-hidden flex flex-row">

                        </div>
                    </div>
                </div>
            ) : (
                selected == 1 ? (
                    <div className = "flex flex-col">
                        <h1 className = "text-neutral-200 text-xl">Posts</h1>
                    </div>
                ) : (
                    <div className = "flex flex-col">
                        <h1 className = "text-neutral-200 text-xl">Templates</h1>
                    </div>
                )
            )}
        </div>
    );
};

export default CollectionOutput;