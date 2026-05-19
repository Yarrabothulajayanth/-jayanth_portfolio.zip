// Menu Toggle Functionality
const menuToggle = document.getElementById('menuToggle');
const sidebarNav = document.getElementById('sidebarNav');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        sidebarNav.classList.toggle('active');
    });
}

// Close sidebar when a link is clicked
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        sidebarNav.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll effect to cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.experience-card, .project-card, .skill-category, .cert-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.3s ease';
    observer.observe(card);
});

// Profile Photo Upload Handler
const profilePhoto = document.getElementById('profilePhoto');
if (profilePhoto) {
    profilePhoto.addEventListener('click', () => {
        // You can add file upload functionality here
        console.log('Profile photo clicked - ready for upload');
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebarNav.classList.contains('active')) {
        sidebarNav.classList.remove('active');
    }
});

console.log('Portfolio script loaded successfully');
