import React from 'react';
import Header from "./Header";
import {useEffect} from "react";
import { CgShapeTriangle } from "react-icons/cg";
import {observer, observerBottom} from "../reuse/Observer";
import { FaUserPlus } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import SwipeableCard from "./Swipable";
import friends from "../assets/images/download.png";


const Landing = () => {
    useEffect(() => {
        const handleMouseMove = (e) => {
            const circle = e.currentTarget.querySelector('.circle');
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            circle.style.left = `${x - circle.offsetWidth / 2}px`;
            circle.style.top = `${y - circle.offsetHeight / 2}px`;
        };

        const handleMouseEnter = (e) => {
            const circle = e.currentTarget.querySelector('.circle');
        };

        const handleMouseLeave = (e) => {
            const circle = e.currentTarget.querySelector('.circle');
        };

        document.querySelectorAll('.group').forEach(item => {
            item.addEventListener('mousemove', handleMouseMove);
            item.addEventListener('mouseenter', handleMouseEnter);
            item.addEventListener('mouseleave', handleMouseLeave);
        });

        // Cleanup
        return () => {
            document.querySelectorAll('.group').forEach(item => {
                item.removeEventListener('mousemove', handleMouseMove);
                item.removeEventListener('mouseenter', handleMouseEnter);
                item.removeEventListener('mouseleave', handleMouseLeave);
            });
        };
    }, []);

    useEffect(() => {
        const hiddenElements = document.querySelectorAll('.hidden-animate');
        hiddenElements.forEach((el) => observer.observe(el));

        const hiddenElementsBot = document.querySelectorAll('.hidden-animate-bot');
        hiddenElementsBot.forEach((el) => observerBottom.observe(el));

        return () => {
            hiddenElements.forEach((el) => observer.unobserve(el));
            hiddenElementsBot.forEach((el) => observerBottom.observe(el));
        };
    }, [])

    return (
        <div className = "bg-neutral-950 w-full pb-10 h-fit flex flex-col relative justify-center items-center overflow-x-hidden">
            <Header />
            <div className = "flex flex-row mt-40 lg:pl-48 md:pl-24 pl-12 pr-12 w-full">
                <div className = "md:w-5/6 w-full">
                    <h1 className = "text-neutral-200 lg:text-8xl md:text-6xl text-5xl md:text-left text-center">Catch up with Yourself</h1>
                    <p className = "text-neutral-400 font-normal mt-6 md:text-2xl text-3xl mb-[450px] md:text-left text-center">Create customs cards and describe what you’ve been up to, and make friends while you’re at it</p>
                </div>
                {/*<div className = "flex flex-col items-center relative w-1/6">*/}
                {/*    <div className = "rounded-full w-3 h-3 mb-4 mt-10 border-2 border-blue-50"></div>*/}
                {/*    <div className = "line-animation h-[592px] w-1 bg-gradient-to-b from-blue-50 to-blue-500 rounded absolute top-[64px]"></div>*/}
                {/*</div>*/}
            </div>
            <div className = "flex flex-row lg:pl-48 md:pl-24 pl-12 pr-12 mb-8 w-full">
                <div className = "md:w-5/6 w-full">
                    <h1 className = "text-blue-500 lg:text-5xl md:text-4xl text-4xl mb-2 md:text-left text-center">
                        Your card, your imagination
                    </h1>
                    <p className = "text-neutral-200 lg:text-4xl md:text-2xl text-3xl mb-6 md:w-3/5 w-full md:text-left text-center">
                        Create fully custom cards, where you can let your imagination run wild
                    </p>
                </div>
                {/*<div className = "flex flex-col items-center justify-center relative w-1/6">*/}
                {/*    <div className = "w-3 h-3 mb-4 border-blue-500 border-2"></div>*/}
                {/*    <div className = "h-24 w-1 bg-gradient-to-b from-blue-500 to-neutral-950 rounded absolute top-[92px]"></div>*/}
                {/*</div>*/}
            </div>
            <div className = "lg:flex hidden flex-row mb-40 w-full px-20 justify-center">
                <div className = "grid grid-cols-3 gap-6 hidden-animate">
                    <div className = "relative group overflow-hidden bg-[#111111] border-[1px] border-neutral-700 rounded-lg py-10 px-6 flex flex-col items-center">
                        <div className = "circle absolute bg-blue-900/60 rounded-full transition-all duration-700 z-0 blur-[150px]"></div>
                        <div className = "relative z-10 h-[300px]">
                            <h1 className = "text-blue-500 text-4xl mb-8">Step One</h1>
                            <h1 className = "text-neutral-500 text-2xl">Initialise card creation by selecting already existing card templates or make <span className="text-neutral-200">your very own card template</span></h1>
                        </div>
                        <div className="bg-neutral-950 border-[1px] border-neutral-700 rounded-lg w-4/6 py-8 px-4 z-10 flex flex-col">
                            <div className = "pb-10 border-b-[1px] border-neutral-200 mb-6">
                                <div className = "bg-blue-500 h-3 rounded-lg w-3/5"></div>
                            </div>
                            <div className = "pb-10 border-b-[1px] border-neutral-200 mb-6">
                                <div className = "bg-blue-500 h-3 rounded-lg "></div>
                            </div>
                            <div className = "">
                                <div className = "bg-blue-500 h-3 rounded-lg mb-2"></div>
                                <div className = "bg-blue-500 h-3 rounded-lg w-2/5 mb-4"></div>
                            </div>
                        </div>
                    </div>
                    <div className = "relative group overflow-hidden bg-[#111111] border-[1px] border-neutral-700 rounded-lg py-10 px-6 flex flex-col items-center">
                        <div className = "circle absolute bg-blue-900/60 rounded-full transition-all duration-700 z-0 blur-[150px]"></div>
                        <div className = "relative z-10 h-[300px]">
                            <h1 className = "text-blue-500 text-4xl mb-8">Step Two</h1>
                            <h1 className = "text-neutral-500 text-2xl">Fill out your card, answer the questions as you please. Don't be afraid to add  <span className = "text-neutral-200">your own spark</span> to it</h1>
                        </div>
                        <div className="bg-neutral-950 border-[1px] border-neutral-700 rounded-lg w-4/6 py-8 px-4 z-10 flex flex-col">
                            <div className = "pb-10 border-b-[1px] border-neutral-200 mb-6">
                                <div className = "bg-blue-500 h-3 rounded-lg w-3/5 mb-4"></div>
                                <div className = "bg-neutral-200 h-2 rounded-lg mb-2"></div>
                                <div className = "bg-neutral-200 h-2 rounded-lg w-2/5"></div>
                            </div>
                            <div className = "mb-4">
                                <div className = "bg-blue-500 h-3 rounded-lg mb-4"></div>
                                <div className = "bg-neutral-200 h-2 rounded-lg mb-2"></div>
                                <div className = "bg-neutral-200 h-2 rounded-lg mb-2"></div>
                                <div className = "bg-neutral-200 h-2 rounded-lg w-3/5"></div>
                            </div>
                        </div>
                    </div>
                    <div className = "relative group overflow-hidden bg-[#111111] border-[1px] border-neutral-700 rounded-lg py-10 px-6 flex flex-col items-center">
                        <div className = "circle absolute bg-blue-900/60 rounded-full transition-all duration-700 z-0 blur-[150px]"></div>
                        <div className = "relative z-10 h-[300px]">
                            <h1 className = "text-blue-500 text-4xl mb-8">Step Three</h1>
                            <h1 className = "text-neutral-500 text-2xl">Save your card and publish it to be available to others. No rush, you can <span className = "text-neutral-200">choose to keep it private</span>  if you want</h1>
                        </div>
                        <div className="bg-neutral-950 border-[1px] border-neutral-700 rounded-lg w-4/6 py-12 px-4 z-10 flex flex-col items-center">
                            <FaUserPlus className = "text-blue-500 w-4/5 h-40"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className = "lg:hidden flex mb-40 w-full md:px-20 px-4 justify-center hidden-animate">
                <SwipeableCard />
            </div>
            <div className = "flex flex-row lg:pl-48 md:pl-24 pl-12 pr-12 mb-8 w-full">
                <div className = "md:w-5/6 w-full">
                    <h1 className = "text-green-500 lg:text-5xl md:text-4xl text-4xl mb-2 md:text-left text-center">
                        Grow with us
                    </h1>
                    <p className = "text-neutral-200 lg:text-4xl md:text-2xl text-3xl md:w-3/5 w-full mb-6 md:text-left text-center">
                        Get a chance to learn and grow by taking a look at your life in the past
                    </p>
                </div>
                {/*<div className = "flex flex-col items-center justify-center relative w-1/6">*/}
                {/*    <div className = "h-[225px] w-1 bg-gradient-to-b from-neutral-950 to-green-500 rounded absolute top-[-160px]"></div>*/}
                {/*    <CgShapeTriangle className = "text-green-500 text-xl "/>*/}
                {/*    <div className = "h-24 absolute w-1 bg-gradient-to-b from-green-500 to neutral-950 rounded top-[100px]"></div>*/}
                {/*</div>*/}
            </div>
            <div className = "flex md:flex-row flex-col mb-40 w-full md:px-20 px-4 justify-center gap-6 hidden-animate">
                <div className = "relative group overflow-hidden bg-[#111111] border-[1px] md:w-1/2 w-full border-neutral-700 rounded-lg py-10 px-6 flex flex-col">
                    <div className = "circle absolute bg-green-900/80 rounded-full transition-all duration-700 z-0 blur-[150px]"></div>
                    <div className = "relative z-10">
                        <h1 className = "text-green-500 md:text-4xl text-3xl mb-8">Comfort</h1>
                        <h1 className = "text-neutral-500 md:text-3xl text-2xl">Comfort is a feeling everyone is familiar with but our goal <span className = "text-neutral-200">is not to provide a comfort zone</span>. Although comfort is a feeling everyone should experience but things like comfort zones have the power to <span className = "text-neutral-200">negatively alter the natural flow of life</span>  and <span className = "text-neutral-200">the growth within it</span>. Which is why we want to give users access to a <span className = "text-neutral-200">temporary beacon of comfort</span>, without the <span className = "text-neutral-200">creation of a comfort zone</span>.</h1>
                    </div>
                </div>
                <div className = "relative group overflow-hidden bg-[#111111] border-[1px] md:w-1/2 w-full border-neutral-700 rounded-lg py-10 px-6 flex flex-col">
                    <div className = "circle absolute bg-green-900/80 rounded-full transition-all duration-700 z-0 blur-[150px]"></div>
                    <div className = "relative z-10">
                        <h1 className = "text-green-500 md:text-4xl text-3xl mb-8">Growth</h1>
                        <h1 className = "text-neutral-500 md:text-3xl text-2xl">With comfort zones comes little growth. If you're stuck in a comfort zone, <span className = "text-neutral-200">you wont want to come out of it</span> - limiting growth. So we want to offer users the chance to <span className = "text-neutral-200">grow from their past experiences</span>. The past isn't something anyone <span className = "text-neutral-200">should get caught up in</span>, but our pasts give us all a <span className = "text-neutral-200">unique material which we can learn and grow from</span>.</h1>
                    </div>
                </div>
            </div>
            <div className = "flex flex-row lg:pl-48 md:pl-24 pl-12 pr-12 mb-8 w-full">
                <div className = "md:w-5/6 w-full">
                    <h1 className = "text-purple-500 lg:text-5xl md:text-4xl text-4xl mb-2 md:text-left text-center">
                        Make new friends
                    </h1>
                    <p className = "text-neutral-200 lg:text-4xl md:text-2xl text-3xl md:w-3/5 w-full mb-6 md:text-left text-center">
                        Get a chance to connect with people you share similar experiences with or that have fascinating things to share
                    </p>
                </div>
                {/*<div className = "flex flex-col items-center justify-center relative w-1/6">*/}
                {/*    <div className = "h-[236px] w-1 bg-gradient-to-b from-neutral-950 to-purple-500 rounded absolute top-[-160px]"></div>*/}
                {/*    <BsStars className = "text-purple-500 text-3xl"/>*/}
                {/*    <div className = "h-24 absolute w-1 bg-gradient-to-b from-purple-500 to neutral-950 rounded top-[126px]"></div>*/}
                {/*</div>*/}
            </div>
            <div className = "flex flex-row mb-40 w-full md:px-20 px-4 justify-center gap-6 hidden-animate">
                <div className = "flex flex-row bg-[#111111] w-full border-[1px] border-neutral-700 rounded-lg py-10 px-6">
                    <div className = "lg:w-1/2 w-full">
                        <h1 className = "text-purple-500 text-4xl mb-8">Friends</h1>
                        <h1 className = "text-neutral-500 md:text-3xl text-2xl">Friends are an important part of everyones life. Since the information you might want to share on Chronicle <span className = "text-neutral-200">might be sensitive</span>, your friends on Chronicle will show up anonymous, but if you feel a <span className = "text-neutral-200">real connection</span>, you'll have the chance to <span className = "text-neutral-200">find out each others identity</span> on our site.</h1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;