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
const DEFAULT_NEG_PROMPT = 'flaws in the eyes, flaws in the face, flaws, lowres, non-HDRi, low quality, worst quality,artifacts noise, text, watermark, glitch, deformed, mutated, ugly, disfigured, hands, low resolution, partially rendered objects,  deformed or partially rendered eyes, deformed, deformed eyeballs, cross-eyed,blurry';
let URL_RESULT = ''
let FACE_URL_RESULT = ''
let FIXSEEDPILIH = 0, PROMPTFIX = '';
let promptArea = [
    {
        gender:"male",
        prompt:[
            {
                text:"A male punk band vocalist posing with the crowd at a punk music festival. The vocalist is standing on top of a stage speaker, facing away from the audience. He's wearing a black sleeveless shirt, showing off full tattoo sleeves on his right arm. He has a  long hair, and a nose piercing. The background is captured in a bokeh style, enhancing the focus on the vocalist while the excited crowd creates a lively atmosphere.",
                seed:12050
            },
            {
                text:"A long-haired rocker standing on stage atop a speaker, holding a black guitar, striking a powerful pose. The audience faces him with excitement, captured during a rock festival. He's wearing a black sleeveless shirt that shows off tattoos on his right arm. The camera is positioned at a high angle, capturing the entire scene with the vibrant stage lighting enhancing the intensity of the moment.",
                seed:1304713047
            },
            {
                text:"A male drummer from a metal band, dressed in a black sleeveless shirt, with tattoos covering his arms, long hair like a true metalhead, and large gauge earrings. His appearance is styled like a metal punk rocker, with intense makeup and accessories. Captured mid-performance, he's powerfully striking the drums with full energy. The scene is set in a nighttime metal concert with grand stage lighting, adding to the electrifying atmosphere. The camera angle is taken from below, emphasizing his commanding presence on stage.",
                seed:137
            },
            {
                text:"Photorealistic image of a cruel rocker performing on stage, playing an black electric guitar with intense focus. The stage lighting is dark and moody, with subtle spotlights highlighting the musician. The rocker has tattooed arms visible under his black leather jacket, which contrasts against the dimly lit background. The atmosphere is charged with energy, with faint silhouettes of the audience in the background. The camera captures a mid-shot, emphasizing the musician's expressive movements and the intricate details of his guitar. The scene is rendered in high resolution, with a dramatic and gritty tone, using HDR and cinematic effects",
                seed:13048
            },
            {
                text:"Photorealistic image of a rocker performing on stage, playing an black electric guitar with intense focus. The audience faces him with excitement, captured during a rock festival.  The rocker has tattooed arms visible under his black leather jacket, which contrasts against the dimly lit background. The atmosphere is charged with energy, with faint silhouettes of the audience in the background. The camera captures a mid-shot, emphasizing the musician's expressive movements and the intricate details of his guitar. The scene is rendered in high resolution, with a dramatic and gritty tone, using HDR and cinematic effects",
                seed:13042
            },
            {
                text:"A long-haired cruel rocker standing on stage atop a speaker, holding a black guitar, striking a powerful pose. The audience faces him with excitement, captured during a rock festival. He's wearing a black leather jacket that shows off tattoos on his face. The camera is positioned at a high angle, capturing the entire scene with the vibrant stage lighting enhancing the intensity of the moment.",
                seed:1304713047
            },
            {
                text:"Photorealistic image of a cruel rocker shows off tattoos on his chest and arms on stage, playing an black electric guitar with intense focus. The audience faces him with excitement, captured during a rock festival. The rocker has tattooed arms visible under his black leather jacket, which contrasts against the dimly lit background.  The atmosphere is charged with energy, with faint silhouettes of the audience in the background. The camera captures a mid-shot, emphasizing the musician's expressive movements and the intricate details of his guitar. The scene is rendered in high resolution, with a dramatic and gritty tone, using HDR and cinematic effects",
                seed:13042
            },
            {
                text:"A cruel male rock band vocalist posing with the crowd at a rock music festival. The vocalist is standing on top of a stage speaker, facing away from the audience. He's wearing a black leather jacket, showing off full tattoo sleeves on his right arm. He has a  long hair, and a nose piercing. The background is captured in a bokeh style, enhancing the focus on the vocalist while the excited crowd creates a lively atmosphere.",
                seed:12050
            },
        ]
    },
    {
        gender:"female",
        prompt:[
            {
                text:"A female punk band vocalist posing with the crowd at a punk music festival. The vocalist is standing on top of a stage speaker, facing away from the audience. sHe’s wearing a black sleeveless shirt, showing off full tattoo sleeves on his right arm. sHe has a  long hair, and a nose piercing. The background is captured in a bokeh style, enhancing the focus on the vocalist while the excited crowd creates a lively atmosphere.",
                seed:12050
            },
            {
                text:"A long-haired female rocker standing on stage atop a speaker, holding a black guitar, striking a powerful pose. The audience faces her with excitement, captured during a rock festival. He's wearing a black sleeveless shirt that shows off tattoos on her right arm. The camera is positioned at a high angle, capturing the entire scene with the vibrant stage lighting enhancing the intensity of the moment.",
                seed:13047
            },
            {
                text:"A female drummer from a metal band, dressed in a black sleeveless shirt, with tattoos covering her arms, long hair like a true metalhead, and large gauge earrings. her appearance is styled like a metal punk rocker, with intense makeup and accessories. Captured mid-performance, she's powerfully striking the drums with full energy. The scene is set in a nighttime metal concert with grand stage lighting, adding to the electrifying atmosphere. The camera angle is taken from below, emphasizing her commanding presence on stage.",
                seed:12047
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
    const [setPrint, setSetPrint] = useState(null);
    const [styleFix, setStyleFix] = useState(null);
    const [styleFix2, setStyleFix2] = useState(null);
    const [styleFix3, setStyleFix3] = useState(null);
    const [formasiFix, setFormasiFix] = useState(null);
    const [numProses, setNumProses] = useState(0);
    const [numProses1, setNumProses1] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
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
            const item3 = localStorage.getItem('setPrint')
            setStyleFix(item1)
            setFormasiFix(item2)
            setSetPrint(item3)
        }
    }, [styleFix, formasiFix, setPrint])

    const generateAI = () => {
        setNumProses1(true)

        if(formasiFix == 'cowok'){
            let randNumb = getRandomInt(0,7)
            PROMPTFIX = promptArea[0].prompt[randNumb].text
            FIXSEEDPILIH = promptArea[0].prompt[randNumb].seed
            // PROMPTFIX = promptArea[0].prompt[0].text
            // FIXSEEDPILIH = promptArea[0].prompt[0].seed
        }else{
            let randNumb = getRandomInt(0,2)
            PROMPTFIX = promptArea[1].prompt[randNumb].text
            FIXSEEDPILIH = promptArea[1].prompt[randNumb].seed
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
                    height: 1024,
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
        setError(error);
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
            
            if(setPrint == 'false'){
                setTimeout(() => {
                    router.push('/nextfest/result2');
                }, 500);
            }else{
                setTimeout(() => {
                    router.push('/nextfest/result');
                }, 500);
            }
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
        <main className="flex fixed h-full w-full bg-nextfest overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20" onContextMenu={(e)=> e.preventDefault()}>
            {/* <div className="fixed top-0 left-0 w-full h-full bg-iqos-border pointer-events-none z-10"></div> */}
            <div  className={`relative w-[70%] mx-auto mb-[2rem] ${numProses1 ? 'opacity-0 pointer-events-none' : ''}`}>
            <Image src='/nextfest/take.png' width={572} height={84} alt='Zirolu' className='w-full' priority />
            {/* {setPrint} */}
            </div>
            {/* LOADING */}
            {numProses1 && 
                <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center flex-col z-20'>
                    {/* <div className='relative w-[250px] h-[78px] lg:w-[555px] lg:h-[180px] overflow-hidden'>
                        <div className='animate-loading1 absolute left-0 top-0 w-full mx-auto flex justify-center items-center pointer-events-none'>
                            <Image src='/loading.png' width={770} height={714} alt='Zirolu' className='w-full' priority />
                        </div>
                    </div> */}

                    {/* <div className="relative w-[40%] mx-auto mt-[14rem] mb-5">
                        <Image src='/pln/pln.png' width={784} height={228} alt='Zirolu' className='w-full' priority />
                    </div> */}
                    <div className='animate-upDownCepet relative py-10 px-8 mt-5 lg:mt-10 lg:p-5 lg:text-6xl border-2 text-center bg-[#000] rounded-xl text-[#fff] lg:font-bold'>
                        <p>{`Please wait, loading...`}</p>
                        <p>{`AI process : ${(elapsedTime / 1000).toFixed(2)} seconds (${numProses} of 2)`}</p>
                        {error}
                    </div>

                    {/* <pre className='relative py-2 px-4 mt-5 lg:mt-10 border-2 text-left bg-[#A91E58] rounded-xl text-[#fff] text-xs lg:text-sm overflow-auto no-scrollbar h-[100px] w-[60%] mx-auto'>
                        <code>
                        {logs.filter(Boolean).join('\n')}
                        </code>
                        AI generate face... <br></br>
                        Loading model..<br></br>
                    </pre> */}
                </div>
            }
            {/* LOADING */}
            <div className={`relative w-full flex flex-col justify-center items-center mt-2 mb-3 lg:mt-8 lg:mb-10 ${numProses1 ? 'opacity-0 pointer-events-none' : ''}`}>
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
                    <div className='w-[55%] mx-auto absolute left-0 right-0 bottom-0 z-10'>
                        <Image src='/frame-pose.png' width={426} height={461} alt='Zirolu' className='w-full' priority />
                    </div>
                    }

                    <video ref={videoRef} className={`w-[90%] mx-auto border-2 border-[#ffffff] rounded-sm ${enabled ? 'absolute opacity-0':'relative'}`} playsInline height={512}></video>
                    <canvas ref={previewRef} width="512" height="512" className={`${enabled ? 'relative':'absolute opacity-0'} w-[90%] top-0 left-0 right-0 mx-auto pointer-events-nones border-2 border-[#ffffff] rounded-sm`}></canvas>
                </div>
            </div>


            {!enabled && 
                <p className='block text-center text-5xl mt-1 mb-3 lg:mt-4 text-white'>*Foto hanya sendiri <br></br> *Ikuti garis pose dan tidak terlalu zoom</p> 
            }
            {!enabled && 
                <div className="relative w-full flex justify-center items-center mt-8">
                    <button className="relative mx-auto flex  w-[80%] justify-center items-center" onClick={captureVideo}>
                        <Image src='/nextfest/btn-capture.png' width={764} height={144} alt='Zirolu' className='w-full' priority />
                    </button>
                </div>
            }

            <div className={`absolute pointer-events-none top-[3.2rem] left-0 right-0 mx-auto w-[31%] ${numProses1 ? 'opacity-0 pointer-events-none' : ''}`}>
                <div className={`relative w-full`}>
                    <Image src='/iqos/neon/look2.png'  width={264} height={110} alt='Zirolu' className='relative block w-full'></Image>
                </div>
            </div>

            <div className={`relative w-full ${numProses1 ? 'opacity-0 pointer-events-none' : ''}`}>
            <div className={`relative w-full ${!enabled ? 'hidden' : ''}`}>
                <div className="relative w-[80%] mx-auto flex justify-center items-center flex-col mt-0">
                    <button className="w-full relative mx-auto flex justify-center items-center" onClick={generateAI}>
                        <Image src='/nextfest/btn-generate.png' width={764} height={144} alt='Zirolu' className='w-full' priority />
                    </button>
                    <button className="relative w-full mx-auto flex justify-center items-center mt-10" onClick={retake}>
                        <Image src='/nextfest/btn-retake.png' width={764} height={144} alt='Zirolu' className='w-full' priority />
                    </button>
                </div>
            </div></div>
        </main>
    );
}
