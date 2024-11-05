import Image from "next/image";
import Link from 'next/link';
import TopLogoMizuho from "./../components/TopLogoMizuho";
import { Paytone_One} from "next/font/google";
const paytone_one = Paytone_One({ subsets: ["latin"], weight: '400' });

export default function MizuhoHome() {
  return (
    <main className="flex fixed h-full w-full bg-mizuho overflow-auto flex-col items-center pt-2 pb-5 px-5 lg:pt-5 lg:px-20">
      <div className="flex relative h-full w-fulll max-w-xl overflow-auto flex-col items-center">
        <TopLogoMizuho></TopLogoMizuho>
        <h1 className={`text-center text-xl mt-2 lg:mt-4 lg:text-2xl lg:mb-5 ${paytone_one.className}`}>AI PHOTOBOOTH</h1>
        <div className="relative w-full flex justify-center items-center mt-5 mb-6 lg:mt-6 lg:mb-5">
          <div className='animate-upDown relative w-1/3 mx-1 flex justify-center items-center pointer-events-none'>
            <Image src='/mizuho/preview-1.png' width={365} height={640} alt='Zirolu' className='w-full' priority />
          </div>
          <div className='animate-upDown2 relative w-1/3 mx-1 flex justify-center items-center pointer-events-none'>
            <Image src='/mizuho/preview-2.png' width={365} height={640} alt='Zirolu' className='w-full' priority />
          </div>
          <div className='animate-upDown3 relative w-1/3 mx-1 flex justify-center items-center pointer-events-none'>
            <Image src='/mizuho/preview-3.png' width={365} height={640} alt='Zirolu' className='w-full' priority />
          </div>
        </div>
        <div className="relative w-full flex justify-center items-center">
          {/* <Link href='/register' className="relative mx-auto flex w-[70%] justify-center items-center">
            <Image src='/btn-taptostart.png' width={410} height={96} alt='Zirolu' className='w-full' priority />
          </Link> */}
          <Link href='/mizuho/how' className="relative mx-auto flex w-[50%] justify-center items-center">
            <Image src='/mizuho/btn-taptostart.png' width={410} height={96} alt='Zirolu' className='w-full' priority />
          </Link>
        </div>
      </div>
    </main>
  );
}
