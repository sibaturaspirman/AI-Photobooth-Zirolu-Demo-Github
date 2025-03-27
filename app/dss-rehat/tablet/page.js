'use client';
import Image from "next/image";
import Link from 'next/link';
import { useState } from 'react';
// import BgWave from "../components/BgWave";
import { useRouter } from 'next/navigation';

export default function PrimariaHome() {
  const router = useRouter();
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [isValid, setIsValid] = useState(null);

  const months = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;

  const handleValidation = () => {
    if (!month || !year) {
      setIsValid(null);
      return;
    }
    const age = currentYear - year - (currentMonth < month ? 1 : 0);
    if (age > 21) {
      // router.push('/dss-rehat/home'); // Ganti dengan halaman tujuan
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  return (
    <div className="flex fixed bg-dss-frontMOD h-full w-full overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-0 lg:px-20 mt-0">
      {/* <div className="relative w-full flex justify-center items-center flex-col top-[-6rem]">
        <div className='animate-upDown relative w-[90%] mx-auto flex justify-center items-center pointer-events-none'>
          <Image src='/primaria/logo.png' width={880} height={347} alt='Zirolu' className='w-full' priority />
        </div>
        <div className="animate-upDown2 relative w-[75%] mx-auto mt-10">
          <Image src='/primaria/tagline.png' width={926} height={41} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
      <div className="absolute left-0 right-0 bottom-[8rem] w-full flex justify-center items-center">
        <div className="animate-upDownCepet relative mx-auto flex w-[78%] justify-center items-center">
          <Image src='/primaria/btn-mulai.png' width={819} height={126} alt='Zirolu' className='w-full' priority />
        </div>
      </div> */}
      <Link href='/dss-rehat/tablet/gender' className={`flex fixed h-full w-full overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-0 lg:px-20 mt-0 ${isValid ? '' : 'opacity-0 pointer-events-none'}`}></Link>

      <div className={`flex fixed h-full w-full overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5 lg:pt-0 lg:px-20 mt-0 bg-black/90 ${isValid ? 'opacity-0 pointer-events-none' : ''}`}>
        <div className="relative flex justify-center items-center flex-col bg-black border-4 border-[#ECC953] w-[80%] mx-auto py-10 px-10">
          <div className='relative w-[90%] mx-auto flex justify-center items-center pointer-events-none'>
            <Image src='/dss/seldat.png' width={638} height={296} alt='Zirolu' className='w-full' priority />
          </div>
          <div className='relative w-full mx-auto flex justify-center items-center mt-5'>
            <select 
              className="border-[#ECC953] border-4 p-4 w-[80%] bg-white text-black text-xl bg-transparent" 
              value={month} 
              onChange={(e) => setMonth(Number(e.target.value))}
            >
              <option value="">Pilih Bulan</option>
              {months.map((monthName, i) => (
                <option key={i + 1} value={i + 1}>{monthName}</option>
              ))}
            </select>
            <select 
              className="border-[#ECC953] border-4 p-4 w-[80%] bg-white text-black ml-4 text-xl bg-transparent" 
              value={year} 
              onChange={(e) => setYear(Number(e.target.value))}
            >
              <option value="">Pilih Tahun</option>
              {[...Array(76)].map((_, i) => (
                <option key={2025 - i} value={2025 - i}>{2025 - i}</option>
              ))}
            </select>
          </div>
          <button 
            className="mt-6 bg-transparent" 
            onClick={handleValidation}
          >
            <Image src='/dss/konfirmasi.png' width={638} height={88} alt='Zirolu' className='w-full' priority />
          </button>
          {isValid !== null && (
            <p className={`mt-7 text-5xl font-semibold ${isValid ? 'text-green-500' : 'text-red-500'}`}>
              {isValid ? '' : 'Usia kurang dari 21 tahun'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
