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
        gender:"male - scramble",
        prompt:[
            {
                text:"A photorealistic black and white style. man sitting on a ((( Ducati Scrambler ))) motorcycle, parked in an industrial workshop setting, wearing a black leather jacket and gloves, striking a heroic pose beside their stationary  motorcycle. The shot is taken from a low angle, emphasizing the rider's stature and confidence. The background garage surroundings feature metal tools, shelves, and machinery, industrial atmosphere. The lighting casts soft shadows, emphasizing the textures of the motorcycle's metallic body and the industrial environment. The scene feels authentic and realistic, mechanical setting.",
                seed:334929
            },
            {
                text:"A photorealistic black and white style. man sitting on a ((( Ducati Scrambler ))) motorcycle, parked in an industrial workshop setting, wearing a black leather jacket and gloves, striking a heroic pose beside their stationary  motorcycle. The shot is taken from a low angle, emphasizing the rider's stature and confidence. The background garage surroundings feature metal tools, shelves, and machinery, industrial atmosphere. The lighting casts soft shadows, emphasizing the textures of the motorcycle's metallic body and the industrial environment. The scene feels authentic and realistic, mechanical setting.",
                seed:484429
            }
        ]
    },
    {
        gender:"male - caferacer",
        prompt:[
            {
                text:"A photorealistic proportional black and white style. A striking motorcycle sitted on a ((( Triumph Thruxton cafe racer style ))), wearing a black leather jacket and gloves, striking a heroic pose beside their stationary  motorcycle. The shot is taken from a low angle, emphasizing the rider's stature and confidence. The background garage surroundings feature metal tools, shelves, and machinery, industrial atmosphere. The lighting casts soft shadows, emphasizing the textures of the motorcycle's metallic body and the industrial environment. The scene feels authentic and realistic, mechanical setting.",
                seed:103836
            },
            {
                text:"A photorealistic proportional black and white style. A striking motorcycle sitted on a ((( Triumph Thruxton cafe racer style ))), wearing a black leather jacket and gloves, striking a heroic pose beside their stationary  motorcycle. The shot is taken from a low angle, emphasizing the rider's stature and confidence. The background garage surroundings feature metal tools, shelves, and machinery, industrial atmosphere. The lighting casts soft shadows, emphasizing the textures of the motorcycle's metallic body and the industrial environment. The scene feels authentic and realistic, mechanical setting.",
                seed:49811
            }
        ]
    },
    {
        gender:"male - adventure",
        prompt:[
            {
                text:"A photorealistic black and white style. highly detailed 8K image of a man (((standing))) beside an (((adventure BMW motorcycle))). The motorbike features rugged tires and a sturdy frame, built for off-road terrains. The man is fully geared with a helmet, protective jacket, and gloves. The garage surroundings feature metal tools, shelves, and machinery, with a gritty, industrial atmosphere. The lighting casts soft shadows, emphasizing the textures of the motorcycle's metallic body and the industrial environment. The scene feels authentic and realistic",
                seed:489327
            },
            {
                text:"A photorealistic black and white style. highly detailed 8K image of a man (((standing))) beside an (((adventure BMW motorcycle))). The motorbike features rugged tires and a sturdy frame, built for off-road terrains. The man is fully geared with a helmet, protective jacket, and gloves. The garage surroundings feature metal tools, shelves, and machinery, with a gritty, industrial atmosphere. The lighting casts soft shadows, emphasizing the textures of the motorcycle's metallic body and the industrial environment. The scene feels authentic and realistic",
                seed:234906
            }
        ]
    },
    {
        gender:"male - chopper",
        prompt:[
            {
                text:"A photorealistic proportional black and white style. A striking motorcycle sitted on a ((( black penny Harley Davidson Softail Slim ))), wearing a black leather jacket and gloves, striking a heroic pose beside their stationary  motorcycle. The shot is taken from a low angle, emphasizing the rider's stature and confidence. The background garage surroundings feature metal tools, shelves, and machinery, industrial atmosphere. The lighting casts soft shadows, emphasizing the textures of the motorcycle's metallic body and the industrial environment. The scene feels authentic and realistic, mechanical setting.",
                seed:233744
            },
            {
                text:"A photorealistic proportional black and white style. A striking motorcycle sitted on a ((( black penny Harley Davidson Softail Slim ))), wearing a black leather jacket and gloves, striking a heroic pose beside their stationary  motorcycle. The shot is taken from a low angle, emphasizing the rider's stature and confidence. The background garage surroundings feature metal tools, shelves, and machinery, industrial atmosphere. The lighting casts soft shadows, emphasizing the textures of the motorcycle's metallic body and the industrial environment. The scene feels authentic and realistic, mechanical setting.",
                seed:117988
            }
        ]
    },
    {
        gender:"female - scramble",
        prompt:[
            {
                text:"A photorealistic black and white style, 28 years old  woman sitting on a ((( Ducati Scrambler ))) motorcycle, parked in an industrial workshop setting, wearing a black leather jacket and gloves, striking a heroic pose beside their stationary  motorcycle. The shot is taken from a low angle, emphasizing the rider's stature and confidence. The background garage surroundings feature metal tools, shelves, and machinery, industrial atmosphere. The lighting casts soft shadows, emphasizing the textures of the motorcycle's metallic body and the industrial environment. The scene feels authentic and realistic, mechanical setting.",
                seed:10990
            },
            {
                text:"A photorealistic black and white style, 28 years old  woman sitting on a ((( Ducati Scrambler ))) motorcycle, parked in an industrial workshop setting, wearing a black leather jacket and gloves, striking a heroic pose beside their stationary  motorcycle. The shot is taken from a low angle, emphasizing the rider's stature and confidence. The background garage surroundings feature metal tools, shelves, and machinery, industrial atmosphere. The lighting casts soft shadows, emphasizing the textures of the motorcycle's metallic body and the industrial environment. The scene feels authentic and realistic, mechanical setting.",
                seed:392852
            }
        ]
    },
    {
        gender:"female - caferacer",
        prompt:[
            {
                text:"A photorealistic black and white style. woman sitting on a ((( Triumph Thruxton RS cafe racer ))) with a stunning fully silver chromed tank to match its thrilling performance, wearing a leather jacket and black gloves, striking a heroic pose beside their stationary  motorcycle. The shot is taken from DLRS camera, emphasizing the rider's stature and confidence. The background ((( modern clean garage ))) surroundings feature metal tools, shelves, and machinery, modern atmosphere. The scene feels authentic and realistic, mechanical setting.",
                seed:86015
            },
            {
                text:"A photorealistic black and white style. woman sitting on a ((( Triumph Thruxton RS cafe racer ))) with a stunning fully silver chromed tank to match its thrilling performance, wearing a leather jacket and black gloves, striking a heroic pose beside their stationary  motorcycle. The shot is taken from DLRS camera, emphasizing the rider's stature and confidence. The background ((( modern clean garage ))) surroundings feature metal tools, shelves, and machinery, modern atmosphere. The scene feels authentic and realistic, mechanical setting.",
                seed:173701
            }
        ]
    },
    {
        gender:"female - adventure",
        prompt:[
            {
                text:"A photorealistic black and white style, highly detailed image of a woman sitting on an ((( adventure BMW motorcycle ))) with (((one foot on the ground))). The background features a modern, clean workshop filled with tools and equipment. The scene is well-lit, showcasing the sleek design of the motorcycle and the professional look of the garage. The image is taken from an eye-level DSLR angle, with sharp focus on both the motorcycle and the workshop details. 4K resolution, realistic tones, and dramatic lighting enhance the industrial atmosphere.",
                seed:359386
            },
            {
                text:"A photorealistic black and white style, highly detailed image of a woman sitting on an ((( adventure BMW motorcycle ))) with (((one foot on the ground))). The background features a modern, clean workshop filled with tools and equipment. The scene is well-lit, showcasing the sleek design of the motorcycle and the professional look of the garage. The image is taken from an eye-level DSLR angle, with sharp focus on both the motorcycle and the workshop details. 4K resolution, realistic tones, and dramatic lighting enhance the industrial atmosphere.",
                seed:359386
            }
        ]
    },
    {
        gender:"female - chopper",
        prompt:[
            {
                text:"A photorealistic black and white style, A striking motorcycle sitted on a ((( black penny Harley Davidson Softail Slim ))), wearing a black leather jacket and gloves, striking a heroic pose beside their stationary  motorcycle. The shot is taken from a low angle, emphasizing the rider's stature and confidence. The background garage surroundings feature metal tools, shelves, and machinery, industrial atmosphere. The lighting casts soft shadows, emphasizing the textures of the motorcycle's metallic body and the industrial environment. The scene feels authentic and realistic, mechanical setting.",
                seed:265317
            },
            {
                text:"A photorealistic black and white style, A striking motorcycle sitted on a ((( black penny Harley Davidson Softail Slim ))), wearing a black leather jacket and gloves, striking a heroic pose beside their stationary  motorcycle. The shot is taken from a low angle, emphasizing the rider's stature and confidence. The background garage surroundings feature metal tools, shelves, and machinery, industrial atmosphere. The lighting casts soft shadows, emphasizing the textures of the motorcycle's metallic body and the industrial environment. The scene feels authentic and realistic, mechanical setting.",
                seed:2729
            }
        ]
    },
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
            context.translate(canvas.width, 0);
            context.scale(-1,1);
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
    const [motorFix, setMotorFix] = useState(null);
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
            const item3 = localStorage.getItem('motorFix')
            setStyleFix(item1)
            setFormasiFix(item2)
            setMotorFix(item3)
        }
    }, [styleFix, formasiFix, motorFix])

    const generateAI = () => {
        setNumProses1(true)

        if(formasiFix == 'cowok'){
            if(motorFix == 's1'){
                let randNumb = getRandomInt(0,1)
                PROMPTFIX = promptArea[0].prompt[randNumb].text
                FIXSEEDPILIH = promptArea[0].prompt[randNumb].seed
            }else if(motorFix == 's2'){
                let randNumb = getRandomInt(0,1)
                PROMPTFIX = promptArea[1].prompt[randNumb].text
                FIXSEEDPILIH = promptArea[1].prompt[randNumb].seed
            }else if(motorFix == 's3'){
                let randNumb = getRandomInt(0,1)
                PROMPTFIX = promptArea[2].prompt[randNumb].text
                FIXSEEDPILIH = promptArea[2].prompt[randNumb].seed
            }else if(motorFix == 's4'){
                let randNumb = getRandomInt(0,1)
                PROMPTFIX = promptArea[3].prompt[randNumb].text
                FIXSEEDPILIH = promptArea[3].prompt[randNumb].seed
            }
        }else{
            if(motorFix == 's1'){
                let randNumb = getRandomInt(0,1)
                PROMPTFIX = promptArea[4].prompt[randNumb].text
                FIXSEEDPILIH = promptArea[4].prompt[randNumb].seed
            }else if(motorFix == 's2'){
                let randNumb = getRandomInt(0,1)
                PROMPTFIX = promptArea[5].prompt[randNumb].text
                FIXSEEDPILIH = promptArea[5].prompt[randNumb].seed
            }else if(motorFix == 's3'){
                let randNumb = getRandomInt(0,1)
                PROMPTFIX = promptArea[6].prompt[randNumb].text
                FIXSEEDPILIH = promptArea[6].prompt[randNumb].seed
            }else if(motorFix == 's4'){
                let randNumb = getRandomInt(0,1)
                PROMPTFIX = promptArea[7].prompt[randNumb].text
                FIXSEEDPILIH = promptArea[7].prompt[randNumb].seed
            }
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
                    height: 1006,
                    width: 683
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
        let randomHasil = getRandomInt(1,2);

        // emitStrsing("sendImage", result.image.url);

        toDataURL(FACE_URL_RESULT)
        .then(dataUrl => {
            // console.log('RESULT:', dataUrl)

            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("resulAIBase64", dataUrl)
                localStorage.setItem("faceURLResult", FACE_URL_RESULT)
            }
            
            setTimeout(() => {
                if(randomHasil == 1){
                    router.push('/comcon/mlb/result');
                }else{
                    router.push('/comcon/mlb/result2');
                }
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
        <main className="flex fixed h-full w-full bg-mlb overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20" onContextMenu={(e)=> e.preventDefault()}>
            {/* <div className="fixed top-0 left-0 w-full h-full bg-iqos-border pointer-events-none z-10"></div> */}
            <div className="fixed w-[40%] mx-auto top-[7rem] left-0 right-0">
            <Image src='/comcon/mlb/iam.png' width={584} height={189} alt='Zirolu' className='w-full' priority />
            </div>
            <div  className={`relative w-[50%] mx-auto mb-0 ${numProses1 ? 'opacity-0 pointer-events-none' : ''}`}>
            <Image src='/comcon/mlb/take.png' width={597} height={118} alt='Zirolu' className='w-full' priority />
            </div>
            
            {/* <div className={`fixed top-0 left-0 w-full h-full bg-visikom flex items-center justify-center z-50 ${error ? 'hidden' : ''}`}>
            <a href='/comcon/visikom/cam' className='relative w-[80%] mx-auto flex justify-center items-center'>
                <Image src='/permata/error.png' width={327} height={221} alt='Zirolu' className='w-full' priority />
            </a>
            </div> */}

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
                    <div className='animate-upDownCepet relative py-2 px-4 mt-5 lg:mt-10 lg:p-5 lg:text-6xl border-2 text-center bg-[#CC1A24] rounded-xl text-[#fff] lg:font-bold'>
                        <p>{`Please wait, loading...`}</p>
                        <p>{`Process : ${(elapsedTime / 1000).toFixed(2)} seconds (${numProses} of 2)`}</p>
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

                    <video ref={videoRef} className={`w-[90%] mx-auto border-2 border-[#ffffff] scale-x-[-1] rounded-sm ${enabled ? 'absolute opacity-0':'relative'}`} playsInline height={512}></video>
                    <canvas ref={previewRef} width="512" height="512" className={`${enabled ? 'relative':'absolute opacity-0'} w-[90%] top-0 left-0 right-0 mx-auto pointer-events-nones border-2 border-[#ffffff] rounded-sm`}></canvas>
                </div>
            </div>


            {!enabled && 
                <p className='block text-center text-5xl mt-1 mb-3 lg:mt-4 text-white'>*Foto hanya sendiri <br></br> *Ikuti garis pose dan tidak terlalu zoom</p> 
            }
            {!enabled && 
                <div className={`relative w-full flex justify-center items-center mt-8 ${capturedAwal ? 'opacity-0 pointer-events-none' : ''}`}>
                    <button className="relative mx-auto flex  w-[80%] justify-center items-center" onClick={captureVideo}>
                        <Image src='/comcon/mlb/btn-capture.png' width={864} height={210} alt='Zirolu' className='w-full' priority />
                    </button>
                </div>
            }
            <div className={`relative w-full ${numProses1 ? 'opacity-0 pointer-events-none' : ''}`}>
            <div className={`relative w-full ${!enabled ? 'hidden' : ''}`}>
                <div className="relative w-[80%] mx-auto flex justify-center items-center flex-col mt-0">
                    <button className="w-full relative mx-auto flex justify-center items-center" onClick={generateAI}>
                        <Image src='/comcon/mlb/btn-generate.png' width={864} height={210} alt='Zirolu' className='w-full' priority />
                    </button>
                    <button className="relative w-full mx-auto flex justify-center items-center mt-0" onClick={retake}>
                        <Image src='/comcon/mlb/btn-retake.png' width={864} height={210} alt='Zirolu' className='w-full' priority />
                    </button>
                </div>
            </div></div>
        </main>
    );
}
