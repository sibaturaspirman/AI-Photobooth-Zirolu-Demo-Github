'use client';

import Link from 'next/link';
import Image from "next/image";
import { useEffect, useState, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { Open_Sans } from "next/font/google";
const OpenSans = Open_Sans({ subsets: ["latin"], weight: ['400', '500'] });

let activeStampIndex = 0
let lokasi = [
    {
        name : 'Jewel Changi Airport',
        stamp : false,
        foto : ''
    },
    {
        name : 'Garden By The Bay',
        stamp : false,
        foto : ''
    },
    {
        name : 'Singapore Flyer Raffles',
        stamp : false,
        foto : ''
    },
    {
        name : 'Merlion Singapore',
        stamp : false,
        foto : ''
    },
    {
        name : 'Merlion Singapore',
        stamp : false,
        foto : ''
    },
]

export default function Register() {
    const router = useRouter();
    const [Name, setName] = useState();
    const [slideIndex, setSlideIndex] = useState(0);

    const [enabled, setEnabled] = useState(false);
    const [captured, setCaptured] = useState(false);
    const [capturedAwal, setCapturedAwal] = useState(false);
    const [isCameraOn, setIsCameraOn] = useState(false);
    const [facingMode, setFacingMode] = useState("user");
    const [statusStamp, setStatusStamp] = useState(false);
    const [startStamp, setStartStamp] = useState(false);
    // const videoRef = useRef(null);
    const previewRef = useRef(null);

    const [hasilFoto0, setHasilFoto0] = useState();
    const [hasilFoto1, setHasilFoto1] = useState();
    const [hasilFoto2, setHasilFoto2] = useState();
    const [hasilFoto3, setHasilFoto3] = useState();
    const [hasilFoto0Stamp, setHasilFoto0Stamp] = useState();
    const [hasilFoto1Stamp, setHasilFoto1Stamp] = useState();
    const [hasilFoto2Stamp, setHasilFoto2Stamp] = useState();
    const [hasilFoto3Stamp, setHasilFoto3Stamp] = useState();


    const videoRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)]; // Referensi untuk 4 elemen video
    const canvasRefs = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const [activeVideoIndex, setActiveVideoIndex] = useState(0); // Indeks video aktif
    const [stream, setStream] = useState(null);

    useEffect(() => {
        // Perform localStorage action
        if (typeof localStorage !== 'undefined') {
            const item = localStorage.getItem('dsName')
            const itemFace0 = localStorage.getItem('faceImage0')
            const itemFace1 = localStorage.getItem('faceImage1')
            const itemFace2 = localStorage.getItem('faceImage2')
            const itemFace3 = localStorage.getItem('faceImage3')
            const itemFace0Stamp = localStorage.getItem('faceImageStamp0')
            const itemFace1Stamp = localStorage.getItem('faceImageStamp1')
            const itemFace2Stamp = localStorage.getItem('faceImageStamp2')
            const itemFace3Stamp = localStorage.getItem('faceImageStamp3')

            // console.log(itemFace3)

            if(itemFace0Stamp != null) lokasi[0].stamp = true
            if(itemFace1Stamp != null) lokasi[1].stamp = true
            if(itemFace2Stamp != null) lokasi[2].stamp = true
            if(itemFace3Stamp != null) lokasi[3].stamp = true

            lokasi[0].foto = itemFace0
            lokasi[1].foto = itemFace1
            lokasi[2].foto = itemFace2
            lokasi[3].foto = itemFace3

            setHasilFoto0(itemFace0)
            setHasilFoto1(itemFace1)
            setHasilFoto2(itemFace2)
            setHasilFoto3(itemFace3)

            setHasilFoto0Stamp(itemFace0Stamp)
            setHasilFoto1Stamp(itemFace1Stamp)
            setHasilFoto2Stamp(itemFace2Stamp)
            setHasilFoto3Stamp(itemFace3Stamp)

            console.log(lokasi)

            setName(item)
        }
    }, [Name, hasilFoto0, hasilFoto1, hasilFoto2, hasilFoto3, hasilFoto0Stamp, hasilFoto1Stamp, hasilFoto2Stamp, hasilFoto3Stamp])

    // 1 Kamera 4 Video
    const startCamera = async () => {
        try {
          const mediaStream = await navigator.mediaDevices.getUserMedia({
            video: {facingMode: facingMode},
            audio: false,
          });
          setStream(mediaStream);
          setIsCameraOn(true);

          setTimeout(() => {
            setEnabled(false)
          }, 1500);

          videoRefs[activeVideoIndex].current.srcObject = mediaStream;
          videoRefs[activeVideoIndex].current.play();
        } catch (error) {
          console.error("Gagal membuka kamera:", error);
          alert("Tidak dapat membuka kamera. Pastikan izin telah diberikan.");
        }
    };

    const captureImage = (index) => {
        setCaptured(true)
        setCapturedAwal(true)
        setTimeout(() => {
            setEnabled(true)
            setCaptured(null)

            const videoElement = videoRefs[index].current;
            const canvasElement = canvasRefs[index].current;
        
            if (videoElement && canvasElement) {
                const ctx = canvasElement.getContext("2d");
                canvasElement.width = videoElement.videoWidth;
                canvasElement.height = videoElement.videoHeight;
                ctx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

                let faceImage = canvasElement.toDataURL();
                lokasi[activeStampIndex].foto = faceImage
                if(activeStampIndex == 0) setHasilFoto0(faceImage)
                else if(activeStampIndex == 1) setHasilFoto1(faceImage)
                else if(activeStampIndex == 2) setHasilFoto2(faceImage)
                else if(activeStampIndex == 3) setHasilFoto3(faceImage)
                // setImageFile(faceImage)
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem("faceImage"+activeStampIndex, faceImage)
                }
            }

            stopCamera()

        }, 3000);
    };
    
      // Menghentikan kamera
      const stopCamera = () => {
        if (stream) {
          const tracks = stream.getTracks();
          tracks.forEach((track) => track.stop());
        }
        videoRefs.forEach((videoRef) => {
          if (videoRef.current) {
            videoRef.current.srcObject = null;
          }
        });
        setIsCameraOn(false);
        setStream(null);
        // setEnabled(false)
        // setCaptured(false)
        // setCapturedAwal(false)
      };
    
      // Beralih ke video berikutnya
      const switchVideo = () => {
        if (!isCameraOn || !stream) return;
    
        // Hentikan video saat ini
        videoRefs[activeVideoIndex].current.pause();
        videoRefs[activeVideoIndex].current.srcObject = null;
    
        // Perbarui indeks video aktif
        const nextIndex = (activeVideoIndex + 1) % videoRefs.length;
        setActiveVideoIndex(nextIndex);
        activeStampIndex = nextIndex
    
        // Tampilkan stream di video berikutnya
        videoRefs[nextIndex].current.srcObject = stream;
        videoRefs[nextIndex].current.play();
    };


    const toggleCamera = () => {
        setFacingMode((prevMode) => (prevMode === "user" ? "environment" : "user"));
        if (isCameraOn) {
          stopCamera();
          setTimeout(() => startCamera(), 500); // Restart kamera dengan facingMode baru
        }
    };
    //==================

    let sentuhan = {};
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
            sentuhan = newTouches
            setTouches(newTouches);
            setStartStamp(true)
            drawTouches(ctx, newTouches);

            // console.log(touches.length)
            // alert(sentuhan.length)

            // alert(activeStampIndex)
            // if(sentuhan.length == 4){
            //     lokasi[activeStampIndex].stamp = true
            // }
            // setStatusStamp(true)
            // lokasi[activeStampIndex].stamp = true

            // DEBUG STAMP
            // setStatusStamp(true)
            // lokasi[activeStampIndex].stamp = true
            
            // if(activeStampIndex == 0) setHasilFoto0Stamp('true')
            // else if(activeStampIndex == 1) setHasilFoto1Stamp('true')
            // else if(activeStampIndex == 2) setHasilFoto2Stamp('true')
            // else if(activeStampIndex == 3) setHasilFoto3Stamp('true')

            // if (typeof localStorage !== 'undefined') {
            //     localStorage.setItem("faceImageStamp"+activeStampIndex, true)
            // }
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
            if(lokasi[activeStampIndex].stamp){
                setCapturedAwal(false)
            }

            // console.log(sentuhan)
            if (Object.keys(sentuhan).length === 4) {
                const points = Object.values(sentuhan);
                // console.log(points)
                // console.log(checkSquarePattern(points))
                if (checkSquarePattern(points)) {
                    // alert("4 Fingers detected: Square Pattern!");
                    // console.log("4 fingers")
                    setStatusStamp(true)
                    lokasi[activeStampIndex].stamp = true
                    
                    if(activeStampIndex == 0) setHasilFoto0Stamp('true')
                    else if(activeStampIndex == 1) setHasilFoto1Stamp('true')
                    else if(activeStampIndex == 2) setHasilFoto2Stamp('true')
                    else if(activeStampIndex == 3) setHasilFoto3Stamp('true')

                    if (typeof localStorage !== 'undefined') {
                        localStorage.setItem("faceImageStamp"+activeStampIndex, true)
                    }

                    setTimeout(() => {
                        setStatusStamp(false)
                        setStartStamp(false)

                        sentuhan = {}
                        setTouches([]);
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                    }, 1500);
                }
            }
            

            // setTouches([]);
            // ctx.clearRect(0, 0, canvas.width, canvas.height);
        };

        const checkSquarePattern = (points) => {
            if (points.length !== 4) return false;
            // console.log(points)
    
            // Sort points by x and y positions
            points.sort((a, b) => a.x - b.x || a.y - b.y);
            // const [topLeft, topRight, bottomLeft, bottomRight] = points;
            const [topLeft, bottomLeft, topRight, bottomRight] = points;
            // console.log(points)
    
            // Calculate distances between adjacent points
            // const topEdge = getDistance(topLeft, topRight);
            // const bottomEdge = getDistance(bottomLeft, bottomRight);
            // const leftEdge = getDistance(topLeft, bottomLeft);
            // const rightEdge = getDistance(topRight, bottomRight);
    
            // Check if edges form a square
            const threshold = 20;
            const thresholdRightXMax = 45;
            const thresholdRightXMin = 25;
            const isBottomAligned = Math.abs(bottomLeft.y - bottomRight.y) < threshold;
            const isLeftAligned = Math.abs(bottomLeft.x - topLeft.x) < threshold;
            const isRightAligned = Math.abs(bottomRight.x - topRight.x) < thresholdRightXMax && Math.abs(bottomRight.x - topRight.x) >= thresholdRightXMin;
            const isTopXAligned = Math.abs(topLeft.x - topRight.x) >= 85 && Math.abs(topLeft.x - topRight.x) <= 95;
            const isTopYAligned = Math.abs(topLeft.y - topRight.y) >= 40 && Math.abs(topLeft.y - topRight.y) <= 50;

            // console.log("TL X : "+topLeft.x)
            // console.log("TR X : "+topRight.x)
            // console.log("BL X : "+bottomLeft.x)
            // console.log("BR X : "+bottomRight.x)
            // console.log(Math.abs(bottomLeft.x - topLeft.x))
            // console.log(Math.abs(bottomRight.x - topRight.x))
            // console.log(Math.abs(topLeft.y - topRight.y))
            // console.log(isBottomAligned)
            // console.log(isLeftAligned)
            // console.log(isRightAligned)
            // console.log(isTopXAligned)
            // console.log(isTopYAligned)

            return isBottomAligned && isLeftAligned && isRightAligned && isTopXAligned && isTopYAligned;
        };
        const getDistance = (p1, p2) => {
            return Math.sqrt(
            Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2)
            );
        };

        const drawTouches = (ctx, touchPoints) => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "blue";
        touchPoints.forEach((t) => {
            ctx.beginPath();
            ctx.arc(t.x, t.y, 20, 0, Math.PI * 2);
            ctx.fill();
            ctx.font = "10px Arial";
            ctx.fillText("X : "+t.x+' | Y : '+t.y,t.x -30,t.y+30);
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
        <main className="flex fixed h-full w-full  bg-[#F4F4F4] overflow-hidden flex-col items-center pt-2 pb-5 px-5 lg:pt-12" onContextMenu={(e)=> e.preventDefault()}>
            <div className={`fixed top-0 left-0 w-full h-full ${capturedAwal ? 'z-50 pointer-events-nonex' : 'z-50 pointer-events-nonex'}`}>
                <canvas ref={canvasRef} style={{ touchAction: "none" }} className={`relative'`}/>
            </div>


            <div className={`fixed bottom-0 left-0 w-full z-50 border-[1px] border-[#C1C1C1]`}>
                <Image src='/digitalstamp/samsung-menu.png' width={375} height={63} alt='Zirolu' className='w-full' priority />
            </div>

            {/* PILIH STYLE */}
            <div className={`relative w-[95%] mx-auto mt-1 z-20`}>
                <div className='w-[50%] mx-auto'>
                    <Image src='/digitalstamp/samsung-logo2.png' width={175} height={41} alt='Zirolu' className='w-full' priority />
                </div>
                <p className={`text-sm font-medium mt-1 text-center text-[#000000] uppercase ${OpenSans.className}`}>Hi, {Name}!</p>
                <div className='relative w-full mt-0 p-5 pt-2'>
                    <Swiper
                        modules={[Pagination]}
                        pagination={{
                            clickable: true,
                        }}
                        className="mySwiper"
                        grabCursor={true}
                        spaceBetween={0}
                        onSlideChange={(swiper) => {
                            setSlideIndex(swiper.activeIndex)
                            setActiveVideoIndex(swiper.activeIndex)
                            activeStampIndex = swiper.activeIndex
                        }}
                        // onSwiper={(swiper) => console.log(swiper)}
                        >

                        {videoRefs.map((videoRef, index) => (
                        <SwiperSlide key={'slider-'+index} className=''>
                            <div className="relative mx-auto w-full flex justify-center items-center">
                                <Image src={`/digitalstamp/samsung-box-${index+1}.png`} width={317} height={422}  alt='Zirolu' className='w-full' priority />

                                <div className={`absolute right-4 bottom-10 w-[80px] z-50 shadow-xl ${lokasi[index].stamp ? 'hidden' : ''}`}>
                                    <Image src={'/digitalstamp/samsung-stamp-here.png'} width={88} height={88}  alt='Zirolu' className='w-full' priority />
                                </div>

                                <div className={`absolute right-4 bottom-10 w-[140px] z-50 ${lokasi[index].stamp ? '' : 'hidden'}`}>
                                    <Image src={'/digitalstamp//samsung-stamp-check.png'} width={88} height={88}  alt='Zirolu' className='w-full' priority />
                                </div>
                            </div>
                        </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* <p>{touches.length}</p> */}
                    {/* <p className={`text-center text-base font-medium text-[#2B3B4F] mt-2 ${OpenSans.className}`}>{slideIndex + 1} / 5</p> */}

                    {statusStamp && startStamp &&
                        <p className={`text-center text-base text-[#2B3B4F] mt-0 ${OpenSans.className}`}>Stamp Done!</p>
                    }
                    {!statusStamp && startStamp &&
                        <p className={`text-center text-base text-[#2B3B4F] mt-0 ${OpenSans.className}`}></p>
                    }
                </div>

            </div>
        </main>
    );
}
