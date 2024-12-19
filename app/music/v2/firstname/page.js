
// import Image from "next/image";
// import Link from 'next/link';

// export default function IQOSHome() {
//   return (
//     <div className="flex fixed bg-music h-full w-full overflow-auto flex-col items-center justify-center">
//       <div className={`fixed top-0 left-0 w-full h-full bg-music pointer-events-none z-10 animate-bgScale`}></div>
//       <div className="relative w-[63%] mt-[-10rem] z-20">
//         <div className='relative w-full mx-auto flex justify-center items-center'>
//           <Image src='/music/logo.png' width={822} height={362} alt='Zirolu' className='w-full' priority />
//         </div>
//       </div>
//       <div className="absolute mx-auto bottom-[5rem] w-[80%] animate-upDown4 z-20">
//         <Link href='/music/setup' className='relative w-full mx-auto flex justify-center items-center'>
//           <Image src='/music/begin.png' width={880} height={144} alt='Zirolu' className='w-full' priority />
//         </Link>
//       </div>
//     </div>
//   );
// }
'use client';

import { useState } from 'react';

const PlayNotes = () => {
  const [name, setName] = useState('');

  const playNote = (note) => {
    const audio = new Audio(`/music/doremi/${note}.mp3`);
    audio.play();
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setName(inputValue);

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
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {/* <h1>Play Do Re Mi</h1> */}
      <input
        type="text"
        placeholder="Masukkan nama"
        value={name}
        onChange={handleInputChange}
        className='text-black'
        style={{ padding: '10px', fontSize: '16px' }}
      />
      <button
        onClick={playName}
        style={{
          marginLeft: '10px',
          padding: '10px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        Play
      </button>
    </div>
  );
};

export default PlayNotes;
