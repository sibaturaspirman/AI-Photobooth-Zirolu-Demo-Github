'use client';

import Link from 'next/link';
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

export default function Apakah() {
    const router = useRouter();
    const [numProses1, setNumProses1] = useState(null);
    const [Name, setName] = useState(null);
    const [slideIndex, setSlideIndex] = useState(0);
    const [slideIndex2, setSlideIndex2] = useState(0);
    const [moodType, setMoodType] = useState('emotional');
    const [swipeTrigger, setSwipeTrigger] = useState(false);
    const [sliderProgress, setSliderProgress] = useState(0);
    const [sliderProgress2, setSliderProgress2] = useState(0);
    const [maxDuration, setMaxDuration] = useState(5);
    const [countdownStart, setCountdownStart] = useState(false);
    const [statusAPI, setStatusAPI] = useState();
    const [urlVideo, setUrlVideo] = useState();
    const timerRef = useRef(null);

    useEffect(() => {
        handleStartCountdown()
        if(countdownStart){
            if(maxDuration == 0){
                setSwipeTrigger(true)
            }
        }
    }, [swipeTrigger, countdownStart, maxDuration])

    const generateAura = async () => {
        setTimeout(() => {
            router.push('/dss-rehat/genre');
        }, 100);
    }

    const SetupSlider = (e) => {
        // console.log(e)
        const tempSliderValue = e.target.value; 
        setSliderProgress(e.target.value)
        const progress = (tempSliderValue / 100) * 100;
        console.log(progress)

        let progressBagi = progress / 33;
        setSlideIndex(progressBagi)
        if(progressBagi == 0) setMoodType('emotional')
        else if(progressBagi == 1) setMoodType('energetic')
        else if(progressBagi == 2) setMoodType('loveanthem')
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
        <main className="flex fixed h-full w-full bg-dss overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20" onContextMenu={(e)=> e.preventDefault()}>
            <div className="relative w-[70%] mx-auto mt-[-30rem]">
            <Image src='/dss/apakah.png' width={720} height={260} alt='Zirolu' className='w-full' priority />
            </div>
            {/* PILIH STYLE */}
            <div className={`relative w-[95%] mx-auto mt-10 z-20`}>
                <div className="relative w-[800px] mx-auto z-20">
                    <input type="range" 
                    name="setupslider1"
                    step="33"
                    min="0"
                    max="100"
                    value={sliderProgress} 
                    onInput={(e) =>  SetupSlider(e) }
                    className="sliderProgressDss"/>
                    <Image src='/dss/slider-progress.png' width={824} height={37} alt='Zirolu' className='w-full pointer-events-none' priority />
                </div>
                <div className='relative mt-0 w-[780px] mx-auto z-10'>
                    <div className={`relative top-0 left-0 w-full pointer-events-none z-10 transition-all ${slideIndex == 0 ? `` : 'opacity-0'}`}>
                        <Image src='/dss/slider-1.png' width={800} height={130} alt='Zirolu' className='w-full' priority />
                    </div>
                    <div className={`absolute top-0 left-0 w-full pointer-events-none z-10 transition-all ${slideIndex == 1 ? `` : 'opacity-0'}`}>
                        <Image src='/dss/slider-2.png' width={800} height={130} alt='Zirolu' className='w-full' priority />
                    </div>
                    <div className={`absolute top-0 left-0 w-full pointer-events-none z-10 transition-all ${slideIndex == 2 ? `` : 'opacity-0'}`}>
                        <Image src='/dss/slider-3.png' width={800} height={130} alt='Zirolu' className='w-full' priority />
                    </div>
                    <div className={`absolute top-0 left-0 w-full pointer-events-none z-10 transition-all ${slideIndex == 3 ? `` : 'opacity-0'}`}>
                        <Image src='/dss/slider-4.png' width={800} height={130} alt='Zirolu' className='w-full' priority />
                    </div>
                </div>

                {/* {character && */}
                    <div className={`relative w-full flex justify-center items-center mt-[9rem] z-20`}>
                        <button className="relative mx-auto w-[100%] flex justify-center items-center" onClick={generateAura}>
                            <Image src='/dss/btn-continue.png' width={850} height={258} alt='Zirolu' className='w-full' priority />
                        </button>
                    </div>
                {/* } */}

            </div>
            {/* !PILIH STYLE */}
            <div className={`fixed top-0 bottom-0 left-0 right-0 w-full z-40 flex justify-center items-end pointer-events-none bg-black/0 transition-all ${swipeTrigger ? `opacity-0 pointer-events-none` : ''}`} onClick={()=> setSwipeTrigger(true)}>
                <div className="relative p-20 pb-[2rem] w-full z-40 swipeInfo">
                    <Image src='/comcon/veev/hand.png' width={202} height={200} alt='Zirolu' className='w-[20%] mx-auto mb-10 swipeInfoHand' priority />
                    <Image src='/comcon/veev/swipe.png' width={702} height={124} alt='Zirolu' className='w-[60%] mx-auto' priority />
                </div>
            </div>
        </main>
    );
}
