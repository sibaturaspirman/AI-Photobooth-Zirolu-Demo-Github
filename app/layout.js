'use client';
import { Outfit } from "next/font/google";
import "./globals.css";
// import { GoogleTagManager } from '@next/third-parties/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import { useEffect, useRef } from 'react';


const outfit = Outfit({ subsets: ["latin"] });

// export const metadata = {
//   title: "AI Photo Booth - Zirolu.id",
//   description: "AI Photo Booth developed by zirolu.id",
// };

export default function RootLayout({ children }) {
  const audioRef = useRef(null);

  // useEffect(() => {
  //   if (audioRef.current) {
  //     const playAudio = () => {
  //       audioRef.current.play().catch((error) => {
  //         console.error('Autoplay gagal:', error);
  //       });
  //     };
      
  //     document.addEventListener('click', playAudio, { once: true });
  //   }
  // }, []);

  return (
    <html lang="en">
      <body className={outfit.className}>
        {/* <audio ref={audioRef} src="/dss/BGM.webm" loop autoPlay></audio> */}
        {children}</body>
      {/* <GoogleTagManager gtmId="G-3YWLPQZ3JQ" /> */}
      <GoogleAnalytics gaId="G-3YWLPQZ3JQ" />
    </html>
  );
}
