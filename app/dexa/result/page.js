'use client';

import Link from 'next/link';
import Image from "next/image";
import TopLogoKAI from "../../components/TopLogoKAI";
import { getCookie } from 'cookies-next';
import React,{ useEffect, useState, useRef } from 'react';
import { useQRCode } from 'next-qrcode';
// import io from 'socket.io-client';
import { Poppins} from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ['400','700', '900'] });
// import BtnHexagon2 from "../components/BtnHexagon2";
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


export default function Result() {
    const [imageResultAI, setImageResultAI] = useState(null);
    const [generateQR, setGenerateQR] = useState(null);
    const [linkQR, setLinkQR] = useState('https://zirolu.id/');
    const [idFormEmail, setIdFormEmail] = useState(null);
    const [sendEmailGak, setSendEmailGak] = useState(null);
    const [alamatEmail, setAlamatEmail] = useState();
    const [keKirimEmailGak, setKeKirimEmailGak] = useState(null);
    const [loadingDownload, setLoadingDownload] = useState(null);
    const [showEmail, setShowEmail] = useState(null);
    const [gender, setGender] = useState(null);

    // emitNetworkConnection()
    let componentRef = useRef();

    const [payload, setPayload] = useState({
      name: getCookie('name'),
      phone: getCookie('phone')
    });
    // const [payload, setPayload] = useState({
    //     name: 'AI ZIROLU DEMO',
    //     phone: '00000',
    //   });
    const { Canvas } = useQRCode();

    useEffect(() => {
        // Perform localStorage action
        if (typeof localStorage !== 'undefined') {
            const item = localStorage.getItem('resulAIBase64')
            // const item2 = localStorage.getItem('faceURLResult')
            const item3 = localStorage.getItem('gender')
            setImageResultAI(item)
            // setLinkQR(item2)
            setGender(item3)
        }
        // const item2 = getCookie('phone')
        // const item3 = getCookie('name')
        // setPayload(() => ({
        //     name: item2,
        //     phone: item3,
        //   }));
    }, [imageResultAI, gender])

    
    const downloadImageAI = () => {
        import('html2canvas').then(html2canvas => {
            html2canvas.default(document.querySelector("#capture"), {scale:1.5}).then(canvas => 
                uploadImage(canvas)
            )
        }).catch(e => {console("load failed")})
    }
    const uploadImage = async (canvas) => {
        setLoadingDownload('≈')

        canvas.toBlob(async function(blob) {
            let bodyFormData = new FormData();
            bodyFormData.append("name", payload.name+' '+gender);
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
            
            await fetch('https://photo-ai-iims.zirolu.id/v1/dexa', options)
                .then(response => response.json())
                .then(response => {
                    // console.log(response)
                    setLinkQR(response.file)
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


    const handleChange = (e) => {
        setAlamatEmail(e.target.value)
    };
    const isValid = () => {
      if (alamatEmail) return true
      else return false;
    };

    const sendEmail = async () => {
        // SENT EMAIL
        // console.log(idFormEmail)
        const options = {
            method: 'POST',
            body: JSON.stringify({
                "email": alamatEmail,
                "id": idFormEmail
            }),
            headers: {
                'Authorization': 'de2e0cc3-65da-48a4-8473-484f29386d61:xZC8Zo4DAWR5Yh6Lrq4QE3aaRYJl9lss',
                'Content-Type': 'application/json',
            }
        };
          
        await fetch('https://photo-ai-iims.zirolu.id/v1/demo/email', options)
            .then(response => response.json())
            .then(response =>{
                // console.log(response)
                setKeKirimEmailGak('true')
                // if(response.status){
                //     setKeKirimEmailGak('true')
                // }
            })
            .catch(err => console.error(err));
    }

    return (
        <main className="flex fixed h-full w-full bg-dexa overflow-auto flex-col items-center justify-top pt-2 pb-5 px-5 lg:pt-12 lg:px-20">
            {/* <TopLogoAmero></TopLogoAmero> */}
            {/* QR */}
            {generateQR && 
                <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-top mt-24 lg:mt-64 flex-col z-40 bg-black bg-opacity-0'>
                    <h1 className={`text-center text-3xl font-bold mt-[-.7rem] lg:mt-0 lg:text-4xl lg:mb-5 ${poppins.className}`}>Scan this QR Code <br></br> to Download your image.</h1>
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
                    <a href='/dexa' className='text-center font-semibold text-4xl py-46 p-40'>Tap here to close</a>
                </div>
            }
            {/* QR */}

            <div className={generateQR ? `opacity-0 pointer-events-none` : ''}>
                {/* <h1 className={`text-center text-xl font-bold mt-9 lg:mt-0 lg:text-5xl mb-2 lg:mb-5 ${poppins.className}`}>YOU LOOKS AMAZING!</h1> */}
                {imageResultAI && 
                <div className='relative w-[75%] mt-10 mx-auto flex justify-center items-center  border-2 border-[#ffffff] rounded-sm' onClick={downloadImageAI}>
                    <div className='relative' id='capture' ref={(el) => (componentRef = el)}>
                        {/* <img src={imageResultAI} className='block'></img> */}
                        <Image src={imageResultAI}  width={683} height={1214} alt='Zirolu' className='relative block w-full'></Image> 
                    </div>
                    {/* <div id='canvasResult' className='absolute top-0 left-0 right-0 bottom-0 z-10'></div> */}
                </div>
                }
                {loadingDownload && 
                    <div className='relative mt-5 lg:mt-2 rounded-lg text-center border-2 border-[#ECA506] text-center bg-[#FCDF7D] text-[#000] lg:font-bold p-2 text-xl lg:font-bold w-[80%] lg:w-[50%] mx-auto'>
                        <p>Please wait, loading...</p>
                    </div>
                }
                <div className={`relative w-full ${loadingDownload ? 'hidden' : ''}`}>
                    <div className={`w-full`} onClick={downloadImageAI}>
                        <div className={`w-full mt-5`}>
                            <div className="relative w-[50%] mx-auto flex justify-center items-center flex-col">
                                <div className="block w-full relative mx-auto flex justify-center items-center">
                                    <Image src='/dexa/btn-download.png' width={479} height={96} alt='Zirolu' className='w-full' priority />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full'>
                        <div className="relative w-[50%] mx-auto flex justify-center items-center flex-col">
                            <Link href='/dexa/generate' className="relative w-full mx-auto flex justify-center items-center">
                                <Image src='/dexa/btn-retake.png' width={479} height={96} alt='Zirolu' className='w-full' priority />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
