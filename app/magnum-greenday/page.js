// "use client";

// import { useEffect, useRef, useState } from "react";
// import { FaceMesh } from "@mediapipe/face_mesh";

// export default function FaceWithObject() {
//   const canvasRef = useRef(null);
//   const imgRef = useRef(null);
//   const [isClient, setIsClient] = useState(false);
//   const [scale, setScale] = useState(.4);

//   // Gambar overlay untuk mata kiri & kanan
//   const leftEyeImgSrc = "/magnum-greenday/petir-kiri.png";
//   const rightEyeImgSrc = "/magnum-greenday/petir-kanan.png";

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   useEffect(() => {
//     if (!isClient) return;

//     async function detectFace() {
//       const img = imgRef.current;
//       if (!img.complete) {
//         img.onload = detectFace;
//         return;
//       }

//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext("2d");

//       // Atur ukuran canvas sesuai gambar
//       canvas.width = img.width;
//       canvas.height = img.height;
//       ctx.drawImage(img, 0, 0, img.width, img.height);

//       if (typeof window !== "undefined") {
//         const faceMesh = new FaceMesh({
//           locateFile: (file) =>
//             `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
//         });

//         faceMesh.setOptions({
//           maxNumFaces: 1,
//           refineLandmarks: true, // Agar lebih presisi
//           minDetectionConfidence: 0.7,
//           minTrackingConfidence: 0.7,
//         });

//         faceMesh.onResults((results) => {
//           if (results.multiFaceLandmarks.length > 0) {
//             const keypoints = results.multiFaceLandmarks[0];

//             const leftEye = keypoints[33]; // Mata kiri
//             const rightEye = keypoints[263]; // Mata kanan
//             const nose = keypoints[168]; // Hidung (untuk stabilisasi)

//             console.log("Left Eye:", leftEye, "Right Eye:", rightEye, "Nose:", nose);

//             const leftEyeImg = new Image();
//             leftEyeImg.src = leftEyeImgSrc;
//             const rightEyeImg = new Image();
//             rightEyeImg.src = rightEyeImgSrc;

//             leftEyeImg.onload = () => {
//               drawEyeOverlay(ctx, leftEyeImg, leftEye, rightEye, img.width, img.height, scale);
//             };

//             rightEyeImg.onload = () => {
//               drawEyeOverlay(ctx, rightEyeImg, rightEye, leftEye, img.width, img.height, scale);
//             };
//           }
//         });

//         await faceMesh.initialize();
//         await faceMesh.send({ image: img });
//       }
//     }

//     detectFace();
//   }, [isClient, scale]);

//   function drawEyeOverlay(ctx, overlayImg, eye, oppositeEye, imgWidth, imgHeight, scale) {
//     const eyeX = eye.x * imgWidth;
//     const eyeY = eye.y * imgHeight;
//     const oppositeX = oppositeEye.x * imgWidth;
//     const oppositeY = oppositeEye.y * imgHeight;

//     // Hitung jarak mata untuk menentukan ukuran overlay
//     const eyeDistance = Math.sqrt((eyeX - oppositeX) ** 2 + (eyeY - oppositeY) ** 2);
//     const eyeWidth = (eyeDistance * 0.8) * scale;
//     const eyeHeight = eyeWidth * 1.8;

//     // Hitung sudut rotasi mata agar lebih presisi
//     const angle = Math.atan2(oppositeY - eyeY, oppositeX - eyeX);

//     // Transformasi canvas untuk posisi & rotasi lebih presisi
//     ctx.save();
//     ctx.translate(eyeX, eyeY);
//     ctx.rotate(angle);
//     ctx.drawImage(overlayImg, -eyeWidth / 4.6, -eyeHeight / 2, eyeWidth, eyeHeight);
//     ctx.restore();
//   }

//   return (
//     <div className="relative">
//       {/* Kontrol Skala */}
//       {/* <div className="flex items-center gap-2 mb-4">
//         <label>Scale:</label>
//         <input
//           type="range"
//           min="0.5"
//           max="2"
//           step="0.1"
//           value={scale}
//           onChange={(e) => setScale(parseFloat(e.target.value))}
//         />
//         <span>{scale.toFixed(1)}</span>
//       </div> */}

//       {/* Gambar yang langsung dimuat */}
//       {isClient && <img ref={imgRef} src="/magnum-greenday/face.png" alt="Face" className="hidden" />}

//       {/* Canvas untuk menggambar efek */}
//       {isClient && <canvas ref={canvasRef} className="w-full border" />}
//     </div>
//   );
// }


// "use client";

// import { useEffect, useRef, useState } from "react";
// import { FaceMesh } from "@mediapipe/face_mesh";

// export default function FaceWithObject() {
//   const canvasRef = useRef(null);
//   const imgRef = useRef(null);
//   const captureCanvasRef = useRef(null);
//   const [isClient, setIsClient] = useState(false);
//   const [scale, setScale] = useState(.5);
//   const [capturedImage, setCapturedImage] = useState(null);

//   // Gambar overlay untuk mata kiri & kanan
//   const leftEyeImgSrc = "/magnum-greenday/petir-kiri.png";
//   const rightEyeImgSrc = "/magnum-greenday/petir-kanan.png";

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   useEffect(() => {
//     if (!isClient) return;

//     async function detectFace() {
//       const img = imgRef.current;
//       if (!img.complete) {
//         img.onload = detectFace;
//         return;
//       }

//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext("2d");

//       // Atur ukuran canvas sesuai gambar
//       canvas.width = img.width;
//       canvas.height = img.height;
//       ctx.drawImage(img, 0, 0, img.width, img.height);

//       // Terapkan efek hitam putih (grayscale)
//       applyGrayscale(ctx, canvas.width, canvas.height);

//       if (typeof window !== "undefined") {
//         const faceMesh = new FaceMesh({
//           locateFile: (file) =>
//             `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
//         });

//         faceMesh.setOptions({
//           maxNumFaces: 1,
//           refineLandmarks: true, // Agar lebih presisi
//           minDetectionConfidence: 0.7,
//           minTrackingConfidence: 0.7,
//         });

//         faceMesh.onResults((results) => {
//           if (results.multiFaceLandmarks.length > 0) {
//             const keypoints = results.multiFaceLandmarks[0];

//             const leftEye = keypoints[33]; // Mata kiri
//             const rightEye = keypoints[263]; // Mata kanan

//             console.log("Left Eye:", leftEye, "Right Eye:", rightEye);

//             const leftEyeImg = new Image();
//             leftEyeImg.src = leftEyeImgSrc;
//             const rightEyeImg = new Image();
//             rightEyeImg.src = rightEyeImgSrc;

//             leftEyeImg.onload = () => {
//               drawEyeOverlay(ctx, leftEyeImg, leftEye, rightEye, img.width, img.height, scale);
//             };

//             rightEyeImg.onload = () => {
//               drawEyeOverlay(ctx, rightEyeImg, rightEye, leftEye, img.width, img.height, scale);
//             };
//           }
//         });

//         await faceMesh.initialize();
//         await faceMesh.send({ image: img });
//       }
//     }

//     detectFace();
//   }, [isClient, scale]);

//   function applyGrayscale(ctx, width, height) {
//     const imageData = ctx.getImageData(0, 0, width, height);
//     const data = imageData.data;

//     for (let i = 0; i < data.length; i += 4) {
//       const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
//       data[i] = avg; // Red
//       data[i + 1] = avg; // Green
//       data[i + 2] = avg; // Blue
//     }

//     ctx.putImageData(imageData, 0, 0);
//   }

//   function drawEyeOverlay(ctx, overlayImg, eye, oppositeEye, imgWidth, imgHeight, scale) {
//     const eyeX = eye.x * imgWidth;
//     const eyeY = eye.y * imgHeight;
//     const oppositeX = oppositeEye.x * imgWidth;
//     const oppositeY = oppositeEye.y * imgHeight;

//     // Hitung jarak mata untuk menentukan ukuran overlay
//     const eyeDistance = Math.sqrt((eyeX - oppositeX) ** 2 + (eyeY - oppositeY) ** 2);
//     const eyeWidth = (eyeDistance * 0.8) * scale;
//     const eyeHeight = eyeWidth * 1.8;

//     // Hitung sudut rotasi mata agar lebih presisi
//     const angle = Math.atan2(oppositeY - eyeY, oppositeX - eyeX);

//     // Transformasi canvas untuk posisi & rotasi lebih presisi
//     ctx.save();
//     ctx.translate(eyeX, eyeY);
//     ctx.rotate(angle);
//     ctx.drawImage(overlayImg, -eyeWidth / 4.6, -eyeHeight / 2, eyeWidth, eyeHeight);
//     ctx.restore();
//   }

//   // Capture image setelah overlay diterapkan
//   function captureImage() {
//     const canvas = canvasRef.current;
//     const captureCanvas = captureCanvasRef.current;
//     const captureCtx = captureCanvas.getContext("2d");

//     // Set ukuran canvas hasil capture sesuai gambar utama
//     captureCanvas.width = canvas.width;
//     captureCanvas.height = canvas.height;

//     // Salin gambar dari canvas utama
//     captureCtx.drawImage(canvas, 0, 0);

//     // Terapkan grayscale juga ke hasil capture
//     applyGrayscale(captureCtx, captureCanvas.width, captureCanvas.height);

//     // Simpan hasil capture ke state
//     setCapturedImage(captureCanvas.toDataURL("image/png"));
//   }

//   return (
//     <div className="relative">
//       {/* Kontrol Skala */}
//       <div className="flex items-center gap-2 mb-4">
//         <label>Scale:</label>
//         <input
//           type="range"
//           min="0.5"
//           max="2"
//           step="0.1"
//           value={scale}
//           onChange={(e) => setScale(parseFloat(e.target.value))}
//         />
//         <span>{scale.toFixed(1)}</span>
//       </div>

//       {/* Tombol Capture */}
//       <button onClick={captureImage} className="px-4 py-2 bg-blue-500 text-white rounded">
//         Capture Image
//       </button>

//       {/* Gambar yang langsung dimuat */}
//       {isClient && <img ref={imgRef} src="/magnum-greenday/face.png" alt="Face" className="hidden" />}

//       {/* Canvas untuk menggambar efek */}
//       {isClient && <canvas ref={canvasRef} className="w-full border" />}

//       {/* Canvas untuk menyimpan hasil capture */}
//       <canvas ref={captureCanvasRef} className="hidden" />

//       {/* Hasil Capture */}
//       {capturedImage && (
//         <div className="mt-4">
//           <h3>Hasil Capture:</h3>
//           <img src={capturedImage} alt="Captured" className="border w-full max-w-md" />
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import * as fal from '@fal-ai/serverless-client';
import { useEffect, useRef, useState } from "react";
import { FaceMesh } from "@mediapipe/face_mesh";
import { useRouter } from 'next/navigation';

// @snippet:start(client.config)
fal.config({
    // credentials: 'FAL_KEY_ID:FAL_KEY_SECRET',
    requestMiddleware: fal.withProxy({
      targetUrl: '/api/fal/proxy', // the built-int nextjs proxy
      // targetUrl: 'http://localhost:3333/api/fal/proxy', // or your own external proxy
    }),
});

let URL_RESULT = ''
export default function FaceWithObject() {
    const router = useRouter();
  const canvasRef = useRef(null);
  const imgRef = useRef(null);
  const captureCanvasRef = useRef(null);
  const [isClient, setIsClient] = useState(false);
  const [scale, setScale] = useState(0.5);
  const [capturedImage, setCapturedImage] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [result, setResult] = useState(null);

  const leftEyeImgSrc = "/magnum-greenday/petir-kiri.png";
  const rightEyeImgSrc = "/magnum-greenday/petir-kanan.png";

  useEffect(() => {
    setIsClient(true);
    const storedImage = localStorage.getItem("faceImage");
    if (storedImage) {
      setImageSrc(storedImage);
    }
  }, []);

  useEffect(() => {
    if (!isClient || !imageSrc) return;

    async function detectFace() {
      const img = imgRef.current;
      if (!img.complete) {
        img.onload = detectFace;
        return;
      }

      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0, img.width, img.height);

      applyGrayscale(ctx, canvas.width, canvas.height);

      if (typeof window !== "undefined") {
        const faceMesh = new FaceMesh({
          locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
        });

        faceMesh.setOptions({
          maxNumFaces: 1,
          refineLandmarks: true,
          minDetectionConfidence: 0.7,
          minTrackingConfidence: 0.7,
        });

        faceMesh.onResults((results) => {
          if (results.multiFaceLandmarks.length > 0) {
            const keypoints = results.multiFaceLandmarks[0];
            const leftEye = keypoints[33];
            const rightEye = keypoints[263];

            const leftEyeImg = new Image();
            leftEyeImg.src = leftEyeImgSrc;
            const rightEyeImg = new Image();
            rightEyeImg.src = rightEyeImgSrc;

            leftEyeImg.onload = () => {
              drawEyeOverlay(ctx, leftEyeImg, leftEye, rightEye, img.width, img.height, scale);
            };

            rightEyeImg.onload = () => {
              drawEyeOverlay(ctx, rightEyeImg, rightEye, leftEye, img.width, img.height, scale);
            };
          }
        });

        await faceMesh.initialize();
        await faceMesh.send({ image: img });
      }
    }

    detectFace();
  }, [isClient, scale, imageSrc]);

  function applyGrayscale(ctx, width, height) {
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
      data[i] = avg;
      data[i + 1] = avg;
      data[i + 2] = avg;
    }
    ctx.putImageData(imageData, 0, 0);


    // const imageData = ctx.getImageData(0, 0, width, height);
    // const data = imageData.data;

    // for (let i = 0; i < data.length; i += 4) {
    //   const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
    //   const contrastFactor = 2;
    //   const contrast = Math.max(0, Math.min(255, (avg - 40) * contrastFactor + 0.1));
    //   const edge = contrast > 128 ? 255 : 0;
    //   data[i] = edge;
    //   data[i + 1] = edge;
    //   data[i + 2] = edge;
    // }

    // ctx.putImageData(imageData, 0, 0);

    // const imageData = ctx.getImageData(0, 0, width, height);
    // const data = imageData.data;

    // for (let i = 0; i < data.length; i += 4) {
    //   const r = data[i];
    //   const g = data[i + 1];
    //   const b = data[i + 2];

    //   // Efek tepi dengan shifting warna RGB
    //   data[i] = Math.abs(r - g) * 2; // Red
    //   data[i + 1] = Math.abs(g - b) * 2; // Green
    //   data[i + 2] = Math.abs(b - r) * 2; // Blue
    // }

    // ctx.putImageData(imageData, 0, 0);
  }

  function drawEyeOverlay(ctx, overlayImg, eye, oppositeEye, imgWidth, imgHeight, scale) {
    const eyeX = eye.x * imgWidth;
    const eyeY = eye.y * imgHeight;
    const oppositeX = oppositeEye.x * imgWidth;
    const oppositeY = oppositeEye.y * imgHeight;

    const eyeDistance = Math.sqrt((eyeX - oppositeX) ** 2 + (eyeY - oppositeY) ** 2);
    const eyeWidth = eyeDistance * 0.8 * scale;
    const eyeHeight = eyeWidth * 1.8;
    const angle = Math.atan2(oppositeY - eyeY, oppositeX - eyeX);

    ctx.save();
    ctx.translate(eyeX, eyeY);
    ctx.rotate(angle);
    ctx.drawImage(overlayImg, -eyeWidth / 4.6, -eyeHeight / 2, eyeWidth, eyeHeight);
    ctx.restore();
  }

  function captureImage() {
    const canvas = canvasRef.current;
    const captureCanvas = captureCanvasRef.current;
    const captureCtx = captureCanvas.getContext("2d");

    captureCanvas.width = canvas.width;
    captureCanvas.height = canvas.height;
    captureCtx.drawImage(canvas, 0, 0);

    applyGrayscale(captureCtx, captureCanvas.width, captureCanvas.height);

    const base64Image = captureCanvas.toDataURL("image/png");
    setCapturedImage(base64Image);
    localStorage.setItem("capturedImage", base64Image);

    removeBG(base64Image)
  }


  const toDataURL = url => fetch(url)
  .then(response => response.blob())
  .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
  }))

  async function removeBG(imageData){

    try {
        const result = await fal.subscribe("fal-ai/bria/background/remove", {
            input: {
                image_url: imageData
            },
            logs: true,
            onQueueUpdate: (update) => {
                if (update.status === "IN_PROGRESS") {
                    update.logs.map((log) => log.message).forEach(console.log);
                }
            },
        });

        setResult(result);
        URL_RESULT = result.image.url;
        console.log(URL_RESULT)
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem("generateURLResult", URL_RESULT)
        }

        toDataURL(URL_RESULT)
        .then(dataUrl => {
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem("resulAIBase64", dataUrl)
            }
            setTimeout(() => {
                router.push('/magnum-greenday/result');
            }, 500);
        })
    } catch (error) {
        // setError(error);
    } finally {
        // setLoading(false);
        // setElapsedTime(Date.now() - start);
        // generateImageSwap()


        // router.push('/magnum-greenday/result');

    }
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-2 mb-4">
        <label>Scale:</label>
        <input
          type="range"
          min="0.5"
          max="2"
          step="0.1"
          value={scale}
          onChange={(e) => setScale(parseFloat(e.target.value))}
        />
        <span>{scale.toFixed(1)}</span>
      </div>

      <button onClick={captureImage} className="px-4 py-2 bg-blue-500 text-white rounded">
        Capture Image
      </button>

      {isClient && imageSrc && <img ref={imgRef} src={imageSrc} alt="Face" className="hidden" />}
      {isClient && <canvas ref={canvasRef} className="w-full border" />}
      <canvas ref={captureCanvasRef} className="hidden" />

      {capturedImage && (
        <div className="mt-4">
          <h3>Hasil Capture:</h3>
          <img src={capturedImage} alt="Captured" className="border w-full max-w-md" />
        </div>
      )}
    </div>
  );
}


