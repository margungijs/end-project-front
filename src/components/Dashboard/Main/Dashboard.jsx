import React, {useEffect, useState} from 'react';
import DashboardHeader from "./DashboardHeader";
import { FaHome } from "react-icons/fa";
import { GoStarFill } from "react-icons/go";
import { BsStars } from "react-icons/bs";
import {FaMessage} from "react-icons/fa6";
import axios from "axios";
import FriendPost from "../Posts/FriendPost";
import NewPost from "../Recommendations/NewPost";
import { IoIosPlay } from "react-icons/io";
import AdditionalInfo from "../Recommendations/AdditionalInfo";
import { FiAward } from "react-icons/fi";
import Shortcut from "../Recommendations/Shortcut";
import Template from "../Recommendations/Template";
import Shortcuts from "./Shortcuts";

const Dashboard = () => {
    const [data, setData] = useState({});
    const [profile, setProfile] = useState(false);
    const [feed, setFeed] = useState(false);
    const [shortcuts, setShortcuts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost/api/authenticated/user');
                console.log(response.data.user)
                setData(response.data.user);
                setShortcuts(response.data.user.shortcuts);
                localStorage.setItem('name', response.data.user.name);
                localStorage.setItem('image', response.data.user.image);
            } catch (error) {
                console.error('Error fetching the data', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className = "bg-neutral-950 h-screen w-screen flex flex-col overflow-x-hidden relative">
            <DashboardHeader name = {data.name} image = {data.image} profile={() => setProfile(!profile)} open = {profile}/>
            <div className = "flex flex-row">
                <Shortcuts shortcuts = {shortcuts} />
                <div className = "flex flex-col px-2 py-8 w-2/4">
                    <div className = "flex flex-row mb-4">
                        <h1 className = "text-2xl text-neutral-200 mr-4">Chronicle</h1>
                        <h1
                            className = {`text-xl ${feed ? 'text-neutral-700' : 'text-blue-500'} transition duration-200 cursor-pointer flex items-center border-r-[1px] pr-2 border-neutral-700`}
                            onClick = {() => setFeed(false)}
                        >Your feed</h1>
                        <h1
                            className = {`text-xl ${feed ? 'text-blue-500' : 'text-neutral-700'} transition duration-200 cursor-pointer flex items-center ml-2`}
                            onClick = {() => setFeed(true)}
                        >Explore</h1>
                    </div>
                    <div className = "mb-2 flex flex-row items-center">
                        <IoIosPlay className = "text-xl text-blue-500 mr-2"/>
                        <h1 className = "text-neutral-600">Start using Chronicle</h1>
                    </div>
                    <div className = "flex flex-row mb-6 gap-4">
                        <NewPost />
                        <AdditionalInfo />
                    </div>
                    <div className = "mb-2 flex flex-row items-center">
                        <FiAward className = "text-xl text-purple-500 mr-2"/>
                        <h1 className = "text-neutral-600">Getting deeper</h1>
                    </div>
                    <div className = "flex flex-row mb-6 gap-4">
                        <Shortcut />
                        <Template />
                    </div>
                    <div className = "flex flex-col">
                        <FriendPost />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;