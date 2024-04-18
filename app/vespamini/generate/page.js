'use client';

import * as fal from '@fal-ai/serverless-client';
import Image from "next/image";
import { useEffect, useState, useMemo } from 'react';
import TopLogo from "../../components/TopLogo";
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
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// SETUP SOCKET
// let SERVER_IP = "https://ag.socket.web.id:11100";
// let NETWORK = null;

// function emitNetworkConnection() {
//    NETWORK = io(SERVER_IP, {
//       withCredentials: false,
//       transoirtOptions: {
//          pooling: {
//             extraHeaders: {
//                "my-custom-header": "ag-socket",
//             },
//          },
//       },
//    });
// }

// function emitString(key, payload) {
//    NETWORK.emit(key, payload);
// }
// !SETUP SOCKET

// const DEFAULT_PROMPT = 'anime style illustration of techwear, cyborg ninja, holding a sword, wearing a mask, striking pose, all limbs appear in frame, japanese vibe, detailed design for streetwear and urban style t-shirt design, solid color background, etc pro vector';
const DEFAULT_NEG_PROMPT = 'extra head, extra face, double head, double face, (((((ugly)))), (((duplicate))), ((morbid)), ((mutilated)), [out of frame], extra fingers, mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), ((ugly)), blurry, ((bad anatomy)), (((bad proportions))), ((extra limbs)), cloned face, (((disfigured))), out of frame, ugly, extra limbs, (bad anatomy), gross proportions, (malformed limbs), ((missing arms)), ((missing legs)), (((extra arms))), (((extra legs))), mutated hands, (fused fingers), (too many fingers), (((long neck))), boobs, sexy, blurry, low resolution, low quality, pixelated, interpolated, compression artifacts, noisey, grainy';
let URL_RESULT = ''
let FACE_URL_RESULT = ''
export default function Register() {
    const router = useRouter();
    const [prompt, setPrompt] = useState(null);

    const [prompt1, setPrompt1] = useState();
    const [prompt2, setPrompt2] = useState();
    let promptCombine = prompt1 + prompt2;

    const negative_prompt = DEFAULT_NEG_PROMPT;
    const [imageFile, setImageFile] = useState(null);
    const [CGF, setCGF] = useState(13);
    const [numSteps, setNumSteps] = useState(80);
    const [styleGender, setStyleGender] = useState(null);
    const [stylePrompt, setStylePrompt] = useState(null);
    const [character, setCharacter] = useState(null);
    
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
    useEffect(() => {
        // Perform localStorage action
        if (typeof localStorage !== 'undefined') {
            const item = localStorage.getItem('faceImage')
            setImageFile(item)
        }
    }, [imageFile])

    const generateAI = () => {
        setNumProses1(true)
        setTimeout(() => {
            // generateImage()
            generateImageSwap()
        }, 500);
    }

    const image = useMemo(() => {
      if (!result) {
        return null;
      }
      if (result.image) {
        return result.image;
      }
      
    }, [result]);
    const imageFaceSwap = useMemo(() => {
      if (!resultFaceSwap) {
        return null;
      }
      if (resultFaceSwap.image) {
        return resultFaceSwap.image;
      }
      return null;
    }, [resultFaceSwap]);
    
    const reset = () => {
      setLoading(false);
      setError(null);
      setResult(null);
      setResultFaceSwap(null);
      setLogs([]);
      setElapsedTime(0);
    };
    const reset2 = () => {
      setLoading(false);
      setError(null);
      // setLogs([]);
      setElapsedTime(0);
    };
  
    const generateImage = async () => {
        setNumProses(1)
      reset();
      // @snippet:start("client.queue.subscribe")
      setLoading(true);
      const start = Date.now();
      try {
        const result = await fal.subscribe(
          'fal-ai/ip-adapter-face-id',
          {
            input: {
              prompt: promptCombine,
              face_image_url: imageFile,
              negative_prompt,
              guidance_scale: CGF,
              num_inference_steps: numSteps,
              width: 624,
              height: 1024
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
                // console.log(update)
              }
            },
          }
        );
        setResult(result);
        URL_RESULT = result.image.url
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem("generateURLResult", URL_RESULT)
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
        setElapsedTime(Date.now() - start);
        generateImageSwap()
      }
      // @snippet:end
    };

    const toDataURL = url => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
    }))


    const generateImageSwap = async () => {
        let urlGambar = ''
        if(prompt1 == 'vespa'){
            urlGambar = 'https://ai.zirolu.id/vespamini/vespamini-'+getRandomInt(1, 6)+'.jpeg';
        }else{
            urlGambar = 'https://ai.zirolu.id/vespamini/vespamini-'+getRandomInt(7, 8)+'.jpeg';
        }
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
                // base_image_url: URL_RESULT,
                // swap_image_url: '/avatar/base/'+character
                base_image_url: urlGambar,
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

        // emitStrsing("sendImage", result.image.url);

        toDataURL(FACE_URL_RESULT)
        .then(dataUrl => {
            // console.log('RESULT:', dataUrl)

            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("resulAIBase64", dataUrl)
                localStorage.setItem("faceURLResult", FACE_URL_RESULT)
            }
        
            setTimeout(() => {
                router.push('/vespamini/result');
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

    return (
        <main className="flex fixed h-full w-full bg overflow-auto flex-col items-center justify-top pt-2 pb-5 px-5 lg:pt-12 lg:px-20">
            <TopLogo></TopLogo>
            <h1 className={`text-center text-xl mt-[-.7rem] lg:mt-0 lg:text-7xl lg:mb-5 text-white ${paytone_one.className}  ${numProses1 ? 'opacity-0 pointer-events-none' : ''}`}>CHOOSE YOUR BRAND</h1>
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
                <div className='relative mt-2 lg:mt-10 w-full'>
                <div className='relative w-full mb-5'>
                        <label htmlFor="choose_gender" className="block mb-2 lg:mb-4 lg:text-3xl text-center font-bold text-white">Brand you are</label>
                        <div>
                            {/* GENDER SEMENTARA */}
                            <ul className='choose mod'>
                                <li>
                                    <input
                                    id='choose_gender1'
                                    type="radio"
                                    name='choose_gender'
                                    value="vespa"
                                    onChange={(e) => setPrompt1(e.target.value)}
                                    />
                                    <label htmlFor="choose_gender1">
                                    <Image
                                        className="relative h-auto w-full"
                                        src="/vespamini/c-vespa.jpeg"
                                        alt="icon"
                                        width={365}
                                        height={298}
                                        priority
                                    />
                                    </label>
                                </li>
                                <li>
                                    <input
                                    id='choose_gender2'
                                    type="radio"
                                    name='choose_gender'
                                    value="mini"
                                    onChange={(e) => setPrompt1(e.target.value)}
                                    />
                                    <label htmlFor="choose_gender2">
                                    <Image
                                        className="relative h-auto w-full"
                                        src="/vespamini/c-mini.jpeg"
                                        alt="icon"
                                        width={365}
                                        height={298}
                                        priority
                                    />
                                    </label>
                                </li>
                                {/* <li>
                                    <input
                                    id='choose_gender1'
                                    type="radio"
                                    name='choose_gender'
                                    value="m"
                                    onChange={(e) => setPrompt1(e.target.value)}
                                    />
                                    <label htmlFor="choose_gender1" className='lg:text-2xl'>Man</label>
                                </li>
                                <li>
                                    <input
                                    id='choose_gender2'
                                    type="radio"
                                    name='choose_gender'
                                    value="w"
                                    onChange={(e) => setPrompt1(e.target.value)}
                                    />
                                    <label htmlFor="choose_gender2" className='lg:text-2xl'>Woman</label>
                                </li> */}
                            </ul>
                        </div>
                    </div>
                </div>
                {/* {prompt} */}
                {/* {promptCombine} */}
                {/* {CGF} */}
                {/* {numSteps} */}

                {prompt1 &&
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