// "use client";

// import { useEffect, useRef, useState } from "react";
// import { FaceMesh } from "@mediapipe/face_mesh";

// export default function FaceWithObject() {
//   const canvasRef = useRef(null);
//   const imgRef = useRef(null);
//   const captureCanvasRef = useRef(null);
//   const [isClient, setIsClient] = useState(false);
//   const [scale, setScale] = useState(.5);
//   const [capturedImage, setCapturedImage] = useState(null);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   useEffect(() => {
//     if (!isClient) return;

//     async function detectFace() {
//       const img = imgRef.current;
//       if (!img.complete) {
//         img.onload = detectFace;
//         return;
//       }

//       const canvas = canvasRef.current;
//       const ctx = canvas.getContext("2d");

//       // Atur ukuran canvas sesuai gambar
//       canvas.width = img.width;
//       canvas.height = img.height;
//       ctx.drawImage(img, 0, 0, img.width, img.height);

//       // Terapkan efek sketsa dengan kontras tinggi
//       applySketchEffect(ctx, canvas.width, canvas.height);
//     }

//     detectFace();
//   }, [isClient, scale]);

//   function applySketchEffect(ctx, width, height) {
//     const imageData = ctx.getImageData(0, 0, width, height);
//     const data = imageData.data;

//     for (let i = 0; i < data.length; i += 4) {
//       const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
//       const contrastFactor = 2;
//       const contrast = Math.max(0, Math.min(255, (avg - 128) * contrastFactor + 128));
//       const edge = contrast > 128 ? 255 : 0;
//       data[i] = edge;
//       data[i + 1] = edge;
//       data[i + 2] = edge;
//     }

//     ctx.putImageData(imageData, 0, 0);
//   }

//   return (
//     <div className="relative">
//       {/* Kontrol Skala */}
//       <div className="flex items-center gap-2 mb-4">
//         <label>Scale:</label>
//         <input
//           type="range"
//           min="0.5"
//           max="2"
//           step="0.1"
//           value={scale}
//           onChange={(e) => setScale(parseFloat(e.target.value))}
//         />
//         <span>{scale.toFixed(1)}</span>
//       </div>

//       {/* Gambar yang langsung dimuat */}
//       {isClient && <img ref={imgRef} src="/magnum-greenday/face.png" alt="Face" className="w-full border" />}

//       {/* Canvas untuk menggambar efek */}
//       {isClient && <canvas ref={canvasRef} className="w-full border" />}
//     </div>
//   );
// }
