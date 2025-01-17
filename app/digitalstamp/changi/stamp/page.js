'use client';

import Link from 'next/link';
import Image from "next/image";
import { useEffect, useState, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';

import { Mouse_Memoirs, Slackside_One } from "next/font/google";
const MouseMemoirs = Mouse_Memoirs({ subsets: ["latin"], weight: ['400'] });
const SlacksideOne = Slackside_One({ subsets: ["latin"], weight: ['400'] });

export default function Register() {
    const router = useRouter();
    const [Name, setName] = useState();

    useEffect(() => {
        // Perform localStorage action
        if (typeof localStorage !== 'undefined') {
            const item = localStorage.getItem('dsName')
            setName(item)
        }
    }, [Name])

    const generateAura = async () => {
        localStorage.setItem('dsName', Name)
        localStorage.setItem('dsPhone', Phone)
        setTimeout(() => {
            router.push('/digitalstamp/changi/stamp');
        }, 100);
    }

    return (
        <main className="flex fixed h-full w-full bg-digstamp-blue overflow-hidden flex-col items-center pt-2 pb-5 px-5 lg:pt-12" onContextMenu={(e)=> e.preventDefault()}>

            {/* PILIH STYLE */}
            <div className={`relative w-[95%] mx-auto mt-10 z-20`}>
                <p className={`text-base text-[#F0E6CC] uppercase ${MouseMemoirs.className}`}>Hi, {Name}!</p>
                <p className={`text-4xl uppercase ${MouseMemoirs.className}`}>Let's Explore <br></br> Changi Airport Together!</p>
                <div className='relative w-full mt-0 p-5'>
                    <Swiper
                        effect={'cards'}
                        grabCursor={true}
                        modules={[EffectCards]}
                        spaceBetween={0}
                        slidesPerView={1}
                        onSlideChange={() => console.log('slide change')}
                        onSwiper={(swiper) => console.log(swiper)}
                        >
                        <SwiperSlide className='pt-0'>
                            <div className='photocard bg-white'>
                                <div className='inner p-5'>
                                    <div className='photocard-take border-dashed border-[#A5B3CC] border-2 bg-[#F1F4F9]'>
                                        <div className='inner flex justify-center items-center'>
                                            <div className='relative w-[50%]'>
                                                <div className="animate-rotateKiriKanan relative mx-auto w-[70%] flex justify-center items-center mb-3">
                                                    <Image src='/digitalstamp/hand.png' width={96} height={96}  alt='Zirolu' className='animate-bgScale2 w-full' priority />
                                                </div>
                                                <div className="relative mx-auto w-full flex justify-center items-center">
                                                    <Image src='/digitalstamp/take-selfie.png' width={133} height={84}  alt='Zirolu' className='w-full' priority />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className={`text-xl mt-2 text-[#2B3B4F] text-center ${SlacksideOne.className}`}>Jewel Rain Vortex</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='photocard bg-white'>
                                <div className='inner p-5'>
                                    <div className='photocard-take border-dashed border-[#A5B3CC] border-2 bg-[#F1F4F9]'>
                                        <div className='inner flex justify-center items-center'>
                                            <div className='relative w-[50%]'>
                                                <div className="animate-rotateKiriKanan relative mx-auto w-[70%] flex justify-center items-center mb-3">
                                                    <Image src='/digitalstamp/hand.png' width={96} height={96}  alt='Zirolu' className='animate-bgScale2 w-full' priority />
                                                </div>
                                                <div className="relative mx-auto w-full flex justify-center items-center">
                                                    <Image src='/digitalstamp/take-selfie.png' width={133} height={84}  alt='Zirolu' className='w-full' priority />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className={`text-xl mt-2 text-[#2B3B4F] text-center ${SlacksideOne.className}`}>Jewel Rain Vortex</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='photocard bg-white'>
                                <div className='inner p-5'>
                                    <div className='photocard-take border-dashed border-[#A5B3CC] border-2 bg-[#F1F4F9]'>
                                        <div className='inner flex justify-center items-center'>
                                            <div className='relative w-[50%]'>
                                                <div className="animate-rotateKiriKanan relative mx-auto w-[70%] flex justify-center items-center mb-3">
                                                    <Image src='/digitalstamp/hand.png' width={96} height={96}  alt='Zirolu' className='animate-bgScale2 w-full' priority />
                                                </div>
                                                <div className="relative mx-auto w-full flex justify-center items-center">
                                                    <Image src='/digitalstamp/take-selfie.png' width={133} height={84}  alt='Zirolu' className='w-full' priority />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className={`text-xl mt-2 text-[#2B3B4F] text-center ${SlacksideOne.className}`}>Jewel Rain Vortex</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='photocard bg-white'>
                                <div className='inner p-5'>
                                    <div className='photocard-take border-dashed border-[#A5B3CC] border-2 bg-[#F1F4F9]'>
                                        <div className='inner flex justify-center items-center'>
                                            <div className='relative w-[50%]'>
                                                <div className="animate-rotateKiriKanan relative mx-auto w-[70%] flex justify-center items-center mb-3">
                                                    <Image src='/digitalstamp/hand.png' width={96} height={96}  alt='Zirolu' className='animate-bgScale2 w-full' priority />
                                                </div>
                                                <div className="relative mx-auto w-full flex justify-center items-center">
                                                    <Image src='/digitalstamp/take-selfie.png' width={133} height={84}  alt='Zirolu' className='w-full' priority />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className={`text-xl mt-2 text-[#2B3B4F] text-center ${SlacksideOne.className}`}>Jewel Rain Vortex</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                </div>

            </div>
        </main>
    );
}
