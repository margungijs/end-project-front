import React from 'react';
import Logo from "../../../assets/images/final_final.png";
import { FaRegUserCircle, FaPlus } from "react-icons/fa";
import DropDown from "./DropDown";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUserFriends } from "react-icons/fa";
import { MdOutlineSwitchAccessShortcutAdd } from "react-icons/md";
import {API_URL} from "../../../config";

const DashboardHeader = ({ profile, open, sideBar, sideCurrent }) => {
    const name = localStorage.getItem('name');
    const image = localStorage.getItem('image');
    const navigate = useNavigate();
    const location = useLocation();

    const isDashboard = location.pathname === "/dashboard";

    return (
        <div className="flex flex-row w-full bg-black py-4 px-6 text-neutral-200 justify-between items-center">
            <div className="flex flex-row items-center">
                <img src={Logo} onClick={() => navigate('/dashboard')} className="w-8 h-8 mr-4 cursor-pointer" />
                <h1 className="mr-20 text-2xl md:block hidden">{name}</h1>
            </div>
            <div className="flex flex-row items-center">
                {isDashboard && (
                    <>
                        <div
                            className="w-8 h-8 rounded-lg border-[1px] mr-4 border-neutral-700 cursor-pointer lg:hidden flex items-center justify-center"
                            onClick={() => sideBar(sideCurrent === "shortcuts" ? "" : "shortcuts")}
                        >
                            <MdOutlineSwitchAccessShortcutAdd className="text-neutral-700" />
                        </div>
                        <div
                            className="w-8 h-8 rounded-lg border-[1px] mr-4 border-neutral-700 cursor-pointer lg:hidden flex items-center justify-center"
                            onClick={() => sideBar(sideCurrent === "friends" ? "" : "friends")}
                        >
                            <FaUserFriends className="text-neutral-700" />
                        </div>
                    </>
                )}
                <div className="w-8 h-8 rounded-lg border-[1px] mr-4 cursor-pointer border-neutral-700 flex items-center justify-center">
                    <FaPlus className="text-neutral-700" />
                </div>
                {image && image !== "null" && image !== "" ? (
                    <img src={`${API_URL}/storage/` + image} onClick={profile} className="rounded-full w-8 h-8 cursor-pointer" />
                ) : (
                    <FaRegUserCircle onClick={profile} className="w-8 h-8 text-neutral-700 cursor-pointer" />
                )}
            </div>
            <DropDown name={name} image={image} open={profile} status={open} />
        </div>
    );
};

export default DashboardHeader;
