'use client';
import Image from "next/image";
import Link from 'next/link';
import BgWaveCustom from "../../components/BgWaveCustom";

export default function PrimariaHome() {
  return (
    <Link href='/dss-rehat/age' className="flex fixed h-full w-full overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-0 lg:px-20 mt-0">
      <BgWaveCustom bg={'/dss/bgpattern.jpg'}></BgWaveCustom>
      <div className="relative w-full flex justify-center items-center flex-col">
        <div className='animate-bgScale2 relative w-[70%] mx-auto flex justify-center items-center pointer-events-none'>
          <Image src='/dss/sentuh.png' width={696} height={696} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
    </Link>
  );
}
