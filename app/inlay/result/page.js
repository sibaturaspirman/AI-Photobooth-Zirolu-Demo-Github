'use client';

import Link from 'next/link';
import Image from "next/image";
import TopLogoMizuho from "./../../components/TopLogoMizuho";
import { getCookie } from 'cookies-next';
import { useEffect, useState, useMemo } from 'react';
import { useQRCode } from 'next-qrcode';
// import io from 'socket.io-client';
import { Paytone_One} from "next/font/google";
const paytone_one = Paytone_One({ subsets: ["latin"], weight: '400' });
import BtnHexagon2 from "./../../components/BtnHexagon2";


export default function Result() {
    const [imageResultAI, setImageResultAI] = useState(null);
    const [imageResultAI2, setImageResultAI2] = useState(null);
    const [imageResultAI3, setImageResultAI3] = useState(null);
    const [generateQR, setGenerateQR] = useState(null);
    const [linkQR, setLinkQR] = useState('https://zirolu.id/');
    const [formasiFix, setFormasiFix] = useState(null);
    const [idFormEmail, setIdFormEmail] = useState(null);
    const [sendEmailGak, setSendEmailGak] = useState(null);
    const [alamatEmail, setAlamatEmail] = useState();
    const [keKirimEmailGak, setKeKirimEmailGak] = useState(null);
    const [loadingDownload, setLoadingDownload] = useState(null);
    const [showEmail, setShowEmail] = useState(null);
    const [payload, setPayload] = useState({
        name: 'INLAY',
        phone: '00001',
      });
    const { Canvas } = useQRCode();

    useEffect(() => {
        // Perform localStorage action
        if (typeof localStorage !== 'undefined') {
            const item = localStorage.getItem('resulAIBase64')
            // const item2 = localStorage.getItem('resulAIBase642')
            // const item22 = localStorage.getItem('resulAIBase643')
            const item3 = localStorage.getItem('formasiFix')
            setImageResultAI(item)
            // setImageResultAI2(item2)
            // setImageResultAI3(item22)
            setFormasiFix(item3)
        }
    }, [imageResultAI, imageResultAI2, imageResultAI3, formasiFix, linkQR])

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
            bodyFormData.append("file", blob, payload.name+'-photo-ai-zirolu-mizuho.png');
          
            const options = {
                method: 'POST',
                body: bodyFormData,
                headers: {
                    'Authorization': 'de2e0cc3-65da-48a4-8473-484f29386d61:xZC8Zo4DAWR5Yh6Lrq4QE3aaRYJl9lss',
                    'Accept': 'application/json',
                }
            };
            
            await fetch('https://photo-ai-iims.zirolu.id/v1/mizuho', options)
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
        <main className="flex fixed h-full w-full bg-mizuho overflow-x-hidden overflow-y-auto flex-col items-center pt-2 pb-5 px-5 lg:pt-5 lg:px-20">
            <div className="flex relative h-full w-fulll max-w-lg overflow-x-hidden overflow-y-auto flex-col items-center">
                <TopLogoMizuho></TopLogoMizuho>

            {/* QR */}
            {generateQR && 
                <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-top mt-16 lg:mt-20 flex-col z-40 bg-black bg-opacity-0'>
                    {/* <div className="relative w-[60%] mx-auto flex justify-center items-center flex-col mt-2">
                        <button className="relative mx-auto flex justify-center items-center" onClick={()=>setSendEmailGak('true')}>
                            <Image src='/btn-send-email.png' width={410} height={96} alt='Zirolu' className='w-full' priority />
                        </button>
                        <a href={linkQR} target='_blank' className="relative mx-auto flex justify-center items-center">
                            <Image src='/btn-download-image.png' width={410} height={96} alt='Zirolu' className='w-full' priority />
                        </a>
                    </div> */}
                    <p className='text-center font-semibold text-sm lg:text-2xl mt-5'>Scan this QR Code to Download your image.</p>
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
                    <a href='/inlay' className='text-center font-semibold text-3xl mt-2 p-20'>Tap here to close</a>
                </div>
            }
            {/* QR */}

            <div className={generateQR ? `opacity-0 pointer-events-none` : ''}>
                {imageResultAI && 
                <div className='relative w-[364px] mt-4 mx-auto flex justify-center items-center  border-2 border-[#ffffff] rounded-sm' onClick={downloadImageAI}>
                    <div className='relative bg-slate-500' id='capture'>
                        {/* <img src={imageResultAI} className='block'></img> */}
                        
                        {/* <div className={`relative w-full  justify-center items-center ${formasiFix == 'formasi-2' || formasiFix == 'formasi-3' || formasiFix == 'formasi-4' ? 'flex' : 'hidden'}`}>
                            <Image src={imageResultAI}  width={360} height={1080} alt='Zirolu' className='relative block w-1/2'></Image>
                            <Image src={imageResultAI2}  width={360} height={1080} alt='Zirolu' className='relative block w-1/2'></Image>
                        </div>
                        <div className={`relative w-full  ${formasiFix == 'formasi-5' || formasiFix == 'formasi-6' ? 'flex' : 'hidden'}`}>
                            <Image src={imageResultAI}  width={240} height={1080} alt='Zirolu' className='relative block w-1/3'></Image>
                            <Image src={imageResultAI2}  width={240} height={1080} alt='Zirolu' className='relative block w-1/3'></Image>
                            <Image src={imageResultAI3}  width={240} height={1080} alt='Zirolu' className='relative block w-1/3'></Image>
                        </div> */}
                        <div className={`relative w-full  justify-center items-center ${formasiFix == 'formasi-1' || formasiFix == 'formasi-7' ? 'flex' : 'hidden'}`}>
                            <Image src={imageResultAI}  width={720} height={1080} alt='Zirolu' className='relative block w-full'></Image>
                        </div>
                        
                    </div>
                    <div id='canvasResult' className='absolute top-0 left-0 right-0 bottom-0 z-10 w-full'></div>
                </div>
                }
                {loadingDownload && 
                    <div className='relative mt-5 lg:mt-2 rounded-lg text-center border-2 border-[#ffffff] bg-slate-500 text-[#fff] lg:font-bold p-2 lg:text-xl w-[80%] lg:w-[70%] mx-auto'>
                        <p>Please wait, loading...</p>
                    </div>
                }
                <div className={`relative w-full ${loadingDownload ? 'hiddenx' : ''}`}>
                    <div className={`relative w-[50%] mx-auto flex justify-center items-center flex-col mt-5 ${loadingDownload ? 'hidden' : ''}`}   >
                        <button className={`relative mx-auto flex justify-center items-center ${loadingDownload ? 'hidden' : ''}`} onClick={downloadImageAI}>
                            <Image src='/mizuho/btn-download.png' width={410} height={96} alt='Zirolu' className='w-full' priority />
                        </button>
                    </div>
                    <div className='w-full'>
                        <div className="relative w-[50%] mx-auto flex justify-center items-center flex-col">
                            <Link href='/mizuho/style' className="relative mx-auto flex justify-center items-center">
                                <Image src='/btn-retake.png' width={410} height={96} alt='Zirolu' className='w-full' priority />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </main>
    );
}
