import { useRef, useCallback, useState } from "react"
import { motion } from "framer-motion"
import SkillIcon from "./SkillIcon"

const skillData = [
  { name: "HTML", link: "https://cdn.simpleicons.org/html5/334155" },
  { name: "CSS", link: "https://cdn.simpleicons.org/css3/334155" },
  { name: "JavaScript", link: "https://cdn.simpleicons.org/javascript/334155" },
  { name: "TypeScript", link: "https://cdn.simpleicons.org/typescript/334155" },
  { name: "Tailwind", link: "https://cdn.simpleicons.org/tailwindcss/334155" },
  { name: "Bootstrap", link: "https://cdn.simpleicons.org/bootstrap/334155" },
  { name: "React", link: "https://cdn.simpleicons.org/react/334155" },
  { name: "Redux", link: "https://cdn.simpleicons.org/redux/334155" },
  { name: "Framer Motion", link: "https://cdn.simpleicons.org/framer/334155" },
  { name: "Node.js", link: "https://cdn.simpleicons.org/nodedotjs/334155" },
  { name: "Axios", link: "https://cdn.simpleicons.org/axios/334155" },
  { name: "Appwrite", link: "https://cdn.simpleicons.org/appwrite/334155" },
  { name: "Postman", link: "https://cdn.simpleicons.org/postman/334155" },
  { name: "Python", link: "https://cdn.simpleicons.org/python/334155" },
  { name: "Git", link: "https://cdn.simpleicons.org/git/334155" },
  { name: "NPM", link: "https://cdn.simpleicons.org/npm/334155" },
  { name: "Cloudflare", link: "https://cdn.simpleicons.org/cloudflare/334155" },
  { name: "Arch Linux", link: "https://cdn.simpleicons.org/archlinux/334155" },
]

const getSkillIcon = (link, name) => (
  <img loading="lazy" src={link} alt={name} className="w-8 h-8" />
)

// Simplified ripple effect using CSS instead of canvas
export default function Skills() {
  const containerRef = useRef(null)
  const [activeRipple, setActiveRipple] = useState(null)

  // Simplified ripple effect
  const createRippleEffect = useCallback((x, y, color) => {
    setActiveRipple({ x, y, color, id: Date.now() })

    // Auto-remove ripple after animation completes
    setTimeout(() => {
      setActiveRipple(null)
    }, 1000)
  }, [])

  return (
    <section ref={containerRef} className="relative w-full min-h-screen overflow-hidden bg-slate-50 py-20">
      {/* Simplified ripple effect */}
      {activeRipple && (
        <div
          className="absolute pointer-events-none animate-ripple"
          style={{
            left: activeRipple.x,
            top: activeRipple.y,
            transform: "translate(-50%, -50%)",
            background: `radial-gradient(circle, rgba(51, 65, 85, 0.1) 0%, rgba(51, 65, 85, 0) 70%)`,
            width: "300px",
            height: "300px",
            borderRadius: "50%",
          }}
        />
      )}

      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-slate-800">
            <span className="bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">
              Tech Arsenal
            </span>
          </h2>
          <div className="w-24 h-1 bg-slate-700 mx-auto rounded-full"></div>
          {/* <p className="mt-6 text-slate-600 max-w-2xl mx-auto">
            The technologies I work with to bring ideas to life. Hover over each skill to see the ripple effect.
          </p> */}
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {skillData.map((skill, index) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <SkillIcon
                name={skill.name}
                icon={getSkillIcon(skill.link, skill.name)}
                index={index}
                onHover={(x, y) => createRippleEffect(x, y, { r: 51, g: 65, b: 85 })}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}