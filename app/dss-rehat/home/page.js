'use client';
import Image from "next/image";
import Link from 'next/link';
import BgWaveCustom from "../../components/BgWaveCustom";

export default function PrimariaHome() {
  return (
    <div className="flex fixed h-full w-full overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-0 lg:px-20 mt-0">
      <BgWaveCustom bg={'/dss/bgpattern.jpg'}></BgWaveCustom>
      <div className="relative w-full flex justify-center items-center flex-col">
        <div className='relative w-[80%] mx-auto flex justify-center items-center pointer-events-none'>
          <Image src='/dss/mahakaraoke.png' width={709} height={137} alt='Zirolu' className='w-full' priority />
        </div>
        <Link href='/dss-rehat/game' className='relative w-[95%] mx-auto flex justify-center items-center mt-10'>
          <Image src='/dss/op1.png' width={942} height={720} alt='Zirolu' className='w-full' priority />
        </Link>
        <Link href='/dss-rehat/ai' className='relative w-[95%] mx-auto flex justify-center items-center mt-8'>
          <Image src='/dss/op2.png' width={942} height={720} alt='Zirolu' className='w-full' priority />
        </Link>
      </div>
    </div>
  );
}
