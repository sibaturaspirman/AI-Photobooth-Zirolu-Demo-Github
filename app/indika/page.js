
import Image from "next/image";
import Link from 'next/link';

export default function IQOSHome() {
  return (
    <Link href='/indika/style' className="flex fixed h-full w-full bg-indika-front overflow-auto flex-col items-center justify-center">
      {/* <div className="fixed top-0 left-0 w-full h-full bg-iqos-border pointer-events-none z-10"></div> */}
      {/* <div className="relative w-[80%] mx-auto ">
        <Image src='/iqos/cmcn-tap.png' width={684} height={88} alt='Zirolu' className='w-full animate-upDownCepet' priority />
      </div> */}
    </Link>
  );
}
