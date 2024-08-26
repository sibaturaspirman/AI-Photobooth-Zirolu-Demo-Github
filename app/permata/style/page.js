'use client';

// import * as fal from '@fal-ai/serverless-client';
import Image from "next/image";
import { useEffect, useState, useMemo } from 'react';
// import TopLogoMizuho from "./../../components/TopLogoMizuho";
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
    const [styleFemale, setStyleFemale] = useState('normal');

    const generateAI = () => {
        let urlGambar = '';

        if(character == 'cowok'){
            let randomGambar = getRandomInt(1,6);
            urlGambar = 'https://ai.zirolu.id/pemata/m-'+randomGambar+'.jpg';

            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("styleFix", urlGambar)
                localStorage.setItem("formasiFix", character)
            }
        }else{
            if(styleFemale == 'normal'){
                let randomGambar = getRandomInt(1,2);
                urlGambar = 'https://ai.zirolu.id/pemata/style/f-'+randomGambar+'.jpg';
    
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem("styleFix", urlGambar)
                    localStorage.setItem("formasiFix", character)
                }
            }else{
                let randomGambar = getRandomInt(1,2);
                urlGambar = 'https://ai.zirolu.id/pemata/style/h-'+randomGambar+'.jpg';
    
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem("styleFix", urlGambar)
                    localStorage.setItem("formasiFix", character+' - '+styleFemale)
                }
            }
        }
        console.log(urlGambar)

        setTimeout(() => {
            router.push('/permata/cam');
        }, 100);
    }

    return (
        <main className="flex fixed h-full w-full bg-permata overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20" onContextMenu={(e)=> e.preventDefault()}>
            {/* <div className="fixed top-0 left-0 w-full h-full bg-iqos-border pointer-events-none z-10"></div> */}
            <div className="relative w-[70%] mx-auto mt-0">
            <Image src='/permata/identify.png' width={764} height={38} alt='Zirolu' className='w-full' priority />
            </div>
            {/* PILIH STYLE */}
            <div className={`relative w-[90%] mx-auto mt-10`}>
                <div className='relative mt-0 w-full'>
                    <div className='relative w-full'>
                        <div className='overflow-hidden w-full mx-auto'>
                            {/* STYLE SEMENTARA */}
                            <ul className='choose mod7'>
                            <li className='mb-10'>
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
                                    src="/permata/gender1.png"
                                    alt="icon"
                                    width={764}
                                    height={184}
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
                                    src="/permata/gender2.png"
                                    alt="icon"
                                    width={764}
                                    height={184}
                                    priority
                                />
                                </label>
                            </li>
                            </ul>
                        </div>


                        {character == 'cewek' &&
                        <div className="mt-10">
                            <ul className='choose4'>
                                {/* <li>
                                    <input
                                    id='choose_female'
                                    type="radio"
                                    name='choose_female'
                                    value="normal"
                                    onChange={(e) => setStyleFemale(e.target.value)}
                                    />
                                    <label htmlFor="choose_female" className='text-2xl'>Normal</label>
                                </li> */}
                                <li>
                                    <input
                                    id='choose_female3'
                                    type="radio"
                                    name='choose_female'
                                    value="normal"
                                    onChange={(e) => setStyleFemale(e.target.value)}
                                    />
                                    <label htmlFor="choose_female3" className='text-5xl'>without Hijab</label>
                                </li>
                                <li>
                                    <input
                                    id='choose_female2'
                                    type="radio"
                                    name='choose_female'
                                    value="hijab"
                                    onChange={(e) => setStyleFemale(e.target.value)}
                                    />
                                    <label htmlFor="choose_female2" className='text-5xl'>with Hijab</label>
                                </li>
                            </ul>
                        </div>
                        }
                    </div>
                </div>
                {/* {character && */}
                    <div className={`relative w-full flex justify-center items-center mt-[22rem] z-20 ${character ? `` : 'opacity-0 pointer-events-none'}`}>
                        <button className="relative mx-auto w-[100%] flex justify-center items-center" onClick={generateAI}>
                            <Image src='/permata/btn-continue.png' width={864} height={210} alt='Zirolu' className='w-full' priority />
                        </button>
                    </div>
                {/* } */}
            </div>
            {/* !PILIH STYLE */}
        </main>
    );
}
