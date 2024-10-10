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
    const [imageGeneratetAI_1, setImageGeneratetAI_1] = useState(null);
    const [imageGeneratetAI_2, setImageGeneratetAI_2] = useState(null);
    const [imageGeneratetAI_3, setImageGeneratetAI_3] = useState(null);
    const [imageGeneratetAI_4, setImageGeneratetAI_4] = useState(null);
    const [imageGeneratetAI_5, setImageGeneratetAI_5] = useState(null);
    const [imageGeneratetAI_6, setImageGeneratetAI_6] = useState(null);
    const [imageGeneratetAI_7, setImageGeneratetAI_7] = useState(null);
    const [imageGeneratetAI_8, setImageGeneratetAI_8] = useState(null);
    const [imageGeneratetAI_9, setImageGeneratetAI_9] = useState(null);
    const [imageGeneratetAI_10, setImageGeneratetAI_10] = useState(null);
    const [imageGeneratetAI_11, setImageGeneratetAI_11] = useState(null);
    const [imageGeneratetAI_12, setImageGeneratetAI_12] = useState(null);
    const [imageGeneratetAI_13, setImageGeneratetAI_13] = useState(null);
    const [imageGeneratetAI_14, setImageGeneratetAI_14] = useState(null);
    const [imageGeneratetAI_15, setImageGeneratetAI_15] = useState(null);
    const [imageGeneratetAI_16, setImageGeneratetAI_16] = useState(null);

    const [seedGeneratetAI_1, setSeedGeneratetAI_1] = useState(null);
    const [seedGeneratetAI_2, setSeedGeneratetAI_2] = useState(null);
    const [seedGeneratetAI_3, setSeedGeneratetAI_3] = useState(null);
    const [seedGeneratetAI_4, setSeedGeneratetAI_4] = useState(null);
    const [seedGeneratetAI_5, setSeedGeneratetAI_5] = useState(null);
    const [seedGeneratetAI_6, setSeedGeneratetAI_6] = useState(null);
    const [seedGeneratetAI_7, setSeedGeneratetAI_7] = useState(null);
    const [seedGeneratetAI_8, setSeedGeneratetAI_8] = useState(null);
    const [seedGeneratetAI_9, setSeedGeneratetAI_9] = useState(null);
    const [seedGeneratetAI_10, setSeedGeneratetAI_10] = useState(null);
    const [seedGeneratetAI_11, setSeedGeneratetAI_11] = useState(null);
    const [seedGeneratetAI_12, setSeedGeneratetAI_12] = useState(null);
    const [seedGeneratetAI_13, setSeedGeneratetAI_13] = useState(null);
    const [seedGeneratetAI_14, setSeedGeneratetAI_14] = useState(null);
    const [seedGeneratetAI_15, setSeedGeneratetAI_15] = useState(null);
    const [seedGeneratetAI_16, setSeedGeneratetAI_16] = useState(null);

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
            const item1 = localStorage.getItem('generateURLResult1')
            const itemseed1 = localStorage.getItem('generateSeedResult1')
            setImageGeneratetAI_1(item1)
            setSeedGeneratetAI_1(itemseed1)

            const item2 = localStorage.getItem('generateURLResult2')
            const itemseed2 = localStorage.getItem('generateSeedResult2')
            setImageGeneratetAI_2(item2)
            setSeedGeneratetAI_2(itemseed2)

            const item3 = localStorage.getItem('generateURLResult3')
            const itemseed3 = localStorage.getItem('generateSeedResult3')
            setImageGeneratetAI_3(item3)
            setSeedGeneratetAI_3(itemseed3)

            const item4 = localStorage.getItem('generateURLResult4')
            const itemseed4 = localStorage.getItem('generateSeedResult4')
            setImageGeneratetAI_4(item4)
            setSeedGeneratetAI_4(itemseed4)

            const item5 = localStorage.getItem('generateURLResult5')
            const itemseed5 = localStorage.getItem('generateSeedResult5')
            setImageGeneratetAI_5(item5)
            setSeedGeneratetAI_5(itemseed5)

            const item6 = localStorage.getItem('generateURLResult6')
            const itemseed6 = localStorage.getItem('generateSeedResult6')
            setImageGeneratetAI_6(item6)
            setSeedGeneratetAI_6(itemseed6)

            const item7 = localStorage.getItem('generateURLResult7')
            const itemseed7 = localStorage.getItem('generateSeedResult6')
            setImageGeneratetAI_7(item7)
            setSeedGeneratetAI_7(itemseed7)

            const item8 = localStorage.getItem('generateURLResult8')
            const itemseed8 = localStorage.getItem('generateSeedResult8')
            setImageGeneratetAI_8(item8)
            setSeedGeneratetAI_8(itemseed8)

            const item9 = localStorage.getItem('generateURLResult9')
            const itemseed9 = localStorage.getItem('generateSeedResult9')
            setImageGeneratetAI_9(item9)
            setSeedGeneratetAI_9(itemseed9)

            const item10 = localStorage.getItem('generateURLResult10')
            const itemseed10 = localStorage.getItem('generateSeedResult10')
            setImageGeneratetAI_10(item10)
            setSeedGeneratetAI_10(itemseed10)

            const item11 = localStorage.getItem('generateURLResult11')
            const itemseed11 = localStorage.getItem('generateSeedResult11')
            setImageGeneratetAI_11(item11)
            setSeedGeneratetAI_11(itemseed11)

            const item12 = localStorage.getItem('generateURLResult12')
            const itemseed12 = localStorage.getItem('generateSeedResult12')
            setImageGeneratetAI_12(item12)
            setSeedGeneratetAI_12(itemseed12)

            const item13 = localStorage.getItem('generateURLResult13')
            const itemseed13 = localStorage.getItem('generateSeedResult13')
            setImageGeneratetAI_13(item13)
            setSeedGeneratetAI_13(itemseed13)

            const item14 = localStorage.getItem('generateURLResult14')
            const itemseed14 = localStorage.getItem('generateSeedResult14')
            setImageGeneratetAI_14(item14)
            setSeedGeneratetAI_14(itemseed14)

            const item15 = localStorage.getItem('generateURLResult15')
            const itemseed15 = localStorage.getItem('generateSeedResult6')
            setImageGeneratetAI_15(item15)
            setSeedGeneratetAI_15(itemseed15)

            const item16 = localStorage.getItem('generateURLResult16')
            const itemseed16 = localStorage.getItem('generateSeedResult16')
            setImageGeneratetAI_16(item16)
            setSeedGeneratetAI_16(itemseed16)
        }
    }, [
        imageGeneratetAI_1, imageGeneratetAI_2, imageGeneratetAI_3, imageGeneratetAI_4, imageGeneratetAI_5, imageGeneratetAI_6, imageGeneratetAI_7, imageGeneratetAI_8, imageGeneratetAI_9, imageGeneratetAI_10, imageGeneratetAI_11, imageGeneratetAI_12, imageGeneratetAI_13, imageGeneratetAI_14, imageGeneratetAI_15, imageGeneratetAI_16, 
        seedGeneratetAI_1, seedGeneratetAI_2, seedGeneratetAI_3, seedGeneratetAI_4, seedGeneratetAI_5, seedGeneratetAI_6, seedGeneratetAI_7, seedGeneratetAI_8, seedGeneratetAI_9, seedGeneratetAI_10, seedGeneratetAI_11, seedGeneratetAI_12, seedGeneratetAI_13, seedGeneratetAI_14, seedGeneratetAI_15, seedGeneratetAI_16,
        linkQR])

    const downloadImageAI = () => {
        import('html2canvas').then(html2canvas => {
            html2canvas.default(document.querySelector("#capture"), {scale:2}).then(canvas => 
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

    return (
        <main className="flex min-h-screen flex-col items-center justify-top pt-2 pb-5 px-5 lg:pt-12 lg:pb-16 lg:px-13">
            <TopLogo></TopLogo>

            {/* QR */}
            {generateQR && 
                <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-top mt-16 lg:mt-36 flex-col z-40 bg-black bg-opacity-0'>
                    <h1 className={`text-center text-xl mt-[-.7rem] lg:mt-0 lg:text-4xl lg:mb-5 ${paytone_one.className}`}>DOWNLOAD OR SCAN QR CODE</h1>
                    

                    <div className={`relative w-full  ${showEmail ? 'hidden' : ''}`}>
                    <div className="relative w-[60%] mx-auto flex justify-center items-center flex-col mt-0">
                        {/* <button className="relative mx-auto flex justify-center items-center" onClick={()=>setSendEmailGak('true')}>
                            <Image src='/btn-send-email.png' width={410} height={96} alt='Zirolu' className='w-full' priority />
                        </button> */}
                        <a href={linkQR} target='_blank' className="relative mx-auto flex justify-center items-center">
                            <Image src='/btn-download-image.png' width={410} height={96} alt='Zirolu' className='w-full' priority />
                        </a>
                    </div>
                    </div>

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
                    {/* <p className='text-center font-semibold text-sm lg:text-2xl mt-5'>Scan this QR Code to Download your image.</p> */}
                    {/* <Link href='/' className='text-center font-semibold text-lg mt-2 p-20' onClick={()=>{setGenerateQR(null)}}>Tap here to close</Link> */}
                    <a href='/others' className='text-center font-semibold text-lg mt-2 p-20'>Tap here to close</a>
                </div>
            }
            {/* QR */}

            <div className={generateQR ? `opacity-0 pointer-events-none` : ''}>
                <h1 className={`text-center text-xl mt-[-.7rem] lg:mt-0 lg:text-4xl lg:mb-5 ${paytone_one.className}`}>YOU LOOKS AWESOME!</h1>
                {imageGeneratetAI_1 && 
                <div className='relative w-[100%] mt-4 mx-auto flex justify-center items-center' onClick={downloadImageAI}>
                    <div className='relative overflow-hidden flex flex-wrap justify-center items-center' id='capture'>
                        <div className='relative top-0 mx-auto w-[25%] mb-10 block'>
                            <Image src={imageGeneratetAI_1}  width={1024} height={1024} alt='Zirolu' className='relative top-0 mx-auto w-[100%] block'></Image>
                            <p className='text-center'>{seedGeneratetAI_1}</p>
                        </div>
                        <div className='relative top-0 mx-auto w-[25%] mb-10 block'>
                            <Image src={imageGeneratetAI_2}  width={1024} height={1024} alt='Zirolu' className='relative top-0 mx-auto w-[100%] block'></Image>
                            <p className='text-center'>{seedGeneratetAI_2}</p>
                        </div>
                        <div className='relative top-0 mx-auto w-[25%] mb-10 block'>
                            <Image src={imageGeneratetAI_3}  width={1024} height={1024} alt='Zirolu' className='relative top-0 mx-auto w-[100%] block'></Image>
                            <p className='text-center'>{seedGeneratetAI_3}</p>
                        </div>
                        <div className='relative top-0 mx-auto w-[25%] mb-10 block'>
                            <Image src={imageGeneratetAI_4}  width={1024} height={1024} alt='Zirolu' className='relative top-0 mx-auto w-[100%] block'></Image>
                            <p className='text-center'>{seedGeneratetAI_4}</p>
                        </div>
                        <div className='relative top-0 mx-auto w-[25%] mb-10 block'>
                            <Image src={imageGeneratetAI_5}  width={1024} height={1024} alt='Zirolu' className='relative top-0 mx-auto w-[100%] block'></Image>
                            <p className='text-center'>{seedGeneratetAI_5}</p>
                        </div>
                        <div className='relative top-0 mx-auto w-[25%] mb-10 block'>
                            <Image src={imageGeneratetAI_6}  width={1024} height={1024} alt='Zirolu' className='relative top-0 mx-auto w-[100%] block'></Image>
                            <p className='text-center'>{seedGeneratetAI_6}</p>
                        </div>
                        <div className='relative top-0 mx-auto w-[25%] mb-10 block'>
                            <Image src={imageGeneratetAI_7}  width={1024} height={1024} alt='Zirolu' className='relative top-0 mx-auto w-[100%] block'></Image>
                            <p className='text-center'>{seedGeneratetAI_7}</p>
                        </div>
                        <div className='relative top-0 mx-auto w-[25%] mb-10 block'>
                            <Image src={imageGeneratetAI_8}  width={1024} height={1024} alt='Zirolu' className='relative top-0 mx-auto w-[100%] block'></Image>
                            <p className='text-center'>{seedGeneratetAI_8}</p>
                        </div>

                        <div className='relative top-0 mx-auto w-[25%] mb-10 block'>
                            <Image src={imageGeneratetAI_9}  width={1024} height={1024} alt='Zirolu' className='relative top-0 mx-auto w-[100%] block'></Image>
                            <p className='text-center'>{seedGeneratetAI_9}</p>
                        </div>
                        <div className='relative top-0 mx-auto w-[25%] mb-10 block'>
                            <Image src={imageGeneratetAI_10}  width={1024} height={1024} alt='Zirolu' className='relative top-0 mx-auto w-[100%] block'></Image>
                            <p className='text-center'>{seedGeneratetAI_10}</p>
                        </div>
                        <div className='relative top-0 mx-auto w-[25%] mb-10 block'>
                            <Image src={imageGeneratetAI_11}  width={1024} height={1024} alt='Zirolu' className='relative top-0 mx-auto w-[100%] block'></Image>
                            <p className='text-center'>{seedGeneratetAI_11}</p>
                        </div>
                        <div className='relative top-0 mx-auto w-[25%] mb-10 block'>
                            <Image src={imageGeneratetAI_12}  width={1024} height={1024} alt='Zirolu' className='relative top-0 mx-auto w-[100%] block'></Image>
                            <p className='text-center'>{seedGeneratetAI_12}</p>
                        </div>
                        <div className='relative top-0 mx-auto w-[25%] mb-10 block'>
                            <Image src={imageGeneratetAI_13}  width={1024} height={1024} alt='Zirolu' className='relative top-0 mx-auto w-[100%] block'></Image>
                            <p className='text-center'>{seedGeneratetAI_13}</p>
                        </div>
                        <div className='relative top-0 mx-auto w-[25%] mb-10 block'>
                            <Image src={imageGeneratetAI_14}  width={1024} height={1024} alt='Zirolu' className='relative top-0 mx-auto w-[100%] block'></Image>
                            <p className='text-center'>{seedGeneratetAI_14}</p>
                        </div>
                        <div className='relative top-0 mx-auto w-[25%] mb-10 block'>
                            <Image src={imageGeneratetAI_15}  width={1024} height={1024} alt='Zirolu' className='relative top-0 mx-auto w-[100%] block'></Image>
                            <p className='text-center'>{seedGeneratetAI_15}</p>
                        </div>
                        <div className='relative top-0 mx-auto w-[25%] mb-10 block'>
                            <Image src={imageGeneratetAI_16}  width={1024} height={1024} alt='Zirolu' className='relative top-0 mx-auto w-[100%] block'></Image>
                            <p className='text-center'>{seedGeneratetAI_16}</p>
                        </div>
                    </div>
                    
                    {/* <div id='canvasResult' className='absolute top-0 left-0 right-0 bottom-0 z-10'></div> */}
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
                            <Link href='/playground/generate3' className="relative mx-auto flex justify-center items-center">
                                <Image src='/btn-retake.png' width={410} height={96} alt='Zirolu' className='w-full' priority />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
