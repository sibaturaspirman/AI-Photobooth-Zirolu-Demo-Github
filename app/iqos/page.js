import Image from "next/image";
import Link from 'next/link';

export default function IQOSHome() {
  return (
    <Link href='/iqos/style' className="flex fixed h-full w-full bg-iqos overflow-auto flex-col items-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20">
      <div className="fixed top-0 left-0 w-full h-full bg-iqos-border pointer-events-none z-10"></div>
      <div className="relative w-[80%] mx-auto mt-44">
        <Image src='/iqos/title.png' width={803} height={206} alt='Zirolu' className='w-full' priority />
      </div>
      <div className="relative w-full flex justify-center items-center mt-5 mb-6 lg:mt-24 lg:mb-14">
        <div className='animate-upDown relative w-[90%] mx-auto flex justify-center items-center pointer-events-none'>
          <Image src='/iqos/preview.png' width={864} height={721} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
      <div className="relative w-full flex justify-center items-center lg:mt-20">
        <div className="relative mx-auto flex w-[85%] justify-center items-center">
          <Image src='/iqos/tap.png' width={731} height={39} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
    </Link>
  );
}
