'use client';

import * as fal from '@fal-ai/serverless-client';
import { useEffect, useRef, useState, useMemo } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import PadmaAIClient from "padmaai-client";

// @snippet:start(client.config)
fal.config({
    // credentials: 'FAL_KEY_ID:FAL_KEY_SECRET',
    requestMiddleware: fal.withProxy({
      targetUrl: '/api/fal/proxy', // the built-int nextjs proxy
      // targetUrl: 'http://localhost:3333/api/fal/proxy', // or your own external proxy
    }),
});


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

            // now that our video is drawn correctly, we can do...
            context.translate(canvas.width, 0);
            context.scale(-1,1);
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
    const [padmaAI, setPadmaAI] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imageFile2, setImageFile2] = useState(null);
    const [imageFile3, setImageFile3] = useState(null);
    const [progressText, setProgressText] = useState('Set Queue');
    const [progressPersen, setProgressPersen] = useState('0%');
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
        const aiInstance = new PadmaAIClient("https://padmaai.zirolu.id", "app_tXxTmRGXzUwliMw1sMgdFUlDFF2S2IO6", "443d0bec-c1b4-4255-a4ce-4c404095b0c4");
        setPadmaAI(aiInstance);
        
    }, [styleFix, formasiFix])

    const stopCamera = () => {
        console.log("wkwk")

        const stream = videoRef.current.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach((track) => track.stop()); // Hentikan setiap track
        }
        videoRef.current.srcObject = null; // Lepaskan stream dari video
        // setIsCameraOn(false);
        // setStream(null);
        // setEnabled(false)
        // setCaptured(false)
        // setCapturedAwal(false)
    };

    const generateAI = () => {
        setNumProses1(true)
        generateImageSwapBaru()

        // stopCamera()

        // videoRef.current.stop();
        // videoRef.current.srcObject = ''
        // streamCam.getVideoTracks()[0].stop();
        // console.log(streamCam)

        
        // localStream.getVideoTracks()[0].stop();
        // console.log(streamCam)
        // console.log(videoRef)
        // videoRef.src=''
        // STOP CAM
        // streamCam.getTracks().forEach(function(track) {
        //     track.stop();
        // });
    }

    const reset2 = () => {
      setLoading(false);
      setError(true);
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

    const generateImageSwapBaru = async () => {
        padmaAI.onProgress((progress) => {
            // setProgress(progress.type); // Update the progress state
            console.log("Progress:", progress); // Optional: log progress for debugging
            if(progress.type == 'executing'){
                setProgressText("Curious?")
            }else if(progress.type == 'progress'){
                setProgressText("Progress : ")
                setProgressPersen(progress.progress+'%')
            }else if(progress.type == 'executed'){
                setProgressText("Done!")
                setProgressPersen('Direct...')
            }

          });
          
          try {
            // Generate the image
            const result = await padmaAI.generateImages(imageFile, formasiFix, 'META');
            // setImageUrl(result.imgUrl); // Assuming the image URL is returned

            FACE_URL_RESULT= result.imgUrl;

            toDataURL(FACE_URL_RESULT)
            .then(dataUrl => {
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem("resulAIBase64", dataUrl)
                    localStorage.setItem("faceURLResult", FACE_URL_RESULT)
                }
                setTimeout(() => {
                    router.push('/jelajahputri/result');
                }, 200);
            })
            console.log(FACE_URL_RESULT)

          } catch (error) {
            console.error("Error generating image:", error);
          }
    }

    return (
        <main className="flex fixed h-full w-full bg-meta overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20" onContextMenu={(e)=> e.preventDefault()}>
            <div className="fixed top-0 left-0 w-full h-full bg-iqos-border pointer-events-none z-10"></div>
            <div  className={`relative w-[70%] mx-auto mb-[2rem] ${numProses1 ? 'opacity-0 pointer-events-none' : ''}`}>
            <Image src='/comcon/iqos/take.png' width={485} height={80} alt='Zirolu' className='w-full' priority />
            </div>
            
            <div className={`fixed top-0 left-0 w-full h-full bg-meta flex items-center justify-center z-50 ${error ? 'hidden' : ''}`}>
            <a href='/meta/cam' className='relative w-[80%] mx-auto flex justify-center items-center'>
                <Image src='/permata/error.png' width={327} height={221} alt='Zirolu' className='w-full' priority />
            </a>
            </div>

            <div className={`relative w-full flex flex-col justify-center items-center mt-2 mb-3 lg:mt-8 lg:mb-10 ${numProses1 ? 'opacity-100 pointer-events-none' : ''}`}>
                <div className='relative w-full'>
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

                    <div className={`animate-scanning w-[90%] mx-auto absolute left-0 right-0 bottom-0 z-10 pointer-events-nones  ${numProses1 ? '' : 'opacity-0'}`}>
                        <Image src='/scan-line2.png' width={656} height={240} alt='Zirolu' className='w-full' priority />
                    </div>

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
                        <Image src='/jelajahputri/btn-capture.png' width={864} height={210} alt='Zirolu' className='w-full' priority />
                    </button>
                </div>
            }

            {numProses1 && 
            <div className={`relative w-[90%]`}>
                <div className='animate-upDownCepet relative py-5 px-6 mt-5 text-6xl border-2 text-center bg-[#123D77] rounded-xl text-[#fff] font-bold'>
                    <p>{`Please wait, scanning...`}</p>
                    {/* <p>{`Process : ${(elapsedTime / 1000).toFixed(2)} seconds (${numProses} of 3)`}</p> */}
                    <p>{progressText} {progressPersen}</p>
                    {error}
                </div>
            </div>
            }

            <div className={`relative w-full ${numProses1 ? 'opacity-0 pointer-events-none' : ''}`}>
            <div className={`relative w-full ${!enabled ? 'hidden' : ''}`}>
                <div className="relative w-[80%] mx-auto flex justify-center items-center flex-col mt-0">
                    <button className="w-full relative mx-auto flex justify-center items-center" onClick={generateAI}>
                        <Image src='/jelajahputri/btn-surprise.png' width={864} height={210} alt='Zirolu' className='w-full' priority />
                    </button>
                    <button className="relative w-full mx-auto flex justify-center items-center mt-0" onClick={retake}>
                        <Image src='/comcon/iqos/btn-retake.png' width={864} height={210} alt='Zirolu' className='w-full' priority />
                    </button>
                </div>
            </div></div>
        </main>
    );
}
