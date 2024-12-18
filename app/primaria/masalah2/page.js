'use client';

// import Image from "next/image";
import { setCookie } from 'cookies-next';
import { useState } from 'react';
import TopLogoPrimaria from "../../components/TopLogoPrimaria";
import BtnPrimaria from "../../components/BtnPrimaria";
import { useRouter } from 'next/navigation';

import { Kanit} from "next/font/google";
const kanit = Kanit({ subsets: ["latin"], weight: ['400','700'] });

export default function Masalah() {
    const router = useRouter();
    const [payload, setPayload] = useState({
        masalah: ''
    });

    const isValid = () => {
      if (payload.masalah) return true
      else return false;
    };

    const handleSubmit = () => {
        localStorage.setItem('PMR_masalah', payload.masalah)
        setCookie('PMR_masalah', payload.masalah);
        setTimeout(() => {
            router.push('/primaria/how2');
        }, 250);
    }
    return (
        <main className="flex fixed h-full w-full bg-primaria overflow-auto flex-col items-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20">
            <TopLogoPrimaria></TopLogoPrimaria>
            <h1 className={`text-center text-xl lg:text-6xl font-medium mt-1 lg:mt-10 ${kanit.className}`}>Apa masalah yang lagi lo hadepin?</h1>
            <div className="relative w-full flex flex-col justify-center items-center mt-2 lg:mt-14 mb-0 lg:mb-4">
                <div className='relative w-full'>
                    <div className='relative w-full'>
                        <div className='overflow-hiddenx w-full mx-auto'>
                            <ul className='choose5'>
                            <li className="pr-2 lg:pr-5 !mb-5 lg:!mb-8">
                                <input
                                id='choose_style1'
                                type="radio"
                                name='choose_style'
                                value='DEADLINE'
                                onChange={(e) => 
                                    setPayload((prev) => ({
                                        ...prev,
                                        masalah: e.target.value,
                                    }))
                                }
                                />
                                <label htmlFor="choose_style1" className="text-base lg:text-4xl !px-0 !py-5 lg:!py-20">Dikejar deadline</label>
                            </li>
                            <li className="pl-2 lg:pl-5 !mb-5 lg:!mb-8">
                                <input
                                id='choose_style2'
                                type="radio"
                                name='choose_style'
                                value="LEMBUR"
                                onChange={(e) => 
                                    setPayload((prev) => ({
                                        ...prev,
                                        masalah: e.target.value,
                                    }))
                                }
                                />
                                <label htmlFor="choose_style2" className="text-base lg:text-4xl !px-0 !py-5 lg:!py-20">Kerja lembur</label>
                            </li>
                            <li className="pr-2 lg:pr-5 !mb-5 lg:!mb-8">
                                <input
                                id='choose_style3'
                                type="radio"
                                name='choose_style'
                                value='DIMARAHIN'
                                onChange={(e) => 
                                    setPayload((prev) => ({
                                        ...prev,
                                        masalah: e.target.value,
                                    }))
                                }
                                />
                                <label htmlFor="choose_style3" className="text-base lg:text-4xl !px-0 !py-5 lg:!py-20">Dimarahin bos</label>
                            </li>
                            <li className="pl-2 lg:pl-5 !mb-5 lg:!mb-8">
                                <input
                                id='choose_style4'
                                type="radio"
                                name='choose_style'
                                value="BOKEK"
                                onChange={(e) => 
                                    setPayload((prev) => ({
                                        ...prev,
                                        masalah: e.target.value,
                                    }))
                                }
                                />
                                <label htmlFor="choose_style4" className="text-base lg:text-4xl !px-0 !py-5 lg:!py-20">Lagi bokek</label>
                            </li>
                            <li className="pr-2 lg:pr-5 !mb-5 lg:!mb-8">
                                <input
                                id='choose_style5'
                                type="radio"
                                name='choose_style'
                                value='DITIKUNG'
                                onChange={(e) => 
                                    setPayload((prev) => ({
                                        ...prev,
                                        masalah: e.target.value,
                                    }))
                                }
                                />
                                <label htmlFor="choose_style5" className="text-base lg:text-4xl !px-0 !py-5 lg:!py-20">Ditikung temen</label>
                            </li>
                            <li className="pl-2 lg:pl-5 !mb-5 lg:!mb-8">
                                <input
                                id='choose_style6'
                                type="radio"
                                name='choose_style'
                                value="PUTUS"
                                onChange={(e) => 
                                    setPayload((prev) => ({
                                        ...prev,
                                        masalah: e.target.value,
                                    }))
                                }
                                />
                                <label htmlFor="choose_style6" className="text-base lg:text-4xl !px-0 !py-5 lg:!py-20">Putus cinta</label>
                            </li>
                            <li className="pr-2 lg:pr-5 !mb-5 lg:!mb-8">
                                <input
                                id='choose_style7'
                                type="radio"
                                name='choose_style'
                                value='CICILAN'
                                onChange={(e) => 
                                    setPayload((prev) => ({
                                        ...prev,
                                        masalah: e.target.value,
                                    }))
                                }
                                />
                                <label htmlFor="choose_style7" className="text-base lg:text-4xl !px-0 !py-5 lg:!py-20">Bayar Cicilan</label>
                            </li>
                            <li className="pl-2 lg:pl-5 !mb-5 lg:!mb-8">
                                <input
                                id='choose_style8'
                                type="radio"
                                name='choose_style'
                                value="CARIKERJA"
                                onChange={(e) => 
                                    setPayload((prev) => ({
                                        ...prev,
                                        masalah: e.target.value,
                                    }))
                                }
                                />
                                <label htmlFor="choose_style8" className="text-base lg:text-4xl !px-0 !py-5 lg:!py-20">Masih cari kerja</label>
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
                    button={'gas'}
                    disabled={!isValid()}
                    onClick={handleSubmit}
                />
            </div>
        </main>
    );
}
