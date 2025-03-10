import React, { useState, useEffect } from 'react';
import FetchData from "../../../reuse/FetchData";
import FriendPost from "../Posts/FriendPost";
import FriendTemplate from "../Posts/FriendTemplate";
import SendDataGeneral from "../../../reuse/SendDataGeneral";
import SendData from "../../../reuse/SendData";

const YourFeed = () => {
    const [feed, setFeed] = useState([])

    const fetch = async () => {
        try{
            const response = await FetchData('http://localhost/api/authenticated/feed');
            setFeed(response.items)
            console.log(response.items)
        }catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        fetch();
    }, [])

    const likePost = async (id) => {
        try{
            const response = await SendDataGeneral({id: id}, 'http://localhost/api/authenticated/postLike');
            console.log(response)
        }catch(error){
            console.log(error)
        }
    }

    const likeTemplate = async (id) => {
        try{
            const response = await SendDataGeneral({id: id}, 'http://localhost/api/authenticated/templateLike');
            console.log(response)
        }catch(error){
            console.log(error)
        }
    }

    return (
        <div className = "flex flex-col gap-6">
            {feed.length > 0 && feed.map((item, index) => (
                item.template ? (
                    <FriendPost
                        name = {item.user.name}
                        image = {item.user.image}
                        title = {item.title}
                        date = {new Date(item.created_at).toLocaleDateString()}
                        user_id={item.user.id}
                        post_id={item.id}
                        template = {item.template_used}
                        answers = {item.answers}
                        post_image = {item.image}
                        like = {() => likePost(item.id)}
                        liked = {item.liked}
                    />
                ) : (
                    <FriendTemplate
                        name = {item.user.name}
                        image = {item.user.image}
                        title = {item.title}
                        date = {new Date(item.created_at).toLocaleDateString()}
                        user_id={item.user.id}
                        template_id={item.id}
                        questions = {item.questions}
                        description={item.description}
                        like = {() => likeTemplate(item.id)}
                        liked = {item.liked}
                    />
                )
            ))}
        </div>
    );
};

export default YourFeed;