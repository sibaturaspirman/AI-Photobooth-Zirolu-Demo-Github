'use client';

import Link from 'next/link';
import Image from "next/image";
import TopLogoDexa from "../../components/TopLogoDexa";
import { Poppins} from "next/font/google";
const poppins = Poppins({ subsets: ["latin"], weight: ['400','700', '900'] });
export default function How() {
    return (
        <main className="flex fixed h-full w-full bg-dexa overflow-auto flex-col items-center pt-10 pb-5 px-5 lg:pt-12 lg:px-20">
            <TopLogoDexa></TopLogoDexa>
            <h1 className={`text-center text-4xl font-bold mt-5 mb-10 ${poppins.className}`}>HOW TO</h1>
            <div className="relative w-full flex flex-col justify-center items-center mt-3 mb-3">
                <div className='relative w-[65%] mb-10'>
                    <Image src='/dexa/howto-new.png' width={550} height={651} alt='Zirolu' className='w-full' priority />
                </div>
            </div>

            <div className="relative w-full flex justify-center items-center">
                <Link href='/dexa/cam' className="relative mx-auto flex w-[70%] justify-center items-center">
                    <Image src='/dexa/btn-next.png' width={479} height={96} alt='Zirolu' className='w-full' priority />
                </Link>
            </div>
        </main>
    );
}
