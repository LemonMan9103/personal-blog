// ============================================
// PERSONAL BLOG - JAVASCRIPT
// ============================================

// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
if (hamburger) {
    hamburger.addEventListener('click', function() {
        const navLinks = document.querySelector('.nav-links');
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const subject = document.getElementById('subject').value.trim();
        const message = document.getElementById('message').value.trim();
        const formMessage = document.getElementById('formMessage');
        
        // Simple validation
        if (!name || !email || !subject || !message) {
            showMessage('Please fill in all fields.', 'error', formMessage);
            return;
        }
        
        // Email validation
        if (!isValidEmail(email)) {
            showMessage('Please enter a valid email address.', 'error', formMessage);
            return;
        }
        
        // Success message (in a real app, this would send to a server)
        showMessage('Thank you for your message! I\'ll get back to you soon.', 'success', formMessage);
        
        // Reset form
        contactForm.reset();
        
        // Clear message after 5 seconds
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = '';
        }, 5000);
    });
}

// Helper function to show messages
function showMessage(text, type, element) {
    if (element) {
        element.textContent = text;
        element.className = `form-message ${type}`;
    }
}

// Helper function to validate email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Add active class to current nav link
window.addEventListener('scroll', function() {
    updateActiveNavLink();
});

function updateActiveNavLink() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage || 
            (currentPage === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Initialize active nav link on page load
document.addEventListener('DOMContentLoaded', function() {
    updateActiveNavLink();
});

// Dark mode toggle (optional feature)
const darkModeToggle = function() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (isDarkMode) {
        document.documentElement.style.filter = 'invert(1) hue-rotate(180deg)';
    }
};

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Apply animations to blog posts
const blogPosts = document.querySelectorAll('.blog-post, .post-card');
blogPosts.forEach(post => {
    post.style.opacity = '0';
    post.style.transform = 'translateY(20px)';
    post.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(post);
});

// Console message
console.log('Welcome to LemonMan9103 Personal Blog! 🚀');