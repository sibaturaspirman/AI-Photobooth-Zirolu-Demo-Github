'use client';
import Image from "next/image";
import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
// import BgWave from "../components/BgWave";

export default function PrimariaHome() {
  const router = useRouter();

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.origin !== 'https://g.minigim.fun') return;
      try {
        const decodedMessage = atob(event.data);
        console.log('Pesan diterima dari iframe (decoded):', decodedMessage);
        
        const message = JSON.parse(decodedMessage);
        if (message.action === 'back' && message.value === '*') {
          router.push('/dss-rehat/home'); // Ganti dengan halaman tujuan
        }
      } catch (error) {
        console.error('Gagal mendekode atau mengurai pesan:', error);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [router]);

  return (
    <div className="flex fixed bg-dss-front h-full w-full overflow-auto flex-col items-center justify-center">  
      <div className="w-screen h-screen flex items-center justify-center bg-gray-100">
        <iframe 
          src="https://g.minigim.fun/dss-break-o-meter-eng/index.html" 
          className="w-full h-full border-none"
        ></iframe>
      </div>
    </div>
  );
}
