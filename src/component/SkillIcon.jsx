import { useRef } from "react"
import { motion } from "framer-motion"

export default function SkillIcon({ name, icon, index, onHover }) {
  const iconRef = useRef(null)

  const handleHoverStart = () => {
    if (!iconRef.current || !onHover) return

    // Get element position for ripple effect
    const rect = iconRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    // Create gentle ripple effect
    onHover(centerX, centerY)
  }

  return (
    <motion.div
      ref={iconRef}
      className="flex flex-col items-center justify-center p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-500"
      onHoverStart={handleHoverStart}
      whileHover={{
        y: 3, // Subtle movement
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
        className="relative mb-3 p-3 rounded-full bg-slate-50 flex items-center justify-center overflow-hidden"
        whileHover={{
          y: 2,
          opacity: 0.9,
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

      <motion.p className="text-sm font-medium text-slate-700">{name}</motion.p>
    </motion.div>
  )
}