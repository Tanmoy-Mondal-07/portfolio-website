import { ArrowRight, GithubIcon, Image, Linkedin, Mail, Menu, Twitter, User2 } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import ProjectCard from "../component/ProjectCard";
import ContactForm from "../component/ContactForm";
import myLogo from "../assets/logo00.svg";
// import background from "../assets/pngegg.png";
import DanteThumbnail from "../assets/projects/Dantethumbnail.png";
import PaperCut from "../assets/projects/papercut.png";
import Certificate from "../component/Certificate";

export default function Hero() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col text-gray-800">

      {/* Header */}
      <header className="fixed top-0 z-50 w-full bg-white bg-opacity-60 backdrop-blur-md shadow-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <a href="/" className="flex items-center gap-3">
            {/* <img src={myLogo} alt="Tanmoy Logo" className="h-10 w-10" /> */}
            <span className="text-xl font-semibold tracking-wide">TANMOY MONDAL</span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {['projects', 'about', 'certificate', 'contact'].map((section) => (
              <a
                key={section}
                href={`/#${section}`}
                className="relative px-2 py-1 text-sm font-medium hover:text-indigo-600 transition-colors"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-indigo-600 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 hover:bg-gray-200 rounded-md transition"
            aria-label="Toggle menu"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          >
            <Menu className="h-6 w-6 text-gray-800" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileNavOpen && (
          <nav className="md:hidden bg-white shadow-inner">
            <div className="flex flex-col gap-4 p-4">
              {['projects', 'about', 'certificate', 'contact'].map((section) => (
                <a
                  key={section}
                  href={`/#${section}`}
                  className="text-lg font-medium hover:text-indigo-600 transition"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </a>
              ))}
            </div>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">

        <div className="w-full bg-yellow-100 text-yellow-800 text-center py-2 text-sm font-medium z-50 fixed top-15 left-0">
            🚧 This website is currently in early development. Some sections may be incomplete or subject to change. 🚧
          </div>

        {/* Hero Section */}
        {/* <section className="relative flex h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"> */}
        <section className="relative flex h-[100lvh] items-center justify-center overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="z-10 text-center px-6"
          >
            {/* <img
              src={myLogo}
              alt="Tanmoy"
              className="mx-auto mt-10 mb-4 h-48 w-48 rounded-full border-4 border-white shadow-lg"
            /> */}
            <Image stroke="gray" className="mx-auto mt-10 mb-4 h-48 w-48 rounded-full border-4 border-white shadow-lg" />
            <div className="flex flex-col items-center justify-center text-center px-4">
              <h1 className="mb-4 text-5xl font-extrabold text-zinc-800 md:text-6xl">
                Frontend Developer
              </h1>
              <p className="mb-8 max-w-lg text-lg text-gray-500">
                Building lean, minimalist solutions that prioritize simplicity and functionality. True elegance arises from clarity of design.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://github.com/Tanmoy-Mondal-07"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 font-medium text-black shadow-md hover:bg-gray-100 transition"
              >
                <GithubIcon className="h-5 w-5" />
                View Github
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full border-2 border-gray-400 px-6 py-3 font-medium text-gray-500 hover:bg-gray-200 hover:text-gray-800 transition"
              >
                <Mail className="h-5 w-5" />
                Contact Me
              </a>
            </div>
          </motion.div>

          <div className="absolute bottom-0 left-0 -mb-32 -ml-32 h-96 w-96 rounded-full bg-indigo-300 opacity-50 blur-3xl" />
          <div className="absolute top-0 right-0 -mt-32 -mr-32 h-80 w-80 rounded-full bg-pink-300 opacity-40 blur-2xl" />
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <h2 className="mb-12 text-center text-4xl font-bold text-gray-800">
              Projects
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <ProjectCard
                title="Dante"
                description="Dante is a minimalist social media app built with React.js and Appwrite, designed for a fast and smooth user experience."
                imageSrc={DanteThumbnail}
                href="https://dantetestserver.pages.dev/"
              />

              <ProjectCard
                title="Papercut Show"
                description="Built a scroll-driven paper cut animation using React and Framer Motion.
                            spring-based transitions and parallax effects.
                            dynamic background color changes to reflect time-of-day progression."
                imageSrc={PaperCut}
                href=""
              />

            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 bg-gray-50">
          <div className="container mx-auto px-6 grid gap-12 md:grid-cols-2 items-center">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="aspect-square overflow-hidden rounded-2xl shadow-lg">
                {/* <img loading="lazy" src={aboutImage} alt="About" className="h-full w-full object-cover" /> */}
                {/* <HeroSection /> */}
                <Image className="h-full w-full object-cover" />
              </div>
            </motion.div>
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-6 text-3xl font-bold text-gray-800">
                About Me
              </h2>
              <p className="mb-4 text-gray-600">
                I'm a passionate Frontend Developer specialising in clean, responsive web applications using React.
              </p>
              <p className="mb-6 text-gray-600">
                I thrive in environments where collaboration, problem-solving, and attention to detail are key.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-gray-600 px-6 py-3 font-medium text-gray-600 hover:bg-gray-100 transition"
                >
                  Download Resume
                </a>
                <a
                  href="/#contact"
                  className="flex items-center gap-2 rounded-full bg-gray-600 px-6 py-3 font-medium text-white hover:bg-gray-700 transition"
                >
                  <Mail className="h-5 w-5" />
                  Get in Touch
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Certificate & Contact */}
        <section id="certificate">
          {/* <div className="container mx-auto px-6"> */}
          <Certificate />
          {/* </div> */}
        </section>

        <section id="contact" className="py-20 bg-gray-50">
          <div className="container mx-auto px-6 max-w-2xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-gray-800">
              Contact
            </h2>
            <p className="mb-6 text-sm text-green-700 bg-green-100 px-4 py-2 rounded shadow text-center">
              📬 The contact section is fully functional — feel free to reach out to me anytime!
            </p>
            <ContactForm />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white bg-opacity-60 backdrop-blur-md py-6">
        <div className="container mx-auto flex flex-col items-center gap-4 px-6 md:flex-row md:justify-between">
          <div className="flex items-center gap-3">
            <img src={myLogo} alt="Tanmoy Logo" className="h-10 w-10" />
            <span className="text-lg font-semibold tracking-wide">TANMOY MONDAL</span>
          </div>
          <p className="text-sm text-gray-600">© {new Date().getFullYear()} Tanmoy Mondal. All rights reserved.</p>
          <div className="flex gap-6 text-gray-600">
            <GithubIcon className="h-6 w-6 hover:text-indigo-600 transition" />
            <Linkedin className="h-6 w-6 hover:text-indigo-600 transition" />
            <Twitter className="h-6 w-6 hover:text-indigo-600 transition" />
          </div>
        </div>
      </footer>
    </div>
  );
}