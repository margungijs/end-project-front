import React, { useState, useEffect} from 'react';
import FetchData from "../../../reuse/FetchData";
import FriendPost from "../Posts/FriendPost";
import FriendTemplate from "../Posts/FriendTemplate";
import SendDataGeneral from "../../../reuse/SendDataGeneral";
import {API_URL} from "../../../config";

const Explore = () => {
    const [explore, setExplore] = useState([]);

    const fetch = async () => {
        try{
            const response = await FetchData(`${API_URL}/api/authenticated/explore`);
            setExplore(response.items)
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
            const response = await SendDataGeneral({id: id}, `${API_URL}/api/authenticated/postLike`);
            console.log(response)
        }catch(error){
            console.log(error)
        }
    }

    const likeTemplate = async (id) => {
        try{
            const response = await SendDataGeneral({id: id}, `${API_URL}/api/authenticated/templateLike`);
            console.log(response)
        }catch(error){
            console.log(error)
        }
    }

    return (
        <div className = "flex flex-col gap-6">
            {explore.length > 0 && explore.map((item, index) => (
                item.template ? (
                    <FriendPost
                        name = {item.user.name}
                        image = {item.user.image}
                        title = {item.title}
                        date = {new Date(item.created_at).toLocaleDateString()}
                        user_id={item.user.id}
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

export default Explore;