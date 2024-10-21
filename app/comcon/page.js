
import Image from "next/image";
import Link from 'next/link';

export default function IQOSHome() {
  return (
    <div className="flex fixed h-full w-full bg-comcon-dark overflow-auto flex-col items-center justify-center">
      <div className="fixed top-0 left-0 w-full h-full bg-iqos-border pointer-events-none z-10"></div>
      <div className="relative w-[80%]">
        <div className='relative w-[70%] mx-auto flex justify-center items-center mb-20'>
          <Image src='/comcon/select.png' width={900} height={230} alt='Zirolu' className='w-full' priority />
        </div>
        <Link href='/comcon/iqos' className='relative w-full mx-auto flex justify-center items-center pb-10'>
          <Image src='/comcon/brand1.jpg' width={900} height={319} alt='Zirolu' className='w-full rounded-2xl shadow-xl' priority />
        </Link>
        <Link href='/comcon/veev' className='relative w-full mx-auto flex justify-center items-center pb-10'>
          <Image src='/comcon/brand2.jpg' width={900} height={319} alt='Zirolu' className='w-full rounded-2xl shadow-xl' priority />
        </Link>
        <Link href='/comcon/zyn' className='relative w-full mx-auto flex justify-center items-center'>
          <Image src='/comcon/brand3.jpg' width={900} height={319} alt='Zirolu' className='w-full rounded-2xl shadow-xl' priority />
        </Link>
      </div>
    </div>
  );
}
