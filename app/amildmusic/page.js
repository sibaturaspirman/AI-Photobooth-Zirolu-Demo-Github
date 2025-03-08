'use client';
import Image from "next/image";
import Link from 'next/link';
import BgWaveCustom from "../components/BgWaveCustom";

export default function AmildMusicHome() {
  return (
    <Link href='/amildmusic/musical' className="flex fixed h-full w-full overflow-auto flex-col items-center justify-center pt-2 pb-5 px-0 lg:pt-0 lg:px-0 mt-0">
      <BgWaveCustom bg={'/amild/am-bg.jpg'}></BgWaveCustom>
      <div className="relative w-full flex justify-center items-center flex-col top-[-2rem] lg:top-[-6rem]">
        <div className='animate-upDown relative w-[35%] mx-auto flex justify-center items-center pointer-events-none'>
          <Image src='/amild/am-logo.png' width={304} height={254} alt='Zirolu' className='w-full' priority />
        </div>
        <div className="animate-upDown2 relative w-full mx-auto mt-12">
          <Image src='/amild/am-preview.png' width={739} height={604} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
      <div className="absolute left-0 right-0 bottom-[1rem] w-full flex justify-center items-center">
        <div className="animate-upDownCepet relative mx-auto flex w-[78%] justify-center items-center">
          <Image src='/amild/am-start.png' width={550} height={88} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
    </Link>
  );
}
