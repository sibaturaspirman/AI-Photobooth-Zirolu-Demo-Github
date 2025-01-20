'use client';

import Link from 'next/link';
import Image from "next/image";
// import TopLogoAmeroSmall from "../../components/TopLogoAmeroSmall";
// import { getCookie } from 'cookies-next';
import React,{ useEffect, useState, useRef } from 'react';
import { useQRCode } from 'next-qrcode';
import ReactPlayer from 'react-player'

import { Kanit} from "next/font/google";
const kanit = Kanit({ subsets: ["latin"], weight: ['400','700'] });
// import io from 'socket.io-client';
// import { Merriweather} from "next/font/google";
// const merriweather = Merriweather({ subsets: ["latin"], weight: ['400','700'] });
// import BtnHexagon2 from "../../components/BtnHexagon2";
// import ReactToPrint from "react-to-print";
// var blobVideoShare, videoResult, nameResult, blobGifShare;
// const webShareSupported = 'canShare' in navigator;
// let blobVideo


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
    const [auraFix, setAuraFix] = useState(null);
    const [generateQR, setGenerateQR] = useState(null);
    const [linkQR, setLinkQR] = useState('https://zirolu.id/');
    const [idFormEmail, setIdFormEmail] = useState(null);
    const [sendEmailGak, setSendEmailGak] = useState(null);
    const [alamatEmail, setAlamatEmail] = useState();
    const [keKirimEmailGak, setKeKirimEmailGak] = useState(null);
    const [loadingDownload, setLoadingDownload] = useState(null);
    const [showEmail, setShowEmail] = useState(null);
    const [blobVideoShare, setBlobVideoShare] = useState();
    const [playVideo, setPlayVideo] = useState(false);
    const [firstNameAmild, setFirstNameAmild] = useState();

    const [maxDuration, setMaxDuration] = useState(10);
    const [countdownStart, setCountdownStart] = useState(false);
    const timerRef = useRef(null);

    let componentRef = useRef();
    const [payload, setPayload] = useState({
        name: 'AURA DEMO',
        phone: '00003',
      });
    const { Canvas } = useQRCode();


    // const videoRef = useRef(null);
    // const previewRef = useRef(null);
    // useWebcam({ videoRef,previewRef});

    useEffect(() => {
        // Perform localStorage action
        if (typeof localStorage !== 'undefined') {
            const item = localStorage.getItem('urlVideo')
            setImageResultAI(item)

            const item2 = localStorage.getItem('firstnameAmild')
            setFirstNameAmild(item2)
        }

        // console.log(blobVideoShare)

        // if (navigator.share) {
            // setNativeShare(true);
        // }

        // if(countdownStart){
        //     if(maxDuration == 0){
        //         location.href = '/comcon/visikom'
        //     }
        // }
    }, [imageResultAI, firstNameAmild])

    const fetchVideo = async (url) => {
        return fetch(url).then(function(response) {        
            return response.blob();
        });
    }

    const renderImages = () => {
        const validChars = firstNameAmild.replace(/[^a-z]/g, ''); // Hanya huruf a-z
        return validChars.split('').map((char, index) => (
          <img
            key={index}
            src={`/music/balok2/${char}.png`}
            alt={char}
            style={{ width: '40px', height: '40px', margin: '0' }}
          />
        ));
    };

    const downloadImageAI = async () => {
        setLoadingDownload('≈')
        alert("PRINTED!")
        // try {
        //     console.log(imageResultAI)
        //     const fileName='ai-music'
        //     const response = await fetch(imageResultAI);
        //     const blob = await response.blob();
        //     const mimeType = blob.type || 'video/mp4'; // Set MIME type default
        //     const fileExtension = fileName.endsWith('.mp4') ? '' : '.mp4'; // Tambahkan ekstensi jika tidak ada
        //     const file = new File([blob], `${fileName}${fileExtension}`, { type: mimeType });
      
        //     if (navigator.canShare && navigator.canShare({ files: [file] })) {
        //       await navigator.share({
        //         files: [file],
        //         title: 'AI Music Records',
        //         text: 'AI Music Records',
        //       });
        //       setPlayVideo(false)
        //       setLoadingDownload(null)
        //       alert('Video shared successfully!');
        //     } else {
        //         setPlayVideo(false)
        //         setLoadingDownload(null)
        //         alert('Your device does not support file sharing.');
        //     }
        //   } catch (error) {
        //     setLoadingDownload(null)
        //     setPlayVideo(false)
        //     console.error('Gagal membagikan video:', error);
        //     alert('Try Again to download!');
        //   }
        // fetchVideo(imageResultAI).then(function(blob) {
        //     // blobVideoShare = blob;
        //     setBlobVideoShare(blob)
        //     setTimeout(() => {
        //         console.log(blobVideoShare)
        //     }, 200);
        // }); 
        // console.log(blobVideoShare)
        // const data = {
        //     files: [
        //         new File([blobVideoShare], 'AI MUSIC', {
        //         type: blobVideoShare.type,
        //       }),
        //     ],
        //     title: 'Find Your Spark - NTMY x AntiGRVTY',
        //     text: 'Find Your Spark - NTMY x AntiGRVTY https://findyourspark.app',
        // };
      
        // if (navigator.canShare(data)) {
        //     await navigator.share(data);
        //     try {
        //       await navigator.share(data);
        //     } catch (error) {
        //       console.log(error.message)
        //     }
        // }

        // setTimeout(async () => {
            // await navigator
            //     .share(data)
            //     .then(() => console.log('Successful share'))
            //     .catch(() => console.log('Error sharing'));
        // }, 200);


        // var link = document.createElement("a"); 
        //   link.download = 'AI MUSIC';  
        //   link.target = "_blank"; 
        //   link.href = imageResultAI; 
        //   document.body.appendChild(link);  
        //   setTimeout(function() { 
        //       link.click();  
        //       document.body.removeChild(link); 
        //   }, 500); 
    }
    

    return (
        <main className="flex fixed h-full w-full bg-[#CC1419] overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20" onContextMenu={(e)=> e.preventDefault()}>
            <div className={`relative w-full`}>
                <h1 className={`text-center uppercase text-2xl lg:text-6xl font-medium mb-4 lg:mt-10 ${kanit.className}`}>
                YOUR SOUNDWAVE <br></br> IS READY!
                </h1>
            </div>

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
                {/* {imageResultAI &&  */}
                <div className='relative w-full mt-0 mb-2 mx-auto flex justify-center items-center'>
                    <div className='relative z-10 w-[62%]'>
                        <div className={`w-full flex items-center justify-center`}>
                            <div className='photocard bg-white w-full'>
                                <div className='inner p-5'>
                                    <div className='photocard-take w-full border-dashed border-[#bf1010] border-2 bg-[#FE1A1A]'>
                                        <div className='inner flex items-center justify-center flex-col'>
                                            <div className="mx-2" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
                                            {renderImages()}
                                            </div>
                                            {firstNameAmild}
                                        </div>
                                    </div>
                                    <p className='text-[#000] text-center mt-3'>Nama Dalam Nada</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* } */}
                {loadingDownload && 
                    <div className='relative mt-2 border-2 text-base py-2 text-sm text-center bg-[#FFF1B8] text-[#000] w-[70%] mx-auto'>
                        <p>Please wait, preparing your result...</p>
                    </div>
                }

                <div className={`relative w-[60%] ${loadingDownload ? 'hidden' : ''}`}>
                    <div className="relative w-full flex justify-center items-center mt-2 z-20">
                        <button className="relative mx-auto flex justify-center items-center" onClick={downloadImageAI}>
                        <Image src='/music/btn-print.png' width={776} height={200} alt='Zirolu' className='w-full' priority />
                        </button>
                        {/* <a href={imageResultAI} target='_blank' className="relative mx-auto flex justify-center items-center">
                        <Image src='/music/btn-download.png' width={776} height={200} alt='Zirolu' className='w-full' priority />
                        </a> */}
                    </div>

                    <Link href='/music/v3' className="relative w-[60%] mx-auto flex justify-center items-center">
                    <Image src='/music/back.png' width={864} height={210} alt='Zirolu' className='w-full' priority />
                    </Link>
                </div>
            </div>


            {/* {typeof window !== 'undefined' && navigator && navigator?.share && (
              <div>
              <button
                className="absolute top-6 right-16"
                onClick={() => {
                  navigator
                    .share({
                      title: 'Title: ',
                      url: 'http://localhost:3000/articles/'
                    })
                    .then(() => console.log('Successful share'))
                    .catch(() => console.log('Error sharing'));
                }}
              >
                SHARE 
              </button>
              </div>
            )} */}
        </main>
    );
}