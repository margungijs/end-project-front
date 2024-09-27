import React, {useState, useRef} from 'react';
import Logo from "../../assets/images/final_final.png"
import { RiImageCircleFill } from "react-icons/ri";

const ProfileImage = () => {
    const fileInputRef = useRef(null);
    const [fileName, setFileName] = useState(null);
    const [filePreview, setFilePreview] = useState(null);


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.type.startsWith("image/")) {
                setFileName(file.name);
                setFilePreview(URL.createObjectURL(file));
            }
        }
    };

    const handleDivClick = () => {
        fileInputRef.current.click();
    };

    return (
        <div className = "bg-neutral-950 flex flex-col justify-center items-center h-screen w-full">
            <div className = "bg-[#111111] w-2/5 border-[1px] border-neutral-700 rounded-lg flex flex-col items-center py-6 px-4">
                <div className = "flex flex-col items-center mb-6">
                    <img src={Logo} className = "w-14 h-14 mb-4"/>
                    <h1 className = "text-neutral-200 text-3xl text-center">Just some additional steps before you use Chronicle</h1>
                </div>
                <div className = "flex flex-col items-center mb-6">
                    <div
                        className="group rounded-full mb-2 bg-neutral-950 w-60 h-60 flex flex-col items-center justify-center cursor-pointer hover:scale-105 transform duration-300 overflow-hidden"
                        onClick={handleDivClick}
                        style={{
                            backgroundImage: filePreview ? `url(${filePreview})` : 'none',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        {!filePreview && (
                            <RiImageCircleFill className="w-3/4 h-3/4 text-neutral-800 group-hover:text-green-600 transform duration-300" />
                        )}
                    </div>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept="image/*"
                        style={{ display: 'none' }}
                    />
                    <h1 className = "text-2xl text-neutral-500">Choose a profile image</h1>
                </div>
                <div
                    className={`self-end rounded-md py-1 px-3  ${
                        filePreview ? 'bg-green-600 cursor-pointer hover:bg-green-700 transform duration-300' : 'bg-green-700/50'
                    }`}
                >
                    <h1 className={`text-xl ${filePreview ? 'text-neutral-200' : 'text-neutral-500'}`}>
                        Next
                    </h1>
                </div>
            </div>
        </div>
    );
};

export default ProfileImage;