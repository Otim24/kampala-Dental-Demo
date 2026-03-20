// main.js - Custom JavaScript for Dental Clinic

// ============================================================
// 🔧 CUSTOMISE FOR NEW CLIENT: WhatsApp Booking
// - Change the phone number (256700000000) to the client's WhatsApp number (country code + number, no + sign).
// - Update the pre-filled message text (Hello%20LifePath...) to use the client's clinic name.
// - %20 = space, %2C = comma in URL encoding.
// ============================================================
window.openWhatsAppBooking = function() {
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

// ============================================================
// Service Details Modal Logic
// ============================================================
const serviceData = {
    straightening: {
        title: "Teeth Straightening",
        subtitle: "Orthodontics",
        desc: "Custom clear aligners and modern braces for a perfectly straight smile. Our tailored approach ensures comfort and predictable results for all ages.",
        duration: "12 - 24 months",
        price: "UGX 3,500,000 - 8,000,000",
        img: "./images/ugandan_teeth_straightening.png",
        includes: [
            "Comprehensive 3D scan & consultation",
            "Custom treatment plan",
            "All aligners or braces adjustments",
            "Post-treatment retainers"
        ],
        steps: [
            "<strong>1. Consultation:</strong> We scan your teeth and discuss your goals.",
            "<strong>2. Fitting:</strong> Your custom aligners or braces are fitted.",
            "<strong>3. Progression:</strong> Regular check-ins to monitor movement.",
            "<strong>4. Perfect Smile:</strong> Final adjustments and retainer placement."
        ]
    },
    implants: {
        title: "Dental Implants",
        subtitle: "Restoration",
        desc: "Permanent, natural-looking tooth replacements that restore full function and confidence. Engineered for durability and a perfect custom fit.",
        duration: "3 - 6 months total",
        price: "UGX 1,500,000 - 3,000,000",
        img: "./images/ugandan_dental_implant.png",
        includes: [
            "Pre-surgical CBCT scan",
            "Titanium implant placement",
            "Custom abutment & crown",
            "Follow-up healing checks"
        ],
        steps: [
            "<strong>1. Evaluation:</strong> Assessing bone health and planning the implant.",
            "<strong>2. Surgery:</strong> Placing the titanium post into the jaw.",
            "<strong>3. Healing:</strong> Osseointegration period (bone fusing to implant).",
            "<strong>4. Restoration:</strong> Attaching the custom crown."
        ]
    },
    whitening: {
        title: "Teeth Whitening",
        subtitle: "Brighten Your Smile",
        desc: "Our professional teeth whitening treatments deliver dramatically brighter results compared to over-the-counter products. Using medical-grade whitening agents, we can lighten your teeth by up to 8 shades in a single in-clinic session.",
        duration: "60 - 90 minutes",
        price: "UGX 150,000 - 350,000",
        img: "./images/ugandan_teeth_whitening.png",
        includes: [
            "Pre-treatment shade assessment",
            "Medical-grade whitening gel",
            "Post-treatment sensitivity check",
            "Before & after documentation",
            "Take-home maintenance tips"
        ],
        steps: [
            "<strong>1. Shade Assessment:</strong> We photograph and record your current tooth shade.",
            "<strong>2. Preparation:</strong> Gums and lips are carefully protected.",
            "<strong>3. Application:</strong> Whitening gel is applied and optionally light-activated.",
            "<strong>4. Reveal:</strong> Gel is removed to reveal your new, brighter smile."
        ]
    },
    cleanings: {
        title: "General Dentistry",
        subtitle: "Preventive Care",
        desc: "Comprehensive examinations and deep professional cleanings that act as the cornerstone of your long-term oral health and preventive care routines.",
        duration: "45 - 60 minutes",
        price: "UGX 80,000 - 150,000",
        img: "./images/ugandan_dental_cleaning.png",
        includes: [
            "Full oral examination",
            "Ultrasonic plaque removal",
            "Professional polishing",
            "Fluoride treatment optional"
        ],
        steps: [
            "<strong>1. Exam:</strong> Checking for cavities or gum issues.",
            "<strong>2. Scaling:</strong> Removing hardened plaque and tartar.",
            "<strong>3. Polishing:</strong> Removing surface stains for a clean feel.",
            "<strong>4. Flossing & Advice:</strong> Final clean and oral hygiene tips."
        ]
    },
    emergency: {
        title: "Emergency Care",
        subtitle: "Urgent Relief",
        desc: "Immediate, compassionate treatment for severe dental pain, trauma, and urgent conditions when you need it most. We prioritize your relief.",
        duration: "Varies depending on issue",
        price: "UGX 100,000+",
        img: "./images/ugandan_emergency_care.png",
        includes: [
            "Priority immediate attention",
            "Diagnostic X-ray if needed",
            "Pain management and relief",
            "Temporary or permanent fix"
        ],
        steps: [
            "<strong>1. Triage:</strong> Immediate assessment of the pain or injury.",
            "<strong>2. Diagnostics:</strong> X-rays to pinpoint the exact issue.",
            "<strong>3. Relief:</strong> Administering anesthesia or pain relief.",
            "<strong>4. Treatment:</strong> Addressing the root cause of the emergency."
        ]
    },
    surgery: {
        title: "Oral Surgery",
        subtitle: "Expert Surgical Care",
        desc: "Expert surgical procedures performed with precision and care, including safe extractions, wisdom teeth removal, and complex dental restorations.",
        duration: "1 - 2 hours",
        price: "UGX 200,000 - 800,000",
        img: "./images/ugandan_oral_surgery.png",
        includes: [
            "Surgical consultation & X-rays",
            "Local anesthesia or sedation",
            "Safe surgical procedure",
            "Post-op care instructions"
        ],
        steps: [
            "<strong>1. Consultation:</strong> Reviewing X-rays and surgical plan.",
            "<strong>2. Anesthesia:</strong> Ensuring you are completely numb and comfortable.",
            "<strong>3. Procedure:</strong> Performing the extraction or surgery efficiently.",
            "<strong>4. Recovery:</strong> Providing gauze, care instructions, and follow-up."
        ]
    }
};

window.openServiceModal = function(serviceKey) {
    const data = serviceData[serviceKey];
    if (!data) return;

    // Populate Data
    document.getElementById('modal-img').src = data.img;
    document.getElementById('modal-subtitle').textContent = data.subtitle;
    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-desc').textContent = data.desc;
    document.getElementById('modal-duration').textContent = data.duration;
    document.getElementById('modal-price').textContent = data.price;

    // Populate Includes
    const includesContainer = document.getElementById('modal-includes');
    includesContainer.innerHTML = '';
    data.includes.forEach(item => {
        includesContainer.innerHTML += `
            <li class="flex items-start gap-3">
                <svg class="w-5 h-5 text-green-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
                <span class="text-gray-700 dark:text-neutral-300 text-[14.5px]">${item}</span>
            </li>
        `;
    });

    // Populate Steps
    const stepsContainer = document.getElementById('modal-steps');
    stepsContainer.innerHTML = '';
    data.steps.forEach(step => {
        stepsContainer.innerHTML += `
            <div class="text-gray-700 dark:text-neutral-300 text-[14.5px] border-l-2 border-green-100 dark:border-green-900/50 pl-4 py-1">
                ${step}
            </div>
        `;
    });

    // Show Modal
    const modal = document.getElementById('service-modal');
    const content = document.getElementById('service-modal-content');
    
    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
    
    modal.classList.remove('opacity-0', 'pointer-events-none');
    setTimeout(() => {
        content.classList.remove('scale-95', 'opacity-0');
        content.classList.add('scale-100', 'opacity-100');
    }, 10);
};

window.closeServiceModal = function() {
    const modal = document.getElementById('service-modal');
    const content = document.getElementById('service-modal-content');
    
    // Resume body scrolling
    document.body.style.overflow = '';
    
    content.classList.remove('scale-100', 'opacity-100');
    content.classList.add('scale-95', 'opacity-0');
    setTimeout(() => {
        modal.classList.add('opacity-0', 'pointer-events-none');
    }, 300);
};

// Also close on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('service-modal');
        if (modal && !modal.classList.contains('opacity-0')) {
            window.closeServiceModal();
        }
    }
});

