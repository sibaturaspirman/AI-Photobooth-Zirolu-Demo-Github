'use client'

import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [touches, setTouches] = useState([]);
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
      // setTouches([]);
      // ctx.clearRect(0, 0, canvas.width, canvas.height);
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
    </div>
  );
}
