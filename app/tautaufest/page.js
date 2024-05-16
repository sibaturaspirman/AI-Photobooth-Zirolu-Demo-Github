
import Image from "next/image";
import Link from 'next/link';
import TopLogoGG from "../components/TopLogoGG";

export default function GGJDMHome() {
  return (
    <main className="flex fixed h-full w-full bg-ggjdm overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-0 lg:px-20 mt-0">
      <Link href='/gg-jdm/register' className="fixed w-full h-full top-0 left-0 z-10"></Link>
      <TopLogoGG></TopLogoGG>
      <div className="relative w-[75%] mx-auto mt-0">
        <Image src='/ggjdm/title.png' width={803} height={206} alt='Zirolu' className='w-full' priority />
      </div>
      <div className="relative w-full flex justify-center items-center mt-[4vh] mb-[5vh]">
        <div className='animate-upDown relative w-[100%] mx-auto flex justify-center items-center pointer-events-none'>
          <Image src='/ggjdm/preview-new.png' width={864} height={721} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
      <div className="relative w-full flex justify-center items-center">
        <div className="relative mx-auto flex w-[68%] justify-center items-center">
          <Image src='/ggjdm/btn-start-new.png' width={1920} height={388} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
    </main>
  );
}
