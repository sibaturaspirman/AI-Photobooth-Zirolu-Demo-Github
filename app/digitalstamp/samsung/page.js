'use client';

import Link from 'next/link';
import Image from "next/image";
import { useEffect, useState, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';

import { Open_Sans } from "next/font/google";
const OpenSans = Open_Sans({ subsets: ["latin"], weight: ['400', '500'] });

export default function Register() {
    const router = useRouter();
    const [Name, setName] = useState();
    const [Phone, setPhone] = useState();
    const [Email, setEmail] = useState();

    const generateAura = async () => {
        localStorage.setItem('dsName', Name)
        localStorage.setItem('dsPhone', Phone)
        localStorage.setItem('dsEmail', Email)
        setTimeout(() => {
            router.push('/digitalstamp/samsung/stamp');
        }, 100);
    }

    return (
        <main className="flex fixed h-full w-full bg-[#F4F4F4] overflow-hidden flex-col items-center pt-2 pb-5 px-5 lg:pt-12" onContextMenu={(e)=> e.preventDefault()}>

            {/* PILIH STYLE */}
            <div className={`relative w-[95%] mx-auto mt-2 z-20`}>
                <div className='relative w-full mb-3 overflow-hidden m-auto flex justify-center items-center pointer-events-none z-10'>
                    <div className='w-full'>
                        <Image src='/digitalstamp/samsung-logo.png' width={327} height={157} alt='Zirolu' className='w-full' priority />
                    </div>
                </div>
                {/* <p className={`text-5xl uppercase text-center ${OpenSans.className}`}>Let&apos;s Explore <br></br> Singapore Together!</p> */}
                <div className='w-[29px] mx-auto mt-3 mr-0'>
                    <Image src='/digitalstamp/samsung-star.png' width={29} height={30} alt='Zirolu' className='w-full' priority />
                </div>
                <div className='w-full p-6 mt-2 digstamp-smsg-bg rounded-xl'>
                    <div className='w-full'>
                        <input
                            className={`${OpenSans.className} font-medium w-full p-4 text-base outline-none text-[#404F6A] bg-white rounded-lg border-2 border-[#2A2A5C]`}
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Input Your Name"
                            value={Name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='w-full mt-5'>
                        <input
                            className={`${OpenSans.className} font-medium w-full p-4 text-base outline-none text-[#404F6A] bg-white rounded-lg border-2 border-[#2A2A5C]`}
                            id="email"
                            name="email"
                            type='email'
                            placeholder="Input Your Email"
                            value={Email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='w-full mt-5'>
                        <input
                            className={`${OpenSans.className} font-medium w-full p-4 text-base outline-none text-[#404F6A] bg-white rounded-lg border-2 border-[#2A2A5C]`}
                            id="phone"
                            name="phone"
                            type='text'
                            inputMode="numeric"
                            placeholder="Input Your Phone Number"
                            value={Phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>

                    <div className={`relative w-full flex justify-center items-center mt-5 z-20 ${Name == null || Name == '' || Phone == null || Phone == '' || Email == null || Email == '' ? `opacity-50 pointer-events-none` : ''}`} onClick={generateAura}>
                        <button className="relative mx-auto w-[100%] flex justify-center items-center">
                            <Image src='/digitalstamp/samsung-btn-start.png' width={295} height={56} alt='Zirolu' className='w-full' priority />
                        </button>
                    </div>
                </div>

            </div>
            {/* !PILIH STYLE */}
        </main>
    );
}
