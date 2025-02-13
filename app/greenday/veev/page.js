
import Image from "next/image";
import Link from 'next/link';

export default function IQOSHome() {
  return (
    <div className="flex fixed h-full w-full bg-greenday-v overflow-auto flex-col items-center justify-center">
      <div className="fixed top-0 left-0 w-full h-full bg-iqos-border pointer-events-none z-10 hidden lg:block"></div>
      <div className="relative w-[63%] mt-[-12rem]">
        <div className='relative w-full mx-auto flex justify-center items-center'>
          <Image src='/greenday/v-logo.png' width={787} height={84} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
      {/* <div className="relative w-full">
        <Image src='/comcon/veev/preview.png' width={787} height={84} alt='Zirolu' className='w-full' priority />
      </div> */}
      <div className="absolute mx-auto bottom-10 lg:bottom-[20rem] w-[80%] ">
        <Link href='/greenday/veev/style' className='relative w-full mx-auto flex justify-center items-center'>
          <Image src='/greenday/v-continue.png' width={880} height={144} alt='Zirolu' className='w-full' priority />
        </Link>
      </div>
    </div>
  );
}
