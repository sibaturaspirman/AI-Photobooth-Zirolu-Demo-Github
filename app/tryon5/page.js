// 'use client';

// import * as fal from '@fal-ai/serverless-client';
// import { useEffect, useRef, useState, useMemo } from 'react';
// import Image from "next/image";
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';

// // @snippet:start(client.config)
// fal.config({
//     // credentials: 'FAL_KEY_ID:FAL_KEY_SECRET',
//     requestMiddleware: fal.withProxy({
//       targetUrl: '/api/fal/proxy', // the built-int nextjs proxy
//       // targetUrl: 'http://localhost:3333/api/fal/proxy', // or your own external proxy
//     }),
// });


// let streamCam = null;
// const useWebcam = ({
//     videoRef
//   }) => {
//     useEffect(() => {
//       if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//         navigator.mediaDevices.getUserMedia({ video: {facingMode: { ideal: "environment" }}}).then((stream) => {
//             streamCam = stream
//             window.localStream = stream
//           if (videoRef.current !== null) {
//             videoRef.current.srcObject = stream;
//             videoRef.current.play();
//           }
//         });
//       }
//     }, [videoRef]);
// };

// function getRandomInt(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     return Math.floor(Math.random() * (max - min + 1)) + min;
// }
// let FACE_URL_RESULT = '', FACE_URL_RESULT2 = ''
// export default function Cam() {
//     const router = useRouter();
//     const [enabled, setEnabled] = useState(false);
//     const [captured, setCaptured] = useState(false);
//     const [capturedAwal, setCapturedAwal] = useState(false);
//     // const [countDown, setCoundown] = useState(5);
//     // const [counter, setCounter] = useState(60);
//     // const waktuBatasTake = useRef(null);
//     const videoRef = useRef(null);
//     const previewRef = useRef(null);

//     useWebcam({ videoRef,previewRef});

//     const captureVideo  = ({
//         width = 512,
//         height = 512,
//     }) => {
//         setCaptured(true)
//         setCapturedAwal(true)
//         setTimeout(() => {
//             setEnabled(true)
//             setCaptured(null)
//             const canvas = previewRef.current;
//             const video = videoRef.current;
//             video.play;
//             if (canvas === null || video === null) {
//                 return;
//             }
        
//             // Calculate the aspect ratio and crop dimensions
//             const aspectRatio = video.videoWidth / video.videoHeight;
//             let sourceX, sourceY, sourceWidth, sourceHeight;
        
//             if (aspectRatio > 1) {
//                 // If width is greater than height
//                 sourceWidth = video.videoHeight;
//                 sourceHeight = video.videoHeight;
//                 sourceX = (video.videoWidth - video.videoHeight) / 2;
//                 sourceY = 0;
//             } else {
//                 // If height is greater than or equal to width
//                 sourceWidth = video.videoWidth;
//                 sourceHeight = video.videoWidth;
//                 sourceX = 0;
//                 sourceY = (video.videoHeight - video.videoWidth) / 2;
//             }
        
//             // Resize the canvas to the target dimensions
//             canvas.width = width;
//             canvas.height = height;
        
//             const context = canvas.getContext('2d');
//             if (context === null) {
//                 return;
//             }
        
//             // Draw the image on the canvas (cropped and resized)
//             context.translate(canvas.width, 0);
//             context.scale(-1,1);
//             context.drawImage(
//                 video,
//                 sourceX,
//                 sourceY,
//                 sourceWidth,
//                 sourceHeight,
//                 0,
//                 0,
//                 width,
//                 height
//             );
    
//             let clothesImage = canvas.toDataURL();
//             setImageFile(clothesImage)
//             if (typeof localStorage !== 'undefined') {
//                 localStorage.setItem("clothesImage", clothesImage)
//             }
//             // setTimeout(() => {
//             //     router.push('/generate');
//             // }, 1250);
//         }, 3000);
//     }

