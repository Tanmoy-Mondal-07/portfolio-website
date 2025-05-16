import { ArrowRight, GithubIcon, Linkedin, Mail, Menu, Twitter } from "lucide-react";
import { useState } from "react";
import ProjectCard from "../component/ProjectCard";
import ContactForm from "../component/ContactForm";
import myLogo from "../assets/logo00.svg"
import background from "../assets/pngegg.png"
import DanteThumbnail from "../assets/Dantethumbnail.png"
import Certificate from "../component/Certificate";

export default function Hero() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <a href="/" className="flex items-center gap-2">
            {/* <img src={myLogo} alt="tanmoy logo" className="h-10 w-10 object-contain" /> */}
            <span className="text-xl font-medium tracking-wider">TANMOY MONDAL</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="/#projects" className="text-sm font-medium hover:text-gray-600 transition-colors">
              Projects
            </a>
            <a href="/#about" className="text-sm font-medium hover:text-gray-600 transition-colors">
              About
            </a>
            <a href="/#contact" className="text-sm font-medium hover:text-gray-600 transition-colors">
              Contact
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            aria-label="Toggle menu"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileNavOpen && (
          <nav className="md:hidden bg-white border-t">
            <div className="flex flex-col gap-4 p-4">
              <a href="/#projects" className="text-lg font-medium hover:text-gray-600 transition-colors">
                Projects
              </a>
              <a href="/#about" className="text-lg font-medium hover:text-gray-600 transition-colors">
                About
              </a>
              <a href="/#contact" className="text-lg font-medium hover:text-gray-600 transition-colors">
                Contact
              </a>
            </div>
          </nav>
        )}
      </header>

      <main className="flex-1">
        <section className="relative h-[90dvh] sm:h-[100dvh] overflow-hidden py-24 md:py-16">
          <div className="container mx-auto flex flex-col items-center text-center px-4">
            <div className="absolute -z-10 -top-40 -left-8 md:-top-28 inset-0 opacity-90">
              {/* <img
                src={background}
                alt="Background"
                className="h-full w-full object-cover"
              /> */}
            </div>
            <img
              src={myLogo}
              alt="tanmoy img"
              width={200}
              height={200}
              className="mb-2 h-40 w-40 md:h-52 md:w-52 object-contain"
            />
            <h1 className="mb-6 text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              Frontend Developer
              {/* Elegant Design <br /> Timeless Aesthetics */}
            </h1>
            <p className="mb-8 max-w-[600px] -z-20 text-gray-600 md:text-xl">
              {/* Crafting minimalist experiences that embody the essence of traditional Japanese artistry with modern
              design principles. */}
              Building lean, minimalist solutions that prioritize simplicity and functionality.Where true elegance
              arises from clarity of design
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="https://github.com/Tanmoy-Mondal-07" className="relative  bg-black z-20 hover:cursor-pointer rounded-full px-6 py-3 text-white hover:bg-gray-800 transition-colors flex items-center">
                View  Github
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>

              <button className="z-20 hover:cursor-pointer rounded-full border border-black px-6 py-3 hover:bg-gray-200 transition-colors">
                <a href="/#contact">Contact Me</a>
              </button>
            </div>
          </div>
        </section>

        <section id="projects" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-4xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Projects
            </h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <ProjectCard
                title="Dante"
                description="Dantay is a minimalist social media app built with React.js and Appwrite, 
                designed for a fast and smooth user experience. It uses cookies, service workers, 
                IndexedDB, and local storage to cache stable data, reducing server load and improving 
                performance. The app also features subtle design details that enhance usability beyond 
                what’s immediately visible."
                imageSrc={DanteThumbnail}
                href="https://dantetestserver.pages.dev/"
              />
              {/* ...other ProjectCards... */}
            </div>
          </div>
        </section>

        <section id="about" className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 md:grid-cols-2 items-center">
              <div className="relative aspect-square overflow-hidden rounded-xl">
                <img src="/about.png" alt="Designer portrait" className="object-cover h-full w-full" />
              </div>
              <div>
                <h2 className="mb-6 text-3xl font-bold tracking-tighter sm:text-4xl">About Me</h2>
                <p className="mb-4 text-gray-600">
                  I'm a passionate Frontend Developer with a strong focus on building clean, user-friendly, and 
                  responsive web applications. I specialize in modern JavaScript frameworks like React, 
                  and have hands-on experience turning UI/UX designs into high-performance, accessible interfaces. 
                  I thrive in fast-paced environments where collaboration, problem-solving, and attention to detail are key.
                </p>
                <p className="mb-4 text-gray-600">
                  Whether it's optimizing performance, crafting seamless animations, or ensuring cross-browser 
                  compatibility, I take pride in delivering polished frontends that provide real value to users. 
                  Always learning and evolving, I'm excited by new technologies and love translating ideas into 
                  interactive digital experiences.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="rounded-full border border-black px-6 py-3 hover:bg-gray-100 transition-colors">
                    <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">
                      Download Resume
                    </a>
                  </button>
                  <button className="rounded-full px-6 py-3 hover:bg-gray-100 transition-colors flex items-center">
                    <Mail className="mr-2 h-4 w-4" />
                    <a href="/#contact">Get in Touch</a>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Certificate />

        <section id="contact" className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="mb-12 text-center text-3xl font-bold tracking-tighter sm:text-4xl">Contact</h2>
            <div className="mx-auto max-w-2xl">
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-6">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 md:flex-row">
          <div className="flex items-center gap-2">
            <img src={myLogo} alt="tanmoy logo" className="h-12 w-12 object-contain" />
            <span className="text-lg font-medium tracking-wider">TANMOY MONDAL</span>
          </div>
          <p className="text-sm text-gray-500">© {new Date().getFullYear()} Tanmoy Mondal. All rights reserved.</p>
          <div className="flex gap-4">
            <GithubIcon />
            <Linkedin />
            <Twitter />
          </div>
        </div>
      </footer>
    </div>
  );
}