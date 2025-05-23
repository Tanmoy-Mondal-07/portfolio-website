"use client"

import { useEffect, useRef, useCallback, useState } from "react"
import { motion } from "framer-motion"
import SkillIcon from "./SkillIcon"

const skillData = [
  { name: "HTML", link: "https://cdn.simpleicons.org/html5/E34F26" },
  { name: "CSS", link: "https://cdn.simpleicons.org/css3/1572B6" },
  { name: "JavaScript", link: "https://cdn.simpleicons.org/javascript/F7DF1E" },
  { name: "TypeScript", link: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "Tailwind", link: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { name: "Bootstrap", link: "https://cdn.simpleicons.org/bootstrap" },
  { name: "React", link: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "Redux", link: "https://cdn.simpleicons.org/redux" },
  { name: "Framer Motion", link: "https://cdn.simpleicons.org/framer" },
  { name: "Node.js", link: "https://cdn.simpleicons.org/nodedotjs" },
  { name: "Axios", link: "https://cdn.simpleicons.org/axios" },
  { name: "Appwrite", link: "https://cdn.simpleicons.org/appwrite" },
  { name: "Postman", link: "https://cdn.simpleicons.org/postman" },
  { name: "Python", link: "https://cdn.simpleicons.org/python" },
  { name: "Git", link: "https://cdn.simpleicons.org/git" },
  { name: "NPM", link: "https://cdn.simpleicons.org/npm" },
  { name: "Cloudflare", link: "https://cdn.simpleicons.org/cloudflare" },
  { name: "Arch Linux", link: "https://cdn.simpleicons.org/archlinux" },
]

const getSkillIcon = (link, name) => (
  <img loading="lazy" src={link || "/placeholder.svg"} alt={name} className="w-8 h-8" />
)

// Convert hex color to RGB
const hexToRgb = (hex) => {
  if (!hex || !hex.match(/^[0-9A-F]{6}$/i)) return "0, 0, 0"
  
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)
  return `${r}, ${g}, ${b}`
}

