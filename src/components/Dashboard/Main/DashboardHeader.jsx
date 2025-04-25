import React, { useState, useEffect } from 'react';
import Logo from "../../../assets/images/final_final.png";
import { FaRegUserCircle, FaSearch } from "react-icons/fa";
import DropDown from "./DropDown";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUserFriends } from "react-icons/fa";
import { MdOutlineSwitchAccessShortcutAdd } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import {API_URL} from "../../../config";
import { CiSettings } from "react-icons/ci";
import axios from 'axios';
import FetchData from "../../../reuse/FetchData";

const DashboardHeader = ({ profile, open, sideBar, sideCurrent, setOpen, colOpen }) => {
    const name = localStorage.getItem('name');
    const image = localStorage.getItem('image');
    const navigate = useNavigate();
    const location = useLocation();
    const [search, setSearch] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);

    const isDashboard = location.pathname === "/dashboard";
    const isCollection = location.pathname === "/collection";
    const isSettings = location.pathname.startsWith("/settings");
    const isPosts = location.pathname === "/Posts";
    const isMessages = location.pathname === '/Message';

    useEffect(() => {
        const delayDebounce = setTimeout(async () => {
            if (search.trim() !== '') {
                try {
                    const response = await FetchData(`${API_URL}/api/authenticated/search?query=${search}`);
                    setSuggestions(response.results);
                    setShowDropdown(true);
                    console.log(response.results)
                } catch (error) {
                    console.error("Search error:", error);
                    setSuggestions([]);
                    setShowDropdown(false);
                }
            } else {
                setSuggestions([]);
                setShowDropdown(false);
            }
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [search]);

    const navigateProfile = (name, id) => {
        navigate('/Profiles/' + name, {state: {id}});
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (Object.keys(suggestions).length > 0) {
                navigate('/search', {
                    state: {
                        query: search,
                        suggestions,
                        sections: Object.entries(suggestions)
                            .filter(([_, items]) => Array.isArray(items) && items.length > 0)
                            .map(([section]) => section)
                    }
                });
                setShowDropdown(false);
            }
        }
    };

    const performSearch = () => {
        if (Object.keys(suggestions).length > 0) {
            navigate('/search', {
                state: {
                    query: search,
                    suggestions,
                    sections: Object.entries(suggestions)
                        .filter(([_, items]) => Array.isArray(items) && items.length > 0)
                        .map(([section]) => section)
                }
            });
            setShowDropdown(false);
        }
    };

    return (
        <div className="flex flex-row w-full bg-black py-4 md:px-6 px-2 text-neutral-200 justify-between items-center">
            <div className={`flex flex-row items-center ${searchOpen ? 'hidden' : 'flex'}`}>
                <img src={Logo} onClick={() => navigate('/dashboard')} className="w-8 h-8 mr-4 cursor-pointer" />
                <h1 className="mr-14 text-2xl md:block hidden">{name}</h1>
            </div>
            <div className="relative flex justify-center items-center flex-grow">
                {/* Mobile Toggle */}
                <div
                    className={`w-8 h-8 rounded-lg ${searchOpen ? '' : 'border-[1px] border-neutral-700 mr-4'} absolute right-0 cursor-pointer md:hidden flex items-center justify-center`}
                    onClick={() => setSearchOpen(!searchOpen)}
                >
                    <FaSearch className="text-neutral-700" />
                </div>

                {/* Search Input */}
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => suggestions.length > 0 && setShowDropdown(true)}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                    onKeyDown={handleKeyDown}
                    placeholder="Search..."
                    className={`
                        bg-neutral-900 rounded-md px-4 py-1 text-sm text-neutral-200 focus:outline-none lg:w-1/2 w-full
                        ${searchOpen ? 'block' : 'hidden'} 
                        md:block
                    `}
                />

                {/* Suggestions Dropdown */}
                {showDropdown && (
                    <div className="absolute top-full left-1/2 transform -translate-x-1/2 lg:w-1/2 w-full bg-neutral-900 rounded-md mt-1 shadow-lg z-50 max-h-96 overflow-y-auto">
                        {Object.entries(suggestions).map(([category, items]) => (
                            items.length > 0 && (
                                <div key={category} className="border-b border-neutral-800 px-4 py-2">
                                    <h2 className="text-xs uppercase text-neutral-500 mb-1">
                                        {category.replace('_', ' ')}
                                    </h2>
                                    {items.map((item, index) => {
                                        switch (category) {
                                            case 'users':
                                                return (
                                                    <div
                                                        key={index}
                                                        className="flex items-center gap-2 py-1 hover:bg-neutral-800 cursor-pointer"
                                                        onClick={() => navigateProfile(item.name, item.id)}
                                                    >
                                                        {item.image ? (
                                                            <img
                                                                src={`${API_URL}/storage/${item.image}`}
                                                                className="w-6 h-6 rounded-full"
                                                                alt={item.name}
                                                            />
                                                        ) : (
                                                            <FaRegUserCircle className="w-6 h-6 text-neutral-600" />
                                                        )}
                                                        <span className="text-sm text-neutral-200">{item.name}</span>
                                                    </div>
                                                );
                                            case 'posts':
                                            case 'tagged_posts':
                                            case 'templates':
                                            case 'tagged_templates':
                                                return (
                                                    <div
                                                        key={index}
                                                        className="py-1 hover:bg-neutral-800 cursor-pointer"
                                                    >
                                                        <span className={`text-sm ${category.includes('template') ? 'text-purple-400' : 'text-neutral-200'}`}>
                                                            {item.title}
                                                        </span>
                                                    </div>
                                                );
                                            case 'tags':
                                                return (
                                                    <div
                                                        key={index}
                                                        className="py-1 hover:bg-neutral-800 cursor-pointer"
                                                    >
                                                        <span className="text-sm text-blue-400">#{item.name.en}</span>
                                                    </div>
                                                );
                                            default:
                                                return null;
                                        }
                                    })}
                                </div>
                            )
                        ))}
                    </div>
                )}
            </div>

            <div className={`flex flex-row items-center ${searchOpen ? 'hidden' : 'flex'} md:flex`}>
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
                {(isCollection || isPosts) && (
                    <div
                        className="w-8 h-8 rounded-lg border-[1px] mr-4 border-neutral-700 cursor-pointer lg:hidden flex items-center justify-center"
                        onClick={() => setOpen(!colOpen)}
                    >
                        <FaFilter className="text-neutral-700" />
                    </div>
                )}
                {isSettings && (
                    <div
                        className="w-8 h-8 rounded-lg border-[1px] mr-4 border-neutral-700 cursor-pointer lg:hidden flex items-center justify-center"
                        onClick={() => setOpen(!colOpen)}
                    >
                        <CiSettings className="text-neutral-700" />
                    </div>
                )}
                {isMessages && (
                    <div
                        className="w-8 h-8 rounded-lg border-[1px] mr-4 border-neutral-700 cursor-pointer md:hidden flex items-center justify-center"
                        onClick={() => setOpen(!colOpen)}
                    >
                        <FaUserFriends className="text-neutral-700" />
                    </div>
                )}
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
