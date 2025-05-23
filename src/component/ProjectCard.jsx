import { ArrowUpRight } from "lucide-react"
import { motion } from "framer-motion"

export default function ProjectCard({ title, description, imageSrc, href, tags = [] }) {
  return (
    <motion.div
      className="group overflow-hidden rounded-xl border border-slate-100 bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Tags */}
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {tags.map((tag, index) => (
            <span key={index} className="px-3 py-1 bg-white/90 text-slate-800 text-xs font-medium rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="p-6">
        <h3 className="mb-2 text-xl font-semibold text-slate-800 group-hover:text-slate-900 transition-colors duration-300">
          {title}
        </h3>
        <p className="mb-4 text-sm text-slate-600">{description}</p>
        <a
          href={href}
          className="inline-flex items-center text-sm font-medium text-slate-700 hover:text-slate-900 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Project
          <ArrowUpRight className="ml-1 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </a>
      </div>
    </motion.div>
  )
}