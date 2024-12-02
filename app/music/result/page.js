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

            // const files = item
            fetchVideo(item).then(function(blob) {
                // blobVideoShare = blob;
                setBlobVideoShare(blob)
            }); 
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
    }, [imageResultAI, blobVideoShare])

    const fetchVideo = async (url) => {
        return fetch(url).then(function(response) {        
            return response.blob();
        });
    }

    const downloadImageAI = async () => {
        try {
            console.log(imageResultAI)
            const fileName='ai-music'
            const response = await fetch(imageResultAI);
            const blob = await response.blob();
            const mimeType = blob.type || 'video/mp4'; // Set MIME type default
            const fileExtension = fileName.endsWith('.mp4') ? '' : '.mp4'; // Tambahkan ekstensi jika tidak ada
            const file = new File([blob], `${fileName}${fileExtension}`, { type: mimeType });
      
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
              await navigator.share({
                files: [file],
                title: 'Video Keren',
                text: 'Lihat video keren ini!',
              });
              alert('Video berhasil dibagikan!');
            } else {
              alert('Perangkat Anda tidak mendukung berbagi file.');
            }
          } catch (error) {
            console.error('Gagal membagikan video:', error);
            alert('Terjadi kesalahan saat membagikan video.');
          }
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
    
    const downloadResult = async (filename, file) => {
        if(webShareSupported){
          const data = {
            files: [
                new File([blobVideoShare], filename, {
                type: blobVideoShare.type,
              }),
            ],
            title: 'Find Your Spark - NTMY x AntiGRVTY',
            text: 'Find Your Spark - NTMY x AntiGRVTY https://findyourspark.app',
          };
      
          if (navigator.canShare(data)) {
            await navigator.share(data);
            try {
              await navigator.share(data);
            } catch (error) {
              console.log(error.message)
            }
          }
        }else{
          var link = document.createElement("a"); 
          link.download = filename;  
          link.target = "_blank"; 
          link.href = file; 
          document.body.appendChild(link);  
          setTimeout(function() { 
              link.click();  
              document.body.removeChild(link); 
          }, 500); 
        }
    }
    

    return (
        <main className="flex fixed h-full w-full bg-music2 overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20" onContextMenu={(e)=> e.preventDefault()}>


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
                    <div className='relative z-10 w-[70%]'>
                        <div className={`relative w-full overflow-hidden flex justify-center items-center`}>
                            <video src={imageResultAI} autoPlay playsInline loop className=" mx-auto w-full border-4 shadow-xl border-white"></video>
                        </div>
                    </div>
                </div>
                }
                {loadingDownload && 
                    <div className='relative mt-2 border-2 text-base py-3 text-center bg-[#1B3CD8] rounded-xl text-[#fff] w-[70%] mx-auto'>
                        <p>Please wait, loading...</p>
                    </div>
                }

                <div className={`relative w-[60%] ${loadingDownload ? 'hidden' : ''}`}>
                    <div className="relative w-full flex justify-center items-center mt-2 z-20">
                        <button className="relative mx-auto flex justify-center items-center" onClick={downloadImageAI}>
                        <Image src='/music/btn-download.png' width={776} height={200} alt='Zirolu' className='w-full' priority />
                        </button>
                        {/* <a href={imageResultAI} target='_blank' className="relative mx-auto flex justify-center items-center">
                        <Image src='/music/btn-download.png' width={776} height={200} alt='Zirolu' className='w-full' priority />
                        </a> */}
                    </div>

                    <Link href='/music' className="relative w-[60%] mx-auto flex justify-center items-center">
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