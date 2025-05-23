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
    { name: "Bootstrap", link: "https://cdn.simpleicons.org/bootstrap/7952B3" },
    { name: "React", link: "https://cdn.simpleicons.org/react/61DAFB" },
    { name: "Redux", link: "https://cdn.simpleicons.org/redux/764ABC" },
    { name: "Framer Motion", link: "https://cdn.simpleicons.org/framer/0055FF" },
    { name: "Node.js", link: "https://cdn.simpleicons.org/nodedotjs/339933" },
    { name: "Axios", link: "https://cdn.simpleicons.org/axios/5A29E4" },
    { name: "Appwrite", link: "https://cdn.simpleicons.org/appwrite/F02E65" },
    { name: "Postman", link: "https://cdn.simpleicons.org/postman/FF6C37" },
    { name: "Python", link: "https://cdn.simpleicons.org/python/3776AB" },
    { name: "Git", link: "https://cdn.simpleicons.org/git/F05032" },
    { name: "NPM", link: "https://cdn.simpleicons.org/npm/CB3837" },
    { name: "Cloudflare", link: "https://cdn.simpleicons.org/cloudflare/F38020" },
    { name: "Arch Linux", link: "https://cdn.simpleicons.org/archlinux/1793D1" },
];

const getSkillIcon = (link, name) => (
    <img loading="lazy" src={link || "/placeholder.svg"} alt={name} className="w-8 h-8" />
)

// Convert hex color to RGB
const hexToRgb = (hex) => {
    if (!hex || !hex.match(/^[0-9A-F]{6}$/i)) return { r: 59, g: 130, b: 246 } // Default blue

    const r = Number.parseInt(hex.substring(0, 2), 16)
    const g = Number.parseInt(hex.substring(2, 4), 16)
    const b = Number.parseInt(hex.substring(4, 6), 16)
    return { r, g, b }
}

