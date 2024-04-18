import Image from "next/image";
import Link from 'next/link';
import TopLogo from "./components/TopLogo";
import { Paytone_One} from "next/font/google";
const paytone_one = Paytone_One({ subsets: ["latin"], weight: '400' });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center pt-2 pb-5 lg:pt-12">
      <TopLogo></TopLogo>
      <h1 className={`text-center text-xl mt-[-.7rem] lg:mt-0 lg:text-7xl lg:mb-5 ${paytone_one.className}`}>The AI Photo Booth For Events  </h1>
      <div className="relative w-full mt-7">
        <p className="text-center text-sm mb-3">Explore our AI DEMO from the options below</p>
        <Link href='/disney' rel="noopener noreferrer" target="_blank" className="relative mx-auto flex w-full justify-center items-center">
          <Image src='/page-disney.jpeg' width={780} height={186} alt='Zirolu' className='w-full' priority />
        </Link>
        <Link href='/avatar' rel="noopener noreferrer" target="_blank" className="relative mx-auto flex w-full justify-center items-center">
          <Image src='/page-avatar.jpeg' width={780} height={186} alt='Zirolu' className='w-full' priority />
        </Link>
        <Link href='/vespamini' rel="noopener noreferrer" target="_blank" className="relative mx-auto flex w-full justify-center items-center">
          <Image src='/page-vespa.jpeg' width={780} height={186} alt='Zirolu' className='w-full' priority />
        </Link>
        <Link href='/xxi' rel="noopener noreferrer" target="_blank" className="relative mx-auto flex w-full justify-center items-center">
          <Image src='/page-xxi.jpeg' width={780} height={186} alt='Zirolu' className='w-full' priority />
        </Link>
         <Link href='/uniqlo' rel="noopener noreferrer" target="_blank" className="relative mx-auto flex w-full justify-center items-center">
          <Image src='/page-uniqlo.jpeg' width={780} height={186} alt='Zirolu' className='w-full' priority />
        </Link>
        <Link  href="/kai-demo" rel="noopener noreferrer" target="_blank" className="relative mx-auto flex w-full justify-center items-center">
          <Image src='/page-kai.jpeg' width={780} height={186} alt='Zirolu' className='w-full' priority />
        </Link>
        <Link href='/amero-demo' rel="noopener noreferrer" target="_blank" className="relative mx-auto flex w-full justify-center items-center">
          <Image src='/page-amero.jpeg' width={780} height={186} alt='Zirolu' className='w-full' priority />
        </Link>
        <Link href='/taro' rel="noopener noreferrer" target="_blank" className="relative mx-auto flex w-full justify-center items-center">
          <Image src='/page-taro.jpeg' width={780} height={186} alt='Zirolu' className='w-full' priority />
        </Link>
        <Link href='/mobilelegend' rel="noopener noreferrer" target="_blank" className="relative mx-auto flex w-full justify-center items-center">
          <Image src='/page-mobilelegend.jpeg' width={780} height={186} alt='Zirolu' className='w-full' priority />
        </Link>
        <Link href='/moslem' rel="noopener noreferrer" target="_blank" className="relative mx-auto flex w-full justify-center items-center">
          <Image src='/page-moslem.jpeg' width={780} height={186} alt='Zirolu' className='w-full' priority />
        </Link>
        <Link href='/bxsea' rel="noopener noreferrer" target="_blank" className="relative mx-auto flex w-full justify-center items-center">
          <Image src='/page-bxsea.jpeg' width={780} height={186} alt='Zirolu' className='w-full' priority />
        </Link>


        <div className="">
        <a href='https://www.instagram.com/zirolu.id' target='_blank' className='p-5 py-8 block text-center text-sm lg:text-2xl text-white'>Have your own style in mind? contact us through instagram @zirolu.id</a>
        </div>
        <Link href='/others' rel="noopener noreferrer" target="_blank" className="relative mx-auto flex w-full justify-center items-center mt-0">
          <Image src='/page-others.jpeg' width={780} height={186} alt='Zirolu' className='w-full' priority />
        </Link>
      </div>
    </main>
  );
}
