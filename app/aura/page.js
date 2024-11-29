
import Image from "next/image";
import Link from 'next/link';

export default function IQOSHome() {
  return (
    <div className="flex fixed h-full w-full bg-a overflow-auto flex-col items-center justify-center">
      <div className="relative w-[63%]">
        <div className='relative w-full mx-auto flex justify-center items-center'>
          <Image src='/comcon/veev/title.png' width={787} height={84} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
      <div className="relative w-full">
        <Image src='/comcon/veev/preview.png' width={787} height={84} alt='Zirolu' className='w-full' priority />
      </div>
      <div className="relative w-[80%]">
        <Link href='/aura/aura' className='relative w-full mx-auto flex justify-center items-center'>
          <Image src='/btn-continue-a.png' width={880} height={144} alt='Zirolu' className='w-full' priority />
        </Link>
      </div>
    </div>
  );
}
