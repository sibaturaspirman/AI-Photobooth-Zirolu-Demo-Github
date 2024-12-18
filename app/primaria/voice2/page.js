'use client';

import Image from "next/image";
import { setCookie } from 'cookies-next';
import { useState } from 'react';
import TopLogoPrimaria from "../../components/TopLogoPrimaria";
import BtnPrimaria from "../../components/BtnPrimaria";
import VoiceWave from "../../components/VoiceWave";
import BgWave from "../../components/BgWave";
import { useRouter } from 'next/navigation';

import { Kanit} from "next/font/google";
const kanit = Kanit({ subsets: ["latin"], weight: ['400','700'] });

export default function Voice() {
    return (
        <main className="flex fixed h-full w-full bg-primaria overflow-auto flex-col items-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20">
            <BgWave ></BgWave>
            <TopLogoPrimaria></TopLogoPrimaria>
            <h1 className={`text-center text-xl lg:text-6xl font-medium mt-1 lg:mt-10 z-20 !leading-snug ${kanit.className}`}>Ketawain masalah lo sekenceng-kencengnya sampai semangatmu terisi penuh!</h1>
            <div className="relative w-full flex flex-col justify-center items-center z-20">
                <VoiceWave direct={'cam2'} />
            </div>
        </main>
    );
}
