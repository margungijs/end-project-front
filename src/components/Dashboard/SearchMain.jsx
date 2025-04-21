import React, {useState, useEffect } from 'react';
import DashboardHeader from "./Main/DashboardHeader";
import {useLocation} from "react-router-dom";
import {API_URL} from "../../config";
import axios from "axios";
import FriendPost from "./Posts/FriendPost";
import FriendTemplate from "./Posts/FriendTemplate";
import SendDataGeneral from "../../reuse/SendDataGeneral";
import SearchFriend from "./Posts/SearchFriend";

const SearchMain = () => {
    const location = useLocation();
    const { query = '', sections = [] } = location.state || {};

    const [profile, setProfile] = useState(false);
    const [suggestions, setSuggestions] = useState({});

    useEffect(() => {
        const fetchSuggestions = async () => {
            try {
                if (query && sections.length > 0) {
                    const response = await axios.get(`${API_URL}/api/authenticated/searchSpecific`, {
                        params: { query, sections },
                    });
                    setSuggestions(response.data.results || {});
                    console.log("Fetched search results:", response.data.results);
                }
            } catch (err) {
                console.error("Error fetching search results:", err);
            }
        };

        fetchSuggestions();
    }, [query, sections]);

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

    const renderPosts = (posts) => {
        return posts.map((post, index) => (
            <FriendPost
                name = {post.user.name}
                image = {post.user.image}
                title = {post.title}
                date = {new Date(post.created_at).toLocaleDateString()}
                user_id={post.user.id}
                template = {post.template_used}
                answers = {post.answers}
                post_image = {post.image}
                like = {() => likePost(post.id)}
                liked = {post.liked}
                post_id = {post.id}
                tags = {post.tags}
                key = {index}
            />
        ));
    };

    const renderTemplates = (templates) => {
        return templates.map((template, index) => (
            <FriendTemplate
                name = {template.user.name}
                image = {template.user.image}
                title = {template.title}
                date = {new Date(template.created_at).toLocaleDateString()}
                user_id={template.user.id}
                questions = {template.questions}
                description={template.description}
                like = {() => likeTemplate(template.id)}
                liked = {template.liked}
                template_id={template.id}
                key = {index}
            />
        ));
    };

    const renderProfiles = (profiles) => {
        return profiles.map((profile, index) => (
            <SearchFriend
                image = {profile.image}
                name = {profile.name}
                user_id = {profile.id}
                key = {index}
                friendship={profile.friendship_status}
            />
        ))
    }

    return (
        <div className = "bg-neutral-950 h-screen w-screen flex flex-col overflow-x-hidden relative items-center">
            <DashboardHeader profile={() => setProfile(!profile)} open = {profile}/>
            <div className="flex flex-col items-center justify-center relative w-full gap-4 lg:w-1/2 md:w-2/3 p-4">
                {suggestions.users && suggestions.users.length > 0 && (
                    <div className="w-full mt-4">
                        <h2 className="text-2xl text-neutral-200">Users</h2>
                        <div className="mt-2 space-y-4">
                            {renderProfiles(suggestions.users)}
                        </div>
                    </div>
                )}

                {suggestions.posts && suggestions.posts.length > 0 && (
                    <div className="w-full mt-4">
                        <h2 className="text-2xl text-neutral-200">Posts</h2>
                        <div className="mt-2 space-y-4">
                            {renderPosts(suggestions.posts)}
                        </div>
                    </div>
                )}

                {suggestions.templates && suggestions.templates.length > 0 && (
                    <div className="w-full mt-4">
                        <h2 className="text-2xl text-neutral-200">Templates</h2>
                        <div className="mt-2 space-y-4">
                            {renderTemplates(suggestions.templates)}
                        </div>
                    </div>
                )}

                {suggestions.tagged_posts && suggestions.tagged_posts.length > 0 && (
                    <div className="w-full mt-4">
                        <h2 className="text-2xl text-neutral-200">Tagged Posts</h2>
                        <div className="mt-2 space-y-4">
                            {renderPosts(suggestions.tagged_posts)}
                        </div>
                    </div>
                )}

                {suggestions.tagged_templates && suggestions.tagged_templates.length > 0 && (
                    <div className="w-full mt-4">
                        <h2 className="text-2xl text-neutral-200">Tagged Templates</h2>
                        <div className="mt-2 space-y-4">
                            {renderTemplates(suggestions.tagged_templates)}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchMain;