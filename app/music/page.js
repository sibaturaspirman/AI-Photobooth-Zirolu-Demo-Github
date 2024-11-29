
import Image from "next/image";
import Link from 'next/link';

export default function IQOSHome() {
  return (
    <div className="flex fixed bg-music h-full w-full overflow-auto flex-col items-center justify-center">
      <div className={`fixed top-0 left-0 w-full h-full bg-music pointer-events-none z-10 animate-bgScale`}></div>
      <div className="relative w-[63%] mt-[-10rem] z-20">
        <div className='relative w-full mx-auto flex justify-center items-center'>
          <Image src='/music/logo.png' width={822} height={362} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
      <div className="absolute mx-auto bottom-[5rem] w-[80%] animate-upDown4 z-20">
        <Link href='/music/setup' className='relative w-full mx-auto flex justify-center items-center'>
          <Image src='/music/begin.png' width={880} height={144} alt='Zirolu' className='w-full' priority />
        </Link>
      </div>
    </div>
  );
}
