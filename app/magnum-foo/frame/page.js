'use client';

import Image from "next/image";
import { setCookie } from 'cookies-next';
import { useState } from 'react';
// // import TopLogoPrimaria from "../../../components/TopLogoPrimaria";
import BgWaveCustom from "../../components/BgWaveCustom";
// import BtnPrimaria from "../../../components/BtnPrimaria";
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
        // localStorage.setItem('PMR_frame', payload.frame)
        localStorage.setItem('formasiFix', payload.frame)
        // setCookie('PMR_frame', payload.frame);
        setTimeout(() => {
            router.push('/magnum-foo/cam');
        }, 250);
    }
    return (
        <main className="flex fixed h-full w-full overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20" onContextMenu={(e)=> e.preventDefault()}>
            <BgWaveCustom bg={'/magnum/muse-bg.jpg'}></BgWaveCustom>
           
            <div className='relative w-[120px] lg:w-[66%] mx-auto mb-5 flex justify-center items-center z-10'>
                <Image src='/greenday/m-pilihframe.png' width={345} height={64} alt='Zirolu' className='w-full' priority />
            </div>

            <div className="relative w-full flex flex-col justify-center items-center mt-0 lg:mt-8 mb-0 lg:mb-14">
                <div className='relative w-[80%]'>
                    <div className='relative w-full'>
                        <div className='overflow-hiddenx w-full mx-auto'>
                            <ul className='choose mod11 !mt-0 flex-col'>
                            <li className="pr-2">
                                <input
                                id='choose_style1'
                                type="radio"
                                name='choose_style'
                                value='1'
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
                                    src="/magnum/foo-f1.jpg"
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
                                value="2"
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
                                    src="/magnum/foo-f2.jpg"
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
                                value='3'
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
                                    src="/magnum/foo-f3.jpg"
                                    alt="icon"
                                    width={384}
                                    height={480}
                                    priority
                                />
                                </label>
                            </li>
                            {/* <li className="pl-2">
                                <input
                                id='choose_style4'
                                type="radio"
                                name='choose_style'
                                value="_4"
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
                            </li> */}
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
            <div className={`relative w-full ${payload.frame != '' ? '' : 'hidden'}`}>
                <div className="relative w-[90%] mx-auto flex justify-center items-center flex-col mt-0">
                    <button className="w-full relative mx-auto flex justify-center items-center" onClick={handleSubmit}>
                        <Image src='/greenday/m-btn-lanjut.png' width={764} height={144} alt='Zirolu' className='w-full' priority />
                    </button>
                </div>
            </div>
        </main>
    );
}
