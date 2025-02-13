'use client';

import Link from 'next/link';
import Image from "next/image";
import React,{ useEffect, useState, useRef } from 'react';
import { useQRCode } from 'next-qrcode';
import BgWaveCustom from "../../../components/BgWaveCustom";

export default function Result() {
    const [imageResultAI, setImageResultAI] = useState(null);
    const [formasiFix, setFormasiFix] = useState(null);
    const [auraFix, setAuraFix] = useState(null);
    const [generateQR, setGenerateQR] = useState(null);
    const [linkQR, setLinkQR] = useState('https://zirolu.id/');
    const [loadingDownload, setLoadingDownload] = useState(null);
    const [masalah, setMasalah] = useState(null);
    const [frame, setFrame] = useState(null);

    const [maxDuration, setMaxDuration] = useState(10);
    const [countdownStart, setCountdownStart] = useState(false);
    const timerRef = useRef(null);

    let componentRef = useRef();
    const [payload, setPayload] = useState({
        name: 'PRIMARIA',
        phone: 'MGNM SCREAM',
      });
    const { Canvas } = useQRCode();


    // const videoRef = useRef(null);
    // const previewRef = useRef(null);
    // useWebcam({ videoRef,previewRef});

    useEffect(() => {
        // Perform localStorage action
        if (typeof localStorage !== 'undefined') {
            const item2 = localStorage.getItem('faceImage')
            const item3 = localStorage.getItem('formasiFix')
            setImageResultAI(item2)
            setFormasiFix(item3)
        }

        // if(countdownStart){
        //     if(maxDuration == 0){
        //         location.href = '/comcon/visikom'
        //     }
        // }
    }, [imageResultAI, formasiFix])

    const downloadImageAI = () => {
        import('html2canvas').then(html2canvas => {
            html2canvas.default(document.querySelector("#capture"), {scale:1.2}).then(canvas => 
                uploadImage(canvas)
            )
        }).catch(e => {console("load failed")})
    }
    
    const uploadImage = async (canvas) => {
        setLoadingDownload('≈')

        canvas.toBlob(async function(blob) {
            let bodyFormData = new FormData();
            bodyFormData.append("name", 'GD - Magnum2');
            bodyFormData.append("phone", payload.phone);
            bodyFormData.append("file", blob, payload.name+'-photo-ai-zirolu.png');
          
            const options = {
                method: 'POST',
                body: bodyFormData,
                headers: {
                    'Authorization': 'de2e0cc3-65da-48a4-8473-484f29386d61:xZC8Zo4DAWR5Yh6Lrq4QE3aaRYJl9lss',
                    'Accept': 'application/json',
                }
            };
            
            await fetch('https://photo-ai-iims.zirolu.id/v1/magnumhammersonic', options)
                .then(response => response.json())
                .then(response => {
                    console.log(response)
                    setLinkQR(response.file)
                    setGenerateQR('true')
                    setLoadingDownload(null)
                })
                .catch(err => {
                    if (typeof localStorage !== 'undefined') {
                        const item = localStorage.getItem('faceURLResult')
                        setShowEmail('true')
                        setLinkQR(item)
                        setGenerateQR('true')
                        setLoadingDownload(null)
                    }
                });
        });
    }

    return (
        <main className="flex fixed h-full w-full overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20" onContextMenu={(e)=> e.preventDefault()}>
            <BgWaveCustom bg={'/greenday/m-bg.jpg'}></BgWaveCustom>

            {/* QR */}
            {generateQR && 
                <div className='absolute top-[2rem] left-0 right-0 bottom-0 flex items-center justify-center flex-col z-40 bg-black bg-opacity-0'>
                    <div className={`relative w-[80%] mx-auto flex items-center justify-center flex-col`}>

                        <div className='relative w-[80%] lg:w-[80%] mx-auto mb-2 lg:mb-10 flex justify-center items-center z-10'>
                            <Image src='/greenday/m-dapatkan.png' width={954} height={172} alt='Zirolu' className='w-full' priority />
                        </div>
                        <div className='relative w-[80%] mt-2 mx-auto flex items-center justify-center canvas-qr' onClick={()=>{setGenerateQR(null)}}>
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
                        <p className='block text-center text-base lg:text-4xl mt-1 mb-3 lg:mb-10 lg:mt-8 text-white'>*Scan  QR Code  untuk Download hasilnya</p> 
                        <Link href='/greenday/magnum2' className="relative w-[80%] mx-auto flex justify-center items-center">
                            <Image src='/greenday/m-btn-kembali2.png' width={764} height={144} alt='Zirolu' className='w-full' priority />
                        </Link>
                    </div>
                </div>
            }
            {/* QR */}


            {/* DOWNLOAD & PRINT */}
            {/* {imageResultAI && 
            <div className='relative w-full mt-0 mb-0 mx-auto flex justify-center items-center opacity-0 pointer-events-none'>
                <div className='absolute z-10 w-[10%]' id='capture'>
                    <div className={`relative w-[full] flex`}>
                        <Image src={imageResultAI}  width={896} height={1584} alt='Zirolu' className='relative block w-full'></Image>
                    </div>
                </div>
                <div className='absolute top-0 left-0  w-full' ref={(el) => (componentRef = el)}>
                    <div className={`relative w-[99.2%] flex`}>
                        <Image src={imageResultAI}  width={683} height={1024} alt='Zirolu' className='relative block w-full'></Image>
                    </div>
                </div>
            </div>
            } */}

            <div className={`${generateQR ? `opacity-0` : ``} relative w-[60%] lg:w-[46%] mx-auto mb-4 lg:mb-5 flex justify-center items-center z-10`}>
                <Image src='/greenday/m-fotolo2.png' width={614} height={64} alt='Zirolu' className='w-full' priority />
            </div>
            <div className={generateQR ? `opacity-0 pointer-events-none` : 'relative w-full flex justify-center items-center flex-col'}>
                {imageResultAI && 
                <div className='relative w-full lg:mt-10 mb-2 mx-auto flex justify-center items-center'>
                    <div className='relative z-10 w-[66%] border-2 lg:border-8 border-[#ffffff] rounded-sm'>
                        <div className={`relative w-full overflow-hidden flex justify-center items-center`} id='capture' ref={(el) => (componentRef = el)}>
                            <Image src={imageResultAI}  width={720} height={1280} alt='Zirolu' className='relative top-0 mx-auto w-full block z-20'></Image>

                        </div>
                    </div>
                    {/* <div className='absolute top-0 left-0' ref={(el) => (componentRef = el)}>
                        <div className={`relative w-[100%] flex`}>
                            <Image src={imageResultAI}  width={683} height={1024} alt='Zirolu' className='relative block w-full'></Image>
                        </div>
                    </div> */}
                    {/* <div id='canvasResult' className='absolute top-0 left-0 right-0 bottom-0 z-10'></div> */}
                </div>
                }
                {loadingDownload && 
                    <div className='animate-upDownCepet relative flex justify-center items-center py-2 lg:py-6 px-2 mt-2 lg:mt-5 text-base lg:text-4xl border-2 text-center bg-[#EF000F] rounded-xl text-[#fff] font-bold bg-white/30 p-7 rounded-full'>
                        <p>Tunggu sebentar...</p>
                    </div>
                }
                <div className={`relative w-full ${loadingDownload ? 'hidden' : ''}`}>

                    {/* <div className={`w-full`} onClick={downloadImageAI}>
                    <ReactToPrint
                    trigger={() => 
                        <div className={`w-full mt-5`}>
                            <div className="relative w-[90%] mx-auto flex justify-center items-center flex-col">
                                <div className="w-full relative mx-auto flex justify-center items-center">
                                <Image src='/iqos/btn-collect.png' width={640} height={88} alt='Zirolu' className='w-full' priority />
                                </div>
                            </div>
                        </div>
                    }
                    content={() => componentRef}
                    />
                    </div>  */}
                    <div className={`w-full`} onClick={downloadImageAI}>
                        <div className={`w-full mt-2 lg:mt-14`}>
                            <div className="relative w-[90%] mx-auto flex justify-center items-center flex-col">
                                <div className="w-full relative mx-auto flex justify-center items-center">
                                 <Image src='/greenday/m-btn-unduh.png' width={764} height={144} alt='Zirolu' className='w-full' priority />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-full mt-2 lg:mt-8'>
                        <div className="relative w-[90%] mx-auto flex justify-center items-center flex-col">
                            <Link href='/greenday/magnum2' className="relative w-full mx-auto flex justify-center items-center">
                            <Image src='/greenday/m-btn-kembali.png' width={764} height={144} alt='Zirolu' className='w-full' priority />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
