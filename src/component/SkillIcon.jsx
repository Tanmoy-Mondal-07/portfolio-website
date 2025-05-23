"use client"

import { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function SkillIcon({ name, icon, index, onHover, iconColor }) {
  const iconRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)
  const [hasTriggeredRipple, setHasTriggeredRipple] = useState(false)

  const handleHoverStart = () => {
    if (!iconRef.current || !onHover || hasTriggeredRipple) return

    setIsHovering(true)

    // Get the position and dimensions of the icon
    const rect = iconRef.current.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2
    const width = rect.width
    const height = rect.height

    // Create ripple effect
    onHover(x, y, width, height, iconColor)

    // Prevent multiple ripples during the same hover
    setHasTriggeredRipple(true)

    // Reset after a delay to allow new ripples if the user hovers again
    setTimeout(() => {
      setHasTriggeredRipple(false)
    }, 1000)
  }

  const handleHoverEnd = () => {
    setIsHovering(false)
  }

  return (
    <motion.div
      ref={iconRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col items-center justify-center p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-300"
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      whileHover={{
        y: 3, // Subtle sinking effect
        scale: 0.97, // Subtle shrink
        transition: {
          type: "spring",
          stiffness: 300,
          damping: 15,
        },
      }}
    >
      <AnimatePresence>
        <motion.div
          className="relative mb-3 p-3 rounded-full bg-gray-50 flex items-center justify-center overflow-hidden"
          animate={
            isHovering
              ? {
                  y: 2,
                  opacity: 0.9,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  },
                }
              : {
                  y: 0,
                  opacity: 1,
                  transition: {
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                  },
                }
          }
        >
          {/* Subtle reflection overlay */}
          {isHovering && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gradient-to-b from-white to-transparent"
              style={{ mixBlendMode: "overlay" }}
            />
          )}
          {icon}
        </motion.div>
      </AnimatePresence>

      <motion.p
        className="text-sm font-medium text-gray-700"
        animate={
          isHovering
            ? {
                y: 1,
                opacity: 0.9,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                },
              }
            : {
                y: 0,
                opacity: 1,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                },
              }
        }
      >
        {name}
      </motion.p>
    </motion.div>
  )
}