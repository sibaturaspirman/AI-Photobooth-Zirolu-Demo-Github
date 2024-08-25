'use client';
import React,{ useEffect, useState, useRef } from 'react';
import Image from "next/image";
import Link from 'next/link';

export default function IQOSHome() {
  const [setPrint, setSetPrint] = useState('true');
  useEffect(() => {
      // Perform localStorage action
      if (localStorage.getItem("setPrint") === null) {
          setSetPrint('true')
      }else{
        const item3 = localStorage.getItem('setPrint')
        setSetPrint(item3)
      }
  }, [setPrint])

  const generatePrint = () => {
    setSetPrint('false')
    localStorage.setItem("setPrint", "false")
  }
  const generateNoPrint = () => {
    setSetPrint('true')
    localStorage.removeItem("setPrint")
  }

  return (
    <div className="flex fixed h-full w-full bg-nextfest overflow-auto flex-col items-center justify-center">
      <div className={`fixed top-0 left-0 w-[150px] h-[150px] bg-black flex items-center justify-center text-2xl opacity-50 z-20 ${setPrint == 'true' ? `` : 'hidden pointer-events-none'}`} onClick={generatePrint}>PRINT</div>
      <div className={`fixed top-0 left-0 w-[150px] h-[150px] bg-black flex items-center justify-center text-2xl opacity-50 z-20 ${setPrint == 'false' ? '' : 'hidden pointer-events-none'}`} onClick={generateNoPrint}>NO PRINT</div>
      <Link href='/nextfest/cadangan/style' className="flex fixed h-full w-full bg-nextfest overflow-auto flex-col items-center justify-center">
      <div className="relative w-[65%] mx-auto mb-[8rem] pointer-events-none">
        {/* {setPrint} */}
        <Image src='/nextfest/title.png' width={736} height={84} alt='Zirolu' className='w-full' priority />
      </div>
      <div className="relative w-full flex justify-center items-center">
        <div className='relative w-[92%] mx-auto flex justify-center items-center pointer-events-none'>
          <Image src='/nextfest/preview.png' width={1069} height={548} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
      <div className="relative w-[55%] mx-auto mt-[8rem] pointer-events-none">
        <Image src='/nextfest/tap.png' width={558} height={60} alt='Zirolu' className='w-full' priority />
      </div>
      </Link>
    </div>
  );
}
