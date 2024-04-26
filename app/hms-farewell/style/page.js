'use client';

import * as fal from '@fal-ai/serverless-client';
import Image from "next/image";
import { useEffect, useState, useMemo } from 'react';
import TopLogoMizuho from "./../../components/TopLogoMizuho";
import { Paytone_One} from "next/font/google";
const paytone_one = Paytone_One({ subsets: ["latin"], weight: '400' });
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

    const generateAI = () => {
        let urlGambar = '';
        let urlGambar2 = '';
        let urlGambar3 = '';
        if(character == 'formasi-1'){
            let randomGambar = getRandomInt(1, 3);
            urlGambar = 'https://ai.zirolu.id/hms/style/fcfix-1-'+randomGambar+'-left.jpeg';
            urlGambar2 = 'https://ai.zirolu.id/hms/style/fcfix-1-'+randomGambar+'-center.jpeg';
            urlGambar3 = 'https://ai.zirolu.id/hms/style/fcfix-1-'+randomGambar+'-right.jpeg';
            // urlGambar = 'https://ai.zirolu.id/hms/style/fcfix-1-'+1+'-left.jpeg';
            // urlGambar2 = 'https://ai.zirolu.id/hms/style/fcfix-1-'+1+'-center.jpeg';
            // urlGambar3 = 'https://ai.zirolu.id/hms/style/fcfix-1-'+1+'-right.jpeg';
            console.log(randomGambar)

            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("styleFix", urlGambar)
                localStorage.setItem("styleFix2", urlGambar2)
                localStorage.setItem("styleFix3", urlGambar3)
                localStorage.setItem("formasiFix", character)
            }
        }else if(character == 'formasi-2'){
            let randomGambar = getRandomInt(1, 4);
            urlGambar = 'https://ai.zirolu.id/hms/style/fcfix-2-'+randomGambar+'-left.jpeg';
            urlGambar2 = 'https://ai.zirolu.id/hms/style/fcfix-2-'+randomGambar+'-center.jpeg';
            urlGambar3 = 'https://ai.zirolu.id/hms/style/fcfix-2-'+randomGambar+'-right.jpeg';
            // urlGambar = 'https://ai.zirolu.id/hms/style/fcfix-2-'+1+'-left.jpeg';
            // urlGambar2 = 'https://ai.zirolu.id/hms/style/fcfix-2-'+1+'-center.jpeg';
            // urlGambar3 = 'https://ai.zirolu.id/hms/style/fcfix-2-'+1+'-right.jpeg';
            console.log(randomGambar)

            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("styleFix", urlGambar)
                localStorage.setItem("styleFix2", urlGambar2)
                localStorage.setItem("styleFix3", urlGambar3)
                localStorage.setItem("formasiFix", character)
            }
        }else if(character == 'formasi-3'){
            let randomGambar = getRandomInt(1, 4);
            urlGambar = 'https://ai.zirolu.id/hms/style/fcfix-3-'+randomGambar+'-left.jpeg';
            urlGambar2 = 'https://ai.zirolu.id/hms/style/fcfix-3-'+randomGambar+'-center.jpeg';
            urlGambar3 = 'https://ai.zirolu.id/hms/style/fcfix-3-'+randomGambar+'-right.jpeg';
            // urlGambar = 'https://ai.zirolu.id/hms/style/fcfix-3-'+2+'-left.jpeg';
            // urlGambar2 = 'https://ai.zirolu.id/hms/style/fcfix-3-'+2+'-center.jpeg';
            // urlGambar3 = 'https://ai.zirolu.id/hms/style/fcfix-3-'+2+'-right.jpeg';
            console.log(randomGambar)

            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("styleFix", urlGambar)
                localStorage.setItem("styleFix2", urlGambar2)
                localStorage.setItem("styleFix3", urlGambar3)
                localStorage.setItem("formasiFix", character)
            }
        }
        console.log(character)
        console.log(urlGambar)
        console.log(urlGambar2)
        console.log(urlGambar3)

        // setTimeout(() => {
            router.push('/hms-farewell/cam');
        // }, 500);
    }

    return (
        <main className="flex fixed h-full w-full bg-hms overflow-auto flex-col items-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20">
            <div className="relative w-[50%] mx-auto mt-36">
            <Image src='/hms/title-gender.png' width={432} height={64} alt='Zirolu' className='w-full' priority />
            </div>
            {/* PILIH STYLE */}
            <div className={`relative w-[80%] mx-auto mt-0`}>
                <div className='relative mt-0 w-full'>
                    <div className='relative w-full'>
                        <div className='overflow-hidden'>
                            {/* STYLE SEMENTARA */}
                            <ul className='choose mod3'>
                            <li>
                                <input
                                id='choose_style1'
                                type="radio"
                                name='choose_style'
                                value="formasi-1"
                                onChange={(e) => setCharacter(e.target.value)}
                                />
                                <label htmlFor="choose_style1">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/hms/gender-1.png"
                                    alt="icon"
                                    width={481}
                                    height={239}
                                    priority
                                />
                                </label>
                            </li>
                            <li>
                                <input
                                id='choose_style2'
                                type="radio"
                                name='choose_style'
                                value="formasi-2"
                                onChange={(e) => setCharacter(e.target.value)}
                                />
                                <label htmlFor="choose_style2">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/hms/gender-2.png"
                                    alt="icon"
                                    width={481}
                                    height={239}
                                    priority
                                />
                                </label>
                            </li>
                            <li>
                                <input
                                id='choose_style3'
                                type="radio"
                                name='choose_style'
                                value="formasi-3"
                                onChange={(e) => setCharacter(e.target.value)}
                                />
                                <label htmlFor="choose_style3">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/hms/gender-3.png"
                                    alt="icon"
                                    width={481}
                                    height={239}
                                    priority
                                />
                                </label>
                            </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {character &&
                    <div className="relative w-full flex justify-center items-center mt-[-1rem] z-20">
                        <button className="relative mx-auto w-[100%] flex justify-center items-center" onClick={generateAI}>
                            <Image src='/hms/btn-takephoto.png' width={684} height={132} alt='Zirolu' className='w-full' priority />
                        </button>
                    </div>
                }
            </div>
            {/* !PILIH STYLE */}
        </main>
    );
}
