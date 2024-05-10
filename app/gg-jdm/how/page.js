'use client';

import Link from 'next/link';
import Image from "next/image";
import TopLogoGG from "./../../components/TopLogoGG";
import { Merriweather} from "next/font/google";
const merriweather = Merriweather({ subsets: ["latin"], weight: ['400','700'] });
export default function How() {
    return (
        <main className="flex fixed h-full w-full bg-ggjdm overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-0 lg:px-20 mt-0">
            <TopLogoGG></TopLogoGG>
            <div className="relative w-[45%] mx-auto mt-0 mb-10">
                <Image src='/ggjdm/title-howto.png' width={803} height={206} alt='Zirolu' className='w-full' priority />
            </div>
            <div className="relative w-full flex flex-col justify-center items-center mt-3 mb-3">
                <div className='relative w-[80%] lg:mb-12'>
                    <Image src='/ggjdm/how-new.png' width={550} height={675} alt='Zirolu' className='w-full' priority />
                </div>
            </div>

            <div className="relative w-full flex justify-center items-center mt-[4vh]">
                <Link href='/gg-jdm/style' className="relative mx-auto flex w-[70%] justify-center items-center">
                    <Image src='/ggjdm/btn-next.png' width={410} height={96} alt='Zirolu' className='w-full' priority />
                </Link>
            </div>
        </main>
    );
}
