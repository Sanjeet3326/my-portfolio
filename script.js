// Cybersecurity Portfolio Main Script

document.addEventListener('DOMContentLoaded', () => {

    // 0. Preloader Logic
    const preloader = document.getElementById('preloader');
    const loaderCounter = document.getElementById('loader-counter');
    const loaderBar = document.getElementById('loader-bar');

    if (preloader) {
        let progress = 0;
        const loadInterval = setInterval(() => {
            progress += Math.floor(Math.random() * 5) + 1; // Increment randomly between 1 and 5

            if (progress >= 100) {
                progress = 100;
                clearInterval(loadInterval);

                // Finish animation
                loaderCounter.textContent = progress;
                loaderBar.style.width = progress + '%';

                setTimeout(() => {
                    gsap.to(preloader, {
                        yPercent: -100, // Slide up out of view
                        duration: 0.8,
                        ease: "power3.inOut",
                        onComplete: () => {
                            preloader.style.display = 'none';
                            // Start hero animations after loader disappears
                            if (typeof heroTl !== 'undefined') {
                                heroTl.play();
                            }
                        }
                    });
                }, 500); // Small delay to let the user see "100%"
            } else {
                loaderCounter.textContent = progress;
                loaderBar.style.width = progress + '%';
            }
        }, 30); // Speed of the loader
    }

    // 1. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.width = '100%';
            navLinks.style.background = 'rgba(10, 10, 10, 0.95)';
            navLinks.style.padding = '2rem';
            navLinks.style.borderBottom = '1px solid rgba(0, 240, 255, 0.2)';
            navLinks.style.gap = '1.5rem';
        });
    }

    // 2. Active Link Highlighting on Scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href').slice(1) === current) {
                item.classList.add('active');
            }
        });
    });

    // 3. Typed.js Initialization
    if (document.getElementById('typed-subtitle')) {
        new Typed('#typed-subtitle', {
            strings: ['Cybersecurity Student', 'Ethical Hacker', 'Network Analyst', 'Problem Solver'],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true
        });
    }

    // 4. GSAP & ScrollTrigger Animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Entrance
    const heroTl = gsap.timeline({ paused: true }); // Paused initially, played by the preloader
    heroTl.from(".greeting", { y: -20, opacity: 0, duration: 0.5, delay: 0.2 })
        .from(".name", { y: 30, opacity: 0, duration: 0.6 }, "-=0.3")
        .from(".title", { y: 20, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(".hero .description", { y: 20, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(".hero-buttons", { y: 20, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(".hero-terminal", { x: 50, opacity: 0, duration: 0.8 }, "-=0.5");

    // Section Titles ScrollTrigger
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.from(title, {
            scrollTrigger: {
                trigger: title,
                start: "top 85%",
            },
            y: 30,
            opacity: 0,
            duration: 0.6
        });
    });

    // Global Text & Elements Fade Up
    gsap.utils.toArray('p:not(.hero p), ul li:not(.nav-links li), .education-block, .about-image-container').forEach(el => {
        gsap.from(el, {
            scrollTrigger: {
                trigger: el,
                start: "top 95%",
                toggleActions: "play none none reverse"
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out"
        });
    });

    // About Stats ScrollTrigger
    gsap.from(".stat-card", {
        scrollTrigger: {
            trigger: ".about-stats",
            start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2
    });

    // Project Cards ScrollTrigger
    gsap.from(".project-card", {
        scrollTrigger: {
            trigger: ".projects-grid",
            start: "top 85%",
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2
    });

    // 5. Magic Glowing Card Hover Effect
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect(),
                x = e.clientX - rect.left,
                y = e.clientY - rect.top;

            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // 6. Custom Glowing Cursor
    const cursor = document.querySelector('.custom-cursor');
    const cursorDot = document.querySelector('.custom-cursor-dot');

    if (cursor && cursorDot) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });

        const hoverElements = document.querySelectorAll('a, .btn, .project-card, .stat-card, .education-block, .about-image-container');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
        });
    }

});