// ============================================================
// FAQ Logic
// ============================================================
const faqData = [
    { category: 'general', q: 'How often should I visit the dentist?', a: 'We recommend visiting us every 6 months for a routine checkup and cleaning to maintain optimal oral health.' },
    { category: 'general', q: 'Are you accepting new patients?', a: 'Yes! We are warmly welcoming new patients of all ages to our clinic. You can easily book your first consultation using our online appointment form.' },
    { category: 'general', q: 'Do you treat children as well as adults?', a: 'Absolutely. We offer comprehensive pediatric dentistry services in a fun and welcoming environment tailored for younger patients.' },

    { category: 'treatments', q: 'Does teeth whitening cause sensitivity?', a: 'Some mild sensitivity is normal but it usually subsides within 24-48 hours. We use protective gels and desensitizing agents to ensure your absolute comfort.' },
    { category: 'treatments', q: 'How long do dental implants last?', a: 'With proper oral hygiene and regular checkups, the titanium posts of dental implants can last a lifetime, while the crown may need replacing after 10-15 years.' },
    { category: 'treatments', q: 'What is the difference between an inlay, an onlay, and a crown?', a: 'Inlays and onlays repair partial tooth damage (like large cavities), seamlessly blending with your tooth. Crowns cover the entire visible portion of the tooth to protect a heavily weakened structure.' },

    { category: 'costs', q: 'Do you accept my dental insurance?', a: 'We partner with most major dental insurance providers. We recommend contacting our front desk with your policy details before your visit so we can verify your coverage.' },
    { category: 'costs', q: 'What payment methods do you accept?', a: 'We accept cash, major credit/debit cards, and all popular mobile money platforms for your convenience.' },
    { category: 'costs', q: 'Do you offer flexible payment plans?', a: 'Yes! For more extensive procedures like implants or braces, we can arrange customized, staggered payment options so you can prioritize your health stress-free.' },

    { category: 'appointments', q: 'How do I book an appointment?', a: 'You can quickly book online via our appointment form below, give us a direct call, or chat with us on WhatsApp for rapid scheduling.' },
    { category: 'appointments', q: 'What should I bring to my first appointment?', a: 'Please bring a valid ID, any relevant medical history documents, previous dental x-rays (if available), and your insurance card if applicable.' },
    { category: 'appointments', q: 'What is your cancellation policy?', a: 'We kindly request a 24-hour notice for any cancellations. This allows us to offer the crucial time slot to another patient who might be in urgent need.' },
    { category: 'appointments', q: 'Do you offer emergency same-day appointments?', a: 'Yes, we always reserve dedicated slots each day specifically for dental emergencies such as severe pain, trauma, or unexpected swellings.' }
];

