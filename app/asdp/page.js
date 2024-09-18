
import Image from "next/image";
import Link from 'next/link';

export default function IQOSHome() {
  return (
    <Link href='/asdp/style' className="flex fixed h-full w-full bg-asdp overflow-auto flex-col items-center justify-center">
      {/* <div caslsName="relative w-[75%] mx-auto mb-[8rem] pointer-events-none">
        <Image src='/permata/title.png' width={803} height={118} alt='Zirolu' className='w-full' priority />
      </div>
      <div className="relative w-full flex justify-center items-center">
        <div className='relative w-[80%] mx-auto flex justify-center items-center pointer-events-none'>
          <Image src='/permata/preview.png' width={980} height={980} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
      <div className="relative w-[55%] mx-auto mt-[8rem] pointer-events-none">
        <Image src='/asdp/tap.png' width={553} height={58} alt='Zirolu' className='w-full' priority />
      </div> */}
    </Link>
  );
}
