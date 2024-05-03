'use client';

import Link from 'next/link';
import Image from "next/image";
import TopLogoMagnumFixed from "../../components/TopLogoMagnumFixed";
// import TopLogoAmeroSmall from "../../components/TopLogoAmeroSmall";
import { getCookie } from 'cookies-next';
import React,{ useEffect, useState, useRef } from 'react';
import { useQRCode } from 'next-qrcode';
// import io from 'socket.io-client';
// import { Merriweather} from "next/font/google";
// const merriweather = Merriweather({ subsets: ["latin"], weight: ['400','700'] });
// import BtnHexagon2 from "../../components/BtnHexagon2";
import ReactToPrint from "react-to-print";


// function downloadImage(data, filename = 'untitled.jpeg') {
//     var a = document.createElement('a');
//     a.href = data;
//     a.download = filename;
//     document.body.appendChild(a);
//     a.click();
// }

// SETUP SOCKET
// let SERVER_IP = "https://ag.socket.web.id:11100";
// let NETWORK = null;

// function emitNetworkConnection() {
//    NETWORK = io(SERVER_IP, {
//       withCredentials: false,
//       transoirtOptions: {
//          pooling: {
//             extraHeaders: {
//                "my-custom-header": "ag-socket",
//             },
//          },
//       },
//    });
// }

// function emitString(key, payload) {
//    NETWORK.emit(key, payload);
// }
// !SETUP SOCKET



// const useWebcam = ({
//     videoRef
//   }) => {
//     useEffect(() => {
//       if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//         navigator.mediaDevices.getUserMedia({ video: true}).then((stream) => {
//           if (videoRef.current !== null) {
//             stream.stop()
//             // videoRef.current.srcObject = stream;
//             // videoRef.current.play();
//           }
//         });
//       }
//     }, [videoRef]);
//   };

