'use client';

import Link from 'next/link';
import Image from "next/image";
// import TopLogoAmeroSmall from "../../components/TopLogoAmeroSmall";
// import { getCookie } from 'cookies-next';
import React,{ useEffect, useState, useRef } from 'react';
import { useQRCode } from 'next-qrcode';
import TopLogoPrimaria from "../../components/TopLogoPrimaria";

export default function Result() {
    const [imageResultAI, setImageResultAI] = useState(null);
    const [imageResultAI2, setImageResultAI2] = useState(null);
    const [imageResultAI3, setImageResultAI3] = useState(null);
    const [formasiFix, setFormasiFix] = useState(null);
    const [auraFix, setAuraFix] = useState(null);
    const [generateQR, setGenerateQR] = useState(null);
    const [linkQR, setLinkQR] = useState('https://zirolu.id/');
    const [idFormEmail, setIdFormEmail] = useState(null);
    const [sendEmailGak, setSendEmailGak] = useState(null);
    const [alamatEmail, setAlamatEmail] = useState();
    const [keKirimEmailGak, setKeKirimEmailGak] = useState(null);
    const [loadingDownload, setLoadingDownload] = useState(null);
    const [showEmail, setShowEmail] = useState(null);
    const [masalah, setMasalah] = useState(null);
    const [frame, setFrame] = useState(null);

    const [maxDuration, setMaxDuration] = useState(10);
    const [countdownStart, setCountdownStart] = useState(false);
    const timerRef = useRef(null);

    let componentRef = useRef();
    const [payload, setPayload] = useState({
        name: 'PRIMARIA',
        phone: '00004',
      });
    const { Canvas } = useQRCode();


    // const videoRef = useRef(null);
    // const previewRef = useRef(null);
    // useWebcam({ videoRef,previewRef});

    useEffect(() => {
        // Perform localStorage action
        if (typeof localStorage !== 'undefined') {
            const item = localStorage.getItem('faceURLResult')
            const item2 = localStorage.getItem('resulAIBase64')
            // const item3 = localStorage.getItem('formasiFix')
            // const item4 = localStorage.getItem('auraFix')
            // const item5 = localStorage.getItem('PMR_masalah')
            // const item6 = localStorage.getItem('PMR_frame')
            setImageResultAI(item2)
            // setImageResultAI2(item2)
            // setAuraFix(item4)
            // setFormasiFix(item3)
            // setMasalah(item5)
            // setFrame(item6)
            setLinkQR(item)
        }

        // if(countdownStart){
        //     if(maxDuration == 0){
        //         location.href = '/comcon/visikom'
        //     }
        // }
    }, [imageResultAI, formasiFix, countdownStart, maxDuration, masalah, frame, linkQR])

    const downloadImageAI = () => {
        // import('html2canvas').then(html2canvas => {
        //     html2canvas.default(document.querySelector("#capture"), {scale:1}).then(canvas => 
        //         uploadImage(canvas)
        //     )
        // }).catch(e => {console("load failed")})
        setLoadingDownload('≈')
        setTimeout(() => {
            setGenerateQR('true')
            setLoadingDownload(null)
        }, 500);
    }

    return (
        <main className="flex fixed h-full w-full bg-primaria overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20" onContextMenu={(e)=> e.preventDefault()}>
            <div className='fixed top-0 left-0 right-0 mx-auto'>
                <TopLogoPrimaria></TopLogoPrimaria>
            </div>
            {/* QR */}
            {generateQR && 
                <div className='absolute top-0 lg:top-[2rem] left-0 right-0 bottom-0 flex items-center justify-center flex-col z-40 bg-black bg-opacity-0'>
                    <div className={`relative w-[80%] mx-auto flex items-center justify-center`}>
                        <Image src='/primaria/popup-scan.png' width={966} height={1198} alt='Zirolu' className='w-full' priority />
                        <div className='absolute w-[90%]'>
                            <div className='relative w-[80%] mt-16 lg:mt-[9rem] mx-auto flex items-center justify-center canvas-qr' onClick={()=>{setGenerateQR(null)}}>
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
                            <p className='block text-center text-base lg:text-4xl mt-2 lg:mt-1 lg:mb-3 lg:mt-8 text-white'>*Scan  QR Code  untuk Download hasilnya</p> 
                            <Link href='/primaria' className="relative w-[90%] mx-auto flex justify-center items-center">
                                <Image src='/primaria/btn-tutup.png' width={899} height={206} alt='Zirolu' className='w-full' priority />
                            </Link>
                        </div>
                    </div>
                    {/* <div className={`relative w-[60%] mx-auto mb-3`}>
                        <Image src='/comcon/zyn/scan.png' width={580} height={213} alt='Zirolu' className='w-full' priority />
                    </div>
                    <div className='relative mt-3 w-[60%] mx-auto flex items-center justify-center canvas-qr' onClick={()=>{setGenerateQR(null)}}>
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
                    <div className="relative w-[60%] mx-auto flex justify-center items-center flex-col mt-2">
                        <a href={linkQR} target='_blank' className="relative mx-auto flex justify-center items-center">
                            <Image src='/btn-download-image.png' width={410} height={96} alt='Zirolu' className='w-full' priority />
                        </a>
                    </div> */}
                    {/* <div className={`w-full mt-10`}>
                    <ReactToPrint
                    trigger={() => 
                        <div className={`w-full mt-5`}>
                            <div className="relative w-[60%] mx-auto flex justify-center items-center flex-col">
                                <div className="w-full relative mx-auto flex justify-center items-center">
                                    <Image src='/comcon/veev/btn-print.png' width={880} height={144} alt='Zirolu' className='w-full' priority />
                                </div>
                            </div>
                        </div>
                    }
                    content={() => componentRef}
                    />
                    </div> */}
                    {/* <Link href='/aura' className="relative w-[60%] mx-auto flex justify-center items-center">
                    <Image src='/comcon/zyn/btn-retake.png' width={864} height={210} alt='Zirolu' className='w-full' priority />
                    </Link> */}
                    {/* <Link href='/comcon/visikom' className='text-center font-semibold text-base lg:text-7xl  pt-20 p-40 py-96 text-white w-full'>Tap here to close</Link> */}
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

            <div className={generateQR ? `opacity-0 pointer-events-none` : 'relative w-full flex justify-center items-center flex-col'}>
                {imageResultAI && 
                <div className='relative w-full lg:mt-10 mb-2 mx-auto flex justify-center items-center'>
                    <div className='relative z-10 w-[60%] lg:w-[90%]'>
                        <div className={`relative w-full overflow-hidden flex justify-center items-center`} id='capture' ref={(el) => (componentRef = el)}>
                            <Image src={imageResultAI}  width={824} height={1064} alt='Zirolu' className='relative top-0 mx-auto w-full block'></Image>

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
                    <div className='animate-upDownCepet relative py-2 lg:py-6 px-2 mt-2 lg:mt-5 text-base lg:text-4xl border-2 text-center bg-[#EF000F] rounded-xl text-[#fff] font-bold'>
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
                        <div className={`w-full mt-2`}>
                            <div className="relative w-[70%] lg:w-[90%] mx-auto flex justify-center items-center flex-col">
                                <div className="w-full relative mx-auto flex justify-center items-center">
                                 <Image src='/primaria/btn-collect.png' width={899} height={206} alt='Zirolu' className='w-full' priority />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-full'>
                        <div className="relative w-[65%] lg:w-[80%] mx-auto flex justify-center items-center flex-col">
                            <Link href='/primaria' className="relative w-full mx-auto flex justify-center items-center">
                            <Image src='/primaria/btn-selesai.png' width={819} height={126} alt='Zirolu' className='w-full' priority />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
