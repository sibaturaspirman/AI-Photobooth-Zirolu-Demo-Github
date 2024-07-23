'use client';

import Image from "next/image";
// import Link from 'next/link';
import { setCookie } from 'cookies-next';
import { useEffect, useRef, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';

export default function IQOSHome() {
  const router = useRouter();
  const [lokasi, setLokasi] = useState(null);

  const handleSubmit = () => {
    setCookie('lokasiIQOS', lokasi);
    setTimeout(() => {
        router.push('/iqos3/home');
    }, 250);
  }

  return (
    <div className="flex fixed h-full w-full bg-iqos-neon overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-0 lg:px-20 mt-0">
      <div className="relative w-[90%] mt-5 mb-10 lg:mt-20 lg:mb-14">
        <div className='relative w-full hiddenx'>
          <label htmlFor="choose_stasiun" className="block mb-5 lg:mb-5 text-2xl lg:text-5xl text-center font-bold text-white">Pilih Lokasi</label>
          <div>
            <ul className='choose2-amero text-5xl flex-col'>
              <li className="w-full mt-5">
                  <input
                  id='choose_lokasi1'
                  type="radio"
                  name='choose_lokasi'
                  value="tapalunia"
                  onChange={(e) => setLokasi(e.target.value)}
                  />
                  <label htmlFor="choose_lokasi1" className='text-2xl lg:h-[140px] lg:text-4xl'>Tapalunia</label>
              </li>
              <li className="w-full mt-5">
                  <input
                  id='choose_lokasi2'
                  type="radio"
                  name='choose_lokasi'
                  value="jackson"
                  onChange={(e) => setLokasi(e.target.value)}
                  />
                  <label htmlFor="choose_lokasi2" className='text-2xl lg:h-[140px] lg:text-4xl'>Ms. Jackson</label>
              </li>
              <li className="w-full mt-5">
                  <input
                  id='choose_lokasi3'
                  type="radio"
                  name='choose_lokasi'
                  value="izzy"
                  onChange={(e) => setLokasi(e.target.value)}
                  />
                  <label htmlFor="choose_lokasi3" className='text-2xl lg:h-[140px] lg:text-4xl'>Izzy Social Club</label>
              </li>
              <li className="w-full mt-5">
                  <input
                  id='choose_lokasi4'
                  type="radio"
                  name='choose_lokasi'
                  value="swill"
                  onChange={(e) => setLokasi(e.target.value)}
                  />
                  <label htmlFor="choose_lokasi4" className='text-2xl lg:h-[140px] lg:text-4xl'>Swill House</label>
              </li>
              <li className="w-full mt-5">
                  <input
                  id='choose_lokasi5'
                  type="radio"
                  name='choose_lokasi'
                  value="continent"
                  onChange={(e) => setLokasi(e.target.value)}
                  />
                  <label htmlFor="choose_lokasi5" className='text-2xl lg:h-[140px] lg:text-4xl'>Continent</label>
              </li>
            </ul>
          </div>
        </div>
        {lokasi &&
        <div className="relative w-full flex justify-center items-center lg:mt-20">
          <div className="relative mx-auto flex w-[90%] justify-center items-center" onClick={handleSubmit}>
          <Image src='/iqos/neon/btn-continue.png' width={775} height={180} alt='Zirolu' className='w-full' priority />
          </div>
        </div>}
      </div>
    </div>
  );
}
