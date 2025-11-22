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
let URL_RESULT = '',  URL_RESULT2 = ''
export default function LoginWA() {
  const router = useRouter();

  const [waNumber, setWaNumber] = useState("");
  const [loading, setLoading] = useState(false);

  // data dari localStorage sebelumnya
  const [selectedAccessoriesText, setSelectedAccessoriesText] = useState("");
  const [faceImage, setFaceImage] = useState(""); // base64 / url

    // AI
    const [numProses, setNumProses] = useState(0);
    const [result, setResult] = useState(null);
    const [result2, setResult2] = useState(null);
    const [error, setError] = useState(true);
    const [logs, setLogs] = useState([]);
    const [elapsedTime, setElapsedTime] = useState(0);

    const [selectedAccessories, setSelectedAccessories] = useState({
        ids: [],
        labels: [],
        images: [],
        text: ""
    });

    useEffect(() => {
        try {
            const accText = localStorage.getItem("selectedAccessoriesText") || "";
            const accObjRaw = localStorage.getItem("selectedAccessories");
            const faceImg = localStorage.getItem("faceImage") || "";

            const accObj = accObjRaw ? JSON.parse(accObjRaw) : null;

            setSelectedAccessoriesText(accText);
            if (accObj) setSelectedAccessories(accObj);

            setFaceImage(faceImg);
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
    const normalizeUrl = (u) => {
        if (!u) return "";
        // sudah absolute / dataurl
        if (u.startsWith("http") || u.startsWith("data:")) return u;
        // jadiin absolute dari origin
        return new URL(u, window.location.origin).toString();
    };

    const generateAI = async () => {
        setNumProses(1)
        reset2();
        setLoading(true);
        const start = Date.now();
      
        try {
            // ===== ambil dari localStorage =====
            const picked = selectedAccessories?.ids?.length
                ? selectedAccessories
                : (() => {
                    const raw = localStorage.getItem("selectedAccessories");
                    return raw ? JSON.parse(raw) : { ids: [], labels: [], images: [], text: "" };
                })();
        
            const pickedLabels = picked.labels?.length
                ? picked.labels
                : (picked.text || selectedAccessoriesText || "")
                    .split(",")
                    .map(s => s.trim())
                    .filter(Boolean);
        
            // images aksesoris (kalau di storage sudah absolute dari picker, normalize akan aman)
            const accessoryImages = (picked.images || []).map(normalizeUrl);
        
            // faceImage terakhir wajib masuk list
            const faceImgUrl = normalizeUrl(
                faceImage || localStorage.getItem("faceImage") || ""
            );
        
            const image_urls = [
                ...accessoryImages,
                ...(faceImgUrl ? [faceImgUrl] : [])
            ];
        
            // ===== prompt final dari pilihan =====
            const prompt = `
            add realistic pet wearing these accessories : ${pickedLabels.join(", ")}.
            Keep identity and face consistent with the last reference image.
            `.trim();
      
            // ===== call fal =====
            const result = await fal.subscribe('fal-ai/nano-banana-pro/edit', {
                input: {
                    prompt,
                    image_urls
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
        setNumProses(2)
        reset2();
        setLoading(true);
        const start = Date.now();
      
        try {
            // ===== prompt final dari pilihan =====
            const prompt = `
            add my pet to this packaging, and remove existing pet
            `.trim();

            const image_urls = [
                URL_RESULT,
                'https://ai.zirolu.id/purina/ps-packaging.png'
            ];

            console.log(image_urls)
      
            // ===== call fal =====
            const result = await fal.subscribe('fal-ai/nano-banana-pro/edit', {
                input: {
                    prompt,
                    image_urls
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
                result?.images?.[0]?.url ||
                result?.data?.images?.[0]?.url ||
                "";
      
            URL_RESULT2 = outUrl;
      
            toDataURL(URL_RESULT2).then(dataUrl => {
                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem("PurinaShowresultAIBase64", dataUrl);
                    localStorage.setItem("PurinaShowURLResult", URL_RESULT2);
                }
                setTimeout(() => {
                    router.push('/purina/pawshion-show/result');
                }, 200);
            });
      
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
          <p className="text-white text-lg font-semibold leading-snug">
            Generating Your Pet Look...
          </p>
          <p className="text-xs">{`Process : ${(elapsedTime / 1000).toFixed(2)} seconds (${numProses} of 2)`}</p>
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
          {/* <div className="text-white/70 text-xs mt-3">
            Accessories: {selectedAccessoriesText || "-"} <br />
            FaceImage: {faceImage ? "loaded" : "-"}
          </div> */}
        </div>
      </div>
    </main>
  );
}
