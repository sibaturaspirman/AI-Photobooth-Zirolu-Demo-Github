import Image from "next/image";
import Link from 'next/link';
import TopLogo from "./../../components/TopLogo";
import { Paytone_One} from "next/font/google";
const paytone_one = Paytone_One({ subsets: ["latin"], weight: '400' });

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-12 lg:px-20">
      <TopLogo></TopLogo>
      <h1 className={`text-center text-xl mt-[-.7rem] lg:mt-0 lg:text-7xl lg:mb-5 ${paytone_one.className}`}>AI PLAYGROUND <br></br>Capture Your Pose</h1>
        <Link href='/playground/capture/cam' className="relative mx-auto flex w-[70%] justify-center items-center mt-5">
          <Image src='/btn-taptostart.png' width={410} height={96} alt='Zirolu' className='w-full' priority />
        </Link>
    </main>
  );
}
