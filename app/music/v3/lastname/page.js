'use client';
import Image from "next/image";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Kanit} from "next/font/google";
const kanit = Kanit({ subsets: ["latin"], weight: ['400','700'] });
let udahIsiBirthStatus = false, udahAPIStatus = false

export default function PlayNotes() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [udahIsiNama, setUdahIsiNama] = useState(false);
  const [udahIsiNamaBelakang, setUdahIsiNamaBelakang] = useState(false);
  const [udahIsiBirth, setUdahIsiBirth] = useState(false);
  const [rasiBintangAmild, setRasiBintangAmild] = useState();

  const [statusAPI, setStatusAPI] = useState(false);
  const [urlVideo, setUrlVideo] = useState();
  const [firstNameAmild, setFirstNameAmild] = useState();
  const [lastNameAmild, setLastNameAmild] = useState();
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
      // Perform localStorage action
      if (typeof localStorage !== 'undefined') {
          const item1 = localStorage.getItem('firstnameAmild')
          const item2 = localStorage.getItem('lastnameAmild')
          const item3 = localStorage.getItem('faceImage')
          setFirstNameAmild(item1)
          setLastNameAmild(item2)
          setImageFile(item3)
      }
  }, [firstNameAmild, lastNameAmild, imageFile])

  const playNote = (note) => {
    const audio = new Audio(`/music/doremi/${note}.mp3`);
    audio.play();
  };

  const generateAI = async () => {
    // setNumProses1(true)
    // router.push('/music/v3/firstname');
    // console.log(imageFile)
    const options = {
        method: 'POST',
        body: JSON.stringify({
            name: firstNameAmild+' '+lastNameAmild,
            image:imageFile
        }),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    
    await fetch('https://musicai-api.antigravity.dev/generate', options)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            setStatusAPI(response.status)
            udahAPIStatus= response.status
            
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("urlVideo", response.data)
            }
            // setNumProses1(null)
            setUrlVideo(response.data)

            console.log(udahIsiBirthStatus)
            console.log(udahAPIStatus)

            if(udahIsiBirthStatus && udahAPIStatus){
              router.push('/music/v3/result');
            }
        })
        .catch(err => {
            console.log(err)
            // setStatusAPI('ERROR API!')
        });
}

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    setName(inputValue);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem("lastnameAmild", inputValue)
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

  const playName = async () => {
    setUdahIsiNama(true)
    generateAI()

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


  const [year, setYear] = useState('');
  const [month, setMonth] = useState('');
  const [date, setDate] = useState('');
  const [zodiacSign, setZodiacSign] = useState("");

  const calculateZodiacSign = (bulan, tanggal) => {
    const month = bulan; // Bulan (1-12)
    const day = tanggal; // Tanggal

    // console.log(month)
    // console.log(day)

    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) {
      return "Aries";
    }
    if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) {
      return "Taurus";
    }
    if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) {
      return "Gemini";
    }
    if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) {
      return "Cancer";
    }
    if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) {
      return "Leo";
    }
    if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) {
      return "Virgo)";
    }
    if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) {
      return "Libra";
    }
    if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) {
      return "Scorpio";
    }
    if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) {
      return "Sagitarius";
    }
    if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) {
      return "Capricorn";
    }
    if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) {
      return "Aquarius";
    }
    if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) {
      return "Pisces";
    }
  
    return "Tidak diketahui";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (year && month && date) {
      // console.log(month)
      // console.log(date)
      const sign = calculateZodiacSign(parseInt(month), parseInt(date));
      setRasiBintangAmild(sign)
      setZodiacSign(sign);
      setUdahIsiBirth(true)
      udahIsiBirthStatus = true
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem("rasiBintangAmild", sign)
      }


      console.log(udahIsiBirthStatus)
      console.log(udahAPIStatus)

      if(udahIsiBirthStatus && udahAPIStatus){
        router.push('/music/v3/result');
      }
    }
  };

  return (
    <div className="flex fixed bg-[#CC1419] h-full w-full overflow-auto flex-col items-center justify-center">
      {/* LOADING */}
      {udahIsiBirth && 
          <div className='absolute bg-[#CC1419] top-0 left-0 right-0 bottom-0 flex items-center justify-center flex-col z-50'>
              <div className='animate-upDownCepet relative py-5 px-2 border-2 text-center text-[#fff] w-[94%] bg-black/30'>
                  {statusAPI && 
                      <p className='text-red-600 text-bold'>{statusAPI}</p>
                  }
                  <p className={`uppercase text-4xl  ${kanit.className}`}>A {rasiBintangAmild}, HUH?
                  is that why you strive for a perfect music?</p>
                  <p className='text-sm'>{`Estimated 10-30 seconds`}</p>
              </div>
          </div>
      }
      {/* LOADING */}

       <div className={`relative w-full ${udahIsiNamaBelakang ? '' : 'hidden'}`}>
        <h1 className={`text-center text-4xl lg:text-6xl font-medium mt-1 lg:mt-10 ${kanit.className}`}>
          LAST, ENTER <br></br>
          YOUR DATE OF BIRTH
        </h1>
        <div className="relative w-full flex flex-col justify-center items-center mt-6 lg:mt-12 mb-2 lg:mb-14">
          <div className='relative w-[80%] mb-3 lg:mb-10'>
              <div className='relative w-full flex justify-center items-center'>
                  <input
                      type='number'
                      id='year'
                      name='year'
                      className={`w-[32%] text-center  text-2xl lg:text-5xl outline-none py-3 lg:py-8 px-2 lg:px-8 border-2 border-black rounded-full text-black bg-transparent bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${kanit.className}`}
                      placeholder='1994'
                      value={year}
                      onChange={(e) => setYear(e.target.value)}
                  />
                  <input
                      type='number'
                      id='year'
                      name='year'
                      className={`ml-3 w-[30%] text-center text-2xl lg:text-5xl outline-none py-3 lg:py-8 px-2 lg:px-8 border-2 border-black rounded-full text-black bg-transparent bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${kanit.className}`}
                      placeholder='11'
                      value={month}
                      onChange={(e) => setMonth(e.target.value)}
                  />
                  <input
                      type='number'
                      id='year'
                      name='year'
                      className={`ml-3 w-[30%] text-center text-2xl lg:text-5xl outline-none py-3 lg:py-8 px-2 lg:px-8 border-2 border-black rounded-full text-black bg-transparent bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${kanit.className}`}
                      placeholder='30'
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                  />
                  <button className="relative mx-auto flex  w-[30%] ml-3 justify-center items-center" onClick={handleSubmit}>
                      <Image src='/music/btn->.png' width={56} height={56} alt='Zirolu' className='w-full' priority />
                  </button>
              </div>
          </div>
        </div>
      </div>

      <div className={`relative w-full ${udahIsiNama && !udahIsiNamaBelakang ? '' : 'hidden'}`}>
        <h1 className={`text-center text-4xl lg:text-6xl font-medium mt-1 lg:mt-10 ${kanit.className}`}>
          COOL STUFF
        </h1>
        <div className='animate-upDownCepet relative w-[60%] mx-auto flex justify-center items-center mt-5 mb-6'>
          <Image src='/music/played.png' width={248} height={56} alt='Zirolu' className='w-full' priority />
        </div>
        {/* <Link href='/music/v2/birth' className="relative mx-auto flex w-[60%] justify-center items-center">
            <Image src='/music/btn-next2.png' width={236} height={56} alt='Zirolu' className='w-full' priority />
        </Link> */}
        <button onClick={()=>setUdahIsiNamaBelakang(true)} className="relative mx-auto flex w-[60%] justify-center items-center">
            <Image src='/music/btn-next2.png' width={236} height={56} alt='Zirolu' className='w-full' priority />
        </button>
      </div>
      <div className={`relative w-full ${udahIsiNama ? 'hidden' : ''}`}>
        <h1 className={`text-center text-4xl lg:text-6xl font-medium mt-1 lg:mt-10 ${kanit.className}`}>
          NEXT, ENTER <br></br>
          YOUR LAST NAME
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
