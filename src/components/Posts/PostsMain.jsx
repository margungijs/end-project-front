import React, {useEffect, useState} from 'react';
import DashboardHeader from "../Dashboard/Main/DashboardHeader";
import PostsFilter from "./PostsFilter";
import FetchData from "../../reuse/FetchData";
import PostOutput from "./PostOutput";

const PostsMain = () => {
    const [limits, setLimits] = useState([]);
    const [chosenLimit, setChosenLimit] = useState(13);
    const [posts, setPosts] = useState([]);

    const fetch = async () => {
        try{
            const response = await FetchData('http://localhost/api/authenticated/fetchPosts');
            console.log(response)
            setLimits(response.limits)
            setPosts(response.posts)
        }catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        fetch();
    }, []);

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

    return (
        <div className="bg-neutral-950 h-screen w-screen relative overflow-x-hidden">
            <DashboardHeader />
            <div className = "flex flex-row p-2 h-full w-full gap-2">
                <PostsFilter limits = {limits} marks = {marks} setLimit = {setChosenLimit}/>
                <PostOutput posts = {posts} limits={limits} marks={marks} chosenLimit = {chosenLimit}/>
            </div>
        </div>
    );
};

export default PostsMain;