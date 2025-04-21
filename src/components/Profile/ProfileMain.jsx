import React, {useEffect, useState} from 'react';
import image from "../../assets/images/7195ce2c8612cffa80b20ebf756d99c7.jpg"
import { PiMaskSadLight } from "react-icons/pi";
import { MdOutlineAddReaction } from "react-icons/md";
import {useLocation} from "react-router-dom";
import FetchData from "../../reuse/FetchData";
import { FaRegCircleCheck } from "react-icons/fa6";
import { FaRegUserCircle, FaRegClock } from "react-icons/fa";
import Post from "./Post.jsx";
import DashboardHeader from "../Dashboard/Main/DashboardHeader";
import Template from "./Template.jsx";
import SendDataGeneral from "../../reuse/SendDataGeneral";
import {API_URL} from "../../config";
import PreviewMain from "../Preview/PreviewMain";
import PreviewTemplate from "../Preview/PreviewTemplate";

const ProfileMain = () => {
    const location = useLocation();
    const { id } = location.state || {};
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState(true);
    const [sent, setSent] = useState(false);
    const [selectedPost, setSelectedPost] = useState({});
    const [selectedTemp, setSelectedTemp] = useState({});
    const [open, setOpen] = useState(false);

    const fetchData = async () => {
        FetchData(`${API_URL}/api/authenticated/getUser/` + id)
            .then(response => {
                console.log(response)
                setUser(response);
            });
    }

    useEffect(() => {
        fetchData();
    },[sent]);

    if (!user) {
        return <div className = "bg-[#111111] h-screen w-screen">

        </div>;
    }

    const sendFriend = async () => {
        try{
            const response = await SendDataGeneral({friend_id: id}, `${API_URL}/api/authenticated/friendAdd`);
            setSent(true);
        }catch (error){
            console.log(error)
        }
    }

    return (
        <div className = "bg-[#111111] min-h-screen h-fit w-full flex flex-col items-center overflow-y-auto relative overflow-x-hidden">
            <DashboardHeader profile={() => setOpen(!open)} open = {open}/>
            {user.user.image == null ? (
                <FaRegUserCircle className = "w-40 h-40 mt-10 text-neutral-700 mb-2"/>
            ) : (
                <img src={`${API_URL}/storage/` + user.user.image} className = "w-40 h-40 mt-10 rounded-full mb-2"/>
            )}
            <div className = "flex flex-row gap-2 items-center mb-4">
                <h1 className = "text-3xl text-neutral-200">{user.user.name}</h1>
                {localStorage.getItem('id') == id ? null : (
                    user.status === null ? (
                        <MdOutlineAddReaction
                            className="text-3xl cursor-pointer hover:text-green-600 transition duration-200 text-neutral-600"
                            onClick = {sendFriend}
                        />
                    ) : (
                        user.status === 1 ? (
                            <FaRegCircleCheck className="text-green-600 text-3xl"/>
                        ) : (
                            <FaRegClock className="text-orange-600 text-3xl"/>
                        )
                    )
                )}
            </div>
            <div className = "flex flex-row gap-20 mb-4">
                <div className = "flex flex-col items-center">
                    <h1 className = "text-neutral-600 text-xl">Posts</h1>
                    <h1 className = "text-neutral-200 text-2xl">{user.posts.length}</h1>
                </div>
                <div className = "flex flex-col items-center">
                    <h1 className = "text-neutral-600 text-xl">Templates</h1>
                    <h1 className = "text-neutral-200 text-2xl">{user.templates.length}</h1>
                </div>
            </div>
            <div className = "md:w-2/3 lg:w-1/2 w-full flex flex-row border-b-[1px] border-neutral-700 pb-4 mb-8 md:px-0 px-2 ">
                <div
                    className = "w-1/2 text-center"
                    onClick = {() => setPosts(true)}
                >
                    <h1 className = {`text-2xl cursor-pointer transition duration-200 ${posts ? "text-neutral-200" : "text-neutral-600"}`}>Posts</h1>
                </div>
                <div
                    className = "w-1/2 text-center"
                    onClick = {() => setPosts(false)}
                >
                    <h1 className = {`text-2xl cursor-pointer transition duration-200 ${posts ? "text-neutral-600" : "text-neutral-200"}`}>Templates</h1>
                </div>
            </div>
            {posts ? (
                user.posts.length === 0 ? (
                    <div className="flex flex-col items-center">
                        <PiMaskSadLight className="w-40 h-40 text-neutral-600"/>
                        <h1 className="text-neutral-600 text-xl">No posts yet</h1>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 grid-cols-2 gap-4 md:w-2/3 lg:w-1/2 sm:w-2/3 w-full mb-6 md:p-0 p-2">
                        {user.posts.map((post, index) => (
                            <Post key={index} title={post.title} image={post.image} selected = {() => setSelectedPost(post)} />
                        ))}
                    </div>
                )
            ) : (
                user.templates.length === 0 ? (
                    <div className="flex flex-col items-center">
                        <PiMaskSadLight className="w-40 h-40 text-neutral-600"/>
                        <h1 className="text-neutral-600 text-xl">No templates yet</h1>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-3 grid-cols-2 gap-4 md:w-2/3 lg:w-1/2 sm:w-2/3 w-full mb-6 md:p-0 p-2">
                        {user.templates.map((template, index) => (
                            <Template key={index} title={template.title} description = {template.description} selected = {() => setSelectedTemp(template)}/>
                        ))}
                    </div>
                )
            )}

            {Object.keys(selectedPost).length > 0 && (
                <PreviewMain post = {selectedPost} setUserSelected = {() => setSelectedPost({})}/>
            )}

            {Object.keys(selectedTemp).length > 0 && (
                <PreviewTemplate template={selectedTemp} setUserSelected={() => setSelectedTemp({})}/>
            )}
        </div>
    );
};

export default ProfileMain;