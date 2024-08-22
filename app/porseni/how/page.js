'use client';

import Link from 'next/link';
import Image from "next/image";
import TopLogoMizuho from "./../../components/TopLogoMizuho";
import { Paytone_One} from "next/font/google";
const paytone_one = Paytone_One({ subsets: ["latin"], weight: '400' });
export default function How() {
    return (
        <main className="flex fixed h-full w-full bg-mizuho overflow-auto flex-col items-center pt-2 pb-5 px-5 lg:pt-5 lg:px-20">
            <div className="flex relative h-full w-fulll max-w-xl overflow-auto flex-col items-center">
                <TopLogoMizuho></TopLogoMizuho>
                <h1 className={`text-center text-xl mt-2 lg:mt-4 lg:text-2xl lg:mb-5 ${paytone_one.className}`}>HOW TO</h1>
                <div className="relative w-full flex flex-col justify-center items-center mt-3 mb-3">
                    <div className='relative w-[60%] lg:mb-2'>
                        <Image src='/mizuho/how-to.png' width={550} height={679} alt='Zirolu' className='w-full' priority />
                    </div>
                </div>

                <div className="relative w-full flex justify-center items-center">
                    <Link href='/mizuho/style' className="relative mx-auto flex w-[50%] justify-center items-center">
                        <Image src='/mizuho/btn-next.png' width={410} height={96} alt='Zirolu' className='w-full' priority />
                    </Link>
                </div>
            </div>
        </main>
    );
}
