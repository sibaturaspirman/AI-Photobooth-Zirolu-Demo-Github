
import Image from "next/image";
import Link from 'next/link';

export default function IQOSHome() {
  return (
    <Link href='/comcon/visikom/style' className="flex fixed h-full w-full bg-visikom-front overflow-auto flex-col items-center justify-center">
      <div className="fixed top-0 left-0 w-full h-full bg-iqos-border pointer-events-none z-10"></div>
      <div className="relative w-full flex justify-center items-center">
        <div className='relative w-full mx-auto flex justify-center items-center pointer-events-none'>
          <Image src='/comcon/visikom/front.png' width={1080} height={1495} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
    </Link>
  );
}
