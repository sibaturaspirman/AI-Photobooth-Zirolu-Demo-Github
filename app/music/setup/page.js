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

export default function Register() {
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
        console.log(moodType)
        console.log(Name)
        setNumProses1(1)

        const options = {
            method: 'POST',
            body: JSON.stringify({
                type:moodType,
                name:Name
            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
        
        await fetch('https://musicai-api.antigravity.dev/result', options)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                // setStatusAPI(response.status)
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem("urlVideo", response.data)
                }
                // setNumProses1(null)
                setUrlVideo(response.data)
                setTimeout(() => {
                    router.push('/music/result');
                }, 100);
            })
            .catch(err => {
                console.log(err)
                setStatusAPI('ERROR API!')
            });
    }

    const SetupSlider = (e) => {
        // console.log(e)
        const tempSliderValue = e.target.value; 
        setSliderProgress(e.target.value)
        const progress = (tempSliderValue / 100) * 100;
        // console.log(progress)

        let progressBagi = progress / 50;
        setSlideIndex(progressBagi)
        if(progressBagi == 0) setMoodType('emotional')
        else if(progressBagi == 1) setMoodType('energetic')
        else if(progressBagi == 2) setMoodType('loveanthem')
    }

    const SetupSlider2 = (e) => {
        // console.log(e)
        const tempSliderValue = e.target.value; 
        setSliderProgress2(e.target.value)
        const progress = (tempSliderValue / 100) * 100;
        // console.log(progress)

        let progressBagi = progress / 100;
        setSlideIndex2(progressBagi)
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
        <main className="flex fixed h-full w-full bg-music2 overflow-auto flex-col items-center pt-2 pb-5 px-5 lg:pt-12" onContextMenu={(e)=> e.preventDefault()}>
            {/* LOADING */}
            {numProses1 && 
                <div className='absolute bg-music2 top-0 left-0 right-0 bottom-0 flex items-center justify-center flex-col z-50'>
                    <div className='animate-upDownCepet relative py-5 px-8 border-2 text-center text-[#fff] w-[80%] bg-black/30'>
                        <div className="relative w-full mx-auto mb-3">
                            <Image src='/music/creating.png' width={775} height={166} alt='Zirolu' className='w-full' priority />
                        </div>
                        {statusAPI && 
                            <p className='text-red-600 text-bold'>{statusAPI}</p>
                        }
                        <p>{`Please wait, loading...`}</p>
                        <p className='text-sm'>{`Estimated 20-30 seconds`}</p>
                    </div>
                </div>
            }
            {/* LOADING */}

            {/* RESULT */}
            {/* {urlVideo && 
                <div className='absolute bg-music2 top-0 left-0 right-0 bottom-0 overflow-hidden flex items-center justify-center flex-col z-50'>
                    <div className='relative text-center text-[#fff] w-[60%]'>
                        <video src={urlVideo} autoPlay playsInline loop className=" mx-auto w-full border-4 shadow-xl border-white"></video>
                        <div className="relative w-full flex justify-center items-center mt-6 z-20">
                            <a href={urlVideo} target='_blank' className="relative mx-auto flex justify-center items-center">
                            <Image src='/music/btn-download.png' width={776} height={200} alt='Zirolu' className='w-full' priority />
                            </a>
                        </div>

                        <Link href='/music' className="relative w-[60%] mx-auto flex justify-center items-center">
                        <Image src='/music/back.png' width={864} height={210} alt='Zirolu' className='w-full' priority />
                        </Link>
                    </div>
                </div>
            } */}
            {/* RESULT */}

            {/* PILIH STYLE */}
            <div className={`relative w-[95%] mx-auto mt-10 z-20`}>
                <div className="relative w-[50%] mx-auto mb-3">
                    <Image src='/music/mood.png' width={775} height={166} alt='Zirolu' className='w-full' priority />
                </div>
                <div className='relative mt-0 w-[300px] mx-auto'>
                    <div className={`relative top-0 left-0 w-full pointer-events-none z-10 transition-all ${slideIndex == 0 ? `` : 'opacity-0'}`}>
                        <Image src='/music/meter-12.png' width={800} height={130} alt='Zirolu' className='w-full' priority />
                    </div>
                    <div className={`absolute top-0 left-0 w-full pointer-events-none z-10 transition-all ${slideIndex == 1 ? `` : 'opacity-0'}`}>
                        <Image src='/music/meter-22.png' width={800} height={130} alt='Zirolu' className='w-full' priority />
                    </div>
                    <div className={`absolute top-0 left-0 w-full pointer-events-none z-10 transition-all ${slideIndex == 2 ? `` : 'opacity-0'}`}>
                        <Image src='/music/meter-32.png' width={800} height={130} alt='Zirolu' className='w-full' priority />
                    </div>
                </div>
                <div className="relative w-[300px] mx-auto">
                    <input type="range" 
                    name="setupslider1"
                    step="50"
                    min="0"
                    max="100"
                    value={sliderProgress} 
                    onInput={(e) =>  SetupSlider(e) }
                    className="sliderProgress3"/>
                    <Image src='/music/meter.png' width={824} height={37} alt='Zirolu' className='w-full pointer-events-none' priority />
                </div>
                <div className={`relative w-[300px] mx-auto pointer-events-none z-10 transition-all`}>
                    <Image src='/music/meter-bawah7.png' width={800} height={130} alt='Zirolu' className='w-full' priority />
                </div>


                <div className="relative w-[40%] mx-auto mt-10 mb-0">
                    <Image src='/music/lyrics.png' width={775} height={166} alt='Zirolu' className='w-full' priority />
                </div>
                <div className='relative mt-0 w-[300px] mx-auto'>
                    <div className={`relative top-0 left-0 w-full pointer-events-none z-10 transition-all ${slideIndex2 == 0 ? `` : 'opacity-0'}`}>
                        <Image src='/music/meter2-12.png' width={800} height={130} alt='Zirolu' className='w-full' priority />
                    </div>
                    <div className={`absolute top-0 left-0 w-full pointer-events-none z-10 transition-all ${slideIndex2 == 1 ? `` : 'opacity-0'}`}>
                        <Image src='/music/meter2-22.png' width={800} height={130} alt='Zirolu' className='w-full' priority />
                    </div>
                    {/* <div className={`absolute top-0 left-0 w-full pointer-events-none z-10 transition-all ${slideIndex2 == 2 ? `` : 'opacity-0'}`}>
                        <Image src='/music/meter2-32.png' width={800} height={130} alt='Zirolu' className='w-full' priority />
                    </div> */}
                </div>
                <div className="relative w-[300px] mx-auto">
                    <input type="range" 
                    name="setupslider2"
                    step="100"
                    min="0"
                    max="100"
                    value={sliderProgress2} 
                    onInput={(e) =>  SetupSlider2(e) }
                    className="sliderProgress3"/>
                    <Image src='/music/meter.png' width={824} height={37} alt='Zirolu' className='w-full pointer-events-none' priority />
                </div>
                <div className={`relative  w-[300px] mx-auto pointer-events-none z-10 transition-all`}>
                    <Image src='/music/meter2-bawah2.png' width={800} height={130} alt='Zirolu' className='w-full' priority />
                </div>

                <div className="relative w-[30%] mx-auto mt-8 mb-2">
                    <Image src='/music/produced.png' width={774} height={166} alt='Zirolu' className='w-full' priority />
                </div>
                <div className='w-full'>
                    <div className="flex w-full items-center border-2 border-[#F0E5B4] font-bold">
                    <input
                        className="w-full p-[8px] outline-none text-[#F0E5B4] bg-[#758BB3]/50"
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Ex : Adhrian"
                        value={Name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    </div>
                </div>

                {/* {character && */}
                    <div className={`relative w-full flex justify-center items-center mt-6 z-20 ${Name == null || Name == '' ? `opacity-50 pointer-events-none` : ''}`} onClick={generateAura}>
                        <button className="relative mx-auto w-[80%] flex justify-center items-center">
                            <Image src='/music/btn-next.png' width={776} height={200} alt='Zirolu' className='w-full' priority />
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
