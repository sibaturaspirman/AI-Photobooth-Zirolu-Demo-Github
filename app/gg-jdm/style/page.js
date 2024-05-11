'use client';

// import * as fal from '@fal-ai/serverless-client';
import Image from "next/image";
import { useEffect, useState, useMemo } from 'react';
import TopLogoGG from "../../components/TopLogoGG";
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
        if(character == 'casual'){
            urlGambar = 'https://ai.zirolu.id/ggjdm/style/new-casual-'+getRandomInt(1, 4)+'.jpeg';
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("styleFix", urlGambar)
            }
        }else if(character == 'formal'){
            urlGambar = 'https://ai.zirolu.id/ggjdm/style/new-formal-'+getRandomInt(1, 4)+'.jpeg';
            // urlGambar = 'https://ai.zirolu.id/ggjdm/style/new-formal-1.jpeg';
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("styleFix", urlGambar)
            }
        }else if(character == 'cewek'){
            urlGambar = 'https://ai.zirolu.id/ggjdm/style/new-cewek-'+getRandomInt(1, 4)+'.jpeg';
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("styleFix", urlGambar)
            }
        }else if(character == 'hijab'){
            urlGambar = 'https://ai.zirolu.id/ggjdm/style/new-hijab-'+getRandomInt(1, 4)+'.jpeg';
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("styleFix", urlGambar)
            }
        }
        console.log(character)
        console.log(urlGambar)

        if (typeof localStorage !== 'undefined') {
            localStorage.setItem("styleGeneral", character)
        }

        router.push('/gg-jdm/cam');
    }
    return (
        <main className="flex fixed h-full w-full bg-ggjdm overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-12 lg:px-10">
            <TopLogoGG></TopLogoGG>
            <div className="relative w-[60%] mx-auto mt-0]">
            <Image src='/ggjdm/title-style-new.png' width={1736} height={234} alt='Zirolu' className='w-full' priority />
            </div>
            {/* PILIH STYLE */}
            <div className="fixed top-0 left-0 w-[250px] h-[250px]">
                <div className="pilihshadow">
                    <input
                    id='choose_style3'
                    type="radio"
                    name='choose_style'
                    value="cewek"
                    onChange={(e) => setCharacter(e.target.value)}
                    />
                        <label htmlFor="choose_style3"></label>
                </div>
            </div>
            <div className="fixed top-0 right-0 w-[250px] h-[250px]">
                <div className="pilihshadow">
                    <input
                    id='choose_style4'
                    type="radio"
                    name='choose_style'
                    value="hijab"
                    onChange={(e) => setCharacter(e.target.value)}
                    />
                        <label htmlFor="choose_style4"></label>
                </div>
            </div>

            <div className={`relative w-full mx-auto mt-10`}>
                <div className='relative mt-0 w-full'>
                    <div className='relative w-full'>
                        <div className='overflow-hidden'>
                            <div className='px-12 '>
                            <ul className='choose mod6'>
                            <li>
                                <input
                                id='choose_style1'
                                type="radio"
                                name='choose_style'
                                value="casual"
                                onChange={(e) => setCharacter(e.target.value)}
                                />
                                <label htmlFor="choose_style1">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/ggjdm/style-1.png"
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
                                value="formal"
                                onChange={(e) => setCharacter(e.target.value)}
                                />
                                <label htmlFor="choose_style2">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/ggjdm/style-2.png"
                                    alt="icon"
                                    width={546}
                                    height={392}
                                    priority
                                />
                                </label>
                            </li>
                            </ul></div>
                        </div>
                    </div>
                </div>
                {/* {character && */}
                    <div className={`relative w-full flex justify-center items-center mt-10 z-20  ${character ? `` : 'opacity-20 pointer-events-none'}`}>
                        <button className="relative mx-auto w-[80%] flex justify-center items-center" onClick={generateAI}>
                            <Image src='/ggjdm/btn-next.png' width={750} height={224} alt='Zirolu' className='w-full' priority />
                        </button>
                    </div>
                {/* } */}
            </div>
            {/* !PILIH STYLE */}
        </main>
    );
}
