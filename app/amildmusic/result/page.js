'use client';

import Link from 'next/link';
import Image from "next/image";
// import TopLogoAmeroSmall from "../../components/TopLogoAmeroSmall";
// import { getCookie } from 'cookies-next';
import React,{ useEffect, useState, useRef } from 'react';
import { useQRCode } from 'next-qrcode';
import BgWaveCustom from "../../components/BgWaveCustom";

export default function Result() {
    const [videoSrc, setVideoSrc] = useState(null);
    const [generateQR, setGenerateQR] = useState(null);
    const [musicalFix, setMusicalFix] = useState(null);
    const [personalityFix, setPersonalityFix] = useState(null);
    const [nameFix, setNameFix] = useState("");
    const [linkQR, setLinkQR] = useState('https://zirolu.id/');
    const [loadingDownload, setLoadingDownload] = useState(null);
    const { Canvas } = useQRCode();

    useEffect(() => {
        // Perform localStorage action
        if (typeof localStorage !== 'undefined') {
            const item = localStorage.getItem('musicalFix')
            const item2 = localStorage.getItem('personalityFix')
            const item3 = localStorage.getItem('nameFix')
            setMusicalFix(item)
            setPersonalityFix(item2)
            setNameFix(item3)
        }
    }, [musicalFix, personalityFix, nameFix])

    const imageMap = {
        A: "/amild/notes/equalizer/A.png",
        B: "/amild/notes/equalizer/B.png",
        C: "/amild/notes/equalizer/C.png",
        D: "/amild/notes/equalizer/D.png",
        E: "/amild/notes/equalizer/E.png",
        F: "/amild/notes/equalizer/F.png",
        G: "/amild/notes/equalizer/G.png",
        H: "/amild/notes/equalizer/H.png",
        I: "/amild/notes/equalizer/I.png",
        J: "/amild/notes/equalizer/J.png",
        K: "/amild/notes/equalizer/K.png",
        L: "/amild/notes/equalizer/L.png",
        M: "/amild/notes/equalizer/M.png",
        N: "/amild/notes/equalizer/N.png",
        O: "/amild/notes/equalizer/O.png",
        P: "/amild/notes/equalizer/P.png",
        Q: "/amild/notes/equalizer/Q.png",
        R: "/amild/notes/equalizer/R.png",
        S: "/amild/notes/equalizer/S.png",
        T: "/amild/notes/equalizer/T.png",
        U: "/amild/notes/equalizer/U.png",
        V: "/amild/notes/equalizer/V.png",
        W: "/amild/notes/equalizer/W.png",
        X: "/amild/notes/equalizer/X.png",
        Y: "/amild/notes/equalizer/Y.png",
        Z: "/amild/notes/equalizer/Z.png",
    };

    const downloadImageAI = () => {
        import('html2canvas').then(html2canvas => {
            html2canvas.default(document.querySelector("#capture"), {scale:1}).then(canvas => 
                uploadImage(canvas)
            )
        }).catch(e => {console("load failed")})
    }
    
    const uploadImage = async (canvas) => {
        setLoadingDownload('≈')

        canvas.toBlob(async function(blob) {
            const options = {
                method: 'POST',
                headers: {
                    'x-app-id':'42b7bfed-5704-4b72-afb0-e006200da02f',
                    'x-app-key':'3d807490f754f7bce5bed329824914473fa41c3772e0212a1b6d1c0b8b6046ce60f3702e24d5eeacfe011bc6344bf40788230ff849b1d2fd91cfd349759565e2',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "templateId": "d3ffffdc-b6fe-429a-98e1-44fe7aed14b2",
                    "videoSlug": "the_happy_go_lucky",
                    "params": [
                        {
                            "slug": "soundwave",
                            "value": "https://antigrvty.s3.ap-southeast-1.amazonaws.com/ffmpeg-assets/1741066947815.png"
                        },
                        {
                            "slug": "name",
                            "value": "https://antigrvty.s3.ap-southeast-1.amazonaws.com/ffmpeg-assets/1741066972081.png"
                        }
                    ]
                }),
            };
            
            await fetch('https://cms-ffmpeg.antigravity.dev/v1/game/submit', options)
                .then(response => response.blob())
                .then(response => {
                    const url = URL.createObjectURL(response);
                    setVideoSrc(url);
                    // console.log(response)
                    // setLinkQR(response.file)
                    // setIdFormEmail(response.id)
                    // setGenerateQR('true')
                    setLoadingDownload(null)
                })
                .catch(err => {
                    // if (typeof localStorage !== 'undefined') {
                    //     const item = localStorage.getItem('faceURLResult')
                    //     setShowEmail('true')
                    //     setLinkQR(item)
                    //     setGenerateQR('true')
                    //     setLoadingDownload(null)
                    // }
                    console.log(err)
                });
        });
    }

    return (
        <main className="flex fixed h-full w-full overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20" onContextMenu={(e)=> e.preventDefault()}>
            
            <BgWaveCustom bg={'/amild/am-bg.jpg'}></BgWaveCustom>
            {/* QR */}
            {generateQR && 
                <div className='absolute top-[2rem] left-0 right-0 bottom-0 flex items-center justify-center flex-col z-40 bg-black bg-opacity-0'>
                    <div className={`relative w-[80%] mx-auto flex items-center justify-center`}>
                        <Image src='/primaria/popup-scan.png' width={966} height={1198} alt='Zirolu' className='w-full' priority />
                        <div className='absolute w-[90%]'>
                            <div className='relative w-[80%] mt-[9rem] mx-auto flex items-center justify-center canvas-qr' onClick={()=>{setGenerateQR(null)}}>
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
                            <p className='block text-center text-4xl mt-1 mb-3 lg:mt-8 text-white'>*Scan  QR Code  untuk Download hasilnya</p> 
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
                
                <div className="relative w-[60%] mx-auto mt-0">
                <Image src='/amild/am-ready.png' width={471} height={216} alt='Zirolu' className='w-full' priority />
                </div>
                
                <div className='relative w-full mt-10 mb-2 mx-auto flex justify-center items-center'>
                    <div className='relative z-10 w-[60%]'>
                        <div className="relative w-full mx-auto mt-0 shadow-2xl flex justify-center items-center">
                            <Image src='/amild/am-polaroid.png' width={442} height={609} alt='Zirolu' className='w-full' priority />

                            <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center flex-col'>
                                <div className='relative w-full flex justify-center items-center mb-7'>
                                    {nameFix.split("").map((char, index) => (
                                    <img
                                        key={index}
                                        src={imageMap[char]}
                                        alt={char}
                                        className="w-auto h-[110px]"
                                    />
                                    ))}
                                </div>

                                <div className="relative text-4xl text-center text-[#000] font-bold mb-2">
                                    <p>{nameFix}</p>
                                </div>

                                <div className={`${personalityFix == 'the_hopeless_romantic' ? '' : 'hidden'} relative w-[80%] mx-auto mt-0`}>
                                <Image src='/amild/am-t1.png' width={867} height={222} alt='Zirolu' className='w-full' priority />
                                </div>
                                <div className={`${personalityFix == 'the_anti_mainstream' ? '' : 'hidden'} relative w-[80%] mx-auto mt-0`}>
                                <Image src='/amild/am-t2.png' width={867} height={222} alt='Zirolu' className='w-full' priority />
                                </div>
                                <div className={`${personalityFix == 'the_happy_go_lucky' ? '' : 'hidden'} relative w-[80%] mx-auto mt-0`}>
                                <Image src='/amild/am-t3.png' width={867} height={222} alt='Zirolu' className='w-full' priority />
                                </div>
                            </div>

                        </div>
                        <div className={`relative w-full overflow-hidden flex justify-center items-center`}>
                        {videoSrc && (
                                <video controls width="100%">
                                <source src={videoSrc} type="video/mp4" />
                                Your browser does not support the video tag.
                                </video>
                            )}
                        </div>
                    </div>
                </div>
                
                {loadingDownload && 
                    <div className='animate-upDownCepet relative py-6 px-8 mt-5 text-4xl border-2 text-center bg-[#EF000F] rounded-xl text-[#fff] font-bold'>
                        <p>Please wait, loading...</p>
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
                            <div className="relative w-[90%] mx-auto flex justify-center items-center">
                                <div className="w-full relative mx-auto flex justify-center items-center">
                                 <Image src='/amild/am-audio.png' width={288} height={88} alt='Zirolu' className='w-full' priority />
                                </div>
                                <div className="w-full relative mx-auto flex justify-center items-center">
                                 <Image src='/amild/am-video.png' width={288} height={88} alt='Zirolu' className='w-full' priority />
                                </div>
                            </div>
                    </div>

                    <div className='w-full'>
                        <div className="relative w-[35%] mx-auto flex justify-center items-center flex-col">
                            <Link href='/amildmusic' className="relative w-full mx-auto flex justify-center items-center">
                            <Image src='/amild/am-back.png' width={307} height={27} alt='Zirolu' className='w-full' priority />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
