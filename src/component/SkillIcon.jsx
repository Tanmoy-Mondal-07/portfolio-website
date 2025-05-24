import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";

export default function SkillIcon({ name, icon }) {
  const tileRef = useRef(null);
  const [activeRipple, setActiveRipple] = useState(null);

  const onHover = useCallback(() => {
    setActiveRipple(Date.now());
    setTimeout(() => setActiveRipple(null), 1000);
  }, []);

  return (
    <div className="relative">
      {/* Ripple */}
      {activeRipple && (
        <motion.div
          key={activeRipple} // Force remount for animation
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="absolute left-1/2 top-1/2 pointer-events-none -translate-x-1/2 -translate-y-1/2"
          style={{
            width: "500px",
            height: "500px",
            background:
              "radial-gradient(circle, rgba(51, 65, 85, 0.55) 0%, rgba(51, 65, 85, 0) 80%)",
            borderRadius: "50%",
            zIndex: 0,
          }}
        />
      )}

      {/* Tile */}
      <motion.div
        ref={tileRef}
        className="relative z-10 flex flex-col items-center justify-center p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-500"
        onHoverStart={onHover}
        onClick={onHover}
        whileHover={{
          y: 3,
          scale: 0.98,
          transition: {
            type: "spring",
            stiffness: 180,
            damping: 30,
            duration: 0.5,
          },
        }}
      >
        <motion.div
          className="relative z-10 mb-3 p-3 rounded-full bg-zinc-50 flex items-center justify-center overflow-hidden"
          whileHover={{
            y: 2,
            opacity: 0.9,
            backgroundColor: "#eeeeee",
            transition: {
              type: "spring",
              stiffness: 160,
              damping: 25,
              duration: 0.5,
            },
          }}
        >
          {icon}
        </motion.div>

        <motion.p className="text-sm font-medium text-zinc-700 z-10">
          {name}
        </motion.p>
      </motion.div>
    </div>
  );
}