'use client';
import Image from "next/image";
import Link from 'next/link';
import BgWaveCustom from "../../components/BgWaveCustom";

export default function GreendayMagnumHome() {
  return (
    <Link href='/greenday/magnum22/voice2' className="flex fixed h-full w-full overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-0 lg:px-20 mt-0">
      <BgWaveCustom bg={'/greenday/m-bg.jpg'}></BgWaveCustom>
      <div className="relative w-full flex justify-center items-center flex-col lg:top-[-6rem]">
        <div className='animate-upDown relative w-[35%] lg:top-[-11rem] lg:w-[80%] mb-5 lg:mb-[5rem] mx-auto flex justify-center items-center pointer-events-none'>
          <Image src='/greenday/m-berani.png' width={954} height={186} alt='Zirolu' className='w-full' priority />
        </div>

        <div className="relative mx-auto flex w-[78%] justify-center items-center">
          <Image src='/greenday/m-bass.png' width={947} height={908} alt='Zirolu' className='w-full animate-bgScale2' priority />
          <div className="animate-bgScale3 w-full absolute top-0 left-0 mx-auto flex justify-center items-center">
           <Image src='/greenday/m-bass2.png' width={947} height={908} alt='Zirolu' className='relative z-20' priority />
          </div>
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
