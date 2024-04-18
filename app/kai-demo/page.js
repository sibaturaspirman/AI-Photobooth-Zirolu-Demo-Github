import Image from "next/image";
import Link from 'next/link';
import TopLogoAmeroBig from "../components/TopLogoAmeroBig";
import { Poppins} from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ['400','700', '900'] });

export default function KAIHome() {
  return (
    <main className="flex fixed h-full w-full bg-kai overflow-auto flex-col items-center pt-8 pb-5 px-5 lg:pt-12 lg:px-20">
      <TopLogoAmeroBig></TopLogoAmeroBig>
      <h1 className={`text-center text-2xl font-bold mt-0 mb-3 lg:mt-0 lg:text-7xl lg:mb-5 ${poppins.className}`}>AI PHOTOBOOTH</h1>
      <div className="relative w-[90%] flex justify-center items-center mt-0 mb-7 lg:mt-20 lg:mb-14">
        <div className='animate-upDown relative w-1/3 mx-auto flex justify-center items-center pointer-events-none'>
          <Image src='/kai/preview-1.png' width={232} height={610} alt='Zirolu' className='w-full' priority />
        </div>
        <div className='animate-upDown2 relative w-1/3 mx-auto flex justify-center items-center pointer-events-none'>
          <Image src='/kai/preview-2.png' width={232} height={610} alt='Zirolu' className='w-full' priority />
        </div>
        <div className='animate-upDown3 relative w-1/3 mx-auto flex justify-center items-center pointer-events-none'>
          <Image src='/kai/preview-3.png' width={232} height={610} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
      <div className="relative w-full flex justify-center items-center lg:mt-20">
        <Link href='/kai-demo/how' className="relative mx-auto flex w-[75%] justify-center items-center">
          <Image src='/kai/btn-taptostart.png' width={410} height={96} alt='Zirolu' className='w-full' priority />
        </Link>
      </div>
    </main>
  );
}
