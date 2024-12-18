'use client';

import Image from "next/image";
import { setCookie } from 'cookies-next';
import { useState } from 'react';
import TopLogoPrimaria from "../../components/TopLogoPrimaria";
import BtnPrimaria from "../../components/BtnPrimaria";
import { useRouter } from 'next/navigation';

import { Kanit} from "next/font/google";
const kanit = Kanit({ subsets: ["latin"], weight: ['400','700'] });

export default function Data() {
    const router = useRouter();
    const [errorUmur, setErrorUmur] = useState(true)
    const [payload, setPayload] = useState({
      name: '',
      ktp: '',
      gender: '',
      rokok: '',
      jenisrokok: ''
    });

    const isValid = () => {
      if (payload.name && payload.ktp && payload.ktp.length == 6 && errorUmur && payload.gender && payload.rokok == 'yes' && payload.jenisrokok) return true
      else return false;
    };

    const isAgeValid = (twoDigitYearString) => {
        const twoDigitYear = parseInt(twoDigitYearString, 10); // Konversi string ke angka
        const currentYear = new Date().getFullYear(); // Mendapatkan tahun sekarang
        const yearPrefix = twoDigitYear > 30 ? 1900 : 2000; // Menentukan abad
        const birthYear = yearPrefix + twoDigitYear; // Tahun lahir lengkap
        const age = currentYear - birthYear; // Hitung umur
    
        return age >= 21; // Periksa apakah umur >= 21
    }

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

                setErrorUmur(isAgeValid(value.slice(0,2)))
                // console.log(errorUmur)
            }
        }
    };

    const handleSubmit = () => {
        localStorage.setItem('formasiFix', payload.gender)
        setCookie('PMR_name', payload.name);
        setCookie('PMR_gender', payload.gender);
        setCookie('PMR_ktp', payload.ktp);
        setCookie('PMR_rokok', payload.rokok);
        setCookie('PMR_jenisrokok', payload.jenisrokok);
        setTimeout(() => {
            router.push('/primaria/frame2');
        }, 100);
    }
    return (
        <main className="flex fixed h-full w-full bg-primaria overflow-auto flex-col items-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20">
            <div className={`fixed top-0 left-0 w-full h-full bg-black/80 backdrop-blur flex items-center justify-center z-50 ${errorUmur ? 'hidden' : ''}`}>
            <a href='/primaria' className='relative w-[80%] mx-auto flex justify-center items-center'>
                <Image src='/primaria/error_umur.png' width={960} height={814} alt='Zirolu' className='w-full' priority />
            </a>
            </div>
            <div className={`fixed top-0 left-0 w-full h-full bg-black/80 backdrop-blur flex items-center justify-center z-50 ${payload.rokok == 'no' ? '' : 'hidden'}`}>
            <a href='/primaria' className='relative w-[80%] mx-auto flex justify-center items-center'>
                <Image src='/primaria/error_rokok.png' width={960} height={742} alt='Zirolu' className='w-full' priority />
            </a>
            </div>
            
            <TopLogoPrimaria></TopLogoPrimaria>
            <h1 className={`text-center text-xl lg:text-6xl font-medium mt-1 lg:mt-10 ${kanit.className}`}>Masukkan data diri lo</h1>
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
                <div className='relative w-[80%] mb-5 lg:mb-14'>
                    <div className='relative w-full'>
                        <input
                            type='number'
                            value={payload.ktp}
                            id='ktp'
                            name='ktp'
                            className={`w-full text-base lg:text-5xl outline-none py-3 lg:py-8 px-3 lg:px-8 border-2 border-white text-white bg-transparent backdrop-blur ${kanit.className}`}
                            placeholder='Isi 6 digit terakhir no KTP lo'
                            onChange={handleChange}
                        />
                    </div>
                    {/* {payload.ktp} */}
                    {/* {errorMsg && <p className='text-[#E00A0A] text-xs'>{errorMsg}</p>} */}
                </div>
                <div className='relative w-[80%] mb-0 lg:mb-14'>
                    <label htmlFor="choose_style" className={`text-light text-center text-base lg:text-5xl mb-1 lg:mb-8 block ${kanit.className}`}>Pilih Gender</label>
                    <div className='relative w-full'>
                        <div className='overflow-hiddenx w-full mx-auto'>
                            <ul className='choose mod12 !mt-0'>
                            <li className="pr-2">
                                <input
                                id='choose_style1'
                                type="radio"
                                name='choose_style'
                                value='FEMALE'
                                onChange={(e) => 
                                    setPayload((prev) => ({
                                        ...prev,
                                        gender: e.target.value,
                                    }))
                                }
                                />
                                <label htmlFor="choose_style1">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/primaria/gender1.png"
                                    alt="icon"
                                    width={380}
                                    height={120}
                                    priority
                                />
                                <Image
                                    className="absolute top-0 left-0 h-auto w-full"
                                    src="/primaria/gender1_c.png"
                                    alt="icon"
                                    width={380}
                                    height={120}
                                    priority
                                />
                                </label>
                            </li>
                            <li className="pl-2">
                                <input
                                id='choose_style2'
                                type="radio"
                                name='choose_style'
                                value="MALE"
                                onChange={(e) => 
                                    setPayload((prev) => ({
                                        ...prev,
                                        gender: e.target.value,
                                    }))
                                }
                                />
                                <label htmlFor="choose_style2">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/primaria/gender2.png"
                                    alt="icon"
                                    width={380}
                                    height={120}
                                    priority
                                />
                                <Image
                                    className="absolute top-0 left-0 h-auto w-full"
                                    src="/primaria/gender2_c.png"
                                    alt="icon"
                                    width={380}
                                    height={120}
                                    priority
                                />
                                </label>
                            </li>
                            </ul>
                        </div>
                    </div>
                    {/* {payload.gender} */}
                    {/* {payload} */}
                    {/* {errorMsg && <p className='text-[#E00A0A] text-xs'>{errorMsg}</p>} */}
                </div>
                <div className='relative w-[80%]'>
                    <label htmlFor="choose_rokok" className={`text-light text-center text-base lg:text-5xl mb-1 lg:mb-8 block ${kanit.className}`}>Apakah lo seorang perokok?</label>
                    <div className='relative w-full'>
                        <div className='overflow-hiddenx w-full mx-auto flex justify-center items-center'>
                            <ul className='choose mod12 !w-[60%] mx-auto !mt-0'>
                            <li className="pr-2">
                                <input
                                id='choose_rokok1'
                                type="radio"
                                name='choose_rokok'
                                value="no"
                                onChange={(e) => 
                                    setPayload((prev) => ({
                                        ...prev,
                                        rokok: e.target.value,
                                    }))
                                }
                                />
                                <label htmlFor="choose_rokok1">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/primaria/rk_b.png"
                                    alt="icon"
                                    width={200}
                                    height={60}
                                    priority
                                />
                                <Image
                                    className="absolute top-0 left-0 h-auto w-full"
                                    src="/primaria/rk_bc.png"
                                    alt="icon"
                                    width={200}
                                    height={60}
                                    priority
                                />
                                </label>
                            </li>
                            <li className="pl-2">
                                <input
                                id='choose_rokok2'
                                type="radio"
                                name='choose_rokok'
                                value="yes"
                                onChange={(e) => 
                                    setPayload((prev) => ({
                                        ...prev,
                                        rokok: e.target.value,
                                    }))
                                }
                                />
                                <label htmlFor="choose_rokok2">
                                <Image
                                    className="relative h-auto w-full"
                                    src="/primaria/rk_y.png"
                                    alt="icon"
                                    width={200}
                                    height={60}
                                    priority
                                />
                                <Image
                                    className="absolute top-0 left-0 h-auto w-full"
                                    src="/primaria/rk_yc.png"
                                    alt="icon"
                                    width={200}
                                    height={60}
                                    priority
                                />
                                </label>
                            </li>
                            </ul>
                        </div>
                    </div>
                    {/* {payload.rokok} */}
                </div>
                <div className={`relative w-[80%] mt-0 lg:mt-14 ${payload.rokok == 'yes' ? '' : 'hidden'}`}>
                    <div className='relative w-full'>
                        <input
                            type='text'
                            value={payload.jenisrokok}
                            id='jenisrokok'
                            name='jenisrokok'
                            className={`w-full text-base lg:text-5xl outline-none py-3 lg:py-8 px-3 lg:px-8 border-2 border-white text-white bg-transparent backdrop-blur ${kanit.className}`}
                            placeholder='Lo ngerokok apa?'
                            onChange={handleChange}
                        />
                    </div>
                    {/* {payload.name} */}
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
