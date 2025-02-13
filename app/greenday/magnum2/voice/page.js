'use client';

import { useEffect, useRef, useState } from "react";
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ReactPlayer from 'react-player'
import BgWaveCustom from "../../../components/BgWaveCustom";
let convertPersen = 0, sensitiveSuara = 180, udhBeres = false

import { Kanit} from "next/font/google";
const kanit = Kanit({ subsets: ["latin"], weight: ['400','700'] });

export default function Voice() {

    const router = useRouter();
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const dataArrayRef = useRef(null);
    const canvasRef = useRef(null);
    const [dB, setDB] = useState(0); // Set initial value to 0
    const [progressKetawa, setProgressKetawa] = useState(0); 

    const [playVideo, setPlayVideo] = useState(false);
    const [hideVideo, setHideVideo] = useState(false);
    const [screamStatus, setScreamStatus] = useState(false);

    const [maxDuration, setMaxDuration] = useState(8);
    const [countdownStart, setCountdownStart] = useState(false);
    const timerRef = useRef(null);

    const [maxDuration2, setMaxDuration2] = useState(23);
    const [countdownStart2, setCountdownStart2] = useState(false);
    const timerRef2 = useRef(null);

    const canvasCaptureRef = useRef(null);
    const imgRef = useRef(null);
    const videoRef = useRef(null);
    const captureCanvasRef = useRef(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [stream, setStream] = useState(null);

    const [showPreview, setShowPreview] = useState(false);

    const togglePreview = () => {
        setShowPreview(prevState => !prevState);
    };
    
    useEffect(() => {
        const initAudio = async () => {
        try {

            // if(!udhBeres){
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
            const audioContext = audioContextRef.current;
    
            const source = audioContext.createMediaStreamSource(stream);
            analyserRef.current = audioContext.createAnalyser();
            analyserRef.current.fftSize = 2048;
    
            const analyser = analyserRef.current;
            source.connect(analyser);
    
            dataArrayRef.current = new Uint8Array(analyser.frequencyBinCount);
    
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
    
            const drawWave = () => {
                analyser.getByteTimeDomainData(dataArrayRef.current);
    
                // Log to check if we are getting the audio data
                // console.log("Audio Data:", dataArrayRef.current);
    
                // Calculate RMS (Root Mean Square) and check its value
                let sum = 0;
                for (let i = 0; i < dataArrayRef.current.length; i++) {
                    const value = (dataArrayRef.current[i] - 128) / 128; // Normalize to [-1, 1]
                    sum += value * value;
                }
                const rms = Math.sqrt(sum / dataArrayRef.current.length);
    
                // Log RMS value
            //   console.log("RMS Value:", rms);
    
                // Adjust RMS if it's too low for reasonable dB calculation
                const MIN_RMS = 0.0001;  // Minimum RMS value before calculating dB
                const adjustedRMS = Math.max(rms, MIN_RMS); // Ensure RMS is never too low
    
                // Log adjusted RMS
                // console.log("Adjusted RMS:", adjustedRMS.toFixed(2) * 100);
    
                // Calculate dB value. If RMS is too low, set dB to 0.
            //   const dbValue = adjustedRMS > 0 ? 20 * Math.log10(adjustedRMS) : 100; // We can set a very low value for silence
            //   const finalDB = dbValue < 0 ? 0 : dbValue; // Ensure dB is not negative
            //   const finalDB = dbValue * -1;
                let finalDB = adjustedRMS.toFixed(2) * 3000;
    
                if(finalDB >= sensitiveSuara){
                convertPersen += (finalDB / 10000) * 100;
                // console.log(convertPersen)
                if(convertPersen <= 100){
                    setProgressKetawa(convertPersen.toFixed(0));
                }
                if(convertPersen.toFixed(0) >= 100 || convertPersen.toFixed(0) >= 99){
                    udhBeres = true
                    setProgressKetawa(100);
                }
    
                // if(udhBeres){
                //     setTimeout(() => {
                //         // router.push('/primaria/'+direct);
                //         location.href = '/primaria/'+direct
                //     }, 1500);
                // }
    
                // if(convertPersen >=)
                }

                if(finalDB <= 30){
                setDB(0);
                }else{
                setDB(finalDB);
                }
    
                // Clear canvas
                ctx.clearRect(0, 0, canvas.width, canvas.height);
    
                // Define colors for 4 different waveforms
                const waveColors = ['#ffffff', '#333333', '#666666', '#cccccc'];
    
                // Draw 4 different waveforms
                const sliceWidth = canvas.width / dataArrayRef.current.length;
                let x = 0;
    
                for (let lineIndex = 0; lineIndex < 4; lineIndex++) {
                    ctx.lineWidth = 4;
                    ctx.strokeStyle = waveColors[lineIndex];
                    ctx.beginPath();
        
                    for (let i = 0; i < dataArrayRef.current.length; i++) {
                        const v = (dataArrayRef.current[i] - 128) / 5;
                        const variation = Math.sin((i + lineIndex * 50) / 10); // Add variation for each line
                        const y = canvas.height / 2 + v * (canvas.height / 2) * (adjustedRMS * .2) * variation;
        
                        if (i === 0) {
                        ctx.moveTo(x, y);
                        } else {
                        ctx.lineTo(x, y);
                        }
                        x += sliceWidth;
                    }
        
                    ctx.stroke();
                    x = 0; // Reset x for the next line
                }
    
                // Continue animation
                requestAnimationFrame(drawWave);
            };
    
            drawWave();
            // }
        } catch (error) {
            console.error("Error accessing microphone:", error);
        }
        };

        initAudio();

        return () => {
        if (audioContextRef.current) {
            audioContextRef.current.close();
        }
        };
    }, []);


    useEffect(() => {
        handleStartCountdown()
        handleStartCountdown2()
        if(countdownStart){
            if(maxDuration == 0){
                setPlayVideo(true)
            }
        }
        if(countdownStart2){
            if(maxDuration2 == 3){
                setScreamStatus(true)
            }
            if(maxDuration2 == 0){
                setHideVideo(true)

                setTimeout(() => {
                    router.push('/greenday/magnum2/result');
                }, 1200);
            }
            if(maxDuration2 == 10){
                captureImage()
            }
        }
        return () => {
            clearInterval(timerRef.current)
            clearInterval(timerRef2.current)
        }; // Cleanup saat unmount
    }, [countdownStart, maxDuration, countdownStart2, maxDuration2])


    const handleStartCountdown = () => {
        // if (maxDuration <= 0) {
            setCountdownStart(true);
            timerRef.current = setInterval(() => {
                setMaxDuration((prevTime) => {
                  if (prevTime <= 1) {
                    clearInterval(timerRef.current);
                    return 0;
                  }
                  return prevTime - 1;
                });
            }, 1000);
        // }
    };

    const handleStartCountdown2 = () => {
        // if (maxDuration <= 0) {
            setCountdownStart2(true);
            timerRef2.current = setInterval(() => {
                setMaxDuration2((prevTime) => {
                  if (prevTime <= 1) {
                    clearInterval(timerRef.current);
                    return 0;
                  }
                  return prevTime - 1;
                });
            }, 1000);
        // }
    };



    useEffect(() => {
        async function startCamera() {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    video: {
                        width: { ideal: 720 },
                        height: { ideal: 1280 },
                        aspectRatio: 9 / 16
                    }
                });
    
                videoRef.current.srcObject = stream;
                setStream(stream);
            } catch (error) {
                console.error("Error accessing camera:", error);
            }
        }

        startCamera();

        return () => {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
            }
        };

    }, []);



    function captureImage() {
        console.log("CAPTURE")

        const video = videoRef.current;
        const canvas = captureCanvasRef.current;
        const ctx = canvas.getContext("2d");

        // Ukuran hasil capture (1000x1000 px)
        const targetWidth = 720;
        const targetHeight = 1280;

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
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem("faceImage", imageDataUrl)
        }

        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }

    }

    return (
       <div className="flex fixed h-full w-full overflow-hidden flex-col items-center justify-center" onClick={togglePreview}>
        <BgWaveCustom bg={'/greenday/m-bg.jpg'}></BgWaveCustom>
        <div className={`absolute top-0 left-0 w-full pointer-events-none z-10 transition ${playVideo ? '' : 'opacity-0'}  ${hideVideo ? 'opacity-0' : ''} `}>
            <ReactPlayer url={['/greenday/scream.mp4']}  playing={playVideo} playsinline width={1080} height={1920} className="!w-full !h-full" />
        </div>

        <div className={`absolute w-[80%] top-[7rem] lg:w-[80%] mx-auto z-20 flex justify-center items-center transition duration-150 ease-in-out ${maxDuration == 0 ? '' : 'opacity-0  pointer-events-none'}  ${hideVideo ? 'opacity-0' : ''}`}>
            <Image src='/greenday/m-berani.png' width={954} height={186} alt='Zirolu' className='w-full' priority />
        </div>

        <div className="relative w-full z-20 flex items-center justify-center">
            {/* <div className="absolute" */}
            <div className={`absolute w-[80%] lg:w-[80%] mx-auto flex justify-center items-center transition duration-150 ease-in-out ${maxDuration >= 4 ? '' : 'opacity-0  pointer-events-none'}`}>
                <Image src='/greenday/m-teriak.png' width={512} height={512} alt='Zirolu' className={`w-full`} priority />
            </div>

            <div className='relative w-[35%] mt-[-4rem] lg:w-[50%] mx-auto flex justify-center items-center  pointer-events-none'>
                <Image src='/greenday/m-c3.png' width={512} height={512} alt='Zirolu' className={`transition duration-150 ease-in-out w-full ${maxDuration == 3 ? '' : 'opacity-0'}`} priority />
                <Image src='/greenday/m-c2.png' width={512} height={512} alt='Zirolu' className={`transition duration-150 ease-in-out w-full absolute w-full ${maxDuration == 2  ? '' : 'opacity-0'}`} priority />
                <Image src='/greenday/m-c1.png' width={512} height={512} alt='Zirolu' className={`transition duration-150 ease-in-out w-full absolute w-full ${maxDuration == 1  ? '' : 'opacity-0'}`} priority />
            </div>

            <div className={`absolute lg:top-[-16rem] mx-auto flex w-[88%] justify-center items-center ${!screamStatus ? 'opacity-0' : ''} ${hideVideo ? 'opacity-0' : ''}`}>
                <Image src='/greenday/m-bass.png' width={947} height={908} alt='Zirolu' className='w-full animate-bgScale2' priority />
                <div className="animate-bgScale3 w-full absolute top-0 left-0 mx-auto flex justify-center items-center">
                <Image src='/greenday/m-bass2.png' width={947} height={908} alt='Zirolu' className='relative z-20' priority />
                </div>
                <div className="animate-bgScale3 w-full absolute top-0 left-0 mx-auto flex justify-center items-center">
                <Image src='/greenday/m-rock.png' width={947} height={908} alt='Zirolu' className='relative z-20' priority />
                </div>
            </div>

            <div className={`absolute mx-auto flex w-[78%] justify-center items-center  ${hideVideo ? '' : 'opacity-0'}`}>
                <Image src='/greenday/m-tunggu.png' width={947} height={908} alt='Zirolu' className='w-full' priority />
            </div>
        </div>

        <div className={`absolute mx-auto z-50 pointer-events-none ${showPreview ? '' : 'opacity-0'}`}>
            <video ref={videoRef} className={`w-[50%] videoRatio916 mx-auto border-2 border-[#ffffff] rounded-sm relative`} autoPlay playsInline height={1280}></video>
            <canvas ref={canvasCaptureRef} width="720" height="1280" className={`absolute opacity-0 w-[50%] top-0 left-0 right-0 mx-auto pointer-events-none border-2 border-[#ffffff] rounded-sm z-20`}></canvas>

            {imageSrc && <img ref={imgRef} src={imageSrc} alt="Face" className={`absolute w-[50%] top-0 left-0 right-0 mx-auto pointer-events-none border-2 border-[#ffffff] rounded-sm z-20`} />}

            <canvas ref={captureCanvasRef} className="hidden" />

            {/* {isClient && imageSrc && <img ref={imgRef} src={imageSrc} alt="Face" className="hidden" />} */}
            {/* {isClient && <canvas ref={canvasRef} className="w-full border" />} */}
        </div>

        {/* <div className="relative w-full z-20">
            <div className='relative w-[35%] lg:w-[50%] mx-auto flex justify-center items-center'>
                <Image src='/primaria/orang-1.png' width={512} height={512} alt='Zirolu' className={`w-full ${progressKetawa >= 40 ? 'opacity-0' : ''}`} priority />
                <Image src='/primaria/orang-2.png' width={512} height={512} alt='Zirolu' className={`w-full absolute w-full ${progressKetawa >= 40 && progressKetawa <= 80  ? '' : 'opacity-0'}`} priority />
                <Image src='/primaria/orang-3.png' width={512} height={512} alt='Zirolu' className={`w-full absolute w-full ${progressKetawa >= 80 ? '' : 'opacity-0'}`} priority />
            </div>
            <div className="relative bg-white w-[80%] h-[30px] lg:h-[50px] mt-5 lg:mt-14 mx-auto rounded-full p-2 overflow-hidden">
                <div className="absolute top-0 left-0 border-4 bg-gradient-to-r from-[#FF2A38] to-[#EF000F] h-full mx-auto rounded-full flex items-center justify-center" style={{ width: progressKetawa+"%" }}>
                    <span className="text-xl lg:text-3xl">{progressKetawa}%</span>
                </div>
            </div>
        </div> */}
        <div className="fixed bottom-[-3rem] lg:bottom-[3rem] left-0 w-full z-20">
        {/* <p className="text-base lg:text-5xl text-center mb-5">Suara Lo : {dB !== -Infinity ? dB.toFixed(0) +' dB' : "No Signal"}</p> */}
        {/* <p className="text-3xl">{maxDuration2}</p> */}
            <canvas
                ref={canvasRef}
                width="1080"
                height="300"
                style={{ border: "1px solid transparent", display: "block", margin: "0 auto" }}
            ></canvas>
            {/* <p>Volume (dB): {dB} {dB > 0 ? dB.toFixed(0) : "No Signal"}</p> */}
        </div>
      
    </div>
    );
}
