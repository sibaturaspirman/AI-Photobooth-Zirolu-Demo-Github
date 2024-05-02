
import Image from "next/image";
import Link from 'next/link';
import TopLogoMagnumFixed from "../components/TopLogoMagnumFixed";

export default function MagnumotionHome() {
  return (
    <Link href='/magnumotion/gender' className="flex fixed h-full w-full bg-magnumotion overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-0 lg:px-20 mt-0">
      <TopLogoMagnumFixed></TopLogoMagnumFixed>
      {/* <div className="relative w-[75%] mx-auto mt-0">
        <Image src='/iqos/title.png' width={803} height={206} alt='Zirolu' className='w-full' priority />
      </div> */}
      <div className="relative w-full flex justify-center items-center mt-5 mb-6 lg:mt-24 lg:mb-14">
        <div className='animate-upDown relative w-[100%] mx-auto flex justify-center items-center pointer-events-none'>
          <Image src='/magnumotion/preview.png' width={864} height={721} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
      <div className="relative w-full flex justify-center items-center lg:mt-0">
        <div className="relative mx-auto flex w-[68%] justify-center items-center">
          <Image src='/magnumotion/tap.png' width={191} height={52} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
    </Link>
  );
}
