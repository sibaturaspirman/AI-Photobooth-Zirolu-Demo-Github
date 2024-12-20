'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Kanit} from "next/font/google";
const kanit = Kanit({ subsets: ["latin"], weight: ['400','700'] });

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
    const [statusAPI, setStatusAPI] = useState();
    const [urlVideo, setUrlVideo] = useState();

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
            context.clearRect(0, 0, canvas.width, canvas.height);
            // Draw a circular clipping region
            context.beginPath();
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const radius = Math.min(centerX, centerY); // Circle radius
            context.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
            context.clip();

            // Draw the video frame within the clipping region
            // context.drawImage(video, 0, 0, canvas.width, canvas.height);
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
    const [firstNameAmild, setFirstNameAmild] = useState();
    const [lastNameAmild, setLastNameAmild] = useState();
    const [rasiBintangAmild, setRasiBintangAmild] = useState();

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
            const item1 = localStorage.getItem('firstnameAmild')
            const item2 = localStorage.getItem('lastnameAmild')
            const item3 = localStorage.getItem('rasiBintangAmild')
            setFirstNameAmild(item1)
            setLastNameAmild(item2)
            setRasiBintangAmild(item3)
        }
    }, [firstNameAmild, lastNameAmild, rasiBintangAmild])



    const generateAI = async () => {
        // setNumProses1(true)
        router.push('/music/v3/firstname');
        // console.log(imageFile)
        // const options = {
        //     method: 'POST',
        //     body: JSON.stringify({
        //         name: firstNameAmild+' '+lastNameAmild,
        //         image:imageFile
        //     }),
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     }
        // };
        
        // await fetch('https://musicai-api.antigravity.dev/generate', options)
        //     .then(response => response.json())
        //     .then(response => {
        //         console.log(response)
        //         // setStatusAPI(response.status)
        //         if (typeof localStorage !== 'undefined') {
        //             localStorage.setItem("urlVideo", response.data)
        //         }
        //         // setNumProses1(null)
        //         setUrlVideo(response.data)
        //         setTimeout(() => {
        //             router.push('/music/v2/result');
        //         }, 100);
        //     })
        //     .catch(err => {
        //         console.log(err)
        //         // setStatusAPI('ERROR API!')
        //     });
    }

    return (
        <main className="flex fixed h-full w-full bg-[#CC1419] overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20" onContextMenu={(e)=> e.preventDefault()}>
            {/* LOADING */}
            {numProses1 && 
                <div className='absolute bg-[#CC1419] top-0 left-0 right-0 bottom-0 flex items-center justify-center flex-col z-50'>
                    <div className='animate-upDownCepet relative py-5 px-2 border-2 text-center text-[#fff] w-[94%] bg-black/30'>
                        {statusAPI && 
                            <p className='text-red-600 text-bold'>{statusAPI}</p>
                        }
                        <p className={`uppercase text-4xl  ${kanit.className}`}>A {rasiBintangAmild}, HUH?
                        is that why you strive for a perfect music?</p>
                        <p className='text-sm'>{`Estimated 10-30 seconds`}</p>
                    </div>
                </div>
            }
            {/* LOADING */}
            
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

                    {/* <div className={`animate-scanning w-[90%] mx-auto absolute left-0 right-0 bottom-0 z-10 pointer-events-nones  ${numProses1 ? '' : 'opacity-0'}`}>
                        <Image src='/scan-line2.png' width={656} height={240} alt='Zirolu' className='w-full' priority />
                    </div> */}

                    <video ref={videoRef} className={`w-[90%] mx-auto border-4 border-[#ffffff] rounded-lg  shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${enabled ? 'absolute opacity-0':'relative'}`} playsInline height={512}></video>
                    <canvas ref={previewRef} width="512" height="512" className={`${enabled ? 'relative':'absolute opacity-0'} w-[90%] top-0 left-0 right-0 mx-auto pointer-events-nones border-4 border-[#ffffff] rounded-full shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]`}></canvas>
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

            {/* {numProses1 && 
            <div className={`relative w-[70%]`}>
                <div className='animate-upDownCepet relative py-2 px-2 mt-5 text-base border-2 text-center bg-[#1B3CD8] rounded-xl text-[#fff] font-bold'>
                    <p>{`Please wait, scanning...`}</p>
                        <p>{`Process : ${(elapsedTime / 1000).toFixed(2)} seconds (${numProses} of 2)`}</p>
                    {error}
                </div>
            </div>
            } */}

            <div className={`relative w-full ${numProses1 ? 'hidden opacity-0 pointer-events-none' : ''}`}>
            <div className={`relative w-full ${!enabled ? 'hidden' : ''}`}>
                <div className="relative w-[65%] mx-auto flex justify-center items-center flex-col mt-0">
                    <button className="w-full relative mx-auto flex justify-center items-center" onClick={generateAI}>
                        <Image src='/music/btn-next2.png' width={864} height={210} alt='Zirolu' className='w-full' priority />
                    </button>
                    <button className="relative w-full mx-auto flex justify-center items-center mt-0" onClick={retake}>
                        <Image src='/comcon/zyn/btn-retake.png' width={864} height={210} alt='Zirolu' className='w-full' priority />
                    </button>
                </div>
            </div></div>
        </main>
    );
}
