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
        let urlGambar4 = '';
        if(character == 'style1'){
            urlGambar = 'https://ai.zirolu.id/magnumotion/style/hammersonic-new-cowok1a.jpeg';
            urlGambar2 = 'https://ai.zirolu.id/magnumotion/style/hammersonic-new-cowok1b.jpeg';
            urlGambar3 = 'https://ai.zirolu.id/magnumotion/style/hammersonic-new-cowok1c.jpeg';
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("styleFix", urlGambar)
                localStorage.setItem("styleFix2", urlGambar2)
                localStorage.setItem("styleFix3", urlGambar3)
            }
        }else if(character == 'style2'){
            urlGambar = 'https://ai.zirolu.id/magnumotion/style/hammersonic-new-cowok2a.jpeg';
            urlGambar2 = 'https://ai.zirolu.id/magnumotion/style/hammersonic-new-cowok2b.jpeg';
            urlGambar3 = 'https://ai.zirolu.id/magnumotion/style/hammersonic-new-cowok2c.jpeg';
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("styleFix", urlGambar)
                localStorage.setItem("styleFix2", urlGambar2)
                localStorage.setItem("styleFix3", urlGambar3)
            }
        }else if(character == 'style3'){
            urlGambar = 'https://ai.zirolu.id/magnumotion/style/hammersonic-new-cowok3a.jpeg';
            urlGambar2 = 'https://ai.zirolu.id/magnumotion/style/hammersonic-new-cowok3b.jpeg';
            urlGambar3 = 'https://ai.zirolu.id/magnumotion/style/hammersonic-new-cowok3c.jpeg';
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("styleFix", urlGambar)
                localStorage.setItem("styleFix2", urlGambar2)
                localStorage.setItem("styleFix3", urlGambar3)
            }
        }else if(character == 'style4'){
            urlGambar = 'https://ai.zirolu.id/magnumotion/style/hammersonic-new-cowok4a.jpeg';
            urlGambar2 = 'https://ai.zirolu.id/magnumotion/style/hammersonic-new-cowok4b.jpeg';
            urlGambar3 = 'https://ai.zirolu.id/magnumotion/style/hammersonic-new-cowok4c.jpeg';
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("styleFix", urlGambar)
                localStorage.setItem("styleFix2", urlGambar2)
                localStorage.setItem("styleFix3", urlGambar3)
            }
        }else if(character == 'style5'){
            urlGambar = 'https://ai.zirolu.id/magnumotion/style/hammersonic-new-cowok-band-1.jpeg';
            urlGambar2 = 'https://ai.zirolu.id/magnumotion/style/hammersonic-new-cowok-band-2.jpeg';
            urlGambar3 = 'https://ai.zirolu.id/magnumotion/style/hammersonic-new-cowok-band-3.jpeg';
            urlGambar4 = 'https://ai.zirolu.id/magnumotion/style/hammersonic-new-cowok-band-4.jpeg';
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("styleFix", urlGambar)
                localStorage.setItem("styleFix2", urlGambar2)
                localStorage.setItem("styleFix3", urlGambar3)
                localStorage.setItem("styleFix4", urlGambar4)
            }
        }else if(character == 'style1-cewek'){
            // let randomGambar = getRandomInt(1, 11);
            urlGambar = 'https://ai.zirolu.id/magnumotion/style/hammersonic-new-cewe1a.jpeg';
            urlGambar2 = 'https://ai.zirolu.id/magnumotion/style/hammersonic-new-cewe1b.jpeg';
            urlGambar3 = 'https://ai.zirolu.id/magnumotion/style/hammersonic-new-cewe1c.jpeg';
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("styleFix", urlGambar)
                localStorage.setItem("styleFix2", urlGambar2)
                localStorage.setItem("styleFix3", urlGambar3)
            }
        }else if(character == 'style2-cewek'){
            // let randomGambar = getRandomInt(1, 11);
            urlGambar = 'https://ai.zirolu.id/magnumotion/style/hammersonic-new-cewe2a.jpeg';
            urlGambar2 = 'https://ai.zirolu.id/magnumotion/style/hammersonic-new-cewe2b.jpeg';
            urlGambar3 = 'https://ai.zirolu.id/magnumotion/style/hammersonic-new-cewe2c.jpeg';
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("styleFix", urlGambar)
                localStorage.setItem("styleFix2", urlGambar2)
                localStorage.setItem("styleFix3", urlGambar3)
            }
        }else if(character == 'style3-cewek'){
            urlGambar = 'https://ai.zirolu.id/magnumotion/style/hammersonic-new-cewek-band-1.jpeg';
            urlGambar2 = 'https://ai.zirolu.id/magnumotion/style/hammersonic-new-cewek-band-2.jpeg';
            urlGambar3 = 'https://ai.zirolu.id/magnumotion/style/hammersonic-new-cewek-band-3.jpeg';
            urlGambar4 = 'https://ai.zirolu.id/magnumotion/style/hammersonic-new-cewek-band-4.jpeg';
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("styleFix", urlGambar)
                localStorage.setItem("styleFix2", urlGambar2)
                localStorage.setItem("styleFix3", urlGambar3)
                localStorage.setItem("styleFix4", urlGambar4)
            }
        }
        console.log(character)
        console.log(urlGambar)

        if (typeof localStorage !== 'undefined') {
            localStorage.setItem("styleGeneral", character)
        }

        if(character == 'style5' || character == 'style3-cewek'){
            router.push('/magnumotion/cam/camband');
        }else{
            router.push('/magnumotion/cam');
        }
    }

    return (
        <main className="flex fixed h-full w-full bg-magnumotion overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-12 lg:px-10">
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
                                    src="/magnumotion/m-new-cowok-1.png"
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
                                    src="/magnumotion/m-new-cowok-2.png"
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
                                    src="/magnumotion/m-new-cowok-3.png"
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
                                    src="/magnumotion/m-new-cowok-4.png"
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
                                    src="/magnumotion/m-new-cowok-5.png"
                                    alt="icon"
                                    width={546}
                                    height={392}
                                    priority
                                />
                                </label>
                            </li>
                            </ul> }
                            {genderFix && genderFix == 'cewek' &&
                            <div className='px-12 '>
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
                                    src="/magnumotion/m-new-cewek-1.png"
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
                                    src="/magnumotion/m-new-cewek-2.png"
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
                                    src="/magnumotion/m-new-cewek-3.png"
                                    alt="icon"
                                    width={546}
                                    height={392}
                                    priority
                                />
                                </label>
                            </li>
                            </ul></div> }
                        </div>
                    </div>
                </div>
                {character &&
                    <div className="relative w-full flex justify-center items-center mt-0 z-20">
                        <button className="relative mx-auto w-[80%] flex justify-center items-center" onClick={generateAI}>
                            <Image src='/magnumotion/btn-takephoto.png' width={750} height={224} alt='Zirolu' className='w-full' priority />
                        </button>
                    </div>
                }
            </div>
            {/* !PILIH STYLE */}
        </main>
    );
}
