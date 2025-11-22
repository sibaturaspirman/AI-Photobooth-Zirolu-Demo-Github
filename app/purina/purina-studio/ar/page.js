'use client';

import { useEffect, useRef, useState } from 'react';

// const IFRAME_SRC = "https://192.168.0.136:8080/studio.html";
const IFRAME_SRC = "https://g.minigim.fun/purina-studio/studio.html";
const IFRAME_ORIGIN = "*"; 
// set sesuai origin iframe. Jangan pakai gitlab.com kalau bukan. 
// Kalau dev beda-beda, boleh "*" sementara.

export default function Page() {
  const iframeRef = useRef(null);
  const [purinaResult, setPurinaResult] = useState(null);

  // Ambil localStorage setelah mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem('PurinaVideoResult');
      setPurinaResult(raw);
    } catch (e) {
      console.warn('Gagal baca localStorage PurinaVideoResult:', e);
    }
  }, []);

  // Kirim data ke iframe saat iframe load + data siap
  useEffect(() => {
    const iframeEl = iframeRef.current;
    if (!iframeEl || purinaResult == null) return;

    const sendData = () => {
      try {
        iframeEl.contentWindow?.postMessage(
          { type: 'PURINA_VIDEO_RESULT', payload: purinaResult },
          IFRAME_ORIGIN
        );
        console.log('✅ PurinaVideoResult terkirim ke iframe');
      } catch (e) {
        console.warn('Gagal postMessage ke iframe:', e);
      }
    };

    // selalu tunggu load, jangan cek document
    iframeEl.addEventListener('load', sendData);

    // kalau iframe udah keburu load sebelum listener attach (rare),
    // kirim juga sedikit delay
    const t = setTimeout(sendData, 800);

    return () => {
      iframeEl.removeEventListener('load', sendData);
      clearTimeout(t);
    };
  }, [purinaResult]);

  // Optional: kalau iframe minta resend
  useEffect(() => {
    const onMessage = (event) => {
      if (IFRAME_ORIGIN !== '*' && event.origin !== IFRAME_ORIGIN) return;

      if (event.data?.type === 'REQUEST_PURINA_VIDEO_RESULT') {
        const raw = localStorage.getItem('PurinaVideoResult');
        iframeRef.current?.contentWindow?.postMessage(
          { type: 'PURINA_VIDEO_RESULT', payload: raw },
          IFRAME_ORIGIN
        );
      }
    };

    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return (
    <main className="fixed inset-0 w-full h-full bg-purina-ps">
      <iframe
        ref={iframeRef}
        src={IFRAME_SRC}
        title="Purina Video Iframe"
        style={{ width: '100%', height: '100%', border: 'none' }}
        allow="camera; microphone; autoplay; clipboard-read; clipboard-write"
      />
    </main>
  );
}
