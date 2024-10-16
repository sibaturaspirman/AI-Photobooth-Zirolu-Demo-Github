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
    const [formasiFix, setFormasiFix] = useState(null);
    useEffect(() => {
        // Perform localStorage action
        if (typeof localStorage !== 'undefined') {
            const item1 = localStorage.getItem('formasiFix')
            setFormasiFix(item1)
        }
    }, [formasiFix])

    const generateAI = () => {
        // let urlGambar = '';
        // let randomGambar = ''

        // if(character == 's1'){
        //     // let randomGambar = getRandomInt(1,6);
        //     let randomGambarDalem = '1';
        //     randomGambar = randomGambarDalem
        // }else if(character == 's2'){
        //     // let randomGambar = getRandomInt(1,6);
        //     let randomGambarDalem = '1';
        //     randomGambar = randomGambarDalem
        // }else if(character == 's3'){
        //     // let randomGambar = getRandomInt(1,6);
        //     let randomGambarDalem = '1';
        //     randomGambar = randomGambarDalem
        // }else if(character == 's4'){
        //     // let randomGambar = getRandomInt(1,6);
        //     let randomGambarDalem = '1';
        //     randomGambar = randomGambarDalem
        // }else if(character == 's5'){
        //     // let randomGambar = getRandomInt(1,6);
        //     let randomGambarDalem = '1';
        //     randomGambar = randomGambarDalem
        // }

        // urlGambar = 'https://ai.zirolu.id/comcon/visikom/style/'+formasiFix+'/'+character+'-'+randomGambar+'.jpg';
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem("motorFix", character)
        }
        // console.log(randomGambar)
        // console.log(urlGambar)

        setTimeout(() => {
            router.push('/comcon/mlb/cam');
        }, 100);
    }

    return (
        <main className="flex fixed h-full w-full bg-mlb overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20" onContextMenu={(e)=> e.preventDefault()}>
            {/* <div className="fixed top-0 left-0 w-full h-full bg-iqos-border pointer-events-none z-10"></div> */}
            <div className="fixed w-[40%] mx-auto top-[7rem] left-0 right-0">
            <Image src='/comcon/mlb/iam.png' width={584} height={189} alt='Zirolu' className='w-full' priority />
            </div>
            <div className="relative w-[85%] mx-auto mt-0">
            <Image src='/comcon/mlb/choose.png' width={784} height={120} alt='Zirolu' className='w-full' priority />
            </div>
            {/* PILIH STYLE */}
            <div className={`relative w-[95%] mx-auto mt-0`}>
                <div className='relative mt-0 w-full'>
                    <div className='relative w-full'>
                        <div className='w-full mx-auto'>
                            {/* STYLE SEMENTARA */}
                            <ul className='choose mod10'>
                            <li className='mb-0'>
                                <input
                                id='choose_style1'
                                type="radio"
                                name='choose_style'
                                value="s1"
                                onChange={(e) => setCharacter(e.target.value)}
                                />
                                <label htmlFor="choose_style1">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/comcon/mlb/motor1-slot.png"
                                    alt="icon"
                                    width={720}
                                    height={176}
                                    priority
                                />
                                <Image
                                    className="absolute top-[-34px] left-0 h-auto w-full"
                                    src="/comcon/mlb/motor1.png"
                                    alt="icon"
                                    width={720}
                                    height={176}
                                    priority
                                />
                                </label>
                            </li>
                            <li className='mb-0'>
                                <input
                                id='choose_style2'
                                type="radio"
                                name='choose_style'
                                value="s2"
                                onChange={(e) => setCharacter(e.target.value)}
                                />
                                <label htmlFor="choose_style2">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/comcon/mlb/motor2-slot.png"
                                    alt="icon"
                                    width={720}
                                    height={176}
                                    priority
                                />
                                <Image
                                    className="absolute top-[-34px] left-0 h-auto w-full"
                                    src="/comcon/mlb/motor2.png"
                                    alt="icon"
                                    width={720}
                                    height={176}
                                    priority
                                />
                                </label>
                            </li>
                            <li className='mb-0'>
                                <input
                                id='choose_style3'
                                type="radio"
                                name='choose_style'
                                value="s3"
                                onChange={(e) => setCharacter(e.target.value)}
                                />
                                <label htmlFor="choose_style3">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/comcon/mlb/motor3-slot.png"
                                    alt="icon"
                                    width={720}
                                    height={176}
                                    priority
                                />
                                <Image
                                    className="absolute top-[-34px] left-0 h-auto w-full"
                                    src="/comcon/mlb/motor3.png"
                                    alt="icon"
                                    width={720}
                                    height={176}
                                    priority
                                />
                                </label>
                            </li>
                            <li className='mb-0'>
                                <input
                                id='choose_style4'
                                type="radio"
                                name='choose_style'
                                value="s4"
                                onChange={(e) => setCharacter(e.target.value)}
                                />
                                <label htmlFor="choose_style4">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/comcon/mlb/motor4-slot.png"
                                    alt="icon"
                                    width={720}
                                    height={176}
                                    priority
                                />
                                <Image
                                    className="absolute top-[-34px] left-0 h-auto w-full"
                                    src="/comcon/mlb/motor4.png"
                                    alt="icon"
                                    width={720}
                                    height={176}
                                    priority
                                />
                                </label>
                            </li>
                            {/* <li>
                                <input
                                id='choose_style5'
                                type="radio"
                                name='choose_style'
                                value="s5"
                                onChange={(e) => setCharacter(e.target.value)}
                                />
                                <label htmlFor="choose_style5">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/comcon/visikom/sport5.jpg"
                                    alt="icon"
                                    width={720}
                                    height={176}
                                    priority
                                />
                                </label>
                            </li> */}
                            </ul>
                        </div>
                    </div>
                </div>
                {/* {character && */}
                    <div className={`relative w-full flex justify-center items-center mt-1 z-20 ${character ? `` : 'opacity-0 pointer-events-none'}`}>
                        <button className="relative mx-auto w-[90%] flex justify-center items-center" onClick={generateAI}>
                            <Image src='/comcon/mlb/btn-continue2.png' width={850} height={258} alt='Zirolu' className='w-full' priority />
                        </button>
                    </div>
                {/* } */}
            </div>
            {/* !PILIH STYLE */}
        </main>
    );
}
