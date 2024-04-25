import Image from "next/image";
import Link from 'next/link';

export default function HMSHome() {
  return (
    <Link href='/hms-farewell/style' className="flex fixed h-full w-full bg-hms overflow-auto flex-col items-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20">
      <div className="relative w-[90%] mx-auto mt-44">
        <Image src='/hms/title.png' width={641} height={117} alt='Zirolu' className='w-full' priority />
      </div>
      <div className="relative w-full flex justify-center items-center mt-5 mb-6 lg:mt-20 lg:mb-14">
        <div className='animate-upDown relative w-full mx-auto flex justify-center items-center pointer-events-none'>
          <Image src='/hms/preview.png' width={720} height={400} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
      <div className="relative w-full flex justify-center items-center lg:mt-20">
        <div className="relative mx-auto flex w-[85%] justify-center items-center">
          <Image src='/hms/tap.png' width={532} height={39} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
    </Link>
  );
}
