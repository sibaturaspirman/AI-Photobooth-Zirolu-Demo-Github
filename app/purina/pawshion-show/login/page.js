'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import * as fal from '@fal-ai/serverless-client';

// @snippet:start(client.config)
fal.config({
    requestMiddleware: fal.withProxy({
      targetUrl: '/api/fal/proxy', // the built-int nextjs proxy
    }),
});
let URL_RESULT = ''
export default function LoginWA() {
  const router = useRouter();

  const [waNumber, setWaNumber] = useState("");
  const [loading, setLoading] = useState(false);

  // data dari localStorage sebelumnya
  const [selectedAccessoriesText, setSelectedAccessoriesText] = useState("");
  const [faceImage, setFaceImage] = useState(""); // base64 / url

    // AI
    const [result, setResult] = useState(null);
    const [error, setError] = useState(true);
    const [logs, setLogs] = useState([]);
    const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    try {
      const accText = localStorage.getItem("selectedAccessoriesText") || "";
      const faceImg = localStorage.getItem("faceImage") || "";

      setSelectedAccessoriesText(accText);
      setFaceImage(faceImg);

      // debug kalau mau cek
    //   console.log("selectedAccessoriesText:", accText);
    //   console.log("faceImage:", faceImg);
    } catch (e) {
      console.warn("localStorage not available:", e);
    }
  }, []);

  const canProceed = waNumber.trim().length > 0;

  const onProceed = () => {
    if (!canProceed) return;

    // simpan nomer
    const fullPhone = `+62${waNumber.replace(/^0+/, "")}`;
    localStorage.setItem("waNumber", fullPhone);

    // opsional: simpan payload gabungan untuk step berikutnya
    localStorage.setItem(
      "loginPayload",
      JSON.stringify({
        waNumber: fullPhone,
        selectedAccessoriesText,
        faceImage,
      })
    );

    generateAI()
  };

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

    const generateAI = async () => {
        reset2();
        // @snippet:start("client.queue.subscribe")
        setLoading(true);
        const start = Date.now();
        try {
        const result = await fal.subscribe(
            'fal-ai/nano-banana-pro/edit', {
                input: {
                    prompt: "make a photo of the man driving the car down the california coastline",
                    image_urls: [
                        "https://storage.googleapis.com/falserverless/example_inputs/nano-banana-edit-input.png", 
                        "https://storage.googleapis.com/falserverless/example_inputs/nano-banana-edit-input-2.png"]
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
        setResult(result);
        URL_RESULT= result.images[0].url;

        toDataURL(URL_RESULT)
        .then(dataUrl => {
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("PurinaShowresultAIBase64", dataUrl)
                localStorage.setItem("PurinaShowURLResult", URL_RESULT)
            }
            setTimeout(() => {
                router.push('/purina/pawshion-show/result');
            }, 200);
        })

        } catch (error) {
            setError(false);
        } finally {
            setLoading(false);
            setElapsedTime(Date.now() - start);
        }
        //@snippet:end
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
          <p className="text-white text-lg font-semibold leading-snug">
            Generating Your Pet's <br /> Look...
          </p>
        </div>
      </main>
    );
  }

  // ---------- LOGIN SCREEN ----------
  return (
    <main className="fixed inset-0 w-full h-full bg-purina-ps">
      <div className="relative z-10 w-full h-full flex flex-col justify-between p-5">
        {/* top logo row */}
        <div className="flex items-start justify-between">
          <div className="relative w-full">
            <Image
              src="/purina/ps-login.png"
              width={329} height={305} alt='Zirolu' className='w-full' priority
            />
          </div>
        </div>

        {/* title */}
        {/* <div  className={`relative w-[50%] mt-5`}>
        <Image src='/purina/ps-login.png' width={660} height={104} alt='Zirolu' className='w-full' priority />
        </div> */}

        {/* input + button */}
        <div className="w-full">
          {/* input wrapper */}
          <div className="flex items-center bg-[#e8a9b0] rounded-lg px-3 py-5 border border-black/40">
            <div className="text-black font-semibold mr-2 text-xl">+62</div>
            <div className="w-[1px] h-6 bg-black/40 mr-2" />
            <input
              type="tel"
              inputMode="numeric"
              placeholder="Your WhatsApp Number"
              value={waNumber}
              onChange={(e) => setWaNumber(e.target.value.replace(/[^\d]/g, ""))}
              className="w-full bg-transparent outline-none text-black placeholder-black/50 text-xl"
            />
          </div>

          {/* proceed button image */}
          <button
            onClick={onProceed}
            disabled={!canProceed}
            className={`relative w-full mt-3 transition ${
              canProceed ? "opacity-100" : "opacity-40 pointer-events-none"
            }`}
          >
            <Image
              src={
                canProceed
                  ? "/purina/ps-proceed.png"          // button normal
                  : "/purina/ps-proceed-disable.png" // button disabled (kalau ada)
              }
              width={319} height={67} alt='Zirolu' className='w-full' priority
            />
          </button>

          {/* optional debug kecil */}
          <div className="text-white/70 text-xs mt-3">
            Accessories: {selectedAccessoriesText || "-"} <br />
            FaceImage: {faceImage ? "loaded" : "-"}
          </div>
        </div>
      </div>
    </main>
  );
}
