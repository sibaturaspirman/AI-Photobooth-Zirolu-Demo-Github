'use client';

import * as fal from '@fal-ai/serverless-client';
// import ReactPlayer from 'react-player'
import Image from "next/image";
import { useEffect, useState, useMemo, useRef } from 'react';
// import { Poppins} from "next/font/google";
// const poppins = Poppins({ subsets: ["latin"], weight: ['400','700', '900'] });
import { getCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
// import io from 'socket.io-client';

// @snippet:start(client.config)
fal.config({
    // credentials: 'FAL_KEY_ID:FAL_KEY_SECRET',
    requestMiddleware: fal.withProxy({
      targetUrl: '/api/fal/proxy', // the built-int nextjs proxy
      // targetUrl: 'http://localhost:3333/api/fal/proxy', // or your own external proxy
    }),
});

// DATA BASE AI
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let URL_RESULT = ''
let FACE_URL_RESULT = ''
export default function GenerateAmero() {
    const router = useRouter();

    const [imageFile, setImageFile] = useState(null);
    const [styleGender, setStyleGender] = useState(null);
    const [character, setCharacter] = useState(null);

    const [payload, setPayload] = useState({
        name: 'GAC',
        phone: '000',
    });
    
    const [numProses, setNumProses] = useState(0);
    const [numProses1, setNumProses1] = useState(null);
    // Result state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);
    const [resultFaceSwap, setResultFaceSwap] = useState(null);
    const [logs, setLogs] = useState([]);
    const [elapsedTime, setElapsedTime] = useState(0);
    // @snippet:end
    useEffect(() => {
        // Perform localStorage action
        if (typeof localStorage !== 'undefined') {
            const item = localStorage.getItem('faceImage')
            setImageFile(item)
        }
    }, [imageFile])

    const generateAI = () => {
        setNumProses1(true)
        
        if(styleGender =='male'){
            setTimeout(() => {
                generateImageSwap(styleGender, getRandomInt(1, 3))
            }, 500);
        }else if(styleGender =='female'){
            setTimeout(() => {
                generateImageSwap(styleGender, getRandomInt(1, 3))
            }, 500);
        }else if(styleGender =='hijab'){
            setTimeout(() => {
                // MALAM
                generateImageSwap(styleGender, getRandomInt(1, 5))

                // SIANG
                // generateImageSwap(styleGender, getRandomInt(1, 3))
            }, 500);
        }

    }

    const image = useMemo(() => {
      if (!result) {
        return null;
      }
      if (result.image) {
        return result.image;
      }
      
    }, [result]);
    const imageFaceSwap = useMemo(() => {
      if (!resultFaceSwap) {
        return null;
      }
      if (resultFaceSwap.image) {
        return resultFaceSwap.image;
      }
      return null;
    }, [resultFaceSwap]);
    
    const reset = () => {
      setLoading(false);
      setError(null);
      setResult(null);
      setResultFaceSwap(null);
      setLogs([]);
      setElapsedTime(0);
    };
    const reset2 = () => {
      setLoading(false);
      setError(null);
      // setLogs([]);
      setElapsedTime(0);
    };

    const toDataURL = url => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
    }))


    const generateImageSwap = async (gender, number) => {
        // MALAM
        const urlGambar = 'https://ai.zirolu.id/gac/style/new-'+gender+'-'+number+'.jpeg'

        console.log(urlGambar)
        setNumProses(2)
        reset2();
        // @snippet:start("client.queue.subscribe")
        setLoading(true);
        const start = Date.now();
        try {
        const result = await fal.subscribe(
            'fal-ai/face-swap',
            {
            input: {
                // base_image_url: URL_RESULT,
                // swap_image_url: '/amero/base/'+character
                base_image_url: urlGambar,
                swap_image_url: imageFile
            },
            pollInterval: 5000, // Default is 1000 (every 1s)
            logs: true,
            onQueueUpdate(update) {
                setElapsedTime(Date.now() - start);
                if (
                update.status === 'IN_PROGRESS' ||
                update.status === 'COMPLETED'
                ) {
                setLogs((update.logs || []).map((log) => log.message));
                }
            },
            }
        );
        setResultFaceSwap(result);
        FACE_URL_RESULT = result.image.url;

        // emitStrsing("sendImage", result.image.url);

        toDataURL(FACE_URL_RESULT)
        .then(async dataUrl => {
            // console.log('RESULT:', dataUrl)

            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("resulAIBase64", dataUrl)
                localStorage.setItem("faceURLResult", FACE_URL_RESULT)
                localStorage.setItem("styleGender", styleGender)
            }

            const options = {
                method: 'POST',
                body: JSON.stringify({
                    name:payload.name+' - '+styleGender,
                    phone:payload.phone,
                    image:FACE_URL_RESULT
                }),
                headers: {
                    'Authorization': 'de2e0cc3-65da-48a4-8473-484f29386d61:xZC8Zo4DAWR5Yh6Lrq4QE3aaRYJl9lss',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            };
            
            await fetch('https://photo-ai-iims.zirolu.id/v1/amildgac', options)
                .then(response => response.json())
                .then(response => {
                    console.log(response)
                    // console.log(response.file)
                    // setLinkQR(response.file)
                    // setGenerateQR('true')
                    // setLoadingDownload(null)
                    setTimeout(() => {
                        router.push('/gac/result');
                    }, 10);
                })
                .catch(err => {
                    console.log(err)
                });
        
            // setTimeout(() => {
            //     router.push('/gac/result');
            // }, 100);
        })
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
            setElapsedTime(Date.now() - start);
        }
        // @snippet:end
    };

    return (
        <main className="flex fixed h-full w-full bg-gac-page overflow-auto flex-col justify-center items-center py-5 px-5 lg:py-16 lg:px-20" onContextMenu={(e)=> e.preventDefault()}>
            <div className={`fixed w-full mx-auto flex justify-center items-center pointer-events-none top-[4rem] left-0 right-0 mx-auto  ${numProses1 ? 'opacity-0 pointer-events-none' : ''}`}>
            <Image src='/gac/title-select.png' width={834} height={156} alt='Zirolu' className='w-full' priority />
            </div>
            {numProses1 && 
                <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center flex-col pb-[23rem]'>
                    <div className='relative w-[90%] overflow-hidden mb-[6rem]'>
                        <div className='relative w-full'>
                            <Image src='/gac/enjoy.png' width={737} height={98} alt='Zirolu' className='w-full' priority />
                        </div>
                    </div>
                    <div className='animate-upDownCepet relative p-5 py-7 w-[90%] text-6xl border-2 border-[#b1454a] text-center bg-[#EAC46D] text-[#000] font-bold rounded-lg leading-tight'>
                        <p>{`Please wait, loading...`}</p>
                        <p>{`Process : ${(elapsedTime / 1000).toFixed(2)} seconds (${numProses} of 2)`}</p>
                        {error}
                    </div>

                    <pre className='relative p-5 mt-14 border-2 border-[#b1454a] text-left bg-[#EAC46D] text-[#000000] text-3xl overflow-auto no-scrollbar h-[250px] w-[60%] mx-auto rounded-lg hidden'>
                        <code>
                        {logs.filter(Boolean).join('\n')}
                        </code>
                        AI generate face... <br></br>
                        Loading model..<br></br>
                    </pre>
                </div>
            }
            {/* LOADING */}
            {/* PILIH STYLE */}
            {/* <div className={`fixed top-[10rem] w-[50%] ${numProses1 ? 'opacity-0 pointer-events-none' : ''}`}>
                <Image src='/title-select.png' width={686} height={112} alt='Zirolu' className='w-full' priority />
            </div> */}
            <div className={`relative w-full mt-16 ${numProses1 ? 'opacity-0 pointer-events-none' : ''}`}>
                <div className='relative mt-0 w-[100%] mx-auto'>
                    <div className='relative w-full hiddenx'>
                        <div className='relative w-[80%] mb-10 mx-auto'>
                            <Image src='/gac/title-identify.png' width={542} height={119} alt='Zirolu' className='w-full' priority />
                        </div>
                        <div className='w-[100%] mx-auto'>
                            {/* GENDER FIX */}
                            <ul className='choose mod7'>
                                <li className='mb-10'>
                                    <input
                                    id='choose_gender1'
                                    type="radio"
                                    name='choose_gender'
                                    value="male"
                                    onChange={(e) => setStyleGender(e.target.value)}
                                    />
                                    <label htmlFor="choose_gender1">
                                        <Image
                                            className="relative h-auto w-full"
                                            src="/gac/style-1.png"
                                            alt="icon"
                                            width={712}
                                            height={120}
                                            priority
                                        />
                                    </label>
                                </li>
                                <li className='mb-10'>
                                    <input
                                    id='choose_gender2'
                                    type="radio"
                                    name='choose_gender'
                                    value="female"
                                    onChange={(e) => setStyleGender(e.target.value)}
                                    />
                                    <label htmlFor="choose_gender2">
                                        <Image
                                            className="relative h-auto w-full"
                                            src="/gac/style-2.png"
                                            alt="icon"
                                            width={712}
                                            height={120}
                                            priority
                                        />
                                    </label>
                                </li>
                                {/* <li>
                                    <input
                                    id='choose_gender3'
                                    type="radio"
                                    name='choose_gender'
                                    value="hijab"
                                    onChange={(e) => setStyleGender(e.target.value)}
                                    />
                                    <label htmlFor="choose_gender3">
                                        <Image
                                            className="relative h-auto w-full"
                                            src="/gender-hijab.png"
                                            alt="icon"
                                            width={541}
                                            height={178}
                                            priority
                                        />
                                    </label>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={`relative left-0 mt-10 w-full`}>
                    <div className="relative w-[100%] mx-auto flex justify-center items-center flex-col">
                        <button className={`w-full relative mx-auto flex justify-center items-center ${!styleGender ? 'hidden' : ''}`} onClick={generateAI}>
                            <Image src='/gac/btn-suprise.png' width={644} height={120} alt='Zirolu' className='w-full' priority />
                        </button>
                        <Link href='/gac' className="relative w-full mx-auto flex justify-center items-center">
                            <Image src='/gac/btn-back.png' width={644} height={120} alt='Zirolu' className='w-full' priority />
                        </Link>
                    </div>
                </div>
            </div>
            {/* !PILIH STYLE */}
        </main>
    );
}
