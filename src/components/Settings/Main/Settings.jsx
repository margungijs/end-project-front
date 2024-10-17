import React, {useState} from 'react';
import DashboardHeader from "../../Dashboard/Main/DashboardHeader";
import SettingsChoices from "./SettingsChoices";
import ShortcutMain from "../Shortcuts/ShortcutMain";
import GeneralMain from "../General/GeneralMain";

const Settings = () => {
    const [selected, setSelected] = useState("shortcuts")

    return (
        <div className = "bg-neutral-950 h-screen w-screen flex flex-col overflow-x-hidden relative">
            <DashboardHeader />
            <div className = "flex flex-row p-2 gap-4 w-screen">
                <SettingsChoices selected = {selected} setSelected={setSelected}/>
                {/*<ShortcutMain />*/}
                <GeneralMain />
            </div>
        </div>
    );
};

export default Settings;