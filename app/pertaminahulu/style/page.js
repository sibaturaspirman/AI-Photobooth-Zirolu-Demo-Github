'use client';

import * as fal from '@fal-ai/serverless-client';
import Image from "next/image";
import { useEffect, useState, useMemo } from 'react';
import TopLogoAmigo from "./../../components/TopLogoAmigo";
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
        // let urlGambar = '';
        // let urlGambar2 = '';
        // let urlGambar3 = '';
        // if(character == 'formasi-1'){
        //     // urlGambar = 'https://ai.zirolu.id/porseni/m-'+getRandomInt(1, 6)+'.jpg';

        //     if (typeof localStorage !== 'undefined') {
        //         // localStorage.setItem("styleFix", urlGambar)
        //         localStorage.setItem("formasiFix", character)
        //     }
        // }else if(character == 'formasi-2'){
        //     // urlGambar = 'https://ai.zirolu.id/porseni/f-'+getRandomInt(1, 5)+'.jpg';

        //     if (typeof localStorage !== 'undefined') {
        //         // localStorage.setItem("styleFix", urlGambar)
        //         localStorage.setItem("formasiFix", character)
        //     }
        // }else if(character == 'formasi-3'){
        //     // urlGambar = 'https://ai.zirolu.id/porseni/h-'+getRandomInt(1, 4)+'.jpg';

        //     if (typeof localStorage !== 'undefined') {
        //         // localStorage.setItem("styleFix", urlGambar)
        //         localStorage.setItem("formasiFix", character)
        //     }
        // }
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem("formasiFix", character)
        }
        console.log(character)
        // console.log(urlGambar)
        // console.log(urlGambar2)
        // console.log(urlGambar3)

        setTimeout(() => {
            router.push('/pertaminahulu/style2');
        }, 500);
    }

    return (
        <main className="flex fixed h-full w-full bg-mizuho overflow-auto flex-col items-center pt-2 pb-5 px-5 lg:pt-5 lg:px-20">
            <div className="flex relative h-full w-full max-w-screen-sm overflow-auto flex-col items-center">
                <TopLogoAmigo></TopLogoAmigo>
                <h1 className={`text-center text-2xl mt-2 mb-0 ${paytone_one.className}`}>CHOOSE GENDER</h1>
                {/* <h2 className={`text-center text-base mb-0 uppercase  ${paytone_one.className}`}>The style will be random GENErATE by AI</h2> */}
                {/* PILIH STYLE */}
                <div className={`relative w-full mx-auto`}>
                    <div className='relative mt-0 w-full'>
                        <div className='relative w-full'>
                            <div className='overflow-hidden w-full mt-[-0.6rem]'>
                                {/* STYLE SEMENTARA */}
                                <ul className='choose mod2'>
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
                                        src="/inlay/formasi-1.png"
                                        alt="icon"
                                        width={365}
                                        height={640}
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
                                        src="/inlay/formasi-2.png"
                                        alt="icon"
                                        width={365}
                                        height={640}
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
                                        src="/inlay/formasi-3.png"
                                        alt="icon"
                                        width={365}
                                        height={640}
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
                            <button className="relative mx-auto w-[70%] flex justify-center items-center" onClick={generateAI}>
                                <Image src='/mizuho/btn-next.png' width={410} height={96} alt='Zirolu' className='w-full' priority />
                            </button>
                        </div>
                    }
                </div>
                {/* !PILIH STYLE */}
            </div>
        </main>
    );
}
