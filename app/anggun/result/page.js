'use client';

import Link from 'next/link';
import Image from "next/image";
import { getCookie } from 'cookies-next';
import React,{ useEffect, useState, useRef } from 'react';
import { useQRCode } from 'next-qrcode';
// import io from 'socket.io-client';
// import { Poppins} from "next/font/google";
// const poppins = Poppins({ subsets: ["latin"], weight: ['400','700', '900'] });
// import BtnHexagon2 from "../components/BtnHexagon2";
import ReactToPrint from "react-to-print";


export default function Result() {
    const [imageResultAI, setImageResultAI] = useState(null);
    const [generateQR, setGenerateQR] = useState(null);
    const [linkQR, setLinkQR] = useState('https://zirolu.id/');
    const [styleGender, setStyleGender] = useState(null);
    const [loadingDownload, setLoadingDownload] = useState(null);
    let componentRef = useRef();

    // const [payload, setPayload] = useState({
    //   name: 'MLB',
    //   phone: '001',
    //   stasiun: getCookie('stasiun'),
    //   stasiunName: getCookie('stasiunName'),
    // });
    const { Canvas } = useQRCode();

    useEffect(() => {
        // Perform localStorage action
        if (typeof localStorage !== 'undefined') {
            const item = localStorage.getItem('resulAIBase64')
            const item2 = localStorage.getItem('faceURLResult')
            const item3 = localStorage.getItem('styleGender')
            setImageResultAI(item)
            setLinkQR(item2)
            setStyleGender(item3)
        }
    }, [imageResultAI, linkQR, styleGender])

    const downloadImageAI = () => {
        // gtag('event', 'ClickButton', {
        //     event_category: 'Button',
        //     event_label: 'ResultPage - '+payload.stasiunName,
        //     event_action: 'CollectYourPhoto'
        // })
        
        // import('html2canvas').then(html2canvas => {
        //     html2canvas.default(document.querySelector("#capture"), {scale:1}).then(canvas => 
        //         uploadImage(canvas)
        //     )
        // }).catch(e => {console("load failed")})
        uploadImage()
        setGenerateQR('true')
    }
    const uploadImage = async (canvas) => {
        setLoadingDownload('≈')

        const options = {
            method: 'POST',
            body: JSON.stringify({
                name:'ANGGUN - '+styleGender,
                phone:'0003',
                image:linkQR
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
                // emitString("sendImage", response.file);
                // setIdFormEmail(response.id)
                setGenerateQR('true')
                setLoadingDownload(null)
            })
            .catch(err => {
                if (typeof localStorage !== 'undefined') {
                    const item = localStorage.getItem('faceURLResult')
                    // setShowEmail('true')
                    setLinkQR(item)
                    setGenerateQR('true')
                    setLoadingDownload(null)
                }
            });
    }
    const backHome = () => {
        // gtag('event', 'ClickButton', {
        //     event_category: 'Button',
        //     event_label: 'ResultPage - '+payload.stasiunName,
        //     event_action: 'BackToHome'
        // })
    }

    

    return (
        <main className="flex fixed h-full w-full bg-anggun overflow-auto flex-col justify-center items-center py-16 px-20" onContextMenu={(e)=> e.preventDefault()}>
            {/* QR */}
            {generateQR && 
                <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center flex-col z-40 bg-kai3 text-black bg-opacity-0'>
                    <div className='fixed top-0 mx-auto w-[65%] mt-28'>
                        <Image src='/anggun/title-scan.png' width={815} height={195} alt='Zirolu' className='w-full' priority />
                    </div>
                    <div className='relative mt-[-14vh] w-[60%] mx-auto flex items-center justify-center canvas-qr border-4 border-black' onClick={()=>{setGenerateQR(null)}}>
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
                    {/* <p className={`text-center font-semibold text-2xl lg:text-4xl mt-10 ${poppins.className}`}>Scan this QR Code to Download your image.</p> */}

                    {/* <div className={`relative w-full  ${showEmail ? 'hidden' : ''}`}>
                    <div className="relative w-[60%] mx-auto flex justify-center items-center flex-col mt-5">
                        <button className="relative mx-auto flex justify-center items-center" onClick={()=>setSendEmailGak('true')}>
                            <Image src='/btn-send-email.png' width={410} height={96} alt='Zirolu' className='w-full' priority />
                        </button>
                        <a href={linkQR} target='_blank' className="relative mx-auto flex justify-center items-center">
                            <Image src='/btn-download-image.png' width={410} height={96} alt='Zirolu' className='w-full' priority />
                        </a>
                    </div>
                    </div> */}
                    {/* <Link href='/' className='text-center font-semibold text-lg mt-2 p-20' onClick={()=>{setGenerateQR(null)}}>Tap here to close</Link> */}
                    {/* <a href='/home' className='text-center font-semibold text-4xl py-20 pb-36 p-40'>Tap here to close</a> */}

                    <div className={`fixed left-0 bottom-0 w-full`}>
                        <div className="relative w-[80%] mx-auto flex justify-center items-center flex-col" onClick={backHome}>
                            <Link href='/anggun' className="relative w-full mx-auto flex justify-center items-center pb-14">
                                <Image src='/anggun/btn-back.png' width={772} height={135} alt='Zirolu' className='w-full' priority />
                            </Link>
                        </div>
                    </div>
                </div>
            }
            {/* QR */}


            {/* DOWNLOAD & PRINT */}
            {imageResultAI && 
            <div className='relative w-full mt-0 mb-0 mx-auto flex justify-center items-center opacity-0 pointer-events-none'>
                {/* <div className='absolute z-10 w-[20%]' id='capture'>
                    <div className={`relative w-[full] flex`}>
                        <Image src={imageResultAI}  width={630} height={1120} alt='Zirolu' className='relative block w-full'></Image>
                    </div>
                </div> */}
                <div className='absolute top-0 left-0  w-full' ref={(el) => (componentRef = el)}>
                    <div className={`relative w-[99%] flex`}>
                        <Image src={imageResultAI}  width={683} height={1024} alt='Zirolu' className='relative block w-full'></Image>
                    </div>
                </div>
            </div>
            }

            <div className={generateQR ? `opacity-0 pointer-events-none w-full` : 'w-full'}>
                {imageResultAI && 
                <div className='relative w-[80%] mt-10 mx-auto flex justify-center items-center rounded-sm' onClick={downloadImageAI}>
                    <div className='relative w-full'>
                        <Image src={imageResultAI}  width={683} height={1024} alt='Zirolu' className='relative block w-full'></Image>
                    </div>
                </div>
                }
                {loadingDownload && 
                    <div className='rrelative p-5 mt-14 border-2 border-[#b1454a] text-center bg-[#CF1F29] text-[#fff] text-4xl overflow-auto no-scrollbar w-[70%] mx-auto rounded-lg'>
                        <p>Please wait, loading...</p>
                    </div>
                }
                <div className={`relative w-full ${loadingDownload ? 'hidden' : ''}`}>
                    <div className={`w-full`}>
                        <div className={`w-full mt-14`}>
                            <div className="relative w-[80%] mx-auto flex justify-center items-center flex-col">
                                <div className="w-full relative mx-auto flex justify-center items-center" onClick={downloadImageAI}>
                                    <Image src='/anggun/btn-collect.png' width={480} height={96} alt='Zirolu' className='w-full' priority />
                                </div>


                                {/* <div className={`w-full`} onClick={downloadImageAI}>
                                <ReactToPrint
                                trigger={() => 
                                    <div className={`w-full`}>
                                        <div className="w-full relative mx-auto flex justify-center items-center">
                                            <Image src='/btn-collect.png' width={480} height={96} alt='Zirolu' className='w-full' priority />
                                        </div>
                                    </div>
                                }
                                content={() => componentRef}
                                />
                                </div>  */}

                                <Link href='/anggun' className="relative w-full mx-auto flex justify-center items-center" onClick={backHome}>
                                    <Image src='/anggun/btn-back.png' width={772} height={135} alt='Zirolu' className='w-full' priority />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
