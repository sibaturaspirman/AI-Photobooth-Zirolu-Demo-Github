'use client';

// import * as fal from '@fal-ai/serverless-client';
import Image from "next/image";
import Link from 'next/link';
import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Register() {
    const router = useRouter();
    const [character, setCharacter] = useState(null);

    return (
        <main className="flex fixed h-full w-full bg-cv-page overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20" onContextMenu={(e)=> e.preventDefault()}>
            {/* <div className="fixed top-0 left-0 w-full h-full bg-iqos-border pointer-events-none z-10"></div> */}
            {/* <div className="relative w-[90%] mx-auto mt-0">
            <Image src='/indika/select.png' width={720} height={260} alt='Zirolu' className='w-full' priority />
            </div> */}
            {/* PILIH STYLE */}
            <div className={`relative w-[90%] sm:w-[70%] lg:w-[70%] mx-auto mt-10`}>
                <div className='relative mt-[-5rem] sm:mt-[-21rem] lg:mt-[-25rem] w-full'>
                    <div className='relative w-full'>
                        <div className='overflow-hiddenx w-full mx-auto'>
                            {/* STYLE SEMENTARA */}
                            <ul className='choose mod10'>
                            <li className='mb-10'>
                                <input
                                id='choose_style2'
                                type="radio"
                                name='choose_style'
                                value="1"
                                onChange={(e) => setCharacter(e.target.value)}
                                />
                                <label htmlFor="choose_style2">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/amild/cv/tnc.png"
                                    alt="icon"
                                    width={674}
                                    height={831}
                                    priority
                                />
                                <Image
                                    className="absolute top-0 left-0 h-auto w-full"
                                    src="/amild/cv/tnc_check.png"
                                    alt="icon"
                                    width={674}
                                    height={831}
                                    priority
                                />
                                </label>
                            </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* {character && */}
                    <div className={`fixed left-0 right-0 bottom-[6rem] w-[80%] mx-auto flex justify-center items-center z-20 ${character ? `` : 'opacity-0 pointer-events-none'}`}>
                        {/* <Link href='/capture-vibe/' className="relative mx-auto h-[10vw] flex justify-center items-center">
                            <Image src='/amild/cv/yah.png' width={850} height={258} alt='Zirolu' className='w-full' priority />
                        </Link> */}
                        <Link href='/capture-vibe/cam' className="relative mx-auto w-[60%] flex justify-center items-center">
                            <Image src='/amild/cv/selanjutnya.png' width={850} height={258} alt='Zirolu' className='w-full' priority />
                        </Link>
                    </div>
                {/* } */}
            </div>
            {/* !PILIH STYLE */}
        </main>
    );
}
