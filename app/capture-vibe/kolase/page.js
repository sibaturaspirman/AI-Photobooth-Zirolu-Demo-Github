'use client';

import Image from "next/image";
import Link from 'next/link';
import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';
import { useQRCode } from 'next-qrcode';


export default function Register() {
    const TOTAL_FRAMES = 36;
    const BASE_URL = "https://ai.zirolu.id/amild/cv/frame/Frame";

    const [frames, setFrames] = useState(
        Array.from({ length: TOTAL_FRAMES }, (_, i) => `${BASE_URL}-${i + 1}.png`)
    );
    const [generateQR, setGenerateQR] = useState(null);
    const [linkQR, setLinkQR] = useState('https://zirolu.id/');
    const { Canvas } = useQRCode();

    useEffect(() => {
        const updatedFrames = frames.map((src, idx) => {
            const key = `finalResult${idx + 1}`;
            const stored = localStorage.getItem(key);
            return stored && stored.trim() !== "" ? stored : src;
        });
        setFrames(updatedFrames);

        if (typeof localStorage !== 'undefined') {
            const item = localStorage.getItem('faceURLResult')
            setLinkQR(item)
        }
    }, [linkQR]);


    return (
        <main className="flex fixed h-full w-full bg-cv-page2 overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-8 lg:px-20" onContextMenu={(e)=> e.preventDefault()}>

            {/* QR */}
            {generateQR && 
                <div className='absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center flex-col z-40 bg-black bg-opacity-0'>
                    <div className={`relative w-[40%] mx-auto mb-10`}>
                        <Image src='/amild/cv/scan.png' width={580} height={213} alt='Zirolu' className='w-full' priority />
                    </div>
                    <div className='relative mt-3 w-[60%] mx-auto flex items-center justify-center canvas-qr' onClick={()=>{setGenerateQR(null)}}>
                        <Canvas
                        text={linkQR}
                        options={{
                            errorCorrectionLevel: 'M',
                            margin: 3,
                            scale: 4,
                            width: 500,
                            color: {
                            dark: '#000000',
                            light: '#ffffff',
                            },
                        }}
                        />
                    </div>
                    <Link href='/capture-vibe' className="relative w-[40%] mx-auto flex justify-center items-center pt-[6rem]">
                        <Image src='/amild/cv/back.png' width={880} height={144} alt='Zirolu' className='w-full' priority />
                    </Link>
                </div>
            }
            {/* QR */}
           
            {/* PILIH STYLE */}
            <div className={`relative w-full mx-auto ${generateQR ? `opacity-0 pointer-events-none` : ''}`}>
                <div className='relative mt-0 border-[1.8rem] w-[max-content] mx-auto rounded-3xl'>
                <div className="flex flex-wrap justify-center w-[780px]">
                    {frames.map((src, i) => (
                        <div key={i} className="relative"
                            style={{
                                width: "130px",
                                height: "130px",
                                flex: "1 1 130px",
                            }}
                        >
                        <Image
                            src={src}
                            alt={`Frame ${i + 1}`}
                            fill
                            style={{ objectFit: "cover" }}
                        />
                        </div>
                    ))}
                </div>
                </div>
                <div className={`w-full`}>
                    <div className={`w-full mt-10`} onClick={()=>{setGenerateQR('true')}}>
                        <div className="relative w-[50%] mx-auto flex justify-center items-center flex-col">
                            <div className="w-full relative mx-auto flex justify-center items-center">
                                <Image src='/amild/cv/download.png' width={864} height={210} alt='Zirolu' className='w-full' priority />
                            </div>
                        </div>
                    </div>
                    <Link href='/capture-vibe' className="relative mx-auto w-[50%] mt-6 flex justify-center items-center">
                        <Image src='/amild/cv/mulailagi.png' width={850} height={258} alt='Zirolu' className='w-full' priority />
                    </Link>
                </div>
            </div>
            {/* !PILIH STYLE */}
        </main>
    );
}
