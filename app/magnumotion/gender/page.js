'use client';

// import * as fal from '@fal-ai/serverless-client';
import Image from "next/image";
import { useEffect, useState, useMemo } from 'react';
import TopLogoMagnumFixed from "../../components/TopLogoMagnumFixed";
// import { Paytone_One} from "next/font/google";
// const paytone_one = Paytone_One({ subsets: ["latin"], weight: '400' });
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

// function getRandomInt(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }

export default function Gender() {
    const router = useRouter();
    const [character, setCharacter] = useState(null);

    const generateAI = () => {
        localStorage.setItem("genderFix", character)
        // setTimeout(() => {
            router.push('/magnumotion/style');
        // }, 500);
    }

    return (
        <main className="flex fixed h-full w-full bg-magnumotion overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20">
            <TopLogoMagnumFixed></TopLogoMagnumFixed>
            <div className="relative w-[50%] mx-auto mt-0">
            <Image src='/magnumotion/gender.png' width={177} height={69} alt='Zirolu' className='w-full' priority />
            </div>
            {/* PILIH STYLE */}
            <div className={`relative w-[100%] mx-auto mt-10`}>
                <div className='relative mt-0 w-full'>
                    <div className='relative w-full'>
                        <div className='overflow-hidden'>
                            {/* STYLE SEMENTARA */}
                            <ul className='choose mod4'>
                            <li>
                                <input
                                id='choose_style1'
                                type="radio"
                                name='choose_style'
                                value="cowok"
                                onChange={(e) => setCharacter(e.target.value)}
                                />
                                <label htmlFor="choose_style1">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/magnumotion/gender-new-1.png"
                                    alt="icon"
                                    width={392}
                                    height={546}
                                    priority
                                />
                                </label>
                            </li>
                            <li>
                                <input
                                id='choose_style2'
                                type="radio"
                                name='choose_style'
                                value="cewek"
                                onChange={(e) => setCharacter(e.target.value)}
                                />
                                <label htmlFor="choose_style2">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/magnumotion/gender-new-2.png"
                                    alt="icon"
                                    width={392}
                                    height={546}
                                    priority
                                />
                                </label>
                            </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {character &&
                    <div className="relative w-full flex justify-center items-center z-20">
                        <button className="relative mx-auto w-[80%] flex justify-center items-center" onClick={generateAI}>
                            <Image src='/magnumotion/btn-next.png' width={750} height={224} alt='Zirolu' className='w-full' priority />
                        </button>
                    </div>
                }
            </div>
            {/* !PILIH STYLE */}
        </main>
    );
}
