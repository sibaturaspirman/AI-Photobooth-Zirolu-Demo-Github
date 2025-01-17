'use client';

import Link from 'next/link';
import Image from "next/image";
import { useEffect, useState, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';

import { Mouse_Memoirs } from "next/font/google";
const MouseMemoirs = Mouse_Memoirs({ subsets: ["latin"], weight: ['400'] });

export default function Register() {
    const router = useRouter();
    const [Name, setName] = useState();
    const [Phone, setPhone] = useState();

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
                <p className={`text-5xl uppercase text-center ${MouseMemoirs.className}`}>Let&apos;s Explore <br></br> Changi Together!</p>
                <div className='w-full mt-5'>
                    <input
                        className={`${MouseMemoirs.className} w-full p-4 text-xl outline-none text-[#404F6A] bg-white rounded-lg shadow-xl`}
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
                        className={`${MouseMemoirs.className} w-full p-4 text-xl outline-none text-[#404F6A] bg-white rounded-lg shadow-xl`}
                        id="phone"
                        name="phone"
                        type='text'
                        inputMode="numeric"
                        placeholder="Input Your Phone Number"
                        value={Phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                {/* {character && */}
                    <div className={`relative w-full flex justify-center items-center mt-6 z-20 ${Name == null || Name == '' || Phone == null || Phone == '' ? `opacity-50 pointer-events-none` : ''}`} onClick={generateAura}>
                        <button className="relative mx-auto w-[60%] flex justify-center items-center">
                            <Image src='/digitalstamp/btn-start-blue.png' width={213} height={56} alt='Zirolu' className='w-full' priority />
                        </button>
                    </div>
                {/* } */}

            </div>
            {/* !PILIH STYLE */}


            <div className='absolute left-0 right-0 -bottom-4 w-full overflow-hidden'>
                <div className="animate-kiriKanan relative mx-auto w-[550px] flex justify-center items-center">
                    <Image src='/digitalstamp/preview-changi.png' width={550} height={222}  alt='Zirolu' className='w-full' priority />
                </div>
            </div>
        </main>
    );
}
