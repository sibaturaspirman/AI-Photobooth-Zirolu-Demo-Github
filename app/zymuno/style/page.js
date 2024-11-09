'use client';

// import * as fal from '@fal-ai/serverless-client';
import Image from "next/image";
import { useEffect, useState, useMemo } from 'react';
// import TopLogoMizuho from "./../../components/TopLogoMizuho";
// import { Paytone_One} from "next/font/google";
// const paytone_one = Paytone_One({ subsets: ["latin"], weight: '400' });
import { useRouter } from 'next/navigation';
// import io from 'socket.io-client';
import { Poppins} from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ['400','700', '900'] });

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
    const [styleFemale, setStyleFemale] = useState('normal');

    const generateAI = () => {
        let urlGambar = 'https://ai.zirolu.id/zymuno/style/'+character+'-child.jpg';
        let urlGambar2 = 'https://ai.zirolu.id/zymuno/style/'+character+'-parent.jpg';

            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("styleFixChild", urlGambar)
                localStorage.setItem("styleFixParent", urlGambar2)
                localStorage.setItem("formasiFix", character)
            }
        console.log(urlGambar)
        console.log(urlGambar2)

        setTimeout(() => {
            router.push('/zymuno/cam');
        }, 100);
    }

    return (
        <main className="flex fixed h-full w-full bg-zymuno overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20" onContextMenu={(e)=> e.preventDefault()}>
            
            <div className='relative w-[25%] mx-auto flex justify-center items-center z-50'>
                <Image src='/zymuno/logo.png' width={179} height={103} alt='Zirolu' className='w-full' priority />
            </div>
            <h1 className={`text-center text-4xl font-bold mt-5 mb-0 ${poppins.className}`}>Pick Your Style</h1>

            {/* PILIH STYLE */}
            <div className={`relative w-[90%] mx-auto mt-0`}>
                <div className='relative mt-0 w-full'>
                    <div className='relative w-full'>
                        <div className=' w-[75%] mx-auto'>
                            {/* STYLE SEMENTARA */}
                            <ul className='choose mod11'>
                            <li className='mb-0'>
                                <input
                                id='choose_style1'
                                type="radio"
                                name='choose_style'
                                value="s1"
                                onChange={(e) => setCharacter(e.target.value)}
                                />
                                <label htmlFor="choose_style1">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/zymuno/s1.jpg"
                                    alt="icon"
                                    width={220}
                                    height={302}
                                    priority
                                />
                                </label>
                            </li>
                            <li className="mb-0">
                                <input
                                id='choose_style2'
                                type="radio"
                                name='choose_style'
                                value="s2"
                                onChange={(e) => setCharacter(e.target.value)}
                                />
                                <label htmlFor="choose_style2">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/zymuno/s2.jpg"
                                    alt="icon"
                                    width={220}
                                    height={302}
                                    priority
                                />
                                </label>
                            </li>
                            <li>
                                <input
                                id='choose_style3'
                                type="radio"
                                name='choose_style'
                                value="s3"
                                onChange={(e) => setCharacter(e.target.value)}
                                />
                                <label htmlFor="choose_style3">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/zymuno/s3.jpg"
                                    alt="icon"
                                    width={220}
                                    height={302}
                                    priority
                                />
                                </label>
                            </li>
                            <li>
                                <input
                                id='choose_style4'
                                type="radio"
                                name='choose_style'
                                value="s4"
                                onChange={(e) => setCharacter(e.target.value)}
                                />
                                <label htmlFor="choose_style4">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/zymuno/s4.jpg"
                                    alt="icon"
                                    width={220}
                                    height={302}
                                    priority
                                />
                                </label>
                            </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* {character && */}
                    <div className={`relative w-full flex justify-center items-center mt-1 z-20 ${character ? `` : 'opacity-0 pointer-events-none'}`}>
                        <button className="relative mx-auto w-[75%] flex justify-center items-center" onClick={generateAI}>
                            <Image src='/zymuno/btn-next.png' width={410} height={96} alt='Zirolu' className='w-full' priority />
                        </button>
                    </div>
                {/* } */}
            </div>
            {/* !PILIH STYLE */}
        </main>
    );
}
