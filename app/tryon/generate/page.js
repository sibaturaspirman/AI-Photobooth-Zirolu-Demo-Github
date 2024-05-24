'use client';

import * as fal from '@fal-ai/serverless-client';
import Image from "next/image";
import { useEffect, useState, useMemo } from 'react';
import TopLogo from "./../../components/TopLogo";
import { Paytone_One} from "next/font/google";
const paytone_one = Paytone_One({ subsets: ["latin"], weight: '400' });
import { useRouter } from 'next/navigation';
// import io from 'socket.io-client';

// @snippet:start(client.config)
fal.config({
    // credentials: 'FAL_KEY_ID:FAL_KEY_SECRET',
    requestMiddleware: fal.withProxy({
      targetUrl: '/api/fal/proxy', // the built-int nextjs proxy
      // targetUrl: 'http://localhost:3333/api/fal/proxy', // or your own external proxy
    }),
});

// const DEFAULT_PROMPT = 'anime style illustration of techwear, cyborg ninja, holding a sword, wearing a mask, striking pose, all limbs appear in frame, japanese vibe, detailed design for streetwear and urban style t-shirt design, solid color background, etc pro vector';
const DEFAULT_NEG_PROMPT = 'extra head, extra face, double head, double face, (((((ugly)))), (((duplicate))), ((morbid)), ((mutilated)), [out of frame], extra fingers, mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), ((ugly)), blurry, ((bad anatomy)), (((bad proportions))), ((extra limbs)), cloned face, (((disfigured))), out of frame, ugly, extra limbs, (bad anatomy), gross proportions, (malformed limbs), ((missing arms)), ((missing legs)), (((extra arms))), (((extra legs))), mutated hands, (fused fingers), (too many fingers), (((long neck))), boobs, sexy, blurry, low resolution, low quality, pixelated, interpolated, compression artifacts, noisey, grainy';
let URL_RESULT = ''
let FACE_URL_RESULT = ''
// let fixSeed = ''
let garmentURL = ''
let garmentDesc = ''
function blobToBase64(blob) {
    return new Promise((resolve, _) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
}
export default function Register() {
    const router = useRouter();
    const [prompt, setPrompt] = useState(null);
    const [imageCapturePreview, setImageCapturePreview] = useState(null);
    const [baseFaceFile, setBaseFaceFile] = useState(null);

    const [prompt1, setPrompt1] = useState();
    const [prompt2, setPrompt2] = useState();
    let promptCombine = prompt1 + prompt2;

    const negative_prompt = DEFAULT_NEG_PROMPT;
    const [imageFile, setImageFile] = useState(null);
    const [fixSeed, setFixSeed] = useState(null);
    const [CGF, setCGF] = useState(13);
    const [numSteps, setNumSteps] = useState(80);
    const [styleGender, setStyleGender] = useState(null);
    const [stylePrompt, setStylePrompt] = useState(null);
    const [numProses, setNumProses] = useState(0);
    const [numProses1, setNumProses1] = useState();
    // Result state
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);
    const [resultFaceSwap, setResultFaceSwap] = useState(null);
    const [logs, setLogs] = useState([]);
    const [elapsedTime, setElapsedTime] = useState(0);
    // @snippet:end
    // useEffect(() => {
    //     // Perform localStorage action
    //     if (typeof localStorage !== 'undefined') {
    //         const item = localStorage.getItem('faceImage')
    //         setImageFile(item)
    //     }
    // }, [imageFile])

    const toDataURL = url => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
    }))

    const handleImageUpload = async (event) => {
        const file = event.target.files[0];
        setBaseFaceFile(event.target.files[0])

        if (!event.target.files || !event.target.files[0]) return;
        const FR = new FileReader();
        
        FR.addEventListener("load", function(evt) {
            setImageCapturePreview(evt.target.result)
        }); 
        
        FR.readAsDataURL(event.target.files[0]);
    };

    const generateAI = () => {
        // setNumProses1(true)
        if(prompt1 == 'style1'){
            garmentURL = 'https://ai.zirolu.id/tryon/style-1.jpeg'
            garmentDesc = 'T-Shirt Oversize'
        }else if(prompt1 == 'style2'){
            garmentURL = 'https://ai.zirolu.id/tryon/style-2.jpeg'
            garmentDesc = 'Short Sleeve Round Neck T-shirts'
        }

        import('html2canvas').then(html2canvas => {
            html2canvas.default(document.querySelector("#capturePreview"), {scale:1}).then(canvas => 
                uploadImage(canvas)
            )
        }).catch(e => {console("load failed")})
    }
    const uploadImage = async (canvas) => {
        // setLoadingDownload('≈')

        canvas.toBlob(async function(blob) {
            console.log(blobToBase64(blob))
            blobToBase64(blob).then(dataUrl => {
                console.log(dataUrl)
                setBaseFaceFile(dataUrl)
                setTimeout(() => {
                    generateImage()
                }, 150);
            })
        });
    }

    const generateImage = async () => {
        setNumProses(1)
      reset();
      // @snippet:start("client.queue.subscribe")
      setLoading(true);
      const start = Date.now();
      try {
        const result = await fal.subscribe("fal-ai/idm-vton", {
            input: {
              human_image_url: baseFaceFile,
              num_inference_stepsinteger: 30,
              seedinteger: 42,
              garment_image_url: garmentURL,
              description: garmentDesc
            },
            logs: true,
            onQueueUpdate(update) {
              setElapsedTime(Date.now() - start);
              if (
                update.status === 'IN_PROGRESS' ||
                update.status === 'COMPLETED'
              ) {
                setLogs((update.logs || []).map((log) => log.message));
                // console.log(update)
              }
            },
          }
        );
        setResult(result);
        URL_RESULT = result.image.url
        console.log(URL_RESULT)

        toDataURL(URL_RESULT)
        .then(dataUrl => {
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("resulAIBase64", dataUrl)
                localStorage.setItem("faceURLResult", URL_RESULT)
            }
        
            // setTimeout(() => {
            //     router.push('/tryon/result');
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
        <main className="flex min-h-screen flex-col items-center justify-top pt-2 pb-5 px-5 lg:pt-12 lg:px-20">
            <TopLogo></TopLogo>
            <h1 className={`text-center text-xl mt-[-.7rem] lg:mt-0 lg:text-7xl lg:mb-5 text-white ${paytone_one.className}  ${numProses1 ? 'opacity-0 pointer-events-none' : ''}`}>VIRTUAL TRY ON</h1>
            {/* LOADING */}
            {numProses1 && 
                <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center flex-col'>
                    <div className='relative w-[250px] h-[78px] lg:w-[655px] lg:h-[206px] overflow-hidden'>
                        <div className='animate-loading1 absolute left-0 top-0 w-full mx-auto flex justify-center items-center pointer-events-none'>
                            <Image src='/loading.png' width={770} height={714} alt='Zirolu' className='w-full' priority />
                        </div>
                    </div>
                    <div className='animate-upDownCepet relative py-2 px-4 mt-5 lg:mt-24 lg:p-5 lg:text-2xl border-2 border-[#ffffff] text-center bg-slate-500 text-[#fff] lg:font-bold'>
                        <p>{`Please wait, loading...`}</p>
                        <p>{`Process : ${(elapsedTime / 1000).toFixed(2)} seconds (${numProses} of 2)`}</p>
                        {error}
                    </div>

                    <pre className='relative py-2 px-4 mt-5 lg:mt-24 border-2 border-[#ffffff] text-left bg-slate-500 text-[#fff] text-xs lg:text-sm overflow-auto no-scrollbar h-[100px] w-[60%] mx-auto'>
                        <code>
                        {logs.filter(Boolean).join('\n')}
                        </code>
                        AI generate face... <br></br>
                        Loading model..<br></br>
                    </pre>
                </div>
            }
            {/* LOADING */}
            {/* PILIH STYLE */}
            <div className={`relative w-full ${numProses1 ? 'opacity-0 pointer-events-none' : ''}`}>
                {/* PREVIEW CAPTURE */}
                {/* <div className='relative w-[38%] mt-2 lg:mt-4 mx-auto flex justify-center items-center pointer-events-none  border-2 border-[#ffffffs] rounded-sm'>
                    {imageFile && 
                        <Image src={imageFile}  width={200} height={200} alt='Zirolu' className='w-full' priority></Image>
                    }
                </div> */}
                <div className='relative mt-0 lg:mt-10 w-full'>
                    <div className='relative w-full mt-2 lg:mt-10'>
                        <label htmlFor="choose_style1" className="block mb-0 lg:mb-1 lg:text-3xl text-left font-bold text-white">Pick Your Style</label>
                        <div className='overflow-auto'>
                            {/* STYLE SEMENTARA */}
                            <ul className='choose'>
                            <li>
                                <input
                                id='choose_style1'
                                type="radio"
                                name='choose_style'
                                value="style1"
                                onChange={(e) => setPrompt1(e.target.value)}
                                />
                                <label htmlFor="choose_style1">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/tryon/style-1.jpeg"
                                    alt="icon"
                                    width={120}
                                    height={120}
                                    priority
                                />
                                </label>
                            </li>
                            <li>
                                <input
                                id='choose_style2'
                                type="radio"
                                name='choose_style'
                                value="style2"
                                onChange={(e) => setPrompt1(e.target.value)}
                                />
                                <label htmlFor="choose_style2">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/tryon/style-2.jpeg"
                                    alt="icon"
                                    width={120}
                                    height={120}
                                    priority
                                />
                                </label>
                            </li>
                            {/* <li>
                                <input
                                id='choose_style3'
                                type="radio"
                                name='choose_style'
                                value="alone, an astronaut is taking a photo in a spaceship with a view of the earth, high quality, highly detailed, high resolution, sharp, hyper realistic, extremely detailed"
                                onChange={(e) => setPrompt2(e.target.value)}
                                />
                                <label htmlFor="choose_style3">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/tryon/style3.png"
                                    alt="icon"
                                    width={98}
                                    height={98}
                                    priority
                                />
                                </label>
                            </li> */}
                            </ul>
                        </div>
                    </div>

                    <div className='relative w-full mb-2'>
                        <label htmlFor="base" className="block mb-2 lg:text-3xl text-left font-bold text-white">Upload Your Photo</label>
                        <div className='relative w-full'>
                            <input
                                type='file'
                                id='base'
                                name='base'
                                className={`w-full border-2 border-[#D8BA78] rounded-sm font-semibold text-base outline-none py-2 pr-1 text-white bg-black bg-opacity-[4%]'`}
                                placeholder='Base Face'
                                accept="image/*;capture=camera"
                                onChange={handleImageUpload}
                            />
                        </div>
                    </div>
                    {imageCapturePreview && 
                    <div className='relative w-full mb-6'>
                        <div className='w-full relative aspect-[3/4] overflow-hidden' id='capturePreview'>
                            <Image src={imageCapturePreview}  width={768} height={1024} alt='Zirolu' className='absolute bottom-0 left-0 block w-full'></Image>
                        </div>
                    </div>
                    }
                </div>
                {/* {prompt} */}
                {/* {promptCombine} */}
                {/* {CGF} */}
                {/* {numSteps} */}

                {imageCapturePreview &&
                    <div className="relative w-full flex justify-center items-center lg:mt-10">
                        <button className="relative mx-auto w-[70%] flex justify-center items-center" onClick={generateAI}>
                            <Image src='/btn-generate.png' width={410} height={96} alt='Zirolu' className='w-full' priority />
                        </button>
                    </div>
                }
                {/* {styleGender && stylePrompt &&
                    <div className="relative w-full flex justify-center items-center lg:mt-10">
                        <button className="relative mx-auto w-[70%] flex justify-center items-center" onClick={generateAI}>
                            <Image src='/btn-generate.png' width={410} height={96} alt='Zirolu' className='w-full' priority />
                        </button>
                    </div>
                } */}
                <a href='https://www.instagram.com/zirolu.id' target='_blank' className='block text-center text-sm lg:text-2xl mt-2 lg:mt-4 text-white'>Have your own style in mind? contact us through instagram @zirolu.id</a>
            </div>
            {/* !PILIH STYLE */}

            {/* HIDDEN BTN */}
            {/* <div className='absolute left-0 bottom-0 w-[200px] h-[200px] bg-transparent z-50 opacity-[0.025]'>
                <input
                    id='choose_gender2'
                    type="radio"
                    name='choose_gender'
                    value="woman"
                    onChange={handleGender}
                    className='w-full h-full'
                />
            </div>
            <div className='absolute right-0 bottom-0 w-[200px] h-[200px] bg-transparent z-50 opacity-[0.025]'>
                <input
                    id='choose_gender3'
                    type="radio"
                    name='choose_gender'
                    value="woman-hijab"
                    onChange={handleGender}
                    className='w-full h-full'
                />
            </div> */}
            {/* HIDDEN BTN */}
            

            {/* <div className="space-y-2">
                    <h3 className="text-xl font-light">Logs</h3>
                    {`Elapsed Time (seconds): ${(elapsedTime / 1000).toFixed(2)}`}
                    <pre className="text-sm bg-black/70 text-white/80 font-mono h-60 rounded whitespace-pre overflow-auto w-full ">
                    {logs.filter(Boolean).join('\n')}
                    </pre>
            </div> */}
        </main>
    );
}
