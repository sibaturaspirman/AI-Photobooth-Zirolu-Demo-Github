'use client';

// import * as fal from '@fal-ai/serverless-client';
import { useEffect, useRef, useState, useMemo } from 'react';
// import TopLogoMagnumFixed from "../../../components/TopLogoMagnumFixed";
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// @snippet:start(client.config)
// fal.config({
//     // credentials: 'FAL_KEY_ID:FAL_KEY_SECRET',
//     requestMiddleware: fal.withProxy({
//       targetUrl: '/api/fal/proxy', // the built-int nextjs proxy
//       // targetUrl: 'http://localhost:3333/api/fal/proxy', // or your own external proxy
//     }),
// });


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

let FACE_URL_RESULT = ''
export default function Cam() {
    const router = useRouter();
    const [enabled, setEnabled] = useState(false);
    const [captured, setCaptured] = useState(false);
    const [capturedLoading, setCapturedLoading] = useState(false);
    const [imageCamURL, setImageCamURL] = useState();
    const videoRef = useRef(null);
    const previewRef = useRef(null);
    const [genderFix, setGenderFix] = useState(null);

    useEffect(() => {
        // Perform localStorage action
        if (typeof localStorage !== 'undefined') {
            const item2 = localStorage.getItem('genderFix')
            setGenderFix(item2)
        }
    }, [genderFix])

    useWebcam({ videoRef,previewRef});

    const captureVideo  = ({
        width = 512,
        height = 512,
    }) => {
        setCaptured(true)
        setTimeout(async () => {
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
            // setImageFile(faceImage)
            // if (typeof localStorage !== 'undefined') {
            //     localStorage.setItem("faceImage2", faceImage)
            // }
            // setTimeout(() => {
            //     router.push('/generate');
            // }, 1250);
            setCapturedLoading(true);

            const options = {
                method: 'POST',
                body: JSON.stringify({
                    image:faceImage
                }),
                headers: {
                    'Authorization': 'de2e0cc3-65da-48a4-8473-484f29386d61:xZC8Zo4DAWR5Yh6Lrq4QE3aaRYJl9lss',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            };
            
            await fetch('https://photoaibase64.zirolu.id/api/upload', options)
                .then(response => response.json())
                .then(response => {
                    console.log(response)
                    setImageCamURL(response.imageUrl)
                    setEnabled(true)
                    setCapturedLoading(false);
                    if (typeof localStorage !== 'undefined') {
                        localStorage.setItem("faceImage2", response.imageUrl)
                    }
                })
                .catch(err => {
                    console.log(err)
                });
        }, 3000);
    }

    const retake = () => {
        setEnabled(false)
    }

    return (
        <main className="flex fixed h-full w-full bg-nextfest overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20">
            {/* <TopLogoMagnumFixed></TopLogoMagnumFixed> */}
            <h1 className={`text-center text-5xl mt-0 mb-4 ${genderFix == 'cowokband' ? 'flex':'hidden'}`}>TAKE SELFIE - MALE</h1>
            <h1 className={`text-center text-5xl mt-0 mb-4 ${genderFix == 'cewekband' ? 'flex':'hidden'}`}>TAKE SELFIE - FEMALE</h1>
            <h2 className={`text-center text-5xl mb-0 uppercase`}>Face 2 of 4</h2>
            <div className={`relative w-full flex flex-col justify-center items-center mt-2 mb-3 lg:mt-8 lg:mb-10`}>
                <div className={`absolute top-1 left-1 w-[170px] h-[170px] justify-center items-center pointer-events-none z-10 ${genderFix == 'cowokband' ? 'flex':'hidden'}`}>
                    <Image src='/magnumotion/band-2.jpeg' width={200} height={200} alt='Zirolu' className='w-full' priority />
                </div>
                <div className={`absolute top-1 left-1 w-[170px] h-[170px] justify-center items-center pointer-events-none z-10 ${genderFix == 'cewekband' ? 'flex':'hidden'}`}>
                    <Image src='/magnumotion/band-cewek-2.jpeg' width={200} height={200} alt='Zirolu' className='w-full' priority />
                </div>
                <div className='relative lg:w-full'>
                    {captured && 
                    <div className='absolute top-0 left-0 right-0 bottom-0 w-[100px] h-[100px] lg:w-[174px] lg:h-[174px] overflow-hidden m-auto flex justify-center items-center pointer-events-none z-10'>
                        <div className='w-full animate-countdown translate-y-[35%]'>
                            <Image src='/countdown.png' width={174} height={522} alt='Zirolu' className='w-full' priority />
                        </div>
                    </div>
                    }

                    {!enabled && 
                    <div className='w-[52%] mx-auto absolute left-0 right-0 bottom-0 z-10'>
                        <Image src='/frame-pose.png' width={426} height={461} alt='Zirolu' className='w-full' priority />
                    </div>
                    }

                    <video ref={videoRef} className={`w-[80%] lg:w-full mx-auto border-2 border-[#ffffff] rounded-sm ${enabled ? 'absolute opacity-0':'relative'}`} playsInline height={512}></video>
                    <canvas ref={previewRef} width="512" height="512" className={`${enabled ? 'relative':'absolute opacity-0'} w-[80%] lg:w-full top-0 left-0 right-0 mx-auto pointer-events-nones border-2 border-[#ffffff] rounded-sm`}></canvas>
                </div>
            </div>


            {!enabled && 
                <p className='block text-center text-5xl mt-1 mb-10 text-white'>*Foto hanya sendiri <br></br> *Ikuti garis pose dan tidak terlalu zoom</p> 
            }
            {capturedLoading && 
                <p className='block text-center text-5xl mt-1 mb-3 lg:mt-4 text-white'>*Please wait...</p> 
            }
            {!enabled && 
                <div className="relative w-full flex justify-center items-center">
                    <button className="relative mx-auto flex  w-[80%] justify-center items-center" onClick={captureVideo}>
                    <Image src='/nextfest/btn-capture.png' width={764} height={144} alt='Zirolu' className='w-full' priority />
                    </button>
                </div>
            }

            <div className={`absolute pointer-events-none top-[3.2rem] left-0 right-0 mx-auto w-[31%]`}>
                <div className={`relative w-full`}>
                    <Image src='/iqos/neon/look2.png'  width={264} height={110} alt='Zirolu' className='relative block w-full'></Image>
                </div>
            </div>

            <div className={`relative w-full ${capturedLoading ? 'opacity-0 pointer-events-none' : ''}`}>
            <div className={`relative w-full`}>
            <div className={`relative w-full ${!enabled ? 'hidden' : ''}`}>
                <div className="relative w-[75%] mx-auto flex justify-center items-center flex-col mt-0">
                    <Link href='camband-3' className="w-full relative mx-auto flex justify-center items-center">
                    <Image src='/nextfest/btn-continue.png' width={764} height={144} alt='Zirolu' className='w-full' priority />
                    </Link>
                    <button className="relative w-full mx-auto flex justify-center items-center mt-10" onClick={retake}>
                        <Image src='/nextfest/btn-retake.png' width={764} height={144} alt='Zirolu' className='w-full' priority />
                    </button>
                </div>
            </div></div></div>
        </main>
    );
}
