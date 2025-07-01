'use client';

// import * as fal from '@fal-ai/serverless-client';
import Image from "next/image";
import { useEffect, useState, useMemo } from 'react';
import BgWaveCustom from "../../components/BgWaveCustom";
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
    const [hijab, setHijab] = useState(false);
    const [getProduct, setGetProduct] = useState(null);
    const [getInterest, setGetInterest] = useState(null);

    useEffect(() => {
        // Perform localStorage action
        if (typeof localStorage !== 'undefined') {
            const item1 = localStorage.getItem('bondsProduct')
            const item2 = localStorage.getItem('bondsInterest')
            setGetProduct(item1)
            setGetInterest(item2)
        }
    }, [getProduct, getInterest])

    const generateAI = () => {
        let urutanFIX = getRandomInt(1,3)
        if(character == 'cowok'){
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("formasiFix", 'MALE')
                localStorage.setItem("styleFix", "MALE_"+getProduct+"_"+getInterest)
            }
        }else{
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("formasiFix", 'FEMALE')
                localStorage.setItem("styleFix", "FEMALE_"+getProduct+"_"+getInterest)
            }
            // if(!hijab){
            //     if (typeof localStorage !== 'undefined') {
            //         localStorage.setItem("formasiFix", 'FEMALE')
            //         localStorage.setItem("styleFix", "FEMALE_"+getProduct+"_"+getInterest)
            //     }
            // }else{
            //     if (typeof localStorage !== 'undefined') {
            //         localStorage.setItem("formasiFix", 'HIJAB')
            //         localStorage.setItem("urlFix", "https://ai.zirolu.id/iqos/prj/HIJAB-"+urutanFIX+"-MOD.jpg")
            //     }
            // }
        }

        localStorage.setItem("urutanFix", urutanFIX)

        setTimeout(() => {
            router.push('/iqos-bonds/cam');
        }, 100);
    }

    const toggleHijab = () => {
        if(hijab){
            setHijab(false)
        }else{
            setHijab(true)
        }
    }

    return (
        <main className="flex fixed bg-iqos-bonds h-full w-full overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20" onContextMenu={(e)=> e.preventDefault()}>
            {/* <BgWaveCustom bg={'/iqos/bonds-bg.jpg'}></BgWaveCustom> */}
            <div className="fixed top-0 left-0 w-full h-full bg-iqos-border pointer-events-none z-10 hidden lg:block"></div>
            <div className="relative w-[30%] lg:w-[90%] mx-auto mb-0">
            <Image src='/iqos/bonds-select.png' width={871} height={67} alt='Zirolu' className='w-full' priority />
            </div>
            {/* PILIH STYLE */}
            <div className={`relative w-[90%] mx-auto mt-0`}>
                <div className='relative mt-0 w-full'>
                    {/* <div className="relative w-[30%] lg:w-[90%] mx-auto mb-10">
                    <Image src='/iqos/prj-identify.png' width={562} height={72} alt='Zirolu' className='w-full' priority />
                    </div> */}
                    <div className='relative w-full'>
                        <div className='overflow-hiddenx w-full mx-auto'>
                            {/* STYLE SEMENTARA */}
                            <ul className='choose mod10'>
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
                                    src="/iqos/bonds-gender1.png"
                                    alt="icon"
                                    width={871}
                                    height={188}
                                    priority
                                />
                                <Image
                                    className="absolute top-0 left-0 h-auto w-full"
                                    src="/iqos/bonds-gender1_c.png"
                                    alt="icon"
                                    width={871}
                                    height={188}
                                    priority
                                />
                                </label>
                            </li>
                            <li className="!mb-0">
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
                                    src="/iqos/bonds-gender2.png"
                                    alt="icon"
                                    width={871}
                                    height={188}
                                    priority
                                />
                                <Image
                                    className="absolute top-0 left-0 h-auto w-full"
                                    src="/iqos/bonds-gender2_c.png"
                                    alt="icon"
                                    width={871}
                                    height={188}
                                    priority
                                />
                                </label>
                            </li>
                            </ul>
                        </div>


                        {/* {character == 'cewek' && */}
                        {/* <div className={`mt-0 relative w-full p-10  ${character == 'cewek' ? `` : 'opacity-0 pointer-events-none'}`}>
                            <div className="relative w-full" onClick={toggleHijab}>
                                <Image
                                    className={`relative h-auto w-full ${hijab ? `opacity-0 pointer-events-none` : ''}`}
                                    src="/iqos/prj-hijab.png"
                                    alt="icon"
                                    width={720}
                                    height={176}
                                    priority
                                />
                                <Image
                                    className={`absolute top-0 left-0 h-auto w-full ${hijab ? `` : 'opacity-0 pointer-events-none'}`}
                                    src="/iqos/prj-hijab_c.png"
                                    alt="icon"
                                    width={720}
                                    height={176}
                                    priority
                                />
                            </div>
                        </div> */}
                        {/* } */}
                    </div>
                </div>
                {/* {character && */}
                    <div className={`relative w-full flex justify-center items-center mt-2 lg:mt-[9rem] z-20 ${character ? `` : 'opacity-0 pointer-events-none'}`}>
                        <button className="relative mx-auto w-[60%] flex justify-center items-center" onClick={generateAI}>
                            <Image src='/iqos/bonds-next.png' width={407} height={160} alt='Zirolu' className='w-full' priority />
                        </button>
                    </div>
                {/* } */}
            </div>
            {/* !PILIH STYLE */}
        </main>
    );
}
