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
const DEFAULT_PROMPT = "A photorealistic man 28 years old standing on a beach with a backdrop featuring a caravan, palm trees, and vibrant tropical colors of purple, orange, and yellow. The scene captures the warmth and energy of a tropical paradise, with the colors blending beautifully into the sunset, creating a lively and exotic atmosphere. The man is dressed casually, embodying the relaxed vibe of the beach setting. The camera is positioned at a slight low angle, capturing the vastness of the mountain range and the woman's determined expression. Shot with a wide-angle lens for a dramatic, immersive effect. HDR, 8K resolution, hyper-detailed."
const DEFAULT_NEG_PROMPT = 'bikini, sexy, boobs, flaws in the eyes, flaws in the face, flaws, lowres, non-HDRi, low quality, worst quality,artifacts noise, text, watermark, glitch, deformed, mutated, ugly, disfigured, hands, low resolution, partially rendered objects,  deformed or partially rendered eyes, deformed, deformed eyeballs, cross-eyed,blurry';
let URL_RESULT = ''
let FACE_URL_RESULT = ''
// let fixSeed = ''
let FIXSEEDPILIH = 0, PROMPTFIX = '', CGFFIX = 0, NUMFIX = 50;
let promptArea = [
    {
        gender:"male",
        prompt:[
            {
                text:"Photorealistic image of a rocker performing on stage, playing an black electric guitar with intense focus. The stage lighting is dark and moody, with subtle spotlights highlighting the musician. The rocker has tattooed arms visible under his black t-shirt, which contrasts against the dimly lit background. The atmosphere is charged with energy, with faint silhouettes of the audience in the background. The camera captures a mid-shot, emphasizing the musician's expressive movements and the intricate details of his guitar. The scene is rendered in high resolution, with a dramatic and gritty tone, using HDR and cinematic effects",
                cfg:1.2, seed:13047, num:50
            },
            {
                text:"Photorealistic image of a male vocalist of a metal rock band posing for a photo with a crowd of energetic fans jumping in the background during a nighttime concert. The stage is illuminated with intense, full lighting, capturing the electrifying atmosphere of the metal rock show. The rocker has tattooed arms visible under his black t-shirt, which contrasts against the dimly lit background. The atmosphere is charged with energy, with faint silhouettes of the audience in the background. The camera captures a mid-shot, emphasizing the musician's expressive movements and the intricate details of his guitar. The scene is rendered in high resolution, with a dramatic and gritty tone, using HDR and cinematic effects",
                cfg:1.2, seed:13047, num:50
            },
            {
                text:"Photorealistic image of a male vocalist of a metal rock band posing for a photo with a crowd of energetic fans jumping in the background during a nighttime concert. The stage is illuminated with intense, full lighting, capturing the electrifying atmosphere of the metal rock show. The rocker has tattooed arms visible under his black t-shirt, which contrasts against the dimly lit background. The atmosphere is charged with energy, with faint silhouettes of the audience in the background. The camera captures a mid-shot, emphasizing the musician's expressive movements and the intricate details of his guitar. The scene is rendered in high resolution, with a dramatic and gritty tone, using HDR and cinematic effects",
                cfg:1.2, seed:12047, num:50
            },
            {
                text:"Photorealistic image of a male vocalist of a metal rock band screaming into the microphone on stage posing for a photo with a crowd of energetic fans jumping in the background during a nighttime concert. The stage is illuminated with intense, full lighting, capturing the electrifying atmosphere of the metal rock show. The rocker has tattooed arms visible under his black t-shirt, which contrasts against the dimly lit background. The atmosphere is charged with energy, with faint silhouettes of the audience in the background. The camera captures a mid-shot, emphasizing the musician's expressive movements and the intricate details of his guitar. The scene is rendered in high resolution, with a dramatic and gritty tone, using HDR and cinematic effects",
                cfg:1.2, seed:12057, num:50
            },
            {
                text:"Photorealistic image of a male vocalist of a metal rock band screaming into the microphone on stage posing for a photo with a crowd of energetic fans jumping in the background during a nighttime concert. The stage is illuminated with intense, full lighting, capturing the electrifying atmosphere of the metal rock show. The rocker has tattooed arms visible under his black t-shirt, which contrasts against the dimly lit background. The atmosphere is charged with energy, with faint silhouettes of the audience in the background. The camera captures a mid-shot, emphasizing the musician's expressive movements and the intricate details of his guitar. The scene is rendered in high resolution, with a dramatic and gritty tone, using HDR and cinematic effects",
                cfg:1.2, seed:12047, num:50
            },
            {
                text:"A rocker with a black guitar standing on stage, striking a powerful pose with the crowd of festival-goers facing him. The scene captures the energy of a rock festival, with the rocker wearing a black shirt and showcasing tattoos on his right arm. The setting is dark, emphasizing the intense atmosphere of the night, with the crowd immersed in the music.high angle shot",
                cfg:1.2, seed:13149, num:50
            },
            {
                text:"Photorealistic image of a rocker  holding an black electric guitar for a photo with a massive crowd of fans in the background at a metal music concert. dressed in black t-shirt, edgy attire, stand confidently, surrounded by the intense energy of the concert. The festival atmosphere is filled with the sounds of heavy music, and the crowd is fully immersed in the experience, creating a powerful and dynamic scene.The scene is rendered in high resolution, with a dramatic and gritty tone, using HDR and cinematic effects",
                cfg:1.2, seed:13047, num:50
            },
            {
                text:"A black shirt metal band drummer with tattoos, captured in the moment of striking the drums during an intense metal concert. The scene is set at night, with a grand stage illuminated by powerful lighting. The drummer's energy and focus are palpable, with his tattoos reflecting the vivid lights of the stage, creating. 0,5 shot angle, drum set visible",
                cfg:1.2, seed:12047, num:50
            }
        ]
    },
    {
        gender:"female",
        prompt:[
            {
                text:"Photorealistic image of a woman rocker performing on stage, playing an black electric guitar with intense focus. The stage lighting is dark and moody, with subtle spotlights highlighting the musician. The rocker has tattooed arms visible under his black t-shirt, which contrasts against the dimly lit background. The atmosphere is charged with energy, with faint silhouettes of the audience in the background. The camera captures a mid-shot, emphasizing the musician's expressive movements and the intricate details of his guitar. The scene is rendered in high resolution, with a dramatic and gritty tone, using HDR and cinematic effects",
                cfg:1.2, seed:13047, num:50
            },
            {
                text:"Photorealistic image of a female vocalist of a metal rock band posing for a photo with a crowd of energetic fans jumping in the background during a nighttime concert. The stage is illuminated with intense, full lighting, capturing the electrifying atmosphere of the metal rock show. The rocker has tattooed arms visible under his black t-shirt, which contrasts against the dimly lit background. The atmosphere is charged with energy, with faint silhouettes of the audience in the background. The camera captures a mid-shot, emphasizing the musician's expressive movements and the intricate details of his guitar. The scene is rendered in high resolution, with a dramatic and gritty tone, using HDR and cinematic effects",
                cfg:1.2, seed:13047, num:50
            },
            {
                text:"Photorealistic image of a female vocalist of a metal rock band posing for a photo with a crowd of energetic fans jumping in the background during a nighttime concert. The stage is illuminated with intense, full lighting, capturing the electrifying atmosphere of the metal rock show. The rocker has tattooed arms visible under his black t-shirt, which contrasts against the dimly lit background. The atmosphere is charged with energy, with faint silhouettes of the audience in the background. The camera captures a mid-shot, emphasizing the musician's expressive movements and the intricate details of his guitar. The scene is rendered in high resolution, with a dramatic and gritty tone, using HDR and cinematic effects",
                cfg:1.2, seed:12047, num:50
            },
            {
                text:"Photorealistic image of a female vocalist of a metal rock band screaming into the microphone on stage posing for a photo with a crowd of energetic fans jumping in the background during a nighttime concert. The stage is illuminated with intense, full lighting, capturing the electrifying atmosphere of the metal rock show. The rocker has tattooed arms visible under his black t-shirt, which contrasts against the dimly lit background. The atmosphere is charged with energy, with faint silhouettes of the audience in the background. The camera captures a mid-shot, emphasizing the musician's expressive movements and the intricate details of his guitar. The scene is rendered in high resolution, with a dramatic and gritty tone, using HDR and cinematic effects",
                cfg:1.2, seed:12057, num:50
            },
            {
                text:"Photorealistic image of a female vocalist of a metal rock band screaming into the microphone on stage posing for a photo with a crowd of energetic fans jumping in the background during a nighttime concert. The stage is illuminated with intense, full lighting, capturing the electrifying atmosphere of the metal rock show. The rocker has tattooed arms visible under his black t-shirt, which contrasts against the dimly lit background. The atmosphere is charged with energy, with faint silhouettes of the audience in the background. The camera captures a mid-shot, emphasizing the musician's expressive movements and the intricate details of his guitar. The scene is rendered in high resolution, with a dramatic and gritty tone, using HDR and cinematic effects",
                cfg:1.2, seed:12047, num:50
            },
            {
                text:"A woman rocker with a black guitar standing on stage, striking a powerful pose with the crowd of festival-goers facing him. The scene captures the energy of a rock festival, with the rocker wearing a black shirt and showcasing tattoos on his right arm. The setting is dark, emphasizing the intense atmosphere of the night, with the crowd immersed in the music.high angle shot",
                cfg:1.2, seed:13149, num:50
            },
            {
                text:"Photorealistic image of a woman rocker  holding an black electric guitar for a photo with a massive crowd of fans in the background at a metal music concert. dressed in black t-shirt, edgy attire, stand confidently, surrounded by the intense energy of the concert. The festival atmosphere is filled with the sounds of heavy music, and the crowd is fully immersed in the experience, creating a powerful and dynamic scene.The scene is rendered in high resolution, with a dramatic and gritty tone, using HDR and cinematic effects",
                cfg:1.2, seed:120437, num:50
            },
            {
                text:"A woman black sexy shirt metal band drummer with tattoos, captured in the moment of striking the drums during an intense metal concert. The scene is set at night, with a grand stage illuminated by powerful lighting. The drummer's energy and focus are palpable, with his tattoos reflecting the vivid lights of the stage, creating. 0,5 shot angle, drum set visible",
                cfg:1.2, seed:13047, num:50
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
   
  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [promptNegative, setPromptNegative] = useState(DEFAULT_NEG_PROMPT);
  const [CGF, setCGF] = useState(1.2);
  const [IDScale, setIDScale] = useState(0.8);
  const [SEED, setSEED] = useState(13047);
  const [numSteps, setNumSteps] = useState(4);
  const [width, setWidth] = useState(768);
  const [height, setHeight] = useState(768);
  

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
    // useEffect(() => {
    //     // Perform localStorage action
    //     if (typeof localStorage !== 'undefined') {
    //         const item = localStorage.getItem('faceImage')
    //         setImageFile(item)
    //     }
    // }, [imageFile])

    const generateAI = () => {
        setNumProses1(true)
        // if(prompt1 == 'Man'){
        //     PROMPTFIX = promptArea[0].prompt[getRandomInt(0,7)].text
        //     CGFFIX = promptArea[0].prompt[getRandomInt(0,7)].cfg
        //     FIXSEEDPILIH = promptArea[0].prompt[getRandomInt(0,7)].seed
        //     NUMFIX = promptArea[0].prompt[getRandomInt(0,7)].num
        // }else{
        //     PROMPTFIX = promptArea[1].prompt[getRandomInt(0,7)].text
        //     CGFFIX = promptArea[1].prompt[getRandomInt(0,7)].cfg
        //     FIXSEEDPILIH = promptArea[1].prompt[getRandomInt(0,7)].seed
        //     NUMFIX = promptArea[1].prompt[getRandomInt(0,7)].num
        // }

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
        // console.log(PROMPTFIX)
        // console.log(CGFFIX)
        // console.log(NUMFIX)
        // console.log(FIXSEEDPILIH)
        setNumProses(1)
      reset();
      // @snippet:start("client.queue.subscribe")
      setLoading(true);
      const start = Date.now();
      const url = await fal.storage.upload(imageFile);
      console.log(url)
      try {
        const result = await fal.subscribe(
          'fal-ai/pulid',
          {
            input: {
                reference_images: [{
                    "image_url": url
                  },
                  {
                    "image_url": url
                  },
                  {
                    "image_url": url
                  },
                  {
                    "image_url": url
                }],
                prompt: prompt,
                negative_prompt: promptNegative,
                seed: SEED,
                num_images: 1,
                guidance_scale: CGF,
                num_inference_steps: numSteps,
                image_size: {
                    height: width,
                    width: height
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
        // console.log(result.images[0].url)
        URL_RESULT = result.images[0].url
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
                router.push('/playground/result2');
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


                <div className='relative w-full mb-4'>
                    <label htmlFor="image_url" className="block mb-2 text-current font-bold">Input Your Photos</label>
                    <div className="flex w-full items-center border-2 border-white font-bold shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]">
                        <input
                        className="w-full p-[10px] outline-none"
                        id="image_url"
                        name="image_url"
                        type="file"
                        placeholder="Choose a file"
                        accept="image/*;capture=camera"
                        onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                        />
                    </div>
                </div>
                <div className="w-full mb-4">
                    <label htmlFor="prompt" className="block mb-2 text-current font-bold">Prompt</label>
                    <div className="flex w-full items-center border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <textarea
                        className="w-full text-lg p-2 rounded bg-black/10 dark:bg-white/5 border border-black/20 dark:border-white/10 h-[150px]"
                        id="prompt"
                        name="prompt"
                        placeholder="Imagine..."
                        value={prompt}
                        autoComplete="off"
                        onChange={(e) => setPrompt(e.target.value)}
                        onBlur={(e) => setPrompt(e.target.value.trim())}
                    />
                    </div>
                </div>
                <div className="w-full mb-4">
                    <label htmlFor="promptNegative" className="block mb-2 text-current font-bold">Negative Prompt</label>
                    <div className="flex w-full items-center border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <textarea
                        className="w-full text-lg p-2 rounded bg-black/10 dark:bg-white/5 border border-black/20 dark:border-white/10 h-[150px]"
                        id="promptNegative"
                        name="promptNegative"
                        placeholder="Imagine..."
                        value={promptNegative}
                        autoComplete="off"
                        onChange={(e) => setPromptNegative(e.target.value)}
                        onBlur={(e) => setPromptNegative(e.target.value.trim())}
                    />
                    </div>
                </div>
                <div className='w-full mb-4'>
                    <label htmlFor="cgf" className="block mb-2  mt-4 text-current font-bold">Seed</label>
                    <div className="flex w-full items-center border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <input
                        className="w-full p-[10px] outline-none text-black"
                        id="seed"
                        name="seed"
                        type="number"
                        placeholder="Ex : 7"
                        value={SEED}
                        onChange={(e) => setSEED(parseFloat(e.target.value))}
                    />
                    </div>
                </div>
                <div className='w-full mb-4'>
                    <label htmlFor="width" className="block mb-2  mt-4 text-current font-bold">Width : width hasil export (dalam pixels)</label>
                    <div className="flex w-full items-center border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <input
                        className="w-full p-[10px] outline-none text-black"
                        id="width"
                        name="width"
                        type="number"
                        placeholder="Ex : 768"
                        value={width}
                        onChange={(e) => setWidth(parseFloat(e.target.value))}
                    />
                    </div>
                </div>
                <div className='w-full mb-4'>
                    <label htmlFor="height" className="block mb-2  mt-4 text-current font-bold">Height : height hasil export (dalam pixels)</label>
                    <div className="flex w-full items-center border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <input
                        className="w-full p-[10px] outline-none text-black"
                        id="height"
                        name="height"
                        type="number"
                        placeholder="Ex : 768"
                        value={height}
                        onChange={(e) => setHeight(parseFloat(e.target.value))}
                    />
                    </div>
                </div>
                <div className='w-full mb-4'>
                    <label htmlFor="cgf" className="block mb-2  mt-4 text-current font-bold">Guidance scale (CFG) : seberapa mendekati dari prompt ke hasil (max 1,5)</label>
                    <div className="flex w-full items-center border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <input
                        className="w-full p-[10px] outline-none text-black"
                        id="cgf"
                        name="cgf"
                        type="number"
                        placeholder="Ex : 7"
                        value={CGF}
                        onChange={(e) => setCGF(parseFloat(e.target.value))}
                    />
                    </div>
                </div>
                <div className='w-full mb-4'>
                    <label htmlFor="cgf" className="block mb-2  mt-4 text-current font-bold">Num Inference Steps : Jumlah Step Generate Gambar, Semakin banyak step, semakin baik gambarnya, tetapi juga membutuhkan waktu lebih lama untuk menghasilkannya. (max 12)</label>
                    <div className="flex w-full items-center border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <input
                        className="w-full p-[10px] outline-none text-black"
                        id="cgf"
                        name="cgf"
                        type="number"
                        placeholder="Ex : 12"
                        value={numSteps}
                        onChange={(e) => setNumSteps(parseInt(e.target.value))}
                    />
                    </div>
                </div>
                <div className='w-full mb-4'>
                    <label htmlFor="cgf" className="block mb-2  mt-4 text-current font-bold">ID scale : seberapa mirip ke muka (def 0.8)</label>
                    <div className="flex w-full items-center border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <input
                        className="w-full p-[10px] outline-none text-black"
                        id="IDScale"
                        name="IDScale"
                        type="number"
                        placeholder="Ex : 0.8"
                        value={IDScale}
                        onChange={(e) => setIDScale(parseFloat(e.target.value))}
                    />
                    </div>
                </div>
                </div>
                <div>PREVIEW SETUP : {SEED} / {width} / {height} / {CGF} / {numSteps} / {IDScale}</div>
               

                {prompt &&
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