export default function Result() {
    const [imageResultAI, setImageResultAI] = useState(null);
    const [imageResultAI2, setImageResultAI2] = useState(null);
    const [imageResultAI3, setImageResultAI3] = useState(null);
    const [imageResultAI4, setImageResultAI4] = useState(null);
    const [formasiFix, setFormasiFix] = useState(null);
    const [styleGeneral, setStyleGeneral] = useState(null);
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
        name: 'IQOS',
        phone: '00000',
      });
    const { Canvas } = useQRCode();


    // const videoRef = useRef(null);
    // const previewRef = useRef(null);
    // useWebcam({ videoRef,previewRef});

    useEffect(() => {
        // Perform localStorage action
        if (typeof localStorage !== 'undefined') {
            const item = localStorage.getItem('resulAIBase64')
            const item2 = localStorage.getItem('resulAIBase642')
            const item3 = localStorage.getItem('resulAIBase643')
            const item4 = localStorage.getItem('resulAIBase644')
            const item5 = localStorage.getItem('styleGeneral')
            const item6 = localStorage.getItem('genderFix')
            setImageResultAI(item)
            setImageResultAI2(item2)
            setImageResultAI3(item3)
            setImageResultAI4(item4)
            setStyleGeneral(item5)
            setFormasiFix(item6)
        }
    }, [imageResultAI, imageResultAI2, imageResultAI3, imageResultAI4, styleGeneral, formasiFix, linkQR])

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
            let bodyFormData = new FormData();
            bodyFormData.append("name", 'Magnumotion '+formasiFix+' '+styleGeneral);
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
                    // console.log(response)
                    setLinkQR(response.file)
                    setIdFormEmail(response.id)
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
        <main className="flex fixed h-full w-full bg-magnumotion overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20">
            {/* <TopLogoMagnumFixed></TopLogoMagnumFixed> */}
            {/* QR */}
            {generateQR && 
                <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center flex-col z-40 bg-black bg-opacity-0'>
                    <h1 className={`text-center text-xl mt-0 lg:mt-0 lg:text-7xl lg:mb-5 text-white font-bold`}>Congratulations, <br></br> your photo was successfully printed!</h1>
                    {/* <h1 className={`text-center text-xl mt-[-.7rem] lg:mt-0 lg:text-5xl lg:mb-5 px-5 text-white font-bold`}>Scan this QR Code <br></br> to Download your image.</h1>
                    <div className='relative mt-3 w-[80%] mx-auto flex items-center justify-center canvas-qr' onClick={()=>{setGenerateQR(null)}}>
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
                    </div> */}
                    {/* <p className={`text-center font-semibold text-sm lg:text-4xl mt-10 text-black`}>Scan this QR Code to Download your image.</p> */}
                    
                    {/* <div className={`w-full`}>
                    <ReactToPrint
                    trigger={() => 
                        <div className={`w-full mt-5`}>
                            <div className="relative w-[60%] mx-auto flex justify-center items-center flex-col">
                                <div className="w-full relative mx-auto flex justify-center items-center">
                                    <Image src='/amero/btn-print.png' width={410} height={96} alt='Zirolu' className='w-full' priority />
                                </div>
                            </div>
                        </div>
                    }
                    content={() => componentRef}
                    />
                    </div> */}

                    {/* <div className={`relative w-full  ${showEmail ? 'hiddenx' : ''}`}>
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
                    <Link href='/magnumotion' className='text-center font-semibold text-base lg:text-7xl py-20 p-10 lg:p-40  lg:py-96 text-white w-full'>Tap here to close</Link>
                </div>
            }
            {/* QR */}


            {/* DOWNLOAD & PRINT */}
            {imageResultAI && 
            <div className='relative w-full mt-0 mb-0 mx-auto flex justify-center items-center opacity-0 pointer-events-none'>
                <div className='absolute z-10 w-[20%]' id='capture'>
                        <div className={`relative w-[full] flex`}>
                            <Image src={imageResultAI}  width={171} height={1024} alt='Zirolu' className='relative block w-1/4'></Image>
                            <Image src={imageResultAI2}  width={171} height={1024} alt='Zirolu' className='relative block w-1/4'></Image>
                            <Image src={imageResultAI3}  width={171} height={1024} alt='Zirolu' className='relative block w-1/4'></Image>
                            <Image src={imageResultAI4}  width={171} height={1024} alt='Zirolu' className='relative block w-1/4'></Image>
                        </div>
                </div>
            </div>
            }

            <div className={generateQR ? `opacity-0 pointer-events-none` : ''}>
                {imageResultAI && 
                <div className='relative w-full mt-4 mb-10 mx-auto flex justify-center items-center'>
                    <div className='relative z-10' id='captureOLD'>
                        <div className={`relative w-[full] flex`}>
                            <Image src={imageResultAI}  width={171} height={1024} alt='Zirolu' className='relative block w-1/4'></Image>
                            <Image src={imageResultAI2}  width={171} height={1024} alt='Zirolu' className='relative block w-1/4'></Image>
                            <Image src={imageResultAI3}  width={171} height={1024} alt='Zirolu' className='relative block w-1/4'></Image>
                            <Image src={imageResultAI4}  width={171} height={1024} alt='Zirolu' className='relative block w-1/4'></Image>
                        </div>
                    </div>
                    <div className='absolute top-0 left-0 w-[99.2%]' ref={(el) => (componentRef = el)}>
                        <div className={`relative w-[100%] flex`}>
                            <Image src={imageResultAI}  width={171} height={1024} alt='Zirolu' className='relative block w-1/4'></Image>
                            <Image src={imageResultAI2}  width={171} height={1024} alt='Zirolu' className='relative block w-1/4'></Image>
                            <Image src={imageResultAI3}  width={171} height={1024} alt='Zirolu' className='relative block w-1/4'></Image>
                            <Image src={imageResultAI4}  width={171} height={1024} alt='Zirolu' className='relative block w-1/4'></Image>
                        </div>
                    </div>
                    {/* <div id='canvasResult' className='absolute top-0 left-0 right-0 bottom-0 z-10'></div> */}
                </div>
                }
                {loadingDownload && 
                    <div className='relative mt-5 lg:mt-2 rounded-lg border-2 border-[#201E28] text-center bg-[#33303D] text-[#fff] lg:font-bold p-5 lg:text-5xl w-[80%] lg:w-[80%] mx-auto'>
                        <p>Please wait, loading...</p>
                    </div>
                }
                <div className={`relative w-full ${loadingDownload ? 'hidden' : ''}`}>

                    <div className={`w-full`} onClick={downloadImageAI}>
                    <ReactToPrint
                    trigger={() => 
                        <div className={`w-full mt-5`}>
                            <div className="relative w-[70%] mx-auto flex justify-center items-center flex-col">
                                <div className="w-full relative mx-auto flex justify-center items-center">
                                <Image src='/magnumotion/btn-collect.png' width={750} height={224} alt='Zirolu' className='w-full' priority />
                                </div>
                            </div>
                        </div>
                    }
                    content={() => componentRef}
                    />
                    </div> 
                    {/* <div className={`w-full`} onClick={downloadImageAI}>
                        <div className={`w-full mt-5`}>
                            <div className="relative w-[90%] mx-auto flex justify-center items-center flex-col">
                                <div className="w-full relative mx-auto flex justify-center items-center">
                                <Image src='/iqos/btn-collect.png' width={640} height={88} alt='Zirolu' className='w-full' priority />
                                </div>
                            </div>
                        </div>
                    </div> */}

                    <div className='w-full mt-3'>
                        <div className="relative w-[70%] mx-auto flex justify-center items-center flex-col">
                            <Link href='/magnumotion/gender' className="relative w-full mx-auto flex justify-center items-center">
                                <Image src='/magnumotion/btn-retake.png' width={750} height={224} alt='Zirolu' className='w-full' priority />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
