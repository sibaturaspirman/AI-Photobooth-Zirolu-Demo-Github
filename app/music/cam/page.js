'use client';

import * as fal from '@fal-ai/serverless-client';
import { useEffect, useRef, useState, useMemo } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// @snippet:start(client.config)
fal.config({
    // credentials: 'FAL_KEY_ID:FAL_KEY_SECRET',
    requestMiddleware: fal.withProxy({
      targetUrl: '/api/fal/proxy', // the built-int nextjs proxy
      // targetUrl: 'http://localhost:3333/api/fal/proxy', // or your own external proxy
    }),
});

const DEFAULT_NEG_PROMPT = 'bikini, sexy, boobs, flaws in the eyes, flaws in the face, flaws, lowres, non-HDRi, low quality, worst quality,artifacts noise, text, watermark, glitch, deformed, mutated, ugly, disfigured, hands, low resolution, partially rendered objects,  deformed or partially rendered eyes, deformed, deformed eyeballs, cross-eyed,blurry';
let URL_RESULT = ''
let FACE_URL_RESULT = ''
let FIXSEEDPILIH = 0, PROMPTFIX = '';
let promptArea = [
    {
        gender:"male",
        prompt:[
            {
                text:"A photorealistic, highly detailed 8K black-and-white image of a man in a mid-torso shot, wearing a black shirt. The background is dramatically black with intense contrasts of light and shadow. The lighting creates a moody atmosphere with extra headroom above the man's head, enhancing the cinematic effect. The overall style is stark and minimalist, emphasizing fine details in the facial expression and texture of the clothing.",
                seed:477402
            },
            {
                text:"A photorealistic, highly detailed 8K black-and-white portrait of a man in a close-up, half-body shot. The man is wearing a black shirt,vedora hats and the photo has a dramatic black background with moody lighting. There is headroom above the man's head, creating a cinematic effect. The style is minimalistic and stark, focusing on contrasts between light and shadow.",
                seed:303216
            }
        ]
    },
    {
        gender:"female",
        prompt:[
            {
                text:"A photorealistic, highly detailed 8K black-and-white image of a female an in a mid-torso shot, wearing a black shirt. The background is dramatically black with intense contrasts of light and shadow. The lighting creates a moody atmosphere with extra headroom above the woman's head, enhancing the cinematic effect. The overall style is stark and minimalist, emphasizing fine details in the facial expression and texture of the clothing.",
                seed:29897
            },
            {
                text:"A photorealistic, highly detailed 8K black-and-white portrait of a woman half-body shot. The man is wearing a black shirt,vedora hats and the photo has a dramatic black background with moody lighting. There is headroom above the woman's head, creating a cinematic effect. The style is minimalistic and stark, focusing on contrasts between light and shadow.",
                seed:95093
            }
        ]
    },
    {
        gender:"hijab",
        prompt:[
            {
                text:"A photorealistic, highly detailed 8K black-and-white image of a hijab female an in a mid-torso shot, wearing a black shirt. The background is dramatically black with intense contrasts of light and shadow. The lighting creates a moody atmosphere with extra headroom above the woman's head, enhancing the cinematic effect. The overall style is stark and minimalist, emphasizing fine details in the facial expression and texture of the clothing.",
                seed:209561
            },
            {
                text:"A photorealistic, highly detailed 8K black-and-white image of a hijab female an in a mid-torso shot, wearing a black shirt. The background is dramatically black with intense contrasts of light and shadow. The lighting creates a moody atmosphere with extra headroom above the woman's head, enhancing the cinematic effect. The overall style is stark and minimalist, emphasizing fine details in the facial expression and texture of the clothing.",
                seed:59179
            }
        ]
    }
]

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let streamCam = null;
const useWebcam = ({
    videoRef
  }) => {
    useEffect(() => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true}).then((stream) => {
            streamCam = stream
            window.localStream = stream
          if (videoRef.current !== null) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        });
      }
    }, [videoRef]);
};

