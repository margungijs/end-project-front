import React, {useState} from 'react';
import DashboardHeader from "../../Dashboard/Main/DashboardHeader";
import SettingsChoices from "./SettingsChoices";
import ShortcutMain from "../Shortcuts/ShortcutMain";
import GeneralMain from "../General/GeneralMain";
import { useLocation } from "react-router-dom";

const Settings = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const initialSelected = queryParams.get('section') || 'general';
    const [selected, setSelected] = useState(initialSelected);

    return (
        <div className = "bg-neutral-950 h-screen w-screen flex flex-col overflow-x-hidden relative">
            <DashboardHeader />
            <div className = "flex flex-row p-2 gap-4 w-screen">
                <SettingsChoices selected = {selected} setSelected={setSelected}/>
                {selected === "shortcuts" ? <ShortcutMain /> : <GeneralMain />}w
            </div>
        </div>
    );
};

export default Settings;