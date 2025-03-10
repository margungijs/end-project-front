import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";

const steps = [
    {
        title: "Step One",
        description: "Initialise card creation by selecting already existing card templates or make your very own card template",
        content: (
            <div className="bg-neutral-950 border-[1px] border-neutral-700 rounded-lg w-4/6 py-8 px-4 z-10 flex flex-col">
                <div className="pb-10 border-b-[1px] border-neutral-200 mb-6">
                    <div className="bg-blue-500 h-3 rounded-lg w-3/5"></div>
                </div>
                <div className="pb-10 border-b-[1px] border-neutral-200 mb-6">
                    <div className="bg-blue-500 h-3 rounded-lg"></div>
                </div>
                <div>
                    <div className="bg-blue-500 h-3 rounded-lg mb-2"></div>
                    <div className="bg-blue-500 h-3 rounded-lg w-2/5 mb-4"></div>
                </div>
            </div>
        ),
    },
    {
        title: "Step Two",
        description: "Fill out your card, answer the questions as you please. Don't be afraid to add your own spark to it",
        content: (
            <div className="bg-neutral-950 border-[1px] border-neutral-700 rounded-lg w-4/6 py-8 px-4 z-10 flex flex-col">
                <div className="pb-10 border-b-[1px] border-neutral-200 mb-6">
                    <div className="bg-blue-500 h-3 rounded-lg w-3/5 mb-4"></div>
                    <div className="bg-neutral-200 h-2 rounded-lg mb-2"></div>
                    <div className="bg-neutral-200 h-2 rounded-lg w-2/5"></div>
                </div>
                <div className="mb-4">
                    <div className="bg-blue-500 h-3 rounded-lg mb-4"></div>
                    <div className="bg-neutral-200 h-2 rounded-lg mb-2"></div>
                    <div className="bg-neutral-200 h-2 rounded-lg mb-2"></div>
                    <div className="bg-neutral-200 h-2 rounded-lg w-3/5"></div>
                </div>
            </div>
        ),
    },
    {
        title: "Step Three",
        description: "Save your card and publish it to be available to others. No rush, you can choose to keep it private if you want",
        content: (
            <div className="bg-neutral-950 border-[1px] border-neutral-700 rounded-lg w-4/6 py-12 px-4 z-10 flex flex-col items-center">
                <FaUserPlus className="text-blue-500 w-4/5 h-auto" />
            </div>
        ),
    },
];

export default function ClickableCard() {
    const [index, setIndex] = useState(0);

    const nextStep = () => {
        if (index < steps.length - 1) setIndex(index + 1);
    };

    const prevStep = () => {
        if (index > 0) setIndex(index - 1);
    };

    return (
        <div className="flex flex-col items-center w-full">
            <div className="relative group overflow-hidden bg-[#111111] border-[1px] border-neutral-700 rounded-lg py-10 px-6 flex flex-col items-center md:w-1/2 w-full">
                <div className="circle absolute bg-blue-900/60 rounded-full transition-all duration-700 z-0 blur-[150px]"></div>
                <div className="relative z-10 h-[300px] text-center">
                    <h1 className="text-blue-500 text-3xl mb-8">{steps[index].title}</h1>
                    <h1 className="text-neutral-500 text-2xl">{steps[index].description}</h1>
                </div>
                {steps[index].content}

                {/* Navigation Text */}
                <div className="flex justify-between w-full mt-6 text-white text-lg font-semibold">
          <span className={index === 0 ? "text-neutral-700 cursor-not-allowed" : "cursor-pointer"} onClick={prevStep}>
            Previous
          </span>
                    <span className={index === steps.length - 1 ? "text-neutral-700 cursor-not-allowed" : "cursor-pointer"} onClick={nextStep}>
            Next
          </span>
                </div>
            </div>
        </div>
    );
}
