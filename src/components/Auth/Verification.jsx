import React from 'react';
import Logo from "../../assets/images/final_final.png"

const Verification = () => {
    return (
        <div className = "bg-neutral-950 h-screen w-full flex flex-col justify-center items-center">
            <div className = "bg-[#111111] w-2/5 rounded-lg border-[1px] border-neutral-700 py-6 px-4">
                <div className = "flex flex-col items-center mb-6">
                    <img src={Logo} className = "w-14 h-14 mb-4"/>
                    <h1 className = "text-4xl text-neutral-200 text-center">Sign up for Chronicle was successful!</h1>
                </div>
                <h1 className = "text-2xl text-center text-neutral-500 mb-2">A verification email has been sent to your address. You'll be automatically redirect back to Chronicle</h1>
            </div>
        </div>
    );
};

export default Verification;