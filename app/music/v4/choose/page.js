
import Image from "next/image";
import Link from 'next/link';

export default function IQOSHome() {
  return (
    <div className="flex fixed bg-[#CC1419] h-full w-full overflow-auto flex-col items-center justify-center">
      <div className="relative w-[75%] mt-0 z-20">
        <div className='relative w-full mx-auto flex justify-center items-center'>
          <Image src='/music/pick.png' width={232} height={460} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
      <div className="relative mx-auto w-[70%] mt-3 z-20">
        <Link href='/music/v4/name' className='relative w-full mx-auto flex justify-center items-center mb-4'>
          <Image src='/music/m1.png' width={880} height={144} alt='Zirolu' className='w-full' priority />
        </Link>
        <Link href='/music/v4/name' className='relative w-full mx-auto flex justify-center items-center mb-4'>
          <Image src='/music/m2.png' width={880} height={144} alt='Zirolu' className='w-full' priority />
        </Link>
        <Link href='/music/v4/name' className='relative w-full mx-auto flex justify-center items-center'>
          <Image src='/music/m3.png' width={880} height={144} alt='Zirolu' className='w-full' priority />
        </Link>
      </div>
    </div>
  );
}