window.toggleFaq = function(button) {
    const answer = button.nextElementSibling;
    const icon = button.querySelector('.faq-icon');
    const isExpanded = answer.classList.contains('max-h-[500px]');
    
    // Close all others first
    document.querySelectorAll('.faq-answer').forEach(el => {
        el.classList.remove('max-h-[500px]');
        el.style.maxHeight = null;
    });
    document.querySelectorAll('.faq-icon').forEach(i => {
        i.textContent = '+';
        i.classList.remove('rotate-45');
    });
    
    if (!isExpanded) {
        answer.classList.add('max-h-[500px]');
        answer.style.maxHeight = answer.scrollHeight + "px";
        icon.textContent = '+';
        icon.classList.add('rotate-45');
    }
};

window.renderFAQs = function(activeCategory) {
    const container = document.getElementById('faq-container');
    if(!container) return;
    
    const filteredQs = faqData.filter(faq => faq.category === activeCategory);
    
    container.innerHTML = filteredQs.map((faq, index) => `
        <div class="bg-white dark:bg-black/40 border border-gray-100 dark:border-white/10 rounded-[1rem] overflow-hidden transition-all duration-300 shadow-sm dark:shadow-none">
            <button class="w-full flex items-center justify-between p-5 text-left focus:outline-none group" onclick="toggleFaq(this)">
                <div class="flex items-center gap-4">
                    <span class="w-7 h-7 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-500 dark:text-white/50 text-[12px] shrink-0 font-medium">${index + 1}</span>
                    <h4 class="text-[15.5px] font-medium text-gray-800 dark:text-white group-hover:text-green-600 dark:group-hover:text-[#00e5a3] transition-colors pr-4">${faq.q}</h4>
                </div>
                <span class="w-7 h-7 rounded-full bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400 dark:text-white/50 text-[18px] shrink-0 faq-icon transition-transform duration-300">+</span>
            </button>
            <div class="faq-answer max-h-0 overflow-hidden transition-all duration-500 ease-in-out px-5">
                <p class="text-gray-600 dark:text-white/60 font-light text-[14.5px] leading-relaxed pb-5 pl-[3.25rem]">${faq.a}</p>
            </div>
        </div>
    `).join('');
};

document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.faq-tab');
    if(tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => {
                    t.classList.remove('active', 'shadow-sm', 'dark:shadow-none', 'bg-[#00e5a3]', 'text-[#0A0A0A]');
                    t.classList.add('bg-white', 'dark:bg-white/5', 'text-gray-700', 'dark:text-white');
                });
                
                tab.classList.remove('bg-white', 'dark:bg-white/5', 'text-gray-700', 'dark:text-white');
                tab.classList.add('active', 'shadow-sm', 'dark:shadow-none', 'bg-[#00e5a3]', 'text-[#0A0A0A]');
                
                const category = tab.getAttribute('data-category');
                window.renderFAQs(category);
            });
        });
        // Initial render for active tab
        window.renderFAQs('appointments');
    }
});

