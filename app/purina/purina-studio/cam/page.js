// 'use client';

// import { useEffect, useRef, useState, useMemo } from 'react';
// import Image from "next/image";
// import { useRouter } from 'next/navigation';


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

// export default function Cam() {
//     const router = useRouter();
//     const [enabled, setEnabled] = useState(false);
//     const [captured, setCaptured] = useState(false);
//     const [capturedAwal, setCapturedAwal] = useState(false);
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
    
//             let faceImage = canvas.toDataURL();
//             if (typeof localStorage !== 'undefined') {
//                 localStorage.setItem("faceImage", faceImage)
//             }
//         }, 3000);
//     }

//     const retake = () => {
//         setEnabled(false)
//         setCapturedAwal(false)
//     }
//     // @snippet:end

//     const generateAI = () => {

//         setTimeout(() => {
//             router.push('/purina/purina-studio/acc');
//         }, 200);
//     }

//     return (
//         <main className="flex fixed h-full w-full bg-purina-ps overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20" onContextMenu={(e)=> e.preventDefault()}>
//             <div  className={`relative w-[80%] lg:w-[70%] mx-auto mb-3 lg:mb-[2rem]`}>
//             <Image src='/purina/ps-take.png' width={660} height={104} alt='Zirolu' className='w-full' priority />
//             </div>

//             <div className={`relative w-full flex flex-col justify-center items-center mt-2 mb-3 lg:mt-8 lg:mb-10`}>
//                 <div className='relative lg:w-full'>

//                     {captured && 
//                     <div className='absolute top-0 left-0 right-0 bottom-0 w-[100px] h-[100px] lg:w-[174px] lg:h-[174px] overflow-hidden m-auto flex justify-center items-center pointer-events-none z-10'>
//                         <div className='w-full animate-countdown translate-y-[35%]'>
//                             <Image src='/countdown.png' width={174} height={522} alt='Zirolu' className='w-full' priority />
//                         </div>
//                     </div>
//                     }

//                     <video ref={videoRef} className={`w-[80%] videoRatio1 mx-auto border-2 border-[#ffffff] rounded-sm ${enabled ? 'absolute opacity-0':'relative'}`} playsInline height={512}></video>
//                     <canvas ref={previewRef} width="512" height="512" className={`${enabled ? 'relative':'absolute opacity-0'} w-[90%] top-0 left-0 right-0 mx-auto pointer-events-nones border-2 border-[#ffffff] rounded-sm`}></canvas>
//                 </div>
//             </div>

//             {!enabled && 
//                 <div className={`relative w-full flex justify-center items-center mt-4 ${capturedAwal ? 'opacity-0 pointer-events-none' : ''}`}>
//                     <button className="relative mx-auto flex  w-[80%] justify-center items-center" onClick={captureVideo}>
//                         <Image src='/purina/ps-capture.png' width={319} height={67} alt='Zirolu' className='w-full' priority />
//                     </button>
//                 </div>
//             }
//             <div className={`relative w-full`}>
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
    const faceImage = canvas.toDataURL('image/png');
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem("faceImage", faceImage);
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
      localStorage.removeItem("faceImage");
    }
  };

  const generateAI = () => {
    setTimeout(() => {
      router.push('/purina/purina-studio/acc');
    }, 200);
  };

  return (
    <main
      className="flex fixed h-full w-full bg-purina-ps overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20"
      onContextMenu={(e) => e.preventDefault()}
    >
      <div className={`relative w-[80%] lg:w-[70%] mx-auto mb-3 lg:mb-[2rem]`}>
        <Image src='/purina/ps-take.png' width={660} height={104} alt='Zirolu' className='w-full' priority />
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
