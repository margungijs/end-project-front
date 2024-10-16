import React from 'react';
import DashboardHeader from "../../Dashboard/Main/DashboardHeader";
import SettingsChoices from "./SettingsChoices";
import ShortcutMain from "../Shortcuts/ShortcutMain";

const Settings = () => {
    return (
        <div className = "bg-neutral-950 h-screen w-screen flex flex-col overflow-x-hidden relative">
            <DashboardHeader />
            <div className = "flex flex-row p-2 gap-4 w-screen justify-between">
                <SettingsChoices />
                <ShortcutMain />
            </div>
        </div>
    );
};

export default Settings;