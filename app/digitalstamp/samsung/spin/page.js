'use client';

import Link from 'next/link';
import SpinWheel from '../../../components/SpinWheel'
import Image from "next/image";

export default function HomePage() {
  return (
    <main className="flex fixed h-full w-full bg-[#F4F4F4] overflow-hidden flex-col items-center pt-2 pb-5 px-5 lg:pt-12" onContextMenu={(e)=> e.preventDefault()}>
        <div className='w-full mt-2 mb-3'>
            <Image src='/digitalstamp/samsung-reward.png' width={327} height={85} alt='Zirolu' className='w-full' priority />
        </div>
        <SpinWheel />

        <Link href='/digitalstamp/samsung' className={`fixed bottom-0 left-0 w-full z-50 border-[1px] border-[#C1C1C1]`}>
            <Image src='/digitalstamp/samsung-menu.png' width={375} height={63} alt='Zirolu' className='w-full' priority />
        </Link>
    </main>
  )
}