//     const retake = () => {
//         setEnabled(false)
//         setCapturedAwal(false)
//     }


//     // AI
//     const [imageFile, setImageFile] = useState(null);
//     const [imageFile2, setImageFile2] = useState(null);
//     const [imageFile3, setImageFile3] = useState(null);
//     const [styleFix, setStyleFix] = useState(null);
//     const [styleFix2, setStyleFix2] = useState(null);
//     const [styleFix3, setStyleFix3] = useState(null);
//     const [formasiFix, setFormasiFix] = useState(null);
//     const [numProses, setNumProses] = useState(0);
//     const [numProses1, setNumProses1] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(true);
//     const [result, setResult] = useState(null);
//     const [resultFaceSwap, setResultFaceSwap] = useState(null);
//     const [resultFaceSwap2, setResultFaceSwap2] = useState(null);
//     const [resultFaceSwap3, setResultFaceSwap3] = useState(null);
//     const [logs, setLogs] = useState([]);
//     const [elapsedTime, setElapsedTime] = useState(0);
//     // @snippet:end
//     useEffect(() => {
//         // Perform localStorage action
//         if (typeof localStorage !== 'undefined') {
//             const item1 = localStorage.getItem('urlFix')
//             const item2 = localStorage.getItem('formasiFix')
//             setStyleFix(item1)
//             setFormasiFix(item2)
//         }
//     }, [styleFix, formasiFix])

//     const generateAI = () => {

//         setTimeout(() => {
//             router.push('/purina/pawshion-show/acc');
//         }, 200);
//         // setNumProses1(true)
//         // generateImageSwap()

//         // videoRef.current.stop();
//         // videoRef.current.srcObject = ''
//         // streamCam.getVideoTracks()[0].stop();
//         // console.log(streamCam)

        
//         // localStream.getVideoTracks()[0].stop();
//         // console.log(streamCam)
//         // console.log(videoRef)
//         // videoRef.src=''
//         // STOP CAM
//         // streamCam.getTracks().forEach(function(track) {
//         //     track.stop();
//         // });
//     }

//     const reset2 = () => {
//       setLoading(false);
//       setError(true);
//       setElapsedTime(0);
//     };
//     const toDataURL = url => fetch(url)
//     .then(response => response.blob())
//     .then(blob => new Promise((resolve, reject) => {
//         const reader = new FileReader()
//         reader.onloadend = () => resolve(reader.result)
//         reader.onerror = reject
//         reader.readAsDataURL(blob)
//     }))

//     const generateImageSwap = async () => {

//         // STOP CAM
//         // streamCam.getTracks().forEach(function(track) {
//         //     track.stop();
//         // });

//         setNumProses(2)
//         reset2();
//         // @snippet:start("client.queue.subscribe")
//         setLoading(true);
//         const start = Date.now();
//         try {
//         const result = await fal.subscribe(
//             'fal-ai/face-swap',
//             {
//             input: {
//                 base_image_url: styleFix,
//                 swap_image_url: imageFile
//             },
//             pollInterval: 5000, // Default is 1000 (every 1s)
//             logs: true,
//             onQueueUpdate(update) {
//                 setElapsedTime(Date.now() - start);
//                 if (
//                 update.status === 'IN_PROGRESS' ||
//                 update.status === 'COMPLETED'
//                 ) {
//                 setLogs((update.logs || []).map((log) => log.message));
//                 }
//             },
//             }
//         );
//         setResultFaceSwap(result);
//         FACE_URL_RESULT= result.image.url;

//         // generateImageSwap2()

//         toDataURL(FACE_URL_RESULT)
//         .then(dataUrl => {
//             if (typeof localStorage !== 'undefined') {
//                 localStorage.setItem("resulAIBase64", dataUrl)
//                 localStorage.setItem("faceURLResult", FACE_URL_RESULT)
//             }
//             setTimeout(() => {
//                 router.push('/iqos-prj/result');
//             }, 200);
//             // generateImageSwap2()
//         })