export default function Skills() {
    const containerRef = useRef(null)
    const canvasRef = useRef(null)
    const waterEffectRef = useRef(null)
    const [canvasReady, setCanvasReady] = useState(false)

    useEffect(() => {
        if (!canvasRef.current || !containerRef.current) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        // Elegant Water Ripple Effect Class
        class WaterRippleEffect {
            constructor(canvas, ctx, container) {
                this.canvas = canvas
                this.ctx = ctx
                this.container = container

                // Animation arrays
                this.ripples = []

                // Animation frame
                this.animationId = null

                // Water surface properties
                this.ambientTime = 0
                this.surfaceWaves = this.createSurfaceWaves()

                this.setupCanvas()
                this.startAnimation()
            }

            setupCanvas() {
                const updateSize = () => {
                    const rect = this.container.getBoundingClientRect()
                    const dpr = window.devicePixelRatio || 1

                    // Set display size
                    this.canvas.style.width = `${rect.width}px`
                    this.canvas.style.height = `${rect.height}px`

                    // Set actual size with device pixel ratio
                    this.canvas.width = rect.width * dpr
                    this.canvas.height = rect.height * dpr

                    // Scale context
                    this.ctx.scale(dpr, dpr)

                    this.width = rect.width
                    this.height = rect.height
                }

                updateSize()
                window.addEventListener("resize", updateSize)

                return () => window.removeEventListener("resize", updateSize)
            }

            createSurfaceWaves() {
                // Create subtle ambient water surface waves
                return [
                    { amplitude: 0.3, frequency: 0.008, phase: 0, speed: 0.003 },
                    { amplitude: 0.2, frequency: 0.012, phase: Math.PI, speed: 0.004 },
                    { amplitude: 0.15, frequency: 0.015, phase: Math.PI / 2, speed: 0.002 },
                ]
            }

            createRipple(centerX, centerY, iconWidth, iconHeight, color) {
                // Convert screen coordinates to canvas coordinates
                const rect = this.canvas.getBoundingClientRect()
                const x = centerX - rect.left
                const y = centerY - rect.top

                // Create main ripple with shape morphing
                const ripple = {
                    x,
                    y,
                    iconWidth: iconWidth * 0.9, // Slightly smaller than actual icon
                    iconHeight: iconHeight * 0.9,
                    cornerRadius: 8,

                    // Animation properties
                    progress: 0,
                    maxProgress: 1,
                    speed: 0.006, // Very slow for gentle water effect

                    // Visual properties
                    color,
                    maxRadius: Math.max(this.width, this.height) * 0.8, // Large final radius

                    // Multiple concentric rings for realistic water ripples
                    rings: [
                        { offset: 0, thickness: 2.5, opacity: 0.8, speed: 1.0 },
                        { offset: 20, thickness: 2, opacity: 0.6, speed: 0.95 },
                        { offset: 40, thickness: 1.5, opacity: 0.4, speed: 0.9 },
                        { offset: 60, thickness: 1.2, opacity: 0.3, speed: 0.85 },
                        { offset: 80, thickness: 1, opacity: 0.2, speed: 0.8 },
                    ],

                    // Wave distortion properties
                    waveAmplitude: 1.5,
                    waveFrequency: 0.15,
                    wavePhase: 0,
                    waveSpeed: 0.08,
                }

                this.ripples.push(ripple)
            }

            startAnimation() {
                const animate = () => {
                    this.update()
                    this.render()
                    this.animationId = requestAnimationFrame(animate)
                }
                animate()
            }

            update() {
                this.ambientTime += 0.01

                // Update surface waves
                this.surfaceWaves.forEach((wave) => {
                    wave.phase += wave.speed
                })

                // Update ripples
                this.ripples = this.ripples.filter((ripple) => {
                    ripple.progress += ripple.speed
                    ripple.wavePhase += ripple.waveSpeed

                    // Remove completed ripples
                    return ripple.progress < ripple.maxProgress
                })
            }

            render() {
                // Clear canvas
                this.ctx.clearRect(0, 0, this.width, this.height)

                // Draw subtle water surface
                this.drawWaterSurface()

                // Draw ripples
                this.ripples.forEach((ripple) => this.drawRipple(ripple))
            }

            drawWaterSurface() {
                // Very subtle water surface with gentle ambient movement
                const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height)
                gradient.addColorStop(0, "rgba(245, 250, 255, 0.02)")
                gradient.addColorStop(0.5, "rgba(220, 235, 255, 0.03)")
                gradient.addColorStop(1, "rgba(200, 225, 255, 0.04)")

                this.ctx.fillStyle = gradient
                this.ctx.fillRect(0, 0, this.width, this.height)

                // Extremely subtle grid for depth
                this.ctx.strokeStyle = "rgba(0, 0, 0, 0.015)"
                this.ctx.lineWidth = 0.5

                // Draw grid with slight wave distortion
                for (let x = 0; x < this.width; x += 40) {
                    this.ctx.beginPath()
                    for (let y = 0; y <= this.height; y += 2) {
                        const waveOffset = this.surfaceWaves.reduce((sum, wave) => {
                            return sum + Math.sin(y * wave.frequency + wave.phase) * wave.amplitude
                        }, 0)

                        const pointX = x + waveOffset

                        if (y === 0) {
                            this.ctx.moveTo(pointX, y)
                        } else {
                            this.ctx.lineTo(pointX, y)
                        }
                    }
                    this.ctx.stroke()
                }

                for (let y = 0; y < this.height; y += 40) {
                    this.ctx.beginPath()
                    for (let x = 0; x <= this.width; x += 2) {
                        const waveOffset = this.surfaceWaves.reduce((sum, wave) => {
                            return sum + Math.sin(x * wave.frequency + wave.phase + Math.PI / 2) * wave.amplitude
                        }, 0)

                        const pointY = y + waveOffset

                        if (x === 0) {
                            this.ctx.moveTo(x, pointY)
                        } else {
                            this.ctx.lineTo(x, pointY)
                        }
                    }
                    this.ctx.stroke()
                }
            }

            drawRipple(ripple) {
                const {
                    x,
                    y,
                    progress,
                    iconWidth,
                    iconHeight,
                    cornerRadius,
                    color,
                    rings,
                    maxRadius,
                    waveAmplitude,
                    waveFrequency,
                    wavePhase,
                } = ripple

                // Smooth easing functions
                const easeProgress = this.easeOutQuart(progress)
                const fadeProgress = Math.min(1, progress * 1.5)
                const baseOpacity = Math.max(0, 1 - fadeProgress)

                if (baseOpacity <= 0) return

                // Calculate shape morphing from rounded rectangle to circle
                const morphProgress = Math.min(1, progress * 1.2)
                const currentSize = Math.max(iconWidth, iconHeight) + maxRadius * easeProgress

                // Draw each concentric ring
                rings.forEach((ring, index) => {
                    const ringProgress = Math.max(0, progress - index * 0.05) * ring.speed
                    if (ringProgress <= 0) return

                    const ringEaseProgress = this.easeOutQuart(ringProgress)
                    const ringOpacity = baseOpacity * ring.opacity * Math.max(0, 1 - ringProgress * 1.2)

                    if (ringOpacity <= 0.01) return

                    const ringSize = currentSize * ringEaseProgress - ring.offset

                    if (ringSize <= 0) return

                    // Set ring style
                    this.ctx.strokeStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${ringOpacity})`
                    this.ctx.lineWidth = ring.thickness * (1 - ringProgress * 0.3)

                    // Draw morphing shape with subtle wave distortion
                    if (morphProgress < 0.6) {
                        // Rounded rectangle phase with gentle waves
                        this.drawWavyRoundedRect(
                            x,
                            y,
                            ringSize,
                            morphProgress,
                            cornerRadius,
                            waveAmplitude,
                            waveFrequency,
                            wavePhase,
                        )
                    } else {
                        // Circle phase with wave distortion
                        this.drawWavyCircle(x, y, ringSize / 2, waveAmplitude * (1 - morphProgress), waveFrequency, wavePhase)
                    }
                })

                // Draw subtle inner glow
                const glowRadius = currentSize * easeProgress * 0.3
                if (glowRadius > 0) {
                    const glowGradient = this.ctx.createRadialGradient(x, y, 0, x, y, glowRadius)
                    glowGradient.addColorStop(0, `rgba(${color.r}, ${color.g}, ${color.b}, ${baseOpacity * 0.08})`)
                    glowGradient.addColorStop(0.7, `rgba(${color.r}, ${color.g}, ${color.b}, ${baseOpacity * 0.04})`)
                    glowGradient.addColorStop(1, "rgba(255, 255, 255, 0)")

                    this.ctx.fillStyle = glowGradient
                    this.ctx.beginPath()
                    this.ctx.arc(x, y, glowRadius, 0, Math.PI * 2)
                    this.ctx.fill()
                }
            }

            drawWavyRoundedRect(x, y, size, morphProgress, cornerRadius, waveAmplitude, waveFrequency, wavePhase) {
                const width = size * (1 - morphProgress * 0.3)
                const height = size * (1 - morphProgress * 0.3)
                const radius = cornerRadius * (1 - morphProgress)

                this.ctx.beginPath()

                // Top edge with subtle waves
                for (let i = 0; i <= 20; i++) {
                    const t = i / 20
                    const edgeX = x - width / 2 + width * t
                    const waveOffset = Math.sin(t * Math.PI * waveFrequency + wavePhase) * waveAmplitude * (1 - morphProgress)
                    const edgeY = y - height / 2 + waveOffset

                    if (i === 0) {
                        this.ctx.moveTo(edgeX, edgeY)
                    } else {
                        this.ctx.lineTo(edgeX, edgeY)
                    }
                }

                // Right edge
                for (let i = 0; i <= 20; i++) {
                    const t = i / 20
                    const waveOffset =
                        Math.sin(t * Math.PI * waveFrequency + wavePhase + Math.PI / 2) * waveAmplitude * (1 - morphProgress)
                    const edgeX = x + width / 2 + waveOffset
                    const edgeY = y - height / 2 + height * t
                    this.ctx.lineTo(edgeX, edgeY)
                }

                // Bottom edge
                for (let i = 0; i <= 20; i++) {
                    const t = i / 20
                    const edgeX = x + width / 2 - width * t
                    const waveOffset =
                        Math.sin((1 - t) * Math.PI * waveFrequency + wavePhase + Math.PI) * waveAmplitude * (1 - morphProgress)
                    const edgeY = y + height / 2 + waveOffset
                    this.ctx.lineTo(edgeX, edgeY)
                }

                // Left edge
                for (let i = 0; i <= 20; i++) {
                    const t = i / 20
                    const waveOffset =
                        Math.sin((1 - t) * Math.PI * waveFrequency + wavePhase + (3 * Math.PI) / 2) *
                        waveAmplitude *
                        (1 - morphProgress)
                    const edgeX = x - width / 2 + waveOffset
                    const edgeY = y + height / 2 - height * t
                    this.ctx.lineTo(edgeX, edgeY)
                }

                this.ctx.closePath()
                this.ctx.stroke()
            }

            drawWavyCircle(x, y, radius, waveAmplitude, waveFrequency, wavePhase) {
                this.ctx.beginPath()

                const segments = 60
                for (let i = 0; i <= segments; i++) {
                    const angle = (i / segments) * Math.PI * 2
                    const waveOffset = Math.sin(angle * waveFrequency + wavePhase) * waveAmplitude
                    const currentRadius = radius + waveOffset

                    const pointX = x + currentRadius * Math.cos(angle)
                    const pointY = y + currentRadius * Math.sin(angle)

                    if (i === 0) {
                        this.ctx.moveTo(pointX, pointY)
                    } else {
                        this.ctx.lineTo(pointX, pointY)
                    }
                }

                this.ctx.closePath()
                this.ctx.stroke()
            }

            // Smooth easing function
            easeOutQuart(x) {
                return 1 - Math.pow(1 - x, 4)
            }

            destroy() {
                if (this.animationId) {
                    cancelAnimationFrame(this.animationId)
                }
            }
        }

        // Create water effect instance
        const waterEffect = new WaterRippleEffect(canvas, ctx, containerRef.current)
        waterEffectRef.current = waterEffect
        setCanvasReady(true)

        // Cleanup
        return () => {
            waterEffect.destroy()
        }
    }, [])

    // Function to create ripple effect
    const createRippleEffect = useCallback(
        (centerX, centerY, iconWidth, iconHeight, color) => {
            if (waterEffectRef.current && canvasReady) {
                waterEffectRef.current.createRipple(centerX, centerY, iconWidth, iconHeight, color)
            }
        },
        [canvasReady],
    )

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