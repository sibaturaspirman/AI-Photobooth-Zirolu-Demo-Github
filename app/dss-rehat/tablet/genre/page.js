'use client';

import Image from "next/image";
import { setCookie } from 'cookies-next';
import { useState } from 'react';
// import TopLogoPrimaria from "../../components/TopLogoPrimaria";
// import BtnPrimaria from "../../components/BtnPrimaria";
import { useRouter } from 'next/navigation';

import { Kanit} from "next/font/google";
const kanit = Kanit({ subsets: ["latin"], weight: ['400','700'] });

export default function Frame() {
    const router = useRouter();
    const [payload, setPayload] = useState({
      frame: ''
    });

    const isValid = () => {
      if (payload.frame) return true
      else return false;
    };

    const handleSubmit = () => {
        localStorage.setItem('genreFix', payload.frame)
        setCookie('genreFix', payload.frame);
        setTimeout(() => {
            router.push('/dss-rehat/tablet/cam2');
        }, 250);
    }
    return (
        <main className="flex fixed h-full w-full bg-dss overflow-auto flex-col items-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20">
            <div className="relative w-[70%] mx-auto mt-[10rem]">
            <Image src='/dss/genre.png' width={720} height={260} alt='Zirolu' className='w-full' priority />
            </div>
            <div className="relative w-full flex flex-col justify-center items-center mt-0 lg:mt-8 mb-0 lg:mb-14">
                <div className='relative w-[80%]'>
                    <div className='relative w-full'>
                        <div className='overflow-hiddenx w-full mx-auto'>
                            <ul className='choose mod11 !mt-0'>
                            <li className="pr-2">
                                <input
                                id='choose_style1'
                                type="radio"
                                name='choose_style'
                                value='jazz'
                                onChange={(e) => 
                                    setPayload((prev) => ({
                                        ...prev,
                                        frame: e.target.value,
                                    }))
                                }
                                />
                                <label htmlFor="choose_style1">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/dss/genre1.png"
                                    alt="icon"
                                    width={384}
                                    height={480}
                                    priority
                                />
                                </label>
                            </li>
                            <li className="pl-2">
                                <input
                                id='choose_style2'
                                type="radio"
                                name='choose_style'
                                value="pop"
                                onChange={(e) => 
                                    setPayload((prev) => ({
                                        ...prev,
                                        frame: e.target.value,
                                    }))
                                }
                                />
                                <label htmlFor="choose_style2">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/dss/genre2.png"
                                    alt="icon"
                                    width={384}
                                    height={480}
                                    priority
                                />
                                </label>
                            </li>
                            <li className="pr-2">
                                <input
                                id='choose_style3'
                                type="radio"
                                name='choose_style'
                                value='rb'
                                onChange={(e) => 
                                    setPayload((prev) => ({
                                        ...prev,
                                        frame: e.target.value,
                                    }))
                                }
                                />
                                <label htmlFor="choose_style3">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/dss/genre3.png"
                                    alt="icon"
                                    width={384}
                                    height={480}
                                    priority
                                />
                                </label>
                            </li>
                            <li className="pl-2">
                                <input
                                id='choose_style4'
                                type="radio"
                                name='choose_style'
                                value="rock"
                                onChange={(e) => 
                                    setPayload((prev) => ({
                                        ...prev,
                                        frame: e.target.value,
                                    }))
                                }
                                />
                                <label htmlFor="choose_style4">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/dss/genre4.png"
                                    alt="icon"
                                    width={384}
                                    height={480}
                                    priority
                                />
                                </label>
                            </li>
                            </ul>
                        </div>
                    </div>
                    {/* {payload.frame} */}
                    {/* {payload} */}
                    {/* {errorMsg && <p className='text-[#E00A0A] text-xs'>{errorMsg}</p>} */}
                </div>
            </div>
            {/* <div className="relative w-[90%] flex justify-center items-center">
                <BtnPrimaria
                    button={'lanjut'}
                    disabled={!isValid()}
                    onClick={handleSubmit}
                />
            </div> */}

            <div className={`relative w-full flex justify-center items-center mt-0 z-20 ${payload.frame != '' ? `` : 'opacity-0 pointer-events-none'}`}>
                <button className="relative mx-auto w-[100%] flex justify-center items-center" onClick={handleSubmit}>
                    <Image src='/dss/btn-continue.png' width={850} height={258} alt='Zirolu' className='w-full' priority />
                </button>
            </div>
        </main>
    );
}
