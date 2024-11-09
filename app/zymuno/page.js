
import Image from "next/image";
import Link from 'next/link';
import { Poppins} from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ['400','700', '900'] });

export default function IQOSHome() {
  return (
    <Link href='/zymuno/style' className="flex fixed h-full w-full bg-zymuno overflow-auto flex-col items-center justify-center">
      <div className='relative w-[35%] mx-auto flex justify-center items-center z-50'>
        <Image src='/zymuno/logo.png' width={179} height={103} alt='Zirolu' className='w-full' priority />
      </div>
      <h1 className={`text-center text-4xl font-bold mt-5 mb-20 ${poppins.className}`}>AI PHOTOBOOTH</h1>
      <div className="relative w-[80%] flex justify-center items-center mt-[-1.5rem] mb-15  ">
        <div className='animate-upDown relative w-1/3 mx-auto flex justify-center items-center pointer-events-none'>
          <Image src='/zymuno/preview-1.png' width={232} height={610} alt='Zirolu' className='w-full' priority />
        </div>
        <div className='animate-upDown2 relative w-1/3 mx-auto flex justify-center items-center pointer-events-none'>
          <Image src='/zymuno/preview-2.png' width={232} height={610} alt='Zirolu' className='w-full' priority />
        </div>
        <div className='animate-upDown3 relative w-1/3 mx-auto flex justify-center items-center pointer-events-none'>
          <Image src='/zymuno/preview-3.png' width={232} height={610} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
      <div className="relative w-[55%] mx-auto mt-[3rem] pointer-events-none">
        <Image src='/zymuno/btn-tap.png' width={410} height={96} alt='Zirolu' className='w-full' priority />
      </div>
    </Link>
  );
}
