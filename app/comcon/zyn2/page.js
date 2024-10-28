
import Image from "next/image";
import Link from 'next/link';

export default function IQOSHome() {
  return (
    <div className="flex fixed h-full w-full bg-zyn overflow-auto flex-col items-center justify-center">
      <div className="fixed top-0 left-0 w-full h-full bg-iqos-border pointer-events-none z-10"></div>
      <div className="relative w-[80%] mt-[5rem]">
        <div className='relative w-full mx-auto flex justify-center items-center'>
          <Image src='/comcon/zyn/title.png' width={787} height={84} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
      <div className="relative w-full">
        <Image src='/comcon/zyn/preview.png' width={787} height={84} alt='Zirolu' className='w-full' priority />
      </div>
      <div className="relative w-[80%]">
        <Link href='/comcon/zyn2/style' className='relative w-full mx-auto flex justify-center items-center'>
          <Image src='/comcon/zyn/btn-continue.png' width={880} height={144} alt='Zirolu' className='w-full' priority />
        </Link>
        <Link href='/comcon' className='relative w-full mx-auto flex justify-center items-center'>
          <Image src='/comcon/btn-back.png' width={880} height={144} alt='Zirolu' className='w-full' priority />
        </Link>
      </div>
    </div>
  );
}