// ==========================================
// Testimonials Slider Logic
// ==========================================
const testimonialsData = [
    {
        text: "The smile makeover at BrightSmile was absolutely worth every penny. Dr. Patel has an incredible eye for aesthetics and truly listened to what I wanted. Walking out with a brand new smile was one of the best feelings of my life.",
        initials: "RW",
        name: "Robert Williams",
        subtitle: "Full Smile Makeover"
    },
    {
        text: "I used to be terrified of the dentist, but this clinic completely changed my perspective. The staff is incredibly gentle, the environment is soothing, and my routine cleanings are now totally anxiety-free.",
        initials: "SJ",
        name: "Sarah Johnson",
        subtitle: "Routine Care Patient"
    },
    {
        text: "When I chipped my tooth on a weekend, I was panicking. They got me in immediately through their emergency line and fixed it perfectly. You can't even tell it was ever broken. Absolutely lifesavers!",
        initials: "MD",
        name: "Michael Davis",
        subtitle: "Emergency Treatment"
    },
    {
        text: "From the front desk to the dental chair, the experience here is 5-star. They took the time to explain every single step of my implant surgery, making me feel comfortable and confident in their care.",
        initials: "LM",
        name: "Linda Martinez",
        subtitle: "Dental Implants"
    }
];

let currentTestimonialIdx = 0;
let testimonialTimer = null;

// ==========================================
// Typewriter Effect Logic for Hero Section
// ==========================================
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter-text');
    if (!typewriterElement) return;
    
    const textToType = "Starts at Century";
    let charIndex = 0; 
    let timerId = null;

    function type() {
        if (!document.getElementById('typewriter-text')) return;
        
        typewriterElement.textContent = textToType.substring(0, charIndex + 1);
        charIndex++;

        let typingSpeed = 80;

        // Introduce slight randomness for human-like typing
        if (charIndex < textToType.length) {
            typingSpeed += Math.random() * 60;
            timerId = setTimeout(type, typingSpeed);
        }
    }
    
    // Start effect shortly after load
    setTimeout(type, 800);
}

// Ensure execution regardless of script load timing
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTypewriter);
} else {
    initTypewriter();
}

function renderTestimonial(index) {
    const textEl = document.getElementById('testimonial-text');
    const authorBlock = document.getElementById('testimonial-author-block');
    const initialsEl = document.getElementById('testimonial-initials');
    const nameEl = document.getElementById('testimonial-name');
    const subtitleEl = document.getElementById('testimonial-subtitle');
    const dotsContainer = document.getElementById('testimonial-dots');
    
    if(!textEl || !dotsContainer) return;

    // Fade out text blocks securely
    textEl.style.opacity = '0';
    authorBlock.style.opacity = '0';
    
    setTimeout(() => {
        const data = testimonialsData[index];
        textEl.textContent = data.text;
        initialsEl.textContent = data.initials;
        nameEl.textContent = data.name;
        subtitleEl.textContent = data.subtitle;
        
        // Render exact dot layout
        dotsContainer.innerHTML = testimonialsData.map((_, i) => {
            if (i === index) {
                return `<button class="w-8 h-2.5 rounded-full bg-[#0da27d] transition-all duration-300" aria-label="Slide ${i+1}"></button>`;
            }
            return `<button onclick="goToTestimonial(${i})" class="w-2.5 h-2.5 rounded-full bg-white/20 hover:bg-white/40 transition-colors duration-300" aria-label="Slide ${i+1}"></button>`;
        }).join('');

        // Fade back in securely
        textEl.style.opacity = '1';
        authorBlock.style.opacity = '1';
    }, 300);
}

window.goToTestimonial = function(index) {
    currentTestimonialIdx = index;
    renderTestimonial(currentTestimonialIdx);
    resetTestimonialTimer();
};

function nextTestimonial() {
    currentTestimonialIdx = (currentTestimonialIdx + 1) % testimonialsData.length;
    renderTestimonial(currentTestimonialIdx);
}

function resetTestimonialTimer() {
    clearInterval(testimonialTimer);
    testimonialTimer = setInterval(nextTestimonial, 7000);
}

document.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById('testimonial-text')) {
        renderTestimonial(0);
        resetTestimonialTimer();
    }
});
