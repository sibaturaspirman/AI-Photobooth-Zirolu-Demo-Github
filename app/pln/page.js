
import Image from "next/image";
import Link from 'next/link';

// const useWebcam = ({
//   videoRef
// }) => {
//   useEffect(() => {
//     if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
//       navigator.mediaDevices.getUserMedia({ video: true}).then((stream) => {
//         if (videoRef.current !== null) {
//           stream.stop()
//           // videoRef.current.srcObject = stream;
//           // videoRef.current.play();
//         }
//       });
//     }
//   }, [videoRef]);
// };

export default function IQOSHome() {

  // const videoRef = useRef(null);
  // const previewRef = useRef(null);
  // useWebcam({ videoRef,previewRef});

  return (
    <Link href='/pln/style' className="flex fixed h-full w-full bg-pln overflow-auto flex-col items-center justify-center">
      {/* <div className="fixed top-0 left-0 w-full h-full bg-iqos-border pointer-events-none z-10"></div> */}
      {/* <div className="relative w-[75%] mx-auto mt-0 pointer-events-none">
        <Image src='/iqos/neon/title.png' width={803} height={256} alt='Zirolu' className='w-full' priority />
      </div> */}
      <div className="relative w-full flex justify-center items-center mt-[-5rem]">
        <div className='relative w-full mx-auto flex justify-center items-center pointer-events-none'>
          <Image src='/pln/preview.png' width={900} height={1062} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
      {/* <div className="relative w-full flex justify-center items-center lg:mt-20 pointer-events-none">
        <div className="relative mx-auto flex w-[68%] justify-center items-center">
          <Image src='/iqos/neon/tap.png' width={731} height={39} alt='Zirolu' className='w-full' priority />
        </div>
      </div> */}
    </Link>
  );
}