//         } catch (error) {
//             setError(false);
//         } finally {
//             setLoading(false);
//             setElapsedTime(Date.now() - start);
//         }
//         //@snippet:end
//     };

//     // const generateImageSwap2 = async () => {

//     //     // STOP CAM
//     //     // streamCam.getTracks().forEach(function(track) {
//     //     //     track.stop();
//     //     // });

//     //     setNumProses(3)
//     //     reset2();
//     //     // @snippet:start("client.queue.subscribe")
//     //     setLoading(true);
//     //     const start = Date.now();
//     //     try {
//     //     const result = await fal.subscribe(
//     //         'fal-ai/esrgan',
//     //         {
//     //         input: {
//     //             image_url: FACE_URL_RESULT
//     //         },
//     //         pollInterval: 5000, // Default is 1000 (every 1s)
//     //         logs: true,
//     //         onQueueUpdate(update) {
//     //             setElapsedTime(Date.now() - start);
//     //             if (
//     //             update.status === 'IN_PROGRESS' ||
//     //             update.status === 'COMPLETED'
//     //             ) {
//     //             setLogs((update.logs || []).map((log) => log.message));
//     //             }
//     //         },
//     //         }
//     //     );
//     //     setResultFaceSwap(result);
//     //     FACE_URL_RESULT2= result.image.url;

//     //     toDataURL(FACE_URL_RESULT2)
//     //     .then(dataUrl => {
//     //         if (typeof localStorage !== 'undefined') {
//     //             // localStorage.setItem("resulAIBase64", dataUrl)
//     //             localStorage.setItem("faceURLResult", FACE_URL_RESULT2)
//     //         }
//     //         setTimeout(() => {
//     //             router.push('/iqos-prj/result');
//     //         }, 200);
//     //     })
//     //     } catch (error) {
//     //         setError(false);
//     //     } finally {
//     //         setLoading(false);
//     //         setElapsedTime(Date.now() - start);
//     //     }
//     //     // @snippet:end
//     // };

//     return (
//         <main className="flex fixed h-full w-full bg-purina-ps overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20" onContextMenu={(e)=> e.preventDefault()}>
//             {/* <div className="fixed top-0 left-0 w-full h-full bg-iqos-border pointer-events-none z-10"></div> */}
//             <div  className={`relative w-[80%] lg:w-[70%] mx-auto mb-3 lg:mb-[2rem] ${numProses1 ? 'opacity-0 pointer-events-none' : ''}`}>
//             <Image src='/purina/ps-take.png' width={660} height={104} alt='Zirolu' className='w-full' priority />
//             </div>
            
//             <div className={`fixed top-0 left-0 w-full h-full bg-visikom flex items-center justify-center z-50 ${error ? 'hidden' : ''}`}>
//             <a href='/purina/pawshion-show' className='relative w-[80%] mx-auto flex justify-center items-center'>
//                 <Image src='/permata/error.png' width={327} height={221} alt='Zirolu' className='w-full' priority />
//             </a>
//             </div>

//             {/* LOADING */}
//             {numProses1 && 
//                 <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center flex-col z-20'>
//                     {/* <div className='relative w-[250px] h-[78px] lg:w-[555px] lg:h-[180px] overflow-hidden'>
//                         <div className='animate-loading1 absolute left-0 top-0 w-full mx-auto flex justify-center items-center pointer-events-none'>
//                             <Image src='/loading.png' width={770} height={714} alt='Zirolu' className='w-full' priority />
//                         </div>
//                     </div> */}

