import React, { useState, useEffect } from 'react';
import DashboardHeader from "../Dashboard/Main/DashboardHeader";
import FetchData from "../../reuse/FetchData";
import {IoMdArrowDropdown} from "react-icons/io";
import SendDataGeneral from "../../reuse/SendDataGeneral";
import axios from "axios";
import Confetti from 'react-confetti'
import {PiStarFourFill} from "react-icons/pi";
import Image from "../../assets/images/placeholder.png";
import {FaRegUserCircle} from "react-icons/fa";
import {BsStars} from "react-icons/bs";
import {GoTriangleDown} from "react-icons/go";
import { useLocation } from "react-router-dom";
import {API_URL} from "../../config";

const PostMain = () => {
    const location = useLocation();
    const [templates, setTemplates] = useState([]);
    const [dropdown, setDropdown] = useState(false);
    const [selected, setSelected] = useState("");
    const [selectedID, setSelectedID] = useState(1);
    const [questions, setQuestions] = useState();
    const [title, setTitle] = useState( "");
    const [answers, setAnswers] = useState([""]);
    const [imageURL, setImageURL] = useState("");
    const [complete, setComplete] = useState(false);
    const [success, setSuccess] = useState(false);
    const width = window.innerWidth;
    const height = window.innerHeight;
    const username = localStorage.getItem('name');
    const userImage = localStorage.getItem('image');
    const [description, setDescription] = useState("");
    const today = new Date();
    const [profile, setProfile] = useState(false);

    const fetchData = async () => {
        try{
            const response = await FetchData(`${API_URL}/api/authenticated/templates`);
            setTemplates(response.templates)
            const initialTemplate = response.templates.find(template => template.id === 1);
            if (initialTemplate) {
                setSelected(initialTemplate.title);
                setQuestions(initialTemplate.questions);
                setDescription(initialTemplate.description);
            }
        }catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData();
    }, [])

    useEffect(() => {
        const allFieldsFilled = title !== "" && answers.every(q => q !== "") && imageURL !== "";
        setComplete(allFieldsFilled);
    }, [title, answers, imageURL])

    const handleTemplateSelect = (template) => {
        setSelected(template.title);
        setSelectedID(template.id);
        setQuestions(template.questions);
        setDropdown(false);
    };

    const handleInputChange = (index, value) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImageURL(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            console.error('Please select a valid image file.');
        }
    };

    const [initialOverlay, setInitialOverlay] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setInitialOverlay(false);
        }, 3000); // Adjust the delay as needed

        return () => clearTimeout(timer);
    }, []);

    const uploadImage = async (postId) => {
        const formData = new FormData();
        formData.append('image', document.getElementById('fileInput').files[0]);
        formData.append('id', postId);


        try {
            const response = await axios.post(`${API_URL}/api/authenticated/postImage`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Accept': 'application/json',
                },
            });
            console.log('Image uploaded successfully:', response.data);
            setSuccess(true)
        } catch (error) {
            console.log('Error uploading image:', error);
        }
    };

    const handleSubmit = async () => {
        const combinedArray = {
            title: title,
            answers: answers,
            template: selectedID
        }

        try{
            const response = await SendDataGeneral(combinedArray, `${API_URL}/api/authenticated/post`);
            const postId = response.data.id;
            console.log(response)

            if (postId) {
                await uploadImage(postId);
            }
        }catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        if(location.state){
            setTitle(location.state)
        }
    }, [location.state]);

    return (
        <div className="bg-[#111111] h-screen w-screen relative overflow-x-hidden">
            <DashboardHeader profile={() => setProfile(!profile)} open = {profile}/>
            {success ? (
                <div className="absolute top-16 w-full flex flex-col items-center justify-center h-screen">
                    <Confetti
                        width={width}
                        height={height}
                    />
                    <h1 className="text-2xl text-neutral-200 text-center mb-2">Post created successfully!</h1>
                    <h1 className="text-neutral-600 mb-4 text-center">Your post has been added to your profile and is ready to be viewed</h1>
                    <div className="transition-all lg:w-1/2 w-full duration-300 px-6 overflow-hidden max-h-screen opacity-100">
                        <div className="mt-2 flex md:flex-row flex-col bg-neutral-900 gap-2 rounded-md p-2">
                            <div className="bg-[#111111] md:w-1/2 w-full p-2 rounded-md">
                                <div className="relative group">
                                    <div
                                        className="h-40 rounded-lg mb-4"
                                        style={{ backgroundImage: `url(${imageURL})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                                    ></div>
                                </div>
                                {questions && questions.map((question, index) => (
                                    <div key={index}>
                                        <h1 className="text-neutral-200 text-xl">{question}</h1>
                                        {answers[index] === "" && answers[index] ? (
                                            <div className="h-3 rounded-md bg-neutral-400 mb-4 w-2/3 grow"></div>
                                        ) : (
                                            <h1 className="text-neutral-400 mb-4">{answers[index]}</h1>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col p-2 md:w-1/2 w-full justify-between">
                                <div className="flex flex-col gap-2 mb-2">
                                    <h1 className="text-neutral-200 text-2xl">{title}</h1>
                                    <h1 className="text-neutral-600 text-md">{description}</h1>
                                </div>
                                <PiStarFourFill className="w-10 h-10 text-neutral-700 cursor-pointer hover:text-yellow-500 transition duration-200"/>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex md:flex-row flex-col gap-4 sm:h-full h-fit p-6">
                    <div className="flex flex-col md:w-1/2 w-full">
                        <h1 className="text-2xl text-neutral-200 mb-2">Post creation</h1>
                        <h1 className="text-xl text-neutral-600 mb-4">Posts are where the real magic happens - this is where you truly express yourself</h1>
                        <div className="flex flex-row gap-2 mb-2">
                            <div className="flex flex-col w-1/2">
                                <h1 className="text-xl text-neutral-200 mb-2">Post title</h1>
                                <h1 className="text-md text-neutral-600">Choose a title that sums up your post</h1>
                            </div>
                            <div className="flex flex-col w-1/2">
                                <h1 className="text-xl text-neutral-200 mb-2">Template selection</h1>
                                <h1 className="text-md text-neutral-600">Choose a template that you think best fits your current needs</h1>
                            </div>
                        </div>
                        <div className="flex flex-row gap-2 mb-4">
                            <input
                                type="text"
                                className="bg-neutral-950 truncate text-neutral-200 w-1/2 rounded-md placeholder-neutral-600 indent-2 py-1 focus:outline-none focus:ring-[1px] focus:ring-neutral-200 transition duration-200"
                                placeholder="post title"
                                onChange = {(e) => setTitle(e.target.value)}
                                value = {title}
                            />
                            <div
                                className= {`bg-neutral-950 relative rounded-md flex flex-row p-2 justify-between items-center cursor-pointer
                            w-1/2 transform transition-all duration-300 ease-out`}
                                onClick={() => setDropdown(!dropdown)}
                            >
                                <h1 className = "text-neutral-600">{selected}</h1>
                                <IoMdArrowDropdown
                                    className={`text-neutral-600 ${dropdown ? "rotate-180" : ""} transition-transform duration-300`}
                                />
                                <div
                                    className={`left-0 absolute z-20 bg-neutral-950 p-1 top-12 flex flex-col w-full rounded-md 
                    transform transition-all duration-300 ease-out ${
                                        dropdown ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
                                    }`}
                                >
                                    <ul className="text-neutral-600">
                                        {templates.map((template, index) => (
                                            <li
                                                key = {index}
                                                onClick = {() => handleTemplateSelect(template)}
                                                className="hover:bg-neutral-900 rounded-md transition duration-200 p-1"
                                            >{template.title}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <h1 className="text-neutral-200 text-2xl mb-2">Post content</h1>
                        {questions && questions.map((question, index) => (
                            <div className="flex flex-col w-full mb-2">
                                <h1 className="text-neutral-200 text-xl mb-4">{question}</h1>
                                <input
                                    key={index}
                                    type="text"
                                    className="bg-neutral-950 truncate text-neutral-200 w-full rounded-md placeholder-neutral-600 indent-2 py-1 focus:outline-none focus:ring-[1px] focus:ring-neutral-200 transition duration-200"
                                    placeholder={question}
                                    onChange = {(e) => handleInputChange(index, e.target.value)}
                                />
                            </div>
                        ))}
                        {complete && (
                            <div
                                className = "bg-green-600 mb-6 rounded-md mt-6 transition duration-200 hover:bg-green-700 cursor-pointer p-1 w-fit"
                                onClick = {handleSubmit}
                            >
                                <h1 className = "text-neutral-200">Create post</h1>
                            </div>
                        )}
                    </div>
                    <div className = "md:w-1/2 w-full flex justify-center items-center h-full gap-1">
                        {/*<div className = "flex flex-col gap-2 w-1/2">*/}
                        {/*    <h1 className = "text-neutral-200 text-2xl break-words whitespace-normal">{title}</h1>*/}
                        {/*</div>*/}
                        {/*<div className = "bg-[#111111] border-[1px] border-neutral-700 h-fit w-1/2 p-4 rounded-lg">*/}
                        {/*    <div className="relative group" onClick={() => document.getElementById('fileInput').click()}>*/}
                        {/*        <div*/}
                        {/*            className="border-neutral-700 cursor-pointer border-[1px] h-40 rounded-lg mb-4"*/}
                        {/*            style={{ backgroundImage: `url(${imageURL})`, backgroundSize: 'cover', backgroundPosition: 'center' }}*/}
                        {/*        ></div>*/}
                        {/*        <div className="absolute cursor-pointer inset-0 bg-neutral-950 p-4 bg-opacity-50 rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">*/}
                        {/*            <h1 className="text-neutral-200 text-center">Choose an image that you think fits your post</h1>*/}
                        {/*        </div>*/}
                        {/*        <input*/}
                        {/*            type="file"*/}
                        {/*            id="fileInput"*/}
                        {/*            className="hidden"*/}
                        {/*            onChange={handleFileChange}*/}
                        {/*        />*/}
                        {/*    </div>*/}
                        {/*    {questions && questions.map((question, index) => (*/}
                        {/*        <div*/}
                        {/*            className = "flex flex-col"*/}
                        {/*            key = {index}*/}
                        {/*        >*/}
                        {/*            <h1 className = "text-neutral-200 text-xl mb-2">{question}</h1>*/}
                        {/*            {answers[index] ? (*/}
                        {/*                <h1 className = "text-neutral-600 whitespace-normal break-words">{answers[index]}</h1>*/}
                        {/*            ) : (*/}
                        {/*                <>*/}
                        {/*                    <div className="h-2 rounded-md bg-neutral-600 w-full mb-1"></div>*/}
                        {/*                    <div className="h-2 rounded-md bg-neutral-600 w-3/5"></div>*/}
                        {/*                </>*/}
                        {/*            )}*/}
                        {/*        </div>*/}
                        {/*    ))}*/}
                        {/*</div>*/}
                        <div className = "flex flex-col bg-neutral-950 h-fit p-4 rounded-lg">
                            <div className = "flex flex-row items-center">
                                {userImage && userImage !== "null" && userImage !== "" ? (
                                    <img src={`${API_URL}/storage/` + userImage} className = "w-8 h-8 rounded-full mr-2"/>
                                ) : (
                                    <FaRegUserCircle className = "w-8 h-8 text-neutral-700 mr-2"/>
                                )}
                                <h1 className = "text-neutral-200 mr-1">{username}</h1>
                                <BsStars className = "text-neutral-200 mr-1"/>
                                <h1 className = "text-neutral-600">added a new post</h1>
                            </div>
                            <h1 className = "text-neutral-600 text-sm ml-10 mb-4">{today.toLocaleDateString()}</h1>
                            <div className = "flex flex-row bg-neutral-900 items-center rounded-md p-4 justify-between">
                                <div className = "flex flex-row">
                                    {userImage && userImage !== "null" && userImage !== "" ? (
                                        <img src={`${API_URL}/storage/` + userImage} className = "w-6 h-6 rounded-full mr-2"/>
                                    ) : (
                                        <FaRegUserCircle className = "w-6 h-6 text-neutral-700 mr-2"/>
                                    )}
                                    <h1 className = "text-neutral-200">{username}: {title}</h1>
                                </div>
                                <div
                                    className = "bg-neutral-900 hover:bg-neutral-800 transition duration-200 cursor-pointer rounded-md px-2 flex items-center flex-row py-1"
                                >
                                    <GoTriangleDown className = "text-neutral-600 mr-3 transition duration-200 rotate-180"/>
                                    <h1 className = "text-neutral-200 text-sm">View</h1>
                                </div>
                            </div>
                            <div className="transition-all duration-300 overflow-hidden max-h-screen opacity-100">
                                <div className="mt-2 flex sm:flex-row flex-col bg-neutral-900 gap-2 rounded-md p-2">
                                    <div className="bg-[#111111] sm:w-1/2 w-full p-2 rounded-md">
                                        <div className="relative group" onClick={() => document.getElementById('fileInput').click()}>
                                            <div
                                                className="cursor-pointer h-40 rounded-lg mb-4"
                                                style={{ backgroundImage: `url(${imageURL || Image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                                            ></div>
                                            <div className={`absolute cursor-pointer inset-0 bg-neutral-950 p-4 bg-opacity-50 rounded-md flex items-center justify-center transition-opacity duration-300 ${initialOverlay ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                                <h1 className="text-neutral-200 text-center">Choose an image that you think fits your post</h1>
                                            </div>
                                            <input
                                                type="file"
                                                id="fileInput"
                                                className="hidden"
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                        {questions && questions.map((question, index) => (
                                            <div key={index}>
                                                <h1 className="text-neutral-200 text-xl">{question}</h1>
                                                {answers[index] === "" && answers[index] ? (
                                                    <div className="h-3 rounded-md bg-neutral-400 mb-4 w-2/3 grow"></div>
                                                ) : (
                                                    <h1 className="text-neutral-400 mb-4 break-words">{answers[index]}</h1>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-col p-2 sm:w-1/2 w-full justify-between">
                                        <div className="flex flex-col gap-2 mb-2">
                                            <h1 className="text-neutral-200 text-2xl">{title}</h1>
                                            <h1 className="text-neutral-600 text-md">{description}</h1>
                                        </div>
                                        <PiStarFourFill className="w-10 h-10 text-neutral-700 cursor-pointer hover:text-yellow-500 transition duration-200"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostMain;