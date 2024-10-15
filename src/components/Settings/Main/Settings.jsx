import React from 'react';
import DashboardHeader from "../../Dashboard/Main/DashboardHeader";
import SettingsChoices from "./SettingsChoices";

const Settings = () => {
    return (
        <div className = "bg-neutral-950 h-screen w-screen flex flex-col overflow-x-hidden relative">
            <DashboardHeader />
            <div className = "flex flex-row p-2">
                <SettingsChoices />
            </div>
        </div>
    );
};

export default Settings;