//                     {/* <div className="relative w-[40%] mx-auto mt-[14rem] mb-5">
//                         <Image src='/pln/pln.png' width={784} height={228} alt='Zirolu' className='w-full' priority />
//                     </div> */}
//                     <div className='animate-upDownCepet relative py-2 px-4 mt-5 lg:mt-10 lg:p-5 lg:text-6xl border-2 text-center bg-[#F43500] rounded-xl text-[#fff] lg:font-bold'>
//                         <p>{`Please wait, loading...`}</p>
//                         <p>{`Process : ${(elapsedTime / 1000).toFixed(2)} seconds (${numProses} of 2)`}</p>
//                         {error}
//                     </div>

//                     {/* <pre className='relative py-2 px-4 mt-5 lg:mt-10 border-2 text-left bg-[#A91E58] rounded-xl text-[#fff] text-xs lg:text-sm overflow-auto no-scrollbar h-[100px] w-[60%] mx-auto'>
//                         <code>
//                         {logs.filter(Boolean).join('\n')}
//                         </code>
//                         AI generate face... <br></br>
//                         Loading model..<br></br>
//                     </pre> */}
//                 </div>
//             }
//             {/* LOADING */}
//             <div className={`relative w-full flex flex-col justify-center items-center mt-2 mb-3 lg:mt-8 lg:mb-10 ${numProses1 ? 'opacity-0 pointer-events-none' : ''}`}>
//                 <div className='relative lg:w-full'>
//                     {/* {!enabled && 
//                     <div className='absolute top-0 left-0 right-0 bottom-0 w-[50%] mx-auto flex justify-center items-center pointer-events-none z-10'>
//                         <Image src='/icon-capture.png' width={389} height={220} alt='Zirolu' className='w-full' priority />
//                     </div>
//                     } */}

//                     {captured && 
//                     <div className='absolute top-0 left-0 right-0 bottom-0 w-[100px] h-[100px] lg:w-[174px] lg:h-[174px] overflow-hidden m-auto flex justify-center items-center pointer-events-none z-10'>
//                         <div className='w-full animate-countdown translate-y-[35%]'>
//                             <Image src='/countdown.png' width={174} height={522} alt='Zirolu' className='w-full' priority />
//                         </div>
//                     </div>
//                     }

//                     {/* {!enabled && 
//                     <div className='w-[55%] mx-auto absolute left-0 right-0 bottom-0 z-10'>
//                         <Image src='/frame-pose.png' width={426} height={461} alt='Zirolu' className='w-full' priority />
//                     </div>
//                     } */}

//                     <video ref={videoRef} className={`w-[80%] videoRatio1 mx-auto border-2 border-[#ffffff] rounded-sm ${enabled ? 'absolute opacity-0':'relative'}`} playsInline height={512}></video>
//                     <canvas ref={previewRef} width="512" height="512" className={`${enabled ? 'relative':'absolute opacity-0'} w-[90%] top-0 left-0 right-0 mx-auto pointer-events-nones border-2 border-[#ffffff] rounded-sm`}></canvas>
//                 </div>
//             </div>


//             {/* {!enabled && 
//                 <p className='block text-center text-5xl mt-1 mb-3 lg:mt-4 text-white'>*Foto hanya sendiri <br></br> *Ikuti garis pose dan tidak terlalu zoom</p> 
//             } */}
//             {!enabled && 
//                 <div className={`relative w-full flex justify-center items-center mt-4 ${capturedAwal ? 'opacity-0 pointer-events-none' : ''}`}>
//                     <button className="relative mx-auto flex  w-[80%] justify-center items-center" onClick={captureVideo}>
//                         <Image src='/purina/ps-capture.png' width={319} height={67} alt='Zirolu' className='w-full' priority />
//                     </button>
//                 </div>
//             }
//             <div className={`relative w-full ${numProses1 ? 'opacity-0 pointer-events-none' : ''}`}>
//             <div className={`relative w-full ${!enabled ? 'hidden' : ''}`}>
//                 <div className="relative w-[80%] mx-auto flex justify-center items-center flex-col mt-4">
//                     <button className="w-full relative mx-auto flex justify-center items-center" onClick={generateAI}>
//                         <Image src='/purina/ps-generate.png' width={319} height={67} alt='Zirolu' className='w-full' priority />
//                     </button>
//                     <button className="relative w-full mx-auto flex justify-center items-center mt-0" onClick={retake}>
//                         <Image src='/comcon/zyn/btn-retake.png' width={864} height={210} alt='Zirolu' className='w-full' priority />
//                     </button>
//                 </div>
//             </div></div>
//         </main>
//     );
// }


