'use client';

import Link from 'next/link';
import Image from "next/image";
import { useState } from 'react';
import TopLogoPrimaria from "../../components/TopLogoPrimaria";
// import { useRouter } from 'next/navigation';

export default function How() {
    return (
        <Link href='/primaria/voice2' className="flex fixed h-full w-full bg-primaria overflow-auto flex-col items-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20">
            <TopLogoPrimaria></TopLogoPrimaria>
            <div className="fixed w-full h-full flex flex-col justify-center items-center top-[-6rem]">
                <div className="animate-upDown2 relative w-[75%] mx-auto">
                    <Image src='/primaria/tertawakan.png' width={824} height={504} alt='Zirolu' className='w-full' priority />
                </div>
            </div>
            <div className="absolute left-0 right-0 bottom-[8rem] w-full flex justify-center items-center">
                <div className="animate-upDownCepet relative mx-auto flex w-[78%] justify-center items-center">
                <Image src='/primaria/btn-lesgo.png' width={819} height={126} alt='Zirolu' className='w-full' priority />
                </div>
            </div>
        </Link>
    );
}
