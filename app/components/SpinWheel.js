'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from "next/image";

import { Open_Sans } from "next/font/google";
const OpenSans = Open_Sans({ subsets: ["latin"], weight: ['400', '500'] });

const segments = ['Hadiah 1', 'Hadiah 2', 'Hadiah 3', 'Hadiah 4', 'Hadiah 5', 'Hadiah 6']
const segmentCount = segments.length

export default function SpinWheel() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [hadiah, setHadiah] = useState()

  const spin = () => {
    if (isSpinning) return
    setIsSpinning(true)

    const spins = 3 + Math.floor(Math.random() * 3) // spin 3-5 times
    const randomSegment = Math.floor(Math.random() * segmentCount)
    const anglePerSegment = 360 / segmentCount
    const targetRotation = spins * 360 + (360 - randomSegment * anglePerSegment)

    setRotation(prev => prev + targetRotation)

    setTimeout(() => {
      setIsSpinning(false)
      setHadiah(segments[randomSegment])
    //   alert(`You got: ${segments[randomSegment]}`)
    }, 4000)
  }

  return (
    <div className="relative flex flex-col items-center justify-center p-8">
      {/* Pointer */}
      <div className="pointer-events-none absolute top-0 z-10 w-[70px] ">
        <Image src='/digitalstamp/samsung-pointer.png' width={56} height={48} alt='Zirolu' className='w-full' priority />
      </div>

      {/* Wheel */}
      <div className='relative w-full flex items-center justify-center'>
        <div className='relative h-[310px] w-[310px] rounded-full border-[10px] border-[#1A1A4E] shadow-md'>
            <motion.div
                className="relative h-full w-full rounded-full border-[2px] border-[#fff]"
                animate={{ rotate: rotation }}
                transition={{ duration: 4, ease: 'easeInOut' }}
                style={{
                background: 'conic-gradient(#1A1A4E 0deg, #1A1A4E 60deg, #C3E8F0 60deg, #C3E8F0 120deg, #1A1A4E 120deg, #1A1A4E 180deg, white 180deg, white 240deg, #1A1A4E 240deg, #1A1A4E 300deg, #C3E8F0 300deg, #C3E8F0 360deg)'
                }}
            >
            </motion.div>
        </div>
        <div className='absolute left-0 top-0 bottom-0 right-0 flex items-center justify-center w-[44%] m-auto'>
            <Image src='/digitalstamp/samsung-circle.png' width={98} height={98} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
        
        {hadiah && 
            <p className={` pointer-events-none mt-2 inline-block mx-auto text-center px-6 py-2 text-xs bg-[#2A2A5C] rounded-full mt-2 text-[#fff] ${OpenSans.className}`}>{hadiah}</p>
        }

      {/* Button */}
      <button
        onClick={spin}
        disabled={isSpinning}
        className="mt-6 shadow-lg disabled:opacity-50"
      >
        <Image src='/digitalstamp/samsung-btn-spin.png' width={295} height={56} alt='Zirolu' className='w-full' priority />
      </button>
    </div>
  )
}
