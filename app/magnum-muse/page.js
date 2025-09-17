'use client';
import Image from "next/image";
import Link from 'next/link';
import BgWaveCustom from "../components/BgWaveCustom";

export default function GreendayMagnumHome() {
  return (
    <Link href='/magnum-muse/frame' className="flex fixed h-full w-full overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-0 lg:px-20 mt-0">
      <BgWaveCustom bg={'/magnum/muse-bg.jpg'}></BgWaveCustom>
      <div className="relative w-full flex justify-center items-center flex-col lg:top-[-6rem]">
        <div className='animate-upDown relative w-[35%] lg:w-[40%] mx-auto flex justify-center items-center pointer-events-none'>
          <Image src='/magnum/muse-front.png' width={442} height={1405} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
      <div className="absolute left-0 right-0 bottom-3 lg:bottom-[8rem] w-full flex justify-center items-center">
        <div className="animate-upDownCepet relative mx-auto flex w-[78%] justify-center items-center">
          <Image src='/greenday/m-btn-mulai.png' width={764} height={144} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
    </Link>
  );
}
