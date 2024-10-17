import React, {useState} from 'react';
import image from "../../../assets/images/7195ce2c8612cffa80b20ebf756d99c7.jpg";
import Slider from '@mui/material/Slider';
import { styled } from '@mui/material/styles';
import {IoMdArrowDropdown} from "react-icons/io";

const GeneralMain = () => {
    const name = localStorage.getItem('name');
    const [value, setValue] = useState(0);
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
            pointerEvents: 'none', // Make the thumb not interactable
            '&:focus': {
                boxShadow: 'none' // Remove the outer clicked effect
            }
        },
        '& .MuiSlider-track': {
            color: '#16A34A',
            height: '9px'
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


    return (
        <div className = "flex flex-col p-2 w-2/3">
            <h1 className = "text-neutral-200 text-2xl mb-4">General settings</h1>
            <div className = "flex flex-row items-center mb-4">
                <img src={image} className = "w-40 h-40 rounded-full mr-4"/>
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
            <div className = "flex flex-col text-neutral-200">
                <h1 className = "text-2xl text-neutral-200">Post rate limiter</h1>
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
        </div>
    );
};

export default GeneralMain;