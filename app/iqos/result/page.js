'use client';

import Link from 'next/link';
import Image from "next/image";
import TopLogoAmeroSmall from "../../components/TopLogoAmeroSmall";
import { getCookie } from 'cookies-next';
import React,{ useEffect, useState, useRef } from 'react';
import { useQRCode } from 'next-qrcode';
// import io from 'socket.io-client';
import { Merriweather} from "next/font/google";
const merriweather = Merriweather({ subsets: ["latin"], weight: ['400','700'] });
import BtnHexagon2 from "../../components/BtnHexagon2";
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
        name: 'HMS DEMO',
        phone: '00000',
      });
    const { Canvas } = useQRCode();

    useEffect(() => {
        // Perform localStorage action
        if (typeof localStorage !== 'undefined') {
            const item = localStorage.getItem('resulAIBase64Left')
            const item2 = localStorage.getItem('resulAIBase64')
            const item3 = localStorage.getItem('resulAIBase64Right')
            const item4 = localStorage.getItem('formasiFix')
            setImageResultAI(item)
            setImageResultAI2(item2)
            setImageResultAI3(item3)
            setFormasiFix(item3)
        }
    }, [imageResultAI, linkQR])

    const downloadImageAI = () => {
        import('html2canvas').then(html2canvas => {
            html2canvas.default(document.querySelector("#capture"), {scale:2}).then(canvas => 
                uploadImage(canvas)
            )
        }).catch(e => {console("load failed")})
    }
    const uploadImage = async (canvas) => {
        setLoadingDownload('≈')

        canvas.toBlob(async function(blob) {
            let bodyFormData = new FormData();
            bodyFormData.append("name", payload.name);
            bodyFormData.append("phone", payload.phone);
            bodyFormData.append("file", blob, payload.name+'-photo-ai-zirolu-hms.png');
          
            const options = {
                method: 'POST',
                body: bodyFormData,
                headers: {
                    'Authorization': 'de2e0cc3-65da-48a4-8473-484f29386d61:xZC8Zo4DAWR5Yh6Lrq4QE3aaRYJl9lss',
                    'Accept': 'application/json',
                }
            };
            
            await fetch('https://photo-ai-iims.zirolu.id/v1/hms', options)
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
        <main className="flex fixed h-full w-full bg-hms overflow-auto flex-col items-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20">
            <div className={`relative w-[70%] mx-auto mt-44 mb-10 ${generateQR ? `opacity-0 pointer-events-none` : ''}`}>
            <Image src='/hms/title.png' width={641} height={117} alt='Zirolu' className='w-full' priority />
            </div>
            {/* QR */}
            {generateQR && 
                <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-top mt-24 lg:mt-44 flex-col z-40 bg-black bg-opacity-0'>
                    <h1 className={`text-center text-xl mt-[-.7rem] lg:mt-0 lg:text-4xl lg:mb-5 text-black font-bold`}>Scan this QR Code to Download your image.</h1>
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
                    <a href='/hms-farewell' className='text-center font-semibold text-base lg:text-4xl py-20 p-10 lg:p-40 text-black w-full'>Tap here to close</a>
                </div>
            }
            {/* QR */}

            <div className={generateQR ? `opacity-0 pointer-events-none` : ''}>
                {imageResultAI && 
                <div className='relative w-full mt-4 mx-auto flex justify-center items-center'>
                    <div className='relative z-10' id='capture'>
                        <div className={`relative w-[full] flex`}>
                            <Image src={imageResultAI}  width={598} height={1206} alt='Zirolu' className='relative block w-1/3'></Image>
                            <Image src={imageResultAI2}  width={598} height={1206} alt='Zirolu' className='relative block w-1/3'></Image>
                            <Image src={imageResultAI3}  width={598} height={1206} alt='Zirolu' className='relative block w-1/3'></Image>
                        </div>
                    </div>
                    <div className='absolute top-0 left-0' ref={(el) => (componentRef = el)}>
                        <div className={`relative w-[98%] flex`}>
                            <Image src={imageResultAI}  width={598} height={1206} alt='Zirolu' className='relative block w-1/3'></Image>
                            <Image src={imageResultAI2}  width={598} height={1206} alt='Zirolu' className='relative block w-1/3'></Image>
                            <Image src={imageResultAI3}  width={598} height={1206} alt='Zirolu' className='relative block w-1/3'></Image>
                            {/* <Image src='/hms/style/coba11.jpeg'  width={1794} height={1206} alt='Zirolu' className='relative block w-full'></Image> */}
                        </div>
                    </div>
                    {/* <div id='canvasResult' className='absolute top-0 left-0 right-0 bottom-0 z-10'></div> */}
                </div>
                }
                {loadingDownload && 
                    <div className='relative mt-5 lg:mt-2 rounded-lg border-2 border-[#CB8A1B] text-center bg-[#452B04] text-[#F0D198] lg:font-bold p-2 lg:text-2xl w-[80%] lg:w-[50%] mx-auto'>
                        <p>Please wait, loading...</p>
                    </div>
                }
                <div className={`relative w-full ${loadingDownload ? 'hiddenx' : ''}`}>

                    <div className={`w-full`} onClick={downloadImageAI}>
                    <ReactToPrint
                    trigger={() => 
                        <div className={`w-full mt-5`}>
                            <div className="relative w-[90%] mx-auto flex justify-center items-center flex-col">
                                <div className="w-full relative mx-auto flex justify-center items-center">
                                <Image src='/hms/btn-collect.png' width={640} height={88} alt='Zirolu' className='w-full' priority />
                                </div>
                            </div>
                        </div>
                    }
                    content={() => componentRef}
                    />
                    </div>

                    <div className='w-full'>
                        <div className="relative w-[90%] mx-auto flex justify-center items-center flex-col">
                            <a href='/hms-farewell/style' className="relative w-full mx-auto flex justify-center items-center">
                                <Image src='/hms/btn-retake.png' width={640} height={88} alt='Zirolu' className='w-full' priority />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
