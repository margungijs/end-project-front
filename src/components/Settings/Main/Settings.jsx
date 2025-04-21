import React, {useEffect, useState} from 'react';
import DashboardHeader from "../../Dashboard/Main/DashboardHeader";
import SettingsChoices from "./SettingsChoices";
import ShortcutMain from "../Shortcuts/ShortcutMain";
import GeneralMain from "../General/GeneralMain";
import FriendsMain from "../Friends/FriendsMain";
import { useLocation } from "react-router-dom";

const Settings = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialSelected = queryParams.get('section') || 'general';
    const [selected, setSelected] = useState(initialSelected);
    const [open, setOpen] = useState(false);
    const [show, setShow] = useState(false)

    const components = {
        shortcuts: <ShortcutMain />,
        friends: <FriendsMain />,
        general: <GeneralMain />,
    };

    return (
        <div className = "bg-neutral-950 h-screen w-screen flex flex-col overflow-x-hidden relative">
            <DashboardHeader profile={() => setOpen(!open)} open = {open} colOpen={show} setOpen={setShow}/>
            <div className = "flex flex-row p-2 md:gap-4 w-screen relative justify-end">
                <SettingsChoices selected = {selected} setSelected={setSelected} show = {show}/>
                {components[selected] || <GeneralMain />}
            </div>
        </div>
    );
};

export default Settings;