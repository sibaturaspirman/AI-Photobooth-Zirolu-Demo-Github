'use client';
import Image from "next/image";
import Link from 'next/link';
import BgWave from "../components/BgWave";

export default function PrimariaHome() {
  return (
    <Link href='/dss-rehat/gender' className="flex fixed bg-dss-front h-full w-full overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-0 lg:px-20 mt-0">
      {/* <div className="relative w-full flex justify-center items-center flex-col top-[-6rem]">
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
      </div> */}
    </Link>
  );
}
