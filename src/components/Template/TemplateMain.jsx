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
import { API_URL } from "../../config";

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
    };

    const checkFormComplete = () => {
        const allFieldsFilled = title !== "" && description !== "" && questions.every(q => q !== "");
        setIsFormComplete(allFieldsFilled);
    };

    const handleSubmit = () => {
        const combinedArray = {
            title: title,
            description: description,
            questions: questions
        };
        console.log(combinedArray);

        SendDataGeneral(combinedArray, `${API_URL}/api/authenticated/template`)
            .then(response => {
                console.log(response);
                setSuccess(true);
            })
            .catch(error => {
                console.log("Error", error);
            });
    };



    return (
        <div className="bg-[#111111] h-screen w-screen relative overflow-x-hidden">
            <DashboardHeader />
            {success ? (
                <div className="absolute top-16 w-full flex flex-col items-center justify-center h-screen">
                    <Confetti
                        width={width}
                        height={height}
                    />
                    <h1 className="text-2xl text-neutral-200 text-center mb-2">Template created successfully!</h1>
                    <h1 className="text-neutral-600 mb-4 text-center">Your template has been added to your collection and is ready to be used</h1>
                    <div className="transition-all w-1/2 duration-300 overflow-hidden max-h-screen opacity-100">
                        <div className="mt-2 flex flex-row bg-neutral-900 border-[1px] gap-2 border-neutral-700 rounded-md p-2">
                            <div className="bg-[#111111] border-neutral-700 border-[1px] w-1/2 p-2 rounded-md">
                                <div
                                    className="border-neutral-700 border-[1px] h-40 rounded-lg mb-4"
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
                            <div className="flex flex-col p-2 w-1/2 justify-between">
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
                <div className="flex flex-row gap-4 h-full p-10">

                    <div className="flex flex-col w-1/2">
                        <h1 className="text-2xl text-neutral-200 mb-2">Templates</h1>
                        <h1 className="text-xl text-neutral-600 mb-4">Templates are a way you can express yourself better and more personally - make your own questions and create personalised posts that will express you better</h1>
                        <div className="flex flex-row gap-2 mb-2">
                            <div className="flex flex-col w-1/2">
                                <h1 className="text-xl text-neutral-200 mb-2">Template title</h1>
                                <h1 className="text-md text-neutral-600">Choose a title that sums up your templates meaning</h1>
                            </div>
                            <div className="flex flex-col w-1/2">
                                <h1 className="text-xl text-neutral-200 mb-2">Template description</h1>
                                <h1 className="text-md text-neutral-600">Make a description that explains the meaning of your template further than the title</h1>
                            </div>
                        </div>
                        <div className="flex flex-row gap-2 mb-4">
                            <input
                                type="text"
                                className="bg-[#111111] text-neutral-200 w-1/2 border-[1px] border-neutral-700 rounded-md placeholder-neutral-600 indent-2 py-1 focus:outline-none focus:ring-[1px] focus:ring-neutral-200 transition duration-200"
                                placeholder="template title"
                                onChange={(e) => setTitle(e.target.value)}
                                value = {title}
                            />
                            <input
                                type="text"
                                className="bg-[#111111] text-neutral-200 w-1/2 border-[1px] border-neutral-700 rounded-md placeholder-neutral-600 indent-2 py-1 focus:outline-none focus:ring-[1px] focus:ring-neutral-200 transition duration-200"
                                placeholder="template description"
                                onChange={(e) => setDescription(e.target.value)}
                                value = {description}
                            />
                        </div>
                        <h1 className="text-neutral-200 text-2xl mb-2">Template questions</h1>
                        <h1 className="text-xl text-neutral-600 mb-4">Choose questions that you think matter to yourself and will help the self-reflection process</h1>
                        <div className="flex flex-col w-full">
                            {questions.map((question, index) => (
                                <div className="flex flex-col w-full mb-2">
                                    <h1 className="text-neutral-200 text-xl mb-4">Question {index + 1}</h1>
                                    <input
                                        type="text"
                                        className="bg-[#111111] text-neutral-200 w-full border-[1px] border-neutral-700 rounded-md placeholder-neutral-600 indent-2 py-1 focus:outline-none focus:ring-[1px] focus:ring-neutral-200 transition duration-200"
                                        placeholder={`Question ${index + 1}`}
                                        value={question}
                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                    />
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
                            {isFormComplete && (
                                <div
                                    className = "bg-purple-600 mb-6 rounded-md transition duration-200 hover:bg-purple-700 cursor-pointer p-1 w-fit"
                                    onClick = {handleSubmit}
                                >
                                    <h1 className = "text-neutral-200">Create template</h1>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className = "w-1/2 flex justify-center items-center h-full gap-1">
                        <div className = "flex flex-col w-full bg-[#111111] p-4 h-fit rounded-lg border-[1px] border-neutral-700">
                            <div className = "flex flex-row items-center">
                                {userImage && userImage !== "null" && userImage !== "" ? (
                                    <img src={`${API_URL}/storage/` + userImage} className = "w-8 h-8 rounded-full mr-2"/>
                                ) : (
                                    <FaRegUserCircle className = "w-8 h-8 text-neutral-700 mr-2"/>
                                )}
                                <h1 className = "text-neutral-200 mr-1">{username}</h1>
                                <IoDocumentTextOutline className = "text-neutral-200 mr-1"/>
                                <h1 className = "text-neutral-600">made a new template</h1>
                            </div>
                            <h1 className = "text-neutral-600 text-sm ml-10 mb-4">{today.toLocaleDateString()}</h1>
                            <div className = "flex flex-row bg-neutral-900 border-[1px] items-center border-neutral-700 rounded-md p-4 justify-between">
                                <div className = "flex flex-row">
                                    {userImage && userImage !== "null" && userImage !== "" ? (
                                        <img src={`${API_URL}/storage/` + userImage} className = "w-6 h-6 rounded-full mr-2"/>
                                    ) : (
                                        <FaRegUserCircle className = "w-6 h-6 text-neutral-700 mr-2"/>
                                    )}
                                    <h1 className = "text-neutral-200">{username}->{title}</h1>
                                </div>
                                <div
                                    className = "bg-neutral-900 hover:bg-neutral-800 transition duration-200 cursor-pointer rounded-md px-2 flex items-center flex-row py-1 border-[1px] border-neutral-700"
                                >
                                    <GoTriangleDown className = "text-neutral-600 mr-3 transition duration-200 rotate-180"/>
                                    <h1 className = "text-neutral-200 text-sm">View</h1>
                                </div>
                            </div>
                            <div className="transition-all duration-300 overflow-hidden max-h-screen opacity-100">
                                <div className="mt-2 flex flex-row bg-neutral-900 border-[1px] gap-2 border-neutral-700 rounded-md p-2">
                                    <div className="bg-[#111111] border-neutral-700 border-[1px] w-1/2 p-2 rounded-md">
                                        <div
                                            className="border-neutral-700 border-[1px] h-40 rounded-lg mb-4"
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
                                    <div className="flex flex-col p-2 w-1/2 justify-between">
                                        <div className="flex flex-col gap-2">
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

export default TemplateMain;