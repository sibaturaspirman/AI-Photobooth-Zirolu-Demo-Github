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
        name: 'VEEV',
        phone: '00000',
      });
    const { Canvas } = useQRCode();


    // const videoRef = useRef(null);
    // const previewRef = useRef(null);
    // useWebcam({ videoRef,previewRef});

    useEffect(() => {
        // Perform localStorage action
        if (typeof localStorage !== 'undefined') {
            
            const item1 = localStorage.getItem('faceURLResult')
            const item2 = localStorage.getItem('resulAIBase64')
            const item4 = localStorage.getItem('formasiFix')
            setLinkQR(item1)
            setImageResultAI(item2)
            setFormasiFix(item4)
        }
    }, [imageResultAI, linkQR])

    const downloadImageAI = async () => {
        // import('html2canvas').then(html2canvas => {
        //     html2canvas.default(document.querySelector("#capture"), {scale:1}).then(canvas => 
        //         uploadImage(canvas)
        //     )
        // }).catch(e => {console("load failed")})

        setLoadingDownload('≈')
        const options = {
            method: 'POST',
            body: JSON.stringify({
                name:'VEEV - '+formasiFix,
                phone:payload.phone,
                image:linkQR
            }),
            headers: {
                'Authorization': 'de2e0cc3-65da-48a4-8473-484f29386d61:xZC8Zo4DAWR5Yh6Lrq4QE3aaRYJl9lss',
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
        
        await fetch('https://photo-ai-iims.zirolu.id/v1/veev', options)
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
    }
    const uploadImage = async (canvas) => {
        setLoadingDownload('≈')

        canvas.toBlob(async function(blob) {
            // let bodyFormData = new FormData();
            // bodyFormData.append("name", 'FERRON - '+payload.name+' '+gender);
            // bodyFormData.append("phone", payload.phone);
            // bodyFormData.append("file", blob, payload.name+'-photo-ai-zirolu.png');
          
            const options = {
                method: 'POST',
                body: JSON.stringify({
                    name:'VEEV - '+formasiFix,
                    phone:payload.phone,
                    image:linkQR
                }),
                headers: {
                    'Authorization': 'de2e0cc3-65da-48a4-8473-484f29386d61:xZC8Zo4DAWR5Yh6Lrq4QE3aaRYJl9lss',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            };
            
            await fetch('https://photo-ai-iims.zirolu.id/v1/ferron', options)
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
        <main className="flex fixed h-full w-full bg-veev overflow-auto flex-col items-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20">
            {/* QR */}
            {generateQR && 
                <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center flex-col z-40 bg-black bg-opacity-0'>
                    <h1 className={`text-center text-4xl font-bold lg:mt-0 lg:text-4xl mb-5`}>Scan this QR Code <br></br> to Download your image.</h1>
                    <div className='relative mt-3 w-[60%] mx-auto flex items-center justify-center canvas-qr'>
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
                    <a href='/veev' className='text-center font-semibold text-4xl py-46 p-40'>Tap here to close</a>
                    {/* <Link href='/iqos' className='text-center font-semibold text-base lg:text-4xl py-20 p-10 lg:p-40 text-white w-full'>Tap here to close</Link> */}
                </div>
            }
            {/* QR */}

            <div className={generateQR ? `opacity-0 pointer-events-none` : ''}>
                {imageResultAI && 
                <div className='relative w-[66%] mt-4 mb-10 mx-auto flex justify-center items-center'>
                    <div className='relative z-10 w-full' id='capture' ref={(el) => (componentRef = el)}>
                        <div className={`relative w-full flex`}>
                            <Image src={imageResultAI}  width={683} height={1024} alt='Zirolu' className='relative block w-full'></Image>
                        </div>
                    </div>
                </div>
                }
                {loadingDownload && 
                    <div className='relative mt-5 lg:mt-2 rounded-xl border-2 border-[#201E28] text-center bg-[#571571] text-[#fff] lg:font-bold p-5 text-2xl w-[80%] lg:w-[80%] mx-auto'>
                        <p>Please wait, loading...</p>
                    </div>
                }
                <div className={`relative w-full ${loadingDownload ? 'hidden' : ''}`}>

                    <div className={`w-full`} onClick={downloadImageAI}>
                    <ReactToPrint
                    trigger={() => 
                        <div className={`w-full mt-5`}>
                            <div className="relative w-[90%] mx-auto flex justify-center items-center flex-col">
                                <div className="w-full relative mx-auto flex justify-center items-center">
                                <Image src='/veev/btn-collect.png' width={616} height={120} alt='Zirolu' className='w-full' priority />
                                </div>
                            </div>
                        </div>
                    }
                    content={() => componentRef}
                    />
                    </div> 
                    {/* <div className={`w-full`} onClick={downloadImageAI}>
                        <div className={`w-full mt-2`}>
                            <div className="relative w-[80%] mx-auto flex justify-center items-center flex-col">
                                <div className="w-full relative mx-auto flex justify-center items-center">
                                <Image src='/veev/btn-collect.png' width={616} height={120} alt='Zirolu' className='w-full' priority />
                                </div>
                            </div>
                        </div>
                    </div> */}

                    <div className='w-full'>
                        <div className="relative w-[90%] mx-auto flex justify-center items-center flex-col">
                            <Link href='/veev' className="relative w-full mx-auto flex justify-center items-center">
                                <Image src='/veev/btn-back.png' width={600} height={100} alt='Zirolu' className='w-full' priority />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
