'use client';

import Link from 'next/link';
import Image from "next/image";
import TopLogo from "../../components/TopLogo";
import { getCookie } from 'cookies-next';
import { useEffect, useState, useMemo } from 'react';
import { useQRCode } from 'next-qrcode';
// import io from 'socket.io-client';
import { Paytone_One} from "next/font/google";
const paytone_one = Paytone_One({ subsets: ["latin"], weight: '400' });
import BtnHexagon2 from "../../components/BtnHexagon2";


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
    const [imageResultAIMoana, setImageResultAIMoana] = useState(null);
    const [faceURLResultMoana, setFaceURLResultMoana] = useState(null);
    const [generateQR, setGenerateQR] = useState(null);
    const [linkQR, setLinkQR] = useState('https://zirolu.id/');
    const [idFormEmail, setIdFormEmail] = useState(null);
    const [sendEmailGak, setSendEmailGak] = useState(null);
    const [alamatEmail, setAlamatEmail] = useState();
    const [keKirimEmailGak, setKeKirimEmailGak] = useState(null);
    const [loadingDownload, setLoadingDownload] = useState(null);
    const [showEmail, setShowEmail] = useState(null);
    // const [payload, setPayload] = useState({
    //   name: getCookie('name'),
    //   phone: getCookie('phone'),
    // });
    const [payload, setPayload] = useState({
        name: 'AI ZIROLU DEMO',
        phone: '00000',
      });
    const { Canvas } = useQRCode();

    // emitNetworkConnection()

    useEffect(() => {
        // Perform localStorage action
        if (typeof localStorage !== 'undefined') {
            const item = localStorage.getItem('resulAIBase64')
            const item2 = localStorage.getItem('resulAIMoanaBase64')
            const item3 = localStorage.getItem('faceURLResultMoana')
            setImageResultAI(item)
            setImageResultAIMoana(item2)
            setFaceURLResultMoana(item3)
            // setLinkQR(item2)
        }
        // const item2 = getCookie('phone')
        // const item3 = getCookie('name')
        // setPayload(() => ({
        //     name: item2,
        //     phone: item3,
        //   }));
    }, [imageResultAI, imageResultAIMoana, faceURLResultMoana, linkQR])

    const downloadImageAI = () => {
        import('html2canvas').then(html2canvas => {
            html2canvas.default(document.querySelector("#capture"), {scale:2.5}).then(canvas => 
            //   document.getElementById('canvasResult').appendChild(canvas)
                uploadImage(canvas)
            )
        }).catch(e => {console("load failed")})
    }
    const uploadImage = async (canvas) => {
        // downloadImage(canvas.toDataURL("image/jpeg", 1.0), 'my-canvas.jpeg')
        // console.log(payload)
        // bodyFormData.append("file", '');
        setLoadingDownload('≈')

        // if (typeof localStorage !== 'undefined') {
        //     const item = localStorage.getItem('faceURLResult')
        //     // const item2 = localStorage.getItem('faceURLResult')
        //     // setImageResultAI(item)
        //     // setLinkQR(item2)
        //     emitString("sendImage", item);
        // }

        canvas.toBlob(async function(blob) {
            let bodyFormData = new FormData();
            bodyFormData.append("name", payload.name);
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
            
            await fetch('https://photo-ai-iims.zirolu.id/v1/demo', options)
                .then(response => response.json())
                .then(response => {
                    // console.log(response)
                    setLinkQR(response.file)
                    setIdFormEmail(response.id)
                    // emitString("sendImage", response.file);
                    setGenerateQR('true')
                    setLoadingDownload(null)
                    // setImageResultAI()
                    // if (typeof localStorage !== 'undefined') {
                    //     localStorage.setItem("idSendEmail", )
                    // }
                })
                .catch(err => {
                    if (typeof localStorage !== 'undefined') {
                        const item = localStorage.getItem('faceURLResult')
                        // emitString("sendImage", item);
                        setShowEmail('true')
                        setLinkQR(item)
                        // setIdFormEmail(response.id)
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
        <main className="flex fixed h-full w-full bg overflow-auto flex-col items-center justify-top pt-2 pb-5 px-5 lg:pt-12 lg:pb-16 lg:px-13">
            <TopLogo></TopLogo>

            {/* QR */}
            {sendEmailGak &&
                <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center mt-0 flex-col z-50 bg-black bg-opacity-90'>
                    <div className='relative w-[70%] mt-0 mx-auto flex justify-center items-cente'>
                        <Image src='/popup.png' width={939} height={605} alt='Zirolu' className='w-full' priority />
                        <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center flex-col'>
                            {keKirimEmailGak && 
                                <div className='relative w-[60%]' onClick={()=>{setKeKirimEmailGak(null);setSendEmailGak(null)}}>
                                    <Image
                                        src='/success.png'
                                        width={596}
                                        height={434}
                                        className='w-full'
                                        alt='icon'
                                    />
                                </div>
                            }
                            <div className={`relative w-[94%] mb-2 p-2 lg:w-[80%] lg:mb-5 ${keKirimEmailGak ? 'hidden' : ''}`}>
                                <label htmlFor="email" className="text-[#fff] font-bold text-sm lg:text-2xl mb-4 block">Input Your Email</label>
                                <div className='relative w-full'>
                                    <Image
                                        src='/icon-sms.png'
                                        width={32}
                                        height={32}
                                        className='absolute left-2 lg:left-4 top-1/2 -translate-y-1/2'
                                        alt='icon'
                                    />
                                    <input
                                        type='email'
                                        value={alamatEmail}
                                        id='email'
                                        name='email'
                                        className={`w-full border-2 border-[#fff] rounded-lg font-semibold text-sm lg:text-2xl outline-none py-2 lg:py-6 pr-3 pl-12 lg:pl-14 text-black bg-white'`}
                                        placeholder='Your Email'
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            <div className={`relative w-[60%] flex justify-center items-center ${keKirimEmailGak ? 'hidden' : ''}`}>
                                <BtnHexagon2
                                    disabled={!isValid()}
                                    onClick={sendEmail}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            }
            {generateQR && 
                <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-top mt-16 lg:mt-36 flex-col z-40 bg-black bg-opacity-0'>
                    <h1 className={`text-center text-xl mt-[-.7rem] lg:mt-0 lg:text-4xl lg:mb-5 ${paytone_one.className}`}>DOWNLOAD OR SCAN QR CODE</h1>
                    <div className={`relative w-full  ${showEmail ? 'hidden' : ''}`}>
                    <div className="relative w-[60%] mx-auto flex justify-center items-center flex-col mt-2">
                        {/* <button className="relative mx-auto flex justify-center items-center" onClick={()=>setSendEmailGak('true')}>
                            <Image src='/btn-send-email.png' width={410} height={96} alt='Zirolu' className='w-full' priority />
                        </button> */}
                        <a href={linkQR} target='_blank' className="relative mx-auto flex justify-center items-center">
                            <Image src='/btn-download-image.png' width={410} height={96} alt='Zirolu' className='w-full' priority />
                        </a>
                    </div>
                    </div>
                    <p className='text-center font-semibold text-sm lg:text-2xl mt-5'>Scan this QR Code to Download your image.</p>
                    <div className='relative mt-3 w-[80%] lg:w-full mx-auto flex items-center justify-center canvas-qr' onClick={()=>{setGenerateQR(null)}}>
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
                    {/* <Link href='/' className='text-center font-semibold text-lg mt-2 p-20' onClick={()=>{setGenerateQR(null)}}>Tap here to close</Link> */}
                    <a href='/' className='text-center font-semibold text-lg mt-2 p-20'>Tap here to close</a>
                </div>
            }
            {/* QR */}

            <div className={generateQR ? `opacity-0 pointer-events-none` : ''}>
                <h1 className={`text-center text-xl mt-[-.7rem] lg:mt-0 lg:text-4xl lg:mb-5 ${paytone_one.className}`}>YOU LOOKS AWESOME!</h1>
                {imageResultAI && 
                <div className='relative w-[100%] mt-4 mx-auto flex justify-center items-center  border-2 border-[#ffffff] rounded-sm' onClick={downloadImageAI}>
                    <div className='relative flex justify-center items-center' id='capture'>
                        {/* <img src={imageResultAI} className='block'></img> */}
                        <div className={faceURLResultMoana == 'https://ai.zirolu.id/disney/moana-cowok-swap.jpeg' ?`hidden` : 'flex justify-center items-center'}>
                            <Image src={imageResultAI}  width={365} height={1280} alt='Zirolu' className='relative block w-[50%]'></Image>
                            <Image src={imageResultAIMoana}  width={365} height={1280} alt='Zirolu' className='relative block w-[50%]'></Image>
                        </div>
                        <div className={faceURLResultMoana != 'https://ai.zirolu.id/disney/moana-cowok-swap.jpeg' ?`hidden` : 'flex justify-center items-center'}>
                            <Image src={imageResultAIMoana}  width={365} height={1280} alt='Zirolu' className='relative block w-[50%]'></Image>
                            <Image src={imageResultAI}  width={365} height={1280} alt='Zirolu' className='relative block w-[50%]'></Image>
                        </div>
                        {/* {faceURLResultMoana == 'https://ai.zirolu.id/disney/moana-cowok-swap.jpeg' && 
                        
                        } */}
                        
                        <Image src='data:image/png;base64,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' width={245} height={54} alt='Zirolu' className='absolute  block left-0 right-0 bottom-[3px] w-[150px] lg:w-[290px] mx-auto pointer-events-none z-10' />
                        
                        
                    </div>
                    <div id='canvasResult' className='absolute top-0 left-0 right-0 bottom-0 z-10'></div>
                </div>
                }
                {loadingDownload && 
                    <div className='relative mt-5 lg:mt-2 rounded-lg text-center border-2 border-[#ffffff] text-center bg-slate-500 text-[#fff] lg:font-bold p-2 lg:text-xl lg:font-bold w-[80%] lg:w-[50%] mx-auto'>
                        <p>Please wait, loading...</p>
                    </div>
                }
                <div className={`relative w-full ${loadingDownload ? 'hiddenx' : ''}`}>
                    <div className={`relative w-[80%] mx-auto flex justify-center items-center flex-col mt-5 ${loadingDownload ? 'hidden' : ''}`}   >
                        <button className={`relative mx-auto flex justify-center items-center ${loadingDownload ? 'hidden' : ''}`} onClick={downloadImageAI}>
                            <Image src='/btn-download.png' width={410} height={96} alt='Zirolu' className='w-full' priority />
                        </button>
                        {/* <button className="relative mx-auto flex justify-center items-center" onClick={sendEmail}>
                            <Image src='/btn-download.png' width={410} height={96} alt='Zirolu' className='w-full' priority />
                        </button> */}
                    </div>
                    {/* <div className={`w-full mt-2 ${loadingDownload ? '' : 'hidden'}`}>
                        <p className='text-center font-semibold text-xl'>QR Code stuck & tidak muncul? coba tap re-download</p>
                        <div className="relative w-[80%] mx-auto flex justify-center items-center flex-col">
                            <a href='/result' className="block w-full relative mx-auto flex justify-center items-center">
                                <Image src='/btn-redownload.png' width={410} height={96} alt='Zirolu' className='w-full' priority />
                            </a>
                        </div>
                    </div> */}
                    <div className='w-full'>
                        <div className="relative w-[80%] mx-auto flex justify-center items-center flex-col">
                            <Link href='/disney/generate' className="relative mx-auto flex justify-center items-center">
                                <Image src='/btn-retake.png' width={410} height={96} alt='Zirolu' className='w-full' priority />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