'use client';

import TopLogo from "./../components/TopLogo";
import { useEffect, useRef, useState } from 'react';
import Image from "next/image";
import { useRouter } from 'next/navigation';

let streamCam = null;
const useWebcam = ({ videoRef }) => {
  useEffect(() => {
    let isMounted = true;

    const start = async () => {
      try {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: { ideal: "environment" } }
          });
          if (!isMounted) return;

          streamCam = stream;
          window.localStream = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            await videoRef.current.play();
          }
        }
      } catch (e) {
        console.error("getUserMedia error", e);
      }
    };

    start();

    return () => {
      isMounted = false;
      // optional: stop stream ketika leave page
      if (streamCam) {
        streamCam.getTracks().forEach(t => t.stop());
        streamCam = null;
      }
    };
  }, [videoRef]);
};

// helper center-crop square ke canvas
function drawSquareCover(imgOrVideo, canvas, size = 512, mirror = false) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const w =
    imgOrVideo.videoWidth || imgOrVideo.naturalWidth || imgOrVideo.width;
  const h =
    imgOrVideo.videoHeight || imgOrVideo.naturalHeight || imgOrVideo.height;

  if (!w || !h) return;

  const aspect = w / h;
  let sx, sy, sWidth, sHeight;

  if (aspect > 1) {
    // landscape -> crop kiri kanan
    sHeight = h;
    sWidth = h;
    sx = (w - h) / 2;
    sy = 0;
  } else {
    // portrait -> crop atas bawah
    sWidth = w;
    sHeight = w;
    sx = 0;
    sy = (h - w) / 2;
  }

  canvas.width = size;
  canvas.height = size;

  ctx.save();
  if (mirror) {
    ctx.translate(size, 0);
    ctx.scale(-1, 1);
  }
  ctx.drawImage(imgOrVideo, sx, sy, sWidth, sHeight, 0, 0, size, size);
  ctx.restore();
}

