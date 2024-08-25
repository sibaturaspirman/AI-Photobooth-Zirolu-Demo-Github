'use client';

import * as fal from '@fal-ai/serverless-client';
import { useEffect, useRef, useState, useMemo } from 'react';
// import TopLogoMagnum from "../../../components/TopLogoMagnum";
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
const api_key = 'SG_8bc7975ff91a8b13';
const url = "https://api.segmind.com/v1/faceswap-v2";

// @snippet:start(client.config)
fal.config({
    // credentials: 'FAL_KEY_ID:FAL_KEY_SECRET',
    requestMiddleware: fal.withProxy({
      targetUrl: '/api/fal/proxy', // the built-int nextjs proxy
      // targetUrl: 'http://localhost:3333/api/fal/proxy', // or your own external proxy
    }),
});


let streamCam = null;
const useWebcam = ({
    videoRef
  }) => {
    useEffect(() => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true}).then((stream) => {
            streamCam = stream
            window.localStream = stream
          if (videoRef.current !== null) {
            videoRef.current.srcObject = stream;
            videoRef.current.play();
          }
        });
      }
    }, [videoRef]);
};

let FACE_URL_RESULT = ''
let FACE_URL_RESULT2 = ''
let FACE_URL_RESULT3 = ''
let FACE_URL_RESULT4 = ''
export default function Cam() {
    const router = useRouter();
    const [enabled, setEnabled] = useState(false);
    const [captured, setCaptured] = useState(false);
    const [capturedLoading, setCapturedLoading] = useState(false);
    const [imageCamURL, setImageCamURL] = useState();
    const videoRef = useRef(null);
    const previewRef = useRef(null);
    const [genderFix, setGenderFix] = useState(null);

    useEffect(() => {
        // Perform localStorage action
        if (typeof localStorage !== 'undefined') {
            const item2 = localStorage.getItem('genderFix')
            setGenderFix(item2)
        }
    }, [genderFix])

    useWebcam({ videoRef,previewRef});

    const captureVideo  = ({
        width = 512,
        height = 512,
    }) => {
        setCaptured(true)
        setTimeout(async () => {
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
            // setImageFile4(faceImage)
            // if (typeof localStorage !== 'undefined') {
            //     localStorage.setItem("faceImage4", faceImage)
            // }

            setCapturedLoading(true);

            const options = {
                method: 'POST',
                body: JSON.stringify({
                    image:faceImage
                }),
                headers: {
                    'Authorization': 'de2e0cc3-65da-48a4-8473-484f29386d61:xZC8Zo4DAWR5Yh6Lrq4QE3aaRYJl9lss',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            };
            
            await fetch('https://photoaibase64.zirolu.id/api/upload', options)
                .then(response => response.json())
                .then(response => {
                    console.log(response)
                    setImageCamURL(response.imageUrl)
                    setImageFile4(response.imageUrl)
                    setEnabled(true)
                    setCapturedLoading(false);
                })
                .catch(err => {
                    console.log(err)
                });
        }, 3000);
    }

    const retake = () => {
        setEnabled(false)
    }
    // AI
    const [imageFile, setImageFile] = useState(null);
    const [imageFile2, setImageFile2] = useState(null);
    const [imageFile3, setImageFile3] = useState(null);
    const [imageFile4, setImageFile4] = useState(null);
    const [styleFix, setStyleFix] = useState(null);
    const [styleFix2, setStyleFix2] = useState(null);
    const [styleFix3, setStyleFix3] = useState(null);
    const [styleFix4, setStyleFix4] = useState(null);
    const [setPrint, setSetPrint] = useState(null);
    const [formasiFix, setFormasiFix] = useState(null);
    const [numProses, setNumProses] = useState(0);
    const [numProses1, setNumProses1] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);
    const [resultFaceSwap, setResultFaceSwap] = useState(null);
    const [resultFaceSwap2, setResultFaceSwap2] = useState(null);
    const [resultFaceSwap3, setResultFaceSwap3] = useState(null);
    const [resultFaceSwap4, setResultFaceSwap4] = useState(null);
    const [logs, setLogs] = useState([]);
    const [elapsedTime, setElapsedTime] = useState(0);
    // @snippet:end
    useEffect(() => {
        // Perform localStorage action
        if (typeof localStorage !== 'undefined') {
            const item = localStorage.getItem('faceImage')
            const itemx = localStorage.getItem('faceImage2')
            const itemx2 = localStorage.getItem('faceImage3')
            const item2 = localStorage.getItem('styleFix')
            const item3 = localStorage.getItem('styleFix2')
            const item32 = localStorage.getItem('styleFix3')
            const item33 = localStorage.getItem('styleFix4')
            const item4 = localStorage.getItem('setPrint')

            setImageFile(item)
            setImageFile2(itemx)
            setImageFile3(itemx2)
            setStyleFix(item2)
            setStyleFix2(item3)
            setStyleFix3(item32)
            setStyleFix4(item33)
            setSetPrint(item4)
        }
    }, [imageFile, imageFile2, imageFile3, styleFix, styleFix2, styleFix3, styleFix4, setPrint])

    const generateAI = () => {
        setNumProses1(true)
        setTimeout(() => {
            generateImageSwapCadangan()
        }, 500);
    }

    const reset2 = () => {
      setLoading(false);
      setError(null);
      setElapsedTime(0);
    };
    const toDataURL = url => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
    }))

    // SWAP CADANGAN
    const generateImageSwapCadangan = async () => {
        const urlGambar = styleFix;
        console.log(urlGambar)
        setNumProses(2)
        reset2();
        // @snippet:start("client.queue.subscribe")
        setLoading(true);
        const data = {
            "source_img": imageFile,
            "target_img": styleFix,
            "input_faces_index": 0,
            "source_faces_index": 0,
            "face_restore": "codeformer-v0.1.0.pth",
            "base64": true
        };

        try {
            const response = await axios.post(url, data, { headers: { 'x-api-key': api_key } });
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("resulAIBase64", 'data:image/png;base64,'+response.data.image)
            }
            setTimeout(() => {
                generateImageSwapCadangan2()
            }, 500);
            
        } catch (error) {
            console.error('Error:', error.response.data);
        }
    };
    const generateImageSwapCadangan2 = async () => {
        const urlGambar = styleFix2;
        console.log(urlGambar)
        setNumProses(3)
        reset2();
        // @snippet:start("client.queue.subscribe")
        setLoading(true);
        const data = {
            "source_img": imageFile,
            "target_img": styleFix2,
            "input_faces_index": 0,
            "source_faces_index": 0,
            "face_restore": "codeformer-v0.1.0.pth",
            "base64": true
        };

        try {
            const response = await axios.post(url, data, { headers: { 'x-api-key': api_key } });
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("resulAIBase642", 'data:image/png;base64,'+response.data.image)
            }
            setTimeout(() => {
                generateImageSwapCadangan3()
            }, 500);
            
        } catch (error) {
            console.error('Error:', error.response.data);
        }
    };
    const generateImageSwapCadangan3 = async () => {
        const urlGambar = styleFix3;
        console.log(urlGambar)
        setNumProses(4)
        reset2();
        // @snippet:start("client.queue.subscribe")
        setLoading(true);
        const data = {
            "source_img": imageFile,
            "target_img": styleFix3,
            "input_faces_index": 0,
            "source_faces_index": 0,
            "face_restore": "codeformer-v0.1.0.pth",
            "base64": true
        };

        try {
            const response = await axios.post(url, data, { headers: { 'x-api-key': api_key } });
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("resulAIBase643", 'data:image/png;base64,'+response.data.image)
            }
            setTimeout(() => {
                generateImageSwapCadangan4()
            }, 500);
            
        } catch (error) {
            console.error('Error:', error.response.data);
        }
    };
    const generateImageSwapCadangan4 = async () => {
        const urlGambar = styleFix4;
        console.log(urlGambar)
        setNumProses(5)
        reset2();
        // @snippet:start("client.queue.subscribe")
        setLoading(true);
        const data = {
            "source_img": imageFile,
            "target_img": styleFix4,
            "input_faces_index": 0,
            "source_faces_index": 0,
            "face_restore": "codeformer-v0.1.0.pth",
            "base64": true
        };

        try {
            const response = await axios.post(url, data, { headers: { 'x-api-key': api_key } });
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("resulAIBase644", 'data:image/png;base64,'+response.data.image)
            }
            if(setPrint == 'false'){
                setTimeout(() => {
                    router.push('/nextfest/cadangan/result-band2');
                }, 500);
            }else{
                setTimeout(() => {
                    router.push('/nextfest/cadangan/result-band');
                }, 500);
            }
            
        } catch (error) {
            console.error('Error:', error.response.data);
        }
    };
    // !SWAP CADANGAN


    const generateImageSwap = async () => {
        const urlGambar = styleFix;
        console.log(urlGambar)

        setNumProses(2)
        reset2();
        // @snippet:start("client.queue.subscribe")
        setLoading(true);
        const start = Date.now();

        try {
        const result = await fal.subscribe(
            'fal-ai/face-swap',
            {
            input: {
                base_image_url: styleFix,
                swap_image_url: imageFile
            },
            pollInterval: 5000, // Default is 1000 (every 1s)
            logs: true,
            onQueueUpdate(update) {
                setElapsedTime(Date.now() - start);
                if (
                update.status === 'IN_PROGRESS' ||
                update.status === 'COMPLETED'
                ) {
                setLogs((update.logs || []).map((log) => log.message));
                }
            },
            }
        );
        setResultFaceSwap(result);
        FACE_URL_RESULT = result.image.url;

        toDataURL(FACE_URL_RESULT)
        .then(dataUrl => {
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("resulAIBase64", dataUrl)
                localStorage.setItem("faceURLResult", FACE_URL_RESULT)
            }
            setTimeout(() => {
                generateImageSwap2()
            }, 500);
        })
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
            setElapsedTime(Date.now() - start);
        }
        // @snippet:end
    };
    const generateImageSwap2 = async () => {
        const urlGambar = styleFix2;
        console.log(urlGambar)
        setNumProses(3)
        reset2();
        // @snippet:start("client.queue.subscribe")
        setLoading(true);
        const start = Date.now();

        try {
        const result = await fal.subscribe(
            'fal-ai/face-swap',
            {
            input: {
                base_image_url: styleFix2,
                swap_image_url: imageFile2
            },
            pollInterval: 5000, // Default is 1000 (every 1s)
            logs: true,
            onQueueUpdate(update) {
                setElapsedTime(Date.now() - start);
                if (
                update.status === 'IN_PROGRESS' ||
                update.status === 'COMPLETED'
                ) {
                setLogs((update.logs || []).map((log) => log.message));
                }
            },
            }
        );
        setResultFaceSwap2(result);
        FACE_URL_RESULT2 = result.image.url;

        toDataURL(FACE_URL_RESULT2)
        .then(dataUrl => {
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("resulAIBase642", dataUrl)
                localStorage.setItem("faceURLResult2", FACE_URL_RESULT2)
            }
            setTimeout(() => {
                // router.push('/mizuho/result');
                generateImageSwap3()
            }, 500);
        })
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
            setElapsedTime(Date.now() - start);
        }
        // @snippet:end
    };
    const generateImageSwap3 = async () => {
        const urlGambar = styleFix3;
        console.log(urlGambar)

        setNumProses(4)
        reset2();
        // @snippet:start("client.queue.subscribe")
        setLoading(true);
        const start = Date.now();

        try {
        const result = await fal.subscribe(
            'fal-ai/face-swap',
            {
            input: {
                base_image_url: styleFix3,
                swap_image_url: imageFile3
            },
            pollInterval: 5000, // Default is 1000 (every 1s)
            logs: true,
            onQueueUpdate(update) {
                setElapsedTime(Date.now() - start);
                if (
                update.status === 'IN_PROGRESS' ||
                update.status === 'COMPLETED'
                ) {
                setLogs((update.logs || []).map((log) => log.message));
                }
            },
            }
        );
        setResultFaceSwap3(result);
        FACE_URL_RESULT3= result.image.url;

        toDataURL(FACE_URL_RESULT3)
        .then(dataUrl => {
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("resulAIBase643", dataUrl)
                localStorage.setItem("faceURLResult3", FACE_URL_RESULT3)
            }
            setTimeout(() => {
                generateImageSwap4()
            }, 500);
        })
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
            setElapsedTime(Date.now() - start);
        }
        // @snippet:end
    };
    const generateImageSwap4 = async () => {
        const urlGambar = styleFix4;
        console.log(urlGambar)

        setNumProses(5)
        reset2();
        // @snippet:start("client.queue.subscribe")
        setLoading(true);
        const start = Date.now();

        try {
        const result = await fal.subscribe(
            'fal-ai/face-swap',
            {
            input: {
                // base_image_url: URL_RESULT,
                // swap_image_url: '/avatar/base/'+character
                base_image_url: styleFix4,
                swap_image_url: imageFile4
            },
            pollInterval: 5000, // Default is 1000 (every 1s)
            logs: true,
            onQueueUpdate(update) {
                setElapsedTime(Date.now() - start);
                if (
                update.status === 'IN_PROGRESS' ||
                update.status === 'COMPLETED'
                ) {
                setLogs((update.logs || []).map((log) => log.message));
                }
            },
            }
        );
        setResultFaceSwap4(result);
        FACE_URL_RESULT4= result.image.url;

        toDataURL(FACE_URL_RESULT4)
        .then(dataUrl => {
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("resulAIBase644", dataUrl)
                localStorage.setItem("faceURLResult4", FACE_URL_RESULT4)
            }
            if(setPrint == 'false'){
                setTimeout(() => {
                    router.push('/nextfest/result-band2');
                }, 500);
            }else{
                setTimeout(() => {
                    router.push('/nextfest/result-band');
                }, 500);
            }
            // setTimeout(() => {
            //     router.push('/nextfest/result-band');
            // }, 500);
        })
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
            setElapsedTime(Date.now() - start);
        }
        // @snippet:end
    };

    return (
        <main className="flex fixed h-full w-full bg-nextfest overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20">
            <div className={`fixed top-10 w-[100%] mx-auto flex justify-center items-center z-50 ${numProses1 ? 'opacity-0 pointer-events-none' : ''}`}>
            {/* <TopLogoMagnum></TopLogoMagnum> */}
            </div>
            {/* LOADING */}
            {numProses1 && 
                <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center flex-col z-20'>
                    {/* <div className='relative w-[250px] h-[78px] lg:w-[555px] lg:h-[180px] overflow-hidden'>
                        <div className='animate-loading1 absolute left-0 top-0 w-full mx-auto flex justify-center items-center pointer-events-none'>
                            <Image src='/loading.png' width={770} height={714} alt='Zirolu' className='w-full' priority />
                        </div>
                    </div> */}

                    {/* <div className="relative w-[70%] mx-auto mb-5">
                        <Image src='/magnumotion/logo.png' width={207} height={53} alt='Zirolu' className='w-full' priority />
                    </div> */}
                    <div className='animate-upDownCepet relative py-10 px-8 mt-5 lg:mt-10 lg:p-5 lg:text-6xl border-2 text-center bg-[#000] rounded-xl text-[#fff] lg:font-bold'>
                        <p>{`Please wait, loading...`}</p>
                        <p>{`AI Process : ${numProses} of 5`}</p>
                        {error}
                    </div>

                    {/* <pre className='relative py-2 px-4 mt-5 lg:mt-10 border-2 border-[#201E28] text-left bg-[#33303D] text-[#fff] text-xs lg:text-sm overflow-auto no-scrollbar h-[100px] w-[60%] mx-auto'>
                        <code>
                        {logs.filter(Boolean).join('\n')}
                        </code>
                        AI generate face... <br></br>
                        Loading model..<br></br>
                    </pre> */}
                </div>
            }
            {/* LOADING */}
            <h1 className={`text-center text-5xl mt-0 mb-4 ${numProses1 ? 'opacity-0 pointer-events-none' : ''} ${genderFix == 'cowokband' ? 'flex':'hidden'}`}>TAKE SELFIE - MALE</h1>
            <h1 className={`text-center text-5xl mt-0 mb-4 ${numProses1 ? 'opacity-0 pointer-events-none' : ''} ${genderFix == 'cewekband' ? 'flex':'hidden'}`}>TAKE SELFIE - FEMALE</h1>
            <h2 className={`text-center text-5xl mb-0 uppercase ${numProses1 ? 'opacity-0 pointer-events-none' : ''}`}>Face 4 of 4</h2>
            <div className={`relative w-full flex flex-col justify-center items-center mt-2 mb-3 lg:mt-8 lg:mb-10 ${numProses1 ? 'opacity-0 pointer-events-none' : ''}`}>
                <div className={`absolute top-1 left-1 w-[170px] h-[170px] justify-center items-center pointer-events-none z-10 ${genderFix == 'cowokband' ? 'flex':'hidden'}`}>
                    <Image src='/magnumotion/band-4.jpeg' width={200} height={200} alt='Zirolu' className='w-full' priority />
                </div>
                <div className={`absolute top-1 left-1 w-[170px] h-[170px] justify-center items-center pointer-events-none z-10 ${genderFix == 'cewekband' ? 'flex':'hidden'}`}>
                    <Image src='/magnumotion/band-cewek-4.jpeg' width={200} height={200} alt='Zirolu' className='w-full' priority />
                </div>
                <div className='relative lg:w-full'>
                    {captured && 
                    <div className='absolute top-0 left-0 right-0 bottom-0 w-[100px] h-[100px] lg:w-[174px] lg:h-[174px] overflow-hidden m-auto flex justify-center items-center pointer-events-none z-10'>
                        <div className='w-full animate-countdown translate-y-[35%]'>
                            <Image src='/countdown.png' width={174} height={522} alt='Zirolu' className='w-full' priority />
                        </div>
                    </div>
                    }

                    {!enabled && 
                    <div className='w-[52%] mx-auto absolute left-0 right-0 bottom-0 z-10'>
                        <Image src='/frame-pose.png' width={426} height={461} alt='Zirolu' className='w-full' priority />
                    </div>
                    }

                    <video ref={videoRef} className={`w-[80%] lg:w-full mx-auto border-2 border-[#ffffff] rounded-sm ${enabled ? 'absolute opacity-0':'relative'}`} playsInline height={512}></video>
                    <canvas ref={previewRef} width="512" height="512" className={`${enabled ? 'relative':'absolute opacity-0'} w-[80%] lg:w-full top-0 left-0 right-0 mx-auto pointer-events-nones border-2 border-[#ffffff] rounded-sm`}></canvas>
                </div>
            </div>


            {!enabled && 
                <p className='block text-center text-5xl mt-1 mb-10 text-white'>*Foto hanya sendiri <br></br> *Ikuti garis pose dan tidak terlalu zoom</p> 
            }
            {capturedLoading && 
                <p className='block text-center text-5xl mt-1 mb-3 lg:mt-4 text-white'>*Please wait...</p> 
            }
            {!enabled && 
                <div className="relative w-full flex justify-center items-center">
                    <button className="relative mx-auto flex  w-[80%] justify-center items-center" onClick={captureVideo}>
                    <Image src='/nextfest/btn-capture.png' width={764} height={144} alt='Zirolu' className='w-full' priority />
                    </button>
                </div>
            }
            <div className={`relative w-full ${capturedLoading ? 'opacity-0 pointer-events-none' : ''}`}>
            <div className={`relative w-full ${numProses1 ? 'opacity-0 pointer-events-none' : ''}`}>
            <div className={`relative w-full ${!enabled ? 'hidden' : ''}`}>
                <div className="relative w-[75%] mx-auto flex justify-center items-center flex-col mt-0">
                    <button className="w-full relative mx-auto flex justify-center items-center" onClick={generateAI}>
                    <Image src='/nextfest/btn-continue.png' width={764} height={144} alt='Zirolu' className='w-full' priority />
                    </button>
                    <button className="relative w-full mx-auto flex justify-center items-center mt-10" onClick={retake}>
                    <Image src='/nextfest/btn-retake.png' width={764} height={144} alt='Zirolu' className='w-full' priority />
                    </button>
                </div>
            </div></div></div>
        </main>
    );
}
