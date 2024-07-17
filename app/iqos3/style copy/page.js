'use client';

import * as fal from '@fal-ai/serverless-client';
import Image from "next/image";
import { useEffect, useState, useMemo } from 'react';
import TopLogoMizuho from "../../components/TopLogoMizuho";
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
    const [desti, setDesti] = useState(null);

    const generateAI = () => {
        let urlGambar = '';
        let urlGambar2 = '';
        let urlGambar3 = '';
        if(character == 'cowok'){
            let randomGambar = getRandomInt(1, 2);
            // urlGambar = 'https://ai.zirolu.id/iqos/nusantara/cowok-'+desti+'.jpg';
            // console.log(randomGambar)

            if(desti == 'komodo'){
                urlGambar = 'https://ai.zirolu.id/iqos/nusantara/cowok-'+desti+'-'+randomGambar+'.jpg';
            }else{
                urlGambar = 'https://ai.zirolu.id/iqos/nusantara/cowok-'+desti+'.jpg';
            }

            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("styleFix", urlGambar)
                localStorage.setItem("formasiFix", character+' - '+desti)
            }
        }else if(character == 'cewek'){
            let randomGambar = getRandomInt(1, 2);
            // urlGambar = 'https://ai.zirolu.id/iqos/nusantara/cewek-'+desti+'.jpg';
            // console.log(randomGambar)

            if(desti == 'nias'){
                urlGambar = 'https://ai.zirolu.id/iqos/nusantara/cewek-'+desti+'-'+randomGambar+'.jpg';
            }else{
                urlGambar = 'https://ai.zirolu.id/iqos/nusantara/cewek-'+desti+'.jpg';
            }

            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("styleFix", urlGambar)
                localStorage.setItem("formasiFix", character+' - '+desti)
            }
        }
        console.log(character)
        console.log(urlGambar)

        // setTimeout(() => {
            router.push('/iqos2/cam');
        // }, 500);
    }

    return (
        <main className="flex fixed h-full w-full bg-iqos-neon overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20">
            {/* <div className="fixed top-0 left-0 w-full h-full bg-iqos-border pointer-events-none z-10"></div> */}
            <div className="relative w-[90%] mx-auto mt-0">
            <Image src='/iqos/neon/select.png' width={803} height={97} alt='Zirolu' className='w-full' priority />
            </div>
            {/* PILIH STYLE */}
            <div className={`relative w-[90%] mx-auto mt-10`}>
                <div className='relative mt-0 w-full'>
                    <div className='relative w-full'>
                        <div className='overflow-hidden w-[50%] mx-auto'>
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
                                    src="/iqos/neon/style1.png"
                                    alt="icon"
                                    width={421}
                                    height={554}
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
                                    src="/iqos/neon/style2.png"
                                    alt="icon"
                                    width={421}
                                    height={554}
                                    priority
                                />
                                </label>
                            </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {character &&
                    <div className="relative w-full flex justify-center items-center mt-5 z-20">
                        <button className="relative mx-auto w-[100%] flex justify-center items-center" onClick={generateAI}>
                            <Image src='/iqos/neon/btn-continue.png' width={775} height={180} alt='Zirolu' className='w-full' priority />
                        </button>
                    </div>
                }
            </div>
            {/* !PILIH STYLE */}
        </main>
    );
}
