import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import testImage from "../assets/Dantethumbnail.png";

const images = [
  testImage,
  testImage,
  testImage,
  testImage,
];

export default function ScrollExpandSlider() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const total = images.length;

  const transforms = images.map((_, i) => {
    const start = i / total;
    const middle = (i + 0.5) / total;
    const end = (i + 1) / total;
    const offset = i * 4;

    const width = useTransform(scrollYProgress, [start, middle, end], ["2%", "100%", "2%"]);
    const right = useTransform(scrollYProgress, [start, middle, end], [`${12 - offset}%`, `${6 - offset}%`, `${98 - offset}%`]);

    return { width, right };
  });

  return (
    <div
      ref={containerRef}
      style={{ height: `${total * 200}vh` }}
      className="flex justify-center"
    >
      <div className="sticky top-0 left-0 w-full h-screen flex flex-col justify-center items-center overflow-hidden bg-gray-100 text-gray-900">
        <h2 className="mb-12 text-center text-5xl font-bold tracking-tight z-10">
          Certificate
        </h2>
        <div className="relative w-[60vw] h-[60vh] flex items-center justify-center">
          {images.map((src, i) => (
            <motion.img
              key={i}
              src={src}
              alt={`Slide ${i}`}
              className="absolute rounded-2xl shadow-xl h-full transition-all duration-700 ease-in-out"
              style={{
                width: transforms[i].width,
                right: transforms[i].right,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}