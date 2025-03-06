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
    const [character, setCharacter] = useState(null);
    const [hijab, setHijab] = useState(false);
    const [payload, setPayload] = useState({
      name: '',
      ktp: '',
      gender: '',
      rokok: '',
      jenisrokok: ''
    });

    const isValid = () => {
      if (payload.name && payload.ktp && payload.ktp.length == 6 && errorUmur && payload.gender && payload.rokok || payload.jenisrokok) return true
      else return false;
    };



    const handleChange = (e) => {
        const { value, name } = e.target;
        setPayload((prev) => ({
          ...prev,
          [name]: value,
        }));

        // console.log(name)
        if(name == 'ktp'){
            // console.log(isAgeValid('99')); // Output: true (umur 25 tahun)
            // console.log(isAgeValid('03'));
            if(value.length == 6){
                // if(value.slice(0,2) >= '99')
                // console.log(value.slice(0,2))
                // console.log(isAgeValid(value.slice(0,2)))
                // if(isAgeValid(value.slice(0,2))) setErrorUmur(false); else setErrorUmur(true);

                // setErrorUmur(isAgeValid(value.slice(0,2)))
                // console.log(errorUmur)
            }
        }
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
            localStorage.setItem("personalityFix", character)
        }

        setTimeout(() => {
            router.push('/amildmusic/name');
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
                            id='name'
                            name='name'
                            className={`w-full text-base lg:text-5xl outline-none py-3 lg:py-8 px-3 lg:px-8 border-2 border-white text-white bg-transparent backdrop-blur ${kanit.className}`}
                            placeholder='Isi nama lo'
                            onChange={handleChange}
                        />
                    </div>
                    {/* {payload.name} */}
                    {/* {errorMsg && <p className='text-[#E00A0A] text-xs'>{errorMsg}</p>} */}
                </div>
            </div>
            {/* !PILIH STYLE */}
            <div className={`relative w-full flex justify-center items-center mt-0 z-20 ${character ? `` : 'opacity-0 pointer-events-none'}`}>
                <button className="relative mx-auto w-[92%] flex justify-center items-center" onClick={generateAI}>
                    <Image src='/amild/am-next.png' width={550} height={88} alt='Zirolu' className='w-full' priority />
                </button>
            </div>
        </main>
    );
}
