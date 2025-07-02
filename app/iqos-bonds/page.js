'use client';
import Image from "next/image";
import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import ReactPlayer from 'react-player'
import Link from 'next/link';
import BgWaveCustom from "../components/BgWaveCustom";

const options = [
  {
    value: 'casual',
    image: '/iqos/bonds-q1-op1.png',
  },
  {
    value: 'minimalist',
    image: '/iqos/bonds-q1-op2.png',
  },
  {
    value: 'bold',
    image: '/iqos/bonds-q1-op3.png',
  },
  {
    value: 'modern',
    image: '/iqos/bonds-q1-op4.png',
  },
]
const options2 = [
  {
    value: 'warm',
    image: '/iqos/bonds-q2-op1.png',
  },
  {
    value: 'cool',
    image: '/iqos/bonds-q2-op2.png',
  },
  {
    value: 'punchy',
    image: '/iqos/bonds-q2-op3.png',
  },
  {
    value: 'fresh',
    image: '/iqos/bonds-q2-op4.png',
  },
]

export default function IQOSHome() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [playVideo, setPlayVideo] = useState(false);

  const [hasilProduct, setHasilProduct] = useState(null)
  const [selected, setSelected] = useState([])
  const [selected2, setSelected2] = useState([])

  const toggleOption = (option) => {
    if (selected.includes(option)) {
      setSelected(selected.filter(item => item !== option))
    } else {
      if (selected.length < 2) {
        setSelected([...selected, option])
      }
    }
  }
  const toggleOption2 = (option) => {
    if (selected2.includes(option)) {
      setSelected2(selected2.filter(item => item !== option))
    } else {
      if (selected2.length < 2) {
        setSelected2([...selected2, option])
      }
    }
  }


  const handleNext = () => {
    const sorted = [...selected].sort()
  
    if (sorted.includes('casual') && sorted.includes('bold')) {
      localStorage.setItem('bondsProduct', 'BOND')
      setHasilProduct('BOND')
    } else if (sorted.includes('minimalist') && sorted.includes('modern')) {
      localStorage.setItem('bondsProduct', 'ILUMA')
      setHasilProduct('ILUMA')
    } else {
      const random = Math.random() < 0.5 ? 'ILUMA' : 'BOND'
      localStorage.setItem('bondsProduct', random)
      setHasilProduct(random)
    }

    const interests = ['MUSIC', 'ART']
    const randomInterest = interests[Math.floor(Math.random() * interests.length)]
    localStorage.setItem('bondsInterest', randomInterest)
  
    // alert(`Saved to localStorage! product = ${localStorage.getItem('bondsProduct')}`)
    setPage(3)
  }

  const handleNext2 = () => {
    setPage(4)
  }
  const handleNext3 = () => {
    setPage(6)
    setPlayVideo(true)
  }

  const handleMediaEnded = () => {
    router.push('/iqos-bonds/style/');
  }

  return (
    <main className="flex fixed bg-iqos-bonds h-full w-full overflow-auto flex-col items-center justify-center">
      {/* <BgWaveCustom bg={'/iqos/bonds-bg.jpg'}></BgWaveCustom> */}
      <div className="fixed top-0 left-0 w-full h-full bg-iqos-border pointer-events-none z-10 hidden lg:block"></div>
      <div className={`relative w-full ${page == 0 ? '' : 'opacity-0'}`} onClick={() => setPage(1)}>
        <div className='relative w-[75%] mx-auto flex justify-center items-center'>
          <Image src='/iqos/bonds-title.png' width={866} height={288} alt='Zirolu' className='w-full' priority />
        </div>
        <div className='animate-bgScale2 relative w-[25%] mx-auto flex justify-center items-center'>
          <Image src='/iqos/bonds-circle.png' width={184} height={184} alt='Zirolu' className='w-full' priority />
        </div>
        <div className="relative w-[80%] mx-auto">
          <Image src='/iqos/bonds-snap.png' width={499} height={158} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
      <div className={`fixed mx-auto top-0 left-0 w-full h-full flex flex-col items-center justify-center  ${page == 1 ? '' : 'opacity-0  pointer-events-none'}`} onClick={() => setPage(2)}>
        <div className="relative w-[80%] mx-auto">
          <Image src='/iqos/bonds-find.png' width={871} height={406} alt='Zirolu' className='w-full' priority />
        </div>
        <div className='animate-bgScale2 relative w-[35%] mx-auto flex justify-center items-center mt-[5rem]'>
          <Image src='/iqos/bonds-tap.png' width={184} height={184} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
      <div className={`fixed mx-auto top-0 left-0 w-full h-full flex flex-col items-center justify-center  ${page == 2 ? '' : 'opacity-0  pointer-events-none'}`}>
        <div className="text-center w-[90%]">
          <div className="relative w-full mx-auto">
            <Image src='/iqos/bonds-q1.png' width={871} height={262} alt='Zirolu' className='w-full' priority />
          </div>
          <div className="relative w-[80%] mx-auto">
            <div className="grid grid-cols-2 gap-4">
              {options.map(option => (
                <div
                  key={option.value}
                  onClick={() => toggleOption(option.value)}
                  className={`cursor-pointer rounded-full overflow-hidden border-8 transition-all duration-300
                    ${selected.includes(option.value)
                      ? 'border-white'
                      : 'border-transparent opacity-100 hover:opacity-100'}
                  `}
                >
                  <img src={option.image} alt={option.label} className="w-full" />
                  {/* <div className="p-2 text-sm font-semibold bg-black bg-opacity-40 text-white">
                    {option.label}
                  </div> */}
                </div>
              ))}
            </div>


            {/* NEXT BUTTON */}
            {selected.length === 2 && (
              <div className="animate-bgScale2 relative mx-auto flex w-[50%] justify-center items-center mt-[4rem]"onClick={handleNext}>
                <Image src='/iqos/bonds-next.png' width={407} height={160} alt='Zirolu' className='w-full' priority />
              </div>
            )}
          </div>

          {/* {selected.length === 2 && (
            <div className="mt-6 text-sm">
              ✅ You selected: <strong>{selected.join(' & ')}</strong>
            </div>
          )} */}
        </div>
      </div>

      <div className={`fixed mx-auto top-0 left-0 w-full h-full flex flex-col items-center justify-center  ${page == 3 ? '' : 'opacity-0  pointer-events-none'}`}>
        <div className="text-center w-[90%]">
          <div className="relative w-full mx-auto">
            <Image src='/iqos/bonds-q1.png' width={871} height={262} alt='Zirolu' className='w-full' priority />
          </div>
          <div className="relative w-[80%] mx-auto">
            <div className="grid grid-cols-2 gap-4">
              {options2.map(option => (
                <div
                  key={option.value}
                  onClick={() => toggleOption2(option.value)}
                  className={`cursor-pointer rounded-full overflow-hidden border-8 transition-all duration-300
                    ${selected2.includes(option.value)
                      ? 'border-white'
                      : 'border-transparent opacity-100 hover:opacity-100'}
                  `}
                >
                  <img src={option.image} alt={option.label} className="w-full" />
                  {/* <div className="p-2 text-sm font-semibold bg-black bg-opacity-40 text-white">
                    {option.label}
                  </div> */}
                </div>
              ))}
            </div>


            {/* NEXT BUTTON */}
            {selected2.length === 2 && (
              <div className="animate-bgScale2 relative mx-auto flex w-[50%] justify-center items-center mt-[4rem]"onClick={handleNext2}>
                <Image src='/iqos/bonds-next.png' width={407} height={160} alt='Zirolu' className='w-full' priority />
              </div>
            )}
          </div>

          {/* {selected2.length === 2 && (
            <div className="mt-6 text-sm">
              ✅ You selected2: <strong>{selected2.join(' & ')}</strong>
            </div>
          )} */}
        </div>
      </div>

      <div className={`fixed mx-auto top-0 left-0 w-full h-full flex flex-col items-center justify-center  ${page == 4 && hasilProduct == 'BOND' ? '' : 'opacity-0  pointer-events-none'}`} onClick={handleNext3}>
        <div className='relative w-[95%] mx-auto flex justify-center items-center'>
          <Image src='/iqos/bonds-result1.png' width={871} height={358} alt='Zirolu' className='w-full' priority />
        </div>
        <div className="animate-bgScale2 relative mx-auto flex w-[35%] justify-center items-center mt-8">
          <Image src='/iqos/bonds-next.png' width={407} height={160} alt='Zirolu' className='w-full' priority />
        </div>
      </div>

      <div className={`fixed mx-auto top-0 left-0 w-full h-full flex flex-col items-center justify-center  ${page == 4 && hasilProduct == 'ILUMA' ? '' : 'opacity-0  pointer-events-none'}`} onClick={handleNext3}>
        <div className='relative w-[95%] mx-auto flex justify-center items-center'>
          <Image src='/iqos/bonds-result2.png' width={871} height={358} alt='Zirolu' className='w-full' priority />
        </div>
        <div className="animate-bgScale2 relative mx-auto flex w-[35%] justify-center items-center mt-8">
          <Image src='/iqos/bonds-next.png' width={407} height={160} alt='Zirolu' className='w-full' priority />
        </div>
      </div>


      <div className={`fixed mx-auto top-0 left-0 w-full h-full flex flex-col items-center justify-center  ${page == 6 ? '' : 'opacity-0  pointer-events-none'}`}>
        <div className={`w-full flex items-center justify-center`}>
            {/* <video src={imageResultAI} playsInline loop className="mx-auto w-full border-4 shadow-xl border-white"></video> */}
            <ReactPlayer url={['/iqos/bonds-vid1-rev.mp4']} onEnded={handleMediaEnded}  playing={playVideo} playsinline width="100%" height="100%"/>
        </div>
      </div>
    </main>
  );
}
