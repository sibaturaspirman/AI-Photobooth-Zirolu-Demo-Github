'use client';

import * as fal from '@fal-ai/serverless-client';
import Image from "next/image";
import { useEffect, useState, useMemo } from 'react';
import TopLogoMagnum from "../../components/TopLogoMagnum";
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

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Register() {
    const router = useRouter();
    const [character, setCharacter] = useState(null);
    const [genderFix, setGenderFix] = useState(null);

    useEffect(() => {
        // Perform localStorage action
        if (typeof localStorage !== 'undefined') {
            const item2 = localStorage.getItem('genderFix')
            setGenderFix(item2)
        }
    }, [genderFix])

    const generateAI = () => {
        let urlGambar = '';
        let urlGambar2 = '';
        let urlGambar3 = '';
        if(character == 'style1'){
            urlGambar = 'https://ai.zirolu.id/magnumotion/style/hammersonic-cowok1a.jpeg';
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("styleFix", urlGambar)
            }
        }else if(character == 'style2'){
            urlGambar = 'https://ai.zirolu.id/magnumotion/style/hammersonic-cowok2a.jpeg';
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("styleFix", urlGambar)
            }
        }else if(character == 'style3'){
            urlGambar = 'https://ai.zirolu.id/magnumotion/style/hammersonic-cowok3a.jpeg';
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("styleFix", urlGambar)
            }
        }else if(character == 'style4'){
            urlGambar = 'https://ai.zirolu.id/magnumotion/style/hammersonic-cowok4a.jpeg';
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("styleFix", urlGambar)
            }
        }else if(character == 'style1-cewek'){
            // let randomGambar = getRandomInt(1, 11);
            urlGambar = 'https://ai.zirolu.id/magnumotion/style/hammersonic-cewe1a.jpeg';
            // console.log(randomGambar)

            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("styleFix", urlGambar)
            }
        }else if(character == 'style2-cewek'){
            // let randomGambar = getRandomInt(1, 11);
            urlGambar = 'https://ai.zirolu.id/magnumotion/style/hammersonic-cewe1b.jpg';
            // console.log(randomGambar)

            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("styleFix", urlGambar)
            }
        }
        console.log(character)
        console.log(urlGambar)

        // setTimeout(() => {
            router.push('/magnumotion/cam');
        // }, 500);
    }

    return (
        <main className="flex fixed h-full w-full bg-magnumotion overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20">
            <TopLogoMagnum></TopLogoMagnum>
            <div className="relative w-[60%] mx-auto mt-0]">
            <Image src='/magnumotion/style.png' width={236} height={41} alt='Zirolu' className='w-full' priority />
            </div>
            {/* PILIH STYLE */}
            <div className={`relative w-full mx-auto mt-10`}>
                <div className='relative mt-0 w-full'>
                    <div className='relative w-full'>
                        <div className='overflow-hidden'>
                            {genderFix && genderFix == 'cowok' &&
                            <ul className='choose mod5'>
                            <li>
                                <input
                                id='choose_style1'
                                type="radio"
                                name='choose_style'
                                value="style1"
                                onChange={(e) => setCharacter(e.target.value)}
                                />
                                <label htmlFor="choose_style1">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/magnumotion/m-cowok-1.png"
                                    alt="icon"
                                    width={546}
                                    height={392}
                                    priority
                                />
                                </label>
                            </li>
                            <li>
                                <input
                                id='choose_style2'
                                type="radio"
                                name='choose_style'
                                value="style2"
                                onChange={(e) => setCharacter(e.target.value)}
                                />
                                <label htmlFor="choose_style2">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/magnumotion/m-cowok-2.png"
                                    alt="icon"
                                    width={546}
                                    height={392}
                                    priority
                                />
                                </label>
                            </li>
                            <li>
                                <input
                                id='choose_style3'
                                type="radio"
                                name='choose_style'
                                value="style3"
                                onChange={(e) => setCharacter(e.target.value)}
                                />
                                <label htmlFor="choose_style3">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/magnumotion/m-cowok-3.png"
                                    alt="icon"
                                    width={546}
                                    height={392}
                                    priority
                                />
                                </label>
                            </li>
                            <li>
                                <input
                                id='choose_style4'
                                type="radio"
                                name='choose_style'
                                value="style4"
                                onChange={(e) => setCharacter(e.target.value)}
                                />
                                <label htmlFor="choose_style4">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/magnumotion/m-cowok-4.png"
                                    alt="icon"
                                    width={546}
                                    height={392}
                                    priority
                                />
                                </label>
                            </li>
                            <li>
                                <input
                                id='choose_style5'
                                type="radio"
                                name='choose_style'
                                value="style5"
                                onChange={(e) => setCharacter(e.target.value)}
                                />
                                <label htmlFor="choose_style5">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/magnumotion/m-cowok-5.png"
                                    alt="icon"
                                    width={546}
                                    height={392}
                                    priority
                                />
                                </label>
                            </li>
                            </ul> }
                            {genderFix && genderFix == 'cewek' &&
                            <ul className='choose mod4'>
                            <li>
                                <input
                                id='choose_style1'
                                type="radio"
                                name='choose_style'
                                value="style1-cewek"
                                onChange={(e) => setCharacter(e.target.value)}
                                />
                                <label htmlFor="choose_style1">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/magnumotion/m-cewek-1.png"
                                    alt="icon"
                                    width={546}
                                    height={392}
                                    priority
                                />
                                </label>
                            </li>
                            <li>
                                <input
                                id='choose_style2'
                                type="radio"
                                name='choose_style'
                                value="style2-cewek"
                                onChange={(e) => setCharacter(e.target.value)}
                                />
                                <label htmlFor="choose_style2">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/magnumotion/m-cewek-2.png"
                                    alt="icon"
                                    width={546}
                                    height={392}
                                    priority
                                />
                                </label>
                            </li>
                            <li>
                                <input
                                id='choose_style3'
                                type="radio"
                                name='choose_style'
                                value="style3-cewek"
                                onChange={(e) => setCharacter(e.target.value)}
                                />
                                <label htmlFor="choose_style3">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/magnumotion/m-cewek-3.png"
                                    alt="icon"
                                    width={546}
                                    height={392}
                                    priority
                                />
                                </label>
                            </li>
                            </ul> }
                        </div>
                    </div>
                </div>
                {character &&
                    <div className="relative w-full flex justify-center items-center mt-[-5rem] z-20">
                        <button className="relative mx-auto w-[100%] flex justify-center items-center" onClick={generateAI}>
                            <Image src='/magnumotion/btn-takephoto.png' width={750} height={224} alt='Zirolu' className='w-full' priority />
                        </button>
                    </div>
                }
            </div>
            {/* !PILIH STYLE */}
        </main>
    );
}
