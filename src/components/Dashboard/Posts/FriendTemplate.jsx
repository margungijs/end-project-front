import React, {useState, useEffect} from 'react';
import { IoDocumentTextOutline } from "react-icons/io5";
import { GoTriangleDown } from "react-icons/go";
import {FaRegUserCircle} from "react-icons/fa";
import {PiStarFourFill} from "react-icons/pi";
import templateImage from "../../../assets/images/placeholder.png"
import {API_URL} from "../../../config";
import {useNavigate} from "react-router-dom";
import speakText from "../../../reuse/SpeakText";
import {HiMiniSpeakerWave} from "react-icons/hi2";
import SendDataGeneral from "../../../reuse/SendDataGeneral";
import FriendPost from "./FriendPost";

const FriendTemplate = React.forwardRef(({name, image, title, date, questions, description, like, liked, user_id, template_id}, ref) => {
    const [open, setOpen] = useState(false);
    const [likedTemplate, setLikedTemplate] = useState(liked);
    const navigate = useNavigate();
    const tts = localStorage.getItem('tts');

    const navigateToProfile = (id) => {
        navigate(`/Profiles/${name}`, {state: {id: id}});
    }

    const speakPost = async (name, title, template, description) => {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();

            return;
        }

        let speech = `${name} created a template, titled ${title} - the description says ${description} - `;

        const maxLength = questions.length;
        for (let i = 0; i < maxLength; i++) {
            if (questions[i]) speech += questions[i] + ' - ';
        }

        speakText(speech);
    };

    useEffect(() => {
        if (tts == 1 && open) {
            speakPost(name, title, questions, description);
        }
    }, [open, tts, name, title, questions, description]);

    const viewTemplate = async (id) => {
        try{
            await SendDataGeneral({id: id} ,`${API_URL}/api/authenticated/templateView`);
        }catch (error){
            console.log(error);
        }
    }

    return (
        <div ref={ref} className = "flex flex-col bg-[#111111] p-4 rounded-lg">
            <div className = "flex flex-row items-center">
                {image !== null ? (
                    <img src={`${API_URL}/storage/` + image} className = "w-8 h-8 rounded-full mr-2"/>
                ) : (
                    <FaRegUserCircle className = "w-8 h-8 text-neutral-700 mr-2"/>
                )}
                <h1
                    className = "text-neutral-200 mr-1"
                    onClick = {() => navigateToProfile(user_id)}
                >{name}</h1>
                <IoDocumentTextOutline className = "text-neutral-200 mr-1"/>
                <h1 className = "text-neutral-600 md:text-md text-sm">made a new template</h1>
            </div>
            <h1 className = "text-neutral-600 text-sm ml-10 mb-4">{date}</h1>
            <div className = "flex flex-row bg-neutral-900 items-center rounded-md p-4 justify-between">
                <div className = "flex flex-row items-center sm:justify-normal justify-center">
                    {image !== null ? (
                        <img src={`${API_URL}/storage/` + image} className = "w-6 h-6 sm:block hidden rounded-full mr-2"/>
                    ) : (
                        <FaRegUserCircle className = "w-6 h-6 sm:block hidden text-neutral-700 mr-2"/>
                    )}
                    <h1 className="text-neutral-200 break-all">
                        {name}: <span className="text-sm">{title}</span>
                    </h1>
                </div>
                <div
                    className = "bg-neutral-900 hover:bg-neutral-800 transition duration-200 cursor-pointer rounded-md px-2 flex items-center flex-row py-1"
                    onClick={() => {
                        setOpen(!open)
                        viewTemplate(template_id)
                    }}
                >
                    <GoTriangleDown className = {`text-neutral-600 mr-3 transition duration-200  ${open ? "rotate-180" : ""}`}/>
                    <h1 className = "text-neutral-200 text-sm">View</h1>
                </div>
            </div>
            <div className={`transition-all duration-300 overflow-hidden ${open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}>
                <div className="mt-2 flex md:flex-row flex-col bg-neutral-900 gap-2 rounded-md p-2">
                    <div className="bg-[#111111] md:w-1/2 w-full p-2 rounded-md">
                        <div
                            className="h-40 rounded-lg mb-4"
                            style={{ backgroundImage: `url(${templateImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                        ></div>
                        {questions.map((question, index) => (
                            <div className = "flex flex-col">
                                <h1 className = "text-neutral-200 text-xl mb-1">{question}</h1>
                                <div className = "h-2 rounded-md w-full bg-neutral-800 mb-1"></div>
                                <div className = "h-2 rounded-md w-1/2 bg-neutral-800 mb-1"></div>
                            </div>
                        ))}
                    </div>
                    <div className="flex flex-col p-2 md:w-1/2 w-full justify-between">
                        <div className="flex flex-col gap-2 mb-2">
                            <h1 className="text-neutral-200 text-2xl">{title}</h1>
                            <h1 className="text-neutral-600 text-md">{description}</h1>
                        </div>
                        <div className = "flex flex-row gap-2">
                            <PiStarFourFill
                                onClick={() => {like(); setLikedTemplate(!likedTemplate);}}
                                className={`w-10 h-10 cursor-pointer ${likedTemplate ? "text-yellow-500" : "text-neutral-700"} hover:text-yellow-500 transition duration-200`}
                            />
                            <HiMiniSpeakerWave
                                className = 'w-10 h-10 cursor-pointer hover:text-blue-500 text-neutral-700 transition duration-200'
                                onClick = {() => speakPost(name, title, questions, description)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
});

FriendTemplate.displayName = 'FriendTemplate';

export default FriendTemplate;