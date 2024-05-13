'use client';

import * as fal from '@fal-ai/serverless-client';
import Image from "next/image";
import { useEffect, useState, useMemo } from 'react';
import TopLogo from "../components/TopLogo";
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
// let fixSeed = ''
let FIXSEEDPILIH = 0
let seedGenerate = [
    {number : 101},
    {number : 103}
];
let seedGenerate2 = [
    {number : 1063},
    {number : 100}
];

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export default function Register() {
    const router = useRouter();
    const [prompt, setPrompt] = useState(null);

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
    useEffect(() => {
        // Perform localStorage action
        if (typeof localStorage !== 'undefined') {
            const item = localStorage.getItem('faceImage')
            setImageFile(item)
        }
    }, [imageFile])

    // emitNetworkConnection()

    // const handleGender = (e) => {
    //     setStyleGender(e.target.value)
    //     if(e.target.value == 'man'){
    //         if(stylePrompt == 'style1'){
    //             setPrompt("alone, The man in the racing car wears a red racing suit with logos. His helmet has a dark visor to protect his eyes. He grips the steering wheel with gloved hands, ready for the race. Inside the car, he's focused and ready to push himself to win. The view is captured from the side of the driver's seat. illustration, digital painting, trending on artstation, concept art, sharp focus, illustration, high quality, highly detailed, high resolution, like painting, extremely detailed, hyper realistic, zoom out view");
    //         }else if(stylePrompt == 'style2'){
    //             setPrompt("alone, An architect who is a man engrossed in drawing against the backdrop of Dubai's cityscape at night, illuminated by a myriad of city lights, creating a captivating scene of urban brilliance.");
    //         }else if(stylePrompt == 'style3'){
    //             setPrompt("alone, a man standing elegantly against the backdrop of a sprawling new york timesquare. He is dressed in a long sleeve formal attire, wearing a sleek evening gown or a sophisticated business suit, exuding confidence and grace. The man's attire complements the urban setting, with its tailored lines and refined details reflecting the modern and cosmopolitan vibe of the city. His posture is confident and composed as he gazes out at the city view, with tall skyscrapers rising in the background. The cityscape is alive with twinkling lights, bustling streets, and iconic landmarks, showcasing the dynamic energy and vibrancy of urban life. The man's expression is serene and contemplative, as if he is taking a moment to appreciate the beauty and excitement of the city around him. He may be holding a smartphone, adding a touch of sophistication to his ensemble. Overall, the illustration captures the timeless elegance and modern allure of a man in formal attire against the backdrop of a captivating city view.");
    //         }
    //     }else if(e.target.value == 'woman'){
    //         if(stylePrompt == 'style1'){
    //             setPrompt("alone, The woman in the racing car wears a red racing suit with logos. Her helmet has a dark visor to protect her eyes. She grips the steering wheel with gloved hands, ready for the race. Inside the car, she's focused and ready to push herself to win. The view is captured from the side of the driver's seat. illustration, digital painting, trending on artstation, concept art, sharp focus, illustration, high quality, highly detailed, high resolution, like painting, extremely detailed, hyper realistic, zoom out view");
    //         }else if(stylePrompt == 'style2'){
    //             setPrompt("alone, An architect who is a woman engrossed in drawing against the backdrop of Dubai's cityscape at night, illuminated by a myriad of city lights, creating a captivating scene of urban brilliance.");
    //         }else if(stylePrompt == 'style3'){
    //             setPrompt("alone, a woman standing elegantly against the backdrop of a sprawling new york timesquare. She is dressed in a long sleeve formal attire, wearing a sleek evening gown or a sophisticated business suit, exuding confidence and grace. The woman's attire complements the urban setting, with its tailored lines and refined details reflecting the modern and cosmopolitan vibe of the city. She may be wearing heels that add to her stature, accentuating her poise and sophistication. Her posture is confident and composed as she gazes out at the city view, with tall skyscrapers rising in the background. The cityscape is alive with twinkling lights, bustling streets, and iconic landmarks, showcasing the dynamic energy and vibrancy of urban life. The woman's expression is serene and contemplative, as if she is taking a moment to appreciate the beauty and excitement of the city around her. She may be holding a clutch purse or a smartphone, adding a touch of sophistication to her ensemble. Overall, the illustration captures the timeless elegance and modern allure of a woman in formal attire against the backdrop of a captivating city view.");
    //         }
    //     }else if(e.target.value == 'woman-hijab'){
    //         if(stylePrompt == 'style1'){
    //             setPrompt("alone, The hijabi woman in the racing car wears a red racing suit with logos. Her helmet has a dark visor to protect her eyes. She grips the steering wheel with gloved hands, ready for the race. Inside the car, she's focused and ready to push herself to win. The view is captured from the side of the driver's seat. illustration, digital painting, trending on artstation, concept art, sharp focus, illustration, high quality, highly detailed, high resolution, like painting, extremely detailed, hyper realistic, zoom out view");
    //         }else if(stylePrompt == 'style2'){
    //             setPrompt("alone, A hijabi woman architect engrossed in drawing against the backdrop of Dubai's cityscape at night, illuminated by a myriad of city lights, creating a captivating scene of urban brilliance.");
    //         }else if(stylePrompt == 'style3'){
    //             setPrompt("alone, a hijabi woman standing elegantly against the backdrop of a sprawling new york timesquare. She is dressed in a long sleeve formal attire, wearing a sleek evening gown or a sophisticated business suit, exuding confidence and grace. The woman's attire complements the urban setting, with its tailored lines and refined details reflecting the modern and cosmopolitan vibe of the city. She may be wearing heels that add to her stature, accentuating her poise and sophistication. Her posture is confident and composed as she gazes out at the city view, with tall skyscrapers rising in the background. The cityscape is alive with twinkling lights, bustling streets, and iconic landmarks, showcasing the dynamic energy and vibrancy of urban life. The woman's expression is serene and contemplative, as if she is taking a moment to appreciate the beauty and excitement of the city around her. She may be holding a clutch purse or a smartphone, adding a touch of sophistication to her ensemble. Overall, the illustration captures the timeless elegance and modern allure of a woman in formal attire against the backdrop of a captivating city view.");
    //         }
    //     }
    //     // console.log(prompt)

    // }

    // const handleStyle = (e) => {
    //     if(e.target.value == 'style1'){
    //         setNumSteps(60);
    //         setCGF(12);
    //         if(styleGender === 'man'){
    //             setPrompt("alone, The man in the racing car wears a red racing suit with logos. His helmet has a dark visor to protect his eyes. He grips the steering wheel with gloved hands, ready for the race. Inside the car, he's focused and ready to push himself to win. The view is captured from the side of the driver's seat. illustration, digital painting, trending on artstation, concept art, sharp focus, illustration, high quality, highly detailed, high resolution, like painting, extremely detailed, hyper realistic, zoom out view");
    //         }else if(styleGender === 'woman'){
    //             setPrompt("alone, The woman in the racing car wears a red racing suit with logos. Her helmet has a dark visor to protect her eyes. She grips the steering wheel with gloved hands, ready for the race. Inside the car, she's focused and ready to push herself to win. The view is captured from the side of the driver's seat. illustration, digital painting, trending on artstation, concept art, sharp focus, illustration, high quality, highly detailed, high resolution, like painting, extremely detailed, hyper realistic, zoom out view");
    //         }else if(styleGender === 'woman-hijab'){
    //             setPrompt("alone, The hijabi woman in the racing car wears a red racing suit with logos. Her helmet has a dark visor to protect her eyes. She grips the steering wheel with gloved hands, ready for the race. Inside the car, she's focused and ready to push herself to win. The view is captured from the side of the driver's seat. illustration, digital painting, trending on artstation, concept art, sharp focus, illustration, high quality, highly detailed, high resolution, like painting, extremely detailed, hyper realistic, zoom out view");
    //         }
    //     }else if(e.target.value == 'style2'){
    //         setNumSteps(50);
    //         setCGF(12);
    //         if(styleGender === 'man'){
    //             setPrompt("alone, An architect who is a man engrossed in drawing against the backdrop of Dubai's cityscape at night, illuminated by a myriad of city lights, creating a captivating scene of urban brilliance.");
    //         }else if(styleGender === 'woman'){
    //             setPrompt("alone, An architect who is a woman engrossed in drawing against the backdrop of Dubai's cityscape at night, illuminated by a myriad of city lights, creating a captivating scene of urban brilliance.");
    //         }else if(styleGender === 'woman-hijab'){
    //             setPrompt("alone, A hijabi woman architect engrossed in drawing against the backdrop of Dubai's cityscape at night, illuminated by a myriad of city lights, creating a captivating scene of urban brilliance.");
    //         }
    //     }else if(e.target.value == 'style3'){
    //         setNumSteps(70);
    //         setCGF(12);
    //         if(styleGender === 'man'){
    //             setPrompt("alone, a man standing elegantly against the backdrop of a sprawling new york timesquare. He is dressed in a long sleeve formal attire, wearing a sleek evening gown or a sophisticated business suit, exuding confidence and grace. The man's attire complements the urban setting, with its tailored lines and refined details reflecting the modern and cosmopolitan vibe of the city. His posture is confident and composed as he gazes out at the city view, with tall skyscrapers rising in the background. The cityscape is alive with twinkling lights, bustling streets, and iconic landmarks, showcasing the dynamic energy and vibrancy of urban life. The man's expression is serene and contemplative, as if he is taking a moment to appreciate the beauty and excitement of the city around him. He may be holding a smartphone, adding a touch of sophistication to his ensemble. Overall, the illustration captures the timeless elegance and modern allure of a man in formal attire against the backdrop of a captivating city view.");
    //         }else if(styleGender === 'woman'){
    //             setPrompt("alone, a woman standing elegantly against the backdrop of a sprawling new york timesquare. She is dressed in a long sleeve formal attire, wearing a sleek evening gown or a sophisticated business suit, exuding confidence and grace. The woman's attire complements the urban setting, with its tailored lines and refined details reflecting the modern and cosmopolitan vibe of the city. She may be wearing heels that add to her stature, accentuating her poise and sophistication. Her posture is confident and composed as she gazes out at the city view, with tall skyscrapers rising in the background. The cityscape is alive with twinkling lights, bustling streets, and iconic landmarks, showcasing the dynamic energy and vibrancy of urban life. The woman's expression is serene and contemplative, as if she is taking a moment to appreciate the beauty and excitement of the city around her. She may be holding a clutch purse or a smartphone, adding a touch of sophistication to her ensemble. Overall, the illustration captures the timeless elegance and modern allure of a woman in formal attire against the backdrop of a captivating city view.");
    //         }else if(styleGender === 'woman-hijab'){
    //             setPrompt("alone, a hijabi woman standing elegantly against the backdrop of a sprawling new york timesquare. She is dressed in a long sleeve formal attire, wearing a sleek evening gown or a sophisticated business suit, exuding confidence and grace. The woman's attire complements the urban setting, with its tailored lines and refined details reflecting the modern and cosmopolitan vibe of the city. She may be wearing heels that add to her stature, accentuating her poise and sophistication. Her posture is confident and composed as she gazes out at the city view, with tall skyscrapers rising in the background. The cityscape is alive with twinkling lights, bustling streets, and iconic landmarks, showcasing the dynamic energy and vibrancy of urban life. The woman's expression is serene and contemplative, as if she is taking a moment to appreciate the beauty and excitement of the city around her. She may be holding a clutch purse or a smartphone, adding a touch of sophistication to her ensemble. Overall, the illustration captures the timeless elegance and modern allure of a woman in formal attire against the backdrop of a captivating city view.");
    //         }
    //     }
    //     // console.log(styleGender)
    //     setStylePrompt(e.target.value)
    //     // console.log(stylePrompt)
    // }

    const generateAI = () => {
        setNumProses1(true)
        if(prompt2 == 'alone, standing, cyberpunk, synthwave night city, futuristic, high quality, highly detailed, high resolution, sharp, hyper realistic, extremely detailed'){
            FIXSEEDPILIH = seedGenerate[getRandomInt(0,1)].number
        }else{
            FIXSEEDPILIH = seedGenerate2[getRandomInt(0,1)].number
            // FIXSEEDPILIH = 1063
        }
        console.log(FIXSEEDPILIH)

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
            //   seed: seedGenerate[getRandomInt(0,1)].number,
              seed: FIXSEEDPILIH,
              width: 624,
              height: 624
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
                router.push('/result');
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
                                    value="Man, "
                                    onChange={(e) => setPrompt1(e.target.value)}
                                    />
                                    <label htmlFor="choose_gender1" className='lg:text-2xl'>Man</label>
                                </li>
                                <li>
                                    <input
                                    id='choose_gender2'
                                    type="radio"
                                    name='choose_gender'
                                    value="Woman, "
                                    onChange={(e) => setPrompt1(e.target.value)}
                                    />
                                    <label htmlFor="choose_gender2" className='lg:text-2xl'>Woman</label>
                                </li>
                                <li>
                                    <input
                                    id='choose_gender3'
                                    type="radio"
                                    name='choose_gender'
                                    value="Woman with Hijab, "
                                    onChange={(e) => setPrompt1(e.target.value)}
                                    />
                                    <label htmlFor="choose_gender3" className='lg:text-2xl'>Woman with Hihab</label>
                                </li>
                            </ul>
                            {/* GENDER FIX */}
                            {/* <ul className='choose2'>
                                <li>
                                    <input
                                    id='choose_gender1'
                                    type="radio"
                                    name='choose_gender'
                                    value="man"
                                    onChange={handleGender}
                                    />
                                    <label htmlFor="choose_gender1" className='lg:text-2xl'>Man</label>
                                </li>
                                <li>
                                    <input
                                    id='choose_gender2'
                                    type="radio"
                                    name='choose_gender'
                                    value="woman"
                                    onChange={handleGender}
                                    />
                                    <label htmlFor="choose_gender2" className='lg:text-2xl'>Woman</label>
                                </li>
                                <li>
                                    <input
                                    id='choose_gender3'
                                    type="radio"
                                    name='choose_gender'
                                    value="woman-hijab"
                                    onChange={handleGender}
                                    />
                                    <label htmlFor="choose_gender3" className='lg:text-2xl'>Woman with Hijab</label>
                                </li>
                            </ul> */}
                        </div>
                    </div>
                    <div className='relative w-full mt-8 lg:mt-10'>
                        <label htmlFor="choose_style1" className="block mb-0 lg:mb-1 lg:text-3xl text-center font-bold text-white">Pick Your Style</label>
                        <div className='overflow-auto'>
                            {/* STYLE SEMENTARA */}
                            <ul className='choose'>
                            <li>
                                <input
                                id='choose_style1'
                                type="radio"
                                name='choose_style'
                                value="alone, standing, cyberpunk, synthwave night city, futuristic, high quality, highly detailed, high resolution, sharp, hyper realistic, extremely detailed"
                                onChange={(e) => setPrompt2(e.target.value)}
                                />
                                <label htmlFor="choose_style1">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/style1.png"
                                    alt="icon"
                                    width={98}
                                    height={98}
                                    priority
                                />
                                </label>
                            </li>
                            {/* <li>
                                <input
                                id='choose_style2'
                                type="radio"
                                name='choose_style'
                                value="alone, standing, Craft a captivating photo capturing the essence of Korean style. Integrate modern and traditional elements seamlessly. Emphasize elegant fashion choices, vibrant colors, and perhaps include iconic Korean motifs. Pay attention to lighting to enhance the mood and ensure a visually stunning representation of Korean-inspired aesthetics, high quality, highly detailed, high resolution, sharp, hyper realistic, extremely detailed"
                                onChange={(e) => setPrompt2(e.target.value)}
                                />
                                <label htmlFor="choose_style2">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/style2.png"
                                    alt="icon"
                                    width={98}
                                    height={98}
                                    priority
                                />
                                </label>
                            </li>
                            <li>
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
                                    src="/style3.png"
                                    alt="icon"
                                    width={98}
                                    height={98}
                                    priority
                                />
                                </label>
                            </li> */}
                            <li>
                                <input
                                id='choose_style4'
                                type="radio"
                                name='choose_style'
                                value="Artistic interpretation of a Indonesian pilot standing on a runway, donning a leather jacket and meeting the viewer's gaze, with an airplane parked on the tarmac behind him, against the backdrop of the evening sky. The pilot's stance exudes confidence and determination, reflecting his passion for flight and adventure. The sunset bathes the scene in warm, golden light, adding a touch of drama and romance to the atmosphere. The overall composition evokes a sense of anticipation and excitement as the pilot prepares for takeoff. Inspired by the beauty of aviation and the magic of twilight. Medium Shot, Impressionism Art Style, Dynamic Lighting, capturing the essence of flight at dusk, high quality, highly detailed, high resolution, sharp, hyper realistic, extremely detailed"
                                onChange={(e) => setPrompt2(e.target.value)}
                                />
                                <label htmlFor="choose_style4">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/style12.png"
                                    alt="icon"
                                    width={98}
                                    height={98}
                                    priority
                                />
                                </label>
                            </li>
                            </ul>
                            {/* STYLE BANYAK */}
                            {/* <ul className='choose'>
                                <li>
                                    <input
                                    id='choose_style1'
                                    type="radio"
                                    name='choose_style'
                                    value="style1"
                                    onChange={handleStyle}
                                    />
                                    <label htmlFor="choose_style1">
                                    <Image
                                        className="relative h-auto w-full"
                                        src="/style1.png"
                                        alt="icon"
                                        width={98}
                                        height={98}
                                        priority
                                    />
                                    <p className='text-center my-2 font-semibold lg:text-lg'>Style</p>
                                    </label>
                                </li>
                                <li>
                                    <input
                                    id='choose_style2'
                                    type="radio"
                                    name='choose_style'
                                    value="style2"
                                    onChange={handleStyle}
                                    />
                                    <label htmlFor="choose_style2">
                                    <Image
                                        className="relative h-auto w-full"
                                        src="/style2.png"
                                        alt="icon"
                                        width={98}
                                        height={98}
                                        priority
                                    />
                                    <p className='text-center my-2 font-semibold lg:text-lg'>Style</p>
                                    </label>
                                </li>
                                <li>
                                    <input
                                    id='choose_style3'
                                    type="radio"
                                    name='choose_style'
                                    value="style3"
                                    onChange={handleStyle}
                                    />
                                    <label htmlFor="choose_style3">
                                    <Image
                                        className="relative h-auto w-full"
                                        src="/style3.png"
                                        alt="icon"
                                        width={98}
                                        height={98}
                                        priority
                                    />
                                    <p className='text-center my-2 font-semibold lg:text-lg'>Style</p>
                                    </label>
                                </li>
                                <li>
                                    <input
                                    id='choose_style4'
                                    type="radio"
                                    name='choose_style'
                                    value="style4"
                                    onChange={handleStyle}
                                    />
                                    <label htmlFor="choose_style4">
                                    <Image
                                        className="relative h-auto w-full"
                                        src="/style4.png"
                                        alt="icon"
                                        width={98}
                                        height={98}
                                        priority
                                    />
                                    <p className='text-center my-2 font-semibold lg:text-lg'>Style</p>
                                    </label>
                                </li>
                                <li>
                                    <input
                                    id='choose_style5'
                                    type="radio"
                                    name='choose_style'
                                    value="style5"
                                    onChange={handleStyle}
                                    />
                                    <label htmlFor="choose_style5">
                                    <Image
                                        className="relative h-auto w-full"
                                        src="/style5.png"
                                        alt="icon"
                                        width={98}
                                        height={98}
                                        priority
                                    />
                                    <p className='text-center my-2 font-semibold lg:text-lg'>Style</p>
                                    </label>
                                </li>
                                <li>
                                    <input
                                    id='choose_style6'
                                    type="radio"
                                    name='choose_style'
                                    value="style6"
                                    onChange={handleStyle}
                                    />
                                    <label htmlFor="choose_style6">
                                    <Image
                                        className="relative h-auto w-full"
                                        src="/style6.png"
                                        alt="icon"
                                        width={98}
                                        height={98}
                                        priority
                                    />
                                    <p className='text-center my-2 font-semibold lg:text-lg'>Style</p>
                                    </label>
                                </li>
                                <li>
                                    <input
                                    id='choose_style7'
                                    type="radio"
                                    name='choose_style'
                                    value="style7"
                                    onChange={handleStyle}
                                    />
                                    <label htmlFor="choose_style7">
                                    <Image
                                        className="relative h-auto w-full"
                                        src="/style7.png"
                                        alt="icon"
                                        width={98}
                                        height={98}
                                        priority
                                    />
                                    <p className='text-center my-2 font-semibold lg:text-lg'>Style</p>
                                    </label>
                                </li>
                                <li>
                                    <input
                                    id='choose_style8'
                                    type="radio"
                                    name='choose_style'
                                    value="style8"
                                    onChange={handleStyle}
                                    />
                                    <label htmlFor="choose_style8">
                                    <Image
                                        className="relative h-auto w-full"
                                        src="/style8.png"
                                        alt="icon"
                                        width={98}
                                        height={98}
                                        priority
                                    />
                                    <p className='text-center my-2 font-semibold lg:text-lg'>Style</p>
                                    </label>
                                </li>
                                <li>
                                    <input
                                    id='choose_style9'
                                    type="radio"
                                    name='choose_style'
                                    value="style9"
                                    onChange={handleStyle}
                                    />
                                    <label htmlFor="choose_style9">
                                    <Image
                                        className="relative h-auto w-full"
                                        src="/style9.png"
                                        alt="icon"
                                        width={98}
                                        height={98}
                                        priority
                                    />
                                    <p className='text-center my-2 font-semibold lg:text-lg'>Style</p>
                                    </label>
                                </li>
                                <li>
                                    <input
                                    id='choose_style10'
                                    type="radio"
                                    name='choose_style'
                                    value="style10"
                                    onChange={handleStyle}
                                    />
                                    <label htmlFor="choose_style10">
                                    <Image
                                        className="relative h-auto w-full"
                                        src="/style10.png"
                                        alt="icon"
                                        width={98}
                                        height={98}
                                        priority
                                    />
                                    <p className='text-center my-2 font-semibold lg:text-lg'>Style</p>
                                    </label>
                                </li>
                                <li>
                                    <input
                                    id='choose_style11'
                                    type="radio"
                                    name='choose_style'
                                    value="style11"
                                    onChange={handleStyle}
                                    />
                                    <label htmlFor="choose_style11">
                                    <Image
                                        className="relative h-auto w-full"
                                        src="/style11.png"
                                        alt="icon"
                                        width={98}
                                        height={98}
                                        priority
                                    />
                                    <p className='text-center my-2 font-semibold lg:text-lg'>Style</p>
                                    </label>
                                </li>
                            </ul> */}
                        </div>
                    </div>
                </div>
                {/* {prompt} */}
                {/* {promptCombine} */}
                {/* {CGF} */}
                {/* {numSteps} */}

                {prompt1 && prompt2 &&
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
