import { useState } from "react"
import emailjs from '@emailjs/browser';
import {
    VITE_EMAIL_SERVICE_ID,
    VITE_EMAIL_TEMPLATE_ID,
    VITE_EMAIL_PUBLIC_KEY,
} from "astro:env/client";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    })
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formStatus, setFormStatus] = useState(null) // null, 'success', 'error'

    const handleChange = (e) => {
        const { id, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        setFormStatus(null)

        try {
            await emailjs.send(
                VITE_EMAIL_SERVICE_ID,
                VITE_EMAIL_TEMPLATE_ID,
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    subject: formData.subject,
                    message: formData.message,
                },
                VITE_EMAIL_PUBLIC_KEY,
            )

            setFormStatus("success")
            setFormData({ name: "", email: "", subject: "", message: "" })
        } catch (error) {
            console.error("Failed to send message:", error)
            setFormStatus("error")
        }

        setIsSubmitting(false)
    }

    return (
        <div id="contactForm" className="min-h-screen bg-white py-16 px-4 sm:px-6 lg:px-8 flex items-start sm:items-center justify-center">
            <div className="w-full max-w-xl">
                <div className="text-center mb-10">
                    <h2 className="text-4xl font-bold text-gray-900">
                        <span className="bg-gradient-to-r from-zinc-700 to-zinc-900 bg-clip-text text-transparent">
                            Get In Touch
                        </span>
                    </h2>
                    <div className="w-24 h-1 bg-zinc-800 mx-auto mt-4 rounded-full"></div>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 w-full bg-white/70 backdrop-blur-sm p-6 sm:p-8 rounded-xl shadow-md border border-zinc-200"
                >
                    {/* Success */}
                    {formStatus === "success" && (
                        <div className="p-4 rounded-xl bg-green-100 text-green-800 border border-green-200 text-sm">
                            ✅ Your message has been sent! I’ll get back to you soon.
                        </div>
                    )}

                    {/* Error */}
                    {formStatus === "error" && (
                        <div className="p-4 rounded-xl bg-red-100 text-red-800 border border-red-200 text-sm">
                            ❌ Something went wrong. Please try again.
                        </div>
                    )}

                    {/* Name + Email */}
                    <div className="grid gap-6 sm:grid-cols-2">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-semibold text-zinc-700">Name</label>
                            <input
                                id="name"
                                type="text"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your name"
                                required
                                className="w-full rounded-xl border border-zinc-300 px-4 py-3 bg-white focus:border-zinc-600 focus:ring-4 focus:ring-zinc-200/60 outline-none transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-semibold text-zinc-700">Email</label>
                            <input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="email@example.com"
                                required
                                className="w-full rounded-xl border border-zinc-300 px-4 py-3 bg-white focus:border-zinc-600 focus:ring-4 focus:ring-zinc-200/60 outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Subject */}
                    <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-semibold text-zinc-700">Subject</label>
                        <input
                            id="subject"
                            type="text"
                            value={formData.subject}
                            onChange={handleChange}
                            placeholder="What is this about?"
                            required
                            className="w-full rounded-xl border border-zinc-300 px-4 py-3 bg-white focus:border-zinc-600 focus:ring-4 focus:ring-zinc-200/60 outline-none transition-all"
                        />
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-semibold text-zinc-700">Message</label>
                        <textarea
                            id="message"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Write your message..."
                            className="w-full rounded-xl border border-zinc-300 px-4 py-3 bg-white focus:border-zinc-600 focus:ring-4 focus:ring-zinc-200/60 outline-none transition-all min-h-[150px]"
                            required
                        />
                    </div>

                    {/* Button */}
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full rounded-xl bg-zinc-900 px-6 py-3 text-white font-medium shadow-md hover:bg-zinc-800 hover:shadow-lg active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <span className="flex items-center gap-2">
                                <i className="fa-solid fa-spinner fa-spin text-lg"></i> Sending...
                            </span>
                        ) : (
                            <span className="flex items-center gap-2">
                                Send Message <i className="fa-solid fa-paper-plane text-lg"></i>
                            </span>
                        )}
                    </button>
                </form>
            </div>
        </div>

    )
}