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
    const [urlGambarFix, setUrlGambarFix] = useState(null);
    const [preview, setPreview] = useState(false);
    const [persen, setPersen] = useState(0);
    
    useEffect(() => {
        // Perform localStorage action
        if (typeof localStorage !== 'undefined') {
            const item1 = localStorage.getItem('formasiFix')
            setFormasiFix(item1)
        }
    }, [formasiFix])

    const generateAI = () => {
        let urlGambar = '';
        let randomGambar = ''

        if(character == 's1'){
            // let randomGambar = getRandomInt(1,6);
            let randomGambarDalem = '1';
            randomGambar = randomGambarDalem
        }else if(character == 's2'){
            // let randomGambar = getRandomInt(1,6);
            let randomGambarDalem = '1';
            randomGambar = randomGambarDalem
        }else if(character == 's3'){
            // let randomGambar = getRandomInt(1,6);
            let randomGambarDalem = '1';
            randomGambar = randomGambarDalem
        }else if(character == 's4'){
            // let randomGambar = getRandomInt(1,6);
            let randomGambarDalem = '1';
            randomGambar = randomGambarDalem
        }else if(character == 's5'){
            // let randomGambar = getRandomInt(1,6);
            let randomGambarDalem = '1';
            randomGambar = randomGambarDalem
        }

        urlGambar = 'https://ai.zirolu.id/comcon/visikom/style/'+formasiFix+'/'+character+'-'+randomGambar+'.jpg';
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem("styleFix", urlGambar)
        }
        console.log(randomGambar)
        console.log(urlGambar)
        setUrlGambarFix(urlGambar)



        setTimeout(() => {
            setPersen(10)
            setPreview(true)
            setTimeout(() => {
                setPersen(35)
                setTimeout(() => {
                    setPersen(47)
                    setTimeout(() => {
                        setPersen(68)
                        setTimeout(() => {
                            setPersen(88)
                            setTimeout(() => {
                                setPersen(100)
                                setTimeout(() => {
                                    router.push('/comcon/visikom/cam');
                                }, 500);
                            }, 400);
                        }, 300);
                    }, 200);
                }, 300);
            }, 1000);
        }, 100);
    }

    return (
        <main className="flex fixed h-full w-full bg-visikom overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20" onContextMenu={(e)=> e.preventDefault()}>
            <div className="fixed top-0 left-0 w-full h-full bg-iqos-border pointer-events-none z-50"></div>
            <div className="relative w-[85%] mx-auto mt-0">
            <Image src='/comcon/visikom/selectsport.png' width={784} height={120} alt='Zirolu' className='w-full' priority />
            </div>


            {/* PREVIEW */}
            {preview && 
                <div className='absolute top-0 bg-visikom left-0 right-0 bottom-0 flex items-center justify-center flex-col z-40 bg-black bg-opacity-0'>
                    <div className={`relative w-[60%] mx-auto mb-10`}>
                        <Image src='/comcon/visikom/logo-prepare.png' width={668} height={370} alt='Zirolu' className='w-full' priority />
                    </div>
                    <div className='relative z-10 w-full'>
                        <div className={`relative w-[50%] border-8 mx-auto flex`}>
                            <Image src={urlGambarFix}  width={636} height={1132} alt='Zirolu' className='relative block w-full'></Image>
                        </div>
                    </div>
                    <div className='text-center mt-10'>
                        <p className='text-8xl font-bold'><span>{persen}</span>%</p>
                        <p className='uppercase text-5xl mt-5'>processing</p>
                    </div>
                </div>
            }
            {/* PREVIEW */}

            {/* PILIH STYLE */}
            <div className={`relative w-[80%] mx-auto mt-10`}>
                <div className='relative mt-0 w-full'>
                    <div className='relative w-full'>
                        <div className='overflow-hidden w-full mx-auto'>
                            {/* STYLE SEMENTARA */}
                            <ul className='choose mod10'>
                            <li className='mb-3'>
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
                                    src="/comcon/visikom/sport1.jpg"
                                    alt="icon"
                                    width={720}
                                    height={176}
                                    priority
                                />
                                <Image
                                    className="absolute top-0 left-0 h-auto w-full"
                                    src="/comcon/visikom/sport1_c.jpg"
                                    alt="icon"
                                    width={720}
                                    height={176}
                                    priority
                                />
                                </label>
                            </li>
                            <li className='mb-3'>
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
                                    src="/comcon/visikom/sport2.jpg"
                                    alt="icon"
                                    width={720}
                                    height={176}
                                    priority
                                />
                                <Image
                                    className="absolute top-0 left-0 h-auto w-full"
                                    src="/comcon/visikom/sport2_c.jpg"
                                    alt="icon"
                                    width={720}
                                    height={176}
                                    priority
                                />
                                </label>
                            </li>
                            <li className='mb-3'>
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
                                    src="/comcon/visikom/sport3.jpg"
                                    alt="icon"
                                    width={720}
                                    height={176}
                                    priority
                                />
                                <Image
                                    className="absolute top-0 left-0 h-auto w-full"
                                    src="/comcon/visikom/sport3_c.jpg"
                                    alt="icon"
                                    width={720}
                                    height={176}
                                    priority
                                />
                                </label>
                            </li>
                            <li className='mb-3'>
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
                                    src="/comcon/visikom/sport4.jpg"
                                    alt="icon"
                                    width={720}
                                    height={176}
                                    priority
                                />
                                <Image
                                    className="absolute top-0 left-0 h-auto w-full"
                                    src="/comcon/visikom/sport4_c.jpg"
                                    alt="icon"
                                    width={720}
                                    height={176}
                                    priority
                                />
                                </label>
                            </li>
                            <li>
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
                                <Image
                                    className="absolute top-0 left-0 h-auto w-full"
                                    src="/comcon/visikom/sport5_c.jpg"
                                    alt="icon"
                                    width={720}
                                    height={176}
                                    priority
                                />
                                </label>
                            </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* {character && */}
                    <div className={`relative w-full flex justify-center items-center mt-1 z-20 ${character ? `` : 'opacity-0 pointer-events-none'}`}>
                        <button className="relative mx-auto w-[100%] flex justify-center items-center" onClick={generateAI}>
                            <Image src='/comcon/visikom/btn-continue.png' width={850} height={258} alt='Zirolu' className='w-full' priority />
                        </button>
                    </div>
                {/* } */}
            </div>
            {/* !PILIH STYLE */}
        </main>
    );
}
