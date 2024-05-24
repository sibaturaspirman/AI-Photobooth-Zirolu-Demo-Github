'use client';

import * as fal from '@fal-ai/serverless-client';
import Image from "next/image";
import { useEffect, useState, useMemo } from 'react';
import TopLogo from "./../components/TopLogo";
import { Paytone_One} from "next/font/google";
const paytone_one = Paytone_One({ subsets: ["latin"], weight: '400' });
import { useRouter } from 'next/navigation';
// import io from 'socket.io-client';

// @snippet:start(client.config)
fal.config({
    // credentials: 'FAL_KEY_ID:FAL_KEY_SECRET',
    requestMiddleware: fal.withProxy({
      targetUrl: '/api/fal/proxy', // the built-int nextjs proxy
      // targetUrl: 'http://localhost:3333/api/fal/proxy', // or your own external proxy
    }),
});

let URL_RESULT = ''
let garmentURL = ''
let garmentDesc = ''
let imageCaptureBase64 = ''
function blobToBase64(blob) {
    return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export default function Register() {
    const router = useRouter();
    const [imageCapturePreview, setImageCapturePreview] = useState(null);

    const [fixSeed, setFixSeed] = useState(42);
    const [numSteps, setNumSteps] = useState(30);
    const [stylePrompt, setStylePrompt] = useState(null);
    const [numProses, setNumProses] = useState(0);
    const [numProses1, setNumProses1] = useState();
    // Result state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);
    const [logs, setLogs] = useState([]);
    const [elapsedTime, setElapsedTime] = useState(0);
    
    const toDataURL = url => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
    }))

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];

        if (!event.target.files || !event.target.files[0]) return;
        const FR = new FileReader();
        
        FR.addEventListener("load", function(evt) {
            setImageCapturePreview(evt.target.result)
        }); 
        
        FR.readAsDataURL(event.target.files[0]);
    };

    let positionYLatest = 0;
    const upPreview = () => {
        positionYLatest += 1;
        let positionPercentage = positionYLatest+'%'
        console.log(positionPercentage)
        document.getElementById('imageCapturePreview').style.bottom=positionPercentage
    }
    const downPreview = () => {
        positionYLatest -= 1;
        let positionPercentage = positionYLatest+'%'
        console.log(positionPercentage)
        document.getElementById('imageCapturePreview').style.bottom=positionPercentage
    }

    const generateAI = () => {
        setNumProses1(true)
        if(stylePrompt == 'style1'){
            garmentURL = 'https://ai.zirolu.id/tryon/style-1.jpeg'
            garmentDesc = 'T-Shirt Oversize'
        }else if(stylePrompt == 'style2'){
            garmentURL = 'https://ai.zirolu.id/tryon/style-2.jpeg'
            garmentDesc = 'T-Shirt Oversize'
        }else if(stylePrompt == 'style3'){
            garmentURL = 'https://ai.zirolu.id/tryon/style-3.jpeg'
            garmentDesc = 'Long Sleeve Sweater'
        }else if(stylePrompt == 'style4'){
            garmentURL = 'https://ai.zirolu.id/tryon/style-4.jpeg'
            garmentDesc = 'Long Sleeve Sweat Cardigan'
        }else if(stylePrompt == 'style5'){
            garmentURL = 'https://ai.zirolu.id/tryon/style-5.jpeg'
            garmentDesc = 'Long Sleeve Square Flannel Shirt'
        }else if(stylePrompt == 'style6'){
            garmentURL = 'https://ai.zirolu.id/tryon/style-6.jpeg'
            garmentDesc = 'Long Sleeve Square Flannel Shirt'
        }else if(stylePrompt == 'style7'){
            garmentURL = 'https://ai.zirolu.id/tryon/style-7.jpeg'
            garmentDesc = 'Short Sleeve Round Neck T-shirts'
        }

        import('html2canvas').then(html2canvas => {
            html2canvas.default(document.querySelector("#capturePreview"), {scale:3}).then(canvas => 
                uploadImage(canvas)
            )
        }).catch(e => {console("load failed")})
    }
    const uploadImage = async (canvas) => {
        canvas.toBlob(async function(blob) {
            blobToBase64(blob).then(dataUrl => {
                // console.log(dataUrl)
                imageCaptureBase64 = dataUrl
                setTimeout(() => {
                    generateImage()
                }, 150);
            })
        });
    }

    const reset = () => {
        setLoading(false);
        setError(null);
        setResult(null);
        setLogs([]);
        setElapsedTime(0);
      };
    const generateImage = async () => {
        setNumProses(1)
        reset();
        // @snippet:start("client.queue.subscribe")
        setLoading(true);
        // let seedRandom = getRandomInt(1,20000)
        const start = Date.now();
        try {
            const result = await fal.subscribe("fal-ai/idm-vton", {
                input: {
                    human_image_url: imageCaptureBase64, 
                    num_inference_stepsinteger: numSteps,
                    seedinteger: fixSeed,
                    garment_image_url: garmentURL,
                    description: garmentDesc
                },
                logs: true,
                onQueueUpdate(update) {
                setElapsedTime(Date.now() - start);
                if (
                    update.status === 'IN_PROGRESS' ||
                    update.status === 'COMPLETED'
                ) {
                    setLogs((update.logs || []).map((log) => log.message));
                    // console.log(update)
                }
                },
            }
            );
            setResult(result);
            URL_RESULT = result.image.url
            console.log(URL_RESULT)

            toDataURL(URL_RESULT)
            .then(dataUrl => {
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem("resulAIBase64TryOn", dataUrl)
                    localStorage.setItem("URLResultTryOn", URL_RESULT)
                }
            
                setTimeout(() => {
                    router.push('/tryon/result');
                }, 500);
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
        <main className="flex min-h-screen flex-col items-center justify-top pt-2 pb-5 px-5 lg:pt-12 lg:px-20">
            <TopLogo></TopLogo>
            <h1 className={`text-center text-xl mt-[-.7rem] lg:mt-0 lg:text-7xl lg:mb-5 text-white ${paytone_one.className}  ${numProses1 ? 'opacity-0 pointer-events-none' : ''}`}>VIRTUAL TRY ON</h1>
            {/* LOADING */}
            {numProses1 && 
                <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center flex-col'>
                    <div className='relative w-[250px] h-[78px] lg:w-[655px] lg:h-[206px] overflow-hidden'>
                        <div className='animate-loading1 absolute left-0 top-0 w-full mx-auto flex justify-center items-center pointer-events-none'>
                            <Image src='/loading.png' width={770} height={714} alt='Zirolu' className='w-full' priority />
                        </div>
                    </div>
                    <div className='animate-upDownCepet relative py-2 px-4 mt-5 lg:mt-24 lg:p-5 lg:text-2xl border-2 border-[#ffffff] text-center bg-slate-500 text-[#fff] lg:font-bold'>
                        <p>{`Please wait, loading...`}</p>
                        <p>{`Process : ${(elapsedTime / 1000).toFixed(2)} seconds (${numProses} of 1)`}</p>
                        {error}
                    </div>

                    <pre className='relative py-2 px-4 mt-5 lg:mt-24 border-2 border-[#ffffff] text-left bg-slate-500 text-[#fff] text-xs lg:text-sm overflow-auto no-scrollbar h-[100px] w-[60%] mx-auto'>
                        <code>
                        {logs.filter(Boolean).join('\n')}
                        </code>
                        AI generate the photo... <br></br>
                        Loading model..<br></br>
                    </pre>
                </div>
            }
            {/* LOADING */}
            {/* PILIH STYLE */}
            <div className={`relative w-full ${numProses1 ? 'opacity-0 pointer-events-none' : ''}`}>
                <div className='relative mt-0 lg:mt-10 w-full'>
                    <div className='relative w-full mt-2 lg:mt-10'>
                        <label htmlFor="choose_style1" className="block mb-0 lg:mb-1 lg:text-3xl text-left font-bold text-white">Pick Your Style</label>
                        <div className='overflow-auto'>
                            {/* STYLE SEMENTARA */}
                            <ul className='choose'>
                            <li>
                                <input
                                id='choose_style1'
                                type="radio"
                                name='choose_style'
                                value="style1"
                                onChange={(e) => setStylePrompt(e.target.value)}
                                />
                                <label htmlFor="choose_style1">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/tryon/style-1.jpeg"
                                    alt="icon"
                                    width={120}
                                    height={120}
                                    priority
                                />
                                </label>
                            </li>
                            <li>
                                <input
                                id='choose_style2'
                                type="radio"
                                name='choose_style'
                                value="style2"
                                onChange={(e) => setStylePrompt(e.target.value)}
                                />
                                <label htmlFor="choose_style2">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/tryon/style-2.jpeg"
                                    alt="icon"
                                    width={120}
                                    height={120}
                                    priority
                                />
                                </label>
                            </li>
                            <li>
                                <input
                                id='choose_style3'
                                type="radio"
                                name='choose_style'
                                value="style3"
                                onChange={(e) => setStylePrompt(e.target.value)}
                                />
                                <label htmlFor="choose_style3">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/tryon/style-3.jpeg"
                                    alt="icon"
                                    width={120}
                                    height={120}
                                    priority
                                />
                                </label>
                            </li>
                            <li>
                                <input
                                id='choose_style4'
                                type="radio"
                                name='choose_style'
                                value="style4"
                                onChange={(e) => setStylePrompt(e.target.value)}
                                />
                                <label htmlFor="choose_style4">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/tryon/style-4.jpeg"
                                    alt="icon"
                                    width={120}
                                    height={120}
                                    priority
                                />
                                </label>
                            </li>
                            <li>
                                <input
                                id='choose_style5'
                                type="radio"
                                name='choose_style'
                                value="style5"
                                onChange={(e) => setStylePrompt(e.target.value)}
                                />
                                <label htmlFor="choose_style5">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/tryon/style-5.jpeg"
                                    alt="icon"
                                    width={120}
                                    height={120}
                                    priority
                                />
                                </label>
                            </li>
                            <li>
                                <input
                                id='choose_style6'
                                type="radio"
                                name='choose_style'
                                value="style6"
                                onChange={(e) => setStylePrompt(e.target.value)}
                                />
                                <label htmlFor="choose_style6">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/tryon/style-6.jpeg"
                                    alt="icon"
                                    width={120}
                                    height={120}
                                    priority
                                />
                                </label>
                            </li>
                            <li>
                                <input
                                id='choose_style7'
                                type="radio"
                                name='choose_style'
                                value="style7"
                                onChange={(e) => setStylePrompt(e.target.value)}
                                />
                                <label htmlFor="choose_style7">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/tryon/style-7.jpeg"
                                    alt="icon"
                                    width={120}
                                    height={120}
                                    priority
                                />
                                </label>
                            </li>
                            </ul>
                        </div>
                    </div>

                    <div className='relative w-full mb-2'>
                        <label htmlFor="base" className="block mb-2 lg:text-3xl text-left font-bold text-white">Upload Your Photo</label>
                        <div className='relative w-full'>
                            <input
                                type='file'
                                id='base'
                                name='base'
                                className={`w-full border-2 border-[#D8BA78] rounded-sm font-semibold text-base outline-none py-2 pr-1 text-white bg-black bg-opacity-[4%]'`}
                                placeholder='Base Face'
                                accept="image/*;capture=camera"
                                onChange={handleImageUpload}
                            />
                        </div>
                    </div>
                    {imageCapturePreview && 
                    <div className='relative w-full mb-6'>
                        <div className='absolute top-0 right-0 z-10 w-[70px]'>
                            <button className="relative w-full flex justify-center items-center py-2 pt-4 px-3" onClick={upPreview}>
                                <Image src='/tryon/up.png' width={150} height={150} alt='Zirolu' className='w-full' priority />
                            </button>
                            <button className="relative w-full flex justify-center items-center py-2 px-3" onClick={downPreview}>
                                <Image src='/tryon/down.png' width={150} height={150} alt='Zirolu' className='w-full' priority />
                            </button>
                        </div>
                        <div className='w-full relative aspect-[3/4] overflow-hidden' id='capturePreview'>
                            <Image src={imageCapturePreview}  width={768} height={1024} alt='Zirolu' className='absolute bottom-0 left-0 block w-full' id='imageCapturePreview'></Image>
                        </div>
                    </div>
                    }
                </div>

                {imageCapturePreview &&
                    <div className="relative w-full flex justify-center items-center lg:mt-10">
                        <button className="relative mx-auto w-[70%] flex justify-center items-center" onClick={generateAI}>
                            <Image src='/btn-generate.png' width={410} height={96} alt='Zirolu' className='w-full' priority />
                        </button>
                    </div>
                }
                <a href='https://www.instagram.com/zirolu.id' target='_blank' className='block text-center text-sm lg:text-2xl mt-2 lg:mt-4 text-white'>Have your own style in mind? contact us through instagram @zirolu.id</a>
            </div>
            {/* !PILIH STYLE */}

        </main>
    );
}
