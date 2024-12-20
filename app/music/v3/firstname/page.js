'use client';
import Image from "next/image";
import Link from 'next/link';
import { useState } from 'react';

import { Kanit} from "next/font/google";
const kanit = Kanit({ subsets: ["latin"], weight: ['400','700'] });

export default function PlayNotes() {
  const [name, setName] = useState('');
  const [udahIsiNama, setUdahIsiNama] = useState(false);

  const playNote = (note) => {
    const audio = new Audio(`/music/doremi/${note}.mp3`);
    audio.play();
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setName(inputValue);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem("firstnameAmild", inputValue)
    }

    if (inputValue.length > 0) {
      const lastChar = inputValue[inputValue.length - 1].toLowerCase();
      const notes = ['1do', '2re', '3mi', '4fa', '5sol', '6la', '7si', '8do'];

      // Mapkan karakter ke nada (berdasarkan indeks ASCII)
      if (/[a-z]/.test(lastChar)) {
        const noteIndex = (lastChar.charCodeAt(0) - 97) % notes.length; // 'a' adalah 97
        const note = notes[noteIndex];
        playNote(note);
      }
    }
  };

  const playName = () => {
    setUdahIsiNama(true)
    const notes = ['1do', '2re', '3mi', '4fa', '5sol', '6la', '7si', '8do'];
    const chars = name.toLowerCase().split('');
    
    chars.forEach((char, index) => {
      // Mapkan huruf ke nada (atur sesuai kebutuhan)
      const noteIndex = char.charCodeAt(0) % notes.length;
      const note = notes[noteIndex];

      setTimeout(() => {
        playNote(note);
      }, index * 500); // Interval 500ms antara nada
    });
  };

  return (
    <div className="flex fixed bg-[#CC1419] h-full w-full overflow-auto flex-col items-center justify-center">
      <div className={`relative w-full ${udahIsiNama ? '' : 'hidden'}`}>
        <h1 className={`text-center text-4xl lg:text-6xl font-medium mt-1 lg:mt-10 ${kanit.className}`}>
          NICE MELODY
        </h1>
        <div className='animate-upDownCepet relative w-[60%] mx-auto flex justify-center items-center mt-5 mb-6'>
          <Image src='/music/played.png' width={248} height={56} alt='Zirolu' className='w-full' priority />
        </div>
        <Link href='/music/v3/lastname' className="relative mx-auto flex w-[60%] justify-center items-center">
          <Image src='/music/btn-next2.png' width={236} height={56} alt='Zirolu' className='w-full' priority />
        </Link>
      </div>
      <div className={`relative w-full ${udahIsiNama ? 'hidden' : ''}`}>
        <h1 className={`text-center text-4xl lg:text-6xl font-medium mt-1 lg:mt-10 ${kanit.className}`}>
          START WITH <br></br>
          ENTERING YOUR <br></br>
          FIRST NAME
        </h1>
        <div className="relative w-full flex flex-col justify-center items-center mt-6 lg:mt-12 mb-2 lg:mb-14">
          <div className='relative w-[80%] mb-3 lg:mb-10'>
              <div className='relative w-full flex justify-center items-center'>
                  <input
                      type='text'
                      id='name'
                      name='name'
                      className={`w-full text-2xl lg:text-5xl outline-none py-3 lg:py-8 px-5 lg:px-8 border-2 border-black rounded-full text-black bg-transparent bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${kanit.className}`}
                      placeholder='Isi Nama'
                      value={name}
                      onChange={handleInputChange}
                  />
                  <button className="relative mx-auto flex  w-[30%] ml-5 justify-center items-center" onClick={playName}>
                      <Image src='/music/btn->.png' width={56} height={56} alt='Zirolu' className='w-full' priority />
                  </button>
              </div>
              {/* {payload.name} */}
              {/* {errorMsg && <p className='text-[#E00A0A] text-xs'>{errorMsg}</p>} */}
          </div>
        </div>
      </div>
    </div>
  );
}
// 'use client';

// import { useState } from 'react';

// const PlayNotes = () => {
//   const [name, setName] = useState('');

//   const playNote = (note) => {
//     const audio = new Audio(`/music/doremi/${note}.mp3`);
//     audio.play();
//   };

//   const handleInputChange = (e) => {
//     const inputValue = e.target.value;
//     setName(inputValue);

//     if (inputValue.length > 0) {
//       const lastChar = inputValue[inputValue.length - 1].toLowerCase();
//       const notes = ['1do', '2re', '3mi', '4fa', '5sol', '6la', '7si', '8do'];

//       // Mapkan karakter ke nada (berdasarkan indeks ASCII)
//       if (/[a-z]/.test(lastChar)) {
//         const noteIndex = (lastChar.charCodeAt(0) - 97) % notes.length; // 'a' adalah 97
//         const note = notes[noteIndex];
//         playNote(note);
//       }
//     }
//   };

//   const playName = () => {
//     const notes = ['1do', '2re', '3mi', '4fa', '5sol', '6la', '7si', '8do'];
//     const chars = name.toLowerCase().split('');
    
//     chars.forEach((char, index) => {
//       // Mapkan huruf ke nada (atur sesuai kebutuhan)
//       const noteIndex = char.charCodeAt(0) % notes.length;
//       const note = notes[noteIndex];

//       setTimeout(() => {
//         playNote(note);
//       }, index * 500); // Interval 500ms antara nada
//     });
//   };

//   return (
//     <div style={{ textAlign: 'center', marginTop: '50px' }}>
//       {/* <h1>Play Do Re Mi</h1> */}
//       <input
//         type="text"
//         placeholder="Masukkan nama"
//         value={name}
//         onChange={handleInputChange}
//         className='text-black'
//         style={{ padding: '10px', fontSize: '16px' }}
//       />
//       <button
//         onClick={playName}
//         style={{
//           marginLeft: '10px',
//           padding: '10px',
//           fontSize: '16px',
//           cursor: 'pointer',
//         }}
//       >
//         Play
//       </button>
//     </div>
//   );
// };

// export default PlayNotes;
