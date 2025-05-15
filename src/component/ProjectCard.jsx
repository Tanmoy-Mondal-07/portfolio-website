import { ArrowUpRight } from "lucide-react";

export default function ProjectCard({ title, description, imageSrc, href }) {
  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 transition-shadow hover:shadow-lg">
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <img
          src={imageSrc || "/placeholder.svg"}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="mb-2 text-xl font-semibold text-gray-800">{title}</h3>
        <p className="mb-4 text-sm text-gray-600">{description}</p>
        <a
          href={href}
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          View Project
          <ArrowUpRight className="ml-1 h-4 w-4" />
        </a>
      </div>
    </div>
  );
}