export default function Skills() {
  const containerRef = useRef(null)
  const canvasRef = useRef(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const animationRef = useRef(null)
  const waterEffectRef = useRef(null)

  // Initialize water effect
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions with higher resolution for retina displays
    const updateCanvasDimensions = () => {
      const container = containerRef.current
      if (!container) return

      const rect = container.getBoundingClientRect()
      const width = rect.width
      const height = rect.height
      
      // Set display size
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      
      // Set actual size with higher resolution
      const dpr = window.devicePixelRatio || 1
      canvas.width = width * dpr
      canvas.height = height * dpr
      
      // Scale context to match device pixel ratio
      ctx.scale(dpr, dpr)
      
      setDimensions({ width, height })
    }

    // Initialize water effect class
    class WaterEffect {
      constructor(canvas, ctx) {
        this.canvas = canvas
        this.ctx = ctx
        this.width = canvas.width
        this.height = canvas.height
        
        // Water properties
        this.ripples = []
        this.splashes = []
        this.ambientWaves = this.createAmbientWaves()
        
        // Water surface properties
        this.surfaceY = 0
        this.surfaceAmplitude = 0.5
        this.surfaceFrequency = 0.05
        this.surfaceSpeed = 0.02
        this.surfacePhase = 0
        
        // Colors
        this.waterColor = "rgba(240, 248, 255, 0.2)" // Very light blue
        this.waterHighlight = "rgba(255, 255, 255, 0.4)"
        this.waterShadow = "rgba(0, 30, 60, 0.1)"
      }
      
      // Create ambient waves for subtle water movement
      createAmbientWaves() {
        const waves = []
        const waveCount = 3
        
        for (let i = 0; i < waveCount; i++) {
          waves.push({
            amplitude: 0.2 + Math.random() * 0.3,
            frequency: 0.01 + Math.random() * 0.02,
            phase: Math.random() * Math.PI * 2,
            speed: 0.005 + Math.random() * 0.01
          })
        }
        
        return waves
      }
      
      // Create a ripple at the specified position
      createRipple(x, y, width, height, color) {
        // Convert coordinates to be relative to canvas
        const rect = this.canvas.getBoundingClientRect()
        const canvasX = x - rect.left
        const canvasY = y - rect.top
        
        // Create main ripple
        this.ripples.push({
          x: canvasX,
          y: canvasY,
          width: width,
          height: height,
          radius: Math.max(width, height) * 0.5, // Start with icon size
          targetRadius: Math.max(width, height) * 8, // End size
          strength: 8,
          color: color,
          progress: 0,
          speed: 0.01 + Math.random() * 0.005,
          opacity: 1,
          rings: 3 + Math.floor(Math.random() * 2),
          ringSpacing: 5 + Math.random() * 3,
          waveHeight: 1 + Math.random() * 1.5,
          phase: Math.random() * Math.PI * 2,
          phaseSpeed: 0.05 + Math.random() * 0.03
        })
        
        // Create splash particles
        this.createSplash(canvasX, canvasY, color)
      }
      
      // Create splash particles
      createSplash(x, y, color) {
        const particleCount = 8 + Math.floor(Math.random() * 8)
        
        for (let i = 0; i < particleCount; i++) {
          const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5
          const speed = 0 + Math.random() * .3
          const size = 1 + Math.random() * 2
          const lifetime = 10.7 + Math.random() * 0.5
          
          this.splashes.push({
            x: x,
            y: y,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 2, // Initial upward velocity
            size: size,
            color: color,
            progress: 0,
            lifetime: lifetime,
            gravity: 0.1 + Math.random() * 0.05
          })
        }
      }
      
      // Update and draw the water effect
      update() {
        const { width, height } = dimensions
        this.ctx.clearRect(0, 0, width, height)
        
        // Draw subtle background grid
        this.drawBackgroundGrid()
        
        // Update ambient waves
        this.surfacePhase += this.surfaceSpeed
        for (let wave of this.ambientWaves) {
          wave.phase += wave.speed
        }
        
        // Draw water surface
        this.drawWaterSurface()
        
        // Update and draw ripples
        this.updateRipples()
        
        // Update and draw splashes
        this.updateSplashes()
      }
      
      // Draw subtle background grid
      drawBackgroundGrid() {
        const { width, height } = dimensions
        this.ctx.strokeStyle = "rgba(0, 0, 0, 0.03)"
        this.ctx.lineWidth = 0.5
        
        // Horizontal lines
        for (let y = 0; y < height; y += 40) {
          this.ctx.beginPath()
          this.ctx.moveTo(0, y)
          this.ctx.lineTo(width, y)
          this.ctx.stroke()
        }
        
        // Vertical lines
        for (let x = 0; x < width; x += 40) {
          this.ctx.beginPath()
          this.ctx.moveTo(x, 0)
          this.ctx.lineTo(x, height)
          this.ctx.stroke()
        }
      }
      
      // Draw subtle ambient water surface
      drawWaterSurface() {
        const { width, height } = dimensions
        
        // Create subtle gradient for water surface
        const gradient = this.ctx.createLinearGradient(0, 0, 0, height)
        gradient.addColorStop(0, "rgba(255, 255, 255, 0.01)")
        gradient.addColorStop(1, "rgba(200, 225, 255, 0.05)")
        
        this.ctx.fillStyle = gradient
        this.ctx.fillRect(0, 0, width, height)
      }
      
      // Update and draw ripples
      updateRipples() {
        for (let i = 0; i < this.ripples.length; i++) {
          const ripple = this.ripples[i]
          
          // Update ripple progress
          ripple.progress += ripple.speed
          ripple.phase += ripple.phaseSpeed
          
          // Calculate current radius based on eased progress
          const easedProgress = this.easeOutCubic(ripple.progress)
          ripple.radius = ripple.radius + (ripple.targetRadius - ripple.radius) * easedProgress * 5.1
          
          // Remove completed ripples
          if (ripple.progress >= 1) {
            this.ripples.splice(i, 1)
            i--
            continue
          }
          
          // Draw ripple rings
          this.drawRipple(ripple)
        }
      }
      
      // Draw a single ripple with multiple rings
      drawRipple(ripple) {
        const { x, y, radius, rings, ringSpacing, color, progress, waveHeight, phase } = ripple
        
        // Calculate opacity based on progress (fade out as it expands)
        const opacity = Math.max(0, 1 - progress * 1.2)
        
        // Draw multiple rings
        for (let i = 0; i < rings; i++) {
          const ringRadius = radius - i * ringSpacing
          
          if (ringRadius <= 0) continue
          
          // Calculate ring opacity (inner rings are more visible)
          const ringOpacity = opacity * (1 - i / rings)
          
          // Set styles
          this.ctx.strokeStyle = `rgba(${color}, ${ringOpacity * 0.7})`
          this.ctx.lineWidth = 1.5 * (1 - i / rings) * (1 - progress * 0.5)
          
          // Draw wavy ring
          this.ctx.beginPath()
          
          const segments = 40
          for (let j = 0; j <= segments; j++) {
            const angle = (j / segments) * Math.PI * 2
            
            // Calculate wave distortion
            const waveOffset = Math.sin(angle * 8 + phase) * waveHeight * (1 - progress * 0.7)
            
            // Calculate point position
            const pointX = x + (ringRadius + waveOffset) * Math.cos(angle)
            const pointY = y + (ringRadius + waveOffset) * Math.sin(angle)
            
            if (j === 0) {
              this.ctx.moveTo(pointX, pointY)
            } else {
              this.ctx.lineTo(pointX, pointY)
            }
          }
          
          this.ctx.closePath()
          this.ctx.stroke()
        }
        
        // Draw subtle glow effect
        const glowRadius = radius * 0.9
        const glowGradient = this.ctx.createRadialGradient(x, y, 0, x, y, glowRadius)
        glowGradient.addColorStop(0, `rgba(${color}, ${opacity * 0.1})`)
        glowGradient.addColorStop(0.7, `rgba(${color}, ${opacity * 0.05})`)
        glowGradient.addColorStop(1, `rgba(${color}, 0)`)
        
        this.ctx.fillStyle = glowGradient
        this.ctx.beginPath()
        this.ctx.arc(x, y, glowRadius, 0, Math.PI * 2)
        this.ctx.fill()
      }
      
      // Update and draw splash particles
      updateSplashes() {
        for (let i = 0; i < this.splashes.length; i++) {
          const splash = this.splashes[i]
          
          // Update splash position with gravity
          splash.progress += 0.02
          splash.vy += splash.gravity
          splash.x += splash.vx
          splash.y += splash.vy
          
          // Remove completed splashes
          if (splash.progress >= splash.lifetime) {
            this.splashes.splice(i, 1)
            i--
            continue
          }
          
          // Draw splash particle
          this.drawSplash(splash)
        }
      }
      
      // Draw a single splash particle
      drawSplash(splash) {
        const { x, y, size, color, progress, lifetime } = splash
        
        // Calculate opacity based on progress
        const opacity = Math.max(0, 1 - progress / lifetime)
        
        // Draw water droplet
        this.ctx.fillStyle = `rgba(${color}, ${opacity * 0.7})`
        this.ctx.beginPath()
        this.ctx.arc(x, y, size * (1 - progress * 0.5), 0, Math.PI * 2)
        this.ctx.fill()
        
        // Draw highlight
        this.ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.5})`
        this.ctx.beginPath()
        this.ctx.arc(x - size * 0.3, y - size * 0.3, size * 0.3 * (1 - progress * 0.5), 0, Math.PI * 2)
        this.ctx.fill()
      }
      
      // Easing function for smooth animations
      easeOutCubic(x) {
        return 1 - Math.pow(1 - x, 3)
      }
    }
    
    // Create water effect instance
    const waterEffect = new WaterEffect(canvas, ctx)
    waterEffectRef.current = waterEffect
    
    // Animation loop
    const animate = () => {
      waterEffect.update()
      animationRef.current = requestAnimationFrame(animate)
    }
    
    // Start animation
    updateCanvasDimensions()
    animate()
    
    // Handle window resize
    window.addEventListener("resize", updateCanvasDimensions)
    
    // Cleanup
    return () => {
      window.removeEventListener("resize", updateCanvasDimensions)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [dimensions])
  
  // Function to create ripple effect
  const createRippleEffect = useCallback((x, y, width, height, color) => {
    if (waterEffectRef.current) {
      waterEffectRef.current.createRipple(x, y, width, height, color)
    }
  }, [])

  return (
    <section ref={containerRef} className="relative w-full min-h-screen overflow-hidden bg-white text-black py-20">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />
      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-12 text-center text-4xl font-bold text-gray-800">Tech Arsenal</h2>
        </motion.div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {skillData.map((skill, index) => (
            <SkillIcon
              key={skill.name}
              name={skill.name}
              icon={getSkillIcon(skill.link, skill.name)}
              index={index}
              onHover={createRippleEffect}
              iconColor={hexToRgb(skill.link.split("/").pop())}
            />
          ))}
        </div>
      </div>
    </section>
  )
}