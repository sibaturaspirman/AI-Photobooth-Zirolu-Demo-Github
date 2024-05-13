import Image from "next/image";
import Link from 'next/link';
import TopLogoDexa from "../components/TopLogoDexa";
import { Poppins} from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ['400','700', '900'] });

export default function DexaHome() {
  return (
    <main className="flex fixed h-full w-full bg-dexa overflow-auto flex-col items-center pt-8 pb-5 px-5 lg:pt-12 lg:px-20">
      <TopLogoDexa></TopLogoDexa>
      <h1 className={`text-center text-4xl font-bold mt-5 mb-10 ${poppins.className}`}>AI PHOTOBOOTH</h1>
      <div className="relative w-[90%] flex justify-center items-center mt-0 mb-15  ">
        <div className='animate-upDown relative w-1/3 mx-auto flex justify-center items-center pointer-events-none'>
          <Image src='/dexa/preview-1.png' width={232} height={610} alt='Zirolu' className='w-full' priority />
        </div>
        <div className='animate-upDown2 relative w-1/3 mx-auto flex justify-center items-center pointer-events-none'>
          <Image src='/dexa/preview-2.png' width={232} height={610} alt='Zirolu' className='w-full' priority />
        </div>
        <div className='animate-upDown3 relative w-1/3 mx-auto flex justify-center items-center pointer-events-none'>
          <Image src='/dexa/preview-3.png' width={232} height={610} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
      <div className="relative w-full flex justify-center items-center mt-20">
        <Link href='/dexa/register' className="relative mx-auto flex w-[75%] justify-center items-center">
          <Image src='/dexa/btn-start.png' width={479} height={96} alt='Zirolu' className='w-full' priority />
        </Link>
      </div>
    </main>
  );
}
