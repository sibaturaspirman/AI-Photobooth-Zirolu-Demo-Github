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
    const [isCameraOn, setIsCameraOn] = useState(false); // Status kamera
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
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoRef.current.srcObject = stream; // Hubungkan stream ke elemen video
        videoRef.current.play(); // Mulai pemutaran video
        setIsCameraOn(true); // Update status kamera
        } catch (error) {
        console.error("Gagal mengakses kamera:", error);
        alert("Tidak dapat mengakses kamera. Pastikan izin telah diberikan.");
        }
    };



    const captureVideo  = ({
        width = 512,
        height = 616,
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
            canvas.width = width;
            canvas.height = height;
        
            const context = canvas.getContext('2d');
            if (context === null) {
                return;
            }
        
            // Draw the image on the canvas (cropped and resized)
            context.drawImage(
                video,
                sourceX,
                sourceY,
                sourceWidth,
                sourceHeight,
                0,
                0,
                width,
                height
            );
    
            let faceImage = canvas.toDataURL();
            // setImageFile(faceImage)
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("faceImage", faceImage)
            }
            // setTimeout(() => {
            //     router.push('/generate');
            // }, 1250);
        }, 3000);
    }

    return (
        <main className="flex fixed h-full w-full overflow-hidden flex-col items-center pt-2 pb-5 px-5 lg:pt-12" onContextMenu={(e)=> e.preventDefault()}>

            <div className={`fixed top-0 left-0 w-full h-full bg-digstamp-blue pointer-events-none z-10 transition-all ${slideIndex == 0 ? `` : 'opacity-0'}`}></div>
            <div className={`fixed top-0 left-0 w-full h-full bg-digstamp-red pointer-events-none z-10 transition-all ${slideIndex == 1 ? `` : 'opacity-0'}`}></div>
            <div className={`fixed top-0 left-0 w-full h-full bg-digstamp-blue2 pointer-events-none z-10 transition-all ${slideIndex == 2 ? `` : 'opacity-0'}`}></div>
            <div className={`fixed top-0 left-0 w-full h-full bg-digstamp-green pointer-events-none z-10 transition-all ${slideIndex == 3 ? `` : 'opacity-0'}`}></div>

            {/* PILIH STYLE */}
            <div className={`relative w-[95%] mx-auto mt-10 z-20`}>
                <p className={`text-base text-[#F0E6CC] uppercase ${MouseMemoirs.className}`}>Hi, {Name}!</p>
                <p className={`text-4xl uppercase ${MouseMemoirs.className}`}>Let&apos;s Explore <br></br> Changi Airport Together!</p>
                <div className='relative w-full mt-0 p-5'>
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
                        <SwiperSlide className='pt-0'>
                            <div className='photocard bg-white'>
                                <div className='inner p-5'>
                                    <div className='photocard-take border-dashed border-[#A5B3CC] border-2 bg-[#F1F4F9]'>
                                        <div className='inner flex justify-center items-center'>
                                            <div className='relative w-[50%]' onClick={startCamera}>
                                                <div className="animate-rotateKiriKanan relative mx-auto w-[70%] flex justify-center items-center mb-3">
                                                    <Image src='/digitalstamp/hand.png' width={96} height={96}  alt='Zirolu' className='animate-bgScale2 w-full' priority />
                                                </div>
                                                <div className="relative mx-auto w-full flex justify-center items-center">
                                                    <Image src='/digitalstamp/take-selfie.png' width={133} height={84}  alt='Zirolu' className='w-full' priority />
                                                </div>
                                            </div>

                                            <div className='absolute w-full left-0 top-0 h-full overflow-hidden pointer-events-none flex justify-center items-center z-10'>
                                                <video ref={videoRef} className={`w-full mx-auto ${enabled ? 'absolute opacity-0':'relative'}`} playsInline></video>
                                                <canvas ref={previewRef} width="512" height="616" className={`${enabled ? 'relative':'absolute opacity-0'} w-full top-0 left-0 right-0 mx-auto pointer-events-none`}></canvas>
                                            </div>

                                            <div className={`${isCameraOn ? '':'opacity-0'} absolute left-0 right-0 bottom-4 w-full overflow-hidden z-20`}>
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
                        <SwiperSlide>
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
                        <SwiperSlide>
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
                        <SwiperSlide>
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
