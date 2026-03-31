'use client';

// import * as fal from '@fal-ai/serverless-client';
import Image from "next/image";
import { useEffect, useState, useMemo } from 'react';
import BgWaveCustom from "../../components/BgWaveCustom";
import { useRouter } from 'next/navigation';
// import io from 'socket.io-client';

// @snippet:start(client.config)
// fal.config({
//     // credentials: 'FAL_KEY_ID:FAL_KEY_SECRET',
//     requestMiddleware: fal.withProxy({
//       targetUrl: '/api/fal/proxy', // the built-int nextjs proxy
//       // targetUrl: 'http://localhost:3333/api/fal/proxy', // or your own external proxy
//     }),
// });

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Register() {
    const router = useRouter();
    const [character, setCharacter] = useState(null);
    const [hijab, setHijab] = useState(false);

    const generateAI = () => {
        // let randomGambar = getRandomInt(1,3)
        // if(character == 'cowok'){
        //     if (typeof localStorage !== 'undefined') {
        //         localStorage.setItem("formasiFix", 'MALE')
        //     }
        // }else{
        //     if(!hijab){
        //         if (typeof localStorage !== 'undefined') {
        //             localStorage.setItem("formasiFix", 'FEMALE')
        //         }
        //     }else{
        //         if (typeof localStorage !== 'undefined') {
        //             localStorage.setItem("formasiFix", 'HIJAB')
        //         }
        //     }
        // }

        if (typeof localStorage !== 'undefined') {
            localStorage.setItem("musicalFix", character)
        }

        setTimeout(() => {
            router.push('/amildmusic/personality');
        }, 100);
    }

    return (
        <main className="flex fixed h-full w-full bg-comcon-iqos overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20" onContextMenu={(e)=> e.preventDefault()}>
             <BgWaveCustom bg={'/amild/am-bg.jpg'}></BgWaveCustom>
            <div className="relative w-[65%] mx-auto mt-0">
            <Image src='/amild/am-title.png' width={471} height={216} alt='Zirolu' className='w-full' priority />
            </div>
            {/* PILIH STYLE */}
            <div className={`relative w-[70%] mx-auto mt-10`}>
                <div className='relative mt-0 w-full'>
                    <div className='relative w-full'>
                        <div className='overflow-hiddenx w-full mx-auto'>
                            {/* STYLE SEMENTARA */}
                            <ul className='choose mod10'>
                            <li className='!mb-0'>
                                <input
                                id='choose_style1'
                                type="radio"
                                name='choose_style'
                                value="soundwave"
                                onChange={(e) => setCharacter(e.target.value)}
                                />
                                <label htmlFor="choose_style1">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/amild/am-opt-1.png"
                                    alt="icon"
                                    width={604}
                                    height={192}
                                    priority
                                />
                                <Image
                                    className="absolute top-0 left-0 h-auto w-full"
                                    src="/amild/am-opt-1-check.png"
                                    alt="icon"
                                    width={604}
                                    height={192}
                                    priority
                                />
                                </label>
                            </li>
                            <li className="!mb-0">
                                <input
                                id='choose_style2'
                                type="radio"
                                name='choose_style'
                                value="notes"
                                onChange={(e) => setCharacter(e.target.value)}
                                />
                                <label htmlFor="choose_style2">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/amild/am-opt-2.png"
                                    alt="icon"
                                    width={604}
                                    height={192}
                                    priority
                                />
                                <Image
                                    className="absolute top-0 left-0 h-auto w-full"
                                    src="/amild/am-opt-2-check.png"
                                    alt="icon"
                                    width={604}
                                    height={192}
                                    priority
                                />
                                </label>
                            </li>
                            <li className="!mb-0">
                                <input
                                id='choose_style3'
                                type="radio"
                                name='choose_style'
                                value="equalizer"
                                onChange={(e) => setCharacter(e.target.value)}
                                />
                                <label htmlFor="choose_style3">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/amild/am-opt-3.png"
                                    alt="icon"
                                    width={604}
                                    height={192}
                                    priority
                                />
                                <Image
                                    className="absolute top-0 left-0 h-auto w-full"
                                    src="/amild/am-opt-3-check.png"
                                    alt="icon"
                                    width={604}
                                    height={192}
                                    priority
                                />
                                </label>
                            </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* {character && */}
                {/* } */}
            </div>
            {/* !PILIH STYLE */}
            <div className={`relative w-full flex justify-center items-center mt-0 z-20 ${character ? `` : 'opacity-0 pointer-events-none'}`}>
                <button className="relative mx-auto w-[92%] flex justify-center items-center" onClick={generateAI}>
                    <Image src='/amild/am-next.png' width={550} height={88} alt='Zirolu' className='w-full' priority />
                </button>
            </div>
        </main>
    );
}
