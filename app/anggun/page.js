import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <Link href='/anggun/cam' className="flex min-h-screen bg-anggun flex-col items-center justify-center pt-12 p-20">
      <div className='relative w-[60%] mx-auto flex justify-center items-center pointer-events-none'>
        <Image src='/anggun/title-front.png' width={534} height={119} alt='Zirolu' className='w-full' priority />
      </div>
      <div className="relative w-full flex justify-center items-center mt-20 mb-20">
        <div className='animate-upDown relative w-full mx-auto flex justify-center items-center pointer-events-none'>
          <Image src='/anggun/frontNEW.png' width={1177} height={944} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
      <div className="relative w-full flex justify-center items-center">
        <div className="relative mx-auto flex justify-center items-center">
          <Image src='/anggun/tap-anywhere.png' width={820} height={192} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
    </Link>
  );
}
