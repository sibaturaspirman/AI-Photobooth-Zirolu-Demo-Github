'use client';

import Link from 'next/link';
import Image from "next/image";
import TopLogo from "../components/TopLogo";
import { Paytone_One} from "next/font/google";
const paytone_one = Paytone_One({ subsets: ["latin"], weight: '400' });
export default function How() {
    return (
        <main className="flex min-h-screen flex-col items-center justify-top pt-2 pb-5 px-5 lg:pt-12 lg:px-20">
            <TopLogo></TopLogo>
            <h1 className={`text-center text-xl mt-[-.7rem] lg:mt-0 lg:text-7xl lg:mb-5 ${paytone_one.className}`}>HOW TO</h1>
            <div className="relative w-full flex flex-col justify-center items-center mt-3 mb-3">
                <div className='relative w-[80%] lg:mb-12'>
                    <Image src='/how-to.png' width={550} height={679} alt='Zirolu' className='w-full' priority />
                </div>
            </div>

            <div className="relative w-full flex justify-center items-center">
                <Link href='/cam' className="relative mx-auto flex w-[70%] justify-center items-center">
                    <Image src='/btn-next.png' width={410} height={96} alt='Zirolu' className='w-full' priority />
                </Link>
            </div>
        </main>
    );
}
