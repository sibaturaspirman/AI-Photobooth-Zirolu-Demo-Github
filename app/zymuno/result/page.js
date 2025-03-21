'use client';

import Link from 'next/link';
import Image from "next/image";
// import TopLogoAmeroSmall from "../../components/TopLogoAmeroSmall";
// import { getCookie } from 'cookies-next';
import React,{ useEffect, useState, useRef } from 'react';
import { useQRCode } from 'next-qrcode';
// import io from 'socket.io-client';
// import { Merriweather} from "next/font/google";
// const merriweather = Merriweather({ subsets: ["latin"], weight: ['400','700'] });
// import BtnHexagon2 from "../../components/BtnHexagon2";
// import ReactToPrint from "react-to-print";


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
    const [formasiFix, setFormasiFix] = useState(null);
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
        name: 'ZYMUNO',
        phone: '00001',
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
            const item4 = localStorage.getItem('resulAIBase642')
            const item3 = localStorage.getItem('formasiFix')
            // const item4 = localStorage.getItem('styleFix')
            setImageResultAI(item2)
            setImageResultAI2(item4)
            // setImageResultAI3(item3)
            setFormasiFix(item3)
            setLinkQR(item)
        }
    }, [imageResultAI, imageResultAI2, formasiFix, linkQR])

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
                body: JSON.stringify({
                    name:payload.name+' '+formasiFix,
                    phone:payload.phone,
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
        <main className="flex fixed h-full w-full bg-zymuno overflow-auto flex-col items-center justify-center  pt-2 pb-5 px-5 lg:pt-12 lg:px-20" onContextMenu={(e)=> e.preventDefault()}>
            
            {/* QR */}
            {generateQR && 
                <div className='absolute top-[2rem] left-0 right-0 bottom-0 flex items-center justify-center flex-col z-40 bg-black bg-opacity-0'>
                    <div className={`relative w-[60%] mx-auto mb-10`}>
                        <Image src='/permata/scan.png' width={580} height={213} alt='Zirolu' className='w-full' priority />
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
                    {/* <Link href='/iqos3' className='text-center font-semibold text-base lg:text-4xl py-20 p-10 lg:p-40 text-white w-full'>Tap here to close</Link> */}
                    {/* <Link href='/pln' className="w-[70%] relative mx-auto mt-10 flex justify-center items-center">
                        <Image src='/pln/btn-back.png' width={644} height={144} alt='Zirolu' className='w-full' priority />
                    </Link> */}
                    <Link href='/zymuno' className='text-center font-semibold text-5xl  pt-20 p-40 py-20 text-white w-full'>Tap here to close</Link>
                </div>
            }
            {/* QR */}

            <div className={generateQR ? `opacity-0 pointer-events-none` : ''}>
                {imageResultAI && 
                <div className='relative w-full mt-2 mb-2 mx-auto flex justify-center items-center'>
                    <div className='relative z-10 w-[544px]' id='capture'>
                        <div className={`relative w-full mx-auto flex`}>
                            <div className='relative w-full'>
                                <Image src={imageResultAI}  width={1080} height={1350} alt='Zirolu' className='relative block w-full'></Image>
                            </div>
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
                    <div className='relative mt-5 lg:mt-2 border-2 text-center bg-[#FF6600] rounded-xl text-[#fff] lg:font-bold p-5 text-3xl w-[80%] lg:w-[80%] mx-auto'>
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
                        <div className={`w-full mt-10`}>
                            <div className="relative w-[75%] mx-auto flex justify-center items-center flex-col">
                                <div className="w-full relative mx-auto flex justify-center items-center">
                                <Image src='/zymuno/btn-download.png' width={410} height={96} alt='Zirolu' className='w-full' priority />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-full'>
                        <div className="relative w-[75%] mx-auto flex justify-center items-center flex-col">
                            <Link href='/zymuno/style' className="relative w-full mx-auto flex justify-center items-center">
                            <Image src='/btn-retake.png' width={820} height={192} alt='Zirolu' className='w-full' priority />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
