'use client';

import Image from "next/image";
import { useEffect, useState } from 'react';
import TemplateSliderPickerMax1 from "./../../../components/TemplateSliderPickerMax1";
import { useRouter } from 'next/navigation';
import * as fal from '@fal-ai/serverless-client';


// @snippet:start(client.config)
fal.config({
  requestMiddleware: fal.withProxy({
    targetUrl: '/api/fal/proxy', // the built-int nextjs proxy
  }),
});
let URL_RESULT = '',  URL_RESULT2 = ''

export default function Register() {
  const router = useRouter();

  const TEMPLATE_ITEMS = [
    {
      id: "HAPPY_CAT",
      title: "Happy Cat",
      img: "/purina/pstd-m-1.jpg",
      label: "A happy dancing cat meme style, bouncy cute motion, loopable, upbeat energy."
    },
    {
      id: "KUNG_FU_HUSTLE",
      title: "Kung Fu Hustle",
      img: "/purina/pstd-m-2.jpg",
      label: "Fast kung-fu action meme vibe, dynamic camera shake, comedic martial arts moves."
    },
    {
      id: "AURA_FARMING",
      title: "Aura Farming Meme",
      img: "/purina/pstd-m-3.jpg",
      label: "A cute small cat standing on two legs performing the viral 'aura farming / Danach boat dance' style. The cat copies the signature moves: relaxed upper body swaying, one hand pointing forward while the other makes loose rhythmic swings, slight leaning back with confident boyish attitude, and smooth side-to-side hip movement. The dance has the same chill, stylish, and effortless vibe as the trending boy-on-boat dance, with expressive eyes and playful energy. Feet stay in place but the upper body moves with charisma. Smooth motion, meme-style, high-quality animation."
    },
    {
      id: "SURPRISE_ME",
      title: "Surprise me!",
      img: "/purina/pstd-m-4.jpg",
      label: "A cute small cat standing on two legs performing a stylish Michael-Jackson-inspired dance routine. The cat moves smoothly with rhythmic foot taps, quick shoulder pops, and expressive arm swings. It does iconic MJ-style moves such as a sharp toe-tap, a quick lean, a playful body wave, and hand gestures pointing upward. The cat keeps a confident, cool expression while staying adorable. The animation is smooth, energetic, and meme-style."
    },
    {
      id: "CAT_EATING",
      title: "Cat Eating",
      img: "/purina/pstd-m-5.jpg",
      label: "A cute chubby cat standing on two legs performing an extremely exaggerated Flibbo-style meme dance. The cat shakes its hips wildly left and right, then spins its hips in a full 360-degree rotation with elastic cartoon physics. The movement is over-the-top, bouncy, chaotic, and very funny. The cat leans its upper body forward slightly, paws raised for balance, while the hips rotate dramatically as if on a swivel. Expression is adorable and unhinged, with high-energy viral meme vibes."
    }
  ];
  
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedTemplatePrompt, setSelectedTemplatePrompt] = useState(null);

  // ✅ tombol aktif kalau sudah pilih aksesoris
  const canContinue =
  selectedTemplate && selectedTemplate.id ? true : false;


  // data dari localStorage sebelumnya
  const [faceImage, setFaceImage] = useState(""); // base64 / url

  // AI
  const [loading, setLoading] = useState(false);
  const [numProses, setNumProses] = useState(0);
  const [textProses, setTextProses] = useState('Generating your Pawtrait…');
  const [result, setResult] = useState(null);
  const [result2, setResult2] = useState(null);
  const [error, setError] = useState(true);
  const [logs, setLogs] = useState([]);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    try {
        const faceImg = localStorage.getItem("faceImage") || "";

        setFaceImage(faceImg);
    } catch (e) {
        console.warn("localStorage not available:", e);
    }
  }, []);


  const reset2 = () => {
    setLoading(false);
    setError(true);
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
  const normalizeUrl = (u) => {
      if (!u) return "";
      // sudah absolute / dataurl
      if (u.startsWith("http") || u.startsWith("data:")) return u;
      // jadiin absolute dari origin
      return new URL(u, window.location.origin).toString();
  };

  const generateAI = async () => {
    if (!canContinue) return; // safety

    setNumProses(1)
    reset2();
    setLoading(true);
    const start = Date.now();
  
    try {
        // ===== ambil dari localStorage =====
        // faceImage terakhir wajib masuk list
        const faceImgUrl = normalizeUrl(
            faceImage || localStorage.getItem("faceImage") || ""
        );
    
        const image_urls = [
            ...(faceImgUrl ? [faceImgUrl] : [])
        ];
    
        // ===== prompt final dari pilihan =====
        const prompt = `remove background, turn to green screen with color #2E9F2C`.trim();
  
        // ===== call fal =====
        const result = await fal.subscribe('fal-ai/nano-banana-pro/edit', {
            input: {
                prompt,
                image_urls,
                aspect_ratio: '1:1'
            },
            pollInterval: 5000,
            logs: true,
            onQueueUpdate(update) {
                setElapsedTime(Date.now() - start);
                if (update.status === 'IN_PROGRESS' || update.status === 'COMPLETED') {
                    setLogs((update.logs || []).map((log) => log.message));
                }
            },
        });
  
        setResult(result);
  
         // --- hasil dari fal (punyamu sudah works, aku bikin aman dikit) ---
        const outUrl =
            result?.images?.[0]?.url ||
            result?.data?.images?.[0]?.url ||
            "";
  
        URL_RESULT = outUrl;
        console.log(URL_RESULT)

        generateAI2()
  
        // toDataURL(URL_RESULT).then(dataUrl => {
        //     if (typeof localStorage !== 'undefined') {
        //         localStorage.setItem("PurinaShowresultAIBase64", dataUrl);
        //         localStorage.setItem("PurinaShowURLResult", URL_RESULT);
        //     }
        //     setTimeout(() => {
        //         router.push('/purina/pawshion-show/result');
        //     }, 200);
        // });
  
    } catch (error) {
        console.error(error);
        setError(false);
    } finally {
        // setLoading(false);
        setElapsedTime(Date.now() - start);
    }
  };

  const generateAI2 = async () => {
    setTextProses('Currently is making your pet into a meme...')
    setNumProses(2)
    reset2();
    setLoading(true);
    const start = Date.now();
  
    try {
        // ===== prompt final dari pilihan =====
        const prompt = `${selectedTemplatePrompt}`.trim();
  
        // ===== call fal =====
        const result = await fal.subscribe('fal-ai/kling-video/v2.5-turbo/pro/image-to-video', {
            input: {
                prompt,
                image_url : URL_RESULT
            },
            pollInterval: 5000,
            logs: true,
            onQueueUpdate(update) {
                setElapsedTime(Date.now() - start);
                if (update.status === 'IN_PROGRESS' || update.status === 'COMPLETED') {
                    setLogs((update.logs || []).map((log) => log.message));
                }
            },
        });
  
        setResult2(result);
  
         // --- hasil dari fal (punyamu sudah works, aku bikin aman dikit) ---
        const outUrl =
            result?.video?.url ||
            "";
  
        URL_RESULT2 = outUrl;
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem("PurinaVideoResult", URL_RESULT2);
        }
        setTimeout(() => {
            router.push('/purina/purina-studio/ar');
        }, 200);
  
    } catch (error) {
        console.error(error);
        setError(false);
    } finally {
        // setLoading(false);
        setElapsedTime(Date.now() - start);
    }
  };

  // ---------- LOADING SCREEN ----------
  if (loading) {
    return (
      <main className="fixed inset-0 w-full h-full bg-purina-ps">

        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center text-center px-6">
          <div className="relative w-[90px] h-[90px] mb-4 animate-rotateMuter">
            <Image
              src="/purina/ps-loading.png" // icon kotak kuning + spinner
              alt="loading"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* text loading (boleh diganti image kalau mau) */}
          <p className="text-white text-lg font-semibold leading-[1.1] mb-4">
            {`${textProses}`}
          </p>

          <p className="text-sm px-3 py-1 bg-yellow-200 text-yellow-800  rounded-full">{`Process : ${(elapsedTime / 1000).toFixed(2)} seconds (${numProses} of 2)`}</p>
          <p className="text-yellow-200 text-xs leading-[1.1] mt-2">This process is estimated to take 90-150 seconds. </p>
        </div>
      </main>
    );
  }

  // ---------- MEME SCREEN ----------
  return (
    <main
      className="flex fixed h-full w-full bg-purina-ps2 overflow-auto flex-col items-centerx justify-start pt-2 pb-5 px-5 lg:pt-12 lg:px-20"
      onContextMenu={(e)=> e.preventDefault()}
    >
      <div className="relative w-[30%] lg:w-[90%] xmx-auto mb-2">
        <Image src='/purina/ps-purina.png' width={303} height={286} alt='Zirolu' className='w-full' priority />
      </div>

      <div className="relative w-[70%] lg:w-[90%] mx-auto mt-0">
        <Image src='/purina/pstd-unlock.png' width={303} height={286} alt='Zirolu' className='w-full' priority />
      </div>

      {/* PILIH AKSESORIS */}
      <div className={`relative w-[100%] mx-auto mt-3`}>
        <div className='relative mt-0 w-full p-0 '>
        <TemplateSliderPickerMax1
          items={TEMPLATE_ITEMS}
          onChange={(val) => {
            setSelectedTemplate(val);
            if (val) {
              setSelectedTemplatePrompt(val.prompt)
              localStorage.setItem("selectedTemplatePrompt", val.prompt);
              localStorage.setItem("selectedTemplateImage", val.image);
              localStorage.setItem("selectedTemplateId", val.id);
            } else {
              setSelectedTemplatePrompt(null)
              localStorage.removeItem("selectedTemplatePrompt");
              localStorage.removeItem("selectedTemplateImage");
              localStorage.removeItem("selectedTemplateId");
            }
          }}
        />
        </div>

        {/* tombol continue */}
        <div
          className={`
            relative w-full flex justify-center items-center mt-4 lg:mt-[1rem] z-20
            ${canContinue ? "" : "opacity-50 pointer-events-none"}
          `}
        >
          <button
            className="relative mx-auto w-[100%] flex justify-center items-center"
            onClick={generateAI}
            disabled={!canContinue}
          >
            <Image src='/purina/pstd-generate.png' width={319} height={67} alt='Zirolu' className='w-full' priority />
          </button>
        </div>
      </div>
    </main>
  );
}
