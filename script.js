const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });
}

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            showMessage("Fill in all fields first.", "error");
            return;
        }

        if (!isValidEmail(email)) {
            showMessage("Use a valid email address.", "error");
            return;
        }

        const subject = encodeURIComponent("Portfolio Contact from " + name);
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);

        window.location.href = `mailto:hzqimad03@gmail.com?subject=${subject}&body=${body}`;

        showMessage("Opening your email app...", "success");
        contactForm.reset();
    });
}

function showMessage(text, type) {
    if (!formMessage) return;
    formMessage.textContent = text;
    formMessage.className = `form-message ${type}`;
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const revealItems = document.querySelectorAll(".card, .project-card, .profile-card, .about-main, .terminal-card");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.animate(
                    [
                        { opacity: 0, transform: "translateY(24px)" },
                        { opacity: 1, transform: "translateY(0)" }
                    ],
                    {
                        duration: 650,
                        easing: "cubic-bezier(.2,.8,.2,1)",
                        fill: "forwards"
                    }
                );

                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12 }
);

revealItems.forEach((item) => {
    item.style.opacity = "0";
    observer.observe(item);
});