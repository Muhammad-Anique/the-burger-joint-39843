'use strict';

/**
 * THE BURGER JOINT - Main Script
 * Handles Navigation, Animations, and Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinksContainer = document.querySelector('nav div.hidden');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            // Toggle classes for a simple mobile menu expansion
            navLinksContainer.classList.toggle('hidden');
            navLinksContainer.classList.toggle('flex');
            navLinksContainer.classList.toggle('flex-col');
            navLinksContainer.classList.toggle('absolute');
            navLinksContainer.classList.toggle('top-full');
            navLinksContainer.classList.toggle('left-0');
            navLinksContainer.classList.toggle('w-full');
            navLinksContainer.classList.toggle('bg-white');
            navLinksContainer.classList.toggle('p-6');
            navLinksContainer.classList.toggle('shadow-xl');
        });
    }

    // 2. Header Scroll Effect
    const header = document.querySelector('header');
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
            header.classList.add('shadow-md');
        } else {
            header.classList.remove('scrolled');
            header.classList.remove('shadow-md');
        }
    };
    window.addEventListener('scroll', handleScroll);

    // 3. Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (!navLinksContainer.classList.contains('hidden') && window.innerWidth < 768) {
                    mobileMenuBtn.click();
                }

                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for sticky header
                    behavior: 'smooth'
                });
            }
        });
    });

    // 4. Reveal Animations on Scroll (Intersection Observer)
    const revealElements = document.querySelectorAll('section');
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        el.classList.add('reveal');
        revealObserver.observe(el);
    });

    // 5. Contact Form Submission (Mockup)
    const contactForm = document.querySelector('#contact form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = contactForm.querySelector('input[type="email"]');
            const button = contactForm.querySelector('button');
            
            if (emailInput.value) {
                const originalText = button.textContent;
                button.disabled = true;
                button.textContent = 'WELCOME TO THE CREW! 🍔';
                button.classList.replace('bg-orange-600', 'bg-green-600');
                
                // Clear input
                emailInput.value = '';

                // Reset after 3 seconds
                setTimeout(() => {
                    button.disabled = false;
                    button.textContent = originalText;
                    button.classList.replace('bg-green-600', 'bg-orange-600');
                }, 3000);
            }
        });
    }

    // 6. Gallery Lightbox (Simple logic)
    const galleryImages = document.querySelectorAll('#gallery img');
    galleryImages.forEach(img => {
        img.addEventListener('click', () => {
            // In a real project, we might trigger a modal here.
            // For now, let's add a simple pulse effect for feedback.
            img.style.transform = 'scale(0.95)';
            setTimeout(() => {
                img.style.transform = '';
            }, 150);
        });
    });

});