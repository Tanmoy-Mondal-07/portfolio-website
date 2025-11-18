import { useState } from "react"
import emailjs from "emailjs-com"
import { Send, Loader2 } from "lucide-react"
import { motion } from "framer-motion"

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
        import.meta.env.VITE_EMAIL_SERVICE_ID,
        import.meta.env.VITE_EMAIL_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
        import.meta.env.VITE_EMAIL_PUBLIC_KEY,
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
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {formStatus === "success" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg bg-green-50 text-green-700 border border-green-100"
        >
          Thank you! Your message has been sent successfully. I'll get back to you soon.
        </motion.div>
      )}

      {formStatus === "error" && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg bg-red-50 text-red-700 border border-red-100"
        >
          There was an error sending your message. Please try again or contact me directly via email.
        </motion.div>
      )}

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-zinc-700">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your name"
            required
            className="w-full rounded-lg border border-zinc-200 px-4 py-3 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 outline-none transition-all"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium text-zinc-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your email"
            required
            className="w-full rounded-lg border border-zinc-200 px-4 py-3 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 outline-none transition-all"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="subject" className="text-sm font-medium text-zinc-700">
          Subject
        </label>
        <input
          id="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange}
          placeholder="What is this regarding?"
          required
          className="w-full rounded-lg border border-zinc-200 px-4 py-3 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 outline-none transition-all"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="text-sm font-medium text-zinc-700">
          Message
        </label>
        <textarea
          id="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your message..."
          className="w-full rounded-lg border border-zinc-200 px-4 py-3 focus:border-zinc-500 focus:ring-2 focus:ring-zinc-200 outline-none transition-all min-h-[150px]"
          required
        />
      </div>

      <motion.button
        type="submit"
        className="w-full rounded-lg bg-zinc-800 px-6 py-3 text-white shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center"
        disabled={isSubmitting}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {isSubmitting ? (
          <span className="flex items-center">
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Sending...
          </span>
        ) : (
          <span className="flex items-center">
            Send Message
            <Send className="ml-2 h-5 w-5" />
          </span>
        )}
      </motion.button>
    </motion.form>
  )
}