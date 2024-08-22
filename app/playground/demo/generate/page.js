'use client';

import * as fal from '@fal-ai/serverless-client';
import Image from "next/image";
import { useEffect, useState, useMemo } from 'react';
import TopLogo from "../../../components/TopLogo";
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
const DEFAULT_NEG_PROMPT = 'flaws in the eyes, flaws in the face, flaws, lowres, non-HDRi, low quality, worst quality,artifacts noise, text, watermark, glitch, deformed, mutated, ugly, disfigured, hands, low resolution, partially rendered objects,  deformed or partially rendered eyes, deformed, deformed eyeballs, cross-eyed,blurry';
let URL_RESULT = ''
let FACE_URL_RESULT = ''
// let fixSeed = ''
let FIXSEEDPILIH = 0, PROMPTFIX = '', CGFFIX = 0, NUMFIX = 50;
let promptArea = [
    {
        gender:"male",
        prompt:[
            {
                text:"A male punk band vocalist posing with the crowd at a punk music festival. The vocalist is standing on top of a stage speaker, facing away from the audience. He's wearing a black sleeveless shirt, showing off full tattoo sleeves on his right arm. He has a  long hair, and a nose piercing. The background is captured in a bokeh style, enhancing the focus on the vocalist while the excited crowd creates a lively atmosphere.",
                seed:12050
            },
            {
                text:"A long-haired rocker standing on stage atop a speaker, holding a black guitar, striking a powerful pose. The audience faces him with excitement, captured during a rock festival. He's wearing a black sleeveless shirt that shows off tattoos on his right arm. The camera is positioned at a high angle, capturing the entire scene with the vibrant stage lighting enhancing the intensity of the moment.",
                seed:1304713047
            },
            {
                text:"A male drummer from a metal band, dressed in a black sleeveless shirt, with tattoos covering his arms, long hair like a true metalhead, and large gauge earrings. His appearance is styled like a metal punk rocker, with intense makeup and accessories. Captured mid-performance, he's powerfully striking the drums with full energy. The scene is set in a nighttime metal concert with grand stage lighting, adding to the electrifying atmosphere. The camera angle is taken from below, emphasizing his commanding presence on stage.",
                seed:137
            },
            {
                text:"Photorealistic image of a cruel rocker performing on stage, playing an black electric guitar with intense focus. The stage lighting is dark and moody, with subtle spotlights highlighting the musician. The rocker has tattooed arms visible under his black leather jacket, which contrasts against the dimly lit background. The atmosphere is charged with energy, with faint silhouettes of the audience in the background. The camera captures a mid-shot, emphasizing the musician's expressive movements and the intricate details of his guitar. The scene is rendered in high resolution, with a dramatic and gritty tone, using HDR and cinematic effects",
                seed:13048
            },
            {
                text:"Photorealistic image of a rocker performing on stage, playing an black electric guitar with intense focus. The audience faces him with excitement, captured during a rock festival.  The rocker has tattooed arms visible under his black leather jacket, which contrasts against the dimly lit background. The atmosphere is charged with energy, with faint silhouettes of the audience in the background. The camera captures a mid-shot, emphasizing the musician's expressive movements and the intricate details of his guitar. The scene is rendered in high resolution, with a dramatic and gritty tone, using HDR and cinematic effects",
                seed:13042
            },
            {
                text:"A long-haired cruel rocker standing on stage atop a speaker, holding a black guitar, striking a powerful pose. The audience faces him with excitement, captured during a rock festival. He's wearing a black leather jacket that shows off tattoos on his face. The camera is positioned at a high angle, capturing the entire scene with the vibrant stage lighting enhancing the intensity of the moment.",
                seed:1304713047
            },
            {
                text:"Photorealistic image of a cruel rocker shows off tattoos on his chest and arms on stage, playing an black electric guitar with intense focus. The audience faces him with excitement, captured during a rock festival. The rocker has tattooed arms visible under his black leather jacket, which contrasts against the dimly lit background.  The atmosphere is charged with energy, with faint silhouettes of the audience in the background. The camera captures a mid-shot, emphasizing the musician's expressive movements and the intricate details of his guitar. The scene is rendered in high resolution, with a dramatic and gritty tone, using HDR and cinematic effects",
                seed:13042
            },
        ]
    },
    {
        gender:"female",
        prompt:[
            {
                text:"A female punk band vocalist posing with the crowd at a punk music festival. The vocalist is standing on top of a stage speaker, facing away from the audience. sHe’s wearing a black sleeveless shirt, showing off full tattoo sleeves on his right arm. sHe has a  long hair, and a nose piercing. The background is captured in a bokeh style, enhancing the focus on the vocalist while the excited crowd creates a lively atmosphere.",
                seed:12050
            },
            {
                text:"A long-haired female rocker standing on stage atop a speaker, holding a black guitar, striking a powerful pose. The audience faces her with excitement, captured during a rock festival. He's wearing a black sleeveless shirt that shows off tattoos on her right arm. The camera is positioned at a high angle, capturing the entire scene with the vibrant stage lighting enhancing the intensity of the moment.",
                seed:13047
            },
            {
                text:"A female drummer from a metal band, dressed in a black sleeveless shirt, with tattoos covering her arms, long hair like a true metalhead, and large gauge earrings. her appearance is styled like a metal punk rocker, with intense makeup and accessories. Captured mid-performance, she's powerfully striking the drums with full energy. The scene is set in a nighttime metal concert with grand stage lighting, adding to the electrifying atmosphere. The camera angle is taken from below, emphasizing her commanding presence on stage.",
                seed:12047
            }
        ]
    }
]

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export default function Register() {
    const router = useRouter();

    const [prompt1, setPrompt1] = useState();
    const [prompt, setPrompt] = useState(null);
    const [promptNegative, setPromptNegative] = useState(DEFAULT_NEG_PROMPT);
    const [CGF, setCGF] = useState(1.2);
    const [IDScale, setIDScale] = useState(0.8);
    const [SEED, setSEED] = useState(13047);
    const [numSteps, setNumSteps] = useState(4);

    // const negative_prompt = DEFAULT_NEG_PROMPT;
    const [imageFile, setImageFile] = useState(null);
    const [fixSeed, setFixSeed] = useState(null);
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
    useEffect(() => {
        // Perform localStorage action
        if (typeof localStorage !== 'undefined') {
            const item = localStorage.getItem('faceImage')
            setImageFile(item)
        }
    }, [imageFile])

    const generateAI = () => {
        setNumProses1(true)
        if(prompt1 == 'Man'){
            PROMPTFIX = promptArea[0].prompt[getRandomInt(0,6)].text
            FIXSEEDPILIH = promptArea[0].prompt[getRandomInt(0,6)].seed
            // PROMPTFIX = promptArea[0].prompt[4].text
            // FIXSEEDPILIH = promptArea[0].prompt[4].seed
        }else{
            PROMPTFIX = promptArea[1].prompt[getRandomInt(0,2)].text
            FIXSEEDPILIH = promptArea[1].prompt[getRandomInt(0,2)].seed
        }

        setTimeout(() => {
            generateImage()
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
        console.log(PROMPTFIX)
        console.log(FIXSEEDPILIH)
        setNumProses(1)
      reset();
      // @snippet:start("client.queue.subscribe")
      setLoading(true);
      const start = Date.now();
      try {
        const result = await fal.subscribe(
            'fal-ai/pulid',{
            input: {
                reference_images: [{
                        "image_url": imageFile
                    },
                    {
                        "image_url": imageFile
                    },
                    {
                        "image_url": imageFile
                    },
                    {
                        "image_url": imageFile
                    }
                ],
                prompt: PROMPTFIX,
                negative_prompt: promptNegative,
                seed: FIXSEEDPILIH,
                num_images: 1,
                guidance_scale: CGF,
                num_inference_steps: numSteps,
                image_size: {
                    height: 1024,
                    width: 768
                },
                id_scale: IDScale,
                mode: "fidelity"
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
        URL_RESULT = result.images[0].url;
        console.log(URL_RESULT)
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
                base_image_url: URL_RESULT,
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
                router.push('/playground/demo/result');
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
        <main className="flex min-h-screen flex-col items-center justify-top pt-2 pb-5 px-5 lg:pt-12 lg:px-20">
            <TopLogo></TopLogo>
            <h1 className={`text-center text-xl mt-[-.7rem] lg:mt-0 lg:text-7xl lg:mb-5 text-white ${paytone_one.className}  ${numProses1 ? 'opacity-0 pointer-events-none' : ''}`}>CHOOSE YOUR STYLE</h1>
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
                    <div className='relative w-full'>
                        <label htmlFor="choose_gender" className="block mb-2 lg:mb-4 lg:text-3xl text-center font-bold text-white">Your are</label>
                        <div>
                            {/* GENDER SEMENTARA */}
                            <ul className='choose2'>
                                <li>
                                    <input
                                    id='choose_gender1'
                                    type="radio"
                                    name='choose_gender'
                                    value="Man"
                                    onChange={(e) => setPrompt1(e.target.value)}
                                    />
                                    <label htmlFor="choose_gender1" className='lg:text-2xl'>Man</label>
                                </li>
                                <li>
                                    <input
                                    id='choose_gender2'
                                    type="radio"
                                    name='choose_gender'
                                    value="Woman"
                                    onChange={(e) => setPrompt1(e.target.value)}
                                    />
                                    <label htmlFor="choose_gender2" className='lg:text-2xl'>Woman</label>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                {prompt}
                {/* {promptCombine} */}
                {/* {CGF} */}
                {/* {numSteps} */}

                {prompt1 &&
                    <div className="relative w-full flex justify-center items-center mt-5">
                        <button className="relative mx-auto w-[70%] flex justify-center items-center" onClick={generateAI}>
                            <Image src='/btn-generate.png' width={410} height={96} alt='Zirolu' className='w-full' priority />
                        </button>
                    </div>
                }
                <a href='https://www.instagram.com/zirolu.id' target='_blank' className='block text-center text-sm lg:text-2xl mt-2 lg:mt-4 text-white'>Have your own style in mind? contact us through instagram @zirolu.id</a>
            </div>
            {/* !PILIH STYLE */}

        </main>
    );
}