export default function Cam() {
  const router = useRouter();
  const [enabled, setEnabled] = useState(false);
  const [captured, setCaptured] = useState(false);
  const [capturedAwal, setCapturedAwal] = useState(false);

  const videoRef = useRef(null);
  const previewRef = useRef(null);

  // NEW: input galeri
  const fileInputRef = useRef(null);

  useWebcam({ videoRef });

  const saveCanvasToLocalStorage = () => {
    const canvas = previewRef.current;
    if (!canvas) return;
    const clothesImage = canvas.toDataURL('image/png');
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem("clothesImage", clothesImage);
    }
  };

  const captureVideo = ({
    width = 512,
    height = 512,
  } = {}) => {
    setCaptured(true);
    setCapturedAwal(true);

    setTimeout(() => {
      setEnabled(true);
      setCaptured(false);

      const canvas = previewRef.current;
      const video = videoRef.current;
      if (!canvas || !video) return;

      // draw dari kamera (mirror like your old code)
      drawSquareCover(video, canvas, width, true);
      saveCanvasToLocalStorage();
    }, 3000);
  };

  // NEW: buka file picker
  const openGallery = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  // NEW: handle pilih foto
  const onPickGallery = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setCaptured(false);
    setCapturedAwal(true);

    const img = new window.Image();
    img.onload = () => {
      const canvas = previewRef.current;
      if (!canvas) return;

      // draw dari image (ga perlu mirror)
      drawSquareCover(img, canvas, 512, false);

      setEnabled(true);
      saveCanvasToLocalStorage();

      // reset input biar bisa pilih file yang sama lagi
      e.target.value = '';
    };

    img.onerror = (err) => {
      console.error("Image load error", err);
      e.target.value = '';
    };

    img.src = URL.createObjectURL(file);
  };

  const retake = () => {
    setEnabled(false);
    setCapturedAwal(false);
    setCaptured(false);

    // optional: clear localStorage
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem("clothesImage");
    }
  };

  const generateAI = () => {
    setTimeout(() => {
    //   router.push('/purina/purina-studio/acc');

        router.push('/tryon5/cam');
    }, 200);
  };

  return (
    <main
      className="flex fixed h-full w-full bg-purina-ps overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20"
      onContextMenu={(e) => e.preventDefault()}
    >
      <TopLogo></TopLogo>
      <div className={`relative w-[80%] lg:w-[70%] mx-auto mb-3 lg:mb-[2rem] text-center`}>
        {/* <Image src='/purina/ps-take.png' width={660} height={104} alt='Zirolu' className='w-full' priority /> */}
        Take a picture of clothes
      </div>

      <div className={`relative w-full flex flex-col justify-center items-center mt-0 mb-0 lg:mt-8 lg:mb-10`}>
        <div className='relative lg:w-full'>

          {captured &&
            <div className='absolute top-0 left-0 right-0 bottom-0 w-[100px] h-[100px] lg:w-[174px] lg:h-[174px] overflow-hidden m-auto flex justify-center items-center pointer-events-none z-10'>
              <div className='w-full animate-countdown translate-y-[35%]'>
                <Image src='/countdown.png' width={174} height={522} alt='Zirolu' className='w-full' priority />
              </div>
            </div>
          }

          <video
            ref={videoRef}
            className={`w-[80%] videoRatio1 mx-auto border-2 border-[#ffffff] rounded-sm ${enabled ? 'absolute opacity-0' : 'relative'}`}
            playsInline
            height={512}
          />

          <canvas
            ref={previewRef}
            width="512"
            height="512"
            className={`${enabled ? 'relative' : 'absolute opacity-0'} w-[90%] top-0 left-0 right-0 mx-auto pointer-events-none border-2 border-[#ffffff] rounded-sm`}
          />
        </div>
      </div>

      {/* NEW: hidden input for gallery */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onPickGallery}
      />

      {!enabled &&
        <div className={`relative w-full flex flex-col gap-2 justify-center items-center mt-4 ${capturedAwal ? 'opacity-0 pointer-events-none' : ''}`}>
          {/* tombol capture kamera */}
          <button
            className="relative mx-auto flex w-[80%] justify-center items-center"
            onClick={() => captureVideo({ width: 512, height: 512 })}
          >
            <Image src='/purina/ps-capture.png' width={319} height={67} alt='Zirolu' className='w-full' priority />
          </button>

          {/* NEW: tombol ambil dari galeri */}
          <button
            className="relative mx-auto flex w-[80%] justify-center items-center mt-1"
            onClick={openGallery}
          >
            {/* kamu bisa ganti asset ini sesuai desain */}
            <Image src='/purina/pstd-galeri.png' width={319} height={67} alt='Ambil dari galeri' className='w-full' priority />
          </button>
        </div>
      }

      <div className={`relative w-full`}>
        <div className={`relative w-full ${!enabled ? 'hidden' : ''}`}>
          <div className="relative w-[80%] mx-auto flex justify-center items-center flex-col mt-4">
            <button className="w-full relative mx-auto flex justify-center items-center" onClick={generateAI}>
              <Image src='/purina/ps-generate.png' width={319} height={67} alt='Zirolu' className='w-full' priority />
            </button>
            <button className="relative w-full mx-auto flex justify-center items-center mt-0" onClick={retake}>
              <Image src='/comcon/zyn/btn-retake.png' width={864} height={210} alt='Zirolu' className='w-full' priority />
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
