'use client';

import * as fal from '@fal-ai/serverless-client';
import { useEffect, useRef, useState, useMemo } from 'react';
import Image from "next/image";
import TopLogoMizuho from "./../../../components/TopLogoMizuho";
import { Paytone_One} from "next/font/google";
const paytone_one = Paytone_One({ subsets: ["latin"], weight: '400' });
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

const useWebcam = ({
    videoRef
  }) => {
    useEffect(() => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true}).then((stream) => {
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
    const [formasiFix, setFormasiFix] = useState(null);
    const videoRef = useRef(null);
    const previewRef = useRef(null);

    useEffect(() => {
        // Perform localStorage action
        if (typeof localStorage !== 'undefined') {
            const item = localStorage.getItem('formasiFix')

            setFormasiFix(item)
        }
    }, [formasiFix])

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
    
    return (
        <main className="flex fixed h-full w-full bg-mizuho overflow-auto flex-col items-center pt-2 pb-5 px-5 lg:pt-5 lg:px-20">
            <div className="flex relative h-full w-fulll max-w-xl overflow-auto flex-col items-center">
                <TopLogoMizuho></TopLogoMizuho>
                
                <h1 className={`text-center text-2xl mt-2 mb-0 ${paytone_one.className}`}>TAKE SELFIE</h1>
                <h2 className={`text-center text-base mb-0 uppercase  ${paytone_one.className}`}>Face 1 of 3 : Man</h2>
                <div className={`relative w-[80%] mx-auto flex flex-col justify-center items-center mt-2 mb-3 lg:mt-2 lg:mb-2`}>
                    <div className={`absolute top-1 left-1 w-[70px] h-[70px] justify-center items-center pointer-events-none z-10 ${formasiFix == 'formasi-5' ? 'flex':'hidden'}`}>
                        <Image src='/mizuho/f5-1-preview.jpeg' width={120} height={120} alt='Zirolu' className='w-full' priority />
                    </div>
                    <div className={`absolute top-1 left-1 w-[70px] h-[70px] justify-center items-center pointer-events-none z-10 ${formasiFix == 'formasi-6' ? 'flex':'hidden'}`}>
                        <Image src='/mizuho/f6-1-preview.jpeg' width={120} height={120} alt='Zirolu' className='w-full' priority />
                    </div>
                    <div className='relative'>
                        {captured && 
                        <div className='absolute top-0 left-0 right-0 bottom-0 w-[100px] h-[100px] lg:w-[174px] lg:h-[174px] overflow-hidden m-auto flex justify-center items-center pointer-events-none z-10'>
                            <div className='w-full animate-countdown translate-y-[35%]'>
                                <Image src='/countdown.png' width={174} height={522} alt='Zirolu' className='w-full' priority />
                            </div>
                        </div>
                        }

                        {!enabled && 
                        <div className='w-[60%] mx-auto absolute left-0 right-0 bottom-0 z-10'>
                            <Image src='/frame-pose.png' width={426} height={461} alt='Zirolu' className='w-full' priority />
                        </div>
                        }

                        <video ref={videoRef} className={`w-[80%] lg:w-full mx-auto border-2 border-[#ffffff] rounded-sm ${enabled ? 'absolute opacity-0':'relative'}`} playsInline height={512}></video>
                        <canvas ref={previewRef} width="512" height="512" className={`${enabled ? 'relative':'absolute opacity-0'} w-[80%] lg:w-full top-0 left-0 right-0 mx-auto pointer-events-nones border-2 border-[#ffffff] rounded-sm`}></canvas>
                    </div>
                </div>


                {!enabled && 
                    <p className='block text-center text-sm lg:text-xl mt-1 mb-3 lg:mt-2 text-white'>*Ikuti frame pose dan tidak terlalu zoom</p> 
                }
                {!enabled && 
                    <div className="relative w-[70%] mx-auto flex justify-center items-center">
                        <button className="relative mx-auto flex  w-[70%] justify-center items-center" onClick={captureVideo}>
                            <Image src='/mizuho/btn-capture.png' width={410} height={96} alt='Zirolu' className='w-full' priority />
                        </button>
                    </div>
                }
                <div className={`relative w-full`}>
                <div className={`relative w-full ${!enabled ? 'hidden' : ''}`}>
                    <div className="relative w-[50%] mx-auto flex justify-center items-center flex-col mt-0 lg:mt-2">
                        {/* <button className="w-full relative mx-auto flex justify-center items-center" onClick={generateAI}>
                            <Image src='/mizuho/btn-next.png' width={410} height={96} alt='Zirolu' className='w-full' priority />
                        </button> */}
                        <Link href='/mizuho/cam/camf3-2' className="w-full relative mx-auto flex justify-center items-center">
                            <Image src='/mizuho/btn-next.png' width={410} height={96} alt='Zirolu' className='w-full' priority />
                        </Link>
                        <button className="relative mx-auto flex justify-center items-center mt-2" onClick={retake}>
                            <Image src='/btn-retake.png' width={820} height={192} alt='Zirolu' className='w-full' priority />
                        </button>
                    </div>
                </div>
                </div>
            </div>
        </main>
    );
}
