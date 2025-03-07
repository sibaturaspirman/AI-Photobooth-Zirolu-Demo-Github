'use client';

import Link from 'next/link';
import ImageNEXT from "next/image";
// import TopLogoAmeroSmall from "../../components/TopLogoAmeroSmall";
// import { getCookie } from 'cookies-next';
import React,{ useEffect, useState, useRef } from 'react';
import { useQRCode } from 'next-qrcode';
import BgWaveCustom from "../../components/BgWaveCustom";
import html2canvas from "html2canvas";

export default function Result() {
    const [videoSrc, setVideoSrc] = useState(null);
    const [generateQR, setGenerateQR] = useState(null);
    const [musicalFix, setMusicalFix] = useState(null);
    const [personalityFix, setPersonalityFix] = useState(null);
    const [nameFix, setNameFix] = useState("");
    const [linkQR, setLinkQR] = useState('https://zirolu.id/');
    const [loadingDownload, setLoadingDownload] = useState(null);
    const { Canvas } = useQRCode();

    const [base64Image, setBase64Image] = useState(null);
    const textRef = useRef(null);
    const [combinedImage, setCombinedImage] = useState(null);
    const canvasRef = useRef(null);
    const textCanvasRef = useRef(null);

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

    const fontMap = {
        soundwave: "/amild/notes/soundwave/",
        notes: "/amild/notes/notes/",
        equalizer: "/amild/notes/equalizer/",
    };

    useEffect(() => {
        if (!nameFix) return;
    
        const loadImages = async () => {
          const images = await Promise.all(
            nameFix.split("").map((char) => {
              return new Promise((resolve) => {
                const img = new Image();
                img.src = `${fontMap[musicalFix]}${char}.png`;
                img.onload = () => resolve(img);
                img.onerror = () => resolve(null);
              });
            })
          );
    
          // Buat canvas untuk menggabungkan gambar
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          let imgWidth, imgHeight;

          if(musicalFix == 'soundwave'){
           imgWidth = 27;
           imgHeight = 75;
          }else if(musicalFix == 'notes'){
           imgWidth = 21;
           imgHeight = 75;
          }else if(musicalFix == 'equalizer'){
            imgWidth = 24;
            imgHeight = 65;
           }


          canvas.width = imgWidth * images.length;
          canvas.height = imgHeight;
    
          images.forEach((img, index) => {
            if (img) ctx.drawImage(img, index * imgWidth, 0, imgWidth, imgHeight);
          });
    
          // Konversi canvas ke Base64
          setCombinedImage(canvas.toDataURL("image/png"));
        };
    
        loadImages();
      }, [nameFix, musicalFix]);

    // Convert text element to base64 image
    // const convertTextToBase64 = async () => {
    //     if (textRef.current) {
    //         const canvas = await html2canvas(textRef.current, {
    //           backgroundColor: null, // Set transparent background
    //           useCORS: true,
    //           scale: 2, // Improve quality
    //         });
    //         const ctx = canvas.getContext("2d");
    //         ctx.globalCompositeOperation = "destination-over";
    //         ctx.fillStyle = "rgba(255, 255, 255, 0)";
    //         ctx.fillRect(0, 0, canvas.width, canvas.height);
    //         setBase64Image(canvas.toDataURL("image/png"));
    //     }
    // };

    // useEffect(() => {
    //     convertTextToBase64();
    // }, [nameFix]);

    // useEffect(() => {
    //     if (!nameFix) return;
    //     const canvas = canvasRef.current;
    //     const ctx = canvas.getContext("2d");
    
    //     // Set canvas size
    //     canvas.width = 500;
    //     canvas.height = 200;
    //     ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    //     // Set transparent background
    //     ctx.fillStyle = "rgba(255, 255, 255, 0)";
    //     ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    //     // Text styles
    //     ctx.font = "bold 48px Arial";
    //     ctx.fillStyle = "#ffffff";
    //     ctx.textAlign = "center";
    //     ctx.textBaseline = "middle";
    //     ctx.fillText(nameFix, canvas.width / 2, canvas.height / 2);
    
    //     setBase64Image(canvas.toDataURL("image/png"));
    //   }, [nameFix]);
    useEffect(() => {
        if (!nameFix) return;
        const canvas = canvasRef.current;
        const textCanvas = textCanvasRef.current;
        const ctx = canvas.getContext("2d");
        const textCtx = textCanvas.getContext("2d");
        
        canvas.width = 200;
        canvas.height = 40;
        textCanvas.width = 200;
        textCanvas.height = 40;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        textCtx.clearRect(0, 0, textCanvas.width, textCanvas.height);
        
        textCtx.font = "bold 28px Arial";
        textCtx.textAlign = "center";
        textCtx.textBaseline = "middle";
        textCtx.lineWidth = 6; // Lebar border font
        textCtx.strokeStyle = "black"; // Warna border font
        textCtx.fillStyle = "white";
        textCtx.strokeText(nameFix, textCanvas.width / 2, textCanvas.height / 2);
        textCtx.fillText(nameFix, textCanvas.width / 2, textCanvas.height / 2);
        
        setBase64Image(textCanvas.toDataURL());
      }, [nameFix]);

    const downloadImageAI = () => {
        // import('html2canvas').then(html2canvas => {
        //     html2canvas.default(document.querySelector("#capture"), {scale:1}).then(canvas => 
        //         uploadImage(canvas)
        //     )
        // }).catch(e => {console("load failed")})
        uploadImage()
    }
    
    const uploadImage = async () => {
        setLoadingDownload('≈')

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
                        "value": combinedImage
                    },
                    {
                        "slug": "name",
                        "value": base64Image
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

        // canvas.toBlob(async function(blob) {
        //     const options = {
        //         method: 'POST',
        //         headers: {
        //             'x-app-id':'42b7bfed-5704-4b72-afb0-e006200da02f',
        //             'x-app-key':'3d807490f754f7bce5bed329824914473fa41c3772e0212a1b6d1c0b8b6046ce60f3702e24d5eeacfe011bc6344bf40788230ff849b1d2fd91cfd349759565e2',
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             "templateId": "d3ffffdc-b6fe-429a-98e1-44fe7aed14b2",
        //             "videoSlug": "the_happy_go_lucky",
        //             "params": [
        //                 {
        //                     "slug": "soundwave",
        //                     "value": combinedImage
        //                 },
        //                 {
        //                     "slug": "name",
        //                     "value": base64Image
        //                 }
        //             ]
        //         }),
        //     };
            
        //     await fetch('https://cms-ffmpeg.antigravity.dev/v1/game/submit', options)
        //         .then(response => response.blob())
        //         .then(response => {
        //             const url = URL.createObjectURL(response);
        //             setVideoSrc(url);
        //             // console.log(response)
        //             // setLinkQR(response.file)
        //             // setIdFormEmail(response.id)
        //             // setGenerateQR('true')
        //             setLoadingDownload(null)
        //         })
        //         .catch(err => {
        //             // if (typeof localStorage !== 'undefined') {
        //             //     const item = localStorage.getItem('faceURLResult')
        //             //     setShowEmail('true')
        //             //     setLinkQR(item)
        //             //     setGenerateQR('true')
        //             //     setLoadingDownload(null)
        //             // }
        //             console.log(err)
        //         });
        // });
    }

    return (
        <main className="flex fixed h-full w-full overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20" onContextMenu={(e)=> e.preventDefault()}>
            
            <BgWaveCustom bg={'/amild/am-bg.jpg'}></BgWaveCustom>
            {/* QR */}
            {generateQR && 
                <div className='absolute top-[2rem] left-0 right-0 bottom-0 flex items-center justify-center flex-col z-40 bg-black bg-opacity-0'>
                    <div className={`relative w-[80%] mx-auto flex items-center justify-center`}>
                        <ImageNEXT src='/primaria/popup-scan.png' width={966} height={1198} alt='Zirolu' className='w-full' priority />
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
                                <ImageNEXT src='/primaria/btn-tutup.png' width={899} height={206} alt='Zirolu' className='w-full' priority />
                            </Link>
                        </div>
                    </div>
                    {/* <div className={`relative w-[60%] mx-auto mb-3`}>
                        <ImageNEXT src='/comcon/zyn/scan.png' width={580} height={213} alt='Zirolu' className='w-full' priority />
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
                            <ImageNEXT src='/btn-download-image.png' width={410} height={96} alt='Zirolu' className='w-full' priority />
                        </a>
                    </div> */}
                    {/* <div className={`w-full mt-10`}>
                    <ReactToPrint
                    trigger={() => 
                        <div className={`w-full mt-5`}>
                            <div className="relative w-[60%] mx-auto flex justify-center items-center flex-col">
                                <div className="w-full relative mx-auto flex justify-center items-center">
                                    <ImageNEXT src='/comcon/veev/btn-print.png' width={880} height={144} alt='Zirolu' className='w-full' priority />
                                </div>
                            </div>
                        </div>
                    }
                    content={() => componentRef}
                    />
                    </div> */}
                    {/* <Link href='/aura' className="relative w-[60%] mx-auto flex justify-center items-center">
                    <ImageNEXT src='/comcon/zyn/btn-retake.png' width={864} height={210} alt='Zirolu' className='w-full' priority />
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
                        <ImageNEXT src={imageResultAI}  width={896} height={1584} alt='Zirolu' className='relative block w-full'></Image>
                    </div>
                </div>
                <div className='absolute top-0 left-0  w-full' ref={(el) => (componentRef = el)}>
                    <div className={`relative w-[99.2%] flex`}>
                        <ImageNEXT src={imageResultAI}  width={683} height={1024} alt='Zirolu' className='relative block w-full'></Image>
                    </div>
                </div>
            </div>
            } */}

            <div className={generateQR ? `opacity-0 pointer-events-none` : 'relative w-full flex justify-center items-center flex-col'}>
                
                <div className="relative w-[60%] mx-auto mt-0">
                <ImageNEXT src='/amild/am-ready.png' width={471} height={216} alt='Zirolu' className='w-full' priority />
                </div>
                
                <div className='relative w-full mt-10 mb-2 mx-auto flex justify-center items-center'>
                    <div className='relative z-10 w-[60%]'>
                        <div className="relative w-full mx-auto mt-0 shadow-2xl flex justify-center items-center">
                            <ImageNEXT src='/amild/am-polaroid.png' width={442} height={609} alt='Zirolu' className='w-full' priority />

                            <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center flex-col'>
                                <div className='relative w-full flex justify-center items-center mb-7' id='capture'>
                                    {nameFix.split("").map((char, index) => (
                                    <img
                                        key={index}
                                        src={`${fontMap[musicalFix]}${char}.png`}
                                        alt={char}
                                        className={`w-auto ${musicalFix == 'soundwave' ? 'h-[115px]' : ''}  ${musicalFix == 'notes' ? 'h-[145px]' : ''} ${musicalFix == 'equalizer' ? 'h-[115px]' : ''}`}
                                    />
                                    ))}
                                </div>

                                {/* Tampilkan Gambar Gabungan */}
                                {/* {combinedImage && (
                                    <div className='relative w-full flex justify-center items-center mb-7' id='capture'>
                                    <img src={combinedImage} alt="Combined Name" className="" />
                                    </div>
                                )} */}

                                <div ref={textRef}  className="relative text-4xl text-center text-[#fff] font-bold font-outline tracking-wider">
                                {nameFix}
                                </div>

                                {/* {base64Image && (
                                    <img src={base64Image} alt="Generated Name" className=" mb-5" />
                                )} */}
                                 <canvas ref={textCanvasRef} className="hidden" />
                                <canvas ref={canvasRef} style={{ display: "none" }} />

                                <div className={`${personalityFix == 'the_hopeless_romantic' ? '' : 'hidden'} relative w-[80%] mx-auto mt-0`}>
                                <ImageNEXT src='/amild/am-t1.png' width={867} height={222} alt='Zirolu' className='w-full' priority />
                                </div>
                                <div className={`${personalityFix == 'the_anti_mainstream' ? '' : 'hidden'} relative w-[80%] mx-auto mt-0`}>
                                <ImageNEXT src='/amild/am-t2.png' width={867} height={222} alt='Zirolu' className='w-full' priority />
                                </div>
                                <div className={`${personalityFix == 'the_happy_go_lucky' ? '' : 'hidden'} relative w-[80%] mx-auto mt-0`}>
                                <ImageNEXT src='/amild/am-t3.png' width={867} height={222} alt='Zirolu' className='w-full' priority />
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
                                <ImageNEXT src='/iqos/btn-collect.png' width={640} height={88} alt='Zirolu' className='w-full' priority />
                                </div>
                            </div>
                        </div>
                    }
                    content={() => componentRef}
                    />
                    </div>  */}
                    <div className={`w-full`}>
                            <div className="relative w-[90%] mx-auto flex justify-center items-center">
                                <div className="w-full relative mx-auto flex justify-center items-center">
                                 <ImageNEXT src='/amild/am-audio.png' width={288} height={88} alt='Zirolu' className='w-full' priority />
                                </div>
                                <div className="w-full relative mx-auto flex justify-center items-center" onClick={downloadImageAI}>
                                 <ImageNEXT src='/amild/am-video.png' width={288} height={88} alt='Zirolu' className='w-full' priority />
                                </div>
                            </div>
                    </div>

                    <div className='w-full'>
                        <div className="relative w-[35%] mx-auto flex justify-center items-center flex-col">
                            <Link href='/amildmusic' className="relative w-full mx-auto flex justify-center items-center">
                            <ImageNEXT src='/amild/am-back.png' width={307} height={27} alt='Zirolu' className='w-full' priority />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
