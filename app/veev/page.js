
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
    <Link href='/veev/style' className="flex fixed h-full w-full bg-veev overflow-auto flex-col items-center justify-center pt-2 pb-5 px-5  mt-0">
      <div className="relative w-[55%] mx-auto mt-0">
        <Image src='/veev/AI photo.png' width={534} height={84} alt='Zirolu' className='w-full' priority />
      </div>
      <div className="relative w-full flex justify-center items-center mt-7">
        <div className='animate-upDown relative w-[1200px] ml-[-150px] mr-[-150px] mx-auto flex justify-center items-center pointer-events-none'>
          <Image src='/veev/preview.png' width={960} height={604} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
      <div className="relative w-full flex justify-center items-center mt-20">
        <div className="relative mx-auto flex w-[55%] justify-center items-center">
          <Image src='/veev/Tap to Anywhere.png' width={610} height={49} alt='Zirolu' className='w-full' priority />
        </div>
      </div>
    </Link>
  );
}
