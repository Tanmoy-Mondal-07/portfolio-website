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
    const quarter = start + (0.25 / total);
    const middle = (i + 0.5) / total;
    const threeQuarter = start + (0.75 / total);
    const end = (i + 1) / total;
    const offset = i * 2;

    const width = useTransform(
      scrollYProgress,
      [start, quarter, middle, threeQuarter, end],
      ["1%", "80%", "80%", "80%", "1%"]
    );

    const right = useTransform(
      scrollYProgress,
      [start, quarter, middle, threeQuarter, end],
      [`${6 - offset}%`, `10%`, `10%`, `10%`, `${99 - offset}%`]
    );

    return { width, right };
  });

  return (
    <div
      ref={containerRef}
      style={{ height: `${total * 200}vh` }}
      className="flex justify-center items-start bg-gradient-to-br from-indigo-50 to-white"
    >
      <div className="sticky top-0 w-full h-screen flex flex-col justify-center items-center overflow-hidden">
        {/* Decorative floating orbs */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, idx) => (
            <div
              key={idx}
              className="absolute bg-indigo-200/20 rounded-full animate-pulse"
              style={{
                width: `${Math.random() * 200 + 100}px`,
                height: `${Math.random() * 200 + 100}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 10 + 5}s`,
              }}
            />
          ))}
        </div>

        <h2 className="relative z-20 mb-12 sm:mb-4 text-center text-4xl md:text-6xl font-bold tracking-tight drop-shadow-lg">
          Certificate
        </h2>
        <div className="relative z-20 w-screen sm:w-[60vw] aspect-[16/9] max-w-5xl bg-white/70 backdrop-blur-lg border border-white/30 sm:rounded-2xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 ring-1 ring-white/20 pointer-events-none" />
          {images.map((src, i) => (
            <motion.img
              key={i}
              src={src}
              alt={`Slide ${i}`}
              className="absolute object-cover shadow-xl h-full transition-all duration-500 ease-in-out"
              style={{
                width: transforms[i].width,
                right: transforms[i].right,
              }}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </div>
  );
}