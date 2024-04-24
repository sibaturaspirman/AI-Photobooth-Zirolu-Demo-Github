'use client';

import * as fal from '@fal-ai/serverless-client';
import Image from "next/image";
import { setCookie } from 'cookies-next';
import { useState, useMemo } from 'react';
import TopLogo from "../components/TopLogo";
import BtnHexagon from "../components/BtnHexagon";
import { useRouter } from 'next/navigation';

// @snippet:start(client.config)
fal.config({
    // credentials: 'FAL_KEY_ID:FAL_KEY_SECRET',
    requestMiddleware: fal.withProxy({
      targetUrl: '/api/fal/proxy', // the built-int nextjs proxy
      // targetUrl: 'http://localhost:3333/api/fal/proxy', // or your own external proxy
    }),
});

let FACE_URL_RESULT = ''

export default function FaceSwap() {
    const router = useRouter();

    // Result state
    const [numProses, setNumProses] = useState(0);
    const [numProses1, setNumProses1] = useState();
    const [baseFaceFile, setBaseFaceFile] = useState(null);
    const [swapFaceFile, setSwapFaceFile] = useState(null);
    const [linkURL, setLinkURL] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [result, setResult] = useState(null);
    const [resultFaceSwap, setResultFaceSwap] = useState(null);
    const [logs, setLogs] = useState([]);
    const [elapsedTime, setElapsedTime] = useState(0);

    const generateAI = () => {
        generateImageSwap()
    }


    const imageFaceSwap = useMemo(() => {
        if (!resultFaceSwap) {
        return null;
        }
        if (resultFaceSwap.image) {
        return resultFaceSwap.image;
        }
        return null;
    }, [resultFaceSwap]);

    const reset2 = () => {
        setNumProses(2)
        setResultFaceSwap(null);
        setLoading(false);
        setError(null);
        // setLogs([]);
        setElapsedTime(0);
      };
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
                    base_image_url: baseFaceFile,
                    swap_image_url: swapFaceFile
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
            setLinkURL(result.image.url)
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
            setElapsedTime(Date.now() - start);
        }
        // @snippet:end
    };
    return (
        <main className="flex min-h-screen flex-col items-center justify-top pt-12 px-4 lg:p-20">
            <TopLogo></TopLogo>
            <div className="relative w-full flex flex-col justify-center items-center mt-4 mb-0">
                <div className='relative w-full lg:w-[80%] mb-6'>
                    <label htmlFor="base" className="text-[#D8BA78] font-bold text-2xl mb-4 block">Base Face</label>
                    <div className='relative w-full'>
                        <input
                            type='file'
                            id='base'
                            name='base'
                            className={`w-full border-2 border-[#D8BA78] rounded-sm font-semibold text-2xl outline-none py-6 pr-3 text-white bg-black bg-opacity-[4%]'`}
                            placeholder='Base Face'
                            accept="image/*;capture=camera"
                            onChange={(e) => setBaseFaceFile(e.target.files?.[0] ?? null)}
                        />
                    </div>
                </div>
                <div className='relative w-full lg:w-[80%] mb-6'>
                    <label htmlFor="swap" className="text-[#D8BA78] font-bold text-2xl mb-4 block">Swap Face</label>
                    <div className='relative w-full'>
                        <input
                            type='file'
                            id='swap'
                            name='swap'
                            className={`w-full border-2 border-[#D8BA78] rounded-sm font-semibold text-2xl outline-none py-6 pr-3 text-white bg-black bg-opacity-[4%]'`}
                            placeholder='Swap Face'
                            accept="image/*;capture=camera"
                            onChange={(e) => setSwapFaceFile(e.target.files?.[0] ?? null)}
                        />
                    </div>
                    {/* {payload.phone} */}
                    {/* {errorMsg && <p className='text-[#E00A0A] text-xs'>{errorMsg}</p>} */}
                </div>
                {imageFaceSwap && 
                <div className='relative w-full lg:w-[80%] mb-6'>
                    <label htmlFor="swap" className="text-[#D8BA78] font-bold text-2xl mb-4 block">Result</label>
                    <a href={linkURL} target='_blank' className="relative w-[250px] mb-2 flex justify-center items-center">
                            <Image src='/btn-download-image.png' width={410} height={96} alt='Zirolu' className='w-full' priority />
                    </a>
                    <div><Image src={imageFaceSwap.url} width={1200} height={1200} className='w-full' alt='zirolu'></Image></div>
                </div>
                }
            </div>
            <div className="relative w-[80%] flex justify-center items-center">
                <button className="relative mx-auto w-[70%] flex justify-center items-center" onClick={generateAI}>
                    <Image src='/btn-generate.png' width={410} height={96} alt='Zirolu' className='w-full' priority />
                </button>
            </div>
            {numProses == 2 && 
                <div className='relative w-[80%]'>
                    <div className='animate-upDownCepet relative py-2 px-4 mt-5 border-2 border-[#ffffff] text-center bg-slate-500 text-[#fff] lg:font-bold w-full'>
                        <p>{`Please wait, loading...`}</p>
                        <p>{`Process : ${(elapsedTime / 1000).toFixed(2)} seconds (${numProses} of 2)`}</p>
                        {error}
                    </div>

                    <pre className='w-full relative py-2 px-4 mt-5 lg:mt-24 border-2 border-[#ffffff] text-left bg-slate-500 text-[#fff] text-xs lg:text-sm overflow-auto no-scrollbar h-[100px] mx-auto'>
                        <code>
                        {logs.filter(Boolean).join('\n')}
                        </code>
                        AI generate face... <br></br>
                        Loading model..<br></br>
                    </pre>
                </div>
            }
        </main>
    );
}
