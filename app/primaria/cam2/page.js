'use client';

// import * as fal from '@fal-ai/serverless-client';
import { useEffect, useRef, useState, useMemo } from 'react';
import { getCookie } from 'cookies-next';
import Image from "next/image";
// import Link from 'next/link';
// import TopLogoPrimaria from "../../components/TopLogoPrimaria";
import { useRouter } from 'next/navigation';
import PadmaAIClient from "padmaai-client";

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

let FACE_URL_RESULT = '', genderOpsi = '', framePrompt = ''
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
    const [masalah, setMasalah] = useState(null);
    const [frame, setFrame] = useState(null);
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
            const item2 = localStorage.getItem('formasiFix')
            const item3 = localStorage.getItem('PMR_masalah')
            const item4 = localStorage.getItem('PMR_frame')
            setFormasiFix(item2)
            setMasalah(item3)
            setFrame(item4)
        }
        const aiInstance = new PadmaAIClient("https://padmaai.zirolu.id", "app_tXxTmRGXzUwliMw1sMgdFUlDFF2S2IO6", "f705afd1-32ce-4663-ad5a-9464e6e831f4");
        setPadmaAI(aiInstance);
        
    }, [styleFix, formasiFix, masalah, frame])

    const generateAI = async () => {
        setNumProses1(true)
        generateImageSwapBaru()
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

    // MALE_KAMAR, MALE_OFFICE, FEMALE_KAMAR, FEMALE_OFFICE

    const generateImageSwapBaru = async () => {
        // console.log(formasiFix)
        // console.log(masalah)
        framePrompt = masalah+frame

        if(masalah == 'DEADLINE' || masalah == 'DIMARAHIN' || masalah == 'LEMBUR'){
            genderOpsi = formasiFix+'_OFFICE'
        }else if(masalah == 'BOKEK' || masalah == 'DITIKUNG' || masalah == 'PUTUS'){
            genderOpsi = formasiFix+'_HANGOUT'
        }else{
            genderOpsi = formasiFix+'_KAMAR'
        }

        // console.log(genderOpsi)
        // console.log(framePrompt)

        padmaAI.onProgress((progress) => {
            // setProgress(progress.type); // Update the progress state
            // console.log("Progress:", progress); // Optional: log progress for debugging
            if(progress.type == 'executing'){
                setProgressText("Executing")
            }else if(progress.type == 'progress'){
                setProgressText("Progress : ")
                setProgressPersen(progress.progress+'%')
            }else if(progress.type == 'executed'){
                setProgressText("Done!")
                // setProgressPersen('Direct...')
            }

          });
          
          try {
            // Generate the image
            const result = await padmaAI.generateImages(imageFile, genderOpsi, framePrompt);
            // setImageUrl(result.imgUrl); // Assuming the image URL is returned

            FACE_URL_RESULT= result.imgUrl;

            toDataURL(FACE_URL_RESULT)
            .then(async dataUrl => {
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem("resulAIBase64", dataUrl)
                    localStorage.setItem("faceURLResult", FACE_URL_RESULT)
                }
                // setTimeout(() => {
                //     router.push('/primaria/result2');
                // }, 200);
                const options = {
                    method: 'POST',
                    body: JSON.stringify({
                        "name":getCookie('PMR_name'),
                        "ktp6":getCookie('PMR_ktp'),
                        "gender":getCookie('PMR_gender'),
                        "isSmoker":true,
                        "problem":masalah,
                        "cigaretteBrand":getCookie('PMR_jenisrokok'),
                        "totemLocation":"Jakarta",
                        "imageURL":FACE_URL_RESULT
                    }),
                    headers: {
                        'x-api-key': process.env.API_KEY_PRIMARIA,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                };
                
                await fetch(process.env.API_URL_PRIMARIA, options)
                    .then(response => response.json())
                    .then(response => {
                        console.log(response)
                        // router.push('/primaria/result2');
                        location.href = '/primaria/result2'
                    })
                    .catch(err => {
                        console.log(err)
                    });
            })
            // console.log(FACE_URL_RESULT)

          } catch (error) {
            console.error("Error generating image:", error);
          }
    }

    return (
        <main className="flex fixed h-full w-full bg-primaria overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20" onContextMenu={(e)=> e.preventDefault()}>
           {/* <TopLogoPrimaria></TopLogoPrimaria> */}
           <h1 className={`text-center text-xl lg:text-6xl font-medium mt-1 lg:mt-10 px-10 lg:px-0 ${kanit.className}`}>Tunjukin ekspresi ketawa lo yang paling lepas bebas</h1>

            <div className={`relative w-full flex flex-col justify-center items-center mt-2 mb-3 lg:mt-8 lg:mb-10 ${numProses1 ? 'opacity-100 pointer-events-none' : ''}`}>
                <div className='relative lg:w-full'>
                    {!enabled && 
                    <div className='absolute top-0 left-0 right-0 bottom-0 w-[50%] mx-auto flex justify-center items-center pointer-events-none z-10'>
                        <Image src='/icon-capture.png' width={389} height={220} alt='Zirolu' className='w-full' priority />
                    </div>
                    }

                    {captured && 
                    <div className='absolute top-0 left-0 right-0 bottom-0 w-[100px] h-[100px] lg:w-[174px] lg:h-[174px] overflow-hidden m-auto flex justify-center items-center pointer-events-none z-10'>
                        <div className='w-full animate-countdown translate-y-[35%]'>
                            <Image src='/countdown.png' width={174} height={522} alt='Zirolu' className='w-full' priority />
                        </div>
                    </div>
                    }

                    {/* {!enabled && 
                    <div className='w-[55%] mx-auto absolute left-0 right-0 bottom-0 z-10'>
                        <Image src='/frame-pose.png' width={426} height={461} alt='Zirolu' className='w-full' priority />
                    </div>
                    } */}

                    <div className={`animate-scanning w-[90%] mx-auto absolute left-0 right-0 bottom-0 z-10 pointer-events-nones  ${numProses1 ? '' : 'opacity-0'}`}>
                        <Image src='/scan-line2.png' width={656} height={240} alt='Zirolu' className='w-full' priority />
                    </div>

                    <video ref={videoRef} className={`w-[90%] mx-auto border-2 border-[#ffffff] rounded-sm ${enabled ? 'absolute opacity-0':'relative'}`} playsInline height={512}></video>
                    <canvas ref={previewRef} width="512" height="512" className={`${enabled ? 'relative':'absolute opacity-0'} w-[90%] top-0 left-0 right-0 mx-auto pointer-events-nones border-2 border-[#ffffff] rounded-sm`}></canvas>
                </div>
            </div>


            {!enabled && 
                // <p className='block text-center text-5xl mt-1 mb-3 lg:mt-4 text-white'>*Foto hanya sendiri <br></br> *Ikuti garis pose dan tidak terlalu zoom</p> 
                <p className='flex justify-center items-center text-center text-base lg:text-5xl mt-1 mb-3 lg:mt-4 text-white bg-white/30 p-7 rounded-full'>
                    <Image src='/primaria/icon-info.png' width={40} height={40} alt='Zirolu' className='w-[40px] mr-5' priority />
                    *Foto hanya sendiri
                </p> 
            }
            {!enabled && 
                <div className={`relative w-full flex justify-center items-center mt-2 lg:mt-10 ${capturedAwal ? 'opacity-0 pointer-events-none' : ''}`}>
                    <button className="relative mx-auto flex  w-[90%] justify-center items-center" onClick={captureVideo}>
                        <Image src='/primaria/btn-capture.png' width={899} height={206} alt='Zirolu' className='w-full' priority />
                    </button>
                </div>
            }


            <div className={`absolute pointer-events-none top-[3rem] left-0 right-0 mx-auto w-[35%] ${numProses1 ? 'opacity-0' : ''}`}>
                <div className={`relative w-full`}>
                    <Image src='/primaria/lihat.png' width={294} height={160} alt='Zirolu' className='relative block w-full'></Image>
                </div>
            </div>

            {numProses1 && 
            <div className={`relative w-[90%]`}>
                <div className='animate-upDownCepet relative flex justify-center items-center py-2 lg:py-6 px-2 mt-2 lg:mt-5 text-base lg:text-4xl border-2 text-center bg-[#EF000F] rounded-xl text-[#fff] font-bold bg-white/30 p-7 rounded-full'>
                    <Image src='/primaria/icon-info.png' width={40} height={40} alt='Zirolu' className='w-[40px] mr-5' priority />
                    <p>{`Sedang meng-capture moment lo!`}</p>
                    <p>&nbsp; {progressPersen}</p>
                    {/* <p>{progressText} {progressPersen}</p> */}
                        {/* <p>{`AI Proses : ${(elapsedTime / 1000).toFixed(2)} detik (${numProses}/2)`}</p> */}
                    {error}
                </div>
            </div>
            }

            <div className={`relative w-full ${numProses1 ? 'hidden opacity-0 pointer-events-none' : ''}`}>
            <div className={`relative w-full ${!enabled ? 'hidden' : ''}`}>
                <div className="relative w-[90%] mx-auto flex justify-center items-center flex-col mt-0">
                    <button className="w-full relative mx-auto flex justify-center items-center" onClick={generateAI}>
                        <Image src='/primaria/btn-surprise.png' width={899} height={206} alt='Zirolu' className='w-full' priority />
                    </button>
                    <button className="relative w-[90%] mx-auto flex justify-center items-center mt-0" onClick={retake}>
                        <Image src='/primaria/btn-retake.png' width={864} height={210} alt='Zirolu' className='w-full' priority />
                    </button>
                </div>
            </div></div>
        </main>
    );
}
