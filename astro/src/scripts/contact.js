import {
    VITE_EMAIL_SERVICE_ID,
    VITE_EMAIL_TEMPLATE_ID,
    VITE_EMAIL_PUBLIC_KEY,
} from "astro:env/client";

export function setupContactForm() {
    const form = document.querySelector("#contactForm");
    const successMsg = document.querySelector("#successMsg");
    const errorMsg = document.querySelector("#errorMsg");

    if (!form) {
        console.error("contactForm not found in DOM");
        return;
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const submitBtn = form.querySelector("button");
        if (submitBtn) submitBtn.disabled = true;

        successMsg?.classList.add("hidden");
        errorMsg?.classList.add("hidden");

        const formData = {
            from_name: form.name.value.trim(),
            from_email: form.email.value.trim(),
            subject: form.subject.value.trim(),
            message: form.message.value.trim(),
        };

        const payload = {
            service_id: VITE_EMAIL_SERVICE_ID,
            template_id: VITE_EMAIL_TEMPLATE_ID,
            user_id: VITE_EMAIL_PUBLIC_KEY,
            template_params: formData,
        };

        try {
            const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (res.ok) {
                successMsg?.classList.remove("hidden");
                form.reset();
            } else {
                errorMsg?.classList.remove("hidden");
            }
        } catch (err) {
            console.error("EmailJS failed:", err);
            errorMsg?.classList.remove("hidden");
        }

        if (submitBtn) submitBtn.disabled = false;
    });
}