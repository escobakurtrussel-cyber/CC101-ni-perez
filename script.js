document.addEventListener("DOMContentLoaded", function () {

        const sections = document.querySelectorAll("section[id]");
        const navLinks = document.querySelectorAll(".nav-menu a");
        const navbar = document.querySelector(".navbar");

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        document.body.classList.add("page-ready");

        function setActiveNavigation() {
            let current = "";

            sections.forEach(function (section) {
                if (window.scrollY >= section.offsetTop - 160) {
                    current = section.getAttribute("id");
                }
            });

            navLinks.forEach(function (link) {
                link.classList.toggle(
                    "active",
                    link.getAttribute("href") === "#" + current
                );
            });
        }

        function updateNavbar() {
            if (navbar) {
                navbar.classList.toggle("is-scrolled", window.scrollY > 30);
            }

            setActiveNavigation();
        }

        // ============================
        // PAGE LOAD ANIMATION
        // ============================

        // The CSS page-ready class handles the initial hero and navbar sequence.

        // ============================
        // SKILL BAR ANIMATION
        // ============================

        const skillBars = document.querySelectorAll(".bar-fill");
        const skillObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    return;
                }

                const bar = entry.target;
                const width = bar.getAttribute("data-width");

                window.setTimeout(function () {
                    bar.style.width = width;
                }, prefersReducedMotion ? 0 : 180);

                skillObserver.unobserve(bar);
            });
        }, {
            threshold: 0.35
        });

        skillBars.forEach(function (bar, index) {
            bar.style.transitionDelay = prefersReducedMotion
                ? "0ms"
                : index * 120 + "ms";
            skillObserver.observe(bar);
        });

        // ============================
        // SCROLL REVEAL
        // ============================

        const revealElements = document.querySelectorAll(
            ".section-title, " +
            ".about-photo, " +
            ".about-content, " +
            ".timeline-item, " +
            ".project-card, " +
            ".skills-container, " +
            ".testimonial-card, " +
            ".contact-container"
        );

        revealElements.forEach(function (element, index) {
            element.classList.add("reveal");

            if (element.classList.contains("about-photo")) {
                element.classList.add("reveal-left");
            }

            if (element.classList.contains("about-content")) {
                element.classList.add("reveal-right");
            }

            element.style.transitionDelay = prefersReducedMotion
                ? "0ms"
                : index % 4 * 70 + "ms";
        });

        const revealObserver = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("is-visible");
                revealObserver.unobserve(entry.target);
            });
        }, {
            threshold: 0.12,
            rootMargin: "0px 0px -5%"
        });

        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });

        // ============================
        // NAVIGATION AND SMOOTH SCROLL
        // ============================

        navLinks.forEach(function (link) {
            link.addEventListener("click", function (event) {
                const targetId = link.getAttribute("href");
                const target = targetId ? document.querySelector(targetId) : null;

                if (!target) {
                    return;
                }

                event.preventDefault();

                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top +
                    window.scrollY - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: prefersReducedMotion ? "auto" : "smooth"
                });

                history.replaceState(null, "", targetId);
            });
        });

        document.querySelectorAll(
            ".scroll-indicator, .hero-buttons a"
        ).forEach(function (link) {
            link.addEventListener("click", function (event) {
                const targetId = link.getAttribute("href");
                const target = targetId ? document.querySelector(targetId) : null;

                if (!target) {
                    return;
                }

                event.preventDefault();
                target.scrollIntoView({
                    behavior: prefersReducedMotion ? "auto" : "smooth",
                    block: "start"
                });
                history.replaceState(null, "", targetId);
            });
        });

        window.addEventListener("scroll", updateNavbar, { passive: true });
        updateNavbar();

        // ============================
        // CONTACT FORM
        // ============================

        const contactForm = document.querySelector(".contact-form");

        if (contactForm) {
            contactForm.addEventListener("submit", function (event) {
                event.preventDefault();

                alert(
                    "Thank you for your message! " +
                    "Please contact me directly through my email for now."
                );

                contactForm.reset();
            });
        }
});
