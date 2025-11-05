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

    const [maxDuration, setMaxDuration] = useState(10);
    const [countdownStart, setCountdownStart] = useState(false);
    const timerRef = useRef(null);

    let componentRef = useRef();
    const [payload, setPayload] = useState({
        name: 'COMCON IQOS 2025',
        phone: '002025',
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
            // const item3 = localStorage.getItem('resulAIBase64Right')
            const item3 = localStorage.getItem('formasiFix')
            // const item4 = localStorage.getItem('styleFix')
            setImageResultAI(item2)
            // setImageResultAI2(item2)
            // setImageResultAI3(item3)
            setFormasiFix(item3)
            setLinkQR(item)
        }

        // if(countdownStart){
        //     if(maxDuration == 0){
        //         location.href = '/comcon/visikom'
        //     }
        // }
    }, [imageResultAI, linkQR, formasiFix, countdownStart, maxDuration])

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
            bodyFormData.append("name", 'AMILD WPAP');
            bodyFormData.append("phone", '2025');
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

    // COUNTDOWN
    const handleStartCountdown = () => {
        if (maxDuration <= 10) {
            setCountdownStart(true);
            timerRef.current = setInterval(() => {
                setMaxDuration((prevTime) => {
                  if (prevTime <= 1) {
                    clearInterval(timerRef.current);
                    return 0;
                  }
                  return prevTime - 1;
                });
            }, 1000);
        }
    };

    return (
        <main className="flex fixed h-full w-full bg-cv-page overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20" onContextMenu={(e)=> e.preventDefault()}>
            {/* <div className="fixed top-0 left-0 w-full h-full bg-iqos-border pointer-events-none z-50"></div> */}
            {/* <div className={`relative w-[40%] mx-auto mt-[4rem] mb-10 ${generateQR ? `opacity-0 pointer-events-none` : ''}`}>
                <Image src='/indika/result.png' width={732} height={50} alt='Zirolu' className='w-full' priority />
            </div> */}
            {/* QR */}
            {generateQR && 
                <div className='absolute top-[2rem] left-0 right-0 bottom-0 flex items-center justify-center flex-col z-40 bg-black bg-opacity-0'>
                    <div className={`relative w-[60%] mx-auto mb-10`}>
                        <Image src='/indika/scan.png' width={580} height={213} alt='Zirolu' className='w-full' priority />
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

                    {/* <div className='text-center mt-10'>
                        <p className='text-8xl font-bold'>{maxDuration}s</p>
                        <p className='uppercase text-5xl mt-5'>scan before it ends</p>
                    </div> */}
                    {/* <div className={`w-full mt-10`}>
                    <ReactToPrint
                    trigger={() => 
                        <div className={`w-full mt-5`}>
                            <div className="relative w-[60%] mx-auto flex justify-center items-center flex-col">
                                <div className="w-full relative mx-auto flex justify-center items-center">
                                    <Image src='/comcon/iqos/btn-print.png' width={880} height={144} alt='Zirolu' className='w-full' priority />
                                </div>
                            </div>
                        </div>
                    }
                    content={() => componentRef}
                    />
                    </div> */}
                    <Link href='/capture-vibe' className="relative w-[40%] mx-auto flex justify-center items-center pt-[6rem]">
                        <Image src='/iqos/cmcn-back.png' width={880} height={144} alt='Zirolu' className='w-full' priority />
                    </Link>
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
                <div className='relative w-full mt-0 mb-2 mx-auto flex justify-center items-center'>
                    <div className='relative z-10 w-[80%] border-[6px] lg:border-[20px]'>
                        <div className={`relative w-full mx-auto flex`} id='capture' ref={(el) => (componentRef = el)}>
                            <Image src={imageResultAI}  width={1024} height={1024} alt='Zirolu' className='relative block w-full'></Image>

                            <Image src='data:image/png;base64,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' width={1000} height={1000} alt='marker' className='absolute block left-0 right-0 top-0 mx-auto w-full pointer-events-none z-10'></Image>
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
                    <div className='relative mt-5 lg:mt-2 border-2 text-center bg-[#33303D] rounded-xl text-[#fff] lg:font-bold p-5 lg:text-5xl w-[80%] lg:w-[80%] mx-auto'>
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
                                <Image src='/iqos/cmcn-collect.png' width={640} height={88} alt='Zirolu' className='w-full' priority />
                                </div>
                            </div>
                        </div>
                    }
                    content={() => componentRef}
                    />
                    </div>  */}
                    <div className={`w-full`} onClick={downloadImageAI}>
                        <div className={`w-full mt-10`}>
                            <div className="relative w-[70%] mx-auto flex justify-center items-center flex-col">
                                <div className="w-full relative mx-auto flex justify-center items-center">
                                 <Image src='/amild/cv/download.png' width={864} height={210} alt='Zirolu' className='w-full' priority />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className='w-full'>
                        <div className="relative w-[80%] mx-auto flex justify-center items-center flex-col">
                            <Link href='/indika/style' className="relative w-full mx-auto flex justify-center items-center">
                            <Image src='/comcon/iqos/btn-retake.png' width={864} height={210} alt='Zirolu' className='w-full' priority />
                            </Link>
                        </div>
                    </div> */}
                </div>
            </div>
        </main>
    );
}
