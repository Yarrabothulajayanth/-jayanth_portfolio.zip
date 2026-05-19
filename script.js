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
        console.log('Profile photo clicked - ready for upload');
    });
}

// Certificate Upload Functionality
function setupCertificateUpload(cardElement) {
    const uploadArea = cardElement.querySelector('.cert-upload-area');
    const fileInput = cardElement.querySelector('input[type="file"]');
    const imagePreview = cardElement.querySelector('.cert-image-preview');
    const uploadBtn = cardElement.querySelector('.upload-btn');
    const removeBtnContainer = cardElement.querySelector('.remove-btn-container');

    if (!uploadArea || !fileInput) return;

    // Click to upload
    uploadArea.addEventListener('click', () => {
        fileInput.click();
    });

    // File selection
    fileInput.addEventListener('change', (e) => {
        handleFileSelect(e, cardElement);
    });

    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            fileInput.files = files;
            handleFileSelect({ target: { files } }, cardElement);
        }
    });

    // Remove button
    if (removeBtnContainer) {
        removeBtnContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-cert-btn')) {
                removeImage(cardElement);
            }
        });
    }
}

function handleFileSelect(e, cardElement) {
    const files = e.target.files;
    if (files.length > 0) {
        const file = files[0];
        if (file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                displayImage(event.target.result, cardElement);
                // Save to localStorage
                saveCertificateImage(cardElement, event.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select an image file');
        }
    }
}

function displayImage(src, cardElement) {
    const uploadArea = cardElement.querySelector('.cert-upload-area');
    const imagePreview = cardElement.querySelector('.cert-image-preview');
    const removeBtnContainer = cardElement.querySelector('.remove-btn-container');

    if (imagePreview) {
        imagePreview.src = src;
        imagePreview.style.display = 'block';
    }

    if (uploadArea) {
        uploadArea.style.display = 'none';
    }

    if (removeBtnContainer) {
        removeBtnContainer.innerHTML = '<button class="remove-cert-btn"><i class="fas fa-trash"></i> Remove Certificate</button>';
    }

    // Add image preview modal functionality
    if (imagePreview) {
        imagePreview.addEventListener('click', () => {
            showImageModal(src);
        });
    }
}

function removeImage(cardElement) {
    const uploadArea = cardElement.querySelector('.cert-upload-area');
    const imagePreview = cardElement.querySelector('.cert-image-preview');
    const removeBtnContainer = cardElement.querySelector('.remove-btn-container');
    const fileInput = cardElement.querySelector('input[type="file"]');

    if (imagePreview) {
        imagePreview.style.display = 'none';
        imagePreview.src = '';
    }

    if (uploadArea) {
        uploadArea.style.display = 'block';
    }

    if (removeBtnContainer) {
        removeBtnContainer.innerHTML = '';
    }

    if (fileInput) {
        fileInput.value = '';
    }

    // Remove from localStorage
    const certId = cardElement.id || '';
    if (certId) {
        localStorage.removeItem(`cert_${certId}`);
    }
}

function saveCertificateImage(cardElement, imageData) {
    const certId = cardElement.id || 'default';
    try {
        localStorage.setItem(`cert_${certId}`, imageData);
    } catch (e) {
        if (e.name === 'QuotaExceededError') {
            console.warn('LocalStorage quota exceeded. Images may not persist.');
        }
    }
}

function loadCertificateImages() {
    document.querySelectorAll('.cert-card').forEach(card => {
        const certId = card.id || '';
        if (certId) {
            const imageData = localStorage.getItem(`cert_${certId}`);
            if (imageData) {
                displayImage(imageData, card);
            }
        }
    });
}

function showImageModal(src) {
    const modal = document.getElementById('imageModal');
    if (modal) {
        const modalImage = modal.querySelector('.modal-image');
        if (modalImage) {
            modalImage.src = src;
        }
        modal.classList.add('show');
    }
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

// Initialize all certificate uploads
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.cert-card').forEach(card => {
        setupCertificateUpload(card);
    });
    loadCertificateImages();
});

// Modal close handlers
const modal = document.getElementById('imageModal');
if (modal) {
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeImageModal);
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeImageModal();
        }
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (sidebarNav && sidebarNav.classList.contains('active')) {
            sidebarNav.classList.remove('active');
        }
        closeImageModal();
    }
});

console.log('Portfolio script with certificate upload loaded successfully');
