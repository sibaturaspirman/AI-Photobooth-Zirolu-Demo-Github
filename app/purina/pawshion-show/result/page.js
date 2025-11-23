'use client';

import Link from 'next/link';
import Image from "next/image";
import { getCookie } from 'cookies-next';
import React,{ useEffect, useState, useRef } from 'react';
import { useQRCode } from 'next-qrcode';
// import io from 'socket.io-client';
// import { Merriweather} from "next/font/google";
// const merriweather = Merriweather({ subsets: ["latin"], weight: ['400','700'] });
// import BtnHexagon2 from "../../components/BtnHexagon2";
// import ReactToPrint from "react-to-print";

export default function Result() {
    const [imageResultAI, setImageResultAI] = useState(null);
    const [imageResultAI2, setImageResultAI2] = useState(null);
    const [imageResultAI3, setImageResultAI3] = useState(null);
    const [imageFinalAI, setImageFinalAI] = useState(null);
    const [formasiFix, setFormasiFix] = useState(null);
    const [styleGeneral, setStyleGeneral] = useState(null);
    const [finalResult, setFinalResult] = useState(null);
    const [generateQR, setGenerateQR] = useState(null);
    const [linkQR, setLinkQR] = useState('https://zirolu.id/');
    const [idFormEmail, setIdFormEmail] = useState(null);
    const [sendEmailGak, setSendEmailGak] = useState(null);
    const [alamatEmail, setAlamatEmail] = useState();
    const [keKirimEmailGak, setKeKirimEmailGak] = useState(null);
    const [loadingDownload, setLoadingDownload] = useState(null);
    const [showEmail, setShowEmail] = useState(null);
    let componentRef = useRef();
    const [payload, setPayload] = useState({
        name: getCookie('name'),
        phone: getCookie('phone')
      });
    // const [payload, setPayload] = useState({
    //     name: 'IQOS',
    //     phone: '00000',
    //   });
    const { Canvas } = useQRCode();


    // const videoRef = useRef(null);
    // const previewRef = useRef(null);
    // useWebcam({ videoRef,previewRef});

    useEffect(() => {
        // Perform localStorage action
        if (typeof localStorage !== 'undefined') {
            const item = localStorage.getItem('PurinaShowresultAIBase64')
            const item2 = localStorage.getItem('PurinaShowURLResult')
            setImageResultAI(item)
            setImageFinalAI(item2)
            setLinkQR(item2)
        }
    }, [imageResultAI, imageFinalAI, linkQR])

    const downloadImageAI = async () => {
        try {
          if (!imageResultAI) {
            console.log("No image in localStorage");
            return;
          }
          
          setLoadingDownload('true')
          // imageResultAI = base64 dataURL (ex: "data:image/png;base64,xxx")
          const dataURL = imageResultAI;
      
          // Convert base64 → blob
          const blob = await (await fetch(dataURL)).blob();
          const file = new File([blob], "purina-star.png", { type: blob.type });
      
          // Cek apakah support share file
          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: "Purina Star",
              text: "Your pet has become a Purina Star!",
              files: [file],
            });

            setLoadingDownload(null)
            return;
          }
      
          // Kalau support share tapi ga bisa share file → share text saja
          if (navigator.share) {
            await navigator.share({
              title: "Purina Star",
              text: "Your pet has become a Purina Star!",
            });

            setLoadingDownload(null)
            return;
          }
      
          // Fallback terakhir — buka image secara direct
          const a = document.createElement("a");
          a.href = dataURL;
          a.download = "purina-star.png";
          a.click();
      
        } catch (err) {
          console.error("Share failed:", err);
      
          // Fallback jika error
          const a = document.createElement("a");
          a.href = imageResultAI;
          a.download = "purina-star.png";
          a.click();
          
          setLoadingDownload(null)
        }
      };
      
      
    const uploadImage = async (canvas) => {
        setLoadingDownload('≈')

        canvas.toBlob(async function(blob) {
            const options = {
                method: 'POST',
                body: JSON.stringify({
                    name: 'PAWSHION SHOW',
                    phone: '2025',
                    image: linkQR
                }),
                headers: {
                    'Authorization': 'de2e0cc3-65da-48a4-8473-484f29386d61:xZC8Zo4DAWR5Yh6Lrq4QE3aaRYJl9lss',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            };
            
            await fetch('https://photo-ai-iims.zirolu.id/v1/pln', options)
                .then(response => response.json())
                .then(response => {
                    console.log(response)
                    // setLinkQR(response.file)
                    // setIdFormEmail(response.id)
                    setGenerateQR('true')
                    setLoadingDownload(null)
                })
                .catch(err => {
                    if (typeof localStorage !== 'undefined') {
                        // const item = localStorage.getItem('faceURLResult')
                        setShowEmail('true')
                        setLinkQR(item)
                        setGenerateQR('true')
                        setLoadingDownload(null)
                    }
                });
        });
    }

    return (
        <main className="flex fixed h-full w-full bg-purina-ps overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20">
            {/* QR */}
            {generateQR && 
                <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center flex-col z-40 bg-black bg-opacity-0'>
                    {/* <h1 className={`text-center text-xl mt-0 lg:mt-0 lg:text-7xl lg:mb-5 text-white font-bold`}>Congratulations, <br></br> your photo was successfully printed!</h1> */}
                    <h1 className={`text-center text-2xl mt-[-.7rem] lg:mt-0 lg:text-5xl lg:mb-5 px-5 text-white font-bold`}>Scan this QR Code <br></br> to Download your image.</h1>
                    <div className='relative mt-3 w-[50%] mx-auto flex items-center justify-center canvas-qr' onClick={()=>{setGenerateQR(null)}}>
                        <Canvas
                        text={linkQR}
                        options={{
                            errorCorrectionLevel: 'M',
                            margin: 3,
                            scale: 4,
                            width: 500,
                            color: {
                            dark: '#000000',
                            light: '#ffffff',
                            },
                        }}
                        />
                    </div>
                    <Link href='/tautaufest' className='text-center font-semibold text-2xl py-4 p-10 text-white w-full'>Tap here to close</Link>
                </div>
            }
            {/* QR */}


            {/* DOWNLOAD & PRINT */}
            <div className={`relative w-full ${generateQR ? `opacity-0 pointer-events-none` : ''}`}>
                <div className="flex items-start justify-between">
                    <div className="relative w-[35%] mx-auto mb-2">
                        <Image
                        src="/purina/ps-purina.png"
                        width={150} height={56} alt='Zirolu' className='w-full' priority
                        />
                    </div>
                </div>
                <p className="text-white text-xl font-semibold leading-snug mb-2 text-center">
                Your Pet Has Become a Purina Star
                </p>
            </div>

            <div className={`relative w-full ${generateQR ? `opacity-0 pointer-events-none` : ''}`}>
                {imageResultAI && 
                <div className='relative w-full mt-0 mb-5 mx-auto flex justify-center items-center'>
                    <div className='relative z-10 w-[80%]' id='capture'>
                        <div className={`relative w-[full] flex`}>
                            <Image src={imageResultAI}  width={1008} height={1056} alt='Zirolu' className='relative block w-full'></Image>
                        </div>
                    </div>
                </div>
                }
                {loadingDownload && 
                    <div className='relative mt-5 lg:mt-2 rounded-lg border-2 border-[#fff] text-center bg-[#8f020b] text-[#fff] lg:font-bold p-5 py-3 lg:text-5xl w-[80%] lg:w-[80%] mx-auto'>
                        <p>Please wait, loading...</p>
                    </div>
                }
                <div className={`relative w-full z-40 ${loadingDownload ? 'hidden' : ''}`}>

                    <div className={`w-full`} onClick={downloadImageAI}>
                        <div className={`w-full mt-5`}>
                            <div className="relative w-[80%] mx-auto flex justify-center items-center flex-col">
                                <div className="w-full relative mx-auto flex justify-center items-center">
                                <Image src='/purina/ps-download.png' width={319} height={67} alt='Zirolu' className='w-full' priority />
                                </div>
                            </div>
                        </div>
                    </div> 
                    {/* {imageResultAI && 
                    <div className={`w-full`} onClick={downloadImageAI}>
                    <ReactToPrint
                    trigger={() => 
                        <div className={`w-full mt-0`}>
                            <div className="relative w-[80%] mx-auto flex justify-center items-center flex-col">
                                <div className="w-full relative mx-auto flex justify-center items-center">
                                <Image src='/purina/ps-download.png' width={319} height={67} alt='Zirolu' className='w-full' priority />
                                </div>
                            </div>
                        </div>
                    }
                    content={() => componentRef}
                    />
                    </div> 
                    } */}

                    <div className='w-full mt-3'>
                        <div className="relative w-[70%] mx-auto flex justify-center items-center flex-col">
                            <Link href='/purina/pawshion-show' className="relative w-full mx-auto flex justify-center items-center">
                                <Image src='/tautaufest/btn-retake.png' width={505} height={136} alt='Zirolu' className='w-full' priority />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
