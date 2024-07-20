'use client';

import * as fal from '@fal-ai/serverless-client';
// import Replicate from "replicate";
import { useEffect, useRef, useState, useMemo } from 'react';
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/navigation';


// @snippet:start(client.config)
fal.config({
    // credentials: process.env.FAL_KEY,
    requestMiddleware: fal.withProxy({
        targetUrl: '/api/fal/proxy', // the built-int nextjs proxy
    //   // targetUrl: 'http://localhost:3333/api/fal/proxy', // or your own external proxy
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
export default function Cam() {
    const router = useRouter();
    const [enabled, setEnabled] = useState(false);
    const [captured, setCaptured] = useState(false);
    // const [countDown, setCoundown] = useState(5);
    // const [counter, setCounter] = useState(60);
    // const waktuBatasTake = useRef(null);
    const videoRef = useRef(null);
    const previewRef = useRef(null);

    useWebcam({ videoRef,previewRef});

    const captureVideo  = ({
        width = 512,
        height = 512,
    }) => {
        setCaptured(true)
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
            setImageFile(faceImage)
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("faceImage", faceImage)
            }
            // setTimeout(() => {
            //     router.push('/generate');
            // }, 1250);
        }, 3000);
    }

    const retake = () => {
        setEnabled(false)
    }


    // AI
    const [imageFile, setImageFile] = useState(null);
    const [imageFile2, setImageFile2] = useState(null);
    const [imageFile3, setImageFile3] = useState(null);
    const [styleFix, setStyleFix] = useState(null);
    const [styleFix2, setStyleFix2] = useState(null);
    const [styleFix3, setStyleFix3] = useState(null);
    const [formasiFix, setFormasiFix] = useState(null);
    const [numProses, setNumProses] = useState(0);
    const [numProses1, setNumProses1] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);
    const [resultFaceSwap, setResultFaceSwap] = useState(null);
    const [resultFaceSwap2, setResultFaceSwap2] = useState(null);
    const [resultFaceSwap3, setResultFaceSwap3] = useState(null);
    const [logs, setLogs] = useState([]);
    const [elapsedTime, setElapsedTime] = useState(0);
    // @snippet:end
    useEffect(() => {
        // Perform localStorage action
        if (typeof localStorage !== 'undefined') {
            const item1 = localStorage.getItem('styleFix')
            const item2 = localStorage.getItem('formasiFix')
            setStyleFix(item1)
            setFormasiFix(item2)
        }
    }, [styleFix, formasiFix])

    const generateAI = () => {
        setNumProses1(true)
        // generateImageSwap()
        generateImageSwapCadangan()

        // videoRef.current.stop();
        // videoRef.current.srcObject = ''
        // streamCam.getVideoTracks()[0].stop();
        // console.log(streamCam)

        
        // localStream.getVideoTracks()[0].stop();
        // console.log(streamCam)
        // console.log(videoRef)
        // videoRef.src=''
        // STOP CAM
        // streamCam.getTracks().forEach(function(track) {
        //     track.stop();
        // });
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

    const generateImageSwapCadangan = async () => {
        // setNumProses(2)
        // reset2();
        // setLoading(true);

        // const input = {
        //     swap_image: "https://replicate.delivery/pbxt/JoBuzfSVFLb5lBqkf3v9xMnqx3jFCYhM5JcVInFFwab8sLg0/long-trench-coat.png",
        //     target_image: "https://replicate.delivery/pbxt/JoBuz3wGiVFQ1TDEcsGZbYcNh0bHpvwOi32T1fmxhRujqcu7/9X2.png"
        // };
        
        // const output = await replicate.run("omniedgeio/face-swap:d28faa318942bf3f1cbed9714def03594f99b3c69b2eb279c39fc60993cee9ac", { input });
        // console.log(output)

        // const url = 'https://faceswap-image-transformation-api.p.rapidapi.com/faceswap';
        // const options = {
        //     method: 'POST',
        //     headers: {
        //         'x-rapidapi-key': 'a568238313msh378bd947dea8e5ap180ee5jsn4f7215336ac1',
        //         'x-rapidapi-host': 'faceswap-image-transformation-api.p.rapidapi.com',
        //         'Content-Type': 'application/json'
        //     },
        //     body: {
        //         TargetImageUrl: 'https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcT2xYTv3ig7zGLvs0ABliV1ZMWG-0waOX_P6nd03SJnDLVoTiSnvuCMJ-dNpQhhYXTC',
        //         SourceImageUrl: 'https://m.media-amazon.com/images/M/MV5BMTQzMjkwNTQ2OF5BMl5BanBnXkFtZTgwNTQ4MTQ4MTE@._V1_.jpg'
        //     }
        // };

        // try {
        //     const response = await fetch(url, options);
        //     const result = await response.text();
        //     console.log(result);
        // } catch (error) {
        //     console.error(error);
        // }

        // const options = {
        //     method: 'POST',
        //     body:{
        //         'target_image':'https://ai.zirolu.id/pln/style/m-1.jpg',
        //         'swap_image':'https://ai.zirolu.id/pln/style/m-2.jpg'
        //     },
        //     headers: {
        //         'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjU1NTkxMCwicHJvZHVjdF9jb2RlIjoiMDY3MDAzIiwidGltZSI6MTcyMTQzMTMxMX0.Fa1dYWmW5-iIL57NMtp9b6_jefeTfU4aw8xrsVxACZg',
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     }
        // };
        
        // await fetch('https://developer.remaker.ai/api/remaker/v1/face-swap/create-job', options)
        //     .then(response => response.json())
        //     .then(response => {
        //         console.log(response)
        //         // setLinkQR(response.file)
        //         // emitString("sendImage", response.file);
        //         // setIdFormEmail(response.id)
        //         // setGenerateQR('true')
        //         // setLoadingDownload(null)
        //     })
        //     .catch(err => {
        //         console.log(err)
        //     });

        setNumProses(2)
        reset2();
        // @snippet:start("client.queue.subscribe")
        setLoading(true);
        // const start = Date.now();
        // try {
        // const result = await fal.subscribe(
        //     'comfy/sibaturaspirman/fal-faceswap',
        //     {
        //     input: {
        //         inputImage: 'https://ai.zirolu.id/pln/style/m-1.jpg',
        //         sourceImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Elon_Musk_in_2023_%28cropped%29.jpg/440px-Elon_Musk_in_2023_%28cropped%29.jpg'
        //     },
        //     pollInterval: 5000, // Default is 1000 (every 1s)
        //     logs: true,
        //     onQueueUpdate(update) {
        //         setElapsedTime(Date.now() - start);
        //         if (
        //         update.status === 'IN_PROGRESS' ||
        //         update.status === 'COMPLETED'
        //         ) {
        //         setLogs((update.logs || []).map((log) => log.message));
        //         }
        //     },
        //     }
        // );

        // // const result = await fal.subscribe("comfy/sibaturaspirman/fal-faceswap", {
        // //     input: {
        // //       inputImage: "https://ai.zirolu.id/pln/style/m-1.jpg",
        // //       sourceImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Elon_Musk_in_2023_%28cropped%29.jpg/440px-Elon_Musk_in_2023_%28cropped%29.jpg"
        // //     },
        // //     logs: true,
        // //     onQueueUpdate: (update) => {
        // //       if (update.status === "IN_PROGRESS") {
        // //         update.logs.map((log) => log.message).forEach(console.log);
        // //       }
        // //     },
        // //   });

        // setResultFaceSwap(result);
        // FACE_URL_RESULT= result.image.url;

        // toDataURL(FACE_URL_RESULT)
        // .then(dataUrl => {
        //     if (typeof localStorage !== 'undefined') {
        //         localStorage.setItem("resulAIBase64", dataUrl)
        //         localStorage.setItem("faceURLResult", FACE_URL_RESULT)
        //     }
        //     setTimeout(() => {
        //         router.push('/pln/result');
        //     }, 200);
        // })
        // } catch (error) {
        //     setError(error);
        // } finally {
        //     setLoading(false);
        //     setElapsedTime(Date.now() - start);
        // }
        // @snippet:end

        // try {
        //     const result = await fal.subscribe("comfy/sibaturaspirman/fal-faceswap", {
        //         input: {
        //         inputImage: "https://ai.zirolu.id/pln/style/m-1.jpg",
        //         sourceImage: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Elon_Musk_in_2023_%28cropped%29.jpg/440px-Elon_Musk_in_2023_%28cropped%29.jpg"
        //         },
        //         logs: true,
        //         onQueueUpdate: (update) => {
        //         if (update.status === "IN_PROGRESS") {
        //             update.logs.map((log) => log.message).forEach(console.log);
        //         }
        //         },
        //     });
        //     setResultFaceSwap(result);
        //     FACE_URL_RESULT= result.image.url;
        //     console.log(FACE_URL_RESULT)

        //     toDataURL(FACE_URL_RESULT)
        //     .then(dataUrl => {
        //         if (typeof localStorage !== 'undefined') {
        //             localStorage.setItem("resulAIBase64", dataUrl)
        //             localStorage.setItem("faceURLResult", FACE_URL_RESULT)
        //         }
        //         // setTimeout(() => {
        //         //     router.push('/pln/result');
        //         // }, 200);
        //     })
        // } catch (error) {
        //     setError(error);
        // } finally {
        //     setLoading(false);
        //     setElapsedTime(Date.now() - start);
        // }


        // const start = Date.now();
        // try {
        //     const result = await fal.subscribe("comfy/sibaturaspirman/fal-faceswap", {
        //         input: {
        //         inputImage: "https://ai.zirolu.id/pln/style/m-1.jpg",
        //         sourceImage: "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-1459166552.jpeg"
        //         },
        //         logs: true,
        //         onQueueUpdate(update) {
        //             setElapsedTime(Date.now() - start);
        //             if (
        //             update.status === 'IN_PROGRESS' ||
        //             update.status === 'COMPLETED'
        //             ) {
        //             setLogs((update.logs || []).map((log) => log.message));
        //             }
        //         },
        //     });
        //     setResultFaceSwap(result);
        //     FACE_URL_RESULT= result.image.url;
        //     console.log(FACE_URL_RESULT)
        // } catch (error) {
        //     setError(error);
        // } finally {
        //     setLoading(false);
        //     setElapsedTime(Date.now() - start);
        // }

        // const result = await fal.subscribe("comfy/sibaturaspirman/fal-faceswap", {
        //     input: {
        //       inputImage: "https://ai.zirolu.id/pln/style/m-1.jpg",
        //       sourceImage: "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-1459166552.jpeg"
        //     },
        //     logs: true,
        //     onQueueUpdate: (update) => {
        //       if (update.status === "IN_PROGRESS") {
        //         update.logs.map((log) => log.message).forEach(console.log);
        //       }
        //     },
        //   });

        // const result = await fal.subscribe("fal-ai/fast-lightning-sdxl", {
        //     input: {
        //       prompt: "a cute puppy",
        //     },
        //     pollInterval: 500,
        //     logs: true,
        //     onQueueUpdate: (update) => {
        //       console.log(update.status);
        //       if (update.status === "IN_PROGRESS") {
        //         update.logs.map((log) => log.message).forEach(console.log);
        //       }
        //     },
        //   });
        //   console.log(result);
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
        "clientId": "DwRa1sKRHA7NFcsxPOf53g==",
        "clientSecret": "B469tIUppiqYZpqe81b6i+l/iZ9o8pQe"
        });

        const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
        };

        fetch("https://openapi.akool.com/api/open/v3/getToken", requestOptions)
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
        
        // const myHeaders = new Headers();
        // myHeaders.append("Authorization", "Bearer token");
        // myHeaders.append("Content-Type", "application/json");

        // const raw = JSON.stringify({
        //     "sourceImage": [
        //         {
        //         "path": "https://d21ksh0k4smeql.cloudfront.net/crop_1694593694387-4562-0-1694593694575-0526.png",
        //         "opts": "262,175:363,175:313,215:272,279"
        //         }
        //     ],
        //     "targetImage": [
        //         {
        //         "path": "https://d21ksh0k4smeql.cloudfront.net/crop_1705462509874-9254-0-1705462510015-9261.png",
        //         "opts": "239,364:386,366:317,472:266,539"
        //         }
        //     ],
        //     "face_enhance": 0,
        //     "modifyImage": "https://d21ksh0k4smeql.cloudfront.net/bdd1c994c4cd7a58926088ae8a479168-1705462506461-1966.jpeg",
        //     "webhookUrl": "http://localhost:3007/api/webhook"
        // });

        // const requestOptions = {
        // method: "POST",
        // headers: myHeaders,
        // body: raw,
        // redirect: "follow"
        // };

        // fetch("https://openapi.akool.com/api/open/v3/faceswap/highquality/specifyimage", requestOptions)
        // .then((response) => response.text())
        // .then((result) => console.log(result))
        // .catch((error) => console.error(error));
    };

    const generateImageSwap = async () => {

        // STOP CAM
        // streamCam.getTracks().forEach(function(track) {
        //     track.stop();
        // });

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
        FACE_URL_RESULT= result.image.url;

        toDataURL(FACE_URL_RESULT)
        .then(dataUrl => {
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("resulAIBase64", dataUrl)
                localStorage.setItem("faceURLResult", FACE_URL_RESULT)
            }
            setTimeout(() => {
                router.push('/pln/result');
            }, 200);
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
        <main className="flex fixed h-full w-full bg-pln overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20" onContextMenu={(e)=> e.preventDefault()}>
            {/* <div className="fixed top-0 left-0 w-full h-full bg-iqos-border pointer-events-none z-10"></div> */}
            <div  className={`relative w-[50%] mx-auto mb-[2rem] ${numProses1 ? 'opacity-0 pointer-events-none' : ''}`}>
            <Image src='/pln/takephoto.png' width={428} height={51} alt='Zirolu' className='w-full' priority />
            </div>
            {/* LOADING */}
            {numProses1 && 
                <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center flex-col z-20'>
                    {/* <div className='relative w-[250px] h-[78px] lg:w-[555px] lg:h-[180px] overflow-hidden'>
                        <div className='animate-loading1 absolute left-0 top-0 w-full mx-auto flex justify-center items-center pointer-events-none'>
                            <Image src='/loading.png' width={770} height={714} alt='Zirolu' className='w-full' priority />
                        </div>
                    </div> */}

                    <div className="relative w-[40%] mx-auto mt-[14rem] mb-5">
                        <Image src='/pln/pln.png' width={784} height={228} alt='Zirolu' className='w-full' priority />
                    </div>
                    <div className='animate-upDownCepet relative py-2 px-4 mt-5 lg:mt-10 lg:p-5 lg:text-4xl border-2 text-center bg-[#571571] rounded-xl text-[#fff] lg:font-bold'>
                        <p>{`Please wait, loading...`}</p>
                        <p>{`Process : ${(elapsedTime / 1000).toFixed(2)} seconds (${numProses} of 2)`}</p>
                        {error}
                    </div>

                    {/* <pre className='relative py-2 px-4 mt-5 lg:mt-10 border-2 text-left bg-[#A91E58] rounded-xl text-[#fff] text-xs lg:text-sm overflow-auto no-scrollbar h-[100px] w-[60%] mx-auto'>
                        <code>
                        {logs.filter(Boolean).join('\n')}
                        </code>
                        AI generate face... <br></br>
                        Loading model..<br></br>
                    </pre> */}
                </div>
            }
            {/* LOADING */}
            <div className={`relative w-full flex flex-col justify-center items-center mt-2 mb-3 lg:mt-8 lg:mb-10 ${numProses1 ? 'opacity-0 pointer-events-none' : ''}`}>
                <div className='relative lg:w-full'>
                    {/* {!enabled && 
                    <div className='absolute top-0 left-0 right-0 bottom-0 w-[50%] mx-auto flex justify-center items-center pointer-events-none z-10'>
                        <Image src='/icon-capture.png' width={389} height={220} alt='Zirolu' className='w-full' priority />
                    </div>
                    } */}

                    {captured && 
                    <div className='absolute top-0 left-0 right-0 bottom-0 w-[100px] h-[100px] lg:w-[174px] lg:h-[174px] overflow-hidden m-auto flex justify-center items-center pointer-events-none z-10'>
                        <div className='w-full animate-countdown translate-y-[35%]'>
                            <Image src='/countdown.png' width={174} height={522} alt='Zirolu' className='w-full' priority />
                        </div>
                    </div>
                    }

                    {!enabled && 
                    <div className='w-[55%] mx-auto absolute left-0 right-0 bottom-0 z-10'>
                        <Image src='/frame-pose.png' width={426} height={461} alt='Zirolu' className='w-full' priority />
                    </div>
                    }

                    <video ref={videoRef} className={`w-[90%] mx-auto border-2 border-[#ffffff] rounded-sm ${enabled ? 'absolute opacity-0':'relative'}`} playsInline height={512}></video>
                    <canvas ref={previewRef} width="512" height="512" className={`${enabled ? 'relative':'absolute opacity-0'} w-[90%] top-0 left-0 right-0 mx-auto pointer-events-nones border-2 border-[#ffffff] rounded-sm`}></canvas>
                </div>
            </div>


            {!enabled && 
                <p className='block text-center text-sm lg:text-4xl mt-1 mb-3 lg:mt-4 text-black'>*Ikuti garis pose dan tidak terlalu zoom</p> 
            }
            {!enabled && 
                <div className="relative w-full flex justify-center items-center mt-8">
                    <button className="relative mx-auto flex  w-[80%] justify-center items-center" onClick={captureVideo}>
                        <Image src='/pln/btn-capture.png' width={775} height={180} alt='Zirolu' className='w-full' priority />
                    </button>
                </div>
            }
            <div className={`relative w-full ${numProses1 ? 'opacity-0 pointer-events-none' : ''}`}>
            <div className={`relative w-full ${!enabled ? 'hiddexn' : ''}`}>
                <div className="relative w-[80%] mx-auto flex justify-center items-center flex-col mt-0">
                    <button className="w-full relative mx-auto flex justify-center items-center" onClick={generateAI}>
                        <Image src='/pln/btn-generate.png' width={775} height={180} alt='Zirolu' className='w-full' priority />
                    </button>
                    <button className="relative w-full mx-auto flex justify-center items-center mt-0" onClick={retake}>
                        <Image src='/pln/btn-retake.png' width={775} height={180} alt='Zirolu' className='w-full' priority />
                    </button>
                </div>
            </div></div>
        </main>
    );
}
