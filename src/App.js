import './App.css';
import Logo from "../src/assets/images/final_final.png";
import Header from "./components/Header";
import {useEffect} from "react";
import { CgShapeTriangle } from "react-icons/cg";
import {observer, observerBottom} from "./reuse/Observer";
import { FaUserPlus } from "react-icons/fa";
import { BsStars } from "react-icons/bs";


function App() {
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
            <div className = "flex flex-row mt-40 pl-48 pr-12 w-full">
                <div className = "w-5/6">
                    <h1 className = "text-neutral-200 text-8xl">Catch up with Yourself</h1>
                    <p className = "text-neutral-400 font-normal mt-6 text-2xl mb-[450px]">Create customs cards and describe what you’ve been up to, and make friends while you’re at it</p>
                </div>
                <div className = "flex flex-col items-center relative w-1/6">
                    <div className = "rounded-full w-3 h-3 mb-4 mt-10 border-2 border-blue-50"></div>
                    <div className = "line-animation h-[592px] w-1 bg-gradient-to-b from-blue-50 to-blue-500 rounded absolute top-[64px]"></div>
                </div>
            </div>
            <div className = "flex flex-row pl-48 pr-12 mb-8 w-full">
                <div className = "w-5/6">
                    <h1 className = "text-blue-500 text-5xl mb-2 ">
                        Your card, your imagination
                    </h1>
                    <p className = "text-neutral-200 text-4xl mb-6 w-3/5">
                        Create fully custom cards, where you can let your imagination run wild
                    </p>
                </div>
                <div className = "flex flex-col items-center justify-center relative w-1/6">
                    <div className = "w-3 h-3 mb-4 border-blue-500 border-2"></div>
                    <div className = "h-24 w-1 bg-gradient-to-b from-blue-500 to-neutral-950 rounded absolute top-[92px]"></div>
                </div>
            </div>
            <div className = "flex flex-row mb-40 w-full px-20 justify-center">
                <div className = "grid grid-cols-3 gap-6 hidden-animate">
                    <div className = "relative group overflow-hidden bg-[#111111] border-[1px] border-neutral-700 rounded-lg py-10 px-6 flex flex-col items-center">
                        <div className = "circle absolute bg-blue-900/60 rounded-full transition-all duration-700 z-0 blur-[150px]"></div>
                        <div className = "relative z-10 h-[300px]">
                            <h1 className = "text-blue-500 text-4xl mb-8">Step One</h1>
                            <h1 className = "text-neutral-500 text-3xl">Initialise card creation by selecting already existing card templates or make <span className="text-neutral-200">your very own card template</span></h1>
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
                            <h1 className = "text-neutral-500 text-3xl">Fill out your card, answer the questions as you please. Don't be afraid to add  <span className = "text-neutral-200">your own spark</span> to it</h1>
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
                            <h1 className = "text-neutral-500 text-3xl">Save your card and publish it to be available to others. No rush, you can <span className = "text-neutral-200">choose to keep it private</span>  if you want</h1>
                        </div>
                        <div className="bg-neutral-950 border-[1px] border-neutral-700 rounded-lg w-4/6 py-12 px-4 z-10 flex flex-col items-center justify-">
                            <FaUserPlus className = "text-blue-500 w-4/5 h-auto"/>
                        </div>
                    </div>
                </div>
            </div>
            <div className = "flex flex-row pl-48 pr-12 mb-8 w-full">
                <div className = "w-5/6">
                    <h1 className = "text-green-500 text-5xl mb-2">
                        Grow with us
                    </h1>
                    <p className = "text-neutral-200 text-4xl w-3/5 mb-6">
                        Get a chance to learn and grow by taking a look at your life in the past
                    </p>
                </div>
                <div className = "flex flex-col items-center justify-center relative w-1/6">
                    <div className = "h-[225px] w-1 bg-gradient-to-b from-neutral-950 to-green-500 rounded absolute top-[-160px]"></div>
                    <CgShapeTriangle className = "text-green-500 text-xl "/>
                    <div className = "h-24 absolute w-1 bg-gradient-to-b from-green-500 to neutral-950 rounded top-[100px]"></div>
                </div>
            </div>
            <div className = "flex flex-row mb-40 w-full px-20 justify-center gap-6 hidden-animate">
                <div className = "bg-[#111111] border-[1px] w-1/2 border-neutral-700 rounded-lg py-10 px-6 flex flex-col">
                    <h1 className = "text-green-500 text-4xl mb-8">Comfort</h1>
                    <h1 className = "text-neutral-500 text-3xl">Comfort is a feeling everyone is familiar with but our goal <span className = "text-neutral-200">is not to provide a comfort zone</span>. Although comfort is a feeling everyone should experience but things like comfort zones have the power to <span className = "text-neutral-200">negatively alter the natural flow of life</span>  and <span className = "text-neutral-200">the growth within it</span>. Which is why we want to give users access to a <span className = "text-neutral-200">temporary beacon of comfort</span>, without the <span className = "text-neutral-200">creation of a comfort zone</span>.</h1>
                </div>
                <div className = "bg-[#111111] border-[1px] w-1/2 border-neutral-700 rounded-lg py-10 px-6 flex flex-col">
                    <h1 className = "text-green-500 text-4xl mb-8">Growth</h1>
                    <h1 className = "text-neutral-500 text-3xl">With comfort zones comes little growth. If you're stuck in a comfort zone, <span className = "text-neutral-200">you wont want to come out of it</span> - limiting growth. So we want to offer users the chance to <span className = "text-neutral-200">grow from their past experiences</span>. The past isn't something anyone <span className = "text-neutral-200">should get caught up in</span>, but our pasts give us all a <span className = "text-neutral-200">unique material which we can learn and grow from</span>.</h1>
                </div>
            </div>
            <div className = "flex flex-row pl-48 pr-12 mb-8 w-full">
                <div className = "w-5/6">
                    <h1 className = "text-purple-500 text-5xl mb-2">
                        Make new friends
                    </h1>
                    <p className = "text-neutral-200 text-4xl w-3/5 mb-6">
                        Get a chance to connect with people you share similar experiences with or that have fascinating things to share
                    </p>
                </div>
                <div className = "flex flex-col items-center justify-center relative w-1/6">
                    <div className = "h-[236px] w-1 bg-gradient-to-b from-neutral-950 to-purple-500 rounded absolute top-[-160px]"></div>
                    <BsStars className = "text-purple-500 text-3xl"/>
                </div>
            </div>
        </div>
    );
}

export default App;