export default function Cam() {
    const router = useRouter();
    const [enabled, setEnabled] = useState(false);
    const [captured, setCaptured] = useState(false);
    const [capturedAwal, setCapturedAwal] = useState(false);
    // const [countDown, setCoundown] = useState(5);
    // const [counter, setCounter] = useState(60);
    // const waktuBatasTake = useRef(null);
    const videoRef = useRef(null);
    const previewRef = useRef(null);

    useWebcam({ videoRef,previewRef});

    const captureVideo  = ({
        width = 512,
        height = 512,
    }) => {
        setCaptured(true)
        setCapturedAwal(true)
        setTimeout(() => {
            setEnabled(true)
            setCaptured(null)
            const canvas = previewRef.current;
            const video = videoRef.current;
            video.play;
            if (canvas === null || video === null) {
                return;
            }
        
            // Calculate the aspect ratio and crop dimensions
            const aspectRatio = video.videoWidth / video.videoHeight;
            let sourceX, sourceY, sourceWidth, sourceHeight;
        
            if (aspectRatio > 1) {
                // If width is greater than height
                sourceWidth = video.videoHeight;
                sourceHeight = video.videoHeight;
                sourceX = (video.videoWidth - video.videoHeight) / 2;
                sourceY = 0;
            } else {
                // If height is greater than or equal to width
                sourceWidth = video.videoWidth;
                sourceHeight = video.videoWidth;
                sourceX = 0;
                sourceY = (video.videoHeight - video.videoWidth) / 2;
            }
        
            // Resize the canvas to the target dimensions
            canvas.width = width;
            canvas.height = height;
        
            const context = canvas.getContext('2d');
            if (context === null) {
                return;
            }
        
            // Draw the image on the canvas (cropped and resized)
            context.drawImage(
                video,
                sourceX,
                sourceY,
                sourceWidth,
                sourceHeight,
                0,
                0,
                width,
                height
            );
    
            let faceImage = canvas.toDataURL();
            setImageFile(faceImage)
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("faceImage", faceImage)
            }
            // setTimeout(() => {
            //     router.push('/generate');
            // }, 1250);
        }, 3000);
    }

    const retake = () => {
        setEnabled(false)
        setCapturedAwal(false)
    }


    // AI
    const [prompt1, setPrompt1] = useState();
    const [prompt, setPrompt] = useState(null);
    const [promptNegative, setPromptNegative] = useState(DEFAULT_NEG_PROMPT);
    const [CGF, setCGF] = useState(1.2);
    const [IDScale, setIDScale] = useState(0.8);
    const [SEED, setSEED] = useState(13047);
    const [numSteps, setNumSteps] = useState(4);

    const [imageFile, setImageFile] = useState(null);
    const [imageFile2, setImageFile2] = useState(null);
    const [imageFile3, setImageFile3] = useState(null);
    const [styleFix, setStyleFix] = useState(null);
    const [styleFix2, setStyleFix2] = useState(null);
    const [styleFix3, setStyleFix3] = useState(null);
    const [formasiFix, setFormasiFix] = useState(null);
    const [numProses, setNumProses] = useState(0);
    const [numProses1, setNumProses1] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(true);
    const [result, setResult] = useState(null);
    const [resultFaceSwap, setResultFaceSwap] = useState(null);
    const [resultFaceSwap2, setResultFaceSwap2] = useState(null);
    const [resultFaceSwap3, setResultFaceSwap3] = useState(null);
    const [logs, setLogs] = useState([]);
    const [elapsedTime, setElapsedTime] = useState(0);
    // @snippet:end
    useEffect(() => {
        // Perform localStorage action
        if (typeof localStorage !== 'undefined') {
            const item1 = localStorage.getItem('styleFix')
            const item2 = localStorage.getItem('formasiFix')
            setStyleFix(item1)
            setFormasiFix(item2)
        }
    }, [styleFix, formasiFix])



    const generateAI = () => {
        setNumProses1(true)

        if(formasiFix == 'cowok'){
            let randNumb = getRandomInt(0,1)
            PROMPTFIX = promptArea[0].prompt[randNumb].text
            FIXSEEDPILIH = promptArea[0].prompt[randNumb].seed
        }else if(formasiFix == 'cewek'){
            let randNumb = getRandomInt(0,1)
            PROMPTFIX = promptArea[1].prompt[randNumb].text
            FIXSEEDPILIH = promptArea[1].prompt[randNumb].seed
        }else{
            let randNumb = getRandomInt(0,1)
            PROMPTFIX = promptArea[2].prompt[randNumb].text
            FIXSEEDPILIH = promptArea[2].prompt[randNumb].seed
        }

        setTimeout(() => {
            generateImage()
        }, 500);
    }


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
      setElapsedTime(0);
    };

  
    const generateImage = async () => {
        console.log(PROMPTFIX)
        console.log(FIXSEEDPILIH)
        setNumProses(1)
      reset();
      // @snippet:start("client.queue.subscribe")
      setLoading(true);
      const start = Date.now();
      try {
        const result = await fal.subscribe(
            'fal-ai/pulid',{
            input: {
                reference_images: [{
                        "image_url": imageFile
                    },
                    {
                        "image_url": imageFile
                    },
                    {
                        "image_url": imageFile
                    },
                    {
                        "image_url": imageFile
                    }
                ],
                prompt: PROMPTFIX,
                negative_prompt: promptNegative,
                seed: FIXSEEDPILIH,
                num_images: 1,
                guidance_scale: CGF,
                num_inference_steps: numSteps,
                image_size: {
                    height: 768,
                    width: 768
                },
                id_scale: IDScale,
                mode: "fidelity"
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
                // console.log(update)
              }
            },
          }
        );
        setResult(result);
        URL_RESULT = result.images[0].url;
        console.log(URL_RESULT)
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem("generateURLResult", URL_RESULT)
        }
      } catch (error) {
        // setError(error);
      } finally {
        setLoading(false);
        setElapsedTime(Date.now() - start);
        generateImageSwap()
      }
      // @snippet:end
    };

    const toDataURL = url => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
    }))


    const generateImageSwap = async () => {
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
                base_image_url: URL_RESULT,
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
        .then(dataUrl => {
            // console.log('RESULT:', dataUrl)

            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("resulAIBase64", dataUrl)
                localStorage.setItem("faceURLResult", FACE_URL_RESULT)
            }
            
            setTimeout(() => {
                router.push('/aura/result');
            }, 200);
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
        <main className="flex fixed h-full w-full bg-a overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20" onContextMenu={(e)=> e.preventDefault()}>
            {/* <div className="fixed top-0 left-0 w-full h-full bg-iqos-border pointer-events-none z-10"></div> */}
            <div  className={`relative w-[50%] mx-auto mb-1 ${numProses1 ? 'hidden opacity-0 pointer-events-none' : ''}`}>
            <Image src='/comcon/zyn/take.png' width={485} height={80} alt='Zirolu' className='w-full' priority />
            </div>
            
            {/* <div className={`fixed top-0 left-0 w-full h-full bg-veev flex items-center justify-center z-50 ${error ? 'hidden' : ''}`}>
            <a href='/comcon/veev/cam' className='relative w-[80%] mx-auto flex justify-center items-center'>
                <Image src='/permata/error.png' width={327} height={221} alt='Zirolu' className='w-full' priority />
            </a>
            </div> */}

            <div className={`relative w-full flex flex-col justify-center items-center mt-2 mb-3 lg:mt-8 lg:mb-10 ${numProses1 ? 'opacity-100 pointer-events-none' : ''}`}>
                <div className='relative lg:w-full'>
                    {/* {!enabled && 
                    <div className='absolute top-0 left-0 right-0 bottom-0 w-[50%] mx-auto flex justify-center items-center pointer-events-none z-10'>
                        <Image src='/icon-capture.png' width={389} height={220} alt='Zirolu' className='w-full' priority />
                    </div>
                    } */}

                    {captured && 
                    <div className='absolute top-0 left-0 right-0 bottom-0 w-[100px] h-[100px] lg:w-[174px] lg:h-[174px] overflow-hidden m-auto flex justify-center items-center pointer-events-none z-10'>
                        <div className='w-full animate-countdown translate-y-[35%]'>
                            <Image src='/countdown.png' width={174} height={522} alt='Zirolu' className='w-full' priority />
                        </div>
                    </div>
                    }

                    {!enabled && 
                    <div className='w-[85%] mx-auto absolute left-0 right-0 bottom-0 z-10'>
                        <Image src='/frame-pose.png' width={426} height={461} alt='Zirolu' className='w-full' priority />
                    </div>
                    }

                    <div className={`animate-scanning w-[90%] mx-auto absolute left-0 right-0 bottom-0 z-10 pointer-events-nones  ${numProses1 ? '' : 'opacity-0'}`}>
                        <Image src='/scan-line2.png' width={656} height={240} alt='Zirolu' className='w-full' priority />
                    </div>

                    <video ref={videoRef} className={`w-[90%] mx-auto border-2 border-[#ffffff] rounded-sm ${enabled ? 'absolute opacity-0':'relative'}`} playsInline height={512}></video>
                    <canvas ref={previewRef} width="512" height="512" className={`${enabled ? 'relative':'absolute opacity-0'} w-[90%] top-0 left-0 right-0 mx-auto pointer-events-nones border-2 border-[#ffffff] rounded-sm`}></canvas>
                </div>
            </div>


            {!enabled && 
                <p className='block text-center text-base mt-1 mb-3 text-white'>*Foto hanya sendiri <br></br> *Ikuti garis pose dan tidak terlalu zoom</p> 
            }
            {!enabled && 
                <div className={`relative w-full flex justify-center items-center mt-2 ${capturedAwal ? 'opacity-0 pointer-events-none' : ''}`}>
                    <button className="relative mx-auto flex  w-[65%] justify-center items-center" onClick={captureVideo}>
                        <Image src='/btn-capture-a.png' width={864} height={210} alt='Zirolu' className='w-full' priority />
                    </button>
                </div>
            }

            {numProses1 && 
            <div className={`relative w-[70%]`}>
                <div className='animate-upDownCepet relative py-2 px-2 mt-5 text-base border-2 text-center bg-[#1B3CD8] rounded-xl text-[#fff] font-bold'>
                    <p>{`Please wait, scanning...`}</p>
                        <p>{`Process : ${(elapsedTime / 1000).toFixed(2)} seconds (${numProses} of 2)`}</p>
                    {error}
                </div>
            </div>
            }

            <div className={`relative w-full ${numProses1 ? 'hidden opacity-0 pointer-events-none' : ''}`}>
            <div className={`relative w-full ${!enabled ? 'hidden' : ''}`}>
                <div className="relative w-[65%] mx-auto flex justify-center items-center flex-col mt-0">
                    <button className="w-full relative mx-auto flex justify-center items-center" onClick={generateAI}>
                        <Image src='/btn-surprise-a.png' width={864} height={210} alt='Zirolu' className='w-full' priority />
                    </button>
                    <button className="relative w-full mx-auto flex justify-center items-center mt-0" onClick={retake}>
                        <Image src='/comcon/zyn/btn-retake.png' width={864} height={210} alt='Zirolu' className='w-full' priority />
                    </button>
                </div>
            </div></div>
        </main>
    );
}
