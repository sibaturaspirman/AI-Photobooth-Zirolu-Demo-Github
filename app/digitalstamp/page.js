'use client'

import { useState, useEffect, useRef } from "react";

export default function Home() {
  let sentuhan = {};
  const [touches, setTouches] = useState([]);
  const [topLeftX, setTopLeftX] = useState(0);
  const [topLeftY, setTopLeftY] = useState(0);
  const [topRightX, setTopRightX] = useState(0);
  const [topRightY, setTopRightY] = useState(0);
  
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleTouchStart = (e) => {
      e.preventDefault();
      const newTouches = Array.from(e.touches).map((t) => ({
        id: t.identifier,
        x: t.pageX,
        y: t.pageY,
      }));
      setTouches(newTouches);
      drawTouches(ctx, newTouches);
    };

    const handleTouchMove = (e) => {
      e.preventDefault();
      const updatedTouches = Array.from(e.touches).map((t) => ({
        id: t.identifier,
        x: t.pageX,
        y: t.pageY,
      }));
      setTouches(updatedTouches);
      drawTouches(ctx, updatedTouches);
    };

    const handleTouchEnd = (e) => {
      e.preventDefault();
      if (Object.keys(sentuhan).length === 2) {
        const points = Object.values(sentuhan);
        console.log(points)
        console.log(checkSquarePattern(points))
        if (checkSquarePattern(points)) {
            alert("2 Fingers detected: Square Pattern!");
            // console.log("4 fingers")

            setTimeout(() => {
                // setStatusStamp(false)
                // setStartStamp(false)

                sentuhan = {}
                setTouches([]);
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }, 1500);
        }
      }

      // setTouches([]);
      // ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const checkSquarePattern = (points) => {
      if (points.length !== 2) return false;
      // console.log(points)

      // Sort points by x and y positions
      points.sort((a, b) => a.x - b.x || a.y - b.y);
      // const [topLeft, topRight, bottomLeft, bottomRight] = points;
      const [topLeft, topRight] = points;
      // console.log(points)

      // Calculate distances between adjacent points
      // const topEdge = getDistance(topLeft, topRight);
      // const bottomEdge = getDistance(bottomLeft, bottomRight);
      // const leftEdge = getDistance(topLeft, bottomLeft);
      // const rightEdge = getDistance(topRight, bottomRight);

      // Check if edges form a square
      const threshold = 20;
      const thresholdRightXMax = 45;
      const thresholdRightXMin = 25;

      setTopLeftX(topLeft.x)
      setTopLeftY(topLeft.y)
      setTopRightX(topRight.x)
      setTopRightY(topRight.y)

      // const isBottomAligned = Math.abs(bottomLeft.y - bottomRight.y) < threshold;
      // const isLeftAligned = Math.abs(bottomLeft.x - topLeft.x) < threshold;
      // const isRightAligned = Math.abs(bottomRight.x - topRight.x) < thresholdRightXMax && Math.abs(bottomRight.x - topRight.x) >= thresholdRightXMin;
      // const isTopXAligned = Math.abs(topLeft.x - topRight.x) >= 85 && Math.abs(topLeft.x - topRight.x) <= 95;
      // const isTopYAligned = Math.abs(topLeft.y - topRight.y) >= 40 && Math.abs(topLeft.y - topRight.y) <= 50;

      // console.log("TL X : "+topLeft.x)
      // console.log("TR X : "+topRight.x)
      // console.log("BL X : "+bottomLeft.x)
      // console.log("BR X : "+bottomRight.x)
      // console.log(Math.abs(bottomLeft.x - topLeft.x))
      // console.log(Math.abs(bottomRight.x - topRight.x))
      // console.log(Math.abs(topLeft.y - topRight.y))
      // console.log(isBottomAligned)
      // console.log(isLeftAligned)
      // console.log(isRightAligned)
      // console.log(isTopXAligned)
      // console.log(isTopYAligned)

      // return isBottomAligned && isLeftAligned && isRightAligned && isTopXAligned && isTopYAligned;
    };

    const drawTouches = (ctx, touchPoints) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "blue";
      touchPoints.forEach((t) => {
          ctx.beginPath();
          ctx.arc(t.x, t.y, 20, 0, Math.PI * 2);
          ctx.fill();
          ctx.font = "10px Arial";
          ctx.fillText("X : "+t.x+' | Y : '+t.y,t.x -30,t.y+30);
      });
    };

    canvas.addEventListener("touchstart", handleTouchStart);
    canvas.addEventListener("touchmove", handleTouchMove);
    canvas.addEventListener("touchend", handleTouchEnd);

    return () => {
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("touchmove", handleTouchMove);
      canvas.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div className=" bg-[#F4F4F4]">
      <canvas ref={canvasRef} style={{ touchAction: "none" }} />
      <div className="absolute bottom-0 left-0 right- p-5 text-[#000]">
        Top Left X : {topLeftX} | Top Left Y : {topLeftY}<br></br>
        Top Right X : {topRightX} | Top Right Y : {topRightY}
      </div>
    </div>
  );
}
