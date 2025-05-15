import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import testImage from "../assets/Dantethumbnail.png";

const images = [
  testImage,
  testImage,
  testImage,
  testImage,
];

export default function ScrollExpandSlider(){
    
}

// export default function ScrollExpandSlider() {
//   const containerRef = useRef(null);
//   const { scrollYProgress } = useScroll({ target: containerRef });
//   const total = images.length;

//   const transforms = images.map((_, i) => {
//     const start = i / total;
//     const middle = (i + 0.5) / total;
//     const end = (i + 1) / total;

//     const width = useTransform(scrollYProgress, [start, middle, end], ["2px", "100vw", "2px"]);
//     const align = useTransform(scrollYProgress, [start, end], ['right: "100px"', 'left: "100px"']);
//     const x = useTransform(scrollYProgress, [start, middle, end], ["0px", "0px", `-${100 * (total - 1)}vw`]);

//     return { width, x };
//   });

//   return (
//     <div
//       ref={containerRef}
//       className="relative bg-black"
//       style={{ height: `${total * 200}vh` }}
//     >
//       <div className="sticky top-0 h-screen w-screen overflow-hidden">
//         {images.map((src, i) => (
//           <motion.img
//             key={i}
//             src={src}
//             alt={`Slide ${i}`}
//             className="h-120 absolute top-1/2 -translate-y-1/2 "
//             style={{
//               width: transforms[i].width,
//               x: transforms[i].x,
//               right: '100px',
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }