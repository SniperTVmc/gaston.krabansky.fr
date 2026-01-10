

// Dynamic current year in footer
const currentYear = new Date().getFullYear();
document.getElementById('current-year').textContent = currentYear;


// Scroll Navigation Bar Effect
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.background = '#000000';
        nav.style.boxShadow = '0 5px 20px rgba(255, 49, 49, 0.1)';
    } else {
        nav.style.background = 'rgba(10, 10, 10, 0.95)';
        nav.style.boxShadow = 'none';
    }
});


// Mobile Navigation Toggle
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links li');

burger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
});

links.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('nav-active');
    });
});


// Tabbed Content Functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active-content'));

        btn.classList.add('active');

        const targetId = btn.getAttribute('data-target');
        document.querySelector(targetId).classList.add('active-content');
    });
});


// Simple Carousel Implementation
const track = document.querySelector('.carousel-track');
if (track) {
    const slides = Array.from(track.children);
    const nextButton = document.querySelector('.next-btn');
    const prevButton = document.querySelector('.prev-btn');

    let currentIndex = 0;

    const updateCarousel = () => {
        const slides = Array.from(track.children);
        if (slides.length === 0) return;

        const slideWidth = slides[0].offsetWidth;
        const gap = 30;

        const itemsToShow = window.innerWidth > 1024 ? 2 : 1;
        if (currentIndex > slides.length - itemsToShow) {
            currentIndex = Math.max(0, slides.length - itemsToShow);
        }

        track.style.transform = `translateX(-${(slideWidth + gap) * currentIndex}px)`;
    };

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateCarousel, 100);
    });

    nextButton.addEventListener('click', () => {
        const itemsToShow = window.innerWidth > 992 ? 2 : 1;

        if (currentIndex < slides.length - itemsToShow) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateCarousel();
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            const itemsToShow = window.innerWidth > 992 ? 2 : 1;
            currentIndex = slides.length - itemsToShow;
        }
        updateCarousel();
    });
    window.addEventListener('resize', updateCarousel);
}


// Contact form submission using Web3Forms
const contactForm = document.getElementById('contact-form');
const formMessage = document.getElementById('form-message');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    formMessage.style.display = 'none';
    formMessage.textContent = "Envoi en cours...";
    formMessage.style.color = '#7f8c8d';
    formMessage.style.display = 'block';

    try {
        const response = await fetch(form.action, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        });

        const result = await response.json();

        if (response.ok && result.success) {
            formMessage.textContent = "✅ Message envoyé avec succès ! Merci de m'avoir contacté.";
            formMessage.style.color = '#27ae60';
            form.reset();
        } else {

            const hCaptcha = form.querySelector('textarea[name=h-captcha-response]').value;
            if (!hCaptcha) {
                e.preventDefault();
                formMessage.textContent = "❌ Veuillez compléter le hCaptcha.";
                formMessage.style.color = '#c0392b';

            } else {
                console.error('Web3Forms Error:', result.message);
                formMessage.textContent = "❌ Erreur lors de l'envoi. Veuillez réessayer ou m'envoyer un mail directement.";
                formMessage.style.color = '#c0392b';
            }
        }

    } catch (error) {
        formMessage.textContent = "❌ Erreur lors de l'envoi. Veuillez réessayer ou m'envoyer un mail directement.";
        formMessage.style.color = '#c0392b';
        console.error('Erreur du formulaire:', error);
    }
});