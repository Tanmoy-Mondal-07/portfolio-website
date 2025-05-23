"use client"

import { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function SkillIcon({ name, icon, index, onHover, iconColor }) {
  const iconRef = useRef(null)
  const [isSubmerging, setIsSubmerging] = useState(false)
  const [hasTriggeredRipple, setHasTriggeredRipple] = useState(false)

  const handleHoverStart = () => {
    if (!iconRef.current || !onHover || hasTriggeredRipple) return

    setIsSubmerging(true)

    // Get precise center coordinates and dimensions
    const rect = iconRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const iconWidth = rect.width
    const iconHeight = rect.height

    // Create gentle ripple effect
    onHover(centerX, centerY, iconWidth, iconHeight, iconColor)

    // Prevent multiple ripples during the same hover session
    setHasTriggeredRipple(true)

    // Reset after animation completes
    setTimeout(() => {
      setHasTriggeredRipple(false)
    }, 2500)
  }

  const handleHoverEnd = () => {
    // Delay the submersion end to allow for smooth transition
    setTimeout(() => {
      setIsSubmerging(false)
    }, 400)
  }

  return (
    <motion.div
      ref={iconRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col items-center justify-center p-4 rounded-lg bg-white shadow-md hover:shadow-lg transition-all duration-700"
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      whileHover={{
        y: 6, // Gentle sinking effect
        scale: 0.96, // Subtle shrinking
        transition: {
          type: "spring",
          stiffness: 180,
          damping: 30,
          duration: 0.8,
        },
      }}
    >
      <motion.div
        className="relative mb-3 p-3 rounded-full bg-gray-50 flex items-center justify-center overflow-hidden"
        animate={
          isSubmerging
            ? {
                y: 4,
                opacity: 0.75,
                scale: 0.94,
                filter: "blur(0.3px) brightness(0.95)",
                transition: {
                  type: "spring",
                  stiffness: 160,
                  damping: 25,
                  duration: 1,
                },
              }
            : {
                y: 0,
                opacity: 1,
                scale: 1,
                filter: "blur(0px) brightness(1)",
                transition: {
                  type: "spring",
                  stiffness: 200,
                  damping: 30,
                  duration: 0.8,
                },
              }
        }
      >
        {/* Subtle underwater tint overlay */}
        <AnimatePresence>
          {isSubmerging && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: 0.25,
                transition: { duration: 1, ease: "easeInOut" },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.8, ease: "easeInOut" },
              }}
              className="absolute inset-0 rounded-full"
              style={{
                background: `linear-gradient(135deg, rgba(${iconColor.r}, ${iconColor.g}, ${iconColor.b}, 0.08), rgba(200, 230, 255, 0.12))`,
                mixBlendMode: "multiply",
              }}
            />
          )}
        </AnimatePresence>

        {/* Gentle water refraction effect */}
        <AnimatePresence>
          {isSubmerging && (
            <motion.div
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{
                opacity: 0.3,
                scale: 1,
                transition: { duration: 1.2, ease: "easeOut" },
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                transition: { duration: 0.6, ease: "easeIn" },
              }}
              className="absolute inset-0 bg-gradient-to-br from-white via-transparent to-blue-50 rounded-full"
              style={{ mixBlendMode: "soft-light" }}
            />
          )}
        </AnimatePresence>

        <motion.div
          animate={
            isSubmerging
              ? {
                  filter: "brightness(0.92) contrast(1.05) saturate(1.1)",
                  transition: { duration: 1 },
                }
              : {
                  filter: "brightness(1) contrast(1) saturate(1)",
                  transition: { duration: 0.8 },
                }
          }
        >
          {icon}
        </motion.div>
      </motion.div>

      <motion.p
        className="text-sm font-medium text-gray-700"
        animate={
          isSubmerging
            ? {
                y: 3,
                opacity: 0.85,
                scale: 0.97,
                transition: {
                  type: "spring",
                  stiffness: 160,
                  damping: 25,
                  duration: 1,
                },
              }
            : {
                y: 0,
                opacity: 1,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 200,
                  damping: 30,
                  duration: 0.8,
                },
              }
        }
      >
        {name}
      </motion.p>
    </motion.div>
  )
}