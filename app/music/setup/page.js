'use client';

// import * as fal from '@fal-ai/serverless-client';
import Image from "next/image";
import { useEffect, useState, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
// Import Swiper React components

// Import Swiper styles
import 'swiper/css';

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Register() {
    const router = useRouter();
    const [slideIndex, setSlideIndex] = useState(0);
    const [swipeTrigger, setSwipeTrigger] = useState(false);
    const [sliderProgress, setSliderProgress] = useState(0);
    const [maxDuration, setMaxDuration] = useState(5);
    const [countdownStart, setCountdownStart] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        handleStartCountdown()
        if(countdownStart){
            if(maxDuration == 0){
                // setSwipeTrigger(true)
            }
        }
    }, [swipeTrigger, countdownStart, maxDuration])

    const generateAura = () => {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem("auraFix", 'aura'+slideIndex+getRandomInt(1,4))
        }
        setTimeout(() => {
            router.push('/aura/style');
        }, 200);
    }

    const SetupSlider = (e) => {
        // console.log(e)
        const tempSliderValue = e.target.value; 
        setSliderProgress(e.target.value)
        const progress = (tempSliderValue / 100) * 100;
        // console.log(progress)

        let progressBagi = progress / 25;
        setSlideIndex(progressBagi)
    }

    // COUNTDOWN
    const handleStartCountdown = () => {
        if (maxDuration <= 5) {
            setCountdownStart(true);
            timerRef.current = setInterval(() => {
                setMaxDuration((prevTime) => {
                  if (prevTime <= 1) {
                    clearInterval(timerRef.current);
                    return 0;
                  }
                  return prevTime - 1;
                });
            }, 1000);
        }
    };

    return (
        <main className="flex fixed h-full w-full bg-music overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-12" onContextMenu={(e)=> e.preventDefault()}>
            <div className="relative w-[90%] mx-auto mb-5 z-20">
            <Image src='/comcon/veev/bagaimana.png' width={775} height={166} alt='Zirolu' className='w-full' priority />
            </div>

            {/* PILIH STYLE */}
            <div className={`relative w-[95%] mx-auto mt-5 z-20`}>
                <div className='relative mt-0 w-full'>
                    <div className={`relative top-0 left-0 w-full pointer-events-none z-10 transition-all ${slideIndex == 0 ? `` : 'opacity-0'}`}>
                        <Image src='/comcon/veev/f-1.png' width={940} height={465} alt='Zirolu' className='w-full' priority />
                    </div>
                    <div className={`absolute top-0 left-0 w-full pointer-events-none z-10 transition-all ${slideIndex == 1 ? `` : 'opacity-0'}`}>
                        <Image src='/comcon/veev/f-2.png' width={940} height={465} alt='Zirolu' className='w-full' priority />
                    </div>
                    <div className={`absolute top-0 left-0 w-full pointer-events-none z-10 transition-all ${slideIndex == 2 ? `` : 'opacity-0'}`}>
                        <Image src='/comcon/veev/f-3.png' width={940} height={465} alt='Zirolu' className='w-full' priority />
                    </div>
                    <div className={`absolute top-0 left-0 w-full pointer-events-none z-10 transition-all ${slideIndex == 3 ? `` : 'opacity-0'}`}>
                        <Image src='/comcon/veev/f-4.png' width={940} height={465} alt='Zirolu' className='w-full' priority />
                    </div>
                    <div className={`absolute top-0 left-0 w-full pointer-events-none z-10 transition-all ${slideIndex == 4 ? `` : 'opacity-0'}`}>
                        <Image src='/comcon/veev/f-5.png' width={940} height={465} alt='Zirolu' className='w-full' priority />
                    </div>
                </div>
                <div className="relative w-full">
                    <input type="range" 
                    step="25"
                    min="0"
                    max="100"
                    value={sliderProgress} 
                    onInput={(e) =>  SetupSlider(e) }
                    className="sliderProgress2"/>
                    <Image src='/comcon/veev/sliderbar.png' width={874} height={51} alt='Zirolu' className='w-full pointer-events-none' priority />
                </div>
                {/* {character && */}
                    <div className={`relative w-full flex justify-center items-center mt-[7rem] z-20`} onClick={generateAura}>
                        <button className="relative mx-auto w-[80%] flex justify-center items-center">
                            <Image src='/btn-continue-a.png' width={850} height={258} alt='Zirolu' className='w-full' priority />
                        </button>
                    </div>
                {/* } */}

            </div>
            {/* !PILIH STYLE */}
            <div className={`fixed top-0 bottom-0 left-0 right-0 w-full z-40 flex justify-center items-end bg-black/0 transition-all ${swipeTrigger ? `opacity-0 pointer-events-none` : ''}`} onClick={()=> setSwipeTrigger(true)}>
                <div className="relative p-20 pb-[2rem] w-full z-40 swipeInfo">
                    <Image src='/comcon/veev/hand.png' width={202} height={200} alt='Zirolu' className='w-[20%] mx-auto mb-10 swipeInfoHand' priority />
                    <Image src='/comcon/veev/swipe.png' width={702} height={124} alt='Zirolu' className='w-[60%] mx-auto' priority />
                </div>
            </div>
        </main>
    );
}
