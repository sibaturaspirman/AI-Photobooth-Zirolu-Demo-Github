
import Image from "next/image";
import Link from 'next/link';

export default function TauTauHome() {
  return (
    <main className="flex fixed h-full w-full bg-tautaufest overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-0 lg:px-20 mt-0">
      <Link href='/tautaufest/register' className="fixed w-full h-full top-0 left-0 z-10"></Link>
      <div className="relative w-[85%] mx-auto mt-0">
        <Image src='/tautaufest/logo.png' width={607} height={168} alt='Zirolu' className='w-full' priority />
      </div>
      <div className="relative w-full flex justify-center items-center mt-[4vh] mb-[5vh]">
        <div className='animate-upDown relative w-[100%] mx-auto flex justify-center items-center pointer-events-none'>
          <Image src='/tautaufest/preview.png' width={744} height={654} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
      <div className="relative w-full flex justify-center items-center">
        <div className="relative mx-auto flex w-[75%] justify-center items-center">
          <Image src='/tautaufest/btn-taptostart.png' width={505} height={136} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
    </main>
  );
}
