'use client';

// import * as fal from '@fal-ai/serverless-client';
import Image from "next/image";
import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
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
    const [styleFemale, setStyleFemale] = useState('normal');
    const [styleMale, setStyleMale] = useState('normal');

    const generateAI = () => {
        let urlGambar = '';
        let urlGambar2 = '';
        let urlGambar3 = '';
        if(character == 'cowok'){
            let randomGambar = getRandomInt(1, 2);
            urlGambar = 'https://ai.zirolu.id/veev/style/m-'+randomGambar+'.png';
            // urlGambar = 'https://ai.zirolu.id/iqos/style/iqos-m-coba-'+1+'.jpeg';
            console.log(randomGambar)

            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("styleFix", urlGambar)
                localStorage.setItem("formasiFix", character)
            }
        }else if(character == 'cewek'){
            // let randomGambar = getRandomInt(1, 11);
            // urlGambar = 'https://ai.zirolu.id/iqos/style/iqos-w-'+randomGambar+'.jpeg';
            // // urlGambar = 'https://ai.zirolu.id/iqos/style/iqos-w-'+14+'.jpeg';
            // console.log(randomGambar)


            let randomGambar = getRandomInt(1, 2);
            if(styleFemale == 'normal'){
                urlGambar = 'https://ai.zirolu.id/veev/style/f-'+randomGambar+'.png'
            }else if(styleFemale == 'hijab'){
                urlGambar = 'https://ai.zirolu.id/veev/style/h-'+randomGambar+'.png'
            }

            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("styleFix", urlGambar)
                localStorage.setItem("formasiFix", character)
            }
        }
        console.log(character)
        console.log(urlGambar)

        // setTimeout(() => {
            router.push('/veev/cam');
        // }, 500);
    }

    return (
        <main className="flex fixed h-full w-full bg-veev overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20">
            <div className="relative w-[70%] mx-auto mt-[-5rem]">
            <Image src='/iqos/title-gender.png' width={562} height={62} alt='Zirolu' className='w-full' priority />
            </div>
            {/* PILIH STYLE */}
            <div className={`relative w-[90%] mx-auto mt-10`}>
                <div className='relative mt-0 w-full'>
                    <div className='relative w-full'>
                        <div className='overflow-hidden'>
                            {/* STYLE SEMENTARA */}
                            <ul className='choose mod4 mod4m'>
                            <li className='pr-2'>
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
                                    src="/veev/gender-male.png"
                                    alt="icon"
                                    width={592}
                                    height={600}
                                    priority
                                />
                                </label>
                            </li>
                            <li className='pl-2'>
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
                                    src="/veev/gender-female.png"
                                    alt="icon"
                                    width={592}
                                    height={600}
                                    priority
                                />
                                </label>
                            </li>
                            </ul>
                        </div>

                        {character == 'cewek' &&
                        <div className="w-full">
                            <ul className='choose4'>
                                <li>
                                    <input
                                    id='choose_female'
                                    type="radio"
                                    name='choose_female'
                                    value="normal"
                                    onChange={(e) => setStyleFemale(e.target.value)}
                                    />
                                    <label htmlFor="choose_female" className='text-2xl'>without Hijab</label>
                                </li>
                                <li>
                                    <input
                                    id='choose_female2'
                                    type="radio"
                                    name='choose_female'
                                    value="hijab"
                                    onChange={(e) => setStyleFemale(e.target.value)}
                                    />
                                    <label htmlFor="choose_female2" className='text-2xl'>with Hijab</label>
                                </li>
                                {/* <li>
                                    <input
                                    id='choose_female3'
                                    type="radio"
                                    name='choose_female'
                                    value="glasses"
                                    onChange={(e) => setStyleFemale(e.target.value)}
                                    />
                                    <label htmlFor="choose_female3" className='text-2xl'>with Glasses</label>
                                </li> */}
                            </ul>
                        </div>
                        }
                        {/* {character == 'cowok' &&
                        <div className="w-full">
                            <ul className='choose4'>
                                <li>
                                    <input
                                    id='choose_male2'
                                    type="radio"
                                    name='choose_male'
                                    value="normal"
                                    onChange={(e) => setStyleMale(e.target.value)}
                                    />
                                    <label htmlFor="choose_male2" className='text-2xl'>Default</label>
                                </li>
                                <li>
                                    <input
                                    id='choose_male3'
                                    type="radio"
                                    name='choose_male'
                                    value="glasses"
                                    onChange={(e) => setStyleMale(e.target.value)}
                                    />
                                    <label htmlFor="choose_male3" className='text-2xl'>with Glasses</label>
                                </li>
                            </ul>
                        </div>
                        } */}
                    </div>
                </div>
                {character &&
                    <div className="relative w-full mt-10 z-20">
                        <button className="relative mx-auto w-[100%] flex justify-center items-center" onClick={generateAI}>
                            <Image src='/veev/btn-takephoto.png' width={616} height={120} alt='Zirolu' className='w-full' priority />
                        </button>
                        <Link href='/veev' className="relative mx-auto w-[100%] flex justify-center items-center">
                            <Image src='/veev/btn-back.png' width={600} height={100} alt='Zirolu' className='w-full' priority />
                        </Link>
                    </div>
                }
            </div>
            {/* !PILIH STYLE */}
        </main>
    );
}
