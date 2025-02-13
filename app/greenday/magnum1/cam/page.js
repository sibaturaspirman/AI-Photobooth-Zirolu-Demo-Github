'use client';

import * as fal from '@fal-ai/serverless-client';
import { useEffect, useRef, useState, useMemo } from 'react';
import { FaceMesh } from "@mediapipe/face_mesh";
import NextImage from "next/image";
import { useRouter } from 'next/navigation';
import BgWaveCustom from "../../../components/BgWaveCustom";

// @snippet:start(client.config)
fal.config({
    // credentials: 'FAL_KEY_ID:FAL_KEY_SECRET',
    requestMiddleware: fal.withProxy({
      targetUrl: '/api/fal/proxy', // the built-int nextjs proxy
      // targetUrl: 'http://localhost:3333/api/fal/proxy', // or your own external proxy
    }),
});

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

let URL_RESULT = ''
export default function Cam() {
    const router = useRouter();
    const canvasRef = useRef(null);
    const imgRef = useRef(null);
    const videoRef = useRef(null);
    const captureCanvasRef = useRef(null);
    const [isClient, setIsClient] = useState(false);
    const [scale, setScale] = useState(0.5);
    const [capturedImage, setCapturedImage] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [result, setResult] = useState(null);
    const [stream, setStream] = useState(null);

    const [numProses1, setNumProses1] = useState(null);
    const [enabled, setEnabled] = useState(false);
    const [captured, setCaptured] = useState(false);
    const [capturedAwal, setCapturedAwal] = useState(false);

    const leftEyeImgSrc = "/greenday/petir-kiri.png";
    const rightEyeImgSrc = "/greenday/petir-kanan.png";
    const [leftEyeStatus, setLeftEyeStatus] = useState(false);
    const [rightEyeStatus, setRightEyeStatus] = useState(false);


    useEffect(() => {
        setIsClient(true);
        // const storedImage = localStorage.getItem("faceImage");
        // if (storedImage) {
        //     setImageSrc(storedImage);
        // }
    }, []);

    useEffect(() => {
        if (!isClient) return;
        
        async function startCamera() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: { ideal: 1000 },
                        height: { ideal: 1000 },
                        aspectRatio: 1
                    }
                });
    
                videoRef.current.srcObject = stream;
                setStream(stream);
            } catch (error) {
                console.error("Error accessing camera:", error);
            }
        }

        startCamera();
    }, [isClient]);

    function captureImage() {
        setCaptured(true)
        setCapturedAwal(true)

        setTimeout(() => {
            setEnabled(true)
            setCaptured(null)

            const video = videoRef.current;
            const canvas = captureCanvasRef.current;
            const ctx = canvas.getContext("2d");

            // Ukuran hasil capture (1000x1000 px)
            const targetWidth = 1000;
            const targetHeight = 1000;

            // Ukuran asli video
            const videoWidth = video.videoWidth;
            const videoHeight = video.videoHeight;

            // Tentukan skala untuk crop agar tetap proporsional
            const scale = Math.max(targetWidth / videoWidth, targetHeight / videoHeight);
            const scaledWidth = videoWidth * scale;
            const scaledHeight = videoHeight * scale;

            // Hitung posisi crop agar gambar tetap di tengah
            const offsetX = (scaledWidth - targetWidth) / 2;
            const offsetY = (scaledHeight - targetHeight) / 2;

            // Atur ukuran canvas sesuai dengan target
            canvas.width = targetWidth;
            canvas.height = targetHeight;

            // Gambar hasil video ke canvas dengan crop di tengah
            ctx.drawImage(video, -offsetX, -offsetY, scaledWidth, scaledHeight);

            // Konversi ke data URL (base64)
            const imageDataUrl = canvas.toDataURL("image/png");
            setImageSrc(imageDataUrl);

            localStorage.setItem('formasiFix', getRandomInt(1,3))

        }, 3000);
    }

    useEffect(() => {
        if (!isClient || !imageSrc) return;

        async function detectFace() {
            const img = imgRef.current;
            if (!img.complete) {
                img.onload = detectFace;
                return;
            }

            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0, img.width, img.height);

            applyGrayscale(ctx, canvas.width, canvas.height);

            if (typeof window !== "undefined") {
                const faceMesh = new FaceMesh({
                    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
                });

                faceMesh.setOptions({
                    maxNumFaces: 1,
                    refineLandmarks: true,
                    minDetectionConfidence: 0.7,
                    minTrackingConfidence: 0.7,
                });

                faceMesh.onResults((results) => {
                    if (!results.multiFaceLandmarks || results.multiFaceLandmarks.length === 0) {
                        console.warn("Tidak ada wajah yang terdeteksi!");
                        return;
                    }

                    const keypoints = results.multiFaceLandmarks[0];
                    const leftEye = keypoints[33];
                    const rightEye = keypoints[263];

                    console.log("Left Eye:", leftEye, "Right Eye:", rightEye);

                    const leftEyeImg = new window.Image();
                    leftEyeImg.src = leftEyeImgSrc;
                    const rightEyeImg = new window.Image();
                    rightEyeImg.src = rightEyeImgSrc;

                    leftEyeImg.onload = () => {
                        drawEyeOverlay(ctx, leftEyeImg, leftEye, rightEye, img.width, img.height, scale);
                        setLeftEyeStatus(true)
                    };

                    rightEyeImg.onload = () => {
                        drawEyeOverlay(ctx, rightEyeImg, rightEye, leftEye, img.width, img.height, scale);
                        setRightEyeStatus(true)
                    };
                });

                await faceMesh.initialize();
                await faceMesh.send({ image: img });
            }
        }

        detectFace();
    }, [isClient, scale, imageSrc]);

    function applyGrayscale(ctx, width, height) {
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;
        for (let i = 0; i < data.length; i += 4) {
            const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
            data[i] = avg;
            data[i + 1] = avg;
            data[i + 2] = avg;
        }
        ctx.putImageData(imageData, 0, 0);
    }

    function drawEyeOverlay(ctx, overlayImg, eye, oppositeEye, imgWidth, imgHeight, scale) {
        const eyeX = eye.x * imgWidth;
        const eyeY = eye.y * imgHeight;
        const oppositeX = oppositeEye.x * imgWidth;
        const oppositeY = oppositeEye.y * imgHeight;

        const eyeDistance = Math.sqrt((eyeX - oppositeX) ** 2 + (eyeY - oppositeY) ** 2);
        const eyeWidth = eyeDistance * 0.8 * scale;
        const eyeHeight = eyeWidth * 1.8;
        const angle = Math.atan2(oppositeY - eyeY, oppositeX - eyeX);

        ctx.save();
        ctx.translate(eyeX, eyeY);
        ctx.rotate(angle);
        ctx.drawImage(overlayImg, -eyeWidth / 4.6, -eyeHeight / 2, eyeWidth, eyeHeight);
        ctx.restore();
    }

    const generateAI = async () => {
        setNumProses1(true)

        const canvas = canvasRef.current;
        const captureCanvas = captureCanvasRef.current;
        const captureCtx = captureCanvas.getContext("2d");

        captureCanvas.width = canvas.width;
        captureCanvas.height = canvas.height;
        captureCtx.drawImage(canvas, 0, 0);

        applyGrayscale(captureCtx, captureCanvas.width, captureCanvas.height);

        const base64Image = captureCanvas.toDataURL("image/png");
        setCapturedImage(base64Image);
        localStorage.setItem("capturedImage", base64Image);

        removeBG(base64Image)
    }

    const retake = () => {
        setEnabled(false)
        setCapturedAwal(false)
    }

    const toDataURL = url => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
    }))

    async function removeBG(imageData){
        try {
            const result = await fal.subscribe("fal-ai/bria/background/remove", {
                input: {
                    image_url: imageData
                },
                logs: true,
                onQueueUpdate: (update) => {
                    if (update.status === "IN_PROGRESS") {
                        update.logs.map((log) => log.message).forEach(console.log);
                    }
                },
            });

            setResult(result);
            URL_RESULT = result.image.url;
            console.log(URL_RESULT)
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("generateURLResult", URL_RESULT)
            }

            toDataURL(URL_RESULT)
            .then(dataUrl => {
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem("resulAIBase64", dataUrl)
                }
                setTimeout(() => {
                    router.push('/greenday/magnum1/result');
                }, 500);
            })
        } catch (error) {
            // setError(error);
        } finally {
            // setLoading(false);
            // setElapsedTime(Date.now() - start);
            // generateImageSwap()


            // router.push('/magnum-greenday/result');

        }
    }

    return (
        <main className="flex fixed h-full w-full overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20" onContextMenu={(e)=> e.preventDefault()}>
            <BgWaveCustom bg={'/greenday/m-bg.jpg'}></BgWaveCustom>
           
            <div className='relative w-[120px] lg:w-[46%] mx-auto mb-5 flex justify-center items-center z-10'>
                <NextImage src='/greenday/m-fotolo.png' width={345} height={64} alt='Zirolu' className='w-full' priority />
            </div>

            <div className={`relative w-full flex flex-col justify-center items-center mt-2 mb-3 lg:mt-8 lg:mb-10 z-20 ${numProses1 ? 'opacity-100 pointer-events-none' : ''}`}>
                <div className='relative lg:w-full'>
                    {!enabled && 
                    <div className='absolute top-0 left-0 right-0 bottom-0 w-[50%] mx-auto flex justify-center items-center pointer-events-none z-10'>
                        <NextImage src='/icon-capture.png' width={389} height={220} alt='Zirolu' className='w-full' priority />
                    </div>
                    }

                    {captured && 
                    <div className='absolute top-0 left-0 right-0 bottom-0 w-[100px] h-[100px] lg:w-[174px] lg:h-[174px] overflow-hidden m-auto flex justify-center items-center pointer-events-none z-10'>
                        <div className='w-full animate-countdown translate-y-[35%]'>
                            <NextImage src='/countdown.png' width={261} height={763} alt='Zirolu' className='w-full' priority />
                        </div>
                    </div>
                    }

                    {/* {!enabled && 
                    <div className='w-[55%] mx-auto absolute left-0 right-0 bottom-0 z-10'>
                        <NextImage src='/frame-pose.png' width={426} height={461} alt='Zirolu' className='w-full' priority />
                    </div>
                    } */}

                    <div className={`animate-scanning w-[90%] mx-auto absolute left-0 right-0 bottom-0 z-10 pointer-events-nones  ${numProses1 ? '' : 'opacity-0'}`}>
                        <NextImage src='/scan-line2.png' width={656} height={240} alt='Zirolu' className='w-full' priority />
                    </div>
                    

                    <video ref={videoRef} className={`w-[90%] videoRatio1 mx-auto border-2 border-[#ffffff] rounded-sm ${enabled ? 'absolute opacity-0':'relative'}`} autoPlay playsInline height={1000}></video>
                    {isClient && <canvas ref={canvasRef} width="1000" height="1000" className={`${enabled ? 'relative':'absolute opacity-0'} w-[90%] top-0 left-0 right-0 mx-auto pointer-events-nones border-2 border-[#ffffff] rounded-sm`}></canvas>}

                    <canvas ref={captureCanvasRef} className="hidden" />

                    {isClient && imageSrc && <img ref={imgRef} src={imageSrc} alt="Face" className="hidden" />}
                    {/* {isClient && <canvas ref={canvasRef} className="w-full border" />} */}
                </div>
            </div>


            {/* {!enabled && 
                <p className='flex justify-center items-center text-center text-base lg:text-5xl mt-1 mb-3 lg:mt-4 text-white bg-white/30 p-7 rounded-full z-20'>
                    <NextImage src='/primaria/icon-info.png' width={40} height={40} alt='Zirolu' className='w-[40px] mr-5' priority />
                    *Foto hanya sendiri
                </p> 
            } */}
            {!enabled && 
                <div className={`relative w-full flex justify-center items-center mt-2 lg:mt-10 ${capturedAwal ? 'opacity-0 pointer-events-none' : ''}`}>
                    <button className="relative mx-auto flex  w-[90%] justify-center items-center" onClick={captureImage}>
                        <NextImage src='/greenday/m-btn-capture.png' width={764} height={144} alt='Zirolu' className='w-full' priority />
                    </button>
                </div>
            }


            <div className={`absolute hidden lg:flex pointer-events-none top-[3rem] left-0 right-0 mx-auto w-[35%] ${numProses1 ? 'opacity-0' : ''}`}>
                <div className={`relative w-full`}>
                    <NextImage src='/primaria/lihat.png' width={294} height={160} alt='Zirolu' className='relative block w-full'></NextImage>
                </div>
            </div>

            {numProses1 && 
            <div className={`relative w-full lg:w-[90%]`}>
                <div className='animate-upDownCepet relative flex justify-center items-center py-2 lg:py-6 px-2 mt-2 lg:mt-5 text-base lg:text-4xl border-2 text-center bg-[#EF000F] rounded-xl text-[#fff] font-bold bg-white/30 p-7 rounded-full'>
                    <NextImage src='/primaria/icon-info.png' width={40} height={40} alt='Zirolu' className='w-[20px] lg:w-[40px] mr-1 lg:mr-5' priority />
                    <p>{`Sedang meng-capture moment lo!`}</p>
                    {/* <p>&nbsp; {progressPersen}</p> */}
                    {/* <p>{progressText} {progressPersen}</p> */}
                        {/* <p>{`AI Proses : ${(elapsedTime / 1000).toFixed(2)} detik (${numProses}/2)`}</p> */}
                    {/* {error} */}
                </div>
            </div>
            }



            {enabled && !leftEyeStatus && !rightEyeStatus && 
            <div className={`relative w-full lg:w-[90%]`}>
                <div className='animate-upDownCepet relative flex justify-center items-center py-2 lg:py-6 px-2 mt-2 lg:mt-5 text-base lg:text-4xl border-2 text-center bg-[#EF000F] rounded-xl text-[#fff] font-bold bg-white/30 p-7 rounded-full'>
                <p>{`Mohon tunggu...`}</p>
                </div>
            </div>
            }

            <div className={`relative w-full ${leftEyeStatus && rightEyeStatus  ? '' : 'hidden opacity-0 pointer-events-none'}`}>
            <div className={`relative w-full ${numProses1 ? 'hidden opacity-0 pointer-events-none' : ''}`}>
            <div className={`relative w-full ${!enabled ? 'hidden' : ''}`}>
                <div className="relative w-[90%] mx-auto flex justify-center items-center flex-col mt-0">
                    <button className="w-full relative mx-auto flex justify-center items-center" onClick={generateAI}>
                        <NextImage src='/greenday/m-lihat.png' width={764} height={144} alt='Zirolu' className='w-full' priority />
                    </button>
                    <button className="relative w-full mx-auto flex justify-center items-center mt-2 lg:mt-8" onClick={retake}>
                        <NextImage src='/greenday/m-retake.png' width={764} height={144} alt='Zirolu' className='w-full' priority />
                    </button>
                </div>
            </div></div></div>
        </main>
    );
}
