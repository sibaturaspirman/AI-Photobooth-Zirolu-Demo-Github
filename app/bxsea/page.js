import Image from "next/image";
import Link from 'next/link';
import TopLogo from "./../components/TopLogo";
import { Paytone_One} from "next/font/google";
const paytone_one = Paytone_One({ subsets: ["latin"], weight: '400' });

export default function BXSeaHome() {
  return (
    <main className="flex fixed h-full w-full bg overflow-auto flex-col items-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20">
      <TopLogo></TopLogo>
      {/* <h1 className={`text-center text-xl mt-[-.7rem] lg:mt-0 lg:text-7xl lg:mb-5 ${paytone_one.className}`}><span className="text-sm">AI PHOTOBOOTH :</span> <br></br> BXSEA</h1> */}
      <h1 className={`text-center text-xl mt-[-.7rem] lg:mt-0 lg:text-7xl lg:mb-5 ${paytone_one.className}`}><span className="text-sm">AI PHOTOBOOTH :</span> <br></br> DEMO</h1>
      <div className="relative w-full flex justify-center items-center mt-5 mb-2 lg:mt-12 lg:mb-14">
        <div className='animate-upDown relative w-1/3 mx-1 flex justify-center items-center pointer-events-none'>
          <Image src='/bxsea/pinjem-m-1.jpeg' width={365} height={640} alt='Zirolu' className='w-full' priority />
        </div>
        <div className='animate-upDown2 relative w-1/3 mx-1 flex justify-center items-center pointer-events-none'>
          <Image src='/bxsea/pinjem-m-2.jpeg' width={365} height={640} alt='Zirolu' className='w-full' priority />
        </div>
        {/* <div className='animate-upDown3 relative w-1/3 mx-1 flex justify-center items-center pointer-events-none'>
          <Image src='/bxsea/bxsea-w-4.jpeg' width={365} height={640} alt='Zirolu' className='w-full' priority />
        </div> */}
      </div>
      <div className="relative w-full flex justify-center items-center mt-0 mb-6 lg:mt-12 lg:mb-14">
        <div className='animate-upDown relative w-1/3 mx-1 flex justify-center items-center pointer-events-none'>
          <Image src='/bxsea/pinjem-w-1.jpeg' width={365} height={640} alt='Zirolu' className='w-full' priority />
        </div>
        <div className='animate-upDown2 relative w-1/3 mx-1 flex justify-center items-center pointer-events-none'>
          <Image src='/bxsea/pinjem-w-2.jpeg' width={365} height={640} alt='Zirolu' className='w-full' priority />
        </div>
        {/* <div className='animate-upDown3 relative w-1/3 mx-1 flex justify-center items-center pointer-events-none'>
          <Image src='/bxsea/bxsea-w-3.jpeg' width={365} height={640} alt='Zirolu' className='w-full' priority />
        </div> */}
      </div>
      <div className="relative w-full flex justify-center items-center">
        {/* <Link href='/register' className="relative mx-auto flex w-[70%] justify-center items-center">
          <Image src='/btn-taptostart.png' width={410} height={96} alt='Zirolu' className='w-full' priority />
        </Link> */}
        <Link href='/bxsea/how' className="relative mx-auto flex w-[70%] justify-center items-center">
          <Image src='/btn-taptostart.png' width={410} height={96} alt='Zirolu' className='w-full' priority />
        </Link>
      </div>
    </main>
  );
}
