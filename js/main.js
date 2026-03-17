// main.js - Custom JavaScript for Dental Clinic

// Global function for WhatsApp Booking
window.openWhatsAppBooking = function() {
    // Replace with the actual WhatsApp URL and pre-filled message
    window.open('https://wa.me/256700000000?text=Hello%20LifePath%2C%20I%20would%20like%20to%20book%20an%20appointment.', '_blank');
};

document.addEventListener('DOMContentLoaded', () => {
    console.log("Dental Clinic site initialized.");
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Reveal on Scroll Animation
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add classes to fade in and move up
                entry.target.classList.add('opacity-100', 'translate-y-0');
                // Remove initial state classes
                entry.target.classList.remove('opacity-0', 'translate-y-10');
                // Unobserve after animating once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select all elements with the 'reveal-on-scroll' class
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(el => observer.observe(el));

    // Mobile Menu Toggle Logic
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const mobileMenuPanel = document.getElementById('mobile-menu-panel');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    // Function to open menu
    const openMobileMenu = () => {
        mobileMenuPanel.classList.remove('translate-x-full');
        document.body.style.overflow = 'hidden'; // Prevent scrolling while open
    };

    // Function to close menu
    const closeMobileMenu = () => {
        mobileMenuPanel.classList.add('translate-x-full');
        document.body.style.overflow = ''; // Restore scrolling
    };

    // Event Listeners
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', openMobileMenu);
    }
    
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', closeMobileMenu);
    }

    // Close menu when a link is clicked
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', closeMobileMenu);
    });

    // Sticky Header Logic
    const header = document.getElementById('site-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled', 'py-3');
            header.classList.remove('py-6');
        } else {
            header.classList.remove('scrolled', 'py-3');
            header.classList.add('py-6');
        }
    });

    // Floating WhatsApp Button Logic
    const whatsappFab = document.getElementById('whatsapp-fab');
    const heroSection = document.getElementById('home');
    const footerSection = document.getElementById('contact');

    if (whatsappFab && heroSection && footerSection) {
        // Status trackers for section visibility
        let isHeroVisible = false;
        let isFooterVisible = false;

        const updateFabVisibility = () => {
            if (isHeroVisible || isFooterVisible) {
                // Hide button
                whatsappFab.classList.add('opacity-0', 'pointer-events-none');
                whatsappFab.classList.remove('opacity-100', 'pointer-events-auto');
            } else {
                // Show button
                whatsappFab.classList.remove('opacity-0', 'pointer-events-none');
                whatsappFab.classList.add('opacity-100', 'pointer-events-auto');
            }
        };

        const fabObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.target.id === 'home') {
                    isHeroVisible = entry.isIntersecting;
                } else if (entry.target.id === 'contact') {
                    isFooterVisible = entry.isIntersecting;
                }
            });
            updateFabVisibility();
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0 // Trigger as soon as 1px of the element enters/leaves viewport
        });

        // Observe both sections
        fabObserver.observe(heroSection);
        fabObserver.observe(footerSection);
    }

    // --- Dark Mode Logic ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
    const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');

    if (themeToggleBtn) {
        // Change the icons inside the button based on previous settings
        if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            themeToggleLightIcon.classList.remove('opacity-0', '-rotate-90');
            themeToggleDarkIcon.classList.add('opacity-0', 'rotate-90');
            document.documentElement.classList.add('dark');
        } else {
            themeToggleDarkIcon.classList.remove('opacity-0', 'rotate-90');
            themeToggleLightIcon.classList.add('opacity-0', '-rotate-90');
            document.documentElement.classList.remove('dark');
        }

        themeToggleBtn.addEventListener('click', function() {
            // toggle icons inside button for crossfade
            themeToggleDarkIcon.classList.toggle('opacity-0');
            themeToggleDarkIcon.classList.toggle('rotate-90');
            themeToggleLightIcon.classList.toggle('opacity-0');
            themeToggleLightIcon.classList.toggle('-rotate-90');

            // if set via local storage previously
            if (localStorage.getItem('color-theme')) {
                if (localStorage.getItem('color-theme') === 'light') {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('color-theme', 'dark');
                } else {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('color-theme', 'light');
                }
            // if NOT set via local storage previously
            } else {
                if (document.documentElement.classList.contains('dark')) {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('color-theme', 'light');
                } else {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('color-theme', 'dark');
                }
            }
        });
    }

    // --- Live Time Pill Logic ---
    const liveTimePill = document.getElementById('live-time-pill');
    if (liveTimePill) {
        const updateTime = () => {
            const now = new Date();
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const dayName = days[now.getDay()];
            
            let hours = now.getHours();
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            
            hours = hours % 12;
            hours = hours ? hours : 12; // the hour '0' should be '12'
            
            const timeString = `Today ${dayName}, ${hours}:${minutes} ${ampm}`;
            liveTimePill.textContent = timeString;
        };
        
        // Initial call
        updateTime();
        
        // Update every 60 seconds
        setInterval(updateTime, 60000);
    }
});
