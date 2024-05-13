'use client';

import * as fal from '@fal-ai/serverless-client';
import Image from "next/image";
import { useEffect, useState, useMemo } from 'react';
import TopLogoDexa from "../../components/TopLogoDexa";
import { Poppins} from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ['400','700', '900'] });
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

// DATA BASE AI
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// -- moraine
// const MW = [
//     {url:'https://ai.zirolu.id/amero/style/amero/woman-0.jpeg'},
//     {url:'https://ai.zirolu.id/amero/style/amero/woman-4.jpeg'}
// ]
// !DATA BASE AI

// const DEFAULT_PROMPT = 'anime style illustration of techwear, cyborg ninja, holding a sword, wearing a mask, striking pose, all limbs appear in frame, japanese vibe, detailed design for streetwear and urban style t-shirt design, solid color background, etc pro vector';
const DEFAULT_NEG_PROMPT = 'extra head, extra face, double head, double face, (((((ugly)))), (((duplicate))), ((morbid)), ((mutilated)), [out of frame], extra fingers, mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), ((ugly)), blurry, ((bad anatomy)), (((bad proportions))), ((extra limbs)), cloned face, (((disfigured))), out of frame, ugly, extra limbs, (bad anatomy), gross proportions, (malformed limbs), ((missing arms)), ((missing legs)), (((extra arms))), (((extra legs))), mutated hands, (fused fingers), (too many fingers), (((long neck))), boobs, sexy, blurry, low resolution, low quality, pixelated, interpolated, compression artifacts, noisey, grainy';
let URL_RESULT = ''
let FACE_URL_RESULT = ''
export default function GenerateAmero() {
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
    const [styleNumber, setStyleNumber] = useState(null);
    const [character, setCharacter] = useState(null);
    const [characterURL, setCharacterURL] = useState(null);
    
    const [numProses, setNumProses] = useState(0);
    const [numProses1, setNumProses1] = useState(null);
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
        // console.log(styleGender)
        // console.log(character)
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem("gender", styleGender)
        }
        
        if(styleGender =='male'){
            setTimeout(() => {
                generateImageSwap(character, styleGender, getRandomInt(1, 4))
            }, 500);
        }else if(styleGender =='female'){
            setTimeout(() => {
                generateImageSwap(character, styleGender, getRandomInt(1, 4))
            }, 500);
        }else if(styleGender =='hijab'){
            setTimeout(() => {
                generateImageSwap(character, styleGender, getRandomInt(1, 3))
            }, 500);
        }

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

    const toDataURL = url => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
    }))


    const generateImageSwap = async (character, gender, number) => {
        // console.log(gender)
        // console.log(number)
        let genderFix = ''
        if(gender == 'male') genderFix = 'm'
        else if(gender == 'female') genderFix = 'f'
        else if(gender == 'hijab') genderFix = 'h'
        const urlGambar = 'https://ai.zirolu.id/dexa/style/neww-'+genderFix+'-'+number+'.jpeg'
        // const urlGambar = character;
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
                // swap_image_url: '/amero/base/'+character
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
                router.push('/dexa/result');
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
        <main className="flex fixed h-full w-full bg-dexa overflow-auto flex-col items-center justify-top pt-7 pb-5 px-5 lg:pt-12 lg:px-20">
            <TopLogoDexa></TopLogoDexa>
            <h1 className={`text-center text-4xl font-bold mt-5 mb-10 ${poppins.className} ${numProses1 ? 'opacity-0 pointer-events-none' : ''}`}>CHOOSE GENDER</h1>
            {/* LOADING */}
            {numProses1 && 
                <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center flex-col'>
                    {/* <div className='relative w-[250px] h-[78px] lg:w-[655px] lg:h-[206px] overflow-hidden'>
                        <div className='animate-loading1 absolute left-0 top-0 w-full mx-auto flex justify-center items-center pointer-events-none'>
                            <Image src='/loading.png' width={770} height={714} alt='Zirolu' className='w-full' priority />
                        </div>
                    </div> */}
                    {/* <div className='relative w-[80%] overflow-hidden'>
                        <div className='relative w-full'>
                            <Image src='/dexa/fun-fact.png' width={770} height={542} alt='Zirolu' className='w-full' priority />
                        </div>
                    </div> */}
                    <div className='animate-upDownCepet relative py-2 px-4 mt-8 lg:mt-24 lg:p-5 text-2xl border-2 border-[#ECA506] text-center bg-[#FCDF7D] text-[#000] lg:font-bold rounded-lg'>
                        <p>{`Please wait, loading...`}</p>
                        <p>{`Process : ${(elapsedTime / 1000).toFixed(2)} seconds (${numProses} of 2)`}</p>
                        {error}
                    </div>

                    <pre className='relative py-2 px-4 mt-8 lg:mt-24 border-2 border-[#ECA506] text-left bg-[#FCDF7D] text-[#000] text-base lg:text-3xl overflow-auto no-scrollbar h-[100px] w-[60%] mx-auto rounded-lg'>
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
                    <div className='relative w-full hiddenx'>
                        {/* <label htmlFor="choose_gender" className={`block mb-5 lg:mb-5 text-2xl lg:text-5xl text-center font-bold text-white ${poppins.className}`}>I am</label> */}
                        <div>
                            {/* GENDER FIX */}
                            <ul className='choose mod2'>
                                <li>
                                    <input
                                    id='choose_gender1'
                                    type="radio"
                                    name='choose_gender'
                                    value="male"
                                    onChange={(e) => setStyleGender(e.target.value)}
                                    />
                                    <label htmlFor="choose_gender1">
                                    <Image
                                        className="relative h-auto w-full"
                                        src="/dexa/gender-1.png"
                                        alt="icon"
                                        width={336}
                                        height={407}
                                        priority
                                    />
                                    </label>
                                </li>
                                <li>
                                    <input
                                    id='choose_gender2'
                                    type="radio"
                                    name='choose_gender'
                                    value="female"
                                    onChange={(e) => setStyleGender(e.target.value)}
                                    />
                                    <label htmlFor="choose_gender2">
                                    <Image
                                        className="relative h-auto w-full"
                                        src="/dexa/gender-2.png"
                                        alt="icon"
                                        width={336}
                                        height={407}
                                        priority
                                    />
                                    </label>
                                </li>
                                <li>
                                    <input
                                    id='choose_gender3'
                                    type="radio"
                                    name='choose_gender'
                                    value="hijab"
                                    onChange={(e) => setStyleGender(e.target.value)}
                                    />
                                    <label htmlFor="choose_gender3">
                                    <Image
                                        className="relative h-auto w-full"
                                        src="/dexa/gender-3.png"
                                        alt="icon"
                                        width={336}
                                        height={407}
                                        priority
                                    />
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {/* {prompt} */}
                {/* {promptCombine} */}
                {/* {CGF} */}
                {/* {numSteps} */}

                {styleGender &&
                    <div className="relative w-full flex justify-center items-center mt-5 lg:mt-10">
                        <button className="relative mx-auto w-[70%] flex justify-center items-center" onClick={generateAI}>
                            <Image src='/dexa/btn-generate.png' width={479} height={96} alt='Zirolu' className='w-full' priority />
                        </button>
                    </div>
                }
                
                {/* <h1 className={`text-center text-sm font-bold mt-8 lg:mt-0 lg:text-5xl ${poppins.className}`}>GET THIS STYLE</h1>
                <div className='relative w-full mt-2 mb-10'>
                    <Image src='/kai/list-style-new-1.png' width={1752} height={297} alt='Zirolu' className='w-full' priority />
                    <Image src='/kai/list-style-new-2.png' width={1752} height={297} alt='Zirolu' className='w-full mt-2' priority />
                </div> */}
                {/* {styleGender && stylePrompt &&
                    <div className="relative w-full flex justify-center items-center lg:mt-10">
                        <button className="relative mx-auto w-[70%] flex justify-center items-center" onClick={generateAI}>
                            <Image src='/btn-generate.png' width={410} height={96} alt='Zirolu' className='w-full' priority />
                        </button>
                    </div>
                } */}
                {/* <a href='https://www.instagram.com/zirolu.id' target='_blank' className='block text-center text-sm lg:text-2xl mt-2 lg:mt-4 text-white'>Have your own style in mind? contact us through instagram @zirolu.id</a> */}
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
