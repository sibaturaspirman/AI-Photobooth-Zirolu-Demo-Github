'use client';

import Link from 'next/link';
import Image from "next/image";
import { useEffect, useState, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCards } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-cards';

import { Mouse_Memoirs } from "next/font/google";
const MouseMemoirs = Mouse_Memoirs({ subsets: ["latin"], weight: ['400'] });

// const useWebcam = ({
//     videoRef
//   }) => {
//     // useEffect(() => {
//       if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//         navigator.mediaDevices.getUserMedia({ video: true}).then((stream) => {
//             window.localStream = stream
//             if (videoRef.current !== null) {
//                 videoRef.current.srcObject = stream;
//                 videoRef.current.play();
//             }
//         });
//       }
//     // }, [videoRef]);
// };

export default function Register() {
    const router = useRouter();
    const [Name, setName] = useState();
    const [slideIndex, setSlideIndex] = useState(0);

    const [enabled, setEnabled] = useState(false);
    const [captured, setCaptured] = useState(false);
    const [capturedAwal, setCapturedAwal] = useState(false);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [facingMode, setFacingMode] = useState("user");
    const videoRef = useRef(null);
    const previewRef = useRef(null);

    useEffect(() => {
        // Perform localStorage action
        if (typeof localStorage !== 'undefined') {
            const item = localStorage.getItem('dsName')
            setName(item)
        }
    }, [Name])

    const generateAura = async () => {
        localStorage.setItem('dsName', Name)
        localStorage.setItem('dsPhone', Phone)
        setTimeout(() => {
            router.push('/digitalstamp/changi/stamp');
        }, 100);
    }

    const startCamera = async () => {
        try {
        // Meminta akses kamera
        const stream = await navigator.mediaDevices.getUserMedia({ video: {
            facingMode: facingMode
        }});
        videoRef.current.srcObject = stream; // Hubungkan stream ke elemen video
        videoRef.current.play(); // Mulai pemutaran video
        setIsCameraOn(true); // Update status kamera
        } catch (error) {
        console.error("Gagal mengakses kamera:", error);
        alert("Tidak dapat mengakses kamera. Pastikan izin telah diberikan.");
        }
    };

    const stopCamera = () => {
        const stream = videoRef.current.srcObject;
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach((track) => track.stop()); // Hentikan setiap track
        }
        videoRef.current.srcObject = null; // Lepaskan stream dari video
    };

    const toggleCamera = () => {
        setFacingMode((prevMode) => (prevMode === "user" ? "environment" : "user"));
        if (isCameraOn) {
          stopCamera();
          setTimeout(() => startCamera(), 500); // Restart kamera dengan facingMode baru
        }
    };

    const captureVideo  = ({
        width = 512,
        height = 512,
    }) => {
        setCaptured(true)
        setCapturedAwal(true)
        setTimeout(() => {
            setEnabled(true)
            setCaptured(null)
            const canvas = previewRef.current;
            const video = videoRef.current;
            video.play;
            if (canvas === null || video === null) {
                return;
            }
        
            // Calculate the aspect ratio and crop dimensions
            const aspectRatio = video.videoWidth / video.videoHeight;
            let sourceX, sourceY, sourceWidth, sourceHeight;
        
            if (aspectRatio > 1) {
                // If width is greater than height
                sourceWidth = video.videoHeight;
                sourceHeight = video.videoHeight;
                sourceX = (video.videoWidth - video.videoHeight) / 2;
                sourceY = 0;
            } else {
                // If height is greater than or equal to width
                sourceWidth = video.videoWidth;
                sourceHeight = video.videoWidth;
                sourceX = 0;
                sourceY = (video.videoHeight - video.videoWidth) / 2;
            }
        
            // Resize the canvas to the target dimensions
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
        
            const context = canvas.getContext('2d');
            if (context === null) {
                return;
            }
        
            // Draw the image on the canvas (cropped and resized)
            context.save();
            // context.scale(-1, 1)
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            // context.drawImage(
            //     video,
            //     sourceX,
            //     sourceY,
            //     sourceWidth,
            //     sourceHeight,
            //     0,
            //     0,
            //     width,
            //     height
            // );
            context.restore();
    
            let faceImage = canvas.toDataURL();
            // setImageFile(faceImage)
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("faceImage", faceImage)
            }
            // setTimeout(() => {
            //     router.push('/generate');
            // }, 1250);
            stopCamera()
        }, 3000);
    }


    const [touches, setTouches] = useState([]);
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const handleTouchStart = (e) => {
        e.preventDefault();
        const newTouches = Array.from(e.touches).map((t) => ({
            id: t.identifier,
            x: t.pageX,
            y: t.pageY,
        }));
        setTouches(newTouches);
        drawTouches(ctx, newTouches);
        };

        const handleTouchMove = (e) => {
        e.preventDefault();
        const updatedTouches = Array.from(e.touches).map((t) => ({
            id: t.identifier,
            x: t.pageX,
            y: t.pageY,
        }));
        setTouches(updatedTouches);
        drawTouches(ctx, updatedTouches);
        };

        const handleTouchEnd = (e) => {
        e.preventDefault();
        setTouches([]);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        };

        const drawTouches = (ctx, touchPoints) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "blue";
        touchPoints.forEach((t) => {
            ctx.beginPath();
            ctx.arc(t.x, t.y, 20, 0, Math.PI * 2);
            ctx.fill();
        });
        };

        canvas.addEventListener("touchstart", handleTouchStart);
        canvas.addEventListener("touchmove", handleTouchMove);
        canvas.addEventListener("touchend", handleTouchEnd);

        return () => {
        canvas.removeEventListener("touchstart", handleTouchStart);
        canvas.removeEventListener("touchmove", handleTouchMove);
        canvas.removeEventListener("touchend", handleTouchEnd);
        };
    }, []);

    return (
        <main className="flex fixed h-full w-full overflow-hidden flex-col items-center pt-2 pb-5 px-5 lg:pt-12" onContextMenu={(e)=> e.preventDefault()}>
            <div className={`fixed top-0 left-0 w-full h-full ${capturedAwal ? 'z-50 pointer-events-nonex' : 'pointer-events-none'}`}>

                <canvas ref={canvasRef} style={{ touchAction: "none" }} className={`relative'`}/>
            </div>

            <div className={`fixed top-0 left-0 w-full h-full bg-digstamp-blue pointer-events-none z-10 transition-all ${slideIndex == 0 ? `` : 'opacity-0'}`}></div>
            <div className={`fixed top-0 left-0 w-full h-full bg-digstamp-red pointer-events-none z-10 transition-all ${slideIndex == 1 ? `` : 'opacity-0'}`}></div>
            <div className={`fixed top-0 left-0 w-full h-full bg-digstamp-blue2 pointer-events-none z-10 transition-all ${slideIndex == 2 ? `` : 'opacity-0'}`}></div>
            <div className={`fixed top-0 left-0 w-full h-full bg-digstamp-green pointer-events-none z-10 transition-all ${slideIndex == 3 ? `` : 'opacity-0'}`}></div>

            {/* PILIH STYLE */}
            <div className={`relative w-[95%] mx-auto mt-10 z-20`}>
                <p className={`text-base text-[#F0E6CC] uppercase ${MouseMemoirs.className}`}>Hi, {Name}!</p>
                <p className={`text-4xl uppercase ${MouseMemoirs.className}`}>Let&apos;s Explore <br></br> Changi Airport Together!</p>
                <div className='relative w-full mt-0 p-5'>
                    {captured && 
                    <div className='absolute -top-[7.5rem] left-0 right-0 bottom-0 w-[100px] h-[100px] overflow-hidden m-auto flex justify-center items-center pointer-events-none z-10'>
                        <div className='w-full animate-countdown translate-y-[35%]'>
                            <Image src='/countdown.png' width={174} height={522} alt='Zirolu' className='w-full' priority />
                        </div>
                    </div>
                    }
                    <Swiper
                        effect={'cards'}
                        grabCursor={true}
                        modules={[EffectCards]}
                        spaceBetween={0}
                        slidesPerView={1}
                        onSlideChange={(swiper) => {
                            setSlideIndex(swiper.activeIndex)
                        } }
                        onSwiper={(swiper) => console.log(swiper)}
                        >
                        <SwiperSlide className='shadow-xl'>
                            <div className='photocard bg-white'>
                                <div className='inner p-5'>
                                    <div className='photocard-take border-dashed border-[#A5B3CC] border-2 bg-[#F1F4F9]'>
                                        <div className='inner flex justify-center items-center'>
                                            <div className={`${isCameraOn ? 'opacity-0 pointer-events-none':''} relative w-[50%]`} onClick={startCamera}>
                                                <div className="animate-rotateKiriKanan relative mx-auto w-[70%] flex justify-center items-center mb-3">
                                                    <Image src='/digitalstamp/hand.png' width={96} height={96}  alt='Zirolu' className='animate-bgScale2 w-full' priority />
                                                </div>
                                                <div className="relative mx-auto w-full flex justify-center items-center">
                                                    <Image src='/digitalstamp/take-selfie.png' width={133} height={84}  alt='Zirolu' className='w-full' priority />
                                                </div>
                                            </div>

                                            <div className={`${isCameraOn ? '':'opacity-0'} absolute w-full left-0 top-0 h-full overflow-hidden pointer-events-none flex justify-center items-center z-10`}>
                                                <video ref={videoRef} className={`w-full mx-auto my-auto  ${enabled ? 'absolute opacity-0':'relative'} `} playsInline></video>
                                                <canvas ref={previewRef} width="512" height="512" className={`${enabled ? 'relative':'absolute opacity-0'} w-full top-0 left-0 right-0 mx-auto my-auto pointer-events-none`}></canvas>
                                            </div>

                                            <div className={`${isCameraOn ? '':'opacity-0 pointer-events-none'} ${capturedAwal ? 'opacity-0 pointer-events-none' : ''} absolute left-0 top-0 w-[50px] overflow-hidden z-20`}>
                                                <button className="relative mx-auto w-full flex justify-center items-center" onClick={toggleCamera}>
                                                    <Image src='/digitalstamp/icon-flip.png' width={89} height={40} alt='Zirolu' className='w-full' priority />
                                                </button>
                                            </div>

                                            <div className={`${isCameraOn ? '':'opacity-0'} ${capturedAwal ? 'opacity-0 pointer-events-none' : ''} absolute left-0 right-0 bottom-4 w-full overflow-hidden z-20`}>
                                                <button className="relative mx-auto w-[30%] flex justify-center items-center" onClick={captureVideo}>
                                                    <Image src='/digitalstamp/btn-capture.png' width={89} height={40} alt='Zirolu' className='w-full' priority />
                                                </button>
                                            </div>

                                        </div>
                                    </div>
                                    <div></div>
                                    <p className={`text-xl mt-2 text-[#2B3B4F] text-center ${MouseMemoirs.className}`}>Jewel Rain Vortex</p>
                                    <div className='absolute right-2 bottom-14 w-[80px] z-10 shadow-xl hidden'>
                                        <Image src='/digitalstamp/stamp.png' width={88} height={88}  alt='Zirolu' className='w-full' priority />
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className='shadow-xl'>
                            <div className='photocard bg-white'>
                                <div className='inner p-5'>
                                    <div className='photocard-take border-dashed border-[#A5B3CC] border-2 bg-[#F1F4F9]'>
                                        <div className='inner flex justify-center items-center'>
                                            <div className='relative w-[50%]'>
                                                <div className="animate-rotateKiriKanan relative mx-auto w-[70%] flex justify-center items-center mb-3">
                                                    <Image src='/digitalstamp/hand.png' width={96} height={96}  alt='Zirolu' className='animate-bgScale2 w-full' priority />
                                                </div>
                                                <div className="relative mx-auto w-full flex justify-center items-center">
                                                    <Image src='/digitalstamp/take-selfie.png' width={133} height={84}  alt='Zirolu' className='w-full' priority />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className={`text-xl mt-2 text-[#2B3B4F] text-center ${MouseMemoirs.className}`}>Jewel Rain Vortex</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className='shadow-xl'>
                            <div className='photocard bg-white'>
                                <div className='inner p-5'>
                                    <div className='photocard-take border-dashed border-[#A5B3CC] border-2 bg-[#F1F4F9]'>
                                        <div className='inner flex justify-center items-center'>
                                            <div className='relative w-[50%]'>
                                                <div className="animate-rotateKiriKanan relative mx-auto w-[70%] flex justify-center items-center mb-3">
                                                    <Image src='/digitalstamp/hand.png' width={96} height={96}  alt='Zirolu' className='animate-bgScale2 w-full' priority />
                                                </div>
                                                <div className="relative mx-auto w-full flex justify-center items-center">
                                                    <Image src='/digitalstamp/take-selfie.png' width={133} height={84}  alt='Zirolu' className='w-full' priority />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className={`text-xl mt-2 text-[#2B3B4F] text-center ${MouseMemoirs.className}`}>Jewel Rain Vortex</p>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide className='shadow-xl'>
                            <div className='photocard bg-white'>
                                <div className='inner p-5'>
                                    <div className='photocard-take border-dashed border-[#A5B3CC] border-2 bg-[#F1F4F9]'>
                                        <div className='inner flex justify-center items-center'>
                                            <div className='relative w-[50%]'>
                                                <div className="animate-rotateKiriKanan relative mx-auto w-[70%] flex justify-center items-center mb-3">
                                                    <Image src='/digitalstamp/hand.png' width={96} height={96}  alt='Zirolu' className='animate-bgScale2 w-full' priority />
                                                </div>
                                                <div className="relative mx-auto w-full flex justify-center items-center">
                                                    <Image src='/digitalstamp/take-selfie.png' width={133} height={84}  alt='Zirolu' className='w-full' priority />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <p className={`text-xl mt-2 text-[#2B3B4F] text-center ${MouseMemoirs.className}`}>Jewel Rain Vortex</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>
                    <p className={`text-center text-xl text-[#2B3B4F] mt-5 ${MouseMemoirs.className}`}>{slideIndex + 1} / 4</p>
                </div>

            </div>
        </main>
    );
}
