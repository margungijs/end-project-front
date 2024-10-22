import React, {useState, useRef} from 'react';
import image from "../../../assets/images/7195ce2c8612cffa80b20ebf756d99c7.jpg";
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import {IoMdArrowDropdown} from "react-icons/io";

const GeneralMain = () => {
    const name = localStorage.getItem('name');
    const [value, setValue] = useState(0);
    const [privacy, setPrivacy] = useState(false);
    const fileInputRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageError, setImageError] = useState(false);

    const marks = [
        { value: 0, label: '2 weeks' },
        { value: 1, label: '1 month' },
        { value: 2, label: '2 months' },
        { value: 3, label: '3 months' },
        { value: 4, label: '4 months' },
        { value: 5, label: '5 months' },
        { value: 6, label: '6 months' },
        { value: 7, label: '7 months' },
        { value: 8, label: '8 months' },
        { value: 9, label: '9 months' },
        { value: 10, label: '10 months' },
        { value: 11, label: '11 months' },
        { value: 12, label: '1 year' }
    ];

    const valuetext = (value) => {
        return `${marks[value].label}`;
    }


    const CustomSlider = styled(Slider)({
        '& .MuiSlider-markLabel': {
            display: 'none'
        },
        '& .MuiSlider-rail': {
            color: '#4B5563',
            height: '10px'
        },
        '& .MuiSlider-mark': {
            color: 'white'
        },
        '& .MuiSlider-markActive': {
            display: 'none'
        },
        '& .MuiSlider-thumb': {
            color: '#16A34A',
            transition: 'transform 0.3s ease',
            pointerEvents: 'none',
            '&:focus': {
                boxShadow: 'none'
            }
        },
        '& .MuiSlider-track': {
            color: '#16A34A',
            height: '9px',
            transition: 'transform 0.3s ease',
        },
        '& .MuiSlider-markLabel[data-index="0"]': {
            color: 'white',
            display: 'block'
        },
        '& .MuiSlider-markLabel[data-index="12"]':{
            color: 'white',
            display: 'block'
        },
        [`& .MuiSlider-markLabel[data-index="${value}"]`]: {
            display: 'block',
            color: "white"
        },
        '& .MuiSlider-markLabelActive': {
            color: '#16A34A'
        },
        '& .Mui-active': {
            boxShadow: 'none'
        },
        '& .Mui-focusVisible': {
            boxShadow: 'none'
        }
    });

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            setImageError(false)
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImageError(true);
        }
    };


    return (
        <div className = "flex flex-col p-2 w-2/3">
            <h1 className = "text-neutral-200 text-2xl mb-4">General settings</h1>
            <div className = "flex flex-row items-center mb-4">
                <div className="relative w-40 h-40 rounded-full mr-4 cursor-pointer" onClick={handleImageClick}>
                    <img src={selectedImage || image} className="w-full h-full rounded-full"/>
                    <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                        <span className="text-white text-lg">Change photo</span>
                    </div>
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                />
                <div className = "flex flex-col">
                    <h1 className = "text-3xl font-bold text-neutral-200 mb-2">{name}</h1>
                    <h1 className = "text-xl text-neutral-600 mb-1">Member since:
                        <span className = "text-neutral-200 text-xl"> 14-10-2024</span>
                    </h1>
                    <div className = "flex flex-row gap-2 text-xl text-neutral-600">
                        <h1>Posts:
                            <span className = "text-neutral-200"> 0</span>
                        </h1>
                        <h1>Friends:
                            <span className = "text-neutral-200"> 0</span>
                        </h1>
                    </div>
                </div>
            </div>
            {imageError && (
                <div className = "bg-[#111111] border-[1px] border-red-600 my-2 rounded-md p-1 w-40 text-center">
                    <h1 className = "text-neutral-200">Invalid file</h1>
                </div>
            )}
            <div className = "bg-[#111111] border-[1px] hover:border-neutral-500 transition duration-200 cursor-pointer border-neutral-700 mb-4 rounded-md text-center p-1 w-40">
                <h1 className = "text-neutral-200">Edit profile</h1>
            </div>
            <div className = "flex flex-col text-neutral-200 mb-4">
                <h1 className = "text-2xl text-neutral-200 mb-1">Post rate limiter</h1>
                <div className = "flex flex-row items-center gap-4">
                    <h1 className = "text-xl text-neutral-600">Set the time period you want to be able to add posts in</h1>
                    <div
                        className = "rounded-full flex transition duration-200 hover:bg-neutral-700 p-1 cursor-pointer"
                        onClick={() => value > 0 && setValue(value - 1)}
                    >
                        <IoMdArrowDropdown className = "text-2xl rotate-90"/>
                    </div>
                    <div
                        className = "rounded-full flex transition duration-200 hover:bg-neutral-700 p-1 cursor-pointer"
                        onClick={() => value < 12 && setValue(value + 1)}
                    >
                        <IoMdArrowDropdown className = "text-2xl rotate-[270deg]"/>
                    </div>
                </div>
                <div className = "px-8 py-4 flex flex-col relative items-center justify-center">
                    <CustomSlider
                        aria-label="Restricted values"
                        defaultValue={0}
                        getAriaValueText={valuetext}
                        step={null}
                        marks={marks}
                        min={0}
                        max={12}
                        value = {value}
                    />
                </div>
            </div>
            <h1 className = "text-2xl text-neutral-200 mb-1">Profile privacy</h1>
            <h1 className = "text-xl text-neutral-600">Your profile will be private by default to users that aren't on your friend list, but you can choose to set your profile to public or private to your friends</h1>
            <div className = "flex flex-row p-4 justify-between gap-2">
                <div className = "flex flex-row items-center w-1/2">
                    <div
                        className = {`w-4 h-4 border-2 transition duration-200 ${privacy ? "border-neutral-600" : "border-green-600"} mr-4 cursor-pointer flex-shrink-0`}
                        onClick={() => setPrivacy(!privacy)}
                    ></div>
                    <div className = "flex flex-col">
                        <h1 className = {`text-xl transition duration-200 ${privacy ? "text-neutral-600" : "text-neutral-200"}`}>Public</h1>
                        <h1 className = "text-neutral-600">Your profile will be fully public to your friends</h1>
                    </div>
                </div>
                <div className = "flex flex-row items-center w-1/2">
                    <div
                        className = {`w-4 h-4 border-2 transition duration-200 ${privacy ? "border-green-600" : "border-neutral-600"} mr-4 cursor-pointer flex-shrink-0`}
                        onClick={() => setPrivacy(!privacy)}
                    ></div>
                    <div className = "flex flex-col">
                        <h1 className = {`text-xl transition duration-200 ${privacy ? "text-neutral-200" : "text-neutral-600"}`}>Private</h1>
                        <h1 className = "text-neutral-600">Your profile will be private to your friends, but you will be able to set it to public to selected friends</h1>
                    </div>
                </div>
            </div>
            <div className = "bg-[#111111] border-[1px] hover:border-green-600 transition duration-200 cursor-pointer border-neutral-700 mb-4 rounded-md text-center p-1 w-20">
                <h1 className = "text-neutral-200">Save</h1>
            </div>
        </div>
    );
};

export default GeneralMain;