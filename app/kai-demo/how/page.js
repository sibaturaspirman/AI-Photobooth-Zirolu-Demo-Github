'use client';

import Link from 'next/link';
import Image from "next/image";
import TopLogoKAI from "../../components/TopLogoKAI";
import { Poppins} from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ['400','700', '900'] });
export default function How() {
    return (
        <main className="flex fixed h-full w-full bg-kai overflow-auto flex-col items-center pt-10 pb-5 px-5 lg:pt-12 lg:px-20">
            <TopLogoKAI></TopLogoKAI>
            <h1 className={`text-center text-xl font-bold mt-2 lg:mt-0 lg:text-5xl mb-0 lg:mb-5 ${poppins.className}`}>HOW TO</h1>
            <div className="relative w-full flex flex-col justify-center items-center mt-3 mb-3">
                <div className='relative w-[65%] mb-2 lg:mb-12'>
                    <Image src='/kai/how-to.png' width={550} height={651} alt='Zirolu' className='w-full' priority />
                </div>
            </div>

            <div className="relative w-full flex justify-center items-center">
                <Link href='/kai-demo/cam' className="relative mx-auto flex w-[70%] justify-center items-center">
                    <Image src='/kai/btn-next.png' width={480} height={96} alt='Zirolu' className='w-full' priority />
                </Link>
            </div>
        </main>
    );
}
