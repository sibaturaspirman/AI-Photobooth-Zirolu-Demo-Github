
import Image from "next/image";
import Link from 'next/link';

export default function IQOSHome() {
  return (
    <div className="flex fixed bg-[#CC1419] h-full w-full overflow-auto flex-col items-center justify-center">
      <div className="relative w-[83%] mt-[-10rem] z-20">
        <div className='relative w-full mx-auto flex justify-center items-center'>
          <Image src='/music/how.png' width={342} height={358} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
      <div className="absolute mx-auto bottom-[5rem] w-[80%] animate-upDown4 z-20">
        <Link href='/music/v3/cam' className='relative w-full mx-auto flex justify-center items-center'>
          <Image src='/music/btn-start.png' width={880} height={144} alt='Zirolu' className='w-full' priority />
        </Link>
      </div>
    </div>
  );
}
