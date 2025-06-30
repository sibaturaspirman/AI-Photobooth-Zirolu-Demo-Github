'use client';
import Image from "next/image";
import Link from 'next/link';
import BgWaveCustom from "../components/BgWaveCustom";

export default function IQOSHome() {
  return (
    <main className="flex fixed h-full w-full bg-iqos-prj-home overflow-auto flex-col items-center justify-center">
      <BgWaveCustom bg={'/iqos/bonds-bg.jpg'}></BgWaveCustom>
      <div className="fixed top-0 left-0 w-full h-full bg-iqos-border pointer-events-none z-10 hidden lg:block"></div>
      <div className="relative w-full">
        <div className='animate-bgScale2 relative w-[25%] mx-auto flex justify-center items-center'>
          <Image src='/iqos/bonds-circle.png' width={184} height={184} alt='Zirolu' className='w-full' priority />
        </div>
        <div className="relative w-[80%] mx-auto">
          <Image src='/iqos/bonds-snap.png' width={499} height={158} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
      <div className="fixed mx-auto top-0 left-0 w-full h-full flex flex-col items-center justify-center">
        <div className="relative w-[80%] mx-auto">
          <Image src='/iqos/bonds-find.png' width={871} height={406} alt='Zirolu' className='w-full' priority />
        </div>
        <div className='animate-bgScale2 relative w-[35%] mx-auto flex justify-center items-center mt-[5rem]'>
          <Image src='/iqos/bonds-tap.png' width={184} height={184} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
    </main>
  );
}
