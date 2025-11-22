'use client';

import Image from "next/image";
import { useState, useMemo } from 'react';
import SliderPickerMax3 from "./../../../components/SliderPickerMax3";
import { useRouter } from 'next/navigation';

export default function Register() {
  const router = useRouter();

  const ITEMS = [
    // HEAD
    { id: "BUNNY_EAR_HOOD", label: "Bunny Ear Hood", img: "/purina/ps-a-1.png", locked: false,  type: "HEAD" },
    { id: "FLUFFY_BUNNY_HAT", label: "Fluffy Bunny Hat", img: "/purina/ps-a-5.png", locked: false, type: "HEAD" },
    { id: "CUTE_KNOTTED_HEADBAND", label: "Cute Knotted Headband", img: "/purina/ps-a-8.png", locked: false, type: "HEAD" },
  
    // NECK / BANDANA
    { id: "STARBLUE_BANDANA", label: "Starblue Bandana", img: "/purina/ps-a-2.png", locked: true, type: "NECK" },
    { id: "VOLCADOT_BANDANA", label: "Volcadot Bandana", img: "/purina/ps-a-7.png", locked: false, type: "NECK" },
  
    // EYEWEAR
    { id: "BLACK_GLASSES", label: "Black Glasses", img: "/purina/ps-a-3.png", locked: false, type: "EYEWEAR" },
  
    // OUTFIT / CLOTHES (ini yang gak boleh barengan)
    { id: "PET_POLO_SHIRT", label: "Pet Polo Shirt", img: "/purina/ps-a-4.png", locked: false, type: "OUTFIT" },
    { id: "PET_NIGHTWEAR_OUTFIT", label: "Pet Nightwear Outfit", img: "/purina/ps-a-6.png", locked: false, type: "OUTFIT" },
    { id: "BROWN_SWEATER", label: "Brown Sweater", img: "/purina/ps-a-9.png", locked: true, type: "OUTFIT" },
  ];
  
  const [selectedAccessories, setSelectedAccessories] = useState({
    ids: [],
    labels: [],
    images: [],
    text: ""
  });

  // ✅ tombol aktif kalau sudah pilih aksesoris
  const canContinue = selectedAccessories.ids.length > 0;

  const generateAI = () => {
    if (!canContinue) return; // safety

    // ✅ simpan aksesoris hasil pilihan
    localStorage.setItem("selectedAccessories", JSON.stringify(selectedAccessories));
    localStorage.setItem("selectedAccessoriesText", selectedAccessories.text);

    setTimeout(() => {
      router.push('/purina/pawshion-show/login');
    }, 100);
  };

  return (
    <main
      className="flex fixed h-full w-full bg-purina-ps2 overflow-auto flex-col items-centerx justify-start pt-2 pb-5 px-5 lg:pt-12 lg:px-20"
      onContextMenu={(e)=> e.preventDefault()}
    >
      <div className="relative w-[30%] lg:w-[90%] xmx-auto mb-2">
        <Image src='/purina/ps-purina.png' width={303} height={286} alt='Zirolu' className='w-full' priority />
      </div>

      <div className="relative w-[70%] lg:w-[90%] mx-auto mt-0">
        <Image src='/purina/ps-unlock.png' width={303} height={286} alt='Zirolu' className='w-full' priority />
      </div>

      {/* PILIH AKSESORIS */}
      <div className={`relative w-[100%] mx-auto mt-3`}>
        <div className='relative mt-0 w-full p-0 '>
          <SliderPickerMax3
            items={ITEMS}
            onChange={(val) => setSelectedAccessories(val)}
          />
        </div>

        {/* tombol continue */}
        <div
          className={`
            relative w-full flex justify-center items-center mt-4 lg:mt-[1rem] z-20
            ${canContinue ? "" : "opacity-50 pointer-events-none"}
          `}
        >
          <button
            className="relative mx-auto w-[100%] flex justify-center items-center"
            onClick={generateAI}
            disabled={!canContinue}
          >
            <Image src='/purina/ps-add.png' width={319} height={67} alt='Zirolu' className='w-full' priority />
          </button>
        </div>
      </div>
    </main>
  );
}
