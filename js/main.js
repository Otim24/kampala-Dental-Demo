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
    const themeToggleBtnFade = document.getElementById('theme-toggle'); // renamed variable to avoid conflict with dark mode logic
    const mobileThemeToggleBtnFade = document.getElementById('mobile-theme-toggle');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled', 'py-3');
            header.classList.remove('py-6');
            if (themeToggleBtnFade) {
                themeToggleBtnFade.classList.add('opacity-0', 'pointer-events-none');
                themeToggleBtnFade.classList.remove('opacity-100', 'pointer-events-auto');
            }
            if (mobileThemeToggleBtnFade) {
                mobileThemeToggleBtnFade.classList.add('opacity-0', 'pointer-events-none');
                mobileThemeToggleBtnFade.classList.remove('opacity-100', 'pointer-events-auto');
            }
        } else {
            header.classList.remove('scrolled', 'py-3');
            header.classList.add('py-6');
            if (themeToggleBtnFade) {
                themeToggleBtnFade.classList.remove('opacity-0', 'pointer-events-none');
                themeToggleBtnFade.classList.add('opacity-100', 'pointer-events-auto');
            }
            if (mobileThemeToggleBtnFade) {
                mobileThemeToggleBtnFade.classList.remove('opacity-0', 'pointer-events-none');
                mobileThemeToggleBtnFade.classList.add('opacity-100', 'pointer-events-auto');
            }
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
    const themeToggleBtns = [
        {
            btn: document.getElementById('theme-toggle'),
            darkIcon: document.getElementById('theme-toggle-dark-icon'),
            lightIcon: document.getElementById('theme-toggle-light-icon')
        },
        {
            btn: document.getElementById('mobile-theme-toggle'),
            darkIcon: document.getElementById('mobile-theme-toggle-dark-icon'),
            lightIcon: document.getElementById('mobile-theme-toggle-light-icon')
        }
    ];

    // Check system preference once on load
    const isDarkModePreferred = localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);

    if (isDarkModePreferred) {
        document.documentElement.classList.add('dark');
    }

    // Initialize all logic for both desktop and mobile theme toggles
    themeToggleBtns.forEach(({ btn, darkIcon, lightIcon }) => {
        if (!btn || !darkIcon || !lightIcon) return;

        // Set initial icon states
        if (isDarkModePreferred) {
            lightIcon.classList.remove('opacity-0', '-rotate-90');
            darkIcon.classList.add('opacity-0', 'rotate-90');
        } else {
            darkIcon.classList.remove('opacity-0', 'rotate-90');
            lightIcon.classList.add('opacity-0', '-rotate-90');
        }

        btn.addEventListener('click', function() {
            // Apply DOM class change and save state
            const isCurrentlyDark = document.documentElement.classList.contains('dark');
            if (isCurrentlyDark) {
                document.documentElement.classList.remove('dark');
                localStorage.setItem('color-theme', 'light');
            } else {
                document.documentElement.classList.add('dark');
                localStorage.setItem('color-theme', 'dark');
            }

            // Update icons for ALL toggle buttons visually
            themeToggleBtns.forEach((toggleGrp) => {
                if (!toggleGrp.btn) return;
                toggleGrp.darkIcon.classList.toggle('opacity-0');
                toggleGrp.darkIcon.classList.toggle('rotate-90');
                toggleGrp.lightIcon.classList.toggle('opacity-0');
                toggleGrp.lightIcon.classList.toggle('-rotate-90');
            });
        });
    });

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

    // --- Stat Counter Animation Logic ---
    const statCounter = document.getElementById('stat-counter');
    if (statCounter) {
        const duration = 1500; // 1.5 seconds
        const targetValue = 98;
        const framesPerSecond = 60;
        const totalFrames = Math.round((duration / 1000) * framesPerSecond);
        let currentFrame = 0;
        const increment = targetValue / totalFrames;

        const animateCounter = () => {
            currentFrame++;
            const currentValue = Math.round(increment * currentFrame);
            
            if (currentFrame <= totalFrames) {
                statCounter.textContent = currentValue;
                requestAnimationFrame(animateCounter);
            } else {
                statCounter.textContent = targetValue; // ensure it ends exactly on 98
            }
        };

        const statObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Start animation and stop observing
                    requestAnimationFrame(animateCounter);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.5 // Trigger when 50% of the element is visible
        });

        statObserver.observe(statCounter);
    }
});
