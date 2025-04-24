import React, { useState, useEffect } from 'react';
import { IoIosAddCircleOutline } from "react-icons/io";
import DashboardHeader from "../Dashboard/Main/DashboardHeader";
import SendDataGeneral from "../../reuse/SendDataGeneral";
import Confetti from "react-confetti";
import {FaRegUserCircle} from "react-icons/fa";
import {BsStars} from "react-icons/bs";
import {GoTriangleDown} from "react-icons/go";
import {PiStarFourFill} from "react-icons/pi";
import Image from "../../assets/images/placeholder.png";
import { IoDocumentTextOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { API_URL } from "../../config";
import TagSelector from "../Post/TagSelector";

const TemplateMain = () => {
    const [questions, setQuestions] = useState([""]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isFormComplete, setIsFormComplete] = useState(false);
    const [success, setSuccess] = useState(false);
    const width = window.innerWidth;
    const height = window.innerHeight;
    const username = localStorage.getItem('name');
    const userImage = localStorage.getItem('image');
    const today = new Date();
    const [open, setOpen] = useState(false);
    const location = useLocation();
    const [tags, setTags] = useState([]);
    const [titleError, setTitleError] = useState(null);
    const [descError, setDescError] = useState(null);
    const [inputErrors, setInputErrors] = useState([]);

    const addQuestion = () => {
        if (questions[questions.length - 1] !== "" && questions.length < 4) {
            setQuestions([...questions, ""]);
        }
    };

    useEffect(() => {
        checkFormComplete();
    }, [title, description, questions]);

    const removeQuestion = () => {
        if (questions.length > 1) {
            const newQuestions = [...questions];
            newQuestions.pop();
            setQuestions(newQuestions);
        }
    };

    const handleInputChange = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index] = value;
        setQuestions(newQuestions);

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

    const checkFormComplete = () => {
        const allFieldsFilled = title !== "" && description !== "" && questions.every(q => q !== "");
        setIsFormComplete(allFieldsFilled);
    };

    const handleSubmit = () => {
        const combinedArray = {
            title: title,
            description: description,
            questions: questions,
            tags: tags
        };
        console.log(combinedArray);

        SendDataGeneral(combinedArray, `${API_URL}/api/authenticated/template`)
            .then(response => {
                console.log(response);
                setSuccess(true);
            })
            .catch(error => {
                const errors = error.response.data.errors
                if(errors){
                    if(errors.title){
                        setTitleError(errors.title[0]);
                    }
                }
            });
    };

    useEffect(() => {
        if (location.state?.title) {
            setTitle(location.state.title);
        }

        if (location.state?.desc) {
            setDescription(location.state.desc);
        }
    }, [location.state]);

    return (
        <div className="bg-[#111111] h-screen w-screen relative overflow-x-hidden">
            <DashboardHeader profile={() => setOpen(!open)} open = {open}/>
            {success ? (
                <div className="absolute top-16 w-full flex flex-col items-center justify-center h-screen">
                    <Confetti
                        width={width}
                        height={height}
                    />
                    <h1 className="text-2xl text-neutral-200 text-center mb-2">Template created successfully!</h1>
                    <h1 className="text-neutral-600 mb-4 text-center">Your template has been added to your collection and is ready to be used</h1>
                    <div className="transition-all lg:w-1/2 w-full duration-300 overflow-hidden max-h-screen opacity-100">
                        <div className="mt-2 flex md:flex-row flex-col bg-neutral-900 gap-2 rounded-md p-2">
                            <div className="bg-[#111111] md:w-1/2 w-full p-2 rounded-md">
                                <div
                                    className="h-40 rounded-lg mb-4"
                                    style={{ backgroundImage: `url(${Image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                                ></div>
                                {questions.map((question, index) => (
                                    <div key={index} className = "mb-4">
                                        {question === "" ? (
                                            <div className="h-3 rounded-md bg-neutral-400 mb-4 w-2/3 grow"></div>
                                        ) : (
                                            <h1 className="text-neutral-200 text-xl mb-2">{question}</h1>
                                        )}
                                        <div className = "h-2 rounded-md w-full bg-neutral-800 mb-1"></div>
                                        <div className = "h-2 rounded-md w-1/2 bg-neutral-800 mb-1"></div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col p-2 md:w-1/2 w-full justify-between">
                                <div className="flex flex-col gap-2">
                                    <h1 className="text-neutral-200 text-2xl">{title}</h1>
                                    <h1 className="text-neutral-600 text-md">{description}</h1>
                                </div>
                                <PiStarFourFill className="w-10 h-10 text-neutral-700 cursor-pointer hover:text-yellow-500 transition duration-200"/>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex md:flex-row flex-col gap-4 sm:h-full h-fit md:p-8 sm:p-6 p-4">
                    <div className="flex flex-col md:w-1/2 w-full">
                        <h1 className="text-2xl text-neutral-200 mb-2">Templates</h1>
                        <h1 className="md:text-xl text-md text-neutral-600 mb-4">Templates are a way you can express yourself better and more personally - make your own questions and create personalised posts that will express you better</h1>
                        <div className="flex flex-row gap-2 mb-2">
                            <div className="flex flex-col w-1/2">
                                <h1 className="text-xl text-neutral-200 mb-2">Template title</h1>
                                <h1 className="md:text-md text-sm text-neutral-600">Choose a title that sums up your templates meaning</h1>
                            </div>
                            <div className="flex flex-col w-1/2">
                                <h1 className="text-xl text-neutral-200 mb-2">Template description</h1>
                                <h1 className="md:text-md text-sm text-neutral-600">Make a description that explains the meaning of your template further than the title</h1>
                            </div>
                        </div>
                        <div className="flex flex-row gap-2 mb-4">
                            <div className = "flex flex-col w-1/2">
                                <input
                                    type="text"
                                    className={`bg-neutral-950 truncate text-neutral-200 w-full rounded-md placeholder-neutral-600 indent-2 py-1 focus:outline-none focus:ring-[1px] transition duration-200 ${
                                        titleError ? 'ring-red-500' : 'focus:ring-neutral-200'
                                    }`}
                                    placeholder="template title"
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setTitle(value);
                                        if (value.length > 50) {
                                            setTitleError("Title must be 50 characters or fewer.");
                                        } else if(value === ''){
                                            setTitleError("Title is required.");
                                        } else {
                                            setTitleError(null);
                                        }
                                    }}
                                    value={title}
                                />
                                {titleError && (
                                    <p className="text-red-500 text-sm mt-1">{titleError}</p>
                                )}
                            </div>

                            <div className = "flex flex-col w-1/2">
                                <input
                                    type="text"
                                    className={`bg-neutral-950 truncate text-neutral-200 w-full rounded-md placeholder-neutral-600 indent-2 py-1 focus:outline-none focus:ring-[1px] transition duration-200 ${
                                        descError ? 'ring-red-500' : 'focus:ring-neutral-200'
                                    }`}
                                    placeholder="template description"
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setDescription(value);
                                        if (value.length > 255) {
                                            setDescError("Description must be 255 characters or fewer.");
                                        } else if(value === ''){
                                            setDescError("Description is required.");
                                        } else {
                                            setDescError(null);
                                        }
                                    }}
                                    value={description}
                                />
                                {descError && (
                                    <p className="text-red-500 text-sm mt-1">{descError}</p>
                                )}
                            </div>
                        </div>
                        <h1 className="text-neutral-200 md:text-2xl text-xl mb-2">Template questions</h1>
                        <h1 className="md:text-xl text-md text-neutral-600 mb-4">Choose questions that you think matter to yourself and will help the self-reflection process</h1>
                        <div className="flex flex-col w-full">
                            {questions.map((question, index) => (
                                <div className="flex flex-col w-full mb-2">
                                    <h1 className="text-neutral-200 text-xl mb-4">Question {index + 1}</h1>
                                    <input
                                        type="text"
                                        className={`bg-neutral-950 truncate text-neutral-200 w-full rounded-md placeholder-neutral-600 indent-2 py-1 focus:outline-none focus:ring-[1px] ${
                                            inputErrors[index] ? 'ring-red-500' : 'focus:ring-neutral-200'
                                        } transition duration-200`}
                                        placeholder={`Question ${index + 1}`}
                                        value={question}
                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                    />
                                    <div className="flex justify-between mt-1 text-sm">
                                        {inputErrors[index] && <p className="text-red-500">{inputErrors[index]}</p>}
                                    </div>
                                </div>
                            ))}
                            <div className = "flex flex-row gap-4 mb-4 mt-4">
                                <div
                                    className={`bg-purple-600 hover:bg-purple-700 cursor-pointer ${questions.length >= 4 ? "hidden" : ""} transition duration-200 rounded-md w-fit flex items-center justify-center p-1`}
                                    onClick={addQuestion}
                                >
                                    <h1 className = "text-neutral-200">Add question</h1>
                                </div>
                                <div
                                    className={`bg-purple-600 hover:bg-purple-700 ${questions.length === 1 ? "hidden" : ""} transition duration-200 rounded-md w-fit flex items-center justify-center p-1`}
                                    onClick={removeQuestion}
                                >
                                    <h1 className = "text-neutral-200">Remove question</h1>
                                </div>
                            </div>
                            <TagSelector tags={tags} setTags={setTags}/>
                            {isFormComplete && titleError == null && descError == null && inputErrors.every(error => error === null) && (
                                <div
                                    className = "bg-purple-600 mb-6 rounded-md transition duration-200 hover:bg-purple-700 cursor-pointer p-1 w-fit"
                                    onClick = {handleSubmit}
                                >
                                    <h1 className = "text-neutral-200">Create template</h1>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className = "md:w-1/2 w-full flex justify-center items-center h-full gap-1">
                        <div className = "flex flex-col w-full bg-neutral-950 p-4 h-fit rounded-lg">
                            <div className = "flex flex-row items-center">
                                {userImage && userImage !== "null" && userImage !== "" ? (
                                    <img src={`${API_URL}/storage/` + userImage} className = "w-8 h-8 rounded-full mr-2"/>
                                ) : (
                                    <FaRegUserCircle className = "w-8 h-8 text-neutral-700 mr-2"/>
                                )}
                                <h1 className = "text-neutral-200 mr-1">{username}</h1>
                                <IoDocumentTextOutline className = "text-neutral-200 mr-1"/>
                                <h1 className = "text-neutral-600 md:text-md text-sm">made a new template</h1>
                            </div>
                            <h1 className = "text-neutral-600 text-sm ml-10 mb-4">{today.toLocaleDateString()}</h1>
                            <div className = "flex flex-row bg-neutral-900 items-center rounded-md p-4 justify-between">
                                <div className = "flex flex-row items-center">
                                    {userImage && userImage !== "null" && userImage !== "" ? (
                                        <img src={`${API_URL}/storage/` + userImage} className = "w-6 h-6 rounded-full mr-2"/>
                                    ) : (
                                        <FaRegUserCircle className = "w-6 h-6 text-neutral-700 mr-2"/>
                                    )}
                                    <h1 className = "text-neutral-200 md:text-md text-sm break-all">{username}:{title}</h1>
                                </div>
                                <div
                                    className = "bg-neutral-900 hover:bg-neutral-800 transition duration-200 cursor-pointer rounded-md px-2 sm:flex hidden items-center flex-row py-1"
                                >
                                    <GoTriangleDown className = "text-neutral-600 mr-3 transition duration-200 rotate-180"/>
                                    <h1 className = "text-neutral-200 text-sm">View</h1>
                                </div>
                            </div>
                            <div className="transition-all duration-300 overflow-hidden max-h-screen opacity-100">
                                <div className="mt-2 flex md:flex-row flex-col bg-neutral-900 gap-2 rounded-md p-2">
                                    <div className="bg-[#111111] sm:w-1/2 w-full p-2 rounded-md">
                                        <div
                                            className="h-40 rounded-lg mb-4"
                                            style={{ backgroundImage: `url(${Image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                                        ></div>
                                        {questions.map((question, index) => (
                                            <div key={index} className = "mb-4">
                                                {question === "" ? (
                                                    <div className="h-3 rounded-md bg-neutral-400 mb-4 w-2/3 grow"></div>
                                                ) : (
                                                    <h1 className="text-neutral-200 md:text-xl text-md mb-2 break-all">{question}</h1>
                                                )}
                                                <div className = "h-2 rounded-md w-full bg-neutral-800 mb-1"></div>
                                                <div className = "h-2 rounded-md w-1/2 bg-neutral-800 mb-1"></div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-col p-2 sm:w-1/2 w-full justify-between">
                                        <div className="flex flex-col gap-2 mb-2">
                                            <h1 className="text-neutral-200 md:text-2xl text-xl break-all">{title}</h1>
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

export default TemplateMain;