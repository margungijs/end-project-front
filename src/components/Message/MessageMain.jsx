import React, { useState, useEffect } from 'react';
import DashboardHeader from "../Dashboard/Main/DashboardHeader";
import MessageFriends from "./MessageFriends";
import UserMessage from "./UserMessage";
import { TbSquareArrowUpFilled } from "react-icons/tb";
import FriendMessage from "./FriendMessage";
import Pusher from 'pusher-js';
import FetchData from "../../reuse/FetchData";
import SendDataGeneral from "../../reuse/SendDataGeneral";
import friend from "./Friend";
import {useLocation} from "react-router-dom";
import MessageStatic from "./MessageStatic";
import {FaRegUserCircle} from "react-icons/fa";

const MessageMain = () => {
    const location = useLocation();
    const { id } = location.state || {};
    const [conversationHistory, setConversationHistory] = React.useState([]);
    const [message, setMessage] = useState('');
    const [friendID, setFriendID] = useState(id ? id : null);
    const [friends, setFriends] = useState([]);
    const [friendsDistinct, setFriendsDistinct] = useState([]);
    const key = friendsDistinct.findIndex(group =>
        (group.friends && group.friends.some(friend => friend.id === friendID)) ||
        (group.users && group.users.some(user => user.id === friendID))
    );
    const [sendFriendID, setSendFriendID] = useState(-1);
    const [sendUserID, setSendUserID] = useState(-1);
    const [currentFriend, setCurrentFriend] = useState(null);

    useEffect(() => {
        setSendUserID(key === 1 ? -1 : friendID);
        setSendFriendID(key === 0 ? -1 : friendID);
        setCurrentFriend(friends.find(friend => friend.id == friendID));
    }, [friendID])

    const fetchConversationHistory = async () => {
        try{
            const response = await FetchData(`http://localhost/api/authenticated/messages/${friendID}`)
            setConversationHistory(response);
        }catch (error){
            console.log(error)
        }
    };

    useEffect(() => {
        fetchConversationHistory();
    }, [sendFriendID]);

    useEffect(() => {
        const pusher = new Pusher('147ee83c6689abf60861', {
            cluster: 'eu'
        });

        const chat = sendFriendID === -1 ? `chat.${friendID}.${localStorage.getItem('id')}` : `chat.${localStorage.getItem('id')}.${friendID}`;

        const channel = pusher.subscribe(chat);
        channel.bind('message.sent', function(data) {
            setConversationHistory(prev => {
                const newConversationId = prev.length > 0 ? prev[0].conversation_id + 1 : 1;
                return [...prev, { id: newConversationId, user_id: data.user, friend_id: data.friend, message: data.message, sender: data.sender, conversation_id: newConversationId }];
            });
        });


        return () => {
            channel.unbind_all();
            channel.unsubscribe();
        };
    }, [sendFriendID])


    const sendMessage = async () => {
        try {
            const payload = {
                message: message,
                [sendFriendID === -1 ? 'user_id' : 'friend_id']: friendID
            };
            const response = await SendDataGeneral(payload,'http://localhost/api/authenticated/sendMessage');
            setMessage('');
        }catch (error){
            console.log(error)
        }
    }

    return (
        <div className = "flex flex-col bg-[#111111] h-screen w-screen relative overflow-x-hidden">
            <DashboardHeader />
            <div className = "flex flex-row p-4 h-full gap-2">
                <MessageFriends setFriendID={setFriendID} setFriends={setFriends} friends = {friends} setFriendsDistinct={setFriendsDistinct}/>
                {friendID ? (
                    <div className="flex flex-col w-1/2 h-full gap-2 relative">
                        {currentFriend && (
                            <div className = "z-10 bg-[#111111] items-center p-2 flex flex-row w-full border-[1px] border-neutral-700 rounded-md">
                                {currentFriend.image !== null ? (
                                    <img src={'http://localhost/storage/' + currentFriend.image} className = "w-10 h-10 rounded-full mr-2"/>
                                ) : (
                                    <FaRegUserCircle className = "w-10 h-10 text-neutral-700 mr-2"/>
                                )}
                                <h1 className = "text-2xl text-neutral-200">{currentFriend.name}</h1>
                            </div>
                        )}
                        <div className="flex flex-col-reverse overflow-y-auto h-[700px]">
                            {conversationHistory && conversationHistory
                                .sort((a, b) => b.conversation_id - a.conversation_id)
                                .map((convo, index) => (
                                    convo.sender == localStorage.getItem('id') ? (
                                        <UserMessage key={index} message={convo.message}/>
                                    ) : (
                                        <FriendMessage key={index} message={convo.message}/>
                                    )
                                ))
                            }
                        </div>
                        <div className="flex flex-row gap-2 w-full">
                            <input
                                type="text"
                                className="bg-[#111111] border-[1px] w-full indent-2 placeholder-neutral-600 border-neutral-700 rounded-md p-2 text-neutral-200 flex-grow"
                                placeholder="send a message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                            <TbSquareArrowUpFilled
                                onClick={sendMessage}
                                className="text-green-500 hover:text-green-600 transition duration-200 w-12 h-12 cursor-pointer flex-shrink-0"
                            />
                        </div>
                    </div>
                ) : (
                    <MessageStatic />
                )}
            </div>
        </div>
    );
};

export default MessageMain;