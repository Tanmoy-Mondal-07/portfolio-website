import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useMemo } from "react"
import nptel from "../assets/certificate/nptel.png"
import Hack2skill from "../assets/certificate/Hack2skill.png"
import hackathon from "../assets/certificate/hackathon.png"

const images = [nptel, hackathon, Hack2skill]

function ScrollExpandSlider() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Optimize scroll calculations
    offset: ["start end", "end start"],
  })
  const total = images.length

  // Create transforms for each image
  const transforms = useMemo(() => {
    return images.map((_, i) => {
      const start = i / total
      const quarter = start + 0.25 / total
      const middle = (i + 0.5) / total
      const threeQuarter = start + 0.75 / total
      const end = (i + 1) / total
      const offset = i * 2

      return {
        start,
        quarter,
        middle,
        threeQuarter,
        end,
        offset,
      }
    })
  }, [images.length, total])

  const imageStyles = useMemo(() => {
    return transforms.map(({ start, quarter, middle, threeQuarter, end, offset }) => ({
      width: [start, quarter, middle, threeQuarter, end],
      widthOutput: ["1%", "80%", "80%", "80%", "1%"],
      right: [start, quarter, middle, threeQuarter, end],
      rightOutput: [`${6 - offset}%`, `10%`, `10%`, `10%`, `${99 - offset}%`],
    }))
  }, [transforms])

  return (
    <div
      ref={containerRef}
      style={{ height: `${total * 200}vh` }}
      className="flex justify-center items-start bg-zinc-50"
    >
      <div className="sticky top-0 w-full h-screen flex flex-col justify-center items-center overflow-hidden">
        {/* Reduce number of decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(3)].map((_, idx) => (
            <motion.div
              key={idx}
              className="absolute opacity-60 rounded-full shadow-lg"
              style={{
                width: `${Math.random() * 200 + 100}px`,
                height: `${Math.random() * 200 + 100}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                background: `linear-gradient(135deg, rgba(51, 65, 85, 0.1), rgba(71, 85, 105, 0.1))`,
              }}
              animate={{
                y: [0, Math.random() * 30 - 15],
                x: [0, Math.random() * 30 - 15],
                scale: [1, 1 + Math.random() * 0.1],
              }}
              transition={{
                duration: Math.random() * 5 + 5,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="relative z-10 mb-12 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-zinc-800">
            <span className="bg-gradient-to-r from-zinc-700 to-zinc-900 bg-clip-text text-transparent">
              Certificates
            </span>
          </h2>
          <div className="w-24 h-1 bg-zinc-700 mx-auto rounded-full"></div>
          {/* <p className="mt-6 text-zinc-600 max-w-2xl mx-auto">
            Scroll to explore my professional certifications and achievements
          </p> */}
        </motion.div>

        <div className="relative z-20 w-screen sm:w-[60vw] aspect-[16/9] max-w-5xl bg-white/70 backdrop-blur-lg border border-white/30 sm:rounded-2xl shadow-2xl overflow-hidden">
          <div className="absolute inset-0 ring-1 ring-white/20 pointer-events-none" />
          {images.map((src, i) => {
            return (
              <CertificateImage
                key={i}
                src={src}
                scrollYProgress={scrollYProgress}
                imageStyles={imageStyles}
                index={i}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

function CertificateImage({ src, scrollYProgress, imageStyles, index }) {
  const width = useTransform(scrollYProgress, imageStyles[index].width, imageStyles[index].widthOutput)
  const right = useTransform(scrollYProgress, imageStyles[index].right, imageStyles[index].rightOutput)

  return (
    <motion.img
      src={src}
      loading="lazy"
      alt={`Certificate ${index + 1}`}
      className="absolute object-cover shadow-xl h-full transition-all duration-500 ease-in-out"
      style={{
        width,
        right,
      }}
    />
  )
}

export default ScrollExpandSlider