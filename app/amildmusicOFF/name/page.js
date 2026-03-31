'use client';

// import * as fal from '@fal-ai/serverless-client';
import Image from "next/image";
import { useEffect, useState, useMemo } from 'react';
import BgWaveCustom from "../../components/BgWaveCustom";
import { useRouter } from 'next/navigation';
// import io from 'socket.io-client';

import { Kanit} from "next/font/google";
const kanit = Kanit({ subsets: ["latin"], weight: ['400','700'] });

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Register() {
    const router = useRouter();
    const [nameValid, setNameValid] = useState(false);
    const [payload, setPayload] = useState({
      name: ''
    });

    const isValid = () => {
      if (payload.name) return true
      else return false;
    };



    const handleChange = (e) => {
        const { value, name } = e.target;
        setPayload((prev) => ({
          ...prev,
          [name]: value,
        }));

        if (payload.name) setNameValid(true) 
            else setNameValid(false)
    };

    const generateAI = () => {
        // let randomGambar = getRandomInt(1,3)
        // if(character == 'cowok'){
        //     if (typeof localStorage !== 'undefined') {
        //         localStorage.setItem("formasiFix", 'MALE')
        //     }
        // }else{
        //     if(!hijab){
        //         if (typeof localStorage !== 'undefined') {
        //             localStorage.setItem("formasiFix", 'FEMALE')
        //         }
        //     }else{
        //         if (typeof localStorage !== 'undefined') {
        //             localStorage.setItem("formasiFix", 'HIJAB')
        //         }
        //     }
        // }

        if (typeof localStorage !== 'undefined') {
            localStorage.setItem("nameFix", payload.name.toUpperCase())
        }

        setTimeout(() => {
            router.push('/amildmusic/result');
        }, 100);
    }

    return (
        <main className="flex fixed h-full w-full overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20" onContextMenu={(e)=> e.preventDefault()}>
            <BgWaveCustom bg={'/amild/am-bg.jpg'}></BgWaveCustom>
            <div className="relative w-[75%] mx-auto mt-0">
            <Image src='/amild/am-title3.png' width={471} height={216} alt='Zirolu' className='w-full' priority />
            </div>
            {/* PILIH STYLE */}
            <div className="relative w-full flex flex-col justify-center items-center mt-2 lg:mt-12 mb-2 lg:mb-14">
                <div className='relative w-[80%] mb-3 lg:mb-10'>
                    <div className='relative w-full'>
                        <input
                            type='text'
                            value={payload.name}
                            maxLength={10}
                            id='name'
                            name='name'
                            className={`w-full bg-white text-base lg:text-5xl outline-none py-3 lg:py-8 px-3 lg:px-8 border-4 lg:border-8 border-black text-black ${kanit.className}`}
                            placeholder='Isi nama lo'
                            onChange={handleChange}
                        />
                        <p className="mt-2 lg:mt-5 text-base lg:text-3xl">Max. 10 characters</p>
                    </div>
                    {/* {payload.name} */}
                    {/* {errorMsg && <p className='text-[#E00A0A] text-xs'>{errorMsg}</p>} */}
                </div>
            </div>
            {/* !PILIH STYLE */}
            <div className={`relative w-full flex justify-center items-center mt-0 z-20 ${nameValid ? `` : 'opacity-0 pointer-events-none'}`}>
                <button className="relative mx-auto w-[92%] flex justify-center items-center" onClick={generateAI}>
                    <Image src='/amild/am-next.png' width={550} height={88} alt='Zirolu' className='w-full' priority />
                </button>
            </div>
        </main>
    );
}
