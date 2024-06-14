import Image from "next/image";
import Link from 'next/link';

export default function Home() {
  return (
    <Link href='/gac/cam' className="flex min-h-screen bg-gac flex-col items-center justify-center pt-12 p-0 lg:p-20">
      <div className='fixed w-[65%] mx-auto flex justify-center items-center pointer-events-none top-[10rem] left-0 right-0 mx-auto'>
        <div className='animate-upDown relative w-full mx-auto flex justify-center items-center pointer-events-none'>
        <Image src='/gac/logo.png' width={938} height={138} alt='Zirolu' className='w-full' priority />
        </div>
      </div>

      <div className="fixed left-0 right-0 bottom-10 mx-auto w-[70%] flex justify-center items-center">
          <div className="relative mx-auto flex justify-center items-center w-full">
            <Image src='/gac/tap.png' width={756} height={139} alt='Zirolu' className='w-full' priority />
          </div>
        </div>
    </Link>
  );
}
