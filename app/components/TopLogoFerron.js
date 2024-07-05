import Image from 'next/image';
import React from 'react';

const TopLogoFerron = () => {
  return (
    <a href='/ferron' className='relative w-[20%] mx-auto flex justify-center items-center z-50'>
      <Image src='/dexa/ferron.png' width={629} height={501} alt='Zirolu' className='w-full' priority />
    </a>
  );
};

export default TopLogoFerron;
