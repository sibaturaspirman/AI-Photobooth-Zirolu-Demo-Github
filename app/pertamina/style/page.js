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
        if(character == 'cowok'){
            urlGambar = 'https://ai.zirolu.id/pertamina/style/cowok-'+getRandomInt(1, 8)+'.jpeg';

            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("styleFix", urlGambar)
                localStorage.setItem("formasiFix", character)
            }
        }else if(character == 'cewek'){
            urlGambar = 'https://ai.zirolu.id/pertamina/style/cewek-'+getRandomInt(1, 8)+'.jpeg';

            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("styleFix", urlGambar)
                localStorage.setItem("formasiFix", character)
            }
        }else if(character == 'hijab'){
            urlGambar = 'https://ai.zirolu.id/pertamina/style/hijab-'+getRandomInt(1, 7)+'.jpeg';

            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("styleFix", urlGambar)
                localStorage.setItem("formasiFix", character)
            }
        }
        console.log(character)
        console.log(urlGambar)
        console.log(urlGambar2)
        console.log(urlGambar3)

        setTimeout(() => {
            router.push('/pertamina/cam');
        }, 100);
    }

    return (
        <main className="flex fixed h-full w-full bg-mizuho overflow-auto flex-col items-center pt-2 pb-5 px-5 lg:pt-5 lg:px-20">
            <div className="flex relative h-full w-fulll max-w-xl overflow-auto flex-col items-center">
                <TopLogoMizuho></TopLogoMizuho>
                <h1 className={`text-center text-2xl lg:mt-4 mb-0 ${paytone_one.className}`}>IDENTIFY YOURSELF</h1>
                {/* <h2 className={`text-center text-base mb-0 uppercase  ${paytone_one.className}`}>The style will be random GENErATE by AI</h2> */}
                {/* PILIH STYLE */}
                <div className={`relative w-[100%] mx-auto`}>
                    <div className='relative mt-0 w-full'>
                        <div className='relative w-full'>
                            <div className='overflow-hidden mt-[-0.6rem]'>
                                {/* STYLE SEMENTARA */}
                                <ul className='choose mod2'>
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
                                        src="/pertamina/style-1.png"
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
                                    value="cewek"
                                    onChange={(e) => setCharacter(e.target.value)}
                                    />
                                    <label htmlFor="choose_style2">
                                    <Image
                                        className="relative h-auto w-full"
                                        src="/pertamina/style-2.png"
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
                                    value="hijab"
                                    onChange={(e) => setCharacter(e.target.value)}
                                    />
                                    <label htmlFor="choose_style3">
                                    <Image
                                        className="relative h-auto w-full"
                                        src="/pertamina/style-3.png"
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
                    <div className="relative w-full flex justify-center items-center mt-[-1rem] z-20 opacity-0  pointer-events-none">
                        <button className="relative mx-auto w-[70%] flex justify-center items-center" onClick={generateAI}>
                            <Image src='/mizuho/btn-next.png' width={410} height={96} alt='Zirolu' className='w-full' priority />
                        </button>
                    </div>
                </div>
                {/* !PILIH STYLE */}
            </div>
        </main>
    );
}
