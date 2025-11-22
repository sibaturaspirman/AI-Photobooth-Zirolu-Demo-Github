
import Image from "next/image";
import Link from 'next/link';

export default function IQOSHome() {
  return (
    <Link href='/purina/pawshion-show/cam' className="flex fixed h-full w-full bg-purina-ps overflow-auto flex-col items-center justify-center">
      {/* <div className="fixed top-0 left-0 w-full h-full bg-iqos-border pointer-events-none z-10 hidden lg:block"></div> */}
      <div className="relative w-[80%] mt-[-4rem]">
        <Image src='/purina/ps-logo.png' width={314} height={503} alt='Zirolu' className='w-full' priority />
      </div>
      <div className="absolute mx-auto bottom-8 w-[80%] ">
        <div className='relative w-full mx-auto flex justify-center items-center animate-upDownCepet'>
          <Image src='/purina/ps-start.png' width={319} height={67} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
    </Link>
  );
}
