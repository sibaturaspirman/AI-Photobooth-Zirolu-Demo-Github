'use client';
import Image from "next/image";
import Link from 'next/link';
import { useEffect, useRef } from "react";

export default function PrimariaHome() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const image = new window.Image();
    image.src = "/primaria/bg.jpg"; // Ganti dengan path gambarmu

    image.onload = () => {
      const width = canvas.width = image.width;
      const height = canvas.height = image.height;

      let offset = 0;

      const drawWave = () => {
        ctx.clearRect(0, 0, width, height);
        for (let y = 0; y < height; y++) {
          const waveOffset = Math.sin((y + offset) * 0.1) * 7;
          ctx.drawImage(image, 0, y, width, 1, waveOffset, y, width, 1);
        }
        offset += 1;
        requestAnimationFrame(drawWave);
      };

      drawWave();
    };
  }, []);

  return (
    <Link href='/primaria/data' className="flex fixed h-full w-full overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-0 lg:px-20 mt-0">
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none -z-1"></canvas>
      <div className="relative w-full flex justify-center items-center flex-col top-[-6rem]">
        <div className='animate-upDown relative w-[90%] mx-auto flex justify-center items-center pointer-events-none'>
          <Image src='/primaria/logo.png' width={880} height={347} alt='Zirolu' className='w-full' priority />
        </div>
        <div className="animate-upDown2 relative w-[75%] mx-auto mt-10">
          <Image src='/primaria/tagline.png' width={926} height={41} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
      <div className="absolute left-0 right-0 bottom-[8rem] w-full flex justify-center items-center">
        <div className="animate-upDownCepet relative mx-auto flex w-[78%] justify-center items-center">
          <Image src='/primaria/btn-mulai.png' width={819} height={126} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
    </Link>
  );
}
