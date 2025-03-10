import React, { useState, useEffect } from 'react';
import DashboardHeader from "../Dashboard/Main/DashboardHeader";
import CollectionFilter from "./CollectionFilter";
import FetchData from "../../reuse/FetchData";
import CollectionOutput from "./CollectionOutput";

const CollectionMain = () => {
    const [selected, setSelected] = useState(0);
    const [collection, setCollection] = useState([]);

    const fetch = async () => {
        try{
            const response = await FetchData('http://localhost/api/authenticated/collection');
            setCollection(response.items)
            console.log(response.items)
        }catch (error){
            console.log(error)
        }
    }

    useEffect(() => {
        fetch();
    }, []);

    return (
        <div className = "bg-neutral-950 flex flex-col w-screen h-screen relative overflow-x-hidden">
            <DashboardHeader />
            <div className = "flex flex-row p-2 h-full w-full gap-2">
                <CollectionFilter selected = {selected} setSelected = {setSelected}/>
                <CollectionOutput selected = {selected} collection = {collection}/>
            </div>
        </div>
    );
};

export default CollectionMain;