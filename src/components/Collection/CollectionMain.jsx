import React, { useState, useEffect } from 'react';
import DashboardHeader from "../Dashboard/Main/DashboardHeader";
import CollectionFilter from "./CollectionFilter";
import FetchData from "../../reuse/FetchData";
import CollectionOutput from "./CollectionOutput";
import { API_URL } from "../../config";
import PreviewMain from "../Preview/PreviewMain";
import PreviewTemplate from "../Preview/PreviewTemplate";
import {useLocation} from "react-router-dom";

const CollectionMain = () => {
    const [selected, setSelected] = useState(0);
    const [collection, setCollection] = useState([]);
    const [userSelectedPost, setUserSelectedPost] = useState({});
    const [userSelectedTemp, setUserSelectedTemp] = useState({});
    const [open, setOpen] = useState(false);
    const [opens, setOpens] = useState(false);
    const location = useLocation();

    const fetch = async () => {
        try {
            const response = await FetchData(`${API_URL}/api/authenticated/collection`);
            setCollection(response.items);
            console.log(response.items);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetch();
    }, []);

    useEffect(() => {
        setSelected(prev => (location.state === 'templates' ? 2 : prev));
    }, [location.state]);

    return (
        <div className="bg-neutral-950 flex flex-col w-screen h-screen relative overflow-x-hidden">
            <DashboardHeader setOpen = {setOpen} colOpen={open} profile={() => setOpens(!opens)} open = {opens}/>
            <div className="flex flex-row p-2 h-full w-full gap-2 relative justify-between">
                <CollectionFilter selected={selected} setSelected={setSelected} open = {open} setOpen = {setOpen}/>
                <CollectionOutput selected={selected} collection={collection} setUserSelected={setUserSelectedPost} setUserSelectedTemp = {setUserSelectedTemp}/>
            </div>

            {Object.keys(userSelectedPost).length > 0 && (
                <PreviewMain post = {userSelectedPost} setUserSelected = {setUserSelectedPost}/>
            )}

            {Object.keys(userSelectedTemp).length > 0 && (
                <PreviewTemplate template={userSelectedTemp} setUserSelected={setUserSelectedTemp}/>
            )}
        </div>
    );
};

export default CollectionMain;
