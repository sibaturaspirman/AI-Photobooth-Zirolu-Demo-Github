'use client';

import Image from "next/image";
import { setCookie } from 'cookies-next';
import { useState } from 'react';
import TopLogoPrimaria from "../../components/TopLogoPrimaria";
import BtnPrimaria from "../../components/BtnPrimaria";
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
        localStorage.setItem('PMR_frame', payload.frame)
        setCookie('PMR_frame', payload.frame);
        setTimeout(() => {
            router.push('/primaria/masalah');
        }, 250);
    }
    return (
        <main className="flex fixed h-full w-full bg-primaria overflow-auto flex-col items-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20">
            <TopLogoPrimaria></TopLogoPrimaria>
            <h1 className={`text-center text-6xl font-medium mt-10 ${kanit.className}`}>Pilih frame yang lo suka</h1>
            <div className="relative w-full flex flex-col justify-center items-center mt-2 lg:mt-8 mb-2 lg:mb-14">
                <div className='relative w-[80%]'>
                    <div className='relative w-full'>
                        <div className='overflow-hiddenx w-full mx-auto'>
                            <ul className='choose mod11'>
                            <li className="pr-2">
                                <input
                                id='choose_style1'
                                type="radio"
                                name='choose_style'
                                value='f1'
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
                                    src="/primaria/f1.jpg"
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
                                value="f2"
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
                                    src="/primaria/f2.jpg"
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
                                value='f3'
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
                                    src="/primaria/f3.jpg"
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
                                value="f4"
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
                                    src="/primaria/f4.jpg"
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
            <div className="relative w-[90%] flex justify-center items-center">
                <BtnPrimaria
                    button={'lanjut'}
                    disabled={!isValid()}
                    onClick={handleSubmit}
                />
            </div>
        </main>
    );
}
