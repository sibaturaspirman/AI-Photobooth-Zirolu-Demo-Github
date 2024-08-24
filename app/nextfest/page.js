
import Image from "next/image";
import Link from 'next/link';

export default function IQOSHome() {
  return (
    <Link href='/nextfest/style' className="flex fixed h-full w-full bg-nextfest overflow-auto flex-col items-center justify-center">
      <div className="relative w-[65%] mx-auto mb-[8rem] pointer-events-none">
        <Image src='/nextfest/title.png' width={736} height={84} alt='Zirolu' className='w-full' priority />
      </div>
      <div className="relative w-full flex justify-center items-center">
        <div className='relative w-[92%] mx-auto flex justify-center items-center pointer-events-none'>
          <Image src='/nextfest/preview.png' width={1069} height={548} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
      <div className="relative w-[55%] mx-auto mt-[8rem] pointer-events-none">
        <Image src='/nextfest/tap.png' width={558} height={60} alt='Zirolu' className='w-full' priority />
      </div>
    </Link>
  );
}
