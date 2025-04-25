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
import TagSelector from "./TagSelector";
import {useAuth} from "../../AuthContext";

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
    const [privacy, setPrivacy] = useState(false);
    const [tags, setTags] = useState([]);
    const { user } = useAuth();
    const [cooldownMessage, setCooldownMessage] = useState('');
    const [canPost, setCanPost] = useState(true);
    const [inputErrors, setInputErrors] = useState([]);
    const [titleError, setTitleError] = useState(null);
    const [imageError, setImageError] = useState(null);

    const marks = [
        { value: 0, label: '2 weeks', duration: 14 },
        { value: 1, label: '1 month', duration: 30 },
        { value: 2, label: '2 months', duration: 60 },
        { value: 3, label: '3 months', duration: 90 },
        { value: 4, label: '4 months', duration: 120 },
        { value: 5, label: '5 months', duration: 150 },
        { value: 6, label: '6 months', duration: 180 },
        { value: 7, label: '7 months', duration: 210 },
        { value: 8, label: '8 months', duration: 240 },
        { value: 9, label: '9 months', duration: 270 },
        { value: 10, label: '10 months', duration: 300 },
        { value: 11, label: '11 months', duration: 330 },
        { value: 12, label: '1 year', duration: 365 }
    ];

    useEffect(() => {
        if (Array.isArray(user.post_limit.posts) && user.post_limit.posts.length == 0) {
            setCanPost(true);
            setCooldownMessage('');
            return;
        }

        if (user.post_limit && user.post_limit.updated_at) {
            const lastPostDate = new Date(user.post_limit.updated_at);
            const now = new Date();

            const timePassedInDays = Math.floor((now - lastPostDate) / (1000 * 60 * 60 * 24));
            const requiredDays = marks.find(m => m.value === user.post_limit.limit)?.duration || 0;

            if (timePassedInDays < requiredDays) {
                setCanPost(false);
                const remainingDays = requiredDays - timePassedInDays;

                setCooldownMessage(`You can't create a new post yet. Please wait ${remainingDays} more day${remainingDays !== 1 ? 's' : ''}. Last post was on ${lastPostDate.toLocaleDateString()}.`);
            }
        }
    }, [user.post_limit]);

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
        const allFieldsFilled =
            title !== "" &&
            answers.every(q => q !== "") &&
            imageURL !== "" &&
            titleError === null &&
            inputErrors.every(error => error === null) &&
            imageError === null
        ;

        setComplete(allFieldsFilled);
    }, [title, answers, imageURL, titleError, inputErrors]);


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

        const newErrors = [...inputErrors];
        if (value.trim() === "") {
            newErrors[index] = "This field is required.";
        } else if (value.length > 100) {
            newErrors[index] = "Message cannot exceed 100 characters.";
        } else {
            newErrors[index] = null;
        }

        setInputErrors(newErrors);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file && file.type.startsWith('image/')) {
            if (file.size > 2048 * 1024) {
                setImageError('The selected image is too large. Please select an image smaller than 2MB.');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setImageURL(reader.result);
                setImageError(null);
            };
            reader.readAsDataURL(file);
        } else {
            setImageError('Please select a valid image file.');
        }
    };

    const [initialOverlay, setInitialOverlay] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setInitialOverlay(false);
        }, 3000);

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
            template: selectedID,
            tags: tags,
            privacy: privacy ? 1 : 0
        }

        console.log(combinedArray);

        try{
            const response = await SendDataGeneral(combinedArray, `${API_URL}/api/authenticated/post`);
            const postId = response.data.id;

            if (postId) {
                await uploadImage(postId);
            }
        }catch (error){
            const errors = error.response.data.errors
            if(errors){
                if(errors.title){
                    setTitleError(errors.title[0]);
                }
            }
        }
    }

    useEffect(() => {
        if (location.state) {
            const { title, status } = location.state;
            if (title) setTitle(title);
            if (status !== undefined) setPrivacy(status);
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
                <div className="flex md:flex-row flex-col gap-4 sm:h-full h-fit md:p-6 p-2">
                    <div className="flex flex-col md:w-1/2 w-full">
                        <h1 className="text-2xl text-neutral-200 mb-2">Post creation</h1>
                        <h1 className="text-xl text-neutral-600 mb-4">Posts are where the real magic happens - this is where you truly express yourself</h1>
                        {!canPost && (
                            <div className="mb-4 p-2 bg-red-800/30 border border-red-500 text-red-400 rounded-md">
                                {cooldownMessage}
                            </div>
                        )}
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
                            <div className = "w-1/2">
                                <input
                                    type="text"
                                    className={`bg-neutral-950 h-10 truncate text-neutral-200 w-full rounded-md placeholder-neutral-600 indent-2 py-1 focus:outline-none focus:ring-[1px] ${
                                        titleError ? 'ring-red-500' : 'focus:ring-neutral-200'
                                    } transition duration-200`}
                                    placeholder="post title"
                                    onChange={(e) => {
                                        const val = e.target.value;
                                        setTitle(val);

                                        if (val.trim() === '') {
                                            setTitleError('Title is required.');
                                        } else if (val.length > 50) {
                                            setTitleError('Title cannot exceed 50 characters.');
                                        } else {
                                            setTitleError(null);
                                        }
                                    }}
                                    value={title}
                                />
                                {titleError && <p className="text-red-500 text-sm mt-1">{titleError}</p>}
                            </div>
                            <div
                                className={`bg-neutral-950 relative rounded-md max-h-10 flex flex-row p-2 justify-between items-center cursor-pointer
    w-1/2 transform transition-all duration-300 ease-out`}
                                onClick={() => setDropdown(!dropdown)}
                            >
                                <h1 className="text-neutral-600 truncate w-full pr-6">{selected}</h1>
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
                        <div className = "flex flex-col">
                            <h1 className="text-neutral-200 text-2xl">Post Privacy</h1>
                            <div className = "flex md:flex-row flex-col p-4 justify-between gap-2">
                                <div className = "flex flex-row items-center md:w-1/2 w-full">
                                    <div
                                        className = {`w-4 h-4 border-2 transition duration-200 ${privacy ? "border-neutral-600" : "border-blue-600"} mr-4 cursor-pointer flex-shrink-0`}
                                        onClick={() => setPrivacy(!privacy)}
                                    ></div>
                                    <div className = "flex flex-col">
                                        <h1 className = {`text-xl transition duration-200 ${privacy ? "text-neutral-600" : "text-neutral-200"}`}>Public</h1>
                                        <h1 className = "text-neutral-600">Your post will be fully public for everyone to see</h1>
                                    </div>
                                </div>
                                <div className = "flex flex-row items-center md:w-1/2 w-full">
                                    <div
                                        className = {`w-4 h-4 border-2 transition duration-200 ${privacy ? "border-red-600" : "border-neutral-600"} mr-4 cursor-pointer flex-shrink-0`}
                                        onClick={() => setPrivacy(!privacy)}
                                    ></div>
                                    <div className = "flex flex-col">
                                        <h1 className = {`text-xl transition duration-200 ${privacy ? "text-neutral-200" : "text-neutral-600"}`}>Private</h1>
                                        <h1 className = "text-neutral-600">Your post will be private to everyone but your friends</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <h1 className="text-neutral-200 text-2xl mb-2">Post content</h1>
                        {questions && questions.map((question, index) => (
                            <div className="flex flex-col w-full mb-2">
                                <h1 className="text-neutral-200 text-xl mb-4">{question}</h1>
                                <div>
                                    <input
                                        key={index}
                                        type="text"
                                        className={`bg-neutral-950 truncate text-neutral-200 w-full rounded-md placeholder-neutral-600 indent-2 py-1 focus:outline-none focus:ring-[1px] ${
                                            inputErrors[index] ? 'ring-red-500' : 'focus:ring-neutral-200'
                                        } transition duration-200`}
                                        placeholder={question}
                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                        value={answers[index]}
                                    />
                                    <div className="flex justify-between mt-1 text-sm">
                                        {inputErrors[index] && <p className="text-red-500">{inputErrors[index]}</p>}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <TagSelector tags = {tags} setTags = {setTags}/>

                        {complete && canPost && (
                            <div
                                className = "bg-green-600 mb-2 rounded-md mt-6 transition duration-200 hover:bg-green-700 cursor-pointer p-1 w-fit"
                                onClick = {handleSubmit}
                            >
                                <h1 className = "text-neutral-200">Create post</h1>
                            </div>
                        )}
                    </div>
                    <div className = "md:w-1/2 w-full flex justify-center items-center h-full gap-1">
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
                                    <h1 className = "text-neutral-200 break-all">{username}: {title}</h1>
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
                                    <div className="bg-[#111111] md:w-1/2 w-full p-2 rounded-md">
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
                                                    <h1 className="text-neutral-400 mb-4 break-all">{answers[index]}</h1>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-col p-2 sm:w-1/2 w-full justify-between">
                                        <div className="flex flex-col gap-2 mb-2">
                                            <h1 className="text-neutral-200 text-2xl break-all">{title}</h1>
                                            <h1 className="text-neutral-600 text-md break-all">{description}</h1>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {tags?.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="text-neutral-500 text-sm font-medium"
                                                    >#{tag}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <PiStarFourFill className="w-10 h-10 text-neutral-700 cursor-pointer hover:text-yellow-500 transition duration-200" />
                                    </div>

                                </div>
                            </div>
                            {imageError && <p className="text-red-500 text-sm mt-1">{imageError}</p>}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostMain;