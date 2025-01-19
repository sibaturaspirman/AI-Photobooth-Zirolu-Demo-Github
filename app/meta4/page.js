
import Image from "next/image";
import Link from 'next/link';

export default function IQOSHome() {
  return (
    <div className="flex fixed h-full w-full bg-meta2 overflow-auto flex-col items-center justify-center">
      <div className="fixed top-0 left-0 w-full h-full bg-iqos-border pointer-events-none z-10"></div>
      <div className="relative w-[60%] mt-[8rem] mb-[6rem]">
        <div className='relative w-full mx-auto flex justify-center items-center'>
          <Image src='/meta/title.png' width={751} height={212} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
      <div className="relative w-full">
        <Image src='/meta/preview2.png' width={787} height={84} alt='Zirolu' className='w-full' priority />
      </div>
      <div className="relative w-[80%] mb-[11rem]">
        <Link href='meta4/style' className='relative w-full mx-auto flex justify-center items-center'>
          <Image src='/meta/btn-continue3.png' width={880} height={144} alt='Zirolu' className='w-full' priority />
        </Link>
      </div>
    </div>
  );
}
