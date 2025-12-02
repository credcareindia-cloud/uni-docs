// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const sidebar = document.getElementById('sidebar');

mobileMenuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 640) {
        if (!sidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            sidebar.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    }
});

// Smooth scrolling for navigation links
const navLinks = document.querySelectorAll('.nav-link');

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));

        // Add active class to clicked link
        link.classList.add('active');

        // Get target section
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            // Scroll to section
            const headerOffset = 90; // Header height + some padding
            const elementPosition = targetSection.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu after clicking
            if (window.innerWidth <= 640) {
                sidebar.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        }
    });
});

// Update active navigation link on scroll
const sections = document.querySelectorAll('.doc-section');

function updateActiveNavOnScroll() {
    const scrollPosition = window.pageYOffset + 150;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Throttle scroll event for better performance
let scrollTimeout;
window.addEventListener('scroll', () => {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }

    scrollTimeout = window.requestAnimationFrame(() => {
        updateActiveNavOnScroll();
    });
});

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Close sidebar on desktop view
        if (window.innerWidth > 640) {
            sidebar.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    }, 250);
});

// Interactive filter buttons
const filterButtons = document.querySelectorAll('.filter-button');

filterButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Toggle button state
        this.classList.toggle('active');

        // Visual feedback
        if (this.classList.contains('active')) {
            this.textContent = 'Filter Applied';
            this.style.backgroundColor = '#10b981';
        } else {
            this.textContent = 'Apply Filter';
            this.style.backgroundColor = '';
        }
    });
});

// Add animation when sections come into view
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Apply initial styles and observe sections
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    sectionObserver.observe(section);
});

// Animate feature cards on hover
const featureCards = document.querySelectorAll('.feature-card, .filter-card');

featureCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transition = 'all 0.3s ease';
    });
});

// Add copy functionality for code snippets (if any are added later)
function addCopyButtons() {
    const codeBlocks = document.querySelectorAll('pre code');

    codeBlocks.forEach(block => {
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.textContent = 'Copy';

        button.addEventListener('click', () => {
            navigator.clipboard.writeText(block.textContent);
            button.textContent = 'Copied!';
            setTimeout(() => {
                button.textContent = 'Copy';
            }, 2000);
        });

        block.parentNode.style.position = 'relative';
        block.parentNode.appendChild(button);
    });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    // Set first section as active on load
    updateActiveNavOnScroll();

    // Add copy buttons if code blocks exist
    addCopyButtons();

    // Log when documentation is ready
    console.log('Documentation loaded successfully');
});

// Handle video placeholder clicks (for future video integration)
const videoPlaceholders = document.querySelectorAll('.video-placeholder');

videoPlaceholders.forEach(placeholder => {
    placeholder.addEventListener('click', function() {
        console.log('Video placeholder clicked - Ready for video integration');
        // Future: Open video modal or load video player
        this.style.borderColor = '#4a4a4a';
        setTimeout(() => {
            this.style.borderColor = '';
        }, 300);
    });
});

// Handle image placeholder clicks (for future image integration)
const imagePlaceholders = document.querySelectorAll('.image-placeholder');

imagePlaceholders.forEach(placeholder => {
    placeholder.addEventListener('click', function() {
        console.log('Image placeholder clicked - Ready for image integration');
        // Future: Open image modal or lightbox
        this.style.borderColor = '#4a4a4a';
        setTimeout(() => {
            this.style.borderColor = '';
        }, 300);
    });
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    // Press 'Escape' to close mobile menu
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }

    // Press 'F' to focus on filter section (can be customized)
    if (e.key === 'f' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        const filterSection = document.getElementById('filter-panels');
        if (filterSection) {
            filterSection.scrollIntoView({ behavior: 'smooth' });
        }
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    // Trigger initial animations
    setTimeout(() => {
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }, 100);
});

// Print functionality
function printDocumentation() {
    window.print();
}

// Add keyboard shortcut for print
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        printDocumentation();
    }
});

// Track user's reading progress
let readingProgress = 0;

function updateReadingProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight - windowHeight;
    const scrolled = window.pageYOffset;
    readingProgress = (scrolled / documentHeight) * 100;

    // You can add a progress bar if needed
    // progressBar.style.width = readingProgress + '%';
}

window.addEventListener('scroll', updateReadingProgress);

// Accessibility: Skip to main content
function skipToContent() {
    const mainContent = document.querySelector('.content');
    if (mainContent) {
        mainContent.focus();
        mainContent.scrollIntoView({ behavior: 'smooth' });
    }
}

// Handle hash in URL on page load
if (window.location.hash) {
    setTimeout(() => {
        const targetElement = document.querySelector(window.location.hash);
        if (targetElement) {
            const headerOffset = 90;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Update active nav
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === window.location.hash) {
                    link.classList.add('active');
                }
            });
        }
    }, 100);
}
