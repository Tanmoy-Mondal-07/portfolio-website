import React from 'react';
import { motion } from 'framer-motion';
import frame1 from '../assets/frames/34365421.png';
import frame2 from '../assets/frames/3436542.png';
import frame3 from '../assets/frames/34365422.png';
import frame4 from '../assets/frames/34365423.png';
import frame5 from '../assets/frames/34365424.png';
import frame6 from '../assets/frames/34365425.png';
import frame7 from '../assets/frames/34365426.png';

// Layers for parallax; depth controls movement amplitude
const layers = [
  { src: frame7, depth: 4 },
  { src: frame6, depth: 6 },
  { src: frame5, depth: 8 },
  { src: frame4, depth: 10 },
  { src: frame3, depth: 10 },
  { src: frame2, depth: 0 },
  { src: frame1, depth: 0 }
];

export default function HeroSection() {
  return (
    <div
      className="relative w-full h-full overflow-hidden bg-[#e8e6ed] flex items-center justify-center"
      style={{ perspective: 800 }} // enable 3D effect
    >
      <div className="relative bg-[#1c2f33] overflow-hidden w-full aspect-3/2">
        {layers.map((layer, idx) => (
          <motion.img
            key={idx}
            src={layer.src}
            alt={`Layer ${idx}`}
            className="absolute inset-0 w-full h-full object-contain"
            style={{ zIndex: idx, translateZ: -layer.depth }}
            animate={{
              y: [0, -layer.depth, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: idx * 0.4
            }}
          />
        ))}
      </div>
      {/* Overlay content goes here */}
    </div>
  );